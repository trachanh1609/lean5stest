const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const indexRouter = require('./src/server/routes/');

const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;


const isProduction = process.env.NODE_ENV === 'production';
var configuration = {
  creds: {
    skipUserProfile: true, // for AzureAD should be set to true.
    responseType: 'id_token code', // for login only flows use id_token. For accessing resources use `id_token code`
    responseMode: 'form_post', // For login only flows we should have token passed back to us in a POST
    issuer: false,
  } 
};
if(!isProduction) {
    configuration = require('./config');
}


passport.serializeUser(function(user, done) {
  done(null, user.upn);
});

passport.deserializeUser(function(id, done) {
  findByUPN(id, function (err, user) {
      done(err, user);
  });
});

// array to hold signed-in users
var users = [];

var findByUPN = function(upn, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
      var user = users[i];
      console.log('we are using user: ', user);
      if (user.upn === upn) {
          return fn(null, user);
      }
  }
  return fn(null, null);
};

passport.use(new OIDCStrategy({
  redirectUrl: process.env.AADreturnURL || configuration.creds.returnURL,
  realm: process.env.AADrealm || configuration.creds.realm,
  clientID: process.env.AADclientID || configuration.creds.clientID,
  clientSecret: process.env.AADclientSecret || configuration.creds.clientSecret,
  oidcIssuer: configuration.creds.issuer || false,
  identityMetadata: process.env.AADidentityMetadata || configuration.creds.identityMetadata,
  skipUserProfile: configuration.creds.skipUserProfile || true,
  responseType: configuration.creds.responseType || 'id_token code',
  responseMode: configuration.creds.responseMode || 'form_post',
  allowHttpForRedirectUrl: process.env.AADallowHttpForRedirectUrl || configuration.creds.allowHttpForRedirectUrl,
},
function(iss, sub, profile, accessToken, refreshToken, done) {
  if (!profile.upn) {
    return done(new Error("No upn ( UserPrincipalName) found"), null);
  }
  // asynchronous verification, for effect...
  process.nextTick(function () {
  findByUPN(profile.upn, function(err, user) {
      if (err) {
      return done(err);
      }
      if (!user) {
      // "Auto-registration"
      users.push(profile);
      return done(null, profile);
      }
      return done(null, user);
  });
  });
}
));

app.use(cookieParser());
app.use(expressSession({ secret: 'mickey mouse', resave: true, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('./'));
app.use(express.static('dist'));

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/',
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/errorPage' }),
  function(req, res) {
    console.log('We received a return from AzureAD.');
    res.redirect('/');
  });

app.get('/currentUser', function(req, res){
  // res.render('index', { user: req.user });
  res.send({ user: req.user });
});

app.get('/login',
  passport.authenticate('azuread-openidconnect', { failureRedirect: '/errorPage' }),
  function(req, res) {
    console.log('Login was called in the Sample');
    res.redirect('/');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/errorPage', function(req, res){
  res.send('This is the error page')
});

app.use('/api', cors(),ensureAuthenticated, indexRouter);

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('app listening on', port);
});

function ensureAuthenticated(req, res, next) {
  // console.log('\n\n\n------------------------------ensureAuthenticated--------------------------\n\n\n');
  // console.log(req.isAuthenticated.toString());
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}