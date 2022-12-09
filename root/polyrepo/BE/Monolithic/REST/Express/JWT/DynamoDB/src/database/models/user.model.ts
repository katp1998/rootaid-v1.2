import aws from 'aws-sdk';
import {connection} from '../connection'

// Create the DynamoDB service object
const ddb = new aws.DynamoDB({apiVersion: '2012-08-10'});

const params = {
  AttributeDefinitions: [
    {
      AttributeName: 'ID',
      AttributeType: 'N'
    },
    {
      AttributeName: 'NAME',
      AttributeType: 'S'
    },
    {
      AttributeName: 'EMAIL',
      AttributeType: 'S'
    },
    {
      AttributeName: 'PASSWORD',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'ID',
      KeyType: 'HASH'
    },
    {
      AttributeName: 'NAME',
      KeyType: 'RANGE'
    },
    {
      AttributeName: 'EMAIL',
      KeyType: 'RANGE'
    },{
      AttributeName: 'PASSWORD',
      KeyType: 'RANGE'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  TableName: 'USER',
  StreamSpecification: {
    StreamEnabled: false
  }
};

// Call DynamoDB to create the table
ddb.createTable(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Table Created", data);
  }
});