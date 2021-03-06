FROM node:14.16.0-alpine

WORKDIR /usr/src/frontend

COPY . /usr/src/frontend
RUN yarn install

RUN yarn build

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=5000
EXPOSE 5000
CMD ["yarn", "start"]