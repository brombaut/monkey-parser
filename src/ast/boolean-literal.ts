import Expression from "./expression";
import Token from "../token/token";

class BooleanLiteral implements Expression {
  private _token: Token;
  private _value: boolean;
  constructor(token: Token, value: boolean) {
    this._token = token;
    this._value = value;
  }
  expressionNode(): void {}

  tokenLiteral(): string {
    return this._token.literal;
  }

  string(): string {
    return this._token.literal;
  }

  value(): boolean {
    return this._value;
  }
}

export default BooleanLiteral;
