const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/inventory")
    .then(() => console.log(`Mongoose Connect...`))
    .catch(er => console.log(`Error: ${er}`));


const inventorSchema = new mongoose.Schema({
    item: String,
    qty: Number,
    status: String
});

const Inventor = mongoose.model("Inventor", inventorSchema);

async function createInventor() {
    const result = new Inventor({
        item: "postcard",
        qty: 45,
        status: "A"
    })

    await result.save();
}

async function getInventories() {
    return await Inventor
        .find()
        .or([{ qty: { $lte: 50 } }, { item: /.*l.*/i }])
        .sort({ qty: -1 })
}

async function get() {
    const response = await getInventories();
    console.log(response);
}

get();