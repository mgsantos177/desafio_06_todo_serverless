import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";
import { v4 as uuidV4 } from 'uuid';

interface ICreateTodo {
  title: string;
  deadline: Date;
}
export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ICreateTodo;
  console.log(user_id, title, deadline)
  await document.put({
    TableName: "todos",
    Item: {
      id: uuidV4(),
      user_id,
      title,
      deadline,
      done: false
    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo Created",
    }),
    headers: {
      "Content-type": "application/json"
    }
  };



};