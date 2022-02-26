const path = require('path');

const mongoose = require('mongoose')
const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require('@adminjs/mongoose')
const User = require('./models/user')
const argon2 = require('argon2')
const hashPassword = require('@adminjs/passwords')


AdminJS.registerAdapter(AdminJSMongoose)

const run = async () => {
  const mongooseDb = await mongoose.connect('mongodb+srv://vusallyv:gne8h7zRfQQSFpfY@cluster0.86vlw.mongodb.net/test?authSource=admin&replicaSet=atlas-opqyuf-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', { useNewUrlParser: true, useUnifiedTopology: true })

  const adminJs = new AdminJS({
    databases: [mongooseDb],
    resources: [
      {
        resource: User,
        // options: {
        //   //...your regular options go here'
        //   properties: { encryptedPassword: { isVisible: false, edit: false }, name: { isVisible: { list: false, filter: true, show: true, edit: true } }, status: { type: 'richtext' }, },
        //   actions: {
        //     new: {
        //       before: async (req, res, next) => {
        //         console.log('before')
        //         const { name, email, password } = req.body
        //         const user = new User({ name, email })
        //         const hashedPassword = await hashPassword(password)
        //         user.encryptedPassword = hashedPassword
        //         await user.save()
        //         next()
        //       },
        //     },
        //   },
        // },
        // features: [hashPassword({
        //   properties: {
        //     encryptedPassword: 'myDbField',
        //     password: 'password'
        //   },
        //   hash: argon2.hash,
        // })]
      },
    ],
    branding: {
      companyName: 'I.M.com',
    },
  })
  const router = AdminJSExpress.buildRouter(adminJs)

  app.use(adminJs.options.rootPath, router)
  app.listen(8080, () => console.log('AdminJS is under localhost:8080/admin'))
}

run()

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const cartRoutes = require('./routes/cart');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/cart', cartRoutes);
app.use('/auth', authRoutes);
app.use('/product', productRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// mongoose
// .connect(
//   'mongodb+srv://vusallyv:pulsar12345@cluster0.86vlw.mongodb.net/test?authSource=admin&replicaSet=atlas-opqyuf-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
//   )
//   .then(result => {
//     app.use(adminJs.options.rootPath, router)
//     app.listen(8080, () => console.log('AdminJS is under localhost:8080/admin'))
//   })
//   .catch(err => console.log(err));