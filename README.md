#AskBob config app

A config app for the AskBob voice assistant. It allows users to make a list of
possible intents and a list of possible responses to those intents. Then, the
user can make a json config file for the AskBob app.

State is managed by redux and stored locally

How to deploy

# Get node and npm

Install node and npm at this website https://nodejs.org/en/ The latest version
should work but if not install node version 14.15.0 and npm 6.14.5

# Install build dependencies

At the base directory, type this command npm install This will install all the
dependencies needed to deploy the app.

# Create build folder

After all dependencies have been built, run this command npm run build This
should create a build folder.

# deploy on a hosting website

After the build folder has been made, you can deploy it on any website. Here’s
how to deploy on netlify

# Make an account for Netlify

Go to https://www.netlify.com/ and make an account

# Add new site

Once logged in, click on the sites tab, scroll to the bottom and then drag the
build folder into the white box that says ‘Want to deploy a new site without
connecting to Git? Drag and drop your site output folder here’ This will allow
you to deploy the app using the build folder.

# click on link

The app should be deployed and you should be redirected to a new page with the
deployment details. Click on the green link (the name should be a random) and
you will be taken to the website
