
const app = require('app')

require('dotenv').config()

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('test')
});

app.listen(port, () => {
    console.log(`Server test http://localhost:${PORT}`)
})