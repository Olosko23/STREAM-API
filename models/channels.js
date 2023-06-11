const mongoose = require("mongoose");

const channelsSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        uniqie: true
    },
    url:{
        type: String,
        required: true,
        unique: true
    },
    logo :{
        type: String,
        unique: true
    }
},
{
    timestamp: true
}
)

const Channels = mongoose.model("Channels", channelsSchema);

module.exports = Channels;