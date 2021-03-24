# AskBob config app

A progressive web app that allows users to generate a configuration file for the
AskBob voice assistant. Users can create intents, synonyms, regexes, lookups,
entities, slots, responses, skills, and stories to the config file and edit and
delete those items as well.

Users can also fill in details about the form such as a description and a name.

State is managed by redux is stored in local storage.

# Scripts

Node and npm must be installed for these scripts to work. To install node and
npm, follow the steps in the how to deploy section

To install dependencies, type

```bash
./scripts/install.sh
```

To run the install commands To build the production /build folder, type

```bash
./scripts/build.sh
```

To deploy the actual app, type

```bash
./scripts/serve.sh
```

To run the app locally at localhost:5000

# How to deploy

Here is a website that explains how to deploy a React app. If this guide isn't
sufficient, this should help.

https://create-react-app.dev/docs/deployment/

## How to deploy locally Deployment

### Get node and npm

Install node and npm at this website - https://nodejs.org/en/ The latest version
should work but if not install node version 14.15.0 and npm 6.14.5 Install

### Install Dependencies

At the base directory, type this command:

```bash
npm install
```

This will install all the dependencies needed to deploy the app.

### Create build folder

After all dependencies have been built, run this command:

```bash
npm run build
```

This should create a build folder.

### Deploy locally

Install serve globally by entering this command:

```bash
npm install -g serve
```

Then, to serve the build folder, enter this in the command line:

```bash
serve -s build
```

Congratulations! Your app should be running now

# Run in development

If you want to run in development mode type this command in the command line:

```bash
npm start
```

The app is now running locally in development mode at “https://localhost:3000”

# Hosting on Netlify

If you deploy on a hosting website, after the build folder has been made, you
can deploy it on any hosting website. Here’s how to deploy on netlify.

### Make an account for Netlify

Go to https://www.netlify.com/ and make an account

### Add a new site

Once logged in, click on the sites tab at the top of the page

scroll to the bottom and then drag the build folder into the white box that says
‘Want to deploy a new site without connecting to Git? Drag and drop your site
output folder here’

This will allow you to deploy the app using the build folder.

### Click on link

The app should be deployed and you should be redirected to a new page with the
deployment details. Click on the green link (the name should be a random) and
you will be taken to the website
