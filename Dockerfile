FROM node:12
ENTRYPOINT [ "/bin/echo", "react server gen in DOCKER" ]
WORKDIR /Users/pidan/Learn/Essays/learnDocker/react-server-gen
COPY . .
ENV NODE_ENV production
RUN npm install yarn
RUN yarn global add webpack-cli webpack
RUN yarn dep:install
RUN yarn build
WORKDIR ./dist/

EXPOSE 3000

CMD 'yarn start:build'