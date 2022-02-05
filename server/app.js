const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema.js')
const app = express();
const mongoose = require('mongoose')

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.get('/', (req, res) => {
    res.send('Hello you\'re on the Hompage')
})

console.log('mongoose.connect(<<\'your connection String\'>>')
mongoose.connection.once('open', () => {
    console.log('Connected to the DB')
})

app.listen(3000, () => {
    console.log('now listening for requests')
}
);