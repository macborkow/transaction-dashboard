# transaction-dashboard
ver. 0.5.0

Dashboard that enables you to view customer and transaction data.
Created with Vue and Java.
Project bootstrapped with **vue create** instead of vite due to webpack's superior Jest compatibility.

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

### Starts java backend[^1]
```
npm run be
```

### Builds and runs docker container[^2]
```
sudo docker build -t t-d-fe .
sudo docker run -it -p 8080:80 --rm t-d-fe
```

[^1]: The base of the application was created using the following [project](https://github.com/auth0-developer-hub/api_spring_java_hello-world/).
[^2]: Make sure you're in the root repository of the project where the Dockerfile resides. 
  If you're root or use another privilege authorizator such as **doas** adjust accordingly.
