import Statement from "../../ast/statement";
import ReturnStatement from "../../ast/return-statement";

export function testReturnStatement(stmt: Statement): void {
  expect(stmt).toBeInstanceOf(ReturnStatement);
  const returnStmt: ReturnStatement = stmt as ReturnStatement;
  expect(returnStmt.tokenLiteral()).toEqual("return");
}
