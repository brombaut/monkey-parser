import InfixExpression from "../../ast/infix-expression";
import { testLiteralExpression } from "./literal-expression-parser-test";
import Expression from "../../ast/expression";

export type InfixExpressionParserTest = {
  input: string;
  leftValue: number | boolean | string;
  operator: string;
  rightValue: number | boolean | string;
};

export function testInfixExpression(
  exp: Expression,
  expected: InfixExpressionParserTest
): void {
  expect(exp).toBeInstanceOf(InfixExpression);
  const infixExpression: InfixExpression = exp as InfixExpression;
  testLiteralExpression(infixExpression.left(), expected.leftValue);
  expect(infixExpression.operator()).toEqual(expected.operator);
  testLiteralExpression(infixExpression.right(), expected.rightValue);
}
