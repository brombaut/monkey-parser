import Statement from "./statement";

class NullStatement implements Statement {
  tokenLiteral(): string {
    return "";
  }
  string(): string {
    return "NULL STATEMENT";
  }
}

export default NullStatement;
