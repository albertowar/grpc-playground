'use strict';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};

const packageDefinition = protoLoader.loadSync(__dirname + '/helloworld.proto', options);
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

const client = new hello_proto.Greeter('localhost:50051', grpc.credentials.createInsecure());

client.sayHello({name: 'Alberto'}, (err, response) => {
  if (err) {
    console.log(`Something bad happened ${err}`);
    return;
  }

  console.log('Greeting:', response.message);
});
