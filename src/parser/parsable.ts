import Statement from "../ast/statement";
import Expression from "../ast/expression";
import TokenPointer from "./token-pointer";

interface Parsable {
  parse(): Statement | Expression;
}

export default Parsable;