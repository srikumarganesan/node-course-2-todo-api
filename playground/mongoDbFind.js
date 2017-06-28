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

    // db.collection(`Todos`).find({
    //     _id: new ObjectID(`5953399c02997cb7eb73ecab`)
    // }).toArray().then((docs) => {
    //     console.log(`ToDos`);
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log(`Unable to fetch Todos`);
    // });

    // db.collection(`Todos`).find().count().then((count) => {
    //     console.log(`ToDos count: ${count}`);
    // }, (err) => {
    //     console.log(`Unable to fetch Todos`);
    // });

    db.collection(`Users`).find({
        name: `Srikumar G`
    }).toArray().then((docs) => {
        console.log(`User`);
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log(`Unable to fetch users`);
    });
    //db.close();
});