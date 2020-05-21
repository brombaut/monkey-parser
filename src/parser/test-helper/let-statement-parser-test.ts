import Statement from "../../ast/statement";
import LetStatement from "../../ast/let-statement";

export type LetStatementParserTest = {
  expectedIdentifier: string;
};

export function testLetStatement(s: Statement, name: string): void {
  expect(s.tokenLiteral()).toEqual("let");
  expect(s).toBeInstanceOf(LetStatement);
  const letStmt: LetStatement = s as LetStatement;
  expect(letStmt.name().value()).toEqual(name);
  expect(letStmt.name().tokenLiteral()).toEqual(name);
}
