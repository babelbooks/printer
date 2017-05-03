import * as express   from 'express';
import * as Bluebird  from 'bluebird';
import * as services  from './services';

export let router = express.Router();

/**
 * GET /test
 *
 * To test if the router is working and needed remote services.
 * Returns a 200 status code alongside a small json object if the router is working,
 * along with an array describing the state of the needed remotes services.
 */
router.get('/test', (req: express.Request, res: express.Response) => {
  return services
    .test()
    .then((resp: any) => {
      return res.status(200).json({
        url: req.originalUrl,
        status: 200,
        comment: 'it\'s working!',
        services: resp
      });
    })
    .catch((err: Error) => {
      return res.status(400).json(err);
    });
});

/**
 * POST /login
 * user: {
 *    username: ID,
 *    password: string
 * }
 *
 * Allows an user to log in, if he provides the right credentials.
 * If so, it returns a 200 status code along with a small JSON object.
 * Otherwise, it sends back a 400 status code.
 */
router.post('/login', (req: express.Request, res: express.Response) => {
  return services
    .login(req.body.user)
    .then((resp: any) => {
      return res.header('Set-Cookie', resp.headers['set-cookie'][0]).status(200).json({
        authenticated: true
      });
    })
    .catch((err: Error) => {
      console.log(err);
      return res.status(400).json(err);
    });
});

/**
 * POST /logout
 *
 * Allows an user to log out.
 * If successful, it returns a 200 status code along with a small JSON object.
 * This is not supposed to fail. If so, it therefore will send a 500 response.
 */
router.post('/logout', (req: express.Request, res: express.Response) => {
  return services
    .logout()
    .then((resp: any) => {
      return res.header('Set-Cookie', resp.headers['set-cookie'][0]).status(200).json({
        authenticated: true
      });
    })
    .catch((err: Error) => {
      console.log(err);
      return res.status(400).json(err);
    });
});

/**
 * PUT /signup
 * user : {
 *    username: ID,
 *    password: string,
 *    lastName: string,
 *    firstName: string
 * }
 *
 * Registers an user, if he provides the right information.
 * If so, it returns a 201 status code along with a small JSON object.
 * Otherwise, it sends back a 400 status code.
 */
router.put('/signup', (req: express.Request, res: express.Response) => {
  return services
    .signup({user: req.body.user})
    .then((resp: any) => {
      return res.status(201).json(resp);
    })
    .catch((err: Error) => {
      console.log(err);
      return res.status(400).json(err);
    });
});

/**
 * GET /user/me
 *
 * Retrieves information about the current user,
 * and returns it alongside a 200 status code
 * if successful.
 * Otherwise, returns a 400 status code along with a object
 * describing the error.
 */
router.get('/user/me', (req: express.Request, res: express.Response) => {
  return services
    .getCurrentUser({headers: {
      cookie: req.headers['cookie']}
    })
    .then((resp: any) => {
      return res.status(200).json(resp);
    })
    .catch((err: Error) => {
      return res.status(400).json(err);
    });
});

/**
 * POST /user/me/score
 * n: number
 *
 * Tries to increment the score of the current user by n.
 * If the current user has a NULL score, nothing will happen (still successful).
 * If successful, returns a 200 status code alongside the previous version
 * of the current user (before update).
 * Otherwise, returns a 400 bad request status code along with an object
 * describing the error.
 */
router.post('/user/me/score', (req: express.Request, res: express.Response) => {
  return services
    .updateCurrentUserScore(req.body.n, {headers: {
      cookie: req.headers['cookie']}
    })
    .then((resp: any) => {
      return res.status(200).json(resp);
    })
    .catch((err: Error) => {
      return res.status(400).json(err);
    });
});

/**
 * GET /user/:userId/books
 *
 * Returns all information known about the books
 * originally owned by the given user, alongside a 200 status code
 * if successful.
 * Otherwise, returns a 400 status code along with a object
 * describing the error.
 */
router.get('/user/:userId/books', (req: express.Request, res: express.Response) => {
  return services
    .getUserLibrary(req.params['userId'], {
      headers: {
        cookie: req.headers['cookie']
      }
    })
    .then((resp: any) => {
      return res.status(200).json(resp);
    })
    .catch((err: Error) => {
      console.log(err);
      return res.status(400).json(err);
    });
});

