/**
 * Created by GSrikumar on 6/28/2017.
 */
const mongoose = require(`mongoose`);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};