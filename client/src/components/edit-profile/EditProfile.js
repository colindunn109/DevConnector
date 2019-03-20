import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/isEmpty';



class EditProfile extends Component {

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

    componentDidMount = () => {
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps) {
            this.setState({errors: nextProps.errors});
        }

        if(nextProps.profile.profile) {
            const profile = nextProps.profile.profile;

            const skillsCSV = profile.skills.join(',');

            profile.company = !isEmpty(profile.company) ? profile.company : "";
            profile.website = !isEmpty(profile.website) ? profile.website : "";
            profile.location = !isEmpty(profile.location) ? profile.location : "";
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : "";
            profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : "";
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : "";

            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCSV,
                githubusername: profile.githubusername,
                bio: profile.bio,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
            })
        }
    }

    onSubmitHandler = (event) => {
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
        console.log("hello??")

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
                        <h1 className="display-4 text-center">Edit Profile</h1>
                        <small className="d-block pb-3">* required fields</small>

                        {/* Profile Form components*/}
                        <form onSubmit={this.onSubmitHandler}>
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

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
