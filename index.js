const express = require('express');
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

const {v4: uuidv4} = require('uuid');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

///////////////////////////////////////////

let comments = [
    {
        id: uuidv4(),
        username: 'Samantha 3212',
        text: 'This is really terrible'
    },
    {
        id: uuidv4(),
        username: 'Jack1222',
        text: 'This is really awesome'
    },
    {
        id: uuidv4(),
        username: 'Mackson',
        text: 'What are you doing?'
    },
    {
        id: uuidv4(),
        username: 'Nada 33',
        text: 'This is why I hate ants'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', {comments});
})

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

app.post('/comments', (req, res) => {
    const {username, text} = req.body;
    comments.push({username, text, id: uuidv4()});
    res.redirect('/comments');
})

app.get('/comments/:id/edit', (req, res) => {
    const {id} = req.params;
    const editComment = comments.find((c) => c.id == id);
    res.render('comments/edit', {editComment});
})

app.patch('/comments/:id', (req, res) => {
    const {id} = req.params;
    const {text} = req.body;
    const findComment = comments.find((c) => c.id == id);
    findComment.text = text;
    res.redirect('/comments');
})

app.delete('/comments/:id', (req, res) => {
    const {id} = req.params;
    const filterDeletedComment = comments.filter(c => c.id !== id);
    comments = filterDeletedComment;
    res.redirect('/comments');
})

app.listen(3000, () => {
    console.log('Hello')
})


