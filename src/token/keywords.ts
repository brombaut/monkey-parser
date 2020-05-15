import { TokenType } from "./token-type";

type Keyword = { [s: string]: TokenType };

const keywords: Keyword = {
  "function": TokenType.FUNCTION,
  "let": TokenType.LET,
}

const lookupIdent = function (ident: string): TokenType {
  if (keywords[ident]) {
    return keywords[ident];
  }
  return TokenType.IDENT;
};

export default lookupIdent;
