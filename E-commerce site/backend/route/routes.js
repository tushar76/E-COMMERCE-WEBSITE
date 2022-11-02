import  express from "express";
import {addUser ,logIn, logOut} from "../controller/user-controller.js";
import passport from "passport";
import item from "../models/item-schema.js";
import user from "../models/user-schema.js";
import cart from "../models/cart-schema.js";
import query from "../models/query-schema.js";
import order from "../models/order-schema.js";


const route = express.Router();

route.get('/',(req,res)=>{res.render('addItem')});
route.post('/addItem', (req,res)=>{
    const {itemName, description, price, image, type, weight, quantity} = req.body;
    try{
        const data = new item({itemName, description, price, image,type,weight,quantity});
        data.save()
        res.redirect('/');
    }catch(err){
        res.send(err)
    }
})









// Creating a user
route.post("/signUp",addUser);

// Logging In
route.post('/signIn',passport.authenticate('local',{failureMessage:true}),logIn);

route.get('/logout',logOut);





//Fetching Data
route.get('/items',(req,res) => {
    item.find().then(data => {
        res.json(data);
    }).catch(err => console.log(err));
})



//Adding Address
route.patch('/address', async (req,res)=>{
    const {userState: currentUser,body: orderList} = req.body;
    try {
        await user.findOneAndUpdate({_id: currentUser.id},{
            address: currentUser.address,
            pincode: currentUser.pincode,
            city: currentUser.city,
            state: currentUser.state,
            phone: currentUser.phone
        },{runValidators: true});

        orderList.map( element => {
            const {itemName, description, price, image, type, weight, quantity,userId} = element;
            const data = new order({itemName, description, price, image,type,weight,quantity,userId});
            data.save();
            })
    
            res.json({auth: true, message: 'Address updated & Order placed successfully',orderList})

        // res.json({auth: true, message: 'Address updated'})
    }catch (error) {
        res.json({message: error.message});
    }
})



//Adding item to cart
route.post('/cart', (req,res)=>{
    const {itemName, description, price, image, type, weight, quantity,userId,objectId} = req.body;
    try{
        const data = new cart({itemName, description, price, image,type,weight,quantity,userId,objectId});
        data.save();
        res.json({auth: true, message: 'Success added to cart'})
    }catch(err){
        res.json({message: err.message});
    }
})

route.get('/cart/:id',(req,res) => {
    const id = req.params.id;
    cart.find({userId: id}).then(data => {
        res.json(data);
    }).catch(err => console.log(err));
})

route.delete('/cart/:id/delete',(req,res) => {
    const id = req.params.id;
    cart.findByIdAndDelete(id).then(
        res.json({message: 'Successfully deleted'})
    ).catch(err => {
        res.json({message: 'Unable to delete something went wrong'})}
    )
})


//Order
route.get('/order/:id',(req,res) => {
    const id = req.params.id;
    order.find({userId: id}).then(data => {
        res.json(data);
    }).catch(err => console.log(err));
})

route.delete('/order/:id/delete',(req,res) => {
    const id = req.params.id;
    order.findByIdAndDelete(id).then(
        res.json({message: 'Successfully deleted'})
    ).catch(err => {
        res.json({message: 'Unable to delete something went wrong'})}
    )
})



//Adding Query

route.post('/query', (req,res)=>{
    const {name,email,subject,message} = req.body;
    try{
        const newQuery = new query({name,email,subject,message});
        newQuery.save()
        res.json({message: 'Thanks For contacting us...'});
    }catch(err){
        res.json({message: 'Something went wrong'});
    }
})



export default route;