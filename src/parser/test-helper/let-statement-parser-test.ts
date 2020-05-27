import Statement from "../../ast/statement";
import LetStatement from "../../ast/let-statement";
import { testLiteralExpression } from "./literal-expression-parser-test";

export type LetStatementParserTest = {
  input: string;
  expectedIdentifier: string;
  expectedValue: string | number | boolean;
};

export function testLetStatement(
  s: Statement,
  expected: LetStatementParserTest
): void {
  expect(s.tokenLiteral()).toEqual("let");
  expect(s).toBeInstanceOf(LetStatement);
  const letStmt: LetStatement = s as LetStatement;
  expect(letStmt.name().value()).toEqual(expected.expectedIdentifier);
  expect(letStmt.name().tokenLiteral()).toEqual(expected.expectedIdentifier);
  testLiteralExpression(letStmt.value(), expected.expectedValue);
}
