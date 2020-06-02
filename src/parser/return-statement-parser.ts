import Parsable from "./parsable";
import TokenPointer from "./token-pointer";
import TokenType from "../token/token-type";
import Statement from "../ast/statement";
import Token from "../token/token";
import Expression from "../ast/expression";
import { Precedence } from "./precedence";
import ReturnStatememt from "../ast/return-statement";
import ExpressionParser from "./expression-parser";

class ReturnStatementParser implements Parsable {
  private _tokenPointer: TokenPointer;

  constructor(tp: TokenPointer) {
    this._tokenPointer = tp;
  }

  public parse(): Statement {
    const localToken: Token = this._tokenPointer.curToken();
    this._tokenPointer.advance();
    const ep: Parsable = new ExpressionParser(
      this._tokenPointer,
      Precedence.LOWEST
    );
    const returnValue: Expression = ep.parse();
    if (this._tokenPointer.peekTokenIs(TokenType.SEMICOLON)) {
      this._tokenPointer.advance();
    }
    return new ReturnStatememt(localToken, returnValue);
  }
}

export default ReturnStatementParser;
