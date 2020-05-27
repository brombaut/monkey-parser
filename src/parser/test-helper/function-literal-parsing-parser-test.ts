import Statement from "../../ast/statement";
import ExpressionStatement from "../../ast/expression-statement";
import FunctionLiteral from "../../ast/function-literal";
import { testLiteralExpression } from "./literal-expression-parser-test";
import {
  testInfixExpression,
  InfixExpressionParserTest
} from "./infix-expression-parser-test";

export function testFunctionLiteralParsing(stmt: Statement): void {
  expect(stmt).toBeInstanceOf(ExpressionStatement);
  const expStmt: ExpressionStatement = stmt as ExpressionStatement;
  expect(expStmt.expression()).toBeInstanceOf(FunctionLiteral);
  const func: FunctionLiteral = expStmt.expression() as FunctionLiteral;
  expect(func.parameters()).toHaveLength(2);
  testLiteralExpression(func.parameters()[0], "x");
  testLiteralExpression(func.parameters()[1], "y");
  expect(func.body().statements()).toHaveLength(1);
  expect(func.body().statements()[0]).toBeInstanceOf(ExpressionStatement);
  const bodyStmt: ExpressionStatement = func
    .body()
    .statements()[0] as ExpressionStatement;
  const bodyTest: InfixExpressionParserTest = {
    input: "x + y",
    leftValue: "x",
    operator: "+",
    rightValue: "y"
  };
  testInfixExpression(bodyStmt.expression(), bodyTest);
}

export type FunctionParameterParsingTest = {
  input: string;
  expectedParams: string[];
};

export function testFunctionParameterParsing(
  stmt: Statement,
  expected: FunctionParameterParsingTest
): void {
  expect(stmt).toBeInstanceOf(ExpressionStatement);
  const expStmt: ExpressionStatement = stmt as ExpressionStatement;
  expect(expStmt.expression()).toBeInstanceOf(FunctionLiteral);
  const func: FunctionLiteral = expStmt.expression() as FunctionLiteral;
  expect(func.parameters().length).toEqual(expected.expectedParams.length);
  expected.expectedParams.forEach((p: string, i: number) => {
    testLiteralExpression(func.parameters()[i], p);
  });
}
