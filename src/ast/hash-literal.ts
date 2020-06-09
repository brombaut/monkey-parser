import Expression from "./expression";
import Token from "../token/token";

class HashLiteral implements Expression {
  private _node = "HashLiteral";
  private _token: Token;
  // private _pairs: Map<Expression, Expression>;
  private _pairs: { [key: string]: Expression };
  constructor(token: Token, pairs: { [key: string]: Expression }) {
    this._token = token;
    this._pairs = pairs;
  }

  tokenLiteral(): string {
    return this._token.literal();
  }

  string(): string {
    const pairs: string[] = [];
    for (const [key, value] of Object.entries(this._pairs)) {
      // this._pairs.forEach((value: Expression, key: Expression) => {
      pairs.push(`${key}:${value.string()}`);
    }
    return `{${pairs.join(", ")}}`;
  }

  pairs(): { [key: string]: Expression } {
    return this._pairs;
  }

  length(): number {
    return Object.keys(this._pairs).length;
  }
}

export default HashLiteral;
