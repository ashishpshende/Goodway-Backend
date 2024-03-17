// controllers/sampleController.ts
import { Request, Response } from "express";
import * as RESPONSE_CONSTANTS from "../Constants/responseConstants";
import * as AWS from "aws-sdk";
import config from "../config";
import { buildFilterExpression, DynamoDBFilter } from "../Utility/DBUtility";
import { v4 as uuidv4 } from "uuid";
import Parcel from "../Models/Parcel";
AWS.config.update({ region: "us-east-1" });
AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_REGION,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TableName = "Goodway.Parcels";

export const GetParcelList = (req: Request, res: Response): void => {
  var values: Record<string, any> = {};
  var params = {
    TableName: TableName,
    FilterExpression: "",
    ExpressionAttributeValues: values,
  };
  if (req.query.statuses && req.query.statuses !== "All") {
    var query = " contains ";
    var statuses = req.query.statuses.toString().split(",");
    for (let index = 0; index < statuses.length; index++) {
      const element = statuses[index];
      if (element !== "All") {
        var keyName = ":parcelStatus_" + index;
        query += "(parcelStatus, " + keyName + ")";
        params.ExpressionAttributeValues[keyName] = element;
      }
      if (index !== statuses.length - 1) {
        query += " OR ";
      }
    }

    params.FilterExpression = query;
  }
  else
  {
    
  }

  dynamoDB.scan((req.query.statuses?params:{TableName: TableName}), (err, data) => {
    if (err) {
      res.json({ statusCode: RESPONSE_CONSTANTS.EXCEPTION, data: err });
    } else {
      if (data.Count == 0)
        res.json({ statusCode: RESPONSE_CONSTANTS.NO_RESULT_FOUND, data: {} });
      else {
        res.json({ statusCode: RESPONSE_CONSTANTS.SUCCESS, data: data.Items });
      }
    }
  });
};
export const GetParcelByCnNo = (req: Request, res: Response): void => {
  var filters: DynamoDBFilter[] = [];
  if (req.query.cnNo) {
    filters.push({
      key: "cnNo",
      value: req.query.cnNo.toString(),
      type: "string",
    });
  }
  const { FilterExpression, ExpressionAttributeValues } =
    buildFilterExpression(filters);
  var params = {
    TableName: TableName,
    FilterExpression,
    ExpressionAttributeValues,
  };
  dynamoDB.scan(params, (err, data) => {
    if (err) {
      res.json({ statusCode: RESPONSE_CONSTANTS.EXCEPTION, data: err });
    } else {
      if (data.Count == 0)
        res.json({ statusCode: RESPONSE_CONSTANTS.NO_RESULT_FOUND, data: {} });
      else {
        var parcel = new Parcel(data.Items ? data.Items[0] : {});
        res.json({ statusCode: RESPONSE_CONSTANTS.SUCCESS, data: parcel });
      }
    }
  });
};
export const GetParcelById = (req: Request, res: Response): void => {
  var filters: DynamoDBFilter[] = [];
  if (req.query.id) {
    filters.push({
      key: "id",
      value: req.query.id.toString(),
      type: "string",
    });
  }
  const { FilterExpression, ExpressionAttributeValues } =
    buildFilterExpression(filters);
  var params = {
    TableName: TableName,
    FilterExpression,
    ExpressionAttributeValues,
  };
  dynamoDB.scan(params, (err, data) => {
    if (err) {
      res.json({ statusCode: RESPONSE_CONSTANTS.EXCEPTION, data: err });
    } else {
      if (data.Count == 0)
        res.json({ statusCode: RESPONSE_CONSTANTS.NO_RESULT_FOUND, data: {} });
      else {
        var parcel = new Parcel(data.Items ? data.Items[0] : {});
        res.json({ statusCode: RESPONSE_CONSTANTS.SUCCESS, data: parcel });
      }
    }
  });
};
export const GetParcelListBySubDealer = (req: Request, res: Response): void => {
  var filters: DynamoDBFilter[] = [];
  if (req.query.subdealer) {
    filters.push({
      key: "parcelTo",
      value: req.query.subdealer.toString(),
      type: "string",
    });
  }
  const { FilterExpression, ExpressionAttributeValues } =
    buildFilterExpression(filters);
  var params = {
    TableName: TableName,
    FilterExpression,
    ExpressionAttributeValues,
  };
  dynamoDB.scan(params, (err, data) => {
    if (err) {
      res.json({ statusCode: RESPONSE_CONSTANTS.EXCEPTION, data: err });
    } else {
      if (data.Count == 0)
        res.json({ statusCode: RESPONSE_CONSTANTS.NO_RESULT_FOUND, data: {} });
      else {
        res.json({ statusCode: RESPONSE_CONSTANTS.SUCCESS, data: data.Items });
      }
    }
  });
};
export const GetParcelListByDealer = (req: Request, res: Response): void => {
  var filters: DynamoDBFilter[] = [];
  if (req.query.dealer) {
    filters.push({
      key: "createdBy",
      value: Number.parseInt(req.query.dealer.toString()),
      type: "number",
    });
  }

  const { FilterExpression, ExpressionAttributeValues } =
    buildFilterExpression(filters);
  var params = {
    TableName: TableName,
    FilterExpression,
    ExpressionAttributeValues,
  };
  if (req.query.statuses && req.query.statuses !== "All") {
    var query = "contains ";
    var statuses = req.query.statuses.toString().split(",");

    for (let index = 0; index < statuses.length; index++) {
      const element = statuses[index];
      if (element !== "All") {
        var keyName = ":parcelStatus_" + index;
        query += "(parcelStatus, " + keyName + ")";
        ExpressionAttributeValues[keyName] = element;
      }
      if (index !== statuses.length - 1) {
        query += " OR ";
      }
    }

    params.FilterExpression += " AND (" + query + ")";
  }
  dynamoDB.scan(params, (err, data) => {
    if (err) {
      res.json({ statusCode: RESPONSE_CONSTANTS.EXCEPTION, data: err });
    } else {
      if (data.Count == 0)
        res.json({ statusCode: RESPONSE_CONSTANTS.NO_RESULT_FOUND, data: {} });
      else {
        res.json({ statusCode: RESPONSE_CONSTANTS.SUCCESS, data: data.Items });
      }
    }
  });
};
export const GetParcelListByStatuses = (req: Request, res: Response): void => {
  var ExpressionAttributeValues: Record<string,any> = {}
  var params = {
    TableName: TableName,
    FilterExpression:"",
    ExpressionAttributeValues: {},
  };

  if (req.query.statuses && req.query.statuses !== "All") {
    var query = "contains ";
    var statuses = req.query.statuses.toString().split(",");

    for (let index = 0; index < statuses.length; index++) {
      const element = statuses[index];
      if (element !== "All") {
        var keyName = ":parcelStatus_" + index;
        query += "(parcelStatus, " + keyName + ")";
        ExpressionAttributeValues[keyName] = element;
      }
      if (index !== statuses.length - 1) {
        query += " OR ";
      }
    }
    params.FilterExpression += query;
  }
  params.ExpressionAttributeValues = ExpressionAttributeValues;


  dynamoDB.scan(params, (err, data) => {
    if (err) {
      res.json({ statusCode: RESPONSE_CONSTANTS.EXCEPTION, data: err });
    } else {
      if (data.Count == 0)
        res.json({ statusCode: RESPONSE_CONSTANTS.NO_RESULT_FOUND, data: {} });
      else {
        res.json({ statusCode: RESPONSE_CONSTANTS.SUCCESS, data: data.Items });
      }
    }
  });
};
export const SaveParcel = (req: Request, res: Response): void => {

  const ParcelNumberCounterParams = {
    TableName: "ParcelNumberCounter", // Replace with your table name
    Key: {
      id: req.body.createdBy, // Replace with the primary key of the item to be updated
    },
    UpdateExpression: "SET #attrName = #attrName + :attrValue", // Update expression
    ExpressionAttributeNames: {
      "#attrName": "lastIndex", // Replace with the attribute name to be updated
    },
    ExpressionAttributeValues: {
      ":attrValue": 1, // Replace with the new attribute value
    },
    ReturnValues: "ALL_NEW", // Specify the information to return after the update
  };

  dynamoDB.update(ParcelNumberCounterParams, (err, data) => {
    if (err) {
    } else {
      var newParcel = new Parcel(req.body);
      newParcel.id = uuidv4();
      newParcel.cnNo =
        newParcel.cnNo +
        "-" +
        data?.Attributes?.lastIndex.toString().padStart(7, "0");
      const item = {
        TableName: TableName, // Replace with your table name
        Item: newParcel,
      };

      dynamoDB.put(item, (error, data) => {
        if (error) {

          res.json({ statusCode: RESPONSE_CONSTANTS.EXCEPTION, data: error });
        } else {
          res.json({ statusCode: RESPONSE_CONSTANTS.SUCCESS, data: data });
        }
      });
    }
  });
};
export const UpdateParcel = (req: Request, res: Response): void => {
  const item = {
    TableName: TableName, // Replace with your table name
    Item: req.body,
  };
  // Put item into DynamoDB
  dynamoDB.put(item, (error, data) => {
    if (error) {
      res.json({ statusCode: RESPONSE_CONSTANTS.EXCEPTION, data: error });
    } else {
      res.json({ statusCode: RESPONSE_CONSTANTS.SUCCESS, data: data });
    }
  });
};
export const UpdateParcelStatus = (req: Request, res: Response): void => {
  // Define update expression and values
  const params = {
    TableName: TableName, // Replace with your table name
    Key: {
      id: req.body.id, // Replace with the primary key of the item to be updated
    },
    UpdateExpression: "SET #attrName = :attrValue", // Update expression
    ExpressionAttributeNames: {
      "#attrName": "parcelStatus", // Replace with the attribute name to be updated
    },
    ExpressionAttributeValues: {
      ":attrValue": req.body.parcelStatus, // Replace with the new attribute value
    },
    ReturnValues: "ALL_NEW", // Specify the information to return after the update
  };

  // Update item in DynamoDB
  dynamoDB.update(params, (error, data) => {
    if (error) {
      res.json({ statusCode: RESPONSE_CONSTANTS.EXCEPTION, data: error });
    } else {
      res.json({ statusCode: RESPONSE_CONSTANTS.SUCCESS, data: data });
    }
  });
};
