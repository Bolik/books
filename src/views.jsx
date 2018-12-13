import React, { define } from 'react-mvx'
import { withRouter, NavLink } from 'react-router-dom'

import { Author, Book, Comment } from './models'

@define
export class Authors extends React.Component {
    static props = {
        authors: Author.Collection
    }
    render() {
        const { authors } = this.props
        return (
            <div>
                <div>Авторы</div>
                <table>
                    <tbody>
                        { authors.map(author=>(
                            <tr key={author.id}>
                                <td><NavLink to={`/author/${author.id}`}>{author.id}</NavLink></td>
                                <td>{ author.lastname }</td>
                                <td>{ author.firstname }</td>
                                <td>{ author.count() }</td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>
        )
    }
}

@withRouter
@define
export class AuthorPage extends React.Component {
    render() {
        const { id } = this.props.match.params,
              author = this.props.authors.get(parseInt(id))
        return (
            <div>
                <div>Автор: { author.lastname } { author.firstname }</div>
                <div>Биография: { author.biography }</div>
                <Books {...this.props} author={author} />
            </div>
        )
    }
}

@define
export class Books extends React.Component {
    static props = {
        author: Author,
        books: Book.Collection
    }
    render() {
        const {author, books} = this.props
        return (
            <div>
                <div>Книги</div>
                <table>
                    <tbody>
                        { books.filter(el=>author ? el.author === author : true).map(book=>(
                            <tr key={book.id}>
                                <td><NavLink to={`/book/${book.id}`}>{book.id}</NavLink></td>
                                <td>{ book.title }</td>
                                { !Boolean(author) &&
                                  <td>{ book.author.lastname }</td>
                                }
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>
        )
    }

}

@define
export class BookPage extends React.Component {
    render() {
        const { id } = this.props.match.params,
              book = this.props.books.get(parseInt(id))
        return (
            <div>
                <div>Заглавие: { book.title }</div>
                <div>Автор: <NavLink to={`/author/${book.author.id}`}>{book.author.lastname}</NavLink></div>
                <div>Дата публикации: { book.pubdate.toLocaleString() }</div>
                <div>Краткое содержание: { book.description }</div>
                <Comments {...this.props} />
            </div>
        )
    }
}

@define
export class Comments extends React.Component {
    static props = {
        comments: Comment.Collection,
    }
    render() {
        const { book, comments } = this.props,
              page = parseInt(this.props.match.params.page) || 1,
              id = this.props.match.params.id,
              elems = comments.slice((page-1)*10, page*10)
        if (elems.length === 0) {
            return null
        }
        return (
            <div>Комментарии
            { elems.map(comment=>(
                <div key={comment.id}>
                    <div><strong>{ comment.title }</strong></div>
                    <div>{ comment.comment }</div>
                </div>
            ))}
            { elems.length === 10 &&
              <NavLink to={`/book/${id}/${page+1}`}>Next</NavLink>
            }
            </div>
        )
    }
}
