const express = require('express');
const path = require('path');
const { connectToMongoDB } = require('./connect');
const URL = require('./models/url');
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter")

const app = express();
const PORT = 8500;

connectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => console.log('Mongodb connected...'))

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },
    {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            },
        }
    });
    res.redirect(entry.redirectURL);
});

app.use("/url", urlRoute);
app.use("/", staticRoute);

app.listen(PORT, () => console.log(`Server Listening at ${PORT}...`));
