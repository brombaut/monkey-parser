import Parsable from "./parsable";
import TokenPointer from "./token-pointer";
import TokenType from "../token/token-type";
import Expression from "../ast/expression";
import Token from "../token/token";
import { Precedence } from "./precedence";
import ExpressionParser from "./expression-parser";
import NullExpression from "../ast/null-expression";
import IndexExpression from "../ast/index-expression";

class IndexExpressionParser implements Parsable {
  private _tokenPointer: TokenPointer;
  private _left: Expression;

  constructor(tp: TokenPointer, left: Expression) {
    this._tokenPointer = tp;
    this._left = left;
  }

  public parse(): Expression {
    const localToken: Token = this._tokenPointer.curToken();
    this._tokenPointer.advance();
    const ep: Parsable = new ExpressionParser(
      this._tokenPointer,
      Precedence.LOWEST
    );
    const index: Expression = ep.parse();
    if (!this._tokenPointer.expectPeek(TokenType.RBRACKET)) {
      return new NullExpression();
    }
    return new IndexExpression(localToken, this._left, index);
  }
}

export default IndexExpressionParser;
