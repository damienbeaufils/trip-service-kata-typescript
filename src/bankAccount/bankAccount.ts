
export class BankAccount {

  private balance: number = 0;

  public deposit(amount: number): void {
    BankAccount.assertAmountIsValid(amount);
    this.balance += amount;
  }

  public withdraw(amount: number): void {
    BankAccount.assertAmountIsValid(amount);
    if (amount > this.balance) {
      throw new InsufficientFundsError("Insufficient funds");
    }
    this.balance -= amount;
  }

  public transfer(recipient: BankAccount, amount: number): void {
    this.withdraw(amount);
    recipient.deposit(amount);
  }

  public getBalance(): number {
    return this.balance;
  }
  
  private static isInvalidAmount(amount: number): boolean {
    return isNaN(amount) || amount <= 0;
  }
  
  private static assertAmountIsValid(amount: number): void {
    if (BankAccount.isInvalidAmount(amount)) {
      throw new InvalidAmountError("Invalid amount");
    }
  }
}

export class InvalidAmountError extends Error {
}

export class InsufficientFundsError extends Error {
}
