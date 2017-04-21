import * as Bluebird  from 'bluebird';
import * as request   from 'request-promise';

/**
 * Tests the status of the services that this router will use.
 */
export function test(): Bluebird<any> {
  return Bluebird.all([
    request({
      method: 'GET',
      url: 'http://localhost:3000/test'})
      .catch((err: Error) => err),
    request({
      method: 'GET',
      url: 'http://localhost:3002/test'})
      .catch((err: Error) => err)
  ]);
}

/**
 * Tries to login the given user from
 * the auth server.
 * @param user The user to login.
 * @returns {Bluebird<any>}
 */
export function login(user: any): Bluebird<any> {
  return Bluebird.resolve(request({
    method: 'POST',
    url: 'http://localhost:3000/auth/login',
    json: true,
    body: user,
    resolveWithFullResponse: true
  }));
}

/**
 * Logs the current user out.
 * @returns {Bluebird<any>}
 */
export function logout(): Bluebird<any> {
  return Bluebird.resolve(request({
    method: 'POST',
    url: 'http://localhost:3000/auth/logout',
    json: true,
    resolveWithFullResponse: true
  }));
}

/**
 * Gathers all information about the books originally owned
 * by the given user.
 * @param userId The user's Id from which retrieve the books.
 * @returns {Bluebird<any>}
 */
export function getUserLibrary(userId: number | string): Bluebird<any> {
  return getUserBooks( 'http://localhost:3000/user/' + userId + '/books');
}

/**
 * Gathers all information about the books currently borrowed
 * by the given user.
 * @param userId The user's Id from which retrieve the books.
 * @returns {Bluebird<any>}
 */
export function getUserBorrowedBooks(userId: number | string): Bluebird<any> {
  return getUserBooks( 'http://localhost:3000/user/' + userId + '/books/borrowed');
}

/**
 * Gathers all information about the books currently read
 * by the given user.
 * @param userId The user's Id from which retrieve the books.
 * @returns {Bluebird<any>}
 */
export function getUserReadingBooks(userId: number | string): Bluebird<any> {
  return getUserBooks( 'http://localhost:3000/user/' + userId + '/books/reading');
}

/**
 * A wrapper to factorize some code.
 * @param from The url from which gather the books.
 * @returns {Bluebird<(any|any|any|any|any)[]>}
 */
function getUserBooks(from: string): Bluebird<any> {
  return Bluebird
    .resolve(request({
      method: 'GET',
      url: from,
      json: true
    }))
    .then((res: any[]) => {
      let promises: any[] = [];
      for(let book of res) {
        promises.push(request({
          method: 'GET',
          url: 'http://localhost:3002/book/' + book.books.isbn,
          json: true
        }))
      }
      return Bluebird.all(promises);
    });
}