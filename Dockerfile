FROM node:12
ENTRYPOINT [ "/bin/echo", "react server gen in DOCKER" ]
WORKDIR /Users/pidan/Learn/Essays/learnDocker/react-server-gen
COPY . .
RUN npm run dep:install
RUN npm run build
WORKDIR ./dist/

EXPOSE 3000

CMD ['node', './app.js']