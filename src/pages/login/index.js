import React, {Component} from 'react';
import styles from './login.scss';
import Nav from '../2017/09/01/components/Nav';
import PropTypes from 'prop-types';
import axios from 'axios';
import SignIn from './signin.js';
import SignUp from './signup.js';
import Forgot from './forgot.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signedin: false,
      view: 'signup',
      email: '',
      username: '',
      password: '',
      confpassword: '',
      logemail: '',
      logpassword: '',
      forgotemail: '',
      confemail: '',
      showErr: false,
      showSuccess: false,
      showSpinner: false,
      succMsg: '',
      errMsg: '',
    };
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.forgot = this.forgot.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  signup(event) {
    event.preventDefault();

    this.setState(
      {
        showErr: false,
        showSuccess: false,
        showSpinner: true,
      }
    );

    let body = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      confpassword: this.state.confpassword,
    };

    axios.post('/api/signup', body)
      .then(response => {
        console.log(response);
        this.props.handleAuth.login();
        this.setState(
          {
            showErr: false,
            showSuccess: true,
            showSpinner: false,
            succMsg: response.data,
          }
        );
      })

      .catch(err => {
        console.log(err);
        this.setState(
          {
            showErr: true,
            showSuccess: false,
            showSpinner: false,
            errMsg: err,
          }
        );
      });
  }

  login(event) {
    event.preventDefault();

    this.setState(
      {
        showErr: false,
        showSuccess: false,
        showSpinner: true,
      }
    );

    let body = {
      logemail: this.state.logemail,
      logpassword: this.state.logpassword,
    };

    axios.post('/api/login', body)

      .then(response => {
        console.log(response);
        this.props.handleAuth.login();
        this.setState(
          {
            showErr: false,
            showSuccess: true,
            showSpinner: false,
            succMsg: response.data,
          }
        );
      })

      .catch(err => {
        console.log(err);
        this.setState(
          {
            showErr: true,
            showSuccess: false,
            showSpinner: false,
            errMsg: err,
          }
        );
      });
  }

  forgot(event) {
    event.preventDefault();

    this.setState(
      {
        showErr: false,
        showSuccess: false,
        showSpinner: true,
      }
    );

    let body = {
      forgotemail: this.state.forgotemail,
      confemail: this.state.confemail,
    };

    axios.post('/api/forgot', body)

      .then(response => {
        console.log(response);
        this.props.handleAuth.logout();
        this.setState(
          {
            showErr: false,
            showSuccess: true,
            showSpinner: false,
            succMsg: response.data,
          }
        );
      })

      .catch(err => {
        console.log(err);
        this.setState(
          {
            showErr: true,
            showSuccess: false,
            showSpinner: false,
            errMsg: err,
          }
        );
      });
  }

  handleChange(evt) {
    let newState = {};
    newState[evt.target.id] = evt.target.value;
    this.setState(newState);
  }

  changeView(event) {
    event.preventDefault();
    this.setState({view: event.target.id});
  }

  render() {
    let showView;
    let highlight1 = '';
    let highlight2 = '';
    switch (this.state.view) {
    case 'signup':
      showView =
        <SignUp
          handleSubmit={this.signup}
          handleChange={this.handleChange}
          vals={this.state}
        />;
      highlight1 = styles.highlight;
      break;
    case 'login':
      showView =
        <SignIn
          handleSubmit={this.login}
          handleChange={this.handleChange}
          changeView={e => this.changeView(e)}
          vals={this.state}
        />;
      highlight2 = styles.highlight;
      break;
    case 'forgot':
      showView =
        <Forgot
          handleSubmit={this.forgot}
          handleChange={this.handleChange}
          changeView={e => this.changeView(e)}
          vals={this.state}
        />;
      break;
    }

    return (
      <div className={`row ${styles.background}`}>
        <Nav show={true} handleAuth={this.props.handleAuth} />
        <div className={`${styles.container} col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4`}>
          <div
            id='signup'
            onClick={e => this.changeView(e)}
            className={`${styles.view} ${highlight1}`}>
            Sign Up
          </div>
          <div
            id='login'
            onClick={e => this.changeView(e)}
            className={`${styles.view} ${highlight2}`}>
            Sign In
          </div>
          <div className='col-xs-12'>
            {showView}
            {this.state.showErr ? <div className='alert alert-danger'>{this.state.errMsg}</div> : ''}
            {this.state.showSuccess ? <div className='alert alert-success'>{this.state.succMsg}</div> : ''}
            {this.state.showSpinner ?  <div className='block-center'><i className='fa fa-cog fa-spin fa-3x fa-fw'></i></div> : ''}
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  handleAuth: PropTypes.object.isRequired,
};

export default Login;
