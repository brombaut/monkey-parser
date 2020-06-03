import REPL from "./repl/repl";

let repl: REPL;

exports.parse = function (input: string): void {
  repl = new REPL();
  repl.start(input);
  if (repl.errors().length > 0) {
    throw "Could not parse input";
  }
};

exports.ast = function (): string {
  return repl.ast();
};

exports.errors = function (): string[] {
  return repl.errors();
};
