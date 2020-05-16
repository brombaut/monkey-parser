import Lexer from "../lexer/lexer";
import Parser from "./parser";
import Program from "../ast/program";
import Statement from "../ast/statement";
import LetStatement from "../ast/let-statement";
import ReturnStatement from "../ast/return-statement";

describe("Parser", () => {
  it("should parse let statements", () => {
    const input = `
      let x = 5;
      let y = 10;
      let foobar = 838383;
    `;

    const program: Program = parserProgramForTest(input, 3);

    type ParserTest = {
      exexpectedIdentifier: string;
    };

    const tests: ParserTest[] = [
      { exexpectedIdentifier: "x" },
      { exexpectedIdentifier: "y" },
      { exexpectedIdentifier: "foobar" }
    ];
    tests.forEach((pt: ParserTest, i: number) => {
      const stmt: Statement = program.statementAt(i);
      testLetStatement(stmt, pt.exexpectedIdentifier);
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
});

function parserProgramForTest(input: string, numOfStatement: number): Program {
  const l: Lexer = new Lexer(input);
  const p: Parser = new Parser(l);
  const program: Program = p.parseProgram();
  checkParserErrors(p);
  expect(program).not.toBeNull();
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

function testLetStatement(s: Statement, name: string): void {
  expect(s.tokenLiteral()).toEqual("let");
  expect(s).toBeInstanceOf(LetStatement);
  const letStmt: LetStatement = s as LetStatement;
  expect(letStmt.name.value).toEqual(name);
  expect(letStmt.name.tokenLiteral()).toEqual(name);
}

function testReturnStatement(stmt: Statement): void {
  expect(stmt).toBeInstanceOf(ReturnStatement);
  const returnStmt: ReturnStatement = stmt as ReturnStatement;
  expect(returnStmt.tokenLiteral()).toEqual("return");
}