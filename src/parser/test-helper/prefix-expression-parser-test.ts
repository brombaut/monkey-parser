import Statement from "../../ast/statement";
import ExpressionStatement from "../../ast/expression-statement";
import PrefixExpression from "../../ast/prefix-expression";
import { testLiteralExpression } from "./literal-expression-parser-test";

export type PrefixExpressionParserTest = {
  input: string;
  operator: string;
  value: number | boolean;
};

export function testPrefixExpression(
  stmt: Statement,
  expected: PrefixExpressionParserTest
): void {
  expect(stmt).toBeInstanceOf(ExpressionStatement);
  const expressionStmt: ExpressionStatement = stmt as ExpressionStatement;
  expect(expressionStmt.expression()).toBeInstanceOf(PrefixExpression);
  const prefixExpression: PrefixExpression = expressionStmt.expression() as PrefixExpression;
  expect(prefixExpression.operator()).toEqual(expected.operator);
  testLiteralExpression(prefixExpression.right(), expected.value);
}
