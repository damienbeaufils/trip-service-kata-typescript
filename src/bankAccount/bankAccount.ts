export class BankAccount {

  private static isInvalidAmount(amount: number): boolean {
    return isNaN(amount) || amount <= 0;
  }

  private static assertAmountIsValid(amount: number): void {
    if (BankAccount.isInvalidAmount(amount)) {
      throw new InvalidAmountError("Invalid amount");
    }
  }

  private transactions: Transaction[] = [];

  public deposit(amount: number): void {
    BankAccount.assertAmountIsValid(amount);
    this.transactions.push(new Transaction(
      new Date(),
      amount,
      TransactionType.DEPOSIT,
    ));
  }

  public withdraw(amount: number): void {
    BankAccount.assertAmountIsValid(amount);
    if (amount > this.getBalance()) {
      throw new InsufficientFundsError("Insufficient funds");
    }
    this.transactions.push(new Transaction(
      new Date(),
      amount,
      TransactionType.WITHDRAW,
    ));
  }

  public transfer(recipient: BankAccount, amount: number): void {
    this.withdraw(amount);
    recipient.deposit(amount);
  }

  public getBalance(): number {
    return this.transactions.reduce((accBalance, t) => (
      t.type === TransactionType.DEPOSIT
        ? accBalance + t.amount
        : accBalance - t.amount
    ), 0);
  }

  public statements(filter?: { type?: TransactionType }): string {
    let balance = 0;
    const statements = [];
    
    for (const transaction of this.transactions) {
      if (transaction.type === TransactionType.DEPOSIT) {
        balance += transaction.amount;
      } else {
        balance -= transaction.amount;
      }
      if (!type || transaction.type === type) {
        statements.push(transaction.toString(balance));
      }
    }
    return (
      "date;credit;debit;balance" + "\n" +
      statements.join("\n")
    );
  }
}

export class InvalidAmountError extends Error {
}

export class InsufficientFundsError extends Error {
}

class Transaction {
  constructor(private readonly _date: Date, private readonly _amount: number, private readonly _type: TransactionType) {
  }

  public toString(balance: number): string {
    let statement = `${this._date.toISOString().split("T")[0]};`;
    statement += this._type === TransactionType.DEPOSIT ? `${this._amount};0;` : `0;${this._amount};`;
    statement += `${balance}`;
    return statement;
  }

  get amount(): number {
    return this._amount;
  }

  get type(): TransactionType {
    return this._type;
  }
}

export enum TransactionType {
  DEPOSIT= "DEPOSIT", WITHDRAW= "WITHDRAW",
}
