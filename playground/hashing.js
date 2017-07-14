/**
 * Created by gsrikumar on 7/4/2017.
 */
const {SHA256} = require(`crypto-js`);
const jwt = require(`jsonwebtoken`);
const bcrypt = require(`bcryptjs`);

let password = `123abc!`;

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => console.log(hash));
// });

var hashedPassword = `$2a$10$sEDsJBGkNwwxCMAihJpd3ONB9hynluGFLltjienaaasQfIxR1dLa2`;

bcrypt.compare(password, hashedPassword, (err, result) => console.log(result));
// let data = {
//     id: 4
// };
//
// let token = jwt.sign(data, `123`);
// console.log(token);
//
// let decoded = jwt.verify(token, `123`);
// console.log(`Decoded: `, decoded);

// let message = `I am user number 3`;
// let hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// let data = {
//     id: 4
// };
//
// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + `somesecret`).toString()
// };
//
// let resultHash = SHA256(JSON.stringify(token.data) + `somesecret`).toString();
//
// if (resultHash === token.hash) {
//     console.log(`Data was not changed`);
// } else {
//     console.log(`Data was not changed. Do not trust`);
//}