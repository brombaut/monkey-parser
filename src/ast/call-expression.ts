import Expression from "./expression";
import Token from "../token/token";

class CallExpression implements Expression {
  private _token: Token;
  private _function: Expression;
  private _arguments: Expression[];

  constructor(token: Token, f: Expression, a: Expression[]) {
    this._token = token;
    this._function = f;
    this._arguments = a;
  }

  expressionNode(): void {}

  tokenLiteral(): string {
    return this._token.literal;
  }

  string(): string {
    const args: string[] = [];
    this._arguments.forEach((a: Expression) => {
      args.push(a.string());
    });
    return `${this._function.string()}(${args.join(", ")})`;
  }

  function(): Expression {
    return this._function;
  }

  arguments(): Expression[] {
    return this._arguments;
  }
}

export default CallExpression;
