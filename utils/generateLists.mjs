import fs from 'fs';
import faker from 'faker';
import { nanoid } from 'nanoid';
import { spawn } from 'child_process';

const numCustomers = 10;
const minTransactionsPerCustomer = 3;
const maxTransactionsPerCustomer = 8;
const startDate = new Date('2020-01-01').getTime();
const endDate = new Date('2023-04-08').getTime();

// Generate customers
const customers = [];
for (let i = 1; i <= numCustomers; i++) {
  const name = faker.name.findName();
  const id = nanoid(5);
  const customer = {
    id,
    name,
    email: `${name.replace(/\s/g, '.').toLowerCase()}@${faker.internet.domainName()}`,
  };
  customers.push(customer);
}

// Generate transactions
const transactions = [];
for (let i = 0; i < numCustomers; i++) {
  const customer = customers[i];
  const customerId = customer.id;
  const numTransactions = Math.floor(Math.random() * (maxTransactionsPerCustomer - minTransactionsPerCustomer + 1)) + minTransactionsPerCustomer;
  for (let j = 1; j <= numTransactions; j++) {
    const date = new Date(startDate + Math.random() * (endDate - startDate));
    const id = nanoid(5);
    const transaction = {
      id,
      date: date.toISOString(),
      amount: Math.round(Math.random() * 1000 * 100) / 100,
      description: `${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} ${faker.commerce.product()} for ${customer.name}`,
      customer_id: customerId,
    };
    transactions.push(transaction);
  }
}

// Sort transactions chronologically
transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

// Create database object
const db = {
  customers,
  transactions,
};

// Write to file
fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
console.log('db.json created.');

const jsonServerProcess = spawn('npx', ['json-server', 'db.json']);

jsonServerProcess.stdout.on('data', (data) => {
    console.log(`${data}`);
});

jsonServerProcess.stderr.on('data', (data) => {
    console.error(`${data}`);
});

process.on('SIGINT', () => {
    console.log('\nStopping JSON Server...');
    fs.unlinkSync('db.json');
    console.log('db.json deleted.');
});
