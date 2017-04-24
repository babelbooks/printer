import * as express     from 'express';
import * as path        from 'path';
import * as bodyparser  from 'body-parser';
import * as morgan      from 'morgan';
import * as service     from './services.router';

/**
 * Configures the given express app
 * to suit the needs of the application.
 * @param app The app to configure.
 */
export function configureApp(app: express.Application): void {
  const baseFolder = path.resolve(__dirname + '/../../dist/client');

  // Configure params
  app.set('port', process.env.BB_COVER_PORT || 3001);       // Process port
  app.set('host', process.env.BB_COVER_HOST || '0.0.0.0');  // Process host

  // Use middleware
  app.use(bodyparser.json());           // Parse requests' bodies as json
  app.use(bodyparser.urlencoded({       // Parse URL encoded requests
    extended: true
  }));
  app.use(morgan('dev'));               // Use logger

  // Mount sub-routers
  app.use('/api', service.router);      // Use services API
  app.use(express.static(baseFolder));  // Serve static files
}