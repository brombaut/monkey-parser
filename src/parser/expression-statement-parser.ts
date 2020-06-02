import Parsable from "./parsable";
import TokenPointer from "./token-pointer";
import TokenType from "../token/token-type";
import Statement from "../ast/statement";
import Token from "../token/token";
import Expression from "../ast/expression";
import { Precedence } from "./precedence";
import ExpressionStatement from "../ast/expression-statement";
import ExpressionParser from "./expression-parser";

class ExpressionStatementParser implements Parsable {
  private _tokenPointer: TokenPointer;

  constructor(tp: TokenPointer) {
    this._tokenPointer = tp;
  }

  public parse(): Statement {
    const localToken: Token = this._tokenPointer.curToken();
    const ep: Parsable = new ExpressionParser(
      this._tokenPointer,
      Precedence.LOWEST
    );
    const expression: Expression = ep.parse();
    if (this._tokenPointer.peekTokenIs(TokenType.SEMICOLON)) {
      this._tokenPointer.advance();
    }
    return new ExpressionStatement(localToken, expression);
  }
}

export default ExpressionStatementParser;
