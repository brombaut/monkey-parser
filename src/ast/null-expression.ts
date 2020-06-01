import Expression from "./expression";

class NullExpression implements Expression {
  tokenLiteral(): string {
    return "";
  }
  string(): string {
    return "NULL EXPRESSION";
  }
}

export default NullExpression;
