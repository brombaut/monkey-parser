import ExpressionStatement from "../../ast/expression-statement";
import Statement from "../../ast/statement";
import StringLiteral from "../../ast/string-literal";

export function testStringLiteralExpression(
  stmt: Statement,
  value: string
): void {
  expect(stmt).toBeInstanceOf(ExpressionStatement);
  const es: ExpressionStatement = stmt as ExpressionStatement;
  expect(es.expression()).toBeInstanceOf(StringLiteral);
  const literal: StringLiteral = es.expression() as StringLiteral;
  expect(literal.value()).toEqual(value);
}
