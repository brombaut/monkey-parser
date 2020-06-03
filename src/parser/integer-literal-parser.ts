import Parsable from "./parsable";
import TokenPointer from "./token-pointer";
import Expression from "../ast/expression";
import NullExpression from "../ast/null-expression";
import Token from "../token/token";
import IntegerLiteral from "../ast/integer-literal";

class IntegerLiteralParser implements Parsable {
  private _tokenPointer: TokenPointer;

  constructor(tp: TokenPointer) {
    this._tokenPointer = tp;
  }

  public parse(): Expression {
    const localToken: Token = this._tokenPointer.curToken();
    if (!Number.isInteger(Number(localToken.literal()))) {
      const msg = `could not parse ${localToken.literal()} as integer`;
      this._tokenPointer.addError(msg);
      return new NullExpression();
    }
    return new IntegerLiteral(localToken, Number(localToken.literal()));
  }
}

export default IntegerLiteralParser;
