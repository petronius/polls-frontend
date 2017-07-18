A small React frontend for the [polls API](http://docs.pollsapi.apiary.io/).

# Requirements

The only requirement is having [npm](https://www.npmjs.com/) installed. On
Debian-alikes, you can just do:

```
$ sudo apt install npm
```

# Running the app

Clone the repository and run the app with the following:

```
$ git clone https://github.com/petronius/polls-frontend
$ cd polls-frontend
$ npm install
$ npm start
```

You'll also need to either build or watch the SCSS files in another terminal:

```
$ npm run watch-css
```

# TODO

* Proper pagination, page navigation
* UI for adding new questions
* More properly responsive styling would be a nice touch
* Error handlers for failed API requests, maybe a nicer way to centralize all
  of that within in the app.