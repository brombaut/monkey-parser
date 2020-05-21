import Expression from "../../ast/expression";
import { testIntegerLiteral } from "./integer-literal-parser-test";
import { testIdentifier } from "./identifier-parser-test";

export function testLiteralExpression(
  exp: Expression,
  expected: number | string
) {
  switch (typeof expected) {
    case "number":
      return testIntegerLiteral(exp, expected as number);
    case "string":
      return testIdentifier(exp, expected as string);
    default:
      fail(`type of exp not handled. got=${exp}`);
  }
}
