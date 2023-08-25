# fastify-glob-router

Use glob-router serveArray, create fastify routers

## Create some routers by services

```ts
import { login, license, user } from "./services";
const serveArray = [
  { path: "/login", serve: login },
  { path: "/license", serve: license },
  { path: "/user", serve: user },
];

const app = fastify();
app.register(fastifyApi, {
  baseUrl: "/v1",
  routers: serveArray,
});

app.listen(
  {
    port: 5000,
  },
  () => {
    console.log("serve:", "http://127.0.0.1:5000");
  },
);
```
