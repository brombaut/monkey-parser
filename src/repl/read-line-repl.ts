import * as readline from "readline";
import { Interface } from "readline";
import REPL from "./repl";

class ReadLineREPL extends REPL {
  private _rl: Interface;

  constructor() {
    super();
    this._rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this._rl.setPrompt(">> ");
  }

  public start(): void {
    this._rl.prompt();
    this._rl.on("line", (input: string) => {
      this.handleInputLine(input);
      if (this.errors().length > 0) {
        this.printParseErrors(this.errors());
      } else {
        this.writeLine(JSON.stringify(JSON.parse(this.ast()), null, 4));
      }
      this._rl.prompt();
    });
  }

  private printParseErrors(errors: string[]): void {
    errors.forEach((e: string) => this.writeLine(`\t${e}`));
  }

  public writeLine(out: string): void {
    console.log(out);
  }
}

export default ReadLineREPL;
