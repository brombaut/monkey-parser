import Node from "./node";

interface Expression extends Node {
  expressionNode(): void;
}

export default Expression;
