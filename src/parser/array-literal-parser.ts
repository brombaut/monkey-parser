import Parsable from "./parsable";
import TokenPointer from "./token-pointer";
import TokenType from "../token/token-type";
import Expression from "../ast/expression";
import Token from "../token/token";
import ExpressionListParser from "./expression-list-parser";
import ArrayLiteral from "../ast/array-literal";

class ArrayLiteralParser implements Parsable {
  private _tokenPointer: TokenPointer;

  constructor(tp: TokenPointer) {
    this._tokenPointer = tp;
  }

  public parse(): Expression {
    const localToken: Token = this._tokenPointer.curToken();
    const elp: ExpressionListParser = new ExpressionListParser(
      this._tokenPointer,
      TokenType.RBRACKET
    );
    const elements: Expression[] = elp.parse();
    return new ArrayLiteral(localToken, elements);
  }
}

export default ArrayLiteralParser;
