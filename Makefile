prisma-generate-client:
	npx prisma generate

prisma-mirgate-dev:
	npx prisma migrate dev --name=$(name)

prisma-db-pull:
	npx prisma db pull

prisma-db-push:
	npx prisma db push

prisma-deploy:
	npx prisma migrate deploy

// dont colorize files

nest new admin --skip-git 

// run and check all the logs
npm run start:dev


// database
npm install --save @nestjs/typeorm typeorm mysql2



// mongoose
npm install --save @nestjs/mongoose mongoose

// microservices :
npm i --save @nestjs/microservices


// rabbitmq:
https://www.cloudamqp.com/

npm run listen
