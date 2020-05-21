import Lexer from "../lexer/lexer";
import Parser from "./parser";
import Program from "../ast/program";
import Statement from "../ast/statement";
import {
  LetStatementParserTest,
  testLetStatement
} from "./test-helper/let-statement-parser-test";
import { testReturnStatement } from "./test-helper/return-statement-parser-test";
import { testIdentifierExpression } from "./test-helper/identifier-expression-parser-test";
import { testIntegerLiteralExpression } from "./test-helper/integer-literal-expression-parser-test";
import {
  PrefixExpressionParserTest,
  testPrefixExpression
} from "./test-helper/prefix-expression-parser-test";
import {
  InfixExpressionParserTest,
  testInfixExpression
} from "./test-helper/infix-expression-parser-test";
import { OperatorPrecedenceParserTest } from "./test-helper/operator-precedence-parsing-test";

describe("Parser", () => {
  it("should parse let statements", () => {
    const input = `
      let x = 5;
      let y = 10;
      let foobar = 838383;
    `;
    const program: Program = parserProgramForTest(input, 3);
    const tests: LetStatementParserTest[] = [
      { expectedIdentifier: "x" },
      { expectedIdentifier: "y" },
      { expectedIdentifier: "foobar" }
    ];
    tests.forEach((pt: LetStatementParserTest, i: number) => {
      const stmt: Statement = program.statementAt(i);
      testLetStatement(stmt, pt.expectedIdentifier);
    });
  });

  it("should parse return statements", () => {
    const input = `
      return 5;
      return 10;
      return 838383;
    `;
    const program: Program = parserProgramForTest(input, 3);
    program.statements().forEach(testReturnStatement);
  });

  it("should parse identifier expressions", () => {
    const input = `foobar;`;
    const program: Program = parserProgramForTest(input, 1);
    program.statements().forEach((stmt: Statement) => {
      testIdentifierExpression(stmt, "foobar");
    });
  });

  it("should parse prefix expressions", () => {
    const prefixTests: PrefixExpressionParserTest[] = [
      { input: "!5", operator: "!", value: 5 },
      { input: "-15", operator: "-", value: 15 },
      { input: "!true", operator: "!", value: true },
      { input: "!false", operator: "!", value: false }
    ];
    prefixTests.forEach((pt: PrefixExpressionParserTest) => {
      const program: Program = parserProgramForTest(pt.input, 1);
      testPrefixExpression(program.statementAt(0), pt);
    });
  });

  it("should parse integer literal expressions", () => {
    const input = `5;`;
    const program: Program = parserProgramForTest(input, 1);
    program.statements().forEach((stmt: Statement) => {
      testIntegerLiteralExpression(stmt, 5);
    });
  });

  it("should parse infix expressions", () => {
    const infixTests: InfixExpressionParserTest[] = [
      { input: "5 + 5", leftValue: 5, operator: "+", rightValue: 5 },
      { input: "5 - 5", leftValue: 5, operator: "-", rightValue: 5 },
      { input: "5 * 5", leftValue: 5, operator: "*", rightValue: 5 },
      { input: "5 / 5", leftValue: 5, operator: "/", rightValue: 5 },
      { input: "5 > 5", leftValue: 5, operator: ">", rightValue: 5 },
      { input: "5 < 5", leftValue: 5, operator: "<", rightValue: 5 },
      { input: "5 == 5", leftValue: 5, operator: "==", rightValue: 5 },
      { input: "5 != 5", leftValue: 5, operator: "!=", rightValue: 5 },
      {
        input: "true == true",
        leftValue: true,
        operator: "==",
        rightValue: true
      },
      {
        input: "true != false",
        leftValue: true,
        operator: "!=",
        rightValue: false
      },
      {
        input: "false == false",
        leftValue: false,
        operator: "==",
        rightValue: false
      }
    ];
    infixTests.forEach((it: InfixExpressionParserTest) => {
      const program: Program = parserProgramForTest(it.input, 1);
      testInfixExpression(program.statementAt(0), it);
    });
  });

  it("should parse infix expressions with correct operator precedence", () => {
    const opTests: OperatorPrecedenceParserTest[] = [
      { input: "-a * b", expected: "((-a) * b)" },
      { input: "!-a", expected: "(!(-a))" },
      { input: "a + b + c", expected: "((a + b) + c)" },
      { input: "a + b - c", expected: "((a + b) - c)" },
      { input: "a * b * c", expected: "((a * b) * c)" },
      { input: "a * b / c", expected: "((a * b) / c)" },
      { input: "a + b / c", expected: "(a + (b / c))" },
      {
        input: "a + b * c + d / e - f",
        expected: "(((a + (b * c)) + (d / e)) - f)"
      },
      { input: "3 + 4; -5 * 5", expected: "(3 + 4)((-5) * 5)" },
      { input: "5 > 4 == 3 < 4", expected: "((5 > 4) == (3 < 4))" },
      { input: "5 < 4 != 3 > 4", expected: "((5 < 4) != (3 > 4))" },
      {
        input: "3 + 4 * 5 == 3 * 1 + 4 * 5",
        expected: "((3 + (4 * 5)) == ((3 * 1) + (4 * 5)))"
      },
      { input: "true", expected: "true" },
      { input: "false", expected: "false" },
      { input: "3 > 5 == false", expected: "((3 > 5) == false)" },
      { input: "3 < 5 == true", expected: "((3 < 5) == true)" },
      { input: "1 + (2 + 3) + 4", expected: "((1 + (2 + 3)) + 4)" },
      { input: "(5 + 5) * 2", expected: "((5 + 5) * 2)" },
      { input: "2 / (5 + 5)", expected: "(2 / (5 + 5))" },
      { input: "(5 + 5) * 2 * (5 + 5)", expected: "(((5 + 5) * 2) * (5 + 5))" },
      { input: "-(5 + 5)", expected: "(-(5 + 5))" },
      { input: "!(true == true)", expected: "(!(true == true))" }
    ];
    opTests.forEach((opt: OperatorPrecedenceParserTest) => {
      const program: Program = parserProgramForTest(opt.input, -1);
      expect(program.string()).toEqual(opt.expected);
    });
  });
});

function parserProgramForTest(input: string, numOfStatement: number): Program {
  const l: Lexer = new Lexer(input);
  const p: Parser = new Parser(l);
  const program: Program = p.parseProgram();
  checkParserErrors(p);
  expect(program).not.toBeNull();
  if (numOfStatement >= 0)
    expect(program.statements()).toHaveLength(numOfStatement);
  return program;
}

function checkParserErrors(p: Parser): void {
  const errors: string[] = p.errors;
  errors.forEach((e: string) => {
    console.error(`parser error: ${e}`);
  });
  expect(errors).toHaveLength(0);
}
