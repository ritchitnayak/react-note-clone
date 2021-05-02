const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const app = express(), port = 3080;

// Placeholder for folders
let folders = []

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/api/folders', (req, res) => {
    res.json(folders);
});

app.post('/api/folders', function (req, res) {
    const newFolder = {
        id: uuidv4(),
        name: req.body.fname,
        notes: []
    }
    folders.push(newFolder)
    res.json(folders);
})

app.post('/api/folders/:fid/notes', function (req, res) {
    const fid = req.params.fid;
    const newFile = {
        id: uuidv4(),
        content: req.body.text,
        timeCreated: Date.now(),
        timeModified: Date.now(),
        folderName: folders.find(folder => folder.id === fid).name
    }
    folders.find(folder => folder.id === fid).notes.push(newFile)
    res.json(newFile);
})

app.put('/api/folders/:fid/notes/:nid', function (req, res) {
    const fid = req.params.fid;
    const nid = req.params.nid;
    var note = folders.find(folder => folder.id === fid).notes.find(note => note.id === nid);
    note.content = req.body.text;
    note.timeModified = Date.now();
    res.json(note);
})

app.delete('/api/folders/:fid/notes/:nid', function (req, res) {
    const fid = req.params.fid;
    const nid = req.params.nid;
    folders.find(folder => folder.id === fid).notes = folders.find(folder => folder.id === fid).notes.filter((note) => note.id !== nid);
    res.json(folders.find(folder => folder.id === fid));
})

app.delete('/api/folders/:fid', function (req, res) {
    const fid = req.params.fid;
    folders = folders.filter((folder) => folder.id !== fid);
    res.json(folders)
})

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});