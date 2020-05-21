import Expression from "../../ast/expression";
import { testIntegerLiteral } from "./integer-literal-parser-test";
import { testIdentifier } from "./identifier-parser-test";
import { testBooleanLiteral } from "./boolean-literal-parser-test";

export function testLiteralExpression(
  exp: Expression,
  expected: number | string | boolean
): void {
  switch (typeof expected) {
    case "number":
      return testIntegerLiteral(exp, expected as number);
    case "string":
      return testIdentifier(exp, expected as string);
    case "boolean":
      return testBooleanLiteral(exp, expected as boolean);
    default:
      fail(`type of exp not handled. got=${exp}`);
  }
}
