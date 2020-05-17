import Statement from "../../ast/statement";
import ExpressionStatement from "../../ast/expression-statement";
import IntegerLiteral from "../../ast/integer-literal";

export function testIntegerLiteralExpression(
  stmt: Statement,
  expectedIntegerLiteral: number
): void {
  expect(stmt).toBeInstanceOf(ExpressionStatement);
  const expressionStmt: ExpressionStatement = stmt as ExpressionStatement;
  expect(expressionStmt.expression()).toBeInstanceOf(IntegerLiteral);
  const literal: IntegerLiteral = expressionStmt.expression() as IntegerLiteral;
  expect(literal.value()).toEqual(expectedIntegerLiteral);
  expect(literal.tokenLiteral()).toEqual(expectedIntegerLiteral.toString());
}
