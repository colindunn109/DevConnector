import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import ProfileActions from './ProfileActions';


class Dashboard extends Component {

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onDeleteClick = event => {
        this.props.deleteAccount();
    }

    render() {

        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;

        if(profile === null || loading) {
            dashboardContent = <h4>Loading...</h4>
        }
        else {
            if(Object.keys(profile).length > 0) { // Profile found
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                        Welcome <Link to={`/profile/${profile.handle}`}> {user.name}</Link>
                        </p>
                        <ProfileActions />
                        <div style={{marginBottom: '60px'}} />
                        <button onClick={this.onDeleteClick} className="btn btn-danger">Delete My Account</button>
                    </div>
                )
            }
            else{ // Logged in but no profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome {user.name}</p>
                        <p>You have not set up a profile, create one and get connected!</p>
                        <Link to="/createprofile" className="btn btn-lg btn-info">Create Profile</Link>
                    </div>
                )
            }
        }

        return (
        <div className="dashboard">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="display-4">Dashboard</h1>
                        {dashboardContent}
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);