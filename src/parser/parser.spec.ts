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
import { testIndexExpression } from "./test-helper/index-expression-parser-test";
import {
  testEmptyHashLiteral,
  testHashLiteralWithExpressions,
  testHashLiteralsStringKeys
} from "./test-helper/hash-literal-parser-test";
import Expression from "../ast/expression";

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
      },
      {
        input: "a * [1, 2, 3, 4][b * c] * d",
        expected: "((a * ([1, 2, 3, 4][(b * c)])) * d)"
      },
      {
        input: "add(a * b[2], b[1], 2 * [1, 2][1])",
        expected: "add((a * (b[2])), (b[1]), (2 * ([1, 2][1])))"
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

  it("should parse index expressions", () => {
    const input = "myArray[1 + 1]";
    const program: Program = parserProgramForTest(input, 1);
    testIndexExpression(program.statementAt(0));
  });

  it("should parse hash literals", () => {
    const inputStringKeys = '{"one": 1, "two": 2, "three": 3}';
    const programStringKeys: Program = parserProgramForTest(inputStringKeys, 1);
    const expectedStringKeys: Map<string, number> = new Map<string, number>();
    expectedStringKeys.set("one", 1);
    expectedStringKeys.set("two", 2);
    expectedStringKeys.set("three", 3);
    testHashLiteralsStringKeys(
      programStringKeys.statementAt(0),
      expectedStringKeys
    );

    const inputEmpty = "{}";
    const programEmpty: Program = parserProgramForTest(inputEmpty, 1);
    testEmptyHashLiteral(programEmpty.statementAt(0));

    const inputExpressions = '{"one": 0 + 1, "two": 10 - 8, "three": 15 / 5}';
    const programExpressions: Program = parserProgramForTest(
      inputExpressions,
      1
    );
    const expectedExpressions: Map<string, Function> = new Map<
      string,
      Function
    >();
    expectedExpressions.set("one", function (e: Expression) {
      const iept: InfixExpressionParserTest = {
        input: "0 + 1",
        leftValue: 0,
        operator: "+",
        rightValue: 1
      };
      testInfixExpression(e, iept);
    });
    expectedExpressions.set("two", function (e: Expression) {
      const iept: InfixExpressionParserTest = {
        input: "10 - 8",
        leftValue: 10,
        operator: "-",
        rightValue: 8
      };
      testInfixExpression(e, iept);
    });
    expectedExpressions.set("three", function (e: Expression) {
      const iept: InfixExpressionParserTest = {
        input: "15 / 5",
        leftValue: 15,
        operator: "/",
        rightValue: 5
      };
      testInfixExpression(e, iept);
    });
    testHashLiteralWithExpressions(
      programExpressions.statementAt(0),
      expectedExpressions
    );
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
