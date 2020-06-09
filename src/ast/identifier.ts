import Expression from "./expression";
import Token from "../token/token";

class Identifier implements Expression {
  private _node: string = "Identifier";
  private _token: Token;
  private _value: string;

  constructor(token: Token, value: string) {
    this._token = token;
    this._value = value;
  }

  string(): string {
    return this._value;
  }

  tokenLiteral(): string {
    return this._token.literal();
  }

  value(): string {
    return this._value;
  }
}

export default Identifier;
