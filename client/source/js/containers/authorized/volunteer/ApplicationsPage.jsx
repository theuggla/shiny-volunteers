import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

import axios from 'axios';

import NeedsList from '../../../components/authorized/NeedsList.jsx';
import Auth from '../../../modules/Auth';

let styles = {
    snackbarBodyStyle: {
        height: 'auto',
        lineHeight: '1.8em'
    },
    loadcontainerStyles: {
        textAlign: 'center'
    }
};

class ApplicationsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            applications: null,
            offlinePopup: false,
            errors: {}
        };
    }

    componentWillMount() {
        let responseTimeout = setTimeout(() => {
            this.setState({offlinePopup: true});
        }, 5000);

        axios({
            method: 'GET',
            url: '/volunteer/applications',
            headers: {'Authorization': `bearer ${Auth.getToken()}`},
        })
            .then((response) => {
                clearTimeout(responseTimeout);

                this.setState({
                    offlinePopup: false,
                    applications: response.data.applications
                });
            })
            .catch((error) => {
                const errors = error.response ? error.response.data.errors ? error.response.data.errors : error.response.data : {summary: 'are you offline?'};
                this.setState({
                    errors: errors
                });
            });
    }

    render() {
        return (
            this.state.applications ? (
                    <NeedsList
                        needs={this.state.applications}
                        clickable={false}
                    />) : (
                    <div style={styles.loadcontainerStyles}>
                        <CircularProgress />
                        <Snackbar
                            message={"we seem to not be getting a response. " + this.state.errors.summary}
                            open={this.state.offlinePopup}
                            bodyStyle={styles.snackbarBodyStyle}
                        />
                    </div>
                )
        );
    }

}


//Exports.
export default ApplicationsPage;


