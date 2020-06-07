import Token from "../token/token";
import TokenType from "../token/token-type";
import Lexer from "./lexer";

describe("Lexer", () => {
  it("should create correct tokens", () => {
    const input = `
let five = 5;
let ten = 10;

let add = fn(x, y) {
  x + y;
};

let result = add(five, ten);

!-/*5;
5 < 10 > 5;
if (5 < 10) {
  return true;
} else {
  return false;
}

10 == 10;
10 != 9;
"foobar"
"foo bar"
[1, 2];
{"foo": "bar"}

x; // This comment should be ignored
y; // This comment should also be ignored
`;

    const expectedTokens: Token[] = [
      new Token(TokenType.LET, "let", 2, 1),
      new Token(TokenType.IDENT, "five", 2, 5),
      new Token(TokenType.ASSIGN, "=", 2, 10),
      new Token(TokenType.INT, "5", 2, 12),
      new Token(TokenType.SEMICOLON, ";", 2, 13),
      new Token(TokenType.LET, "let", 3, 1),
      new Token(TokenType.IDENT, "ten", 3, 5),
      new Token(TokenType.ASSIGN, "=", 3, 9),
      new Token(TokenType.INT, "10", 3, 11),
      new Token(TokenType.SEMICOLON, ";", 3, 13),
      new Token(TokenType.LET, "let", 5, 1),
      new Token(TokenType.IDENT, "add", 5, 5),
      new Token(TokenType.ASSIGN, "=", 5, 9),
      new Token(TokenType.FUNCTION, "fn", 5, 11),
      new Token(TokenType.LPAREN, "(", 5, 13),
      new Token(TokenType.IDENT, "x", 5, 14),
      new Token(TokenType.COMMA, ",", 5, 15),
      new Token(TokenType.IDENT, "y", 5, 17),
      new Token(TokenType.RPAREN, ")", 5, 18),
      new Token(TokenType.LBRACE, "{", 5, 20),
      new Token(TokenType.IDENT, "x", 6, 3),
      new Token(TokenType.PLUS, "+", 6, 5),
      new Token(TokenType.IDENT, "y", 6, 7),
      new Token(TokenType.SEMICOLON, ";", 6, 8),
      new Token(TokenType.RBRACE, "}", 7, 1),
      new Token(TokenType.SEMICOLON, ";", 7, 2),
      new Token(TokenType.LET, "let", 9, 1),
      new Token(TokenType.IDENT, "result", 9, 5),
      new Token(TokenType.ASSIGN, "=", 9, 12),
      new Token(TokenType.IDENT, "add", 9, 14),
      new Token(TokenType.LPAREN, "(", 9, 17),
      new Token(TokenType.IDENT, "five", 9, 18),
      new Token(TokenType.COMMA, ",", 9, 22),
      new Token(TokenType.IDENT, "ten", 9, 24),
      new Token(TokenType.RPAREN, ")", 9, 27),
      new Token(TokenType.SEMICOLON, ";", 9, 28),
      new Token(TokenType.BANG, "!", 11, 1),
      new Token(TokenType.MINUS, "-", 11, 2),
      new Token(TokenType.SLASH, "/", 11, 3),
      new Token(TokenType.ASTERISK, "*", 11, 4),
      new Token(TokenType.INT, "5", 11, 5),
      new Token(TokenType.SEMICOLON, ";", 11, 6),
      new Token(TokenType.INT, "5", 12, 1),
      new Token(TokenType.LT, "<", 12, 3),
      new Token(TokenType.INT, "10", 12, 5),
      new Token(TokenType.GT, ">", 12, 8),
      new Token(TokenType.INT, "5", 12, 10),
      new Token(TokenType.SEMICOLON, ";", 12, 11),
      new Token(TokenType.IF, "if", 13, 1),
      new Token(TokenType.LPAREN, "(", 13, 4),
      new Token(TokenType.INT, "5", 13, 5),
      new Token(TokenType.LT, "<", 13, 7),
      new Token(TokenType.INT, "10", 13, 9),
      new Token(TokenType.RPAREN, ")", 13, 11),
      new Token(TokenType.LBRACE, "{", 13, 13),
      new Token(TokenType.RETURN, "return", 14, 3),
      new Token(TokenType.TRUE, "true", 14, 10),
      new Token(TokenType.SEMICOLON, ";", 14, 14),
      new Token(TokenType.RBRACE, "}", 15, 1),
      new Token(TokenType.ELSE, "else", 15, 3),
      new Token(TokenType.LBRACE, "{", 15, 8),
      new Token(TokenType.RETURN, "return", 16, 3),
      new Token(TokenType.FALSE, "false", 16, 10),
      new Token(TokenType.SEMICOLON, ";", 16, 15),
      new Token(TokenType.RBRACE, "}", 17, 1),
      new Token(TokenType.INT, "10", 19, 1),
      new Token(TokenType.EQ, "==", 19, 4),
      new Token(TokenType.INT, "10", 19, 7),
      new Token(TokenType.SEMICOLON, ";", 19, 9),
      new Token(TokenType.INT, "10", 20, 1),
      new Token(TokenType.NOT_EQ, "!=", 20, 4),
      new Token(TokenType.INT, "9", 20, 7),
      new Token(TokenType.SEMICOLON, ";", 20, 8),
      new Token(TokenType.STRING, "foobar", 21, 1),
      new Token(TokenType.STRING, "foo bar", 22, 1),
      new Token(TokenType.LBRACKET, "[", 23, 1),
      new Token(TokenType.INT, "1", 23, 2),
      new Token(TokenType.COMMA, ",", 23, 3),
      new Token(TokenType.INT, "2", 23, 5),
      new Token(TokenType.RBRACKET, "]", 23, 6),
      new Token(TokenType.SEMICOLON, ";", 23, 7),
      new Token(TokenType.LBRACE, "{", 24, 1),
      new Token(TokenType.STRING, "foo", 24, 2),
      new Token(TokenType.COLON, ":", 24, 7),
      new Token(TokenType.STRING, "bar", 24, 9),
      new Token(TokenType.RBRACE, "}", 24, 14),
      new Token(TokenType.IDENT, "x", 26, 1),
      new Token(TokenType.SEMICOLON, ";", 26, 2),
      new Token(TokenType.IDENT, "y", 27, 1),
      new Token(TokenType.SEMICOLON, ";", 27, 2),
      new Token(TokenType.EOF, "", 28, 1)
    ];
    runLexerTests(input, expectedTokens);
  });

  it("should create ILLEGAL tokens for illegal characters", () => {
    const input = `+~?=`;
    const expectedTokens: Token[] = [
      new Token(TokenType.PLUS, "+", 1, 1),
      new Token(TokenType.ILLEGAL, "~", 1, 2),
      new Token(TokenType.ILLEGAL, "?", 1, 3),
      new Token(TokenType.ASSIGN, "=", 1, 4),
      new Token(TokenType.EOF, "", 1, 5)
    ];
    runLexerTests(input, expectedTokens);
  });
});

function runLexerTests(input: string, expectedTokens: Token[]): void {
  const l: Lexer = new Lexer(input);
  expectedTokens.forEach((expectedToken: Token) => {
    const tok: Token = l.nextToken();
    expect(tok.type()).toEqual(expectedToken.type());
    expect(tok.literal()).toEqual(expectedToken.literal());
    expect(tok.line()).toEqual(expectedToken.line());
    expect(tok.column()).toEqual(expectedToken.column());
  });
}
