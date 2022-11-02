import mongoose from "mongoose";


const ItemSchema = new mongoose.Schema({
    itemName : String,
    description: String,
    price : Number,
    image : String,
    type: {
        type: String,
        enum : ['medicine','groceries','books','stationery','cosmetics','electronics','any']
    },
    weight: String,
    quantity: Number
})

const item = mongoose.model('Item', ItemSchema);

export default item;