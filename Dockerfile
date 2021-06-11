FROM gcr.io/google-appengine/nodejs as public

LABEL maintainer="Addison van den Hoeven"

WORKDIR /srv/app

# Update NPM
RUN npm i npm@latest -g
ENV PATH=$PATH:/srv/app/node_modules/.bin

COPY . /srv/app

RUN npm install
RUN npm rebuild node-sass
RUN npm run build

CMD ["node", "server"]
