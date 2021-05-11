require('dotenv').config();
const express = require('express');

// DB config
require('./configs/db.config');

const app = express();

// Middleware config
require('./configs/middleware.config')(app);
require('./configs/cors.config')(app);

// Session config + Passport
require('./configs/session.config')(app);
require('./configs/passport.config')(app);

const partyRouter = require("./routes/parties.routes");
const authRouter = require('./routes/auth.routes');
const reviewRouter = require("./routes/review.routes")
app.use('/api/parties', partyRouter);
app.use('/api/auth', authRouter);
app.use('/api/reviews', reviewRouter);


//  Catch 404 and respond with error message
app.use((req, res, next) => {
  return res.status(404).json({ message: "Not found"});
})

module.exports = app;