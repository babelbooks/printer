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
 * POST / login
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
