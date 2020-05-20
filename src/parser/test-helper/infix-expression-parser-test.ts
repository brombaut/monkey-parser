import Statement from "../../ast/statement";
import ExpressionStatement from "../../ast/expression-statement";
import { testIntegerLiteral } from "./integer-literal-parser-test";
import InfixExpression from "../../ast/infix-expression";

export type InfixExpressionParserTest = {
  input: string;
  leftValue: number;
  operator: string;
  rightValue: number;
};

export function testInfixExpression(
  stmt: Statement,
  expected: InfixExpressionParserTest
): void {
  expect(stmt).toBeInstanceOf(ExpressionStatement);
  const expressionStmt: ExpressionStatement = stmt as ExpressionStatement;
  expect(expressionStmt.expression()).toBeInstanceOf(InfixExpression);
  const infixExpression: InfixExpression = expressionStmt.expression() as InfixExpression;
  testIntegerLiteral(infixExpression.left(), expected.leftValue);
  expect(infixExpression.operator()).toEqual(expected.operator);
  testIntegerLiteral(infixExpression.right(), expected.rightValue);
}
