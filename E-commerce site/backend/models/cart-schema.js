import mongoose from "mongoose";


const CartSchema = new mongoose.Schema({
    itemName : String,
    description: String,
    price : Number,
    image : String,
    type: {
        type: String,
        enum : ['medicine','groceries','books','stationery','cosmetics','electronics','any']
    },
    weight: String,
    quantity: Number,
    userId: String,
    objectId: String
})

const cart = mongoose.model('Cart', CartSchema);

export default cart;