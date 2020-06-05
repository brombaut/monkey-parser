import Parsable from "./parsable";
import TokenPointer from "./token-pointer";
import TokenType from "../token/token-type";
import Expression from "../ast/expression";
import ExpressionParser from "./expression-parser";
import { Precedence } from "./precedence";

class ExpressionListParser {
  private _tokenPointer: TokenPointer;
  private _end: TokenType;

  constructor(tp: TokenPointer, end: TokenType) {
    this._tokenPointer = tp;
    this._end = end;
  }

  public parse(): Expression[] {
    const list: Expression[] = [];
    if (this._tokenPointer.peekTokenIs(this._end)) {
      this._tokenPointer.advance();
      return list;
    }

    this._tokenPointer.advance();
    let ep: Parsable = new ExpressionParser(
      this._tokenPointer,
      Precedence.LOWEST
    );
    list.push(ep.parse());

    while (this._tokenPointer.peekTokenIs(TokenType.COMMA)) {
      this._tokenPointer.advance();
      this._tokenPointer.advance();
      ep = new ExpressionParser(this._tokenPointer, Precedence.LOWEST);
      list.push(ep.parse());
    }

    if (!this._tokenPointer.expectPeek(this._end)) {
      return [];
    }

    return list;
  }
}

export default ExpressionListParser;
