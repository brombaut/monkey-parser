import Expression from "./expression";
import Token from "../token/token";

class ArrayLiteral implements Expression {
  private _node: string = "ArrayLiteral";
  private _token: Token;
  private _elements: Expression[];
  constructor(token: Token, elements: Expression[]) {
    this._token = token;
    this._elements = elements;
  }

  tokenLiteral(): string {
    return this._token.literal();
  }

  string(): string {
    const strElems: string[] = [];
    this._elements.forEach((e: Expression) => {
      strElems.push(e.string());
    });
    return `[${strElems.join(", ")}]`;
  }

  elements(): Expression[] {
    return this._elements;
  }
}

export default ArrayLiteral;
