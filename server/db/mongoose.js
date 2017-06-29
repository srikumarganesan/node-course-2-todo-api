/**
 * Created by GSrikumar on 6/28/2017.
 */
const mongoose = require(`mongoose`);

mongoose.Promise = global.Promise;
//mongoose.connect(`mongodb://localhost:27017/TodoApp`);
mongoose.connect(`mongodb://srikumar:srikumar@ds143362.mlab.com:43362/todoapp`);

module.exports = {mongoose};