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

function sayHello(call, callback) {
  callback(null, {message: 'Hello ' + call.request.name});
}

const packageDefinition = protoLoader.loadSync(__dirname + '/helloworld.proto', options);
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

const server = new grpc.Server();
server.addService(hello_proto.Greeter.service, {sayHello: sayHello});
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();
console.log('Starting GPRC server on port 50051');
