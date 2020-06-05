import Lexer from "../lexer/lexer";
import Parser from "./parser";
import Program from "../ast/program";
import Statement from "../ast/statement";
import {
  LetStatementParserTest,
  testLetStatement
} from "./test-helper/let-statement-parser-test";
import {
  testReturnStatement,
  ReturnStatementParserTest
} from "./test-helper/return-statement-parser-test";
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
import ExpressionStatement from "../ast/expression-statement";
import {
  testIfExpression,
  testIfElseExpression
} from "./test-helper/if-expression-parser-test";
import {
  testFunctionLiteralParsing,
  FunctionParameterParsingTest,
  testFunctionParameterParsing
} from "./test-helper/function-literal-parsing-parser-test";
import { testCallExpressionParsing } from "./test-helper/call-expression-parser-test";
import { testStringLiteralExpression } from "./test-helper/string-literal-expression-parser-test";
import { testArrayLiteral } from "./test-helper/array-literal-parser-test";

describe("Parser", () => {
  it("should parse let statements", () => {
    const letTests: LetStatementParserTest[] = [
      { input: "let x = 5;", expectedIdentifier: "x", expectedValue: 5 },
      { input: "let y = true;", expectedIdentifier: "y", expectedValue: true },
      {
        input: "let foobar = y;",
        expectedIdentifier: "foobar",
        expectedValue: "y"
      }
    ];
    letTests.forEach((lt: LetStatementParserTest) => {
      const program: Program = parserProgramForTest(lt.input, 1);
      testLetStatement(program.statementAt(0), lt);
    });
  });

  it("should parse return statements", () => {
    const returnTests: ReturnStatementParserTest[] = [
      { input: "return 5;", expectedValue: 5 },
      { input: "return true;", expectedValue: true },
      { input: "return foobar;", expectedValue: "foobar" }
    ];
    returnTests.forEach((rt: ReturnStatementParserTest) => {
      const program: Program = parserProgramForTest(rt.input, 1);
      testReturnStatement(program.statementAt(0), rt);
    });
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
      const stmt: Statement = program.statementAt(0);
      expect(stmt).toBeInstanceOf(ExpressionStatement);
      const expressionStmt: ExpressionStatement = stmt as ExpressionStatement;
      testInfixExpression(expressionStmt.expression(), it);
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
      { input: "!(true == true)", expected: "(!(true == true))" },
      { input: "a + add(b * c) + d", expected: "((a + add((b * c))) + d)" },
      {
        input: "add(a, b, 1, 2 * 3, 4 + 5, add(6, 7 * 8))",
        expected: "add(a, b, 1, (2 * 3), (4 + 5), add(6, (7 * 8)))"
      },
      {
        input: "add(a + b + c * d / f + g)",
        expected: "add((((a + b) + ((c * d) / f)) + g))"
      }
    ];
    opTests.forEach((opt: OperatorPrecedenceParserTest) => {
      const program: Program = parserProgramForTest(opt.input, -1);
      expect(program.string()).toEqual(opt.expected);
    });
  });

  it("should parse if expressions", () => {
    const input = "if (x < y) { x }";
    const program: Program = parserProgramForTest(input, 1);
    testIfExpression(program.statementAt(0));
  });

  it("should parse if-else expressions", () => {
    const input = "if (x < y) { x } else { y }";
    const program: Program = parserProgramForTest(input, 1);
    testIfElseExpression(program.statementAt(0));
  });

  it("should parse function literals", () => {
    const input = "fn(x, y) { x + y; }";
    const program: Program = parserProgramForTest(input, 1);
    testFunctionLiteralParsing(program.statementAt(0));
  });

  it("should parse function parameters", () => {
    const fpTests: FunctionParameterParsingTest[] = [
      { input: "fn() {};", expectedParams: [] },
      { input: "fn(x) {};", expectedParams: ["x"] },
      { input: "fn(x, y, z) {};", expectedParams: ["x", "y", "z"] }
    ];
    fpTests.forEach((fpTest: FunctionParameterParsingTest) => {
      const program: Program = parserProgramForTest(fpTest.input, 1);
      testFunctionParameterParsing(program.statementAt(0), fpTest);
    });
  });

  it("should parse call expressions", () => {
    const input = "add(1, 2 * 3, 4 + 5);";
    const program: Program = parserProgramForTest(input, 1);
    testCallExpressionParsing(program.statementAt(0));
  });

  it("should parse string literals", () => {
    const input = '"hello world"';
    const program: Program = parserProgramForTest(input, 1);
    testStringLiteralExpression(program.statementAt(0), "hello world");
  });

  it("should parse array literals", () => {
    const input = "[1, 2 * 3, 3 + 3]";
    const program: Program = parserProgramForTest(input, 1);
    testArrayLiteral(program.statementAt(0));
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
  const errors: string[] = p.errors();
  errors.forEach((e: string) => {
    console.error(`parser error: ${e}`);
  });
  expect(errors).toHaveLength(0);
}
