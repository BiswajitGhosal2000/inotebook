const connectDB = require('./db');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

connectDB();
const app = express()
const port = process.env.NODE_PORT || 5000

//Available routes
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/note', require('./routes/noteRoute'));

// app.get('/', (req, res) => {
//     res.send('Hello World! Have a nice day!')
// })

app.listen(port, () => {
    console.log(`iNoteBook Backend listening on port ${port}`)
})