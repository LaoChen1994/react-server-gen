FROM node:12
WORKDIR /
COPY . .
ENV NODE_ENV production
EXPOSE 3000

ENTRYPOINT [ "/bin/bash", "/script/start.sh" ]
