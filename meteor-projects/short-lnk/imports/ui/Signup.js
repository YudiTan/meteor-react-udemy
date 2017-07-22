import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Link} from 'react-router';
// run meteor add accounts-password to add authetication stuff
import {Accounts} from 'meteor/accounts-base';


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if (password.length < 9) {
      return this.setState({error: 'Password has to be more than 8 characters long.'}) //returning here stops the createUser function below
    }


    Accounts.createUser({email, password}, (err) => {
      if (err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ""});
      }
    });
  }

  render(){
    return (
      <div className='boxed-view'>
        <div className='boxed-view__box'>
        <h1>Sign up page</h1>

        {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate className='boxed-view__form'>
              <input type="email" ref="email" name="email" placeholder="Email"/>
              {/* giving it a ref name so u can refer to it above */}
              <input type="password" ref="password" name="password" placeholder="Password"/>
              <button className='button'>Create Account</button>
          </form>
        <Link to='/'>Already have an account?</Link>
      </div>
      </div>
    )
  }
};

export default Signup;
