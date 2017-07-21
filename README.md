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

# TODO

* Proper pagination, page navigation
* Error handlers for failed API requests, maybe a nicer way to centralize all
  of that within in the app.
