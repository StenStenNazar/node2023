const fs = require("fs");
const path = require("path");

const validator = (id, name, age) => {
    if (id <= 0 || typeof id !== 'number') {
        throw new Error('id:only numbers')
    }
    if (age <= 0 || age > 150) {
        throw new Error('age: nin 1 max150')
    }
    if (name.length <= 2 || name.length > 25) {
        throw new Error(' name: min char 2 , max char 25')
    }
}

const userWriterJson = (users) => {
    fs.writeFile(path.join(__dirname, `users.json`), `${JSON.stringify(users)}`, (err) => {
        if (err) throw  new Error(err.message)
    })
}

module.exports.validator = validator
module.exports.userWriterJson = userWriterJson