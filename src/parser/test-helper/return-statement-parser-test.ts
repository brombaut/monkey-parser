import Statement from "../../ast/statement";
import ReturnStatement from "../../ast/return-statement";
import { testLiteralExpression } from "./literal-expression-parser-test";

export type ReturnStatementParserTest = {
  input: string;
  expectedValue: string | number | boolean;
};

export function testReturnStatement(
  stmt: Statement,
  expected: ReturnStatementParserTest
): void {
  expect(stmt).toBeInstanceOf(ReturnStatement);
  const returnStmt: ReturnStatement = stmt as ReturnStatement;
  expect(returnStmt.tokenLiteral()).toEqual("return");
  testLiteralExpression(returnStmt.returnValue(), expected.expectedValue);
}
