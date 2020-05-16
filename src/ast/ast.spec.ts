import Program from "./program";
import LetStatement from "./let-statement";
import Token from "../token/token";
import TokenType from "../token/token-type";
import Identifier from "./identifier";

describe("AST", () => {
  it("should tostring correctly", () => {
    const program: Program = new Program([
      new LetStatement(
        new Token(TokenType.LET, "let"),
        new Identifier(new Token(TokenType.IDENT, "myVar"), "myVar"),
        new Identifier(new Token(TokenType.IDENT, "anotherVar"), "anotherVar")
      )
    ]);

    expect(program.string()).toEqual("let myVar = anotherVar;\n");
  });
});
