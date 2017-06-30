/**
 * Created by gsrikumar on 6/29/2017.
 */
const {ObjectID} = require(`mongodb`);

const {mongoose} = require(`./../server/db/mongoose`);
const {Todo} = require(`./../server/models/todo`);

let id = `5954d3bb7e85a521484e767a`;

//Removes all the documents in the entire collection
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

//There are two more ways to remove a document from a collection. They are mentioned below
//Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.findByIdAndRemove(id).then((todo) => {
    console.log(todo);
});