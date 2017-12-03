module.exports = (app, passport) => {
  //show homepage
  app.get('/', (req, res) => {
    res.render('index.ejs');
  });

  //show profile
  app.get('/profile', isLoggedIn, (req, res) => {
    console.log(req.token);
    res.render('profile.ejs', {user : req.user});
  });

  //logout
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

//facebook auth
  //send request to facebook to do authenticate
  app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

  //handle callback after facebook has authenticated 
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/'
  }));
};

//middleware to check if user is logged in
var isLoggedIn = (req, res, next) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) return next();

  res.redirect('/');
}