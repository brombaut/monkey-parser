import TokenType from "../token/token-type";

export enum Precedence {
  LOWEST = 1,
  EQUALS, // =
  LESSGREATER, // > or <
  SUM, // +
  PRODUCT, // *
  PREFIX, // -X or !X
  CALL, // myFunction(X)
  INDEX // array[index]
}

export const precedences = function (tokenType: TokenType): Precedence {
  switch (tokenType) {
    case TokenType.EQ:
    case TokenType.NOT_EQ:
      return Precedence.EQUALS;
    case TokenType.LT:
    case TokenType.GT:
      return Precedence.LESSGREATER;
    case TokenType.PLUS:
    case TokenType.MINUS:
      return Precedence.SUM;
    case TokenType.SLASH:
    case TokenType.ASTERISK:
      return Precedence.PRODUCT;
    default:
      return Precedence.LOWEST;
  }
}