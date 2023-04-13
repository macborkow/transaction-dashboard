# transaction-dashboard
![front-end CI](https://github.com/macborkow/transaction-dashboard/actions/workflows/node.js.yml/badge.svg)
![back-end CI](https://github.com/macborkow/transaction-dashboard/actions/workflows/gradle.yml/badge.svg)
*ver. 0.7.0*

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

### Starts Java backend[^3][^4]
```
npm run be
```

### Builds and runs docker containers[^5]
```
sudo docker build -t t-d-fe .
sudo docker run -it -p 8080:80 --rm t-d-fe
```
For the Java backend[^4]:
```
cd ./backend/
sudo docker build --build-arg JAR_FILE=build/libs/*.jar -t t-d-be .
sudo docker run -it -p 3000:3000 --rm t-d-be
```
Alternatively you can simply run below[^4]:
```
sudo docker compose up
```

#### Extra considerations

1. Separate components were created for each of the filtering and searching functionalities. Despite their resemblance, after careful consideration, the author decided to keep them separate instead of creating more generalized component, thus breaking the DRY principle, in favour of reducing performance overhead.
2. The Java backend is at the current moment serving static Json files generated using a modified version of the mock server script. For the sake of this project it was deemed enough. At the same time the solid foundation including integrated oauth authorization is already created thus it would be trivial to extend the application with a RESTful API.
3. Creating global css file with definitions for classes such flexbox to center content could be considered to reduce repeated code.
4. Better usage of the store would be beneficial. For example caching api responses, global error handling and preserving state of filtering input when switching routes.
5. Additional work to make tests properly typed and better organized should be considered. Nevertheless in a short amount of time coverage of over 90% was achieved.

[^1]: If you want to run the Java backend instead of the mock server then also use the commands below this annotation. Otherwise you can skip them.
[^2]: Mock is a node script that generates database data and serves it using json-server.
  It's prefered to use the dedicated Java backend as json-server's routes are not protected by oath.
  You can easily see that when you're not logged in by using [/unsafe](http:localhost:8080/unsafe) route on the frontend which is the dashboard without route guard in place. It work's just fine with the mock server but throws an error when using properly configured Java backend.
[^3]: The base of the application was created using the following [project](https://github.com/auth0-developer-hub/api_spring_java_hello-world/).
[^4]: To run the backend in either a docker container or using `npm run be` you must first build the application as shown in the Java part of the [Project setup](#project-setup) section.
[^5]: Make sure you're in the root repository of the project where the Dockerfile resides. 
  If you're root or use another privilege authorizator such as `doas` adjust accordingly.
