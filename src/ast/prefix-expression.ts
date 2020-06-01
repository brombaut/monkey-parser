import Expression from "./expression";
import Token from "../token/token";

class PrefixExpression implements Expression {
  private _token: Token;
  private _operator: string;
  private _right: Expression;

  constructor(token: Token, operator: string, right: Expression) {
    this._token = token;
    this._operator = operator;
    this._right = right;
  }

  tokenLiteral(): string {
    return this._token.literal;
  }

  string(): string {
    return `(${this._operator}${this._right.string()})`;
  }

  operator(): string {
    return this._operator;
  }

  right(): Expression {
    return this._right;
  }
}
export default PrefixExpression;
