import Statement from "./statement";
import Token from "../token/token";
import Identifier from "./identifier";
import Expression from "./expression";

class LetStatement implements Statement {
  private _token: Token;
  private _name: Identifier;
  private _value: Expression | null;

  constructor(token: Token, name: Identifier, value: Expression | null) {
    this._token = token;
    this._name = name;
    this._value = value;
  }

  statementNode(): void { }

  tokenLiteral(): string {
    return this._token.literal;
  }

  get name(): Identifier {
    return this._name;
  }
}

export default LetStatement;
