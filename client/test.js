const SagaServer = require('./dist').default;

const server = SagaServer({

});

server.listen(3000, () => {
  console.log('Test server listening on port 3000.');
});
