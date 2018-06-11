import Loadable from 'react-loadable';

export default function startServer() {
  const server = require('./server');
  const port = process.env.PORT || process.env.APPLICATION_PORT || 3000;

  return Loadable.preloadAll().then(() => {
    return server.listen(port, error => {
      if (error) {
        console.error(error);
      } else {
        console.info(`Application server mounted on http://localhost:${port}.`);
      }
    });
  });
}
