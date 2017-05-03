import * as Bluebird  from 'bluebird';
import * as request   from 'request-promise';

const engineURL: string = 'http://' + (process.env.BB_ENGINE_HOST || 'localhost') + ':' + (process.env.BB_ENGINE_PORT || 3002);
const babelURL: string  = 'http://' + (process.env.BB_BABEL_HOST || 'localhost') + ':' + (process.env.BB_BABEL_PORT || 3000);

/**
 * Tests the status of the services that this router will use.
 */
export function test(): Bluebird<any> {
  return Bluebird.all([
    request({
      method: 'GET',
      url: babelURL + '/test'})
      .catch((err: Error) => err),
    request({
      method: 'GET',
      url: engineURL + '/test'})
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
    url: babelURL + '/auth/login',
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
    url: babelURL + '/auth/logout',
    json: true,
    resolveWithFullResponse: true
  }));
}

/**
 * Tries to register the given user.
 * @param user The user to register.
 * @returns {Bluebird<any>}
 */
export function signup(user: any): Bluebird<any> {
  return Bluebird.resolve(request({
    method: 'PUT',
    url: babelURL + '/user/add',
    json: true,
    body: user
  }));
}

/**
 * Gathers information about the currently logged-in user.
 * @param options Request's options.
 * @returns {Bluebird<any>}
 */
export function getCurrentUser(options?: any): Bluebird<any> {
  let headers: any = options ? options.headers : undefined;
  return Bluebird.resolve(request({
    method: 'GET',
    url: babelURL + '/user/me',
    json: true,
    headers: headers
  }));
}

/**
 * Update the score of the curent user.
 * @param n the score increment (or decrement if negatif)
 * @param options Request's options.
 * @returns {Bluebird<any>}
 */
export function updateCurrentUserScore(n: number, options?: any): Bluebird<any> {
  let headers: any = options ? options.headers : undefined;
  return Bluebird.resolve(request({
    method: 'POST',
    url: babelURL + '/user/me/score',
    json: true,
    headers: headers,
    body: n
  }));
}

/**
 * Gathers information about the queried borrow.
 * @param borrowId The ID of the borrow to retrieve.
 * @param options Request's options.
 * @returns {Bluebird<any>}
 */
export function getBorrow(borrowId: number | string, options?: any): Bluebird<any> {
  let headers: any = options ? options.headers : undefined;
  return Bluebird.resolve(request({
    method: 'GET',
    url: babelURL + '/book/borrow/' + borrowId,
    json: true,
    headers: headers
  }));
}

/**
 * Gathers all information about the books originally owned
 * by the given user.
 * @param userId The user's Id from which retrieve the books.
 * @param options Request's options.
 * @returns {Bluebird<any[]>}
 */
export function getUserLibrary(userId: number | string, options?: any): Bluebird<any[]> {
  return getUserBooks(babelURL + '/user/' + userId + '/books', options);
}

/**
 * Gathers all information about the books currently borrowed
 * by the given user.
 * @param userId The user's Id from which retrieve the books.
 * @param options Request's options.
 * @returns {Bluebird<any[]>}
 */
export function getUserBorrowedBooks(userId: number | string, options?: any): Bluebird<any[]> {
  return getUserBooks(babelURL + '/user/' + userId + '/books/borrowed', options);
}

export function getUserBorrowedBooksRaw(userId: number | string, options?: any): Bluebird<any[]> {
  return getUserBooksRaw(babelURL + '/user/' + userId + '/books/borrowed', options);
}

/**
 * Gathers all information about the books currently read
 * by the given user.
 * @param userId The user's Id from which retrieve the books.
 * @param options Request's options.
 * @returns {Bluebird<any[]>}
 */
export function getUserReadingBooks(userId: number | string, options?: any): Bluebird<any[]> {
  return getUserBooks(babelURL + '/user/' + userId + '/books/reading', options);
}

export function getUserReadingBooksRaw(userId: number | string, options?: any): Bluebird<any[]> {
  return getUserBooksRaw(babelURL + '/user/' + userId + '/books/reading', options);
}

/**
 * Gathers all information about the books read
 * by the given user.
 * @param userId The user's Id from which retrieve the books.
 * @param options Request's options.
 * @returns {Bluebird<any[]>}
 */
export function getUserReadBooks(userId: number | string, options?: any): Bluebird<any[]> {
  return getUserBooks(babelURL + '/user/' + userId + '/books/read', options);
}

export function getUserReadBooksRaw(userId: number | string, options?: any): Bluebird<any[]> {
  return getUserBooksRaw(babelURL + '/user/' + userId + '/books/read', options);
}

