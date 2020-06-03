import Statement from "./statement";
import Token from "../token/token";
import Identifier from "./identifier";
import Expression from "./expression";

class LetStatement implements Statement {
  private _node: string = LetStatement.name;
  private _token: Token;
  private _name: Identifier;
  private _value: Expression;

  constructor(token: Token, name: Identifier, value: Expression) {
    this._token = token;
    this._name = name;
    this._value = value;
  }

  tokenLiteral(): string {
    return this._token.literal();
  }

  string(): string {
    return `${this._token.literal()} ${this._name.string()} = ${this._value.string()};`;
  }

  name(): Identifier {
    return this._name;
  }

  value(): Expression {
    return this._value;
  }
}

export default LetStatement;
