import Parsable from "./parsable";
import TokenPointer from "./token-pointer";
import TokenType from "../token/token-type";
import Statement from "../ast/statement";
import LetStatementParser from "./let-statement-parser";
import ReturnStatementParser from "./return-statement-parser";
import ExpressionStatementParser from "./expression-statement-parser";

class StatementParser implements Parsable {
  private _tokenPointer: TokenPointer;

  constructor(tp: TokenPointer) {
    this._tokenPointer = tp;
  }

  public parse(): Statement {
    let p: Parsable;
    switch (this._tokenPointer.curTokenType()) {
      case TokenType.LET:
        p = new LetStatementParser(this._tokenPointer);
        break;
      case TokenType.RETURN:
        p = new ReturnStatementParser(this._tokenPointer);
        break;
      default:
        p = new ExpressionStatementParser(this._tokenPointer);
        break;
    }
    return p.parse();
  }
}

export default StatementParser;
