# transaction-dashboard
ver. 0.5.0

Dashboard that enables you to view customer and transaction data.
Created with Vue and Java.
Project bootstrapped with **vue create** instead of vite due to webpack's superior Jest compatibility.

## Project setup
```
npm install
cd ./backend/
./gradlew build
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

### Starts mock server[^1]
```
npm run mock
```

### Starts java backend[^2]
```
npm run be
```

### Builds and runs docker container[^3]
```
sudo docker build -t t-d-fe .
sudo docker run -it -p 8080:80 --rm t-d-fe
```

[^1]: Mock is a node script that generates database data and serves it using json-server.
  It's prefered to use the dedicated Java backend as json-server's routes are not protected by oath.
[^2]: The base of the application was created using the following [project](https://github.com/auth0-developer-hub/api_spring_java_hello-world/).
[^3]: Make sure you're in the root repository of the project where the Dockerfile resides. 
  If you're root or use another privilege authorizator such as **doas** adjust accordingly.
