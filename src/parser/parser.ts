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
import BooleanLiteral from "../ast/boolean-literal";
import BlockStatement from "../ast/block-statement";
import IfExpression from "../ast/if-expression";
import FunctionLiteral from "../ast/function-literal";
import CallExpression from "../ast/call-expression";
import TokenPointer from "./token-pointer";
import ErrorList from "./error-list";
import IdentifierParser from "./identifier-parser";

class Parser {
  private _errors: ErrorList;
  private _tokenPointer: TokenPointer;

  constructor(lexer: Lexer) {
    this._errors = new ErrorList();
    this._tokenPointer = new TokenPointer(lexer, this._errors);
  }

  public get errors(): string[] {
    return this._errors.list();
  }

  public parseProgram(): Program {
    const program: Program = new Program();
    while (!this._tokenPointer.curTokenIs(TokenType.EOF)) {
      const stmt: Statement = this.parseStatement();
      if (stmt) {
        program.appendStatement(stmt);
      }
      this._tokenPointer.advance();;
    }
    return program;
  }

  private parseStatement(): Statement {
    switch (this._tokenPointer.curTokenType()) {
      case TokenType.LET:
        return this.parseLetStatement();
      case TokenType.RETURN:
        return this.parseReturnStatement();
      default:
        return this.parseExpressionStatement();
    }
  }

  private parseLetStatement(): Statement {
    const localToken: Token = this._tokenPointer.curToken();;
    if (!this._tokenPointer.expectPeek(TokenType.IDENT)) {
      return new NullStatement();
    }

    const name: Identifier = new Identifier(
      this._tokenPointer.curToken(),
      this._tokenPointer.curTokenLiteral()
    );

    if (!this._tokenPointer.expectPeek(TokenType.ASSIGN)) {
      return new NullStatement();
    }

    this._tokenPointer.advance();;

    const value: Expression = this.parseExpression(Precedence.LOWEST);

    if (this._tokenPointer.peekTokenIs(TokenType.SEMICOLON)) {
      this._tokenPointer.advance();;
    }

    return new LetStatement(localToken, name, value);
  }

  private parseReturnStatement(): ReturnStatememt {
    const localToken: Token = this._tokenPointer.curToken();
    this._tokenPointer.advance();;
    const returnValue: Expression = this.parseExpression(Precedence.LOWEST);
    if (this._tokenPointer.peekTokenIs(TokenType.SEMICOLON)) {
      this._tokenPointer.advance();;
    }
    return new ReturnStatememt(localToken, returnValue);
  }

  private parseExpressionStatement(): ExpressionStatement {
    const localToken: Token = this._tokenPointer.curToken();
    const expression: Expression = this.parseExpression(Precedence.LOWEST);
    if (this._tokenPointer.peekTokenIs(TokenType.SEMICOLON)) {
      this._tokenPointer.advance();;
    }
    return new ExpressionStatement(localToken, expression);
  }

  private parseExpression(precedence: Precedence): Expression {
    const prefix: Expression = this.prefixParseFn();
    if (prefix instanceof NullExpression) {
      this.noPrefixParseFnError(this._tokenPointer.curTokenType());
      return new NullExpression();
    }
    let leftExp: Expression = prefix;

    while (
      !this._tokenPointer.peekTokenIs(TokenType.SEMICOLON) &&
      precedence < this.peekPrecedence()
    ) {
      this._tokenPointer.advance();;
      const infix: Expression = this.infixParseFn(leftExp);
      if (infix instanceof NullExpression) {
        return leftExp;
      }
      leftExp = infix;
    }
    return leftExp;
  }

  private parseIdentifier(): Expression {
    return new Identifier(this._tokenPointer.curToken(), this._tokenPointer.curTokenLiteral());
  }

  private parseIntegerLiteral(): Expression {
    const localToken: Token = this._tokenPointer.curToken();
    if (!Number.isInteger(Number(localToken.literal))) {
      const msg = `could not parse ${localToken.literal} as integer`;
      this.errors.push(msg);
      return new NullExpression();
    }
    return new IntegerLiteral(localToken, Number(localToken.literal));
  }

  private parseBoolean(): Expression {
    return new BooleanLiteral(this._tokenPointer.curToken(), this._tokenPointer.curTokenIs(TokenType.TRUE));
  }

  private parsePrefixExpression(): Expression {
    const localToken: Token = this._tokenPointer.curToken();
    this._tokenPointer.advance();;
    return new PrefixExpression(
      localToken,
      localToken.literal,
      this.parseExpression(Precedence.PREFIX)
    );
  }

  private parseInfixExpression(left: Expression): Expression {
    const localToken: Token = this._tokenPointer.curToken();
    const precedence: Precedence = this.curPrecedence();
    this._tokenPointer.advance();;
    return new InfixExpression(
      localToken,
      left,
      localToken.literal,
      this.parseExpression(precedence)
    );
  }

  private parseGroupedExpression(): Expression {
    this._tokenPointer.advance();;
    const exp: Expression = this.parseExpression(Precedence.LOWEST);
    if (!this._tokenPointer.expectPeek(TokenType.RPAREN)) {
      return new NullExpression();
    }
    return exp;
  }

