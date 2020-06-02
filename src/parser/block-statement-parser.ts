import Parsable from "./parsable";
import TokenPointer from "./token-pointer";
import TokenType from "../token/token-type";
import Token from "../token/token";
import BlockStatement from "../ast/block-statement";
import Statement from "../ast/statement";
import NullStatement from "../ast/null-statement";
import StatementParser from "./statement-parser";

class BlockStatementParser implements Parsable {
  private _tokenPointer: TokenPointer;

  constructor(tp: TokenPointer) {
    this._tokenPointer = tp;
  }

  public parse(): BlockStatement {
    const localToken: Token = this._tokenPointer.curToken();
    this._tokenPointer.advance();
    const bs: Statement[] = [];
    while (
      !this._tokenPointer.curTokenIs(TokenType.RBRACE) &&
      !this._tokenPointer.curTokenIs(TokenType.EOF)
    ) {
      const sp: Parsable = new StatementParser(this._tokenPointer);
      const stmt: Statement = sp.parse();
      if (!(stmt instanceof NullStatement)) {
        bs.push(stmt);
      }
      this._tokenPointer.advance();
    }
    return new BlockStatement(localToken, bs);
  }
}

export default BlockStatementParser;
