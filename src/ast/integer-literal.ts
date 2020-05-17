import Expression from "./expression";
import Token from "../token/token";

class Integerliteral implements Expression {
  private _token: Token;
  private _value: number;

  constructor(token: Token, value: number) {
    this._token = token;
    this._value = value;
  }

  expressionNode(): void { }

  tokenLiteral(): string {
    return this._token.literal;
  }

  string(): string {
    return this._token.literal;
  }

  value() {
    return this._value;
  }
}

export default Integerliteral;