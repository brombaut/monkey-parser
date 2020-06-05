import Token from "../token/token";
import TokenType from "../token/token-type";
import lookupIdent from "../token/keywords";

class Lexer {
  private _input: string;
  private _position: number; // currrent position in input (points to current char)
  private _readPosition: number; // current reading position in input (after current char)
  private _ch: string; // current char under examination

  constructor(input: string) {
    this._input = input;
    this._position = -1;
    this._readPosition = 0;
    this._ch = "";
    this.readChar();
  }

  public nextToken(): Token {
    let tok: Token;

    this.skipWhitespace();

    switch (this._ch) {
      case "=":
        if (this.peekChar() === "=") {
          const currCh: string = this._ch;
          this.readChar();
          const literal: string = currCh + this._ch;
          tok = this.newToken(TokenType.EQ, literal);
        } else {
          tok = this.newToken(TokenType.ASSIGN, this._ch);
        }
        break;
      case "+":
        tok = this.newToken(TokenType.PLUS, this._ch);
        break;
      case "-":
        tok = this.newToken(TokenType.MINUS, this._ch);
        break;
      case "!":
        if (this.peekChar() === "=") {
          const currCh: string = this._ch;
          this.readChar();
          const literal: string = currCh + this._ch;
          tok = this.newToken(TokenType.NOT_EQ, literal);
        } else {
          tok = this.newToken(TokenType.BANG, this._ch);
        }
        break;
      case "/":
        tok = this.newToken(TokenType.SLASH, this._ch);
        break;
      case "*":
        tok = this.newToken(TokenType.ASTERISK, this._ch);
        break;
      case "<":
        tok = this.newToken(TokenType.LT, this._ch);
        break;
      case ">":
        tok = this.newToken(TokenType.GT, this._ch);
        break;
      case ";":
        tok = this.newToken(TokenType.SEMICOLON, this._ch);
        break;
      case ",":
        tok = this.newToken(TokenType.COMMA, this._ch);
        break;
      case "(":
        tok = this.newToken(TokenType.LPAREN, this._ch);
        break;
      case ")":
        tok = this.newToken(TokenType.RPAREN, this._ch);
        break;
      case "{":
        tok = this.newToken(TokenType.LBRACE, this._ch);
        break;
      case "}":
        tok = this.newToken(TokenType.RBRACE, this._ch);
        break;
      case "[":
        tok = this.newToken(TokenType.LBRACKET, this._ch);
        break;
      case "]":
        tok = this.newToken(TokenType.RBRACKET, this._ch);
        break;
      case '"':
        tok = this.newToken(TokenType.STRING, this.readString());
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
          tok = this.newToken(TokenType.ILLEGAL, this._ch);
        }
        break;
    }
    this.readChar();
    return tok;
  }

  private readString(): string {
    const startPosition = this._position + 1;
    this.readChar();
    while (this._ch !== '"' && this._ch) {
      this.readChar();
    }
    return this._input.slice(startPosition, this._position);
  }

  private readChar(): void {
    if (this._readPosition >= this._input.length) {
      this._ch = "";
    } else {
      this._ch = this._input.charAt(this._readPosition);
    }
    this._position = this._readPosition;
    ++this._readPosition;
  }

  private peekChar(): string {
    if (this._readPosition >= this._input.length) {
      return "";
    } else {
      return this._input.charAt(this._readPosition);
    }
  }

  private skipWhitespace(): void {
    while (/\s/.test(this._ch)) {
      this.readChar();
    }
  }

  private newToken(tokenType: TokenType, ch: string): Token {
    return new Token(tokenType, ch);
  }

  private readIdentifier(): string {
    const startPosition = this._position;
    while (this.chIsLetter()) {
      this.readChar();
    }
    return this._input.slice(startPosition, this._position);
  }

  private readNumber(): string {
    const startPosition = this._position;
    while (this.chIsDigit()) {
      this.readChar();
    }
    return this._input.slice(startPosition, this._position);
  }

  private chIsLetter(): boolean {
    return this._ch.match(/[a-z_]/i) ? true : false;
  }

  private chIsDigit(): boolean {
    return this._ch.match(/[0-9]/i) ? true : false;
  }
}

export default Lexer;
