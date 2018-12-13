import {define, Record, Collection, Store} from 'type-r'
import { attributesIO } from 'type-r/endpoints/attributes'

import ApolloClient from 'apollo-boost'
import * as data from './data'

const client = new ApolloClient()

@define
export class AuthorCollection extends Collection {
    fetch() {
        this.add(data.authors, {parse: true})
    }
}

@define
export class Author extends Record {
    static Collection = AuthorCollection
    static attributes = {
        lastname: String,
        firstname: String,
        biography: String
    }
    count() {
        return this.getStore().books.filter(el=>el.author === this).length
    }
}

@define
export class BookCollection extends Collection {
    fetch() {
        this.add(data.books)
    }
}

@define
export class Book extends Record {
    static Collection = BookCollection
    static attributes = {
        author: Author.from('~authors'),
        title: String,
        pubdate: Date,
        description: String
    }
}

@define
export class CommentCollection extends Collection {
    fetch() {
        this.add(data.comments, { parse: true })
    }
}

@define
export class Comment extends Record {
    static Collection = CommentCollection
    static attributes = {
        title: String,
        comment: String
    }
}

@define
export class PageStore extends Store {
    static endpoint = attributesIO();
    static attributes = {
        authors: Author.Collection,
        books: Book.Collection,
        comments: Comment.Collection
    }
}

