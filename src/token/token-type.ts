export enum TokenType {
  ILLEGAL = "ILLEGAL",
  EOF = "EOF",

  // Identifiers + literals
  IDENT = "IDENT",  // add, footer, x, y, ...
  INT = "INT",    // 134325
  STRING = "STRING", // "foobar"

  // Operators
  ASSIGN = "=",
  PLUS = "+",

  // Delimiters
  COMMA = ",",
  SEMICOLON = ";",

  LPAREN = "(",
  RPAREN = ")",
  LBRACE = "{",
  RBRACE = "}",

  // Keywords
  FUNCTION = "FUNCTION",
  LET = "LET",
};