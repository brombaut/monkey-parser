import Parsable from "./parsable";
import TokenPointer from "./token-pointer";
import TokenType from "../token/token-type";
import Expression from "../ast/expression";
import { Precedence } from "./precedence";
import NullExpression from "../ast/null-expression";
import PrefixParser from "./prefix-parser";
import InfixParser from "./infix-parser";

class ExpressionParser implements Parsable {
  private _tokenPointer: TokenPointer;
  private _precedence: Precedence;

  constructor(tp: TokenPointer, precedence: Precedence) {
    this._tokenPointer = tp;
    this._precedence = precedence;
  }

  public parse(): Expression {
    const pp: Parsable = new PrefixParser(this._tokenPointer);
    const prefix: Expression = pp.parse();
    if (prefix instanceof NullExpression) {
      this._tokenPointer.noPrefixParseFnError(
        this._tokenPointer.curTokenType()
      );
      return new NullExpression();
    }
    let leftExp: Expression = prefix;

    while (
      !this._tokenPointer.peekTokenIs(TokenType.SEMICOLON) &&
      this._precedence < this._tokenPointer.peekPrecedence()
    ) {
      this._tokenPointer.advance();
      const ip: Parsable = new InfixParser(this._tokenPointer, leftExp);
      const infix: Expression = ip.parse();
      if (infix instanceof NullExpression) {
        return leftExp;
      }
      leftExp = infix;
    }
    return leftExp;
  }
}

export default ExpressionParser;
