/**
 * Created by GSrikumar on 6/28/2017.
 */
const mongoose = require(`mongoose`);

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost:27017/TodoApp`);

module.exports = {mongoose};