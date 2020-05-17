import Statement from "../../ast/statement";
import ExpressionStatement from "../../ast/expression-statement";
import PrefixExpression from "../../ast/prefix-expression";
import { testIntegerLiteral } from "./integer-literal-parser-test";

export type PrefixExpressionParserTest = {
  input: string;
  operator: string;
  integerValue: number;
};

export function testPrefixExpression(
  stmt: Statement,
  expected: PrefixExpressionParserTest
) {
  expect(stmt).toBeInstanceOf(ExpressionStatement);
  const expressionStmt: ExpressionStatement = stmt as ExpressionStatement;
  expect(expressionStmt.expression()).toBeInstanceOf(PrefixExpression);
  const prefixExpression: PrefixExpression = expressionStmt.expression() as PrefixExpression;
  expect(prefixExpression.operator()).toEqual(expected.operator);
  testIntegerLiteral(prefixExpression.right(), expected.integerValue);
}
