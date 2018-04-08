'use strict'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../actions/actions';
import formatDate from '../utilities/formatDate';
// 
class Post extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        var filename = this.props.match.params.filename;
        this.props.getPost(filename);                  
    }
    componentWillReceiveProps(nextProps){  // redux updates props and triggers a force update        
    }
    componentWillUnmount() {        
    }
    onGoBack(event) {
        this.props.history.goBack();
    }
    renderPost(){
        var post  = {};
        post = this.props.post;
        if( post == undefined){
            return (
                <div></div>
            );
        }        
        if( post.status != undefined){
            return (
                <div><h2>...{ post.msg }</h2></div>
            );
        }        
        return (
            <article>
                <div className="subtitle is-6 is-pulled-right">        
                    <a className="subtitle is-6" onClick={ (event) => this.onGoBack(event)} >
                    &lt; Go Back</a> 
                </div>
                <h2 className="subtitle is-6">{formatDate(post.date)}</h2>
                <h1 className="title"><a href="#">{post.title}</a></h1>
                <div className="content">
                    {post.content}    
                </div>
            </article>
        );
    }        
    render(){       
        return(
            <div>    
                <section className="section">
                    <div className="container">
                       {this.renderPost()}
                    </div>
                </section>
            </div>
        );
    }
}
function mapStateToProps(state){
    return { 
        post: state.post
    };
}
export default connect(mapStateToProps, { getPost })(Post)