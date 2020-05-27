import TokenType from "./token-type";

type Keyword = { [s: string]: TokenType };

const keywords: Keyword = {
  fn: TokenType.FUNCTION,
  let: TokenType.LET,
  true: TokenType.TRUE,
  false: TokenType.FALSE,
  if: TokenType.IF,
  else: TokenType.ELSE,
  return: TokenType.RETURN
};

const lookupIdent = function (ident: string): TokenType {
  if (keywords[ident]) {
    return keywords[ident];
  }
  return TokenType.IDENT;
};

export default lookupIdent;
