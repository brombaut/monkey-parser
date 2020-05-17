import Identifier from "../../ast/identifier";
import Statement from "../../ast/statement";
import ExpressionStatement from "../../ast/expression-statement";

export function testIdentifierExpression(
  stmt: Statement,
  expectedIdent: string
): void {
  expect(stmt).toBeInstanceOf(ExpressionStatement);
  const expressionStmt: ExpressionStatement = stmt as ExpressionStatement;
  expect(expressionStmt.expression()).toBeInstanceOf(Identifier);
  const ident: Identifier = expressionStmt.expression() as Identifier;
  expect(ident.value()).toEqual(expectedIdent);
  expect(ident.tokenLiteral()).toEqual(expectedIdent);
}
