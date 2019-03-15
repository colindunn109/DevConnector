import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    componentDidMount = () => {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

        if(nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit = event => {
        event.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData);
    }

    render() {
        const errors = this.state.errors;

        return (
            <div className="login">
                <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Log In</h1>
                    <p className="lead text-center">Sign in to your DevConnector account</p>
                    <form onSubmit={this.onSubmit}>

                        <TextFieldGroup 
                            placeholder="Email Address"
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            error={errors.email}
                        />

                        <TextFieldGroup 
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            error={errors.password}
                        />


                        <input type="submit" className="btn btn-info btn-block mt-4" />
                    </form>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    // errors: PropTypes.object.isRequired We have an issue with the frontend error handling.. idk why but we can look later
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
// call connect mapstatetoprops guy, the actionType, and then your component
// mapstatetoprops seems pointless....
