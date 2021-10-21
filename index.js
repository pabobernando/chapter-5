const express = require('express');
const router = express.Router();
let database = require('./static/public/db/users.json');
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
  res.render('tampilan');
});

router.get('/game', (req, res) => {
  if (req.cookies.sudah_login) {
    res.render('game');
  } else {
    res.redirect('/login');
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

// pengecekan user di database
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = database.filter((user) => user.username === username && user.password === password)[0];

  if (user) {
    req.session.logedIn = user.username;
    res.cookie('sudah_login', true, { maxAge: 5000 }); // maxAge = umur cookie
    res.json({ message: 'login sukses' });
  } else {
    res.status(400).json({ message: 'password atau username salah' });
  }
});

router.get('/register', (req, res) => {
  res.render('register');
});

function jsonOut(data) {
  fs.writeFileSync(path.resolve(__dirname, `./static/public/db/users.json`), JSON.stringify(data));
}

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ message: 'username dan password belum disediakan' });
  }

  database.push({
    username,
    password,
  });

  jsonOut(database);

  res.json({ message: 'berhasil register' });
});

router.get('/user', (req, res) => {
  res.send(database);
});

module.exports = router;
