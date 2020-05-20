import Lexer from "../lexer/lexer";
import Token from "../token/token";
import Program from "../ast/program";
import TokenType from "../token/token-type";
import Statement from "../ast/statement";
import LetStatement from "../ast/let-statement";
import Identifier from "../ast/identifier";
import ReturnStatememt from "../ast/return-statement";
import ExpressionStatement from "../ast/expression-statement";
import Expression from "../ast/expression";
import { Precedence, precedences } from "./precedence";
import NullExpression from "../ast/null-expression";
import NullStatement from "../ast/null-statement";
import IntegerLiteral from "../ast/integer-literal";
import PrefixExpression from "../ast/prefix-expression";
import InfixExpression from "../ast/infix-expression";

class Parser {
  private _lexer: Lexer;
  private _curToken!: Token;
  private _peekToken!: Token;
  private _errors: string[];

  constructor(lexer: Lexer) {
    this._lexer = lexer;
    this._errors = [];

    this.nextToken();
    this.nextToken();
  }

  public get errors(): string[] {
    return this._errors;
  }

  public parseProgram(): Program {
    const program: Program = new Program();
    while (this._curToken.type !== TokenType.EOF) {
      const stmt: Statement | null = this.parseStatement();
      if (stmt) {
        program.appendStatement(stmt);
      }
      this.nextToken();
    }
    return program;
  }

  private parseStatement(): Statement {
    switch (this._curToken.type) {
      case TokenType.LET:
        return this.parseLetStatement() || new NullStatement();
      case TokenType.RETURN:
        return this.parseReturnStatement();
      default:
        return this.parseExpressionStatement();
    }
  }

  private parseLetStatement(): LetStatement | null {
    const localToken: Token = this._curToken;
    if (!this.expectPeek(TokenType.IDENT)) {
      return null;
    }

    const name: Identifier = new Identifier(
      this._curToken,
      this._curToken.literal
    );

    if (!this.expectPeek(TokenType.ASSIGN)) {
      return null;
    }

    // TODO: Skipe expression until semicolon
    while (!this.curTokenIs(TokenType.SEMICOLON)) {
      this.nextToken();
    }
    return new LetStatement(localToken, name, null);
  }

  private parseReturnStatement(): ReturnStatememt {
    const localToken: Token = this._curToken;
    this.nextToken();
    // TODO: Skipe expression until semicolon
    while (!this.curTokenIs(TokenType.SEMICOLON)) {
      this.nextToken();
    }
    return new ReturnStatememt(localToken, null);
  }

  private parseExpressionStatement(): ExpressionStatement {
    const localToken: Token = this._curToken;
    const expression: Expression = this.parseExpression(Precedence.LOWEST);
    if (this.peekTokenIs(TokenType.SEMICOLON)) {
      this.nextToken();
    }
    return new ExpressionStatement(localToken, expression);
  }

  private parseExpression(precedence: Precedence): Expression {
    const prefix: Expression = this.prefixParseFn();
    if (prefix instanceof NullExpression) {
      this.noPrefixParseFnError(this._curToken.type);
      return new NullExpression();
    }
    let leftExp: Expression = prefix;

    while (
      !this.peekTokenIs(TokenType.SEMICOLON) &&
      precedence < this.peekPrecedence()
    ) {
      this.nextToken();
      const infix: Expression = this.infixParseFn(leftExp);
      if (infix instanceof NullExpression) {
        return leftExp;
      }
      leftExp = infix;
    }
    return leftExp;
  }

  private parseIdentifier(): Expression {
    return new Identifier(this._curToken, this._curToken.literal);
  }

  private parseIntegerLiteral(): Expression {
    const localToken: Token = this._curToken;
    if (!Number.isInteger(Number(localToken.literal))) {
      const msg = `could not parse ${localToken.literal} as integer`;
      this.errors.push(msg);
      return new NullExpression();
    }
    return new IntegerLiteral(localToken, Number(localToken.literal));
  }

  private parsePrefixExpression(): Expression {
    const localToken: Token = this._curToken;
    this.nextToken();
    return new PrefixExpression(
      localToken,
      localToken.literal,
      this.parseExpression(Precedence.PREFIX)
    );
  }

  private prefixParseFn(): Expression {
    const ctt: TokenType = this._curToken.type;
    switch (ctt) {
      case TokenType.IDENT:
        return this.parseIdentifier();
      case TokenType.INT:
        return this.parseIntegerLiteral();
      case TokenType.BANG:
      case TokenType.MINUS:
        return this.parsePrefixExpression();
      default:
        return new NullExpression();
    }
  }

  private parseInfixExpression(left: Expression): Expression {
    const localToken: Token = this._curToken;
    const precedence: Precedence = this.curPrecedence();
    this.nextToken();
    return new InfixExpression(
      localToken,
      left,
      localToken.literal,
      this.parseExpression(precedence)
    );
  }

  private infixParseFn(left: Expression): Expression {
    const ctt: TokenType = this._curToken.type;
    switch (ctt) {
      case TokenType.PLUS:
      case TokenType.MINUS:
      case TokenType.SLASH:
      case TokenType.ASTERISK:
      case TokenType.EQ:
      case TokenType.NOT_EQ:
      case TokenType.LT:
      case TokenType.GT:
        return this.parseInfixExpression(left);
      default:
        return new NullExpression();
    }
  }

  private noPrefixParseFnError(t: TokenType): void {
    const msg = `no prefix parse function for ${t} found`;
    this._errors.push(msg);
  }

  private nextToken(): void {
    this._curToken = this._peekToken;
    this._peekToken = this._lexer.nextToken();
  }

  private curTokenIs(t: TokenType): boolean {
    return this._curToken.type === t;
  }

  private peekTokenIs(t: TokenType): boolean {
    return this._peekToken.type === t;
  }

  private expectPeek(t: TokenType): boolean {
    if (this.peekTokenIs(t)) {
      this.nextToken();
      return true;
    }
    this.peekError(t);
    return false;
  }

  private peekError(t: TokenType): void {
    const msg = `expected next token to be ${t}, got ${this._peekToken.type} instead`;
    this._errors.push(msg);
  }

  private peekPrecedence(): Precedence {
    return precedences(this._peekToken.type);
  }

  private curPrecedence(): Precedence {
    return precedences(this._curToken.type);
  }
}

export default Parser;