/**
 * Borrows the given book for the current user.
 * @param bookId The book's ID.
 * @param options Request's options.
 * @returns {Bluebird<any>}
 */
export function borrowBook(bookId: number | string, options?: any): Bluebird<any> {
  let headers: any = options ? options.headers : undefined;
  return Bluebird.resolve(request({
    method: 'POST',
    url: babelURL + '/user/me/borrow/' + bookId,
    json: true,
    headers: headers
  }));
}

/**
 * Adds the given appointment.
 * @param meeting The meeting to add.
 * @param options Request's options.
 * @returns {Bluebird<any>}
 */
export function addAppointment(meeting: {meeting: any}, options?: any): Bluebird<any> {
  let headers: any = options ? options.headers : undefined;
  return Bluebird.resolve(request({
    method: 'PUT',
    url: babelURL + '/appointment/meeting/add',
    json: true,
    headers: headers,
    body: meeting
  }));
}

/**
 * Gathers all appointments in which the current user has to pass a book,
 * and delete outdated appointments.
 * @param options Request's options.
 * @returns {Bluebird<any[]>}
 */
export function getUserAppointmentsFor(options?: any): Bluebird<any> {
  let headers: any = options ? options.headers : undefined;
  return Bluebird.resolve(request({
    method: 'GET',
    url: babelURL + '/appointment/user/me/for',
    json: true,
    headers: headers
  }));
}

/**
 * Gathers all appointments in which the current user has to retrieve a book,
 * and delete outdated appointments.
 * @param options Request's options.
 * @returns {Bluebird<any[]>}
 */
export function getUserAppointmentsWith(options?: any): Bluebird<any> {
  let headers: any = options ? options.headers : undefined;
  return Bluebird.resolve(request({
    method: 'GET',
    url: babelURL + '/appointment/user/me/with',
    json: true,
    headers: headers
  }));
}

/**
 * A wrapper to factorize some code.
 * @param from The url from which gather the books.
 * @param options Request's options.
 * @returns {Bluebird<any[]>}
 */
function getUserBooks(from: string, options?: any): Bluebird<any[]> {
  let headers: any = options ? options.headers : undefined;
  return Bluebird
    .resolve(request({
      method: 'GET',
      url: from,
      json: true,
      headers: headers
    }))
    .then((res: any) => {
      let promises: any[] = [];
      for(let book of res.books) {
        promises.push(request({
          method: 'GET',
          url: engineURL + '/elastic/book/' + book.isbn,
          json: true
        }))
      }
      return Bluebird.all(promises);
    });
}

function getUserBooksRaw(from: string, options?: any): Bluebird<any[]> {
  let headers: any = options ? options.headers : undefined;
  return Bluebird
    .resolve(request({
      method: 'GET',
      url: from,
      json: true,
      headers: headers
    }));
}

/**
 * Return a borrow if the given user has currently the given book in his possession.
 * @param userId The user's Id.
 * @param bookId The book's Id.
 * @param options Request's options.
 * @returns {Bluebird<any>}
 */
export function isBorrowedByUser(userId: number | string, bookId: number | string, options?: any): Bluebird<any> {
  let headers: any = options ? options.headers : undefined;
  return Bluebird
    .resolve(request({
      method: 'GET',
      url: babelURL + '/isborrowed/' + userId + '/' + bookId,
      json: true,
      headers: headers
    }));
}

export function addBook( book: {book: any}, options?: any): Bluebird<any> {
  let headers: any = options ? options.headers : undefined;
  return Bluebird
    .resolve(request({
      method: 'PUT',
      url: babelURL + '/book/add/',
      json: true,
      headers: headers,
      body: book
    }));
}

export function getCurrentOwners( isbn: string, options?: any): Bluebird<any> {
  let headers: any = options ? options.headers : undefined;
  let ret : any;
  return Bluebird
    .resolve(request({
      method: 'GET',
      url: babelURL + '/user/' + isbn,
      json: true,
      headers: headers
    }));
}


function promiseLoop(condition: any, action: any) {  
    let loop = () => {    
        if(!condition()) {
            return;   
        }    
        return action().then(loop);  
    };  
    return Promise.resolve().then(loop);
}

/**
 * Set the given book to read.
 * @param book The book to set to read.
 * @returns {Bluebird<any>}
 */
export function setBookRead( book: {book: any}, options?: any): Bluebird<any> {
  let headers: any = options ? options.headers : undefined;
  return Bluebird
    .resolve(request({
      method: 'POST',
      url: babelURL + '/book/read',
      json: true,
      headers: headers,
      body: book
    }));
}
