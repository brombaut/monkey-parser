import Expression from "./expression";
import Token from "../token/token";

class Identifier implements Expression {
  private _token: Token;
  private _value: string;

  constructor(token: Token, value: string) {
    this._token = token;
    this._value = value;
  }

  expressionNode(): void {}

  tokenLiteral(): string {
    return this._token.literal;
  }

  get value(): string {
    return this._value;
  }
}

export default Identifier;
