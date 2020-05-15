import { Token } from "../token/token";
import { TokenType } from "../token/token-type";
import { Lexer } from "./lexer";

describe("Lexer", () => {
  it("should create correct tokens", () => {
    const input = `
    let five = 5;
    let ten = 10;

    let add = function(x, y) {
      x + y;
    };

    let result = add(five, ten);
    `;
    const expectedTokens: Token[] = [
      { type: TokenType.LET, literal: "let" },
      { type: TokenType.IDENT, literal: "five" },
      { type: TokenType.ASSIGN, literal: "=" },
      { type: TokenType.INT, literal: "5" },
      { type: TokenType.SEMICOLON, literal: ";" },
      { type: TokenType.LET, literal: "let" },
      { type: TokenType.IDENT, literal: "ten" },
      { type: TokenType.ASSIGN, literal: "=" },
      { type: TokenType.INT, literal: "10" },
      { type: TokenType.SEMICOLON, literal: ";" },
      { type: TokenType.LET, literal: "let" },
      { type: TokenType.IDENT, literal: "add" },
      { type: TokenType.ASSIGN, literal: "=" },
      { type: TokenType.FUNCTION, literal: "function" },
      { type: TokenType.LPAREN, literal: "(" },
      { type: TokenType.IDENT, literal: "x" },
      { type: TokenType.COMMA, literal: "," },
      { type: TokenType.IDENT, literal: "y" },
      { type: TokenType.RPAREN, literal: ")" },
      { type: TokenType.LBRACE, literal: "{" },
      { type: TokenType.IDENT, literal: "x" },
      { type: TokenType.PLUS, literal: "+" },
      { type: TokenType.IDENT, literal: "y" },
      { type: TokenType.SEMICOLON, literal: ";" },
      { type: TokenType.RBRACE, literal: "}" },
      { type: TokenType.SEMICOLON, literal: ";" },
      { type: TokenType.LET, literal: "let" },
      { type: TokenType.IDENT, literal: "result" },
      { type: TokenType.ASSIGN, literal: "=" },
      { type: TokenType.IDENT, literal: "add" },
      { type: TokenType.LPAREN, literal: "(" },
      { type: TokenType.IDENT, literal: "five" },
      { type: TokenType.COMMA, literal: "," },
      { type: TokenType.IDENT, literal: "ten" },
      { type: TokenType.RPAREN, literal: ")" },
      { type: TokenType.SEMICOLON, literal: ";" },
      { type: TokenType.EOF, literal: "" }
    ];

    const l: Lexer = new Lexer(input);
    expectedTokens.forEach((expectedToken: Token) => {
      const tok: Token = l.nextToken();
      expect(tok.type).toEqual(expectedToken.type);
      expect(tok.literal).toEqual(expectedToken.literal);
    });
  });

  it("should create ILLEGAL tokens for illegal characters", () => {
    const input = `+~?=`;
    const expectedTokens: Token[] = [
      { type: TokenType.PLUS, literal: "+" },
      { type: TokenType.ILLEGAL, literal: "~" },
      { type: TokenType.ILLEGAL, literal: "?" },
      { type: TokenType.ASSIGN, literal: "=" },
      { type: TokenType.EOF, literal: "" }
    ];

    const l: Lexer = new Lexer(input);
    expectedTokens.forEach((expectedToken: Token) => {
      const tok: Token = l.nextToken();
      expect(tok.type).toEqual(expectedToken.type);
      expect(tok.literal).toEqual(expectedToken.literal);
    });
  });
});
