import Parsable from "./parsable";
import TokenPointer from "./token-pointer";
import TokenType from "../token/token-type";
import Expression from "../ast/expression";
import NullExpression from "../ast/null-expression";
import ExpressionParser from "./expression-parser";
import { Precedence } from "./precedence";

class GroupedExpressionParser implements Parsable {
  private _tokenPointer: TokenPointer;

  constructor(tp: TokenPointer) {
    this._tokenPointer = tp;
  }

  public parse(): Expression {
    this._tokenPointer.advance();
    const ep: Parsable = new ExpressionParser(
      this._tokenPointer,
      Precedence.LOWEST
    );
    const exp: Expression = ep.parse();
    if (!this._tokenPointer.expectPeek(TokenType.RPAREN)) {
      return new NullExpression();
    }
    return exp;
  }
}

export default GroupedExpressionParser;
