const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const app = express();
const DB = require('./database.js');
const words = require('./words.js');
const { PeerProxy } = require('./peerProxy.js');

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

//The name associated with the authorization cookie
const authCookieName = 'token';

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Invalid Username / Password. Please Try Again.' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});


//Setting the auth cookie in the response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}




// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

//Sets up the default functionality for this router
secureApiRouter.use(async (req, res, next) => {
  //gets the authToken out of the request
  authToken = req.cookies[authCookieName];
  //asks the database if there is a user that has that authToken
  const user = await DB.getUserByToken(authToken);
  //if there is one, that means it was a valid authToken so the router
  //can send the request on to its next destination
  if (user) {
    next();
  //if there wasn't an associated user, that means that it was an invalid
  //authToken.
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// SubmitScore
secureApiRouter.post('/save', async (req, res) => {
  authToken = req.cookies[authCookieName];
  const curr_user = await DB.getUserByToken(authToken);

  const savedAnagram = {
    user: curr_user.email,
    anagram: req.body,
    limit: 10
  }

  await DB.addSavedAnagram(savedAnagram);

  const allSaved = await DB.getSavedAnagrams(curr_user.email);
  
  console.log("Sending back " + allSaved)
  res.send(allSaved);
});

secureApiRouter.post('/saved', async (req, res) => {
  const curr_user = await DB.getUserByToken(authToken);

  const saved = await DB.getSavedAnagrams(curr_user.email);
  res.send(saved);
});

// GetEnglishWords
secureApiRouter.get('/words', async (req, res) => {
  const englishWords = words.getWords();
  res.send(englishWords);
});







const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

new PeerProxy(httpService);


