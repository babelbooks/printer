import * as Bluebird  from 'bluebird';
import * as request   from 'request-promise';

export function authenticate(user: any): Bluebird.Thenable<any> {
  return request({
    method: 'POST',
    url: 'http://localhost:3000/auth/login',
    json: true,
    body: user,
    resolveWithFullResponse: true
  });
}

export function getUserLibrary(userId: number | string): Bluebird<any> {
  return request({
    method: 'GET',
    url: 'http://localhost:3000/user/' + userId + '/books',
    json: true
  })
    .then((res: any) => {
      let promises: any[] = [];
      for(let book of res.booksId) {
        promises.push(request({
          method: 'GET',
          url: 'http://localhost:3000/book/' + book,
          json: true
        }))
      }
      return Bluebird.all(promises);
    })
    .then((res: any[]) => {
      let promises: any[] = [];
      for(let book of res) {
        promises.push(request({
          method: 'GET',
          url: 'http://localhost:3002/book/' + book.isbn,
          json: true
        }))
      }
      return Bluebird.all(promises);
    });
}