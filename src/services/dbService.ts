
import { DynamoDB } from 'aws-sdk';

const dynamoDB = new DynamoDB.DocumentClient();
const TableName = 'YourTableName';
const Limit = 10; // Adjust the limit as needed

export async function scanWithPagination(table:string,limit:number,lastEvaluatedKey?: DynamoDB.DocumentClient.Key): Promise<void> {
  const params: DynamoDB.DocumentClient.ScanInput = {
    TableName,
    Limit,
    ExclusiveStartKey: lastEvaluatedKey,
  };

  try {
    const data = await dynamoDB.scan(params).promise();

    // Process the results
    console.log('Items:', data.Items);

    
  } catch (error) {
    console.error('Error scanning DynamoDB table:', error);
  }
}


