import Statement from "../ast/statement";
import Expression from "../ast/expression";

interface Parsable {
  parse(): Statement | Expression;
}

export default Parsable;
