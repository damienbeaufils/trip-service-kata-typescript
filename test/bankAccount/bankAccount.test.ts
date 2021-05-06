import {BankAccount, InsufficientFundsError, InvalidAmountError} from "../../src/bankAccount/bankAccount";

describe("BankAccount", () => {
  let bankAccount;
  beforeEach(() => {
    bankAccount = new BankAccount();
  });

  describe("deposit()", () => {
    it("should have a balance of 10 when deposit 10 dollars on a new account", () => {
      // when
      bankAccount.deposit(10);

      // then
      expect(bankAccount.getBalance()).toEqual(10);
    });

    it("should have a balance of 35 when deposit 15 dollars on an account having already 20 dollars", () => {
      // given
      bankAccount.deposit(20);

      // when
      bankAccount.deposit(15);

      // then
      expect(bankAccount.getBalance()).toEqual(35);
    });

    it("should not change balance and throw an error given amount = 0", () => {
      // given
      bankAccount.deposit(10);

      // when
      const result = () => bankAccount.deposit(0);

      // then
      expect(result).toThrow(new InvalidAmountError("Invalid amount"));
      expect(bankAccount.getBalance()).toEqual(10);
    });

    it("should not change balance and throw an error given amount < 0", () => {
      // given
      bankAccount.deposit(10);

      // when
      const result = () => bankAccount.deposit(-1);

      // then
      expect(result).toThrow(new InvalidAmountError("Invalid amount"));
      expect(bankAccount.getBalance()).toEqual(10);
    });

    it("should not change balance and throw an error given a NaN amount", () => {
      // given
      bankAccount.deposit(10);

      // when
      const result = () => bankAccount.deposit(NaN);

      // then
      expect(result).toThrow(new InvalidAmountError("Invalid amount"));
      expect(bankAccount.getBalance()).toEqual(10);
    });
  });

  describe("withdraw()", () => {
    it("should have a balance of 0 when withdrawing all the money in your account", () => {
      // given
      bankAccount.deposit(10);

      // when
      bankAccount.withdraw(10);

      // then
      expect(bankAccount.getBalance()).toEqual(0);
    });

    it("should have a balance of 10 when withdrawing 10 dollars on an account containing 20 dollars", () => {
      // given
      bankAccount.deposit(20);

      // when
      bankAccount.withdraw(10);

      // then
      expect(bankAccount.getBalance()).toEqual(10);
    });

    it("should not change balance and throw an insufficient funds error when withdrawing an amount greater than balance", () => {
      // given
      bankAccount.deposit(10);

      // when
      const result = () => bankAccount.withdraw(20);

      // then
      expect(result).toThrow(new InsufficientFundsError("Insufficient funds"));
      expect(bankAccount.getBalance()).toEqual(10);
    });

    it("should not change balance and throw an error given amount = 0", () => {
      // given
      bankAccount.deposit(10);

      // when
      const result = () => bankAccount.withdraw(0);

      // then
      expect(result).toThrow(new InvalidAmountError("Invalid amount"));
      expect(bankAccount.getBalance()).toEqual(10);
    });

    it("should not change balance and throw an error given amount < 0", () => {
      // given
      bankAccount.deposit(10);

      // when
      const result = () => bankAccount.withdraw(-1);

      // then
      expect(result).toThrow(new InvalidAmountError("Invalid amount"));
      expect(bankAccount.getBalance()).toEqual(10);
    });

    it("should not change balance and throw an error given a NaN amount", () => {
      // given
      bankAccount.deposit(10);

      // when
      const result = () => bankAccount.withdraw(NaN);

      // then
      expect(result).toThrow(new InvalidAmountError("Invalid amount"));
      expect(bankAccount.getBalance()).toEqual(10);
    });
  });

  describe('transfer', () => {
    let fromBankAccount;
    let toBankAccount;
    beforeEach(() => {
      fromBankAccount = new BankAccount();
      toBankAccount = new BankAccount();
    });

    it('', () => {
      throw Error('do me')
    })
  })
});
