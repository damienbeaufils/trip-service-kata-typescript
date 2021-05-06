export class BankAccount {

  private balance: number = 0;

  public deposit(amount: number) {
    if (isNaN(amount) || amount <= 0 ) {
      throw new InvalidAmountError('Invalid amount')
    }
    this.balance += amount;
  }

  public getBalance(): number {
    return this.balance;
  }
}

export class InvalidAmountError extends Error {}