import Statement from "./statement";

class NullStatement implements Statement {
  statementNode(): void {}
  tokenLiteral(): string {
    return "";
  }
  string(): string {
    return "NULL STATEMENT";
  }
}

export default NullStatement;
