import Node from "./node";
import Statement from "./statement";

class Program implements Node {
  private _statements: Statement[] = [];

  public statements(): Statement[] {
    return this._statements;
  }

  public statementAt(i: number): Statement {
    return this._statements[i];
  }

  public appendStatement(statement: Statement): void {
    this._statements.push(statement);
  }

  public tokenLiteral(): string {
    if (this._statements.length > 0) {
      return this._statements[0].tokenLiteral();
    }
    return "";
  }
}

export default Program;
