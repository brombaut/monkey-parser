import TokenType from "./token-type";

interface Token {
  type: TokenType;
  literal: string;
}

export default Token;
