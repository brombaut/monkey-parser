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
    `;
    const expectedTokens: Token[] = [
      new Token(TokenType.LET, "let"),
      new Token(TokenType.IDENT, "five"),
      new Token(TokenType.ASSIGN, "="),
      new Token(TokenType.INT, "5"),
      new Token(TokenType.SEMICOLON, ";"),
      new Token(TokenType.LET, "let"),
      new Token(TokenType.IDENT, "ten"),
      new Token(TokenType.ASSIGN, "="),
      new Token(TokenType.INT, "10"),
      new Token(TokenType.SEMICOLON, ";"),
      new Token(TokenType.LET, "let"),
      new Token(TokenType.IDENT, "add"),
      new Token(TokenType.ASSIGN, "="),
      new Token(TokenType.FUNCTION, "fn"),
      new Token(TokenType.LPAREN, "("),
      new Token(TokenType.IDENT, "x"),
      new Token(TokenType.COMMA, ","),
      new Token(TokenType.IDENT, "y"),
      new Token(TokenType.RPAREN, ")"),
      new Token(TokenType.LBRACE, "{"),
      new Token(TokenType.IDENT, "x"),
      new Token(TokenType.PLUS, "+"),
      new Token(TokenType.IDENT, "y"),
      new Token(TokenType.SEMICOLON, ";"),
      new Token(TokenType.RBRACE, "}"),
      new Token(TokenType.SEMICOLON, ";"),
      new Token(TokenType.LET, "let"),
      new Token(TokenType.IDENT, "result"),
      new Token(TokenType.ASSIGN, "="),
      new Token(TokenType.IDENT, "add"),
      new Token(TokenType.LPAREN, "("),
      new Token(TokenType.IDENT, "five"),
      new Token(TokenType.COMMA, ","),
      new Token(TokenType.IDENT, "ten"),
      new Token(TokenType.RPAREN, ")"),
      new Token(TokenType.SEMICOLON, ";"),
      new Token(TokenType.BANG, "!"),
      new Token(TokenType.MINUS, "-"),
      new Token(TokenType.SLASH, "/"),
      new Token(TokenType.ASTERISK, "*"),
      new Token(TokenType.INT, "5"),
      new Token(TokenType.SEMICOLON, ";"),
      new Token(TokenType.INT, "5"),
      new Token(TokenType.LT, "<"),
      new Token(TokenType.INT, "10"),
      new Token(TokenType.GT, ">"),
      new Token(TokenType.INT, "5"),
      new Token(TokenType.SEMICOLON, ";"),
      new Token(TokenType.IF, "if"),
      new Token(TokenType.LPAREN, "("),
      new Token(TokenType.INT, "5"),
      new Token(TokenType.LT, "<"),
      new Token(TokenType.INT, "10"),
      new Token(TokenType.RPAREN, ")"),
      new Token(TokenType.LBRACE, "{"),
      new Token(TokenType.RETURN, "return"),
      new Token(TokenType.TRUE, "true"),
      new Token(TokenType.SEMICOLON, ";"),
      new Token(TokenType.RBRACE, "}"),
      new Token(TokenType.ELSE, "else"),
      new Token(TokenType.LBRACE, "{"),
      new Token(TokenType.RETURN, "return"),
      new Token(TokenType.FALSE, "false"),
      new Token(TokenType.SEMICOLON, ";"),
      new Token(TokenType.RBRACE, "}"),
      new Token(TokenType.INT, "10"),
      new Token(TokenType.EQ, "=="),
      new Token(TokenType.INT, "10"),
      new Token(TokenType.SEMICOLON, ";"),
      new Token(TokenType.INT, "10"),
      new Token(TokenType.NOT_EQ, "!="),
      new Token(TokenType.INT, "9"),
      new Token(TokenType.SEMICOLON, ";"),
      new Token(TokenType.STRING, "foobar"),
      new Token(TokenType.STRING, "foo bar"),
      new Token(TokenType.LBRACKET, "["),
      new Token(TokenType.INT, "1"),
      new Token(TokenType.COMMA, ","),
      new Token(TokenType.INT, "2"),
      new Token(TokenType.RBRACKET, "]"),
      new Token(TokenType.SEMICOLON, ";"),
      new Token(TokenType.EOF, "")
    ];
    runLexerTests(input, expectedTokens);
  });

  it("should create ILLEGAL tokens for illegal characters", () => {
    const input = `+~?=`;
    const expectedTokens: Token[] = [
      new Token(TokenType.PLUS, "+"),
      new Token(TokenType.ILLEGAL, "~"),
      new Token(TokenType.ILLEGAL, "?"),
      new Token(TokenType.ASSIGN, "="),
      new Token(TokenType.EOF, "")
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
  });
}
