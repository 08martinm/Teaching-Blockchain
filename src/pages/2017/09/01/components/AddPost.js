import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/comment.scss';

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    let newState = {};
    newState[evt.target.id] = evt.target.value;
    this.setState(newState);    
  }

  render() {
    return (
      <form onSubmit={evt => this.props.submitPost(evt, {comment: this.state.comment, parent_id: this.props.parent_id})} method='post' action='/'>
        <textarea id='comment' onChange={this.handleChange} className='form-control' rows='4'></textarea>
        <div className={`text-center ${styles.btncontainer}`}>
          <button className='btn btn-primary' type='submit'>Post Comment</button>
          <button className='btn btn-warning' type='submit'>Cancel</button>
        </div>
      </form>
    );
  }
}

AddPost.propTypes = {
  submitPost: PropTypes.func.isRequired,
  parent_id: PropTypes.string,
};

export default AddPost;