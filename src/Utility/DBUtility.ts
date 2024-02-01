import { DynamoDB } from 'aws-sdk';

export interface DynamoDBFilter {
  key: string;
  value: string | number | boolean;
  type: 'string' | 'number' | 'boolean';
}

export   function buildFilterExpression(filters: DynamoDBFilter[]): { FilterExpression: string, ExpressionAttributeValues: Record<string, any> } {
  const expressionAttributeValues: Record<string, any> = {};
  const filterExpressions: string[] = [];

  filters.forEach((filter, index) => {
    const placeholder = `:value${index}`;
    expressionAttributeValues[placeholder] = filter.value;

    let condition;
    switch (filter.type) {
      case 'string':
        condition = `${filter.key} = ${placeholder}`;
        break;
      case 'number':
        condition = `${filter.key} = ${placeholder}`;
        break;
      case 'boolean':
        condition = `${filter.key} = ${placeholder}`;
        break;
      default:
        throw new Error(`Unsupported filter type: ${filter.type}`);
    }

    filterExpressions.push(condition);
  });

  const filterExpression = filterExpressions.join(' AND ');

  return { FilterExpression: filterExpression, ExpressionAttributeValues: expressionAttributeValues };
}


