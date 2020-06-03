import Lexer from "../lexer/lexer";
import Parser from "../parser/parser";
import Program from "../ast/program";

class REPL {
  private _ast: string;
  private _errors: string[];

  constructor() {
    this._ast = "";
    this._errors = [];
  }

  protected handleInputLine(input: string): void {
    const l: Lexer = new Lexer(input);
    const p: Parser = new Parser(l);
    const program: Program = p.parseProgram();
    if (p.errorsExist()) {
      this._errors = p.errors();
      this._ast = "";
    } else {
      this._errors = [];
      this._ast = program.astString();
    }
  }

  public start(input: string): void {
    this.handleInputLine(input);
  }

  public ast(): string {
    return this._ast;
  }

  public errors(): string[] {
    return this._errors;
  }
}

export default REPL;
