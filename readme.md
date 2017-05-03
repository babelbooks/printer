# Babelbooks - Cover

## Prerequisites
* [Node.js](https://nodejs.org/) (and npm)
* [Gulp](http://gulpjs.com/): `npm install gulp-cli -g`

## Run the presentation server
First time or newly added package(s) from pull ?
```shell
npm install
```

Then, or every other time:
```shell
npm start
```

It will build everything and serve the content from `cover/dist`.

## Run the dev server (webpack hot reload)
```shell
npm run dev
```
This will serve live the files from `cover/src` with hot reload at `localhost:3001`.

## Deploy
```shell
npm run deploy
docker build -t babelbooks/printer .
docker run babelbooks/printer
```

## API
### POST /api/login

Allows an user to log in, if he provides the right credentials.

`Content-Type: application/json`
```
{
    "user": {
       "username": ID,
       "password": string
    }
}
```

### POST /api/logout
### PUT /api/signup
```
"user" : {
    "username": ID,
    "password": string,
    "lastName": string,
    "firstName": string
}
```
### GET /api/user/me
### PUT /api/user/me/book
The given object must have the following shape:
```
{
   isbn: ID,
   available: boolean
}
```
**OR**
```
{
   metadata: {
        title: string,
        abstract: string,
        genres: string[],
        author: string,
        edition: string,
        majorForm: string,
        cover: string
   },
   available: boolean
}
```
It inserts the book along with its metadata if provided for the current user.

### GET /api/user/:userId/books
### GET /api/user/:userId/books/reading
### GET /api/user/:userId/books/borrowed
### GET /api/user/:userId:books/read
### GET /book/all/available/:limit?/:offset?
The result will be an array of object with the following shape:
```
{
    bookId: ID,
    isbn: ID,
    available: boolean,
    origin: ID,
    metadata: {
        id: ID,
        title: string,
        abstract: string,
        genres: string[],
        author: string,
        edition: string,
        majorForm: string,
        cover: string
    }
}
```