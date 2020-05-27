import Token from "../token/token";
import Expression from "./expression";
import Statement from "./statement";

class ReturnStatememt implements Statement {
  private _token: Token;
  private _returnValue: Expression;

  constructor(token: Token, returnValue: Expression) {
    this._token = token;
    this._returnValue = returnValue;
  }
  string(): string {
    return `${this.tokenLiteral()} ${this._returnValue?.string()}'`;
  }
  statementNode(): void {}

  tokenLiteral(): string {
    return this._token.literal;
  }

  returnValue(): Expression {
    return this._returnValue;
  }
}

export default ReturnStatememt;
