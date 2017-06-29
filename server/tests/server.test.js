/**
 * Created by gsrikumar on 6/29/2017.
 */
const expect = require(`expect`);
const request = require(`supertest`);
const {ObjectID} = require(`mongodb`);

const {app} = require(`./../server`);
const {Todo} = require(`./../models/todo`);

const todos = [{
    _id: new ObjectID(),
    text: `First Test todo`
}, {
    _id: new ObjectID(),
    text: `Second Test todo`
}];

beforeEach((done) => {
   Todo.remove({}).then(() => {
       return Todo.insertMany(todos)
   }).then(() => done());
});

describe(`POST /todos`, () => {
    it(`Should create a new Todo`, (done) => {
        let text = `Test Todo text`;

        request(app)
            .post(`/todos`)
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it(`Should not create Todo with invalid data`, (done) => {
        request(app)
            .post(`/todos`)
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe(`GET /todos`, () => {
    it(`Should get all Todos`, (done) => {
        request(app)
            .get(`/todos`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe(`GET /todos/:id`, () => {
   it(`Should return todo doc`, (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
   });

   it(`Should return a 404 if todo not found`, (done) => {
       let id = new ObjectID().toHexString();
       request(app)
            .get(`/todos/${id}`)
            .expect(404)
           .end(done);
   });

   it(`Should return 404 for non-object IDs`, (done) => {
       let id = `123`;
       request(app)
           .get(`/todos/${id}`)
           .expect(404)
           .end(done);
   });
});