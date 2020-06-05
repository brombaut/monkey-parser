import Expression from "./expression";
import Token from "../token/token";

class StringLiteral implements Expression {
  private _node: string = StringLiteral.name;
  private _token: Token;
  private _value: string;
  constructor(token: Token, value: string) {
    this._token = token;
    this._value = value;
  }

  tokenLiteral(): string {
    return this._token.literal();
  }

  string(): string {
    return this._token.literal();
  }

  value(): string {
    return this._value;
  }
}

export default StringLiteral;
