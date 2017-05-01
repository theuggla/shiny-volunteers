import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import AddIcon from 'material-ui/svg-icons//content/add-circle-outline';

import NeedsList from '../../../components/authorized/NeedsList.jsx';
import Auth from '../../../modules/Auth';
import axios from 'axios';

class MatchPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            needs: null,
            errors: {}
        };

        this.applyForMatch = this.applyForMatch.bind(this);
    }

    componentWillMount() {
        axios({
            method: 'GET',
            url: '/volunteer/match',
            headers: {'Authorization': `bearer ${Auth.getToken()}`},
        })
            .then((response) => {
                this.setState({
                    needs: response.data.needs
                });

            })
            .catch((error) => {
                const errors = error.response ? error.response.data.errors ? error.response.data.errors : error.response.data : {summary: 'you seem to be offline'};
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
                    />) : (<CircularProgress />)
        );
    }

}


//Exports.
export default MatchPage;