/**
 * GET /user/:userId/books/reading
 *
 * Returns all information known about the books
 * currently read by the given user, alongside a 200 status code
 * if successful.
 * Otherwise, returns a 400 status code along with a object
 * describing the error.
 */
router.get('/user/:userId/books/reading', (req: express.Request, res: express.Response) => {
  return services
    .getUserReadingBooks(req.params['userId'], {
      headers: {
        cookie: req.headers['cookie']
      }
    })
    .then((resp: any) => {
      return res.status(200).json(resp);
    })
    .catch((err: Error) => {
      console.log(err);
      return res.status(400).json(err);
    });
});


router.get('/user/:userId/books/reading/raw', (req: express.Request, res: express.Response) => {
  return services
    .getUserReadingBooksRaw(req.params['userId'], {
      headers: {
        cookie: req.headers['cookie']
      }
    })
    .then((resp: any) => {
      return res.status(200).json(resp);
    })
    .catch((err: Error) => {
      console.log(err);
      return res.status(400).json(err);
    });
});

/**
 * GET /user/:userId/books/read
 *
 * Returns all information known about the books
 * read by the given user, alongside a 200 status code
 * if successful.
 * Otherwise, returns a 400 status code along with a object
 * describing the error.
 */
router.get('/user/:userId/books/read', (req: express.Request, res: express.Response) => {
  return services
    .getUserReadBooks(req.params['userId'], {
      headers: {
        cookie: req.headers['cookie']
      }
    })
    .then((resp: any) => {
      return res.status(200).json(resp);
    })
    .catch((err: Error) => {
      console.log(err);
      return res.status(400).json(err);
    });
});

router.get('/user/:userId/books/read/raw', (req: express.Request, res: express.Response) => {
  return services
    .getUserReadBooksRaw(req.params['userId'], {
      headers: {
        cookie: req.headers['cookie']
      }
    })
    .then((resp: any) => {
      return res.status(200).json(resp);
    })
    .catch((err: Error) => {
      console.log(err);
      return res.status(400).json(err);
    });
});

/**
 * GET /user/:userId/books/borrowed
 *
 * Returns all information known about the books
 * currently borrowed by the given user, alongside a 200 status code
 * if successful.
 * Otherwise, returns a 400 status code along with a object
 * describing the error.
 */
router.get('/user/:userId/books/borrowed', (req: express.Request, res: express.Response) => {
  return services
    .getUserBorrowedBooks(req.params['userId'], {
      headers: {
        cookie: req.headers['cookie']
      }
    })
    .then((resp: any) => {
      return res.status(200).json(resp);
    })
    .catch((err: Error) => {
      console.log(err);
      return res.status(400).json(err);
    });
});

router.get('/user/:userId/books/borrowed/raw', (req: express.Request, res: express.Response) => {
  return services
    .getUserBorrowedBooksRaw(req.params['userId'], {
      headers: {
        cookie: req.headers['cookie']
      }
    })
    .then((resp: any) => {
      return res.status(200).json(resp);
    })
    .catch((err: Error) => {
      console.log(err);
      return res.status(400).json(err);
    });
});

/**
 * GET /user/me/appointments/for
 *
 * Returns an array of all appointments in which the current user has to pass a book,
 * and delete outdated appointments., alongside a 200 status code
 * if successful.
 * Otherwise, returns a 400 status code along with a object
 * describing the error.
 */
router.get('/user/me/appointments/for', (req: express.Request, res: express.Response) => {
  return services
    .getUserAppointmentsFor({
      headers: {
        cookie: req.headers['cookie']
      }
    })
    .then((resp: any) => {
      return res.status(200).json(resp);
    })
    .catch((err: Error) => {
      console.log(err);
      return res.status(400).json(err);
    });
});

/**
 * GET /user/me/appointments/with
 *
 * Returns an array of all appointments in which the current user has to pass a book,
 * and delete outdated appointments., alongside a 200 status code
 * if successful.
 * Otherwise, returns a 400 status code along with a object
 * describing the error.
 */
