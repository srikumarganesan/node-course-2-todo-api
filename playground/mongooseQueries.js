/**
 * Created by gsrikumar on 6/29/2017.
 */
const {ObjectID} = require(`mongodb`);

const {mongoose} = require(`./../server/db/mongoose`);
const {Todo} = require(`./../server/models/todo`);

let id = `5954a742fc472c2abc4d8a21`;

if (!ObjectID.isValid(id)) {
    console.log(`ID not valid`);
}

Todo.find({
    _id: id
}).then((todos) => {
    console.log(`Todos ${todos}`);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log(`Todo ${todo}`);
});

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log(`Id not found`);
    }
    console.log(`Todo by id ${todo}`);
}).catch((e) => console.log(e));