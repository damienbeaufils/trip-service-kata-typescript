export class BankAccount {

  private balance: number = 0;

  public deposit(amount: number) {
    this.balance += amount;
  }

  public getBalance(): number {
    return this.balance;
  }
}
