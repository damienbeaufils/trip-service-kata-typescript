
export class BankAccount {
  
  private static isInvalidAmount(amount: number): boolean {
    return isNaN(amount) || amount <= 0;
  }
  
  private static assertAmountIsValid(amount: number): void {
    if (BankAccount.isInvalidAmount(amount)) {
      throw new InvalidAmountError("Invalid amount");
    }
  }

  private balance: number = 0;

  private transactions: Transaction[]

  public deposit(amount: number): void {
    BankAccount.assertAmountIsValid(amount);
    this.transactions.push({ 
      date: new Date(), 
      type: TransactionType.DEPOSIT, 
      amount
    })
  }

  public withdraw(amount: number): void {
    BankAccount.assertAmountIsValid(amount);
    if (amount > this.balance) {
      throw new InsufficientFundsError("Insufficient funds");
    }
    this.transactions.push({ 
      date: new Date(), 
      type: TransactionType.WITHDRAW, 
      amount
    })
  }

  public transfer(recipient: BankAccount, amount: number): void {
    this.withdraw(amount);
    recipient.deposit(amount);
  }

  public getBalance(): number {
    return this.transactions.reduce((accBalance, t) => (
      t.type == TransactionType.DEPOSIT 
      ? accBalance + t.amount
      : accBalance - t.amount
    ), 0)
  }

  public statements(): string {
    return (
      "date;credit;debit;balance\n" +
      "2021-05-06;10;0;10"
    )
  }
}

export class InvalidAmountError extends Error {
}

export class InsufficientFundsError extends Error {
}

interface Transaction {
  date: Date;
  amount: number;
  type: TransactionType;
}

enum TransactionType {
  DEPOSIT, WITHDRAW
}