const express = require('express');
const session = require('express-session'); // untuk menyimpan sesi user
const cookieParser = require('cookie-parser'); // untuk membaca cookie yang dikirimkan browser
const app = express();
const port = 3000;
const router = require('./index');

app.use(cookieParser());

app.set('trust proxy', 1); // trust first proxy
app.use(
  session({
    secret: 'kunci rahasia',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 },
  })
);

app.use(express.json());
app.use(express.static('static'));
app.set('view engine', 'ejs');

app.use(router); // daftarkan route

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
