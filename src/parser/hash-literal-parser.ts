import Parsable from "./parsable";
import TokenPointer from "./token-pointer";
import TokenType from "../token/token-type";
import Expression from "../ast/expression";
import Token from "../token/token";
import ExpressionParser from "./expression-parser";
import { Precedence } from "./precedence";
import NullExpression from "../ast/null-expression";
import HashLiteral from "../ast/hash-literal";

class HashLiteralParser implements Parsable {
  private _tokenPointer: TokenPointer;

  constructor(tp: TokenPointer) {
    this._tokenPointer = tp;
  }

  public parse(): Expression {
    const localToken: Token = this._tokenPointer.curToken();
    const pairs: Map<Expression, Expression> = new Map<
      Expression,
      Expression
    >();
    while (!this._tokenPointer.peekTokenIs(TokenType.RBRACE)) {
      this._tokenPointer.advance();
      const epKey: Parsable = new ExpressionParser(
        this._tokenPointer,
        Precedence.LOWEST
      );
      const key: Expression = epKey.parse();

      if (!this._tokenPointer.expectPeek(TokenType.COLON)) {
        return new NullExpression();
      }

      this._tokenPointer.advance();
      const epValue: Parsable = new ExpressionParser(
        this._tokenPointer,
        Precedence.LOWEST
      );
      const value: Expression = epValue.parse();
      pairs.set(key, value);

      if (
        !this._tokenPointer.peekTokenIs(TokenType.RBRACE) &&
        !this._tokenPointer.expectPeek(TokenType.COMMA)
      ) {
        return new NullExpression();
      }
    }

    if (!this._tokenPointer.expectPeek(TokenType.RBRACE)) {
      return new NullExpression();
    }

    return new HashLiteral(localToken, pairs);
  }
}

export default HashLiteralParser;
