import Parsable from "./parsable";
import TokenPointer from "./token-pointer";
import TokenType from "../token/token-type";
import Expression from "../ast/expression";
import NullExpression from "../ast/null-expression";
import IdentifierParser from "./identifier-parser";
import IntegerLiteralParser from "./integer-literal-parser";
import PrefixExpressionParser from "./prefix-expression-parser";
import BooleanParser from "./boolean-parser";
import GroupedExpressionParser from "./grouped-expression-parser";
import IfExpressionParser from "./if-expression-parser";
import FunctionLiteralParser from "./function-literal-parser";
import StringLiteralParser from "./string-literal-parser";
import ArrayLiteralParser from "./array-literal-parser";
import HashLiteralParser from "./hash-literal-parser";

class PrefixParser implements Parsable {
  private _tokenPointer: TokenPointer;

  constructor(tp: TokenPointer) {
    this._tokenPointer = tp;
  }

  public parse(): Expression {
    const ctt: TokenType = this._tokenPointer.curTokenType();
    let p: Parsable;
    switch (ctt) {
      case TokenType.IDENT:
        p = new IdentifierParser(this._tokenPointer);
        break;
      case TokenType.INT:
        p = new IntegerLiteralParser(this._tokenPointer);
        break;
      case TokenType.BANG:
      case TokenType.MINUS:
        p = new PrefixExpressionParser(this._tokenPointer);
        break;
      case TokenType.TRUE:
      case TokenType.FALSE:
        p = new BooleanParser(this._tokenPointer);
        break;
      case TokenType.LPAREN:
        p = new GroupedExpressionParser(this._tokenPointer);
        break;
      case TokenType.LBRACKET:
        p = new ArrayLiteralParser(this._tokenPointer);
        break;
      case TokenType.LBRACE:
        p = new HashLiteralParser(this._tokenPointer);
        break;
      case TokenType.IF:
        p = new IfExpressionParser(this._tokenPointer);
        break;
      case TokenType.FUNCTION:
        p = new FunctionLiteralParser(this._tokenPointer);
        break;
      case TokenType.STRING:
        p = new StringLiteralParser(this._tokenPointer);
        break;
      default:
        return new NullExpression();
    }
    return p.parse();
  }
}

export default PrefixParser;
