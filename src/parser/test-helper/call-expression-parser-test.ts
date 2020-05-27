import Statement from "../../ast/statement";
import ExpressionStatement from "../../ast/expression-statement";
import CallExpression from "../../ast/call-expression";
import { testIdentifier } from "./identifier-parser-test";
import { testLiteralExpression } from "./literal-expression-parser-test";
import {
  testInfixExpression,
  InfixExpressionParserTest
} from "./infix-expression-parser-test";

export function testCallExpressionParsing(stmt: Statement): void {
  expect(stmt).toBeInstanceOf(ExpressionStatement);
  const expStmt: ExpressionStatement = stmt as ExpressionStatement;
  expect(expStmt.expression()).toBeInstanceOf(CallExpression);
  const exp: CallExpression = expStmt.expression() as CallExpression;
  testIdentifier(exp.function(), "add");
  expect(exp.arguments()).toHaveLength(3);
  testLiteralExpression(exp.arguments()[0], 1);
  const arg1InfixTest: InfixExpressionParserTest = {
    input: "2 * 3",
    leftValue: 2,
    operator: "*",
    rightValue: 3
  };
  testInfixExpression(exp.arguments()[1], arg1InfixTest);
  const arg2InfixTest: InfixExpressionParserTest = {
    input: "4 + 5",
    leftValue: 4,
    operator: "+",
    rightValue: 5
  };
  testInfixExpression(exp.arguments()[2], arg2InfixTest);
}
