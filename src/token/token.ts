import { TokenType } from "./token-type";

export interface Token {
  type: TokenType;
  literal: string;
}
