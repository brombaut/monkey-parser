import Parsable from "./parsable";
import TokenPointer from "./token-pointer";
import TokenType from "../token/token-type";
import Expression from "../ast/expression";
import NullExpression from "../ast/null-expression";
import ExpressionParser from "./expression-parser";
import { Precedence } from "./precedence";
import Token from "../token/token";
import BlockStatement from "../ast/block-statement";
import IfExpression from "../ast/if-expression";
import BlockStatementParser from "./block-statement-parser";

class IfExpressionParser implements Parsable {
  private _tokenPointer: TokenPointer;

  constructor(tp: TokenPointer) {
    this._tokenPointer = tp;
  }

  public parse(): Expression {
    const localToken: Token = this._tokenPointer.curToken();
    if (!this._tokenPointer.expectPeek(TokenType.LPAREN)) {
      return new NullExpression();
    }
    this._tokenPointer.advance();
    const ep: Parsable = new ExpressionParser(
      this._tokenPointer,
      Precedence.LOWEST
    );
    const condition: Expression = ep.parse();
    if (!this._tokenPointer.expectPeek(TokenType.RPAREN)) {
      return new NullExpression();
    }
    if (!this._tokenPointer.expectPeek(TokenType.LBRACE)) {
      return new NullExpression();
    }
    const cbsp: Parsable = new BlockStatementParser(this._tokenPointer);
    const consequence: BlockStatement = cbsp.parse() as BlockStatement;

    if (!this._tokenPointer.peekTokenIs(TokenType.ELSE)) {
      return new IfExpression(localToken, condition, consequence);
    }
    this._tokenPointer.advance();
    if (!this._tokenPointer.expectPeek(TokenType.LBRACE)) {
      return new NullExpression();
    }
    const absp: Parsable = new BlockStatementParser(this._tokenPointer);
    const alternative: BlockStatement = absp.parse() as BlockStatement;
    return new IfExpression(localToken, condition, consequence, alternative);
  }
}

export default IfExpressionParser;
