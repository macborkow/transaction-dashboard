# transaction-dashboard
ver. 0.5.0

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Starts mock server
```
npm run mock
```

### Starts java backend
The base of the application was created using the following [project](https://github.com/auth0-developer-hub/api_spring_java_hello-world/).
```
npm run be
```

### Builds and runs docker container
Make sure you're in the root repository of the project where the Dockerfile resides.
```
sudo docker build -t t-d-fe .
sudo docker run -it -p 8080:80 --rm t-d-fe
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
