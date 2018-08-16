const jsonServer = require('json-server');
const server = jsonServer.create();
const routerA = jsonServer.router('devDB-Anzhelika.json');
const router = jsonServer.router('devDB.json');

const middlewares = jsonServer.defaults();
const port = 4000;
 
server.use(middlewares);
server.use("/api1", router);
server.use("/api2", routerA);

server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`)
})