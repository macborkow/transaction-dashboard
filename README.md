# transaction-dashboard
*ver. 0.5.1*

Dashboard that enables you to view customer and transaction data.

Project bootstrapped with `vue create` instead of vite due to webpack's superior Jest compatibility.

Created with Vue and Java.
To run the project you need Node and Java runtime installed on your machine. The project was written using Node 16 and Java 17.
If you're worried your runtime versions are not compatible with the project consider using the provided Dockerfile's to run the application in a container.

## Project setup
```
npm install
```
For the Java backend:[^1]
```
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

### Starts mock server[^2]
```
npm run mock
```

### Starts Java backend[^3]
```
npm run be
```

### Builds and runs docker containers[^4]
```
sudo docker build -t t-d-fe .
sudo docker run -it -p 8080:80 --rm t-d-fe[^1]
```
For the Java backend[^5]:
```
cd ./backend/
sudo docker build --build-arg JAR_FILE=build/libs/*.jar -t t-d-be .
sudo docker run -it -p 3000:3000 --rm t-d-be
```
Alternatively you can simply run below[^5]:
```
sudo docker compose up
```

[^1]: If you want to run the Java backend instead of the mock server then also use the commands below this annotation. Otherwise you can skip them.
[^2]: Mock is a node script that generates database data and serves it using json-server.
  It's prefered to use the dedicated Java backend as json-server's routes are not protected by oath.
  You can easily see that when you're not logged in by using [/unsafe](http:localhost:8080/unsafe) route on the frontend which is the dashboard without route guard in place. It work's just fine with the mock server but throws an error when using properly configured Java backend.
[^3]: The base of the application was created using the following [project](https://github.com/auth0-developer-hub/api_spring_java_hello-world/).
[^4]: Make sure you're in the root repository of the project where the Dockerfile resides. 
  If you're root or use another privilege authorizator such as `doas` adjust accordingly.
[^5]: To run the backend in either a docker container or using `npm run be` you must first build the application as shown in the Java part of the *Project setup* section.
