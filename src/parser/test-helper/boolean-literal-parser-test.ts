import Expression from "../../ast/expression";
import BooleanLiteral from "../../ast/boolean-literal";

export function testBooleanLiteral(bl: Expression, value: boolean): void {
  expect(bl).toBeInstanceOf(BooleanLiteral);
  const bo: BooleanLiteral = bl as BooleanLiteral;
  expect(bo.value()).toEqual(value);
  expect(bo.tokenLiteral()).toEqual(value.toString());
}
