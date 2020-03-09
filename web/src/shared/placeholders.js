const emails = [
  "frugal.frank@aol.com",
  "sally.saver@gmail.com",
  "liquid.larry@outlook.com",
  "budget.brenda@msn.com",
  "investing.irene@yahoo.com",
];

export function getRandomEmail() {
  return emails[Math.floor(Math.random() * (emails.length - 1))];
}
