// app.ts
import * as express from 'express';
import sampleRoute from './routes/routes';
import config from './config';
import * as AWS from 'aws-sdk';
var cors = require("cors");
AWS.config.update({region:'us-east-1'});
const app = express();
const port = config.PORT;

app.use(express.json());
app.use(cors());
// Config Routes
app.use('/api', sampleRoute);
AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_REGION,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();






app.listen(port,() => {
  console.log(`Server is running on http://localhost:${port}`);
});

