import REPL from "./repl/repl";
import ReadLineREPL from "./repl/read-line-repl";

const repl: REPL = new ReadLineREPL();
repl.start();
