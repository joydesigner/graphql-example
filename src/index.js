import { GraphQLServer } from 'graphql-yoga';
const users = [
  {
    id: 1,
    name: 'Andrew',
    email: 'andrew@example.com'
  },
  {
    id: 2,
    name: 'Jason',
    email: 'jason@example.com'
  },
  {
    id: 3,
    name: 'Xin',
    email: 'xin@example.com'
  }
];

const posts = [
  {
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to GraphQL...',
    published: true
  },
  {
    id: '12',
    title: 'GraphQL 201',
    body: 'This is an advanced GraphQL...',
    published: false
  },
  {
    id: '13',
    title: 'programming music',
    body: 'This is an advanced GraphQL...',
    published: false
  },
  {
    id: '14',
    title: 'Javascript ninja',
    body: 'This is an advanced js course...',
    published: false
  },
];

const typeDefs = `
  type Query {
    users(query: String):[User!]!
    posts(query: String):[Post!]!
    me: User!
    post: Post!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`

const resolvers = {

  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;

      }
      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter(post => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
        return isTitleMatch || isBodyMatch;
      })
    },
    me() {
      return {
        id: '123098',
        name: 'Mike',
        email: 'mike@example.com',
        age: 28
      }
    },
    post() {
      return {
        id: '092',
        title: 'GraphQL 101',
        body: '',
        published: false
      }
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('the server is up');
})


