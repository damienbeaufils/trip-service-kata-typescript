import {
  BankAccount,
  InsufficientFundsError,
  InvalidAmountError,
  TransactionType,
} from "../../src/bankAccount/bankAccount";

describe("BankAccount", () => {
  const fixedDate: Date = new Date("2017-06-13T04:41:20");
  let bankAccount;
  beforeEach(() => {
    bankAccount = new BankAccount();
    // @ts-ignore
    jest.spyOn(global, "Date").mockImplementation(() => fixedDate);
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

  describe("transfer()", () => {
    let fromBankAccount;
    let toBankAccount;
    beforeEach(() => {
      fromBankAccount = new BankAccount();
      toBankAccount = new BankAccount();
    });

    it("should transfer 10 units from one bank account to another", () => {
      // given
      fromBankAccount.deposit(10);

      // when
      fromBankAccount.transfer(toBankAccount, 10);

      // then
      expect(fromBankAccount.getBalance()).toEqual(0);
      expect(toBankAccount.getBalance()).toEqual(10);
    });

    it("should transfer 5 units from one bank account that has more than 5 units to another having already a positive balance", () => {
      // given
      fromBankAccount.deposit(10);
      toBankAccount.deposit(10);

      // when
      fromBankAccount.transfer(toBankAccount, 5);

      // then
      expect(fromBankAccount.getBalance()).toEqual(5);
      expect(toBankAccount.getBalance()).toEqual(15);
    });

    it("should not change balance of either bank accounts and throw an error given amount = 0", () => {
      // given
      fromBankAccount.deposit(10);

      // when
      const result = () => fromBankAccount.transfer(toBankAccount, 0);

      // then
      expect(result).toThrow(new InvalidAmountError("Invalid amount"));
      expect(fromBankAccount.getBalance()).toEqual(10);
      expect(toBankAccount.getBalance()).toEqual(0);
    });

    it("should not change balance of either bank accounts and throw an error given amount < 0", () => {
      // given
      fromBankAccount.deposit(10);

      // when
      const result = () => fromBankAccount.transfer(toBankAccount, -1);

      // then
      expect(result).toThrow(new InvalidAmountError("Invalid amount"));
      expect(fromBankAccount.getBalance()).toEqual(10);
      expect(toBankAccount.getBalance()).toEqual(0);
    });

    it("should not change balance of either bank accounts and throw an error given a NaN amount", () => {
      // given
      fromBankAccount.deposit(10);

      // when
      const result = () => fromBankAccount.transfer(toBankAccount, NaN);

      // then
      expect(result).toThrow(new InvalidAmountError("Invalid amount"));
      expect(fromBankAccount.getBalance()).toEqual(10);
      expect(toBankAccount.getBalance()).toEqual(0);
    });
  });

  describe("statements()", () => {
    it("should return a single statement that corresponds to the only deposit", () => {
      // given
      bankAccount.deposit(10);

      // when
      const result = bankAccount.statements();

      // then
      expect(result).toEqual(
        "date;credit;debit;balance\n" +
        "2017-06-13;10;0;10",
      );
    });

    it("should return two statements that corresponds to a deposit and a withdrawal", () => {
      // given
      bankAccount.deposit(10);
      bankAccount.withdraw(5);

      // when
      const result = bankAccount.statements();

      // then
      expect(result).toEqual(
        "date;credit;debit;balance\n" +
        "2017-06-13;10;0;10\n" +
        "2017-06-13;0;5;5",
      );
    });

    it("should return two statements that corresponds to a deposit and a withdrawal", () => {
      // given
      const recipient = new BankAccount();
      bankAccount.deposit(10);
      bankAccount.transfer(recipient, 5);

      // when
      const senderStatements = bankAccount.statements();
      const recipientStatements = recipient.statements();

      // then
      expect(senderStatements).toEqual(
        "date;credit;debit;balance\n" +
        "2017-06-13;10;0;10\n" +
        "2017-06-13;0;5;5",
      );
      expect(recipientStatements).toEqual(
        "date;credit;debit;balance\n" +
        "2017-06-13;5;0;5",
      );
    });

    it("should return only deposit statements when filtering on deposit type", () => {
      // given
      bankAccount.deposit(10);
      bankAccount.withdraw(5);

      // when
      const result = bankAccount.statements({type: TransactionType.DEPOSIT});

      // then
      expect(result).toEqual(
        "date;credit;debit;balance\n" +
        "2017-06-13;10;0;10",
      );
    });

    it("should return only deposit statements when filtering on withdraw type", () => {
      // given
      bankAccount.deposit(10);
      bankAccount.withdraw(5);

      // when
      const result = bankAccount.statements({type: TransactionType.WITHDRAW});

      // then
      expect(result).toEqual(
        "date;credit;debit;balance\n" +
        "2017-06-13;0;5;5",
      );
    });

    it("should return only withdraw statements whose amount is within passed range", () => {
      // given
      bankAccount.deposit(20);
      bankAccount.withdraw(5);
      bankAccount.withdraw(15);

      // when
      const result = bankAccount.statements({type: TransactionType.WITHDRAW, amount: [4, 6]});

      // then
      expect(result).toEqual(
        "date;credit;debit;balance\n" +
        "2017-06-13;0;5;15",
      );
    });

    it("should return only deposit statements whose amount is within passed range", () => {
      // given
      bankAccount.deposit(20);
      bankAccount.withdraw(5);
      bankAccount.withdraw(15);

      // when
      const result = bankAccount.statements({type: TransactionType.DEPOSIT, amount: [4, 6]});

      // then
      expect(result).toEqual(
        "date;credit;debit;balance\n" +
        "2017-06-13;0;5;15",
      );
    });
  });
});