  private parseIfExpression(): Expression {
    const localToken: Token = this._tokenPointer.curToken();
    if (!this._tokenPointer.expectPeek(TokenType.LPAREN)) {
      return new NullExpression();
    }
    this._tokenPointer.advance();;
    const condition: Expression = this.parseExpression(Precedence.LOWEST);
    if (!this._tokenPointer.expectPeek(TokenType.RPAREN)) {
      return new NullExpression();
    }
    if (!this._tokenPointer.expectPeek(TokenType.LBRACE)) {
      return new NullExpression();
    }
    const consequence: BlockStatement = this.parseBlockStatement();

    if (!this._tokenPointer.peekTokenIs(TokenType.ELSE)) {
      return new IfExpression(localToken, condition, consequence);
    }
    this._tokenPointer.advance();;
    if (!this._tokenPointer.expectPeek(TokenType.LBRACE)) {
      return new NullExpression();
    }
    const alternative: BlockStatement = this.parseBlockStatement();
    return new IfExpression(localToken, condition, consequence, alternative);
  }

  private parseBlockStatement(): BlockStatement {
    const localToken: Token = this._tokenPointer.curToken();
    this._tokenPointer.advance();;
    const bs: Statement[] = [];
    while (
      !this._tokenPointer.curTokenIs(TokenType.RBRACE) &&
      !this._tokenPointer.curTokenIs(TokenType.EOF)
    ) {
      const stmt: Statement = this.parseStatement();
      if (!(stmt instanceof NullStatement)) {
        bs.push(stmt);
      }
      this._tokenPointer.advance();;
    }
    return new BlockStatement(localToken, bs);
  }

  private parseFunctionLiteral(): Expression {
    const localToken: Token = this._tokenPointer.curToken();

    if (!this._tokenPointer.expectPeek(TokenType.LPAREN)) {
      return new NullExpression();
    }
    const parameters: Identifier[] = this.parseFunctionParameters();
    if (!this._tokenPointer.expectPeek(TokenType.LBRACE)) {
      return new NullExpression();
    }
    const body: BlockStatement = this.parseBlockStatement();
    return new FunctionLiteral(localToken, parameters, body);
  }

  private parseFunctionParameters(): Identifier[] {
    const identifiers: Identifier[] = [];
    if (this._tokenPointer.peekTokenIs(TokenType.RPAREN)) {
      this._tokenPointer.advance();;
      return identifiers;
    }

    this._tokenPointer.advance();;
    let ident: Identifier = new Identifier(
      this._tokenPointer.curToken(),
      this._tokenPointer.curTokenLiteral()
    );
    identifiers.push(ident);

    while (this._tokenPointer.peekTokenIs(TokenType.COMMA)) {
      this._tokenPointer.advance();;
      this._tokenPointer.advance();;
      ident = new Identifier(this._tokenPointer.curToken(), this._tokenPointer.curTokenLiteral());
      identifiers.push(ident);
    }
    if (!this._tokenPointer.expectPeek(TokenType.RPAREN)) {
      return [];
    }
    return identifiers;
  }

  private parseCallExpression(func: Expression): Expression {
    const localToken: Token = this._tokenPointer.curToken();
    const args: Expression[] = this.parseCallArguments();
    return new CallExpression(localToken, func, args);
  }

  private parseCallArguments(): Expression[] {
    const args: Expression[] = [];
    if (this._tokenPointer.peekTokenIs(TokenType.RPAREN)) {
      this._tokenPointer.advance();;
      return args;
    }

    this._tokenPointer.advance();;
    args.push(this.parseExpression(Precedence.LOWEST));

    while (this._tokenPointer.peekTokenIs(TokenType.COMMA)) {
      this._tokenPointer.advance();;
      this._tokenPointer.advance();;
      args.push(this.parseExpression(Precedence.LOWEST));
    }

    if (!this._tokenPointer.expectPeek(TokenType.RPAREN)) {
      return [];
    }

    return args;
  }

  private prefixParseFn(): Expression {
    const ctt: TokenType = this._tokenPointer.curTokenType();
    switch (ctt) {
      case TokenType.IDENT:
        const ip: IdentifierParser = new IdentifierParser(this._tokenPointer);
        return ip.parse();
      // return this.parseIdentifier();
      case TokenType.INT:
        return this.parseIntegerLiteral();
      case TokenType.BANG:
      case TokenType.MINUS:
        return this.parsePrefixExpression();
      case TokenType.TRUE:
      case TokenType.FALSE:
        return this.parseBoolean();
      case TokenType.LPAREN:
        return this.parseGroupedExpression();
      case TokenType.IF:
        return this.parseIfExpression();
      case TokenType.FUNCTION:
        return this.parseFunctionLiteral();
      default:
        return new NullExpression();
    }
  }

  private infixParseFn(left: Expression): Expression {
    const ctt: TokenType = this._tokenPointer.curTokenType();
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
      case TokenType.LPAREN:
        return this.parseCallExpression(left);
      default:
        return new NullExpression();
    }
  }

  private noPrefixParseFnError(t: TokenType): void {
    const msg = `no prefix parse function for ${t} found`;
    this._errors.add(msg);
  }

  private peekPrecedence(): Precedence {
    return precedences(this._tokenPointer.peekTokenType());
  }

  private curPrecedence(): Precedence {
    return precedences(this._tokenPointer.curTokenType());
  }
}

export default Parser;
