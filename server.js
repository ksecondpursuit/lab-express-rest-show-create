// server.js
const app = require ('./app')

//loads from env

require('dotenv').config();
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Sever is running on port ${PORT}`)
});