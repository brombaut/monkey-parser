import Parsable from "./parsable";
import TokenPointer from "./token-pointer";
import TokenType from "../token/token-type";
import Expression from "../ast/expression";
import NullExpression from "../ast/null-expression";
import Token from "../token/token";
import BlockStatement from "../ast/block-statement";
import Identifier from "../ast/identifier";
import FunctionLiteral from "../ast/function-literal";
import BlockStatementParser from "./block-statement-parser";

class FunctionLiteralParser implements Parsable {
  private _tokenPointer: TokenPointer;

  constructor(tp: TokenPointer) {
    this._tokenPointer = tp;
  }

  public parse(): Expression {
    const localToken: Token = this._tokenPointer.curToken();

    if (!this._tokenPointer.expectPeek(TokenType.LPAREN)) {
      return new NullExpression();
    }
    const parameters: Identifier[] = this.parseFunctionParameters();
    if (!this._tokenPointer.expectPeek(TokenType.LBRACE)) {
      return new NullExpression();
    }
    const bsp: Parsable = new BlockStatementParser(this._tokenPointer);
    const body: BlockStatement = bsp.parse() as BlockStatement;
    return new FunctionLiteral(localToken, parameters, body);
  }

  private parseFunctionParameters(): Identifier[] {
    const identifiers: Identifier[] = [];
    if (this._tokenPointer.peekTokenIs(TokenType.RPAREN)) {
      this._tokenPointer.advance();
      return identifiers;
    }

    this._tokenPointer.advance();
    let ident: Identifier = new Identifier(
      this._tokenPointer.curToken(),
      this._tokenPointer.curTokenLiteral()
    );
    identifiers.push(ident);

    while (this._tokenPointer.peekTokenIs(TokenType.COMMA)) {
      this._tokenPointer.advance();
      this._tokenPointer.advance();
      ident = new Identifier(
        this._tokenPointer.curToken(),
        this._tokenPointer.curTokenLiteral()
      );
      identifiers.push(ident);
    }
    if (!this._tokenPointer.expectPeek(TokenType.RPAREN)) {
      return [];
    }
    return identifiers;
  }
}

export default FunctionLiteralParser;
