'use strict';
const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const app         = express();
const bcrypt = require('bcrypt');
fccTesting(app);
const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';

app.get('/', (req, res) => {

    res.send("Hello World");
});

//START_ASYNC -do not remove notes, place code between correct pair of notes.
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
    console.log("Async Hash:", hash);
    bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
        console.log("Async Passwords match:", res);
    });
});
//END_ASYNC

//START_SYNC
const salt = bcrypt.genSaltSync(saltRounds);
const hashSync = bcrypt.hashSync(myPlaintextPassword, salt);
console.log("Sync Hash:", hashSync);
const resultSync = bcrypt.compareSync(someOtherPlaintextPassword, hashSync);
console.log("Sync Passwords match:", resultSync);


//END_SYNC






const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port:", PORT)
});
