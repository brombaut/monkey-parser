import TokenType from "./token-type";

class Token {
  private _type: TokenType;
  private _literal: string;
  private _line: number;
  private _column: number;

  constructor(type: TokenType, literal: string, line: number, column: number) {
    this._type = type;
    this._literal = literal;
    this._line = line;
    this._column = column;
  }

  type(): TokenType {
    return this._type;
  }

  literal(): string {
    return this._literal;
  }

  line(): number {
    return this._line;
  }

  column(): number {
    return this._column;
  }
}

export default Token;
