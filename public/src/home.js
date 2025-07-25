function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let borrowedBooks = 0;
  books.forEach(book => {
    if (!book.borrows[0].returned) borrowedBooks++;
  });
  return borrowedBooks;
}

// ✅ ADDED: getAccountFullNames function
function getAccountFullNames(accounts) {
  return accounts.map(account => `${account.name.first} ${account.name.last}`);
}

function getMostCommonGenres(books) {
  const genresOfBooks = books.map((book) => book.genre);
  const fiveCommonGenres = [];

  genresOfBooks.map((genre) => {
    const location = fiveCommonGenres.findIndex((element) => element.name === genre);
    if (location >= 0) {
      fiveCommonGenres[location].count += 1;
    } else {
      fiveCommonGenres.push({ name: genre, count: 1 });
    }
  });

  fiveCommonGenres.sort((a, b) => b.count - a.count);
  return fiveCommonGenres.slice(0, 5);
}

function getMostPopularBooks(books) {
  const popularBooks = books.map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));
  return topFive(popularBooks);
}

function topFive(array) {
  return array
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const popularAuthors = authors.map((author) => {
    const name = `${author.name.first} ${author.name.last}`;
    const count = books
      .filter(book => book.authorId === author.id)
      .reduce((sum, book) => sum + book.borrows.length, 0);
    return { name, count };
  });

  return topFive(popularAuthors);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
  getAccountFullNames, // ✅ Export added here
};
