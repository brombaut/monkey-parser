enum Precedence {
  LOWEST = 1,
  EQUALS, // =
  LESSGREATER, // > or <
  SUM, // +
  PRODUCT, // *
  PREFIX, // -X or !X
  CALL, // myFunction(X)
  INDEX // array[index]
}

export default Precedence;
