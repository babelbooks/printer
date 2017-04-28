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

## Run the dev server (webpack hot reload)
```shell
npm run dev
```
This will serve with hot reload at `localhost:8080`.

## Deploy
```shell
docker build -t babelbooks/cover .
docker run babelbooks/cover
```

## API
### POST /api/login
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

## Build commands
### Build the server
```shell
gulp server:build
```

### Build the client
```shell
gulp client:build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

### Build everything
```shell
gulp build
```

## Clean commands
### Clean the server
```shell
gulp server:clean
```

### Clean the client
```shell
gulp client:clean
```

### Clean everything
```shell
gulp clean
```