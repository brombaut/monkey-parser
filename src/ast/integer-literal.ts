import Expression from "./expression";
import Token from "../token/token";

class IntegerLiteral implements Expression {
  private _node: string = "IntegerLiteral";
  private _token: Token;
  private _value: number;

  constructor(token: Token, value: number) {
    this._token = token;
    this._value = value;
  }

  tokenLiteral(): string {
    return this._token.literal();
  }

  string(): string {
    return this._token.literal();
  }

  value(): number {
    return this._value;
  }
}

export default IntegerLiteral;
