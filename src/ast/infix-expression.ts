import Expression from "./expression";
import Token from "../token/token";

class InfixExpression implements Expression {
  private _token: Token;
  private _operator: string;
  private _right: Expression;
  private _left: Expression;

  constructor(
    token: Token,
    left: Expression,
    operator: string,
    right: Expression
  ) {
    this._token = token;
    this._left = left;
    this._operator = operator;
    this._right = right;
  }

  expressionNode(): void {}

  tokenLiteral(): string {
    return this._token.literal;
  }

  string(): string {
    return `(${this._left.string()} ${this._operator} ${this._right.string()})`;
  }

  left(): Expression {
    return this._left;
  }

  operator(): string {
    return this._operator;
  }

  right(): Expression {
    return this._right;
  }
}
export default InfixExpression;
