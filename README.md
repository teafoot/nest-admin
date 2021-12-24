```plaintext
Source code for the course: https://www.udemy.com/course/the-complete-angular-nestjs-course/
The Complete Angular & NestJS Course

Added the commands used for reference and my additional notes/fixes:

sudo npm i -g @nestjs/cli
nest new nest-admin --skip-git

----------------------------------
docker-compose up -d # create docker image and run containers
docker-compose ps
-
docker logs --follow <container_ID> // get nest.js server output
OR
docker exec -it <container_ID> bash
	npm run start:dev // if port in use, override CMD entrypoint in Dockerfile
-
docker images
docker rmi -f <image_ID>

docker ps -a
docker-compose stop
docker container prune # will remove all stopped containers
docker container rm -f <container_ID>
-----------------------------------

nest g module user 
nest g controller user
nest g service user

nest g module auth
nest g controller auth
nest g service auth
nest g guard auth/auth

nest g module common // for the jwt service

nest g module role
nest g controller role
nest g service role

nest g module permission
nest g controller permission
nest g service permission
nest g guard permission

nest g service common/abstract

nest g module product
nest g controller product
nest g service product

nest g controller upload

nest g module order
nest g controller order
nest g service order

-

npm install --save @nestjs/typeorm typeorm mysql2
-
npm i bcrypt
npm i -D @types/bcrypt
-
npm i class-validator
npm i class-transformer
-
npm i @nestjs/jwt passport-jwt
npm i @types/passport-jwt
-
npm i cookie-parser
npm i -D @types/cookie-parser
-
npm i -D @types/multer
npm i multer
-
npm i json2csv @types/json2csv
-

---

1. npm run start:dev in docker container => to create the tables
2. run mysql-data.sql => to populate data including FK data

---

User has role
Role has permissions

//TODO: handle DELETE request... for permission access guards
	-add access guards to all controller methods (only user, role, order controller has them atm).

-Nest.js Fixes:
	-Export the service before using it as a dependency injection (constructor) in another module.
```
