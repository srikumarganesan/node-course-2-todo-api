/**
 * Created by gsrikumar on 6/28/2017.
 */
const {MongoClient, ObjectID} = require(`mongodb`);

MongoClient.connect(`mongodb://localhost:27017/ToDoApp`, (err, db) => {
    if (err) {
        return console.log(`Unable to connect to MongoDB Server`);
    }
    console.log(`Connected to MongoDB server`);

    // db.collection(`Todos`).findOneAndUpdate({
    //     _id: new ObjectID(`595349de02997cb7eb73eed9`)
    // },{
    //     $set: {
    //         completed: true
    //     }
    // },{
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection(`Users`).findOneAndUpdate({
        _id: new ObjectID(`595371b802997cb7eb73f69b`)
    },{
        $set: {
            name: `Sri`
        },
        $inc: {
            age: 1
        }
    },{
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });
    //db.close();
});