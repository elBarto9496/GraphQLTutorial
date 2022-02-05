const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema.js')
const app = express();
const mongoose = require('mongoose')

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

mongoose.connect('mongodb+srv://ak2px:Akatti9496@gql-amogh.k1hve.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
    console.log('Connected to the DB')
})

app.listen(4000, () => {
    console.log('now listening for requests')
}
);