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


//START_ASYNC -do not remove notes, place code between correct pair of notes.

bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Hash:", hash);
    bcrypt.compare(someOtherPlaintextPassword, hash, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log("Passwords match:", result);
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
