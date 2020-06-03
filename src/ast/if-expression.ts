import Expression from "./expression";
import Token from "../token/token";
import BlockStatement from "./block-statement";

class IfExpression implements Expression {
  private _node: string = IfExpression.name;
  private _token: Token; // The 'if' token
  private _condition: Expression;
  private _consequence: BlockStatement;
  private _alternative?: BlockStatement;

  constructor(
    token: Token,
    condition: Expression,
    consequence: BlockStatement,
    alternative?: BlockStatement
  ) {
    this._token = token;
    this._condition = condition;
    this._consequence = consequence;
    this._alternative = alternative;
  }

  tokenLiteral(): string {
    return this._token.literal();
  }

  string(): string {
    let out = `if ${this._condition.string()} ${this._consequence.string()}`;
    if (this._alternative) {
      out += `else ${this._alternative.string()}`;
    }
    return out;
  }

  condition(): Expression {
    return this._condition;
  }

  consequence(): BlockStatement {
    return this._consequence;
  }

  alternative(): BlockStatement | null {
    return this._alternative || null;
  }
}

export default IfExpression;
