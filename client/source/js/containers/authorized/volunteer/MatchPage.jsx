import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import NeedsList from '../../../components/authorized/NeedsList.jsx';
import Auth from '../../../modules/Auth';
import axios from 'axios';

class OurNeedsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            needs: null,
        };
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

    applyForMatch() {
        axios({
            method: 'POST',
            url: '/volunteer/apply',
            headers: {'Authorization': `bearer ${Auth.getToken()}`},
        })
            .then((response) => {
                console.log(response);
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
                               onNeedClick={this.applyForMatch}
                    />) : (<CircularProgress />)
        );
    }

}


//Exports.
export default OurNeedsPage;

