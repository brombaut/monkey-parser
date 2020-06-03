import Node from "./node";
import Statement from "./statement";

class Program implements Node {
  private _statements: Statement[] = [];

  constructor(statements?: Statement[]) {
    if (statements) {
      this._statements = statements;
    }
  }

  statements(): Statement[] {
    return this._statements;
  }

  statementAt(i: number): Statement {
    return this._statements[i];
  }

  appendStatement(statement: Statement): void {
    this._statements.push(statement);
  }

  tokenLiteral(): string {
    if (this._statements.length > 0) {
      return this._statements[0].tokenLiteral();
    }
    return "";
  }

  string(): string {
    let out = "";
    this._statements.forEach((stmt: Statement) => {
      out += `${stmt.string()}`;
    });
    return out;
  }

  astString(): string {
    return JSON.stringify(this, null, 4);
  }
}

export default Program;
