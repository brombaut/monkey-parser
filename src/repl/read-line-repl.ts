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
      this._rl.prompt();
    });
  }

  public getLine(): void {}

  public writeLine(out: string): void {
    // this._rl.write(out);
    console.log(out);
  }
}

export default ReadLineREPL;
