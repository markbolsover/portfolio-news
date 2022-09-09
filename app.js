const express = require('express');

const { getTopics } = require('./controllers/topics.controller.js');
const { getUsers } = require('./controllers/users.controller.js');
const { getArticles, getArticleByID, getCommentsByArticleId, addComment, editVotes } = require('./controllers/articles.controller.js');
const { invalidRequest } = require('./controllers/errors.controller.js');

const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);
app.get('/api/users', getUsers);
app.get('/api/articles', getArticles);
app.get('/api/articles/:article_id', getArticleByID);
app.get('/api/articles/:article_id/comments', getCommentsByArticleId)
app.post('/api/articles/:article_id/comments', addComment)
app.patch('/api/articles/:article_id', editVotes);
app.all('/*', invalidRequest);

app.use((err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({ msg: 'bad request' });
    } else if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    } else {
        console.log(err, '<<<<<<<<< error');
        res.status(500).send({ msg: 'internal server error' });
    };
});

module.exports = app;