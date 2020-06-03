import Parsable from "./parsable";
import TokenPointer from "./token-pointer";
import Expression from "../ast/expression";
import Token from "../token/token";
import ExpressionParser from "./expression-parser";
import { Precedence } from "./precedence";
import InfixExpression from "../ast/infix-expression";

class InfixExpressionParser implements Parsable {
  private _tokenPointer: TokenPointer;
  private _left: Expression;

  constructor(tp: TokenPointer, left: Expression) {
    this._tokenPointer = tp;
    this._left = left;
  }

  public parse(): Expression {
    const localToken: Token = this._tokenPointer.curToken();
    const precedence: Precedence = this._tokenPointer.curPrecedence();
    this._tokenPointer.advance();
    const ep: Parsable = new ExpressionParser(this._tokenPointer, precedence);
    return new InfixExpression(
      localToken,
      this._left,
      localToken.literal(),
      ep.parse()
    );
  }
}

export default InfixExpressionParser;
