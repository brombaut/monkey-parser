import Statement from "../../ast/statement";
import ExpressionStatement from "../../ast/expression-statement";
import {
  InfixExpressionParserTest,
  testInfixExpression
} from "./infix-expression-parser-test";
import IndexExpression from "../../ast/index-expression";
import { testIdentifier } from "./identifier-parser-test";

export function testIndexExpression(stmt: Statement): void {
  expect(stmt).toBeInstanceOf(ExpressionStatement);
  const es: ExpressionStatement = stmt as ExpressionStatement;
  expect(es.expression()).toBeInstanceOf(IndexExpression);
  const indexExp: IndexExpression = es.expression() as IndexExpression;
  testIdentifier(indexExp.left(), "myArray");
  const indexExpTest: InfixExpressionParserTest = {
    input: "1 + 1",
    leftValue: 1,
    operator: "+",
    rightValue: 1
  };
  testInfixExpression(indexExp.index(), indexExpTest);
}
