import Expression from "./expression";
import Token from "../token/token";

class IndexExpression implements Expression {
  private _node = "IndexExpression";
  private _token: Token;
  private _left: Expression;
  private _index: Expression;

  constructor(token: Token, left: Expression, index: Expression) {
    this._token = token;
    this._left = left;
    this._index = index;
  }

  tokenLiteral(): string {
    return this._token.literal();
  }

  string(): string {
    return `(${this._left.string()}[${this._index.string()}])`;
  }

  left(): Expression {
    return this._left;
  }

  index(): Expression {
    return this._index;
  }
}
export default IndexExpression;
