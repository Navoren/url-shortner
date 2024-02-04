const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { connectToMongoDB } = require('./connect');
const URL = require('./models/url');
const { restrictToLoggedInUserOnly, checkAuth} = require('./middlewares/auth');
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require('./routes/user');
const { userInfo } = require('os');

const app = express();
const PORT = 8500;

connectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => console.log('Mongodb connected...'))

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuth());
app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/user",  userRoute);
app.use("/", checkAuth, staticRoute);

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

app.listen(PORT, () => console.log(`Server Listening at ${PORT}...`));
