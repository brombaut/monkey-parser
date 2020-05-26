import Statement from "../../ast/statement";
import ExpressionStatement from "../../ast/expression-statement";
import IfExpression from "../../ast/if-expression";
import {
  testInfixExpression,
  InfixExpressionParserTest
} from "./infix-expression-parser-test";
import { testIdentifier } from "./identifier-parser-test";

export function testIfExpression(stmt: Statement): void {
  expect(stmt).toBeInstanceOf(ExpressionStatement);
  const expressionStmt: ExpressionStatement = stmt as ExpressionStatement;
  expect(expressionStmt.expression()).toBeInstanceOf(IfExpression);
  const exp: IfExpression = expressionStmt.expression() as IfExpression;
  const conditionTest: InfixExpressionParserTest = {
    input: "x < y",
    leftValue: "x",
    operator: "<",
    rightValue: "y"
  };
  testInfixExpression(exp.condition(), conditionTest);
  expect(exp.consequence().statements()).toHaveLength(1);
  expect(exp.consequence().statements()[0]).toBeInstanceOf(ExpressionStatement);
  const consequence: ExpressionStatement = exp
    .consequence()
    .statements()[0] as ExpressionStatement;
  testIdentifier(consequence.expression(), "x");
  expect(exp.alternative()).toBeNull();
}

export function testIfElseExpression(stmt: Statement): void {
  expect(stmt).toBeInstanceOf(ExpressionStatement);
  const expressionStmt: ExpressionStatement = stmt as ExpressionStatement;
  expect(expressionStmt.expression()).toBeInstanceOf(IfExpression);
  const exp: IfExpression = expressionStmt.expression() as IfExpression;
  const conditionTest: InfixExpressionParserTest = {
    input: "x < y",
    leftValue: "x",
    operator: "<",
    rightValue: "y"
  };
  testInfixExpression(exp.condition(), conditionTest);
  expect(exp.consequence().statements()).toHaveLength(1);
  expect(exp.consequence().statements()[0]).toBeInstanceOf(ExpressionStatement);
  const consequence: ExpressionStatement = exp
    .consequence()
    .statements()[0] as ExpressionStatement;
  testIdentifier(consequence.expression(), "x");
  expect(exp.alternative()).not.toBeNull();
  expect(exp.alternative()?.statements()).toHaveLength(1);
  const alternative: ExpressionStatement = exp
    .alternative()
    ?.statements()[0] as ExpressionStatement;
  testIdentifier(alternative.expression(), "y");
}
