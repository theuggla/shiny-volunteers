import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import AddIcon from 'material-ui/svg-icons//content/add-circle-outline';
import Snackbar from 'material-ui/Snackbar';

import NeedsList from '../../../components/authorized/NeedsList.jsx';
import Auth from '../../../modules/Auth';
import axios from 'axios';

let styles = {
    snackbarBodyStyle: {
        height: 'auto',
        lineHeight: '1.8em'
    },
    loadcontainerStyles: {
        textAlign: 'center'
    }
};

class MatchPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            needs: null,
            offlinePopup: false,
            errors: {}
        };

        this.applyForMatch = this.applyForMatch.bind(this);
    }

    componentWillMount() {
        let responseTimeout = setTimeout(() => {
            this.setState({offlinePopup: true});
        }, 5000);

        axios({
            method: 'GET',
            url: '/volunteer/match',
            headers: {'Authorization': `bearer ${Auth.getToken()}`},
        })
            .then((response) => {
            clearTimeout(responseTimeout);

                this.setState({
                    offlinePopup: false,
                    needs: response.data.needs
                });

            })
            .catch((error) => {
                const errors = error.response ? error.response.data.errors ? error.response.data.errors : error.response.data : {summary: 'are you offline?'};
                this.setState({
                    errors: errors
                });
            });

    }

    applyForMatch(id) {
            axios({
                method: 'POST',
                url: '/volunteer/applications',
                headers: {'Authorization': `bearer ${Auth.getToken()}`},
                data: {
                    id: id,
                }
            })
                .then((response) => {
                    this.props.history.push('/volunteer/applications');
                })
                .catch((error) => {
                    console.log(error);
                });
    }

    render() {
        return (
            this.state.needs ? (
                    <NeedsList className="needs-page"
                               needs={this.state.needs}
                               clickable={true}
                               onClick={this.applyForMatch}
                               confirmPrompt="your information will be sent out to the organization."
                               icon={<AddIcon />}
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
export default MatchPage;

