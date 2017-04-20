import * as express   from 'express';
import * as Bluebird  from 'bluebird';
import * as services  from './services';
import * as request   from 'request-promise';

let router = express.Router();

router.post('/login', (req: express.Request, res: express.Response) => {
  console.log('POST /login');
  console.log(req.body.user);
  return Bluebird.resolve(services
    .authenticate(req.body.user))
    .then((resp: any) => {
      console.log(resp.headers);
      return res.header('Set-Cookie', resp.headers['set-cookie'][0]).status(200).json({
        authenticated: true
        // TODO: need the auth token or session or something
      });
    })
    .catch((err: Error) => {
      console.log(err);
      return res.status(400).json(err);
    });
});

router.get('/test', (req: express.Request, res: express.Response) => {
  console.log('GET / test');
  console.log(req);
  return request({
      method: 'GET',
      url: 'http://localhost:3000/user/Ceyb/books',
      json: true,
      headers: {
        Cookie: req.headers.cookie
      }
    })
    .then((resp: any) => {
      return res.status(200).json(resp);
    })
    .catch((err: Error) => {
      // console.log(err);
      return res.status(400).json(err);
    });
});

//router.get('/')

export default router;

