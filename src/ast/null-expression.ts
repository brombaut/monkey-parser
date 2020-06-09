import Expression from "./expression";

class NullExpression implements Expression {
  private _node = "NullExpression";

  tokenLiteral(): string {
    return "";
  }
  string(): string {
    return "NULL EXPRESSION";
  }
}

export default NullExpression;
