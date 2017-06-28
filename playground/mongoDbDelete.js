/**
 * Created by gsrikumar on 6/28/2017.
 */
const {MongoClient, ObjectID} = require(`mongodb`);

MongoClient.connect(`mongodb://localhost:27017/ToDoApp`, (err, db) => {
    if (err) {
        return console.log(`Unable to connect to MongoDB Server`);
    }
    console.log(`Connected to MongoDB server`);

    //delete many
    // db.collection(`Todos`).deleteMany({text: `Eat Lunch`}).then((result) => {
    //     console.log(result);
    // });

    //delete One
    // db.collection(`Todos`).deleteOne({text: `Eat Lunch`}).then((result) => {
    //    console.log(result);
    // });

    //find one and delete
    // db.collection(`Todos`).findOneAndDelete({completed: false }).then((result) => {
    //    console.log(result);
    // });

    // db.collection(`Users`).deleteMany({name: `Srikumar G`}).then((result) => {
    //     console.log(result);
    // });

    db.collection(`Users`).findOneAndDelete({_id: new ObjectID(`5953536002997cb7eb73f194`)}).then((result) => {
        console.log(result);
    });


    //db.close();
});