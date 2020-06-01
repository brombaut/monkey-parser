import Expression from "./expression";
import Token from "../token/token";
import Identifier from "./identifier";
import BlockStatement from "./block-statement";

class FunctionLiteral implements Expression {
  private _token: Token;
  private _parameters: Identifier[];
  private _body: BlockStatement;

  constructor(token: Token, parameters: Identifier[], body: BlockStatement) {
    this._token = token;
    this._parameters = parameters;
    this._body = body;
  }

  tokenLiteral(): string {
    return this._token.literal;
  }

  string(): string {
    let out = `${this.tokenLiteral()}(`;
    const params: string[] = [];
    this._parameters.forEach((param: Identifier) => {
      params.push(param.string());
    });
    out += params.join(", ");
    out += ")";
    out += this._body.string();
    return out;
  }

  parameters(): Identifier[] {
    return this._parameters;
  }

  body(): BlockStatement {
    return this._body;
  }
}

export default FunctionLiteral;
