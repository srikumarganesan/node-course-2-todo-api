/**
 * Created by GSrikumar on 6/28/2017.
 */
const mongoose = require(`mongoose`);
const validator = require(`validator`);
const jwt = require(`jsonwebtoken`);
const _ = require(`lodash`);
const bcrypt = require(`bcryptjs`);

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength:4,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: `{VALUE} is not a valid email`
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});

//Instance method
UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

//Model method
UserSchema.statics.findByToken = function(token) {
    let User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, `abc123`)
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
       '_id': decoded._id,
        //Use quotes when we have dot in the key
        'tokens.token': token,
        'tokens.access': `auth`
    });
};

UserSchema.statics.findByCredentials = function(email, password) {
    let user = this;

    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
               if (result) {
                   resolve(user);
               } else {
                   reject();
               }
            });
        })
    })
};

//Mongoose middleware
UserSchema.pre(`save`, function(next) {
    let user = this;
    if (user.isModified(`password`)) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });

    } else {
        next();
    }
});

UserSchema.methods.generateAuthToken = function() {
    let user = this;
    let access = `auth`;
    let token = jwt.sign({ _id: user._id.toHexString(), access},`abc123`).toString();

    user.tokens.push({access, token});
    return user.save().then(() => {
        return token;
    });
};

let User = mongoose.model(`Users`,UserSchema);

module.exports = {User};