/**
 * Created by gsrikumar on 6/27/2017.
 */
//const MongoClient = require(`mongodb`).MongoClient;
const {MongoClient, ObjectID} = require(`mongodb`);

MongoClient.connect(`mongodb://localhost:27017/ToDoApp`, (err, db) => {
    if (err) {
        return console.log(`Unable to connect to MongoDB Server`);
    }
    console.log(`Connected to MongoDB server`);

    // db.collection(`Todos`).insertOne({
    //     text: `Pay mobile bill`,
    //     completed: `false`
    // }, (err, result) => {
    //     if (err) {
    //         return console.log(`Unable to insert to Todo. ${err}`);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection(`Users`).insertOne({
        name: `Srikumar G`,
        age: 35,
        location: `Bengaluru`
    }, (err, result) => {
        if (err) {
            return console.log(`Unable to insert to Users. ${err}`);
        }
        //console.log(JSON.stringify(result.ops, undefined, 2));
        console.log(result.ops[0]._id.getTimestamp());
    });

    db.close();
});