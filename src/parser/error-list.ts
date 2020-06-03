class ErrorList {
  private _errors: string[];

  constructor() {
    this._errors = [];
  }

  public list(): string[] {
    return this._errors;
  }

  public add(e: string): void {
    this._errors.push(e);
  }

  public isEmpty(): boolean {
    return this._errors.length === 0;
  }
}

export default ErrorList;
