import Lexer from "../lexer/lexer";
import Program from "../ast/program";
import TokenType from "../token/token-type";
import Statement from "../ast/statement";
import TokenPointer from "./token-pointer";
import ErrorList from "./error-list";
import Parsable from "./parsable";
import StatementParser from "./statement-parser";

class Parser {
  private _errors: ErrorList;
  private _tokenPointer: TokenPointer;

  constructor(lexer: Lexer) {
    this._errors = new ErrorList();
    this._tokenPointer = new TokenPointer(lexer, this._errors);
  }

  public errorsExist(): boolean {
    return !this._errors.isEmpty();
  }

  public errors(): string[] {
    return this._errors.list();
  }

  public parseProgram(): Program {
    const program: Program = new Program();
    while (!this._tokenPointer.curTokenIs(TokenType.EOF)) {
      const sp: Parsable = new StatementParser(this._tokenPointer);
      const stmt: Statement = sp.parse();
      if (stmt) {
        program.appendStatement(stmt);
      }
      this._tokenPointer.advance();
    }
    return program;
  }
}

export default Parser;
