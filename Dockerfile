FROM node:boron

# Define some env variables
# ENV app /usr/src/babel

# Create app directory
RUN mkdir -p /usr/src/printer /usr/src/printer/cover /usr/src/printer/cover/dist
WORKDIR /usr/src/printer

# Copy needed things
COPY . /usr/src/printer
COPY ./cover/dist /usr/src/printer/cover/dist

# Expose port
EXPOSE 3001

# Install needed dependencies
RUN npm install -g gulp-cli --no-progress --silent
RUN npm install -g pm2 --no-progress --silent
RUN npm install --no-progress --silent

# Run it
CMD npm run docker


