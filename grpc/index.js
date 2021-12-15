const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const {createUser, listUsers } = require('./services/grpc/user.services');

(() => {
  const users_package = protoLoader.loadSync('./grpc/proto/user.proto');
  const user_proto = grpc.loadPackageDefinition(users_package);

  const server = new grpc.Server();
  server.addService(user_proto.UserService.service, {
    createUser: createUser,
    listUsers: listUsers,
  });

  server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log('gRPC Server listening on : 50051')
  });
})()