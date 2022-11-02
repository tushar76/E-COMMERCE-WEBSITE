import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({
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
})

const order = mongoose.model( 'Order', OrderSchema);

export default order;