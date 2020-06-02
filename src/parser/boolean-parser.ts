import Parsable from "./parsable";
import TokenPointer from "./token-pointer";
import TokenType from "../token/token-type";
import Expression from "../ast/expression";
import BooleanLiteral from "../ast/boolean-literal";

class BooleanParser implements Parsable {
  private _tokenPointer: TokenPointer;

  constructor(tp: TokenPointer) {
    this._tokenPointer = tp;
  }

  public parse(): Expression {
    return new BooleanLiteral(
      this._tokenPointer.curToken(),
      this._tokenPointer.curTokenIs(TokenType.TRUE)
    );
  }
}

export default BooleanParser;
