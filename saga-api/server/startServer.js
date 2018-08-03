import server from './server';

export default function startServer() {
  const port = process.env.PORT || process.env.APPLICATION_PORT || 3000;

  return server.listen(port, error => {
    if (error) {
      console.error(error);
    } else {
      console.info(`Saga GraphQL server mounted on port ${port}.`);
    }
  });
}
