import React, { define } from 'react-mvx'
import { HashRouter as Router, Route, Redirect, Switch, NavLink } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import { Authors, Books, AuthorPage, BookPage } from './views'
import { PageStore } from './models'

const history = createBrowserHistory()

@define
export default class App extends React.Component {
    static state = {
        store: PageStore,
        loading: true
    }
    componentDidMount() {
        this.state.store.fetch().then(()=>this.state.loading=false)
    }
    render() {
    const { authors, books, comments } = this.state.store,
    { loading } = this.state
    if (loading) {
       return null
}
        return (
            <Router history={history}>
            <div>
                    <Switch>
                        <Route path='/authors' component={(props) => <Authors {...props} authors={authors} />} />
                        <Route path='/books' component={(props) => <Books {...props} books={books} />} />
                        <Route path='/author/:id' component={(props) => <AuthorPage {...props} authors={authors} books={books} />}  />
                        <Route path='/book/:id/:page?' component={(props) => <BookPage  {...props} books={books} comments={comments} />} />
                    </Switch>
                <div><NavLink to='/authors'>Авторы</NavLink></div>
                <div><NavLink to='/books'>Книги</NavLink></div>
            </div>
            </Router >
        )
    }
}
