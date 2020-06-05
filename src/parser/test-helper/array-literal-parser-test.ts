import Statement from "../../ast/statement";
import ExpressionStatement from "../../ast/expression-statement";
import ArrayLiteral from "../../ast/array-literal";
import { testIntegerLiteral } from "./integer-literal-parser-test";
import {
  InfixExpressionParserTest,
  testInfixExpression
} from "./infix-expression-parser-test";

export function testArrayLiteral(stmt: Statement): void {
  expect(stmt).toBeInstanceOf(ExpressionStatement);
  const es: ExpressionStatement = stmt as ExpressionStatement;
  expect(es.expression()).toBeInstanceOf(ArrayLiteral);
  const array: ArrayLiteral = es.expression() as ArrayLiteral;
  expect(array.elements()).toHaveLength(3);
  testIntegerLiteral(array.elements()[0], 1);
  const elem1Test: InfixExpressionParserTest = {
    input: "2 * 3",
    leftValue: 2,
    operator: "*",
    rightValue: 3
  };
  testInfixExpression(array.elements()[1], elem1Test);
  const elem2Test: InfixExpressionParserTest = {
    input: "3 + 3",
    leftValue: 3,
    operator: "+",
    rightValue: 3
  };
  testInfixExpression(array.elements()[2], elem2Test);
}
