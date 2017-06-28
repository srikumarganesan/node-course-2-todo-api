/**
 * Created by GSrikumar on 6/28/2017.
 */
const mongoose = require(`mongoose`);


let User = mongoose.model(`Users`,{
    email: {
        type: String,
        required: true,
        minlength:4,
        trim: true
    }
});

module.exports = {User};