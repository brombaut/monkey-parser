import Parsable from "./parsable";
import TokenPointer from "./token-pointer";
import TokenType from "../token/token-type";
import Expression from "../ast/expression";
import BooleanLiteral from "../ast/boolean-literal";
import StringLiteral from "../ast/string-literal";

class StringLiteralParser implements Parsable {
  private _tokenPointer: TokenPointer;

  constructor(tp: TokenPointer) {
    this._tokenPointer = tp;
  }

  public parse(): Expression {
    return new StringLiteral(
      this._tokenPointer.curToken(),
      this._tokenPointer.curTokenLiteral()
    );
  }
}

export default StringLiteralParser;
