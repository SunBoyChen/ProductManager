let mongoose = require('mongoose');


let schema = mongoose.Schema({

    name: {
        type: String,
        unique: true,
        required: [true,"分类名称不能少"]
    },

    created : {
        type: Date,
        default: Date.now()
    }


});

module.exports = mongoose.model('category',schema);