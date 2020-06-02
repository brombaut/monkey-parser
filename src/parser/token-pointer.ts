import Token from "../token/token";
import Lexer from "../lexer/lexer";
import TokenType from "../token/token-type";
import ErrorList from "./error-list";

class TokenPointer {
  private _lexer: Lexer;
  private _curToken!: Token;
  private _peekToken!: Token;
  private _errors: ErrorList;

  constructor(lexer: Lexer, list: ErrorList) {
    this._lexer = lexer;
    this._errors = list;
    this.advance();
    this.advance();
  }

  public advance(): void {
    this._curToken = this._peekToken;
    this._peekToken = this._lexer.nextToken();
  }

  public curTokenIs(t: TokenType): boolean {
    return this._curToken.type === t;
  }

  public peekTokenIs(t: TokenType): boolean {
    return this._peekToken.type === t;
  }

  public curToken(): Token {
    return this._curToken;
  }

  public curTokenLiteral(): string {
    return this._curToken.literal;
  }

  public curTokenType(): TokenType {
    return this._curToken.type;
  }

  public peekTokenType(): TokenType {
    return this._peekToken.type;
  }

  public expectPeek(t: TokenType): boolean {
    if (this.peekTokenIs(t)) {
      this.advance();
      return true;
    }
    this.peekError(t);
    return false;
  }

  private peekError(t: TokenType): void {
    const msg = `expected next token to be ${t}, got ${this.peekTokenType()} instead`;
    this._errors.add(msg);
  }
}

export default TokenPointer;
