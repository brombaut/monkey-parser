import TokenType from "./token-type";

class Token {
  private _type: TokenType;
  private _literal: string;

  constructor(type: TokenType, literal: string) {
    this._type = type;
    this._literal = literal;
  }

  type(): TokenType {
    return this._type;
  }

  literal(): string {
    return this._literal;
  }
}

export default Token;
