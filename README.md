# Delivery Scheduling

This monorepo project contains two packages:
 
1. [web-app]: <code>delivery-scheduling-app</code>
2. [server]: <code>delivery-schedule-service</code>
   - API documentation available at  `GET /docs`
   - Health endpoint available at  `GET /health`
   - Postman example collection available [here](https://gitlab.com/marcosoliveira91/delivery-scheduling/-/wikis/Postman-Collection)

<br/>
You just need to follow the instructions to run it locally.
<br/>


```
npm ci
npm run build
```

and then to run each app:

```
npm run start:server
```
```
npm run start:webapp
```
