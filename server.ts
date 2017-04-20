import * as express     from 'express';
import * as path        from 'path';
import * as bodyparser  from 'body-parser';

// Configure params
const baseFolder = path.resolve(__dirname + '/../../dist/client');

// Create server app
const app : any = express();

// Configure server app
app.set('port', process.env.PORT || 3001);  // Process port
app.use(bodyparser.json());                 // Parse requests' bodies as json
app.use(bodyparser.urlencoded({             // Parse URL encoded requests
  extended: true
}));

// Mount sub-routers
app.use(express.static(baseFolder));        // Serve static files

// Run the server
app.listen(app.get('port'), '0.0.0.0', () => {
  console.log('Server running on port ' + app.get('port'));
});