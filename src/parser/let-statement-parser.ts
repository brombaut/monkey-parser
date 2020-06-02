import Parsable from "./parsable";
import TokenPointer from "./token-pointer";
import TokenType from "../token/token-type";
import Statement from "../ast/statement";
import Token from "../token/token";
import NullStatement from "../ast/null-statement";
import Identifier from "../ast/identifier";
import Expression from "../ast/expression";
import { Precedence } from "./precedence";
import LetStatement from "../ast/let-statement";
import ExpressionParser from "./expression-parser";

class LetStatementParser implements Parsable {
  private _tokenPointer: TokenPointer;

  constructor(tp: TokenPointer) {
    this._tokenPointer = tp;
  }

  public parse(): Statement {
    const localToken: Token = this._tokenPointer.curToken();
    if (!this._tokenPointer.expectPeek(TokenType.IDENT)) {
      return new NullStatement();
    }

    const name: Identifier = new Identifier(
      this._tokenPointer.curToken(),
      this._tokenPointer.curTokenLiteral()
    );

    if (!this._tokenPointer.expectPeek(TokenType.ASSIGN)) {
      return new NullStatement();
    }

    this._tokenPointer.advance();

    const ep: Parsable = new ExpressionParser(
      this._tokenPointer,
      Precedence.LOWEST
    );
    const value: Expression = ep.parse();

    if (this._tokenPointer.peekTokenIs(TokenType.SEMICOLON)) {
      this._tokenPointer.advance();
    }

    return new LetStatement(localToken, name, value);
  }
}

export default LetStatementParser;
