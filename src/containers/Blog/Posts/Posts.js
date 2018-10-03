import React, { Component } from 'react';
import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import { Route, Link } from 'react-router-dom';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        console.log(this.props)
        axios.get('posts')
            .then(response => {
                //get the first 4 elements out of 100
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Lae'
                    }
                })
                this.setState({ posts: updatedPosts })
            })
            .catch(err => {
                console.log(err);
                //this.setState({ error: true });
            });
    }

    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id });
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    <Link to={`/posts/${post.id}`} key={post.id}>
                        <Post
                            title={post.title}
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)} />
                    </Link>
                )
            })
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={`${this.props.match.url}/:id`} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;