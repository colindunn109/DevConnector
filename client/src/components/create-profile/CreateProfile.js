import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';



class CreateProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayeSocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            instagram: '',
            linkedin: '',
            youtube: '',
            errors: {}
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps) {
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit = (event) => {
        event.preventDefault();

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin
        }

        this.props.createProfile(profileData, this.props.history);
        
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {

        const errors = this.state.errors;
        const displayeSocialInputs = this.state.displayeSocialInputs;

        let socialInputs;

        if(displayeSocialInputs){
            socialInputs = (
                <div>
                    <InputGroup 
                        placeholder="LinkedIn Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />
                    <InputGroup 
                        placeholder="Facebook Profile URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />
                </div>
            )
        }

        const options = [
            { label: '* Select Profesional Status', value: 0 },
            { label: 'Developer', value: 'Developer' },
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student', value: 'Student' },
            { label: 'Instructor', value: 'Instructor' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Other', value: 'Other' },
        ];

        return (
        <div className="create-profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Create Your Profile</h1>
                        <p className="lead text-center">Information to make your profile stand out!</p>
                        <small className="d-block pb-3">* required fields</small>

                        {/* Profile Form components*/}
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup 
                                placeholder="* Profile Handle"
                                name="handle"
                                value={this.state.handle}
                                onChange={this.onChange}
                                error={errors.handle}
                                info="A unique handle for your profile URL"
                            />
                            <SelectListGroup 
                                placeholder="Status"
                                name="status"
                                value={this.state.status}
                                onChange={this.onChange}
                                error={errors.status}
                                options={options}
                                info="Where you are at in your career"
                            />
                            <TextFieldGroup 
                                placeholder="Company"
                                name="company"
                                value={this.state.company}
                                onChange={this.onChange}
                                error={errors.company}
                                info=""
                            />
                            <TextFieldGroup 
                                placeholder="Website"
                                name="website"
                                value={this.state.website}
                                onChange={this.onChange}
                                error={errors.website}
                            />
                            <TextFieldGroup 
                                placeholder="Location"
                                name="location"
                                value={this.state.location}
                                onChange={this.onChange}
                                error={errors.location}
                            />
                            <TextFieldGroup 
                                placeholder="* Skills"
                                name="skills"
                                value={this.state.skills}
                                onChange={this.onChange}
                                error={errors.skills}
                                info="Please use comma separated values IE. HTML,CSS,Javascript,React"
                            />
                            <TextFieldGroup 
                                placeholder="Github Username"
                                name="githubusername"
                                value={this.state.githubusername}
                                onChange={this.onChange}
                                error={errors.githubusername}
                                info="Will pull your latest github projects"
                            />
                            <TextAreaFieldGroup 
                                placeholder="Bio"
                                name="bio"
                                value={this.state.bio}
                                onChange={this.onChange}
                                error={errors.bio}
                            />
                            <div className="mb-3">
                                <button type="button" className="btn btn-light" 
                                onClick={() => {
                                    this.setState(prevState => ({
                                        displayeSocialInputs: !prevState.displayeSocialInputs
                                    }))
                                }}>
                                    Add Social Network Links
                                </button>
                            </div>
                            {socialInputs}
                            <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />

                        </form>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));