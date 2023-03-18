const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LightsSchema = new Schema({
    model:{ 
        type:String,
        trim: true
    },
    manufacturer:{ 
        type:String,
        trim: true
    },
    color:{ 
        type:String,
        trim: true
    },
    createdAt: {
        type: Date,
        unique: true
    }
});

module.exports = mongoose.model('Lights', LightsSchema);