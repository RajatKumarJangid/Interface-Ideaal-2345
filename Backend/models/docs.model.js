const mongoose = require("mongoose");

const docSchema = mongoose.Schema({
    title : {type: String, required: true},
    content : {type: String, required: true}
},{
    versionKey : false
})

const DocModel = new mongoose.model("docs", docSchema);

module.exports = {
    DocModel
}