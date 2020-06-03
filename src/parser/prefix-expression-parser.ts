import Parsable from "./parsable";
import TokenPointer from "./token-pointer";
import Expression from "../ast/expression";
import Token from "../token/token";
import PrefixExpression from "../ast/prefix-expression";
import ExpressionParser from "./expression-parser";
import { Precedence } from "./precedence";

class PrefixExpressionParser implements Parsable {
  private _tokenPointer: TokenPointer;

  constructor(tp: TokenPointer) {
    this._tokenPointer = tp;
  }

  public parse(): Expression {
    const localToken: Token = this._tokenPointer.curToken();
    this._tokenPointer.advance();
    const ep: Parsable = new ExpressionParser(
      this._tokenPointer,
      Precedence.PREFIX
    );
    return new PrefixExpression(localToken, localToken.literal(), ep.parse());
  }
}

export default PrefixExpressionParser;
