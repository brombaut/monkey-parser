import Parsable from "./parsable";
import TokenPointer from "./token-pointer";
import Expression from "../ast/expression";
import Token from "../token/token";
import CallExpression from "../ast/call-expression";
import TokenType from "../token/token-type";
import { Precedence } from "./precedence";
import ExpressionParser from "./expression-parser";

class CallExpressionParser implements Parsable {
  private _tokenPointer: TokenPointer;
  private _func: Expression;

  constructor(tp: TokenPointer, func: Expression) {
    this._tokenPointer = tp;
    this._func = func;
  }

  public parse(): Expression {
    const localToken: Token = this._tokenPointer.curToken();
    const args: Expression[] = this.parseCallArguments();
    return new CallExpression(localToken, this._func, args);
  }

  private parseCallArguments(): Expression[] {
    const args: Expression[] = [];
    if (this._tokenPointer.peekTokenIs(TokenType.RPAREN)) {
      this._tokenPointer.advance();
      return args;
    }

    this._tokenPointer.advance();
    let ep: Parsable = new ExpressionParser(
      this._tokenPointer,
      Precedence.LOWEST
    );
    args.push(ep.parse());

    while (this._tokenPointer.peekTokenIs(TokenType.COMMA)) {
      this._tokenPointer.advance();
      this._tokenPointer.advance();
      ep = new ExpressionParser(this._tokenPointer, Precedence.LOWEST);
      args.push(ep.parse());
    }

    if (!this._tokenPointer.expectPeek(TokenType.RPAREN)) {
      return [];
    }

    return args;
  }
}

export default CallExpressionParser;
