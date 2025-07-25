/*use of arrow functions in all of the sections*/
const findAccountById = (accounts, id) =>
  accounts.find(account => account.id == id);

const sortAccountsByLastName = (accounts) =>
  accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );

const getTotalNumberOfBorrows = (account, books) => {
  const { id: accountId } = account;
  return books.reduce((accumulator, book) => {
    return (
      accumulator +
      book.borrows
        .filter(borrow => borrow.id === accountId)
        .reduce(acc => acc + 1, 0)
    );
  }, 0);
};

/* using the feature of .map */
const getBooksPossessedByAccount = (account, books, authors) => {
  const inPossession = [];
  books.map((book) => {
    book.borrows.map((borrow) => {
      authors.map((author) => {
        if (author.id === book.authorId) book["author"] = author;
      });
      if (borrow.returned === false && borrow.id === account.id) {
        inPossession.push(book);
      }
    });
  });
  return inPossession;
};

const getAccountFullNames = (accounts) => {
  return accounts.map(account => `${account.name.first} ${account.name.last}`);
};


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getAccountFullNames,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
