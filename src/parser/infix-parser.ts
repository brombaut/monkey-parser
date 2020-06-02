import Parsable from "./parsable";
import TokenPointer from "./token-pointer";
import TokenType from "../token/token-type";
import Expression from "../ast/expression";
import NullExpression from "../ast/null-expression";
import InfixExpressionParser from "./infix-expression-parser";
import CallExpressionParser from "./call-expression-parser";

class InfixParser implements Parsable {
  private _tokenPointer: TokenPointer;
  private _left: Expression;

  constructor(tp: TokenPointer, left: Expression) {
    this._tokenPointer = tp;
    this._left = left;
  }

  public parse(): Expression {
    const ctt: TokenType = this._tokenPointer.curTokenType();
    let p: Parsable;
    switch (ctt) {
      case TokenType.PLUS:
      case TokenType.MINUS:
      case TokenType.SLASH:
      case TokenType.ASTERISK:
      case TokenType.EQ:
      case TokenType.NOT_EQ:
      case TokenType.LT:
      case TokenType.GT:
        p = new InfixExpressionParser(this._tokenPointer, this._left);
        break;
      case TokenType.LPAREN:
        p = new CallExpressionParser(this._tokenPointer, this._left);
        break;
      default:
        return new NullExpression();
    }
    return p.parse();
  }
}

export default InfixParser;
