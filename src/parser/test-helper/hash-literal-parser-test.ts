import Statement from "../../ast/statement";
import ExpressionStatement from "../../ast/expression-statement";
import { testIntegerLiteral } from "./integer-literal-parser-test";
import HashLiteral from "../../ast/hash-literal";

export function testHashLiteralsStringKeys(
  stmt: Statement,
  expected: { [key: string]: number }
): void {
  expect(stmt).toBeInstanceOf(ExpressionStatement);
  const es: ExpressionStatement = stmt as ExpressionStatement;
  expect(es.expression()).toBeInstanceOf(HashLiteral);
  const hash: HashLiteral = es.expression() as HashLiteral;
  expect(hash.length()).toEqual(3);
  for (const [key, value] of Object.entries(hash.pairs())) {
    expect(expected[key]).not.toBeUndefined();
    const expectedValue: number = expected[key];
    testIntegerLiteral(value, expectedValue);
  }
  // hash.pairs().forEach((value: Expression, key: Expression) => {
  //   expect(key).toBeInstanceOf(StringLiteral);
  //   const literal: StringLiteral = key as StringLiteral;
  //   expect(expected.get(literal.string())).not.toBeUndefined();
  //   const expectedValue: number = expected.get(literal.string()) as number;
  //   testIntegerLiteral(value, expectedValue);
  // });
}

export function testEmptyHashLiteral(stmt: Statement): void {
  expect(stmt).toBeInstanceOf(ExpressionStatement);
  const es: ExpressionStatement = stmt as ExpressionStatement;
  expect(es.expression()).toBeInstanceOf(HashLiteral);
  const hash: HashLiteral = es.expression() as HashLiteral;
  expect(hash.length()).toEqual(0);
}

export function testHashLiteralWithExpressions(
  stmt: Statement,
  expected: { [key: string]: Function }
): void {
  expect(stmt).toBeInstanceOf(ExpressionStatement);
  const es: ExpressionStatement = stmt as ExpressionStatement;
  expect(es.expression()).toBeInstanceOf(HashLiteral);
  const hash: HashLiteral = es.expression() as HashLiteral;
  expect(hash.length()).toEqual(3);
  for (const [key, value] of Object.entries(hash.pairs())) {
    expect(expected[key]).not.toBeUndefined();
    const testFunc: Function = expected[key];
    testFunc(value);
  }

  // hash.pairs().forEach((value: Expression, key: Expression) => {
  //   expect(key).toBeInstanceOf(StringLiteral);
  //   const literal: StringLiteral = key as StringLiteral;
  //   expect(expected.get(literal.string())).not.toBeUndefined();
  //   const testFunc: Function = expected.get(literal.string()) as Function;
  //   testFunc(value);
  // });
}
