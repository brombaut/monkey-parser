import Statement from "./statement";

class NullStatement implements Statement {
  private _node: string = "NullStatement";

  tokenLiteral(): string {
    return "";
  }
  string(): string {
    return "NULL STATEMENT";
  }
}

export default NullStatement;
