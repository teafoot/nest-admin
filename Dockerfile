FROM node:14.17.0

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

# don't run npm run start/start:dev or else it will conflict with port 3000 when trying to restart application due to file changes.
# Instead just keep the nest.js container running with this entrypoint CMD
# CMD npm run start
# CMD npm run start:dev
CMD tail -f /dev/null
