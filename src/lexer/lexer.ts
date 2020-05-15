import { Token } from "../token/token";
import { TokenType } from "../token/token-type";
import lookupIdent from "../token/keywords";

export class Lexer {
  private input: string;
  private position: number; // currrent position in input (points to current char)
  private readPosition: number; // current reading position in input (after current char)
  private ch: string; // current char under examination

  constructor(input: string) {
    this.input = input;
    this.position = -1;
    this.readPosition = 0;
    this.ch = "";
    this.readChar();
  }

  private readChar(): void {
    if (this.readPosition >= this.input.length) {
      this.ch = "";
    } else {
      this.ch = this.input.charAt(this.readPosition);
    }
    this.position = this.readPosition;
    ++this.readPosition;
  }

  public nextToken(): Token {
    let tok: Token;

    this.skipWhitespace();

    switch (this.ch) {
      case "=":
        tok = this.newToken(TokenType.ASSIGN, this.ch);
        break;
      case ";":
        tok = this.newToken(TokenType.SEMICOLON, this.ch);
        break;
      case "(":
        tok = this.newToken(TokenType.LPAREN, this.ch);
        break;
      case ")":
        tok = this.newToken(TokenType.RPAREN, this.ch);
        break;
      case ",":
        tok = this.newToken(TokenType.COMMA, this.ch);
        break;
      case "+":
        tok = this.newToken(TokenType.PLUS, this.ch);
        break;
      case "{":
        tok = this.newToken(TokenType.LBRACE, this.ch);
        break;
      case "}":
        tok = this.newToken(TokenType.RBRACE, this.ch);
        break;
      case "":
        tok = this.newToken(TokenType.EOF, "");
        break;
      default:
        if (this.chIsLetter()) {
          const identifier = this.readIdentifier();
          tok = this.newToken(lookupIdent(identifier), identifier);
          return tok;
        } else if (this.chIsDigit()) {
          const num = this.readNumber();
          tok = this.newToken(TokenType.INT, num);
          return tok;
        } else {
          tok = this.newToken(TokenType.ILLEGAL, this.ch);
        }
        break;
    }
    this.readChar();
    return tok;
  }

  private skipWhitespace(): void {
    // const whitespaceChars: string[] = [
    //   " ",
    //   "\t",
    //   "\n",
    //   "\r",
    // ];
    // while (whitespaceChars.includes(this.ch)) {
    //   this.readChar();
    // }
    while (/\s/.test(this.ch)) {
      this.readChar();
    }
  }

  private newToken(tokenType: TokenType, ch: string): Token {
    return {
      type: tokenType,
      literal: ch
    };
  }

  private readIdentifier(): string {
    const startPosition = this.position;
    while (this.chIsLetter()) {
      this.readChar();
    }
    return this.input.slice(startPosition, this.position);
  }

  private readNumber(): string {
    const startPosition = this.position;
    while (this.chIsDigit()) {
      this.readChar();
    }
    return this.input.slice(startPosition, this.position);
  }

  private chIsLetter(): boolean {
    return this.ch.match(/[a-z_]/i) ? true : false;
  }

  private chIsDigit(): boolean {
    return this.ch.match(/[0-9]/i) ? true : false;
  }
}
