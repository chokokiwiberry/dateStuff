const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dateSchema = new Schema({

    dateEnd: {
        type: String,
        required: true
    },
   
},{ timestamps: true });

const dateS = mongoose.model('dateS', dateSchema);

module.exports = dateS;