/* 
Filename: ComplexCode.js
Content: Simulation of a banking system with account creation, deposits, withdrawals, and transfers.
*/

class Account {
  constructor(id, name, balance) {
    this.id = id;
    this.name = name;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`Deposited ${amount}`);
  }

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(`Withdrew ${amount}`);
    } else {
      console.log("Insufficient funds");
    }
  }
}

class Bank {
  constructor() {
    this.customers = [];
  }

  createAccount(id, name, initialDeposit) {
    const account = new Account(id, name, initialDeposit);
    this.customers.push(account);
    console.log(`Account created with ID ${id}`);
  }

  getAccountById(id) {
    return this.customers.find((account) => account.id === id);
  }

  depositAmount(id, amount) {
    const account = this.getAccountById(id);
    if (account) {
      account.deposit(amount);
    } else {
      console.log("Account not found");
    }
  }

  withdrawAmount(id, amount) {
    const account = this.getAccountById(id);
    if (account) {
      account.withdraw(amount);
    } else {
      console.log("Account not found");
    }
  }

  transferAmount(fromId, toId, amount) {
    const fromAccount = this.getAccountById(fromId);
    const toAccount = this.getAccountById(toId);
    if (fromAccount && toAccount) {
      if (fromAccount.balance >= amount) {
        fromAccount.withdraw(amount);
        toAccount.deposit(amount);
        console.log(`Transferred ${amount} from ${fromAccount.name} to ${toAccount.name}`);
      } else {
        console.log("Insufficient funds in the sender's account");
      }
    } else {
      console.log("One or both accounts not found");
    }
  }
}

// Usage of Bank class

const bank = new Bank();
bank.createAccount(1, "John Doe", 1000);
bank.createAccount(2, "Jane Smith", 500);

bank.depositAmount(1, 200);
bank.depositAmount(2, 100);

bank.withdrawAmount(1, 400);
bank.withdrawAmount(2, 200);

bank.transferAmount(1, 2, 300);
bank.transferAmount(2, 1, 600);
bank.transferAmount(1, 3, 500); // Account not found

console.log(bank.customers); // Display all accounts in the bank
