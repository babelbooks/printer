import * as express   from 'express';
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
 * POST /signup
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
