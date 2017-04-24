import * as express     from 'express';
import { configureApp } from './server.config';

// Create server app
const app : any = express();

// Configure server app
configureApp(app);

// Run the server
app.listen(app.get('port'), '0.0.0.0', () => {
  console.log('Server running on port ' + app.get('port'));
});