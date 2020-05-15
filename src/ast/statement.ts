import Node from "./node";

interface Statement extends Node {
  statementNode(): void;
}

export default Statement;
