import React from 'react';
import PropTypes from 'prop-types';

const About = ({ version }) => {
    return (
        <div>
            <h1>About This App</h1>
            <p className="my-1">
                This is a full stack React app for keeping contacts
            </p>
            <p className="bg-dark p">
                    <strong>Version: </strong> {version}
            </p>
        </div>
    );
};

About.propTypes = {
    version: PropTypes.string
};

About.defaultProps = {
    version: "1.0.0"
}

export default About;
