import {BankAccount} from "../../src/bankAccount/bankAccount";

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

    it('should ', () => {
      // given

      // when
      const result = () => bankAccount.deposit(0);

      // then
      expect(result).toThrow(new InvalidDepositError());
    });
  });
});