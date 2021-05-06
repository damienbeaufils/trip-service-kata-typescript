export class BankAccount {

  private balance: number = 0;

  public deposit(amount: number): void {
    if (isNaN(amount) || amount <= 0) {
      throw new InvalidAmountError("Invalid amount");
    }
    this.balance += amount;
  }

  public withdraw(amount: number): void {
    if (amount > this.balance) {
      throw new InsufficientFundsError("Insufficient funds");
    }
    this.balance -= amount;
  }

  public getBalance(): number {
    return this.balance;
  }
}

export class InvalidAmountError extends Error {
}

export class InsufficientFundsError extends Error {
}
