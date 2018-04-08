'use strict'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPosts, deletePost, getPost } from '../actions/actions';
import formatDate from '../utilities/formatDate';
// 
class Posts extends Component {
    constructor(props){
        super(props);
        this.page = 1;
        this.edit = false;
        this.filename = '';
        this.wordCount = 70; // maxium words displayed. approx 4 lines of text.
        // Add Listen function to monitor Browser Buttons
        this.unlisten = this.props.history.listen((location, action) => { 
            if( action === 'POP' ){
                var params = this.props.location.pathname.split('\/');
                if(params[1] == ''){
                    this.page = 1;
                    this.props.getPosts(this.page);
                }
                if(params[1] == 'posts'){
                    this.page = parseInt(params[2]);
                    this.props.getPosts(this.page);
                }
            }
        });         
    }
    componentWillUnmount() {
        this.unlisten();
    }
    componentDidMount() {        
        var params = this.props.location.pathname.split('\/');
        if(params[1] == ''){
            this.page = 1;
            this.props.getPosts(this.page);
        }
        if(params[1] == 'posts'){
            this.page = parseInt(params[2]);
            this.props.getPosts(this.page);
        }
    }
    componentWillReceiveProps(nextProps){  
        if(this.edit == true){  
            // don't transition to edit page until post state is updated 
            // otherwise can not use edit form with controlled input
            this.props.history.push('/edit/' + this.filename);
            this.filename = '';
            this.edit = false;
        }       
    }
    onReadMore(event, title) {
        var filename = title.replace(/ /g, '-');
        filename = filename.replace(/\?/g,'')
        this.props.history.push("/post/" + filename);
    }
    onDeletePost(event, title) {
        var filename = title.replace(/ /g, '-');
        this.props.deletePost(filename);
        // go to first page after a delete at least at the moment until fix
        this.props.getPosts(1); 
    }
    onEditPost(event, title) {
        var filename = title.replace(/ /g, '-');
        filename = filename.replace(/\?/g,'')
        event.preventDefault();
        // update post state for edit form
        this.props.getPost(filename);
        // set edit == true so that a page transition can occur when post state updates.
        this.edit = true;
        this.filename = filename;
    }
    onAddClick(event) {
        event.preventDefault();        
        this.props.history.push('/add');
    }
    onOlderClick(event) {
        event.preventDefault();
        if(this.page == this.props.pages){
            return;
        } else {
            this.page = this.page + 1;              
            this.props.history.push('/posts/' + this.page);
            this.props.getPosts(this.page);
        }
    }
    onNewerClick(event) {
        event.preventDefault();
        if(this.page == 1){
            return;
        } else {
            this.page = this.page - 1;          
            this.props.history.push('/posts/' + this.page);
            this.props.getPosts(this.page);
        }
    }
    limitPostContent(txt){
        var arr = txt.split(/ /g); // array of words
        var count = arr.length;
        var tmp = '';
        if(count <= this.wordCount){
            return txt;
        } else {
            for(let i = 0; i < this.wordCount; i++){
                tmp = tmp + ' '  + arr[i];
            }
            return tmp;
        }       
    }
    renderPosts(){
        var posts = []; 
        posts = this.props.posts;
        if( posts == undefined){
            return (
                <div></div>
            );
        }        
        if( posts.status != undefined){
            return (
                <div><h2>...{ posts.msg }</h2></div>
            );
        }
        return posts.map( (post, index) => {
            return (
                <article key={index}>
                    <div className="subtitle is-6 is-pulled-right">        
                        <a className="subtitle is-6" onClick={ (event) => this.onEditPost(event, post.title) }>#edit </a>
                        | <a className="subtitle is-6" onClick={ (event) => this.onDeletePost(event, post.title) }>#delete</a>        
                    </div>
                    <h2 className="subtitle is-6">{formatDate(post.date)}</h2>
                    <h1 className="title"><a onClick={ (event) => this.onReadMore(event, post.title) }>{post.title}</a></h1>
                    <div className="content">
                        { this.limitPostContent(post.content) }
                
                        <a className="button is-link" onClick={ (event) => this.onReadMore(event, post.title) } style={{height:28}}>
                        Read more
                            <span className="icon is-small">
                            <i className="fa fa-angle-double-right"></i>
                            </span>
                        </a>        
                    </div>
                </article>
            );
        });      
    }
    renderLeftArrow(){
        if(this.page != 1){
            return(
                <div className="level-left">
                    <div className="level-item">                                  
                        <a className="button" onClick={ (event) => this.onNewerClick(event)}>
                            <span className="icon is-small is-marginless">
                                <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true">
                                <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </span>
                            Newer
                        </a>                                 
                    </div>
                </div>
            );
        } else {
            return <div></div>;
        }
    }
    renderRightArrow(){
        if(this.page != this.props.pages){
            return(
                <div className="level-right is-marginless">
                    <div className="level-item">                                 
                        <a className="button" onClick={ (event) => this.onOlderClick(event)}>
                            Older
                            <span className="icon is-small is-marginless">
                                <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true">
                                <polyline points="14 6 20 12 14 18"></polyline>
                                </svg>
                            </span>
                        </a>                                  
                    </div>
                </div>
            );
        } else {
            return <div></div>;
        }
    }        
    render(){       
        return(
            <div>    
                <section className="section section-top">               
                    <div className="container container-top">
                        <div className="level-left">
                            <div className="level-item">                                  
                                <a className="button" onClick={ (event) => this.onAddClick(event) }>
                                   + New Post
                                </a>                                 
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <div className="container">                     
                        {this.renderPosts()}
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <nav className="level is-mobile">
                            {this.renderLeftArrow()}                         
                            {this.renderRightArrow()}
                        </nav>
                    </div>
                </section>
            </div>
        );
    }
}
function mapStateToProps(state){
    return { 
        posts: state.posts.postsPerPage,
        pages: state.posts.pages,
        post: state.post
    };
}
export default connect(mapStateToProps, { getPosts, deletePost, getPost })(Posts)