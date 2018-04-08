'use strict'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updatePost } from '../actions/actions';
import formatDate from '../utilities/formatDate';
// 
class Edit extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: props.post.title,
            date: props.post.date,
            content: props.post.content
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);        
    }
    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }
    handleContentChange(event) {
        this.setState({content: event.target.value});
    }
    handleSubmit(event) {        
        event.preventDefault();
        var filename = this.props.match.params.filename;
        this.props.updatePost( filename, {
            title: this.state.title,
            date: this.state.date, // don't change on update
            content: this.state.content
        });
        this.props.history.goBack(); 
    }
    onGoBack(event) {
        this.props.history.goBack();
    }        
    render(){      
        return(
            <div>    
                <section className="section">
                    <div className="container">
                       <article>
                            <form onSubmit={this.handleSubmit}>
                                <label>Title: </label>
                                <br/>
                                <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
                                <br/>                                
                                <br/>
                                <label>Content:</label>
                                <br/>
                                <textarea value={this.state.content} onChange={this.handleContentChange} />
                                <br/>
                                <br/>
                                <div className="level-right is-marginless">
                                    <div className="level-item">  
                                        <input type="submit" value="Submit" className="button" />

                                        <button type="button" className="button" style={{marginLeft: 3}} 
                                            onClick={ (event) => this.onGoBack(event)}>Cancel</button> 
                                    </div>
                                </div>

                            </form>
                        </article>
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
export default connect( mapStateToProps, { updatePost })(Edit);