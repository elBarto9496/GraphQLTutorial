const graphql = require('graphql')
const _ = require('lodash')
const Book = require('./models/book')
const Author = require('./models/author');
const { model } = require('mongoose');
const author = require('./models/author');
const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLID,
    GraphQLList
} = graphql;


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: authorType,
            resolve(parents, args) {
                // resolve()
                console.log(parents)
                return _.find(authors, { id: parents.authorId })
            }
        }
    })
});

const authorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //code to get the data from database or other sources
                // console.log(books['id'])
                // return _.find(books, { id: args.id })
            }
        },
        author: {
            type: authorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(authors, { id: args.id })
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parents, args) {
                // return books
            }
        },
        authors: {
            type: new GraphQLList(authorType),
            resolve(parents, args) {
                return authors
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: authorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save()
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})