import Lexer from "../lexer/lexer";
import Parser from "../parser/parser";
import Program from "../ast/program";

abstract class REPL {
  constructor() {}

  protected handleInputLine(input: string): void {
    const l: Lexer = new Lexer(input);
    const p: Parser = new Parser(l);
    const program: Program = p.parseProgram();
    if (p.errorsExist()) {
      this.printParseErrors(p.errors());
    } else {
      // this.writeLine(program.string());
      this.writeLine(program.astString());
    }
  }

  private printParseErrors(errors: string[]): void {
    errors.forEach((e: string) => this.writeLine(`\t${e}`));
  }

  public abstract start(): void;

  public abstract getLine(): void;

  public abstract writeLine(out: string): void;
}

export default REPL;
