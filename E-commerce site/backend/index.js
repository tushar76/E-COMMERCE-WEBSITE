import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import route from './route/routes.js';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import user from './models/user-schema.js';
// import flash from 'express-flash';
// import CryptoJS from 'crypto-js';
import cookieParser from 'cookie-parser';
// import  MongoDBStore  from 'connect-mongodb-session';
import dotenv from 'dotenv';

const app = express();
// const crypto = CryptoJS;
// const mongoDBStore = MongoDBStore(session);
async function main() {
    await mongoose.connect('mongodb+srv://yash:yash9650@cluster0.zacjm.mongodb.net/ShopDB?retryWrites=true&w=majority',
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });
  }
  
  main().then(() => {
      console.log("mongo Connected successfully");
  }).catch((err) => {
      console.log("mongo Something Went Wrong!!!");
  });




//this
// var sess = {
//     secret: 'keyboard cat',
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 * 7
//     },
//     store: new mongoDBStore({
//         uri: 'mongodb+srv://yash:yash23@cluster0.zacjm.mongodb.net/ShopDB?retryWrites=true&w=majority',
//         collection: 'mySessions',
//         connectionOptions: {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//           }
//       },(err)=>{
//         //   console.log(err);
//       }),
//     resave: false,
//     saveUninitialized: true
//   }
  
  
//   if (app.get('env') === 'production') {
//     app.set('trust proxy', 1) // trust first proxy
//     sess.cookie.secure = true // serve secure cookies
//   }


// app.use(flash());
dotenv.config();

app.use(session({secret: 'mysct'}));
app.use(cors({credentials: true}));
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())

app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.listen(5000,(req,res)=>{
    console.log('Connected...')
})

app.use('/',route);
app.set('view engine','ejs');
app.set('views')


// app.post('/',async (req,res)=>{
//     const newItem = req.body;
//     const item = new Product({
//         name: newItem.name,
//         price: parseFloat(newItem.price),
//         category: newItem.category
//     });
//     await item.save();
//     res.redirect('/');
// })

// app.get('/:id', async (req,res)=>{
//     const id  = req.params;
//     const product = await Product.findById(id.id);
//     res.render('details',{product});
//     // res.send('Hello')
// })

// app.patch('/:id', async (req,res)=>{
//     const id  = req.params;
//     const newItem = req.body;
//     const product = await Product.findOneAndUpdate({_id: id.id},{
//         name: newItem.name,
//         price: parseFloat(newItem.price),
//         category: newItem.category
//     },{runValidators: true});
//     res.redirect(`/${product._id}`);
// })


// app.get('/:id/edit', async (req,res)=>{
//     const id  = req.params;
//     const product = await Product.findById(id.id); 
//     res.render('edit',{product});
// })
// app.delete('/:id', async (req,res) => {
//     const {id} = req.params;
//     await Product.findByIdAndDelete(id);
//     res.redirect('/');
// })