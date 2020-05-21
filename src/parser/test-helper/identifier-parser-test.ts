import Expression from "../../ast/expression";
import Identifier from "../../ast/identifier";

export function testIdentifier(exp: Expression, value: string): void {
  expect(exp).toBeInstanceOf(Identifier);
  const ident: Identifier = exp as Identifier;
  expect(ident.value()).toEqual(value);
  expect(ident.tokenLiteral()).toEqual(value);
}
