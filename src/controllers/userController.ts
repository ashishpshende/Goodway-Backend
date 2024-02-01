// controllers/sampleController.ts
import { Request, Response } from 'express';
import * as RESPONSE_CONSTANTS from '../Constants/responseConstants';

import * as AWS from 'aws-sdk';
import config from '../config';
import { buildFilterExpression,DynamoDBFilter } from '../Utility/DBUtility';
AWS.config.update({region:'us-east-1'});


AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_REGION,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();


export const Login = (req: Request, res: Response): void => {
  // Define the parameters for the query with a condition
const params = {
  TableName: 'Goodway.Users',
  FilterExpression: 'userName = :userName AND password = :password',
  ExpressionAttributeValues: {
    ':userName': req.body.username,
    ':password': req.body.password
  },
};

// Perform the scan operation
    dynamoDB.scan(params, (err, data) => {
      if (err) {
        res.json({ statusCode: RESPONSE_CONSTANTS.EXCEPTION ,data: err });
      } else {
        if(data.Count==0)
        res.json({ statusCode: RESPONSE_CONSTANTS.UNAUTHORZIED ,data: {} });
        else
        res.json({ statusCode: RESPONSE_CONSTANTS.SUCCESS, data: data });
      }
    });
};
export const Logout = (req: Request, res: Response): void => {
  res.json({ statusCode: RESPONSE_CONSTANTS.SUCCESS, data: {} });
};
export const GetUserList = (req: Request, res: Response): void => {
  var filters: DynamoDBFilter[] = [];
  
  if(req.query.role)
  {
    filters.push({ key: 'userRole', value: req.query.role.toString(), type: 'string' })
  }
  if(req.query.status)
  {
    filters.push( { key: 'userStatus', value: req.query.status.toString(), type: 'string' })   
  }
  console.log(filters);

  const { FilterExpression, ExpressionAttributeValues } = buildFilterExpression(filters);
  var params = filters.length!=0? ({
    TableName: 'Goodway.Users',
    FilterExpression,
    ExpressionAttributeValues
    }):({ TableName: 'Goodway.Users'});
    dynamoDB.scan(params, (err, data) => {
      if (err) {
        res.json({ statusCode: RESPONSE_CONSTANTS.EXCEPTION ,data: err });
      } else {
        if(data.Count==0)
        res.json({ statusCode: RESPONSE_CONSTANTS.NO_RESULT_FOUND ,data: {} });
        else
        res.json({ statusCode: RESPONSE_CONSTANTS.SUCCESS, data: data });
      }
    });
};
export const GetUser = (req: Request, res: Response): void => {
  res.json({ message: 'Hello, this is a sample API!' });
};
export const UpdateUser = (req: Request, res: Response): void => {
  res.json({ message: 'Hello, this is a sample API!' });
};
export const DeactivateUser = (req: Request, res: Response): void => {
  res.json({ message: 'Hello, this is a sample API!' });
};


