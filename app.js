const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'lesson1'), (err) => {
    if (err) throw new Error(err.message)
});

for (let i = 1; i < 6; i++) {
    fs.mkdir(path.join(__dirname, 'lesson1', `folder${i}`), (err) => {
        if (err) throw  new Error(err.message)
    })
    fs.writeFile(path.join(__dirname, 'lesson1', `text${i}.txt`), `hello oken${i}`, (err) => {
        if (err) throw  new Error(err.message)
    })
}

fs.readdir(path.join(__dirname, 'lesson1'), {withFileTypes: true}, (err, files) => {
    if (err) throw new Error(err.message)
    files.forEach(file => {
        if (file.isDirectory()) {
            console.log(`Folder:${file.name}`)
        } else {
            console.log(`File:${file.name}`)
        }
    })
});