import Expression from "./expression";
import Token from "../token/token";

class HashLiteral implements Expression {
  private _node: string = HashLiteral.name;
  private _token: Token;
  private _pairs: Map<Expression, Expression>;
  constructor(token: Token, pairs: Map<Expression, Expression>) {
    this._token = token;
    this._pairs = pairs;
  }

  tokenLiteral(): string {
    return this._token.literal();
  }

  string(): string {
    const pairs: string[] = [];
    this._pairs.forEach((value: Expression, key: Expression) => {
      pairs.push(`${key.string()}:${value.string()}`);
    });
    return `{${pairs.join(", ")}}`;
  }

  pairs(): Map<Expression, Expression> {
    return this._pairs;
  }

  length(): number {
    return this._pairs.size;
  }
}

export default HashLiteral;
