import Expression from "../../ast/expression";
import IntegerLiteral from "../../ast/integer-literal";

export function testIntegerLiteral(il: Expression, value: number): void {
  expect(il).toBeInstanceOf(IntegerLiteral);
  const integ: IntegerLiteral = il as IntegerLiteral;
  expect(integ.value()).toEqual(value);
  expect(integ.tokenLiteral()).toEqual(value.toString());
}
