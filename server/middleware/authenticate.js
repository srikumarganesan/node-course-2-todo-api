/**
 * Created by GSrikumar on 7/13/2017.
 */
let { User } = require(`./../models/user`);

let authenticate = (req, res, next) => {
    let token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => res.status(401).send());
};

module.exports = { authenticate };
