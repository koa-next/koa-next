FROM ubuntu:xenial
MAINTAINER PLDaily "pcd12321@gmail.com"

RUN apt-get -y update

RUN mkdir -p /data
WORKDIR /data

# Install nodejs
RUN apt-get -y install apt-utils curl libreadline-dev libedit-dev
RUN apt-get -y install g++
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get -y install nodejs

# Install yarn
RUN apt-get -y install yarn

# Install git
RUN apt-get -y install git

# Git clone project
RUN git clone https://github.com/koa-next/koa-next.git

# Install node_modules
RUN yarn

# Build project
RUN yarn build

# start project
CMD ["yarn", "start"]
