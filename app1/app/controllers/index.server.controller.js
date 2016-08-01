exports.render = function(req, res) {
  var token = req.cookies.token;

  if (!token) {
    return res.redirect('http://accounts.facturactiva.com/?callback=' + req.headers.host);
  }

  res.render('index', {
    title: 'app1',
    description: 'Welcome to App1'
  });
}