router.get('/user/me/appointments/with', (req: express.Request, res: express.Response) => {
  return services
    .getUserAppointmentsWith({
      headers: {
        cookie: req.headers['cookie']
      }
    })
    .then((resp: any) => {
      return res.status(200).json(resp);
    })
    .catch((err: Error) => {
      console.log(err);
      return res.status(400).json(err);
    });
});

/**
 * PUT /user/me/appointments
 * meeting: {
 *    bookId: ID,
 *    depositLocation: {
 *        depositLocationType: string,
 *        depositLocationAddress: string
 *    }
 * }
 * OR
 * meeting: {
 *    bookId: ID,
 *    depositLocation: {
 *        depositLocationId: ID
 *    }
 * }
 */
router.put('/user/me/appointments', (req: express.Request, res: express.Response) => {
  let options = {
    headers: {
      cookie: req.headers['cookie']
    }
  };
  let meeting = req.body.meeting;
  return services
    .borrowBook(req.body.meeting.bookId, options)
    .then((borrowId: number | string) => {
      return services.getBorrow(borrowId, options);
    })
    .then((borrow: any) => {
      meeting.borrow = borrow;
      delete meeting.bookId;
      return services.addAppointment({meeting: meeting}, options)
    })
    .then((resp: any) => {
      return res.status(200).json(resp);
    })
    .catch((err: Error) => {
      console.log(err);
      return res.status(400).json(err);
    });
});


/**
 * GET /isborrowed/:userId/:bookId
 *
 * Returns the borrow concerning the given user which currently has 
 * in his possession the given book.
 * Otherwise, returns a 400 status code along with a object
 * describing the error.
 */
router.get('/isborrowed/:userId/:bookId', (req: express.Request, res: express.Response) => {
  return services
    .isBorrowedByUser(req.params['userId'], req.params['bookId'], {
      headers: {
        cookie: req.headers['cookie']
      }
    })
    .then((resp: any) => {
      return res.status(200).json(resp);
    })
    .catch((err: Error) => {
      console.log(err);
      return res.status(400).json(err);
    });
});

/**
 * GET /isborrowed/:userId/:bookId
 *
 * Returns the borrow concerning the given user which currently has 
 * in his possession the given book.
 * Otherwise, returns a 400 status code along with a object
 * describing the error.
 */
router.put('/user/me/book', (req: express.Request, res: express.Response) => {
  return services
    .isBorrowedByUser(req.params['userId'], req.params['bookId'], {
      headers: {
        cookie: req.headers['cookie']
      }
    })
    .then((resp: any) => {
      return res.status(200).json(resp);
    })
    .catch((err: Error) => {
      console.log(err);
      return res.status(400).json(err);
    });
});

/**
 * PUT /isborrowed/:userId/:bookId
 *
 * Returns the borrow concerning the given user which currently has 
 * in his possession the given book.
 * Otherwise, returns a 400 status code along with a object
 * describing the error.
 */
router.put('/book/add', (req: express.Request, res: express.Response) => {
  return services
    .addBook(req.body.book, {
      headers: {
        cookie: req.headers['cookie']
      }
    })
    .then((resp: any) => {
      return res.status(200).json(resp);
    })
    .catch((err: Error) => {
      console.log(err);
      return res.status(400).json(err);
    });
});

/**
 * GET /owners/:isbn
 *
 * Returns the users owning the available book
 * Otherwise, returns a 400 status code along with a object
 * describing the error.
 */
router.get('/owners/:isbn', (req: express.Request, res: express.Response) => {
  return services
    .getCurrentOwners(req.params['isbn'], {
      headers: {
        cookie: req.headers['cookie']
      }
    })
    .then((resp: any) => {
      return res.status(200).json(resp);
    })
    .catch((err: Error) => {
      console.log(err);
      return res.status(400).json(err);
    });
});

/**
 * POST /book/read
 *
 * Set the given book to read.
 * If the book doesn't exist, returns a 400 bad request status code along with an object
 * describing the error.
 */
router.post('/book/read', (req: express.Request, res: express.Response) => {
  return services
    .setBookRead(req.body, {headers: {
      cookie: req.headers['cookie']}
    })
    .then((resp: any) => {
      return res.status(200).json(resp);
    })
    .catch((err: Error) => {
      return res.status(400).json(err);
    });
});