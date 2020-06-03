import Expression from "./expression";

class NullExpression implements Expression {
  private _node: string = NullExpression.name;

  tokenLiteral(): string {
    return "";
  }
  string(): string {
    return "NULL EXPRESSION";
  }
}

export default NullExpression;
