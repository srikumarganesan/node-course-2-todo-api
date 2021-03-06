/**
 * Created by gsrikumar on 6/28/2017.
 */
require(`./config/config`);

const express = require(`express`);
const bodyParser = require(`body-parser`);
const {ObjectID} = require(`mongodb`);
const _ = require(`lodash`);

const {mongoose} = require(`./db/mongoose`);
const {Todo} = require(`./models/todo`);
const {User} = require(`./models/user`);
const {authenticate} = require(`./middleware/authenticate`);

let app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
    next();
});

//POST endpoint
app.post(`/todos`, (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

//GET endpoint, Gets all the todos
app.get(`/todos`, (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

//GET endpoint to get a particular todo
app.get(`/todos/:id`,(req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => res.status(400).send());
});

//DELETE endpoint to delete a particular todo
app.delete(`/todos/:id`, (req, res) => {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => res.status(400).send());
});

//PUT endpoint to edit a todo
app.patch(`/todos/:id`, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, [`text`, `completed`]);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => res.status(400).send());
});

app.get('/users/me', authenticate, (req, res) => res.send(req.user));

//POST /users
app.post(`/users`, (req, res) => {
    let body = _.pick(req.body, [`email`, `password`]);
    let user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
        // res.send(doc);
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => res.status(400).send(e));
});

// POST //users/login {email, password}
app.post(`/users/login`, (req, res) => {
    let body = _.pick(req.body, [`email`, `password`]);
    User.findByCredentials(body.email, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(port, () => console.log(`Started server on port ${port}`));

module.exports = {app};