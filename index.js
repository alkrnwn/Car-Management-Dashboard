const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const multer = require('multer'); 
const path = require('path'); 
const bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(express.static('upload'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

// add-on
const session = require('express-session');
const flash = require('express-flash');
const sessionStore = new session.MemoryStore();
app.use(
  session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret',
  })
);
app.use(flash());

// public
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/script', express.static(__dirname + 'public/script'));
app.use('/image', express.static(__dirname + 'public/image'));

app.set('views', './views');
app.set('view engine', 'ejs');

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, './upload'));
  },
  filename: function (req, file, cb) {
     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const dashboardController = require('./controller/dashboardController');
const crudController = require('./controller/crudController');

// navigation
app.get('/', dashboardController.dashboardView);
app.get('/add', dashboardController.addView);
app.get('/edit/:id', dashboardController.editView);

app.get('/filter', dashboardController.filter);
app.get('/search', dashboardController.search);

// CAR API
app.get('/api/v1/getall', crudController.readAll);
app.get('/api/v1/getby/:id', crudController.readById);
app.post('/api/v1/add', multer({ storage: diskStorage }).single('photo'), crudController.createCar);
app.post('/api/v1/delete/:id', crudController.deleteCar);
app.post('/api/v1/update/:id', multer({ storage: diskStorage }).single('photo'), crudController.updateCar);

// SIZE API
app.post('/api/v1/addSize', crudController.createSizeCar);
app.get('/api/v1/getSize', crudController.getSizeCar);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
