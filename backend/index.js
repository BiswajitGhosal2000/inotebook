const connectDB = require('./db');
const express = require('express');

connectDB();
const app = express()
const port = process.env.NODE_PORT || 5000

//Available routes
app.use(express.json())
app.use('/api/auth', require('./routes/Auth'));
app.use('/api/notes', require('./routes/Notes'));

app.get('/', (req, res) => {
    res.send('Hello World! Have a nice day!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})