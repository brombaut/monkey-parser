import Lexer from "../lexer/lexer";
import Parser from "./parser";
import Program from "../ast/program";
import Statement from "../ast/statement";
import LetStatement from "../ast/let-statement";

describe("Parser", () => {
  it("should parse let statements", () => {
    const input = `
      let x = 5;
      let y = 10;
      let foobar = 838383;
    `;

    const l: Lexer = new Lexer(input);
    const p: Parser = new Parser(l);
    const program: Program = p.parseProgram();
    checkParserErrors(p);

    expect(program).not.toBeNull();
    expect(program.statements()).toHaveLength(3);

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
});

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
