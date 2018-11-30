const AWS = require('aws-sdk');
const record = require('./fake-record.json');

console.log('Started Kinesis Loan Data Producer');
console.log(' - Configuring AWS Kinesis Client');

AWS.config.update({
  region: 'us-west-2',
  accessKeyId: 'AKIAJU2QIFRMGAKB4ZEA',
  secretAccessKey: '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',
});

const TOTAL_SHARDS = 5;
const kinesis = new AWS.Kinesis();

function deliver(loan) {
  const params = {
    Data: JSON.stringify(loan),
    PartitionKey: 'partition-' + (Math.floor(Math.random() * TOTAL_SHARDS) + 1),
    StreamName: 'loan-data',
  }

  console.log(' - Writing loan data to Kinesis');

  kinesis.putRecord(params, (error, response) => {
    if (error) {
      console.error(' - Failed', error);
      process.exit(1);
      return;
    }

    console.log(' - Success!', response);
    process.exit(0);
  })
}

deliver(record);
