import Parsable from "./parsable";
import TokenPointer from "./token-pointer";
import Expression from "../ast/expression";
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
