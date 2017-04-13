import * as express from 'express';
import * as path    from 'path';

// Configure params
const baseFolder = path.resolve(__dirname + '/../../dist/client');

// Create server app
const app : any = express();

// Configure server app
app.set('port', process.env.PORT || 3001);  // Process port
app.use(express.static(baseFolder));        // Serve static files

// Run the server
app.listen(app.get('port'), '0.0.0.0', () => {
  console.log('Server running on port ' + app.get('port'));
});