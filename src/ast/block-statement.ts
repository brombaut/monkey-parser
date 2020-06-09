import Statement from "./statement";
import Token from "../token/token";

class BlockStatement implements Statement {
  private _node = "BlockStatement";
  private _token: Token;
  private _statements: Statement[];

  constructor(token: Token, statements: Statement[]) {
    this._token = token;
    this._statements = statements;
  }

  tokenLiteral(): string {
    return this._token.literal();
  }
  string(): string {
    let out = "";
    this._statements.forEach((stmt: Statement) => {
      out += stmt.string();
    });
    return out;
  }

  statements(): Statement[] {
    return this._statements;
  }
}

export default BlockStatement;
