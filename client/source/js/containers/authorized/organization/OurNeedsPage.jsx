import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import RemoveIcon from 'material-ui/svg-icons//content/clear';

import NeedsList from '../../../components/authorized/NeedsList.jsx';
import Auth from '../../../modules/Auth';
import axios from 'axios';

class OurNeedsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            needs: null,
        };

        this.removeNeed = this.removeNeed.bind(this);
    }

    componentWillMount() {
        axios({
            method: 'GET',
            url: '/organization/needs',
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

    removeNeed(id) {
        axios({
            method: 'DELETE',
            url: '/organization/needs',
            headers: {'Authorization': `bearer ${Auth.getToken()}`},
            data: {
                id: id,
            }
        })
            .then((response) => {
                this.props.history.push('/organization/needs');
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
                               onClick={this.removeNeed}
                               confirmPrompt="confirming will delete the need permanently."
                               icon={<RemoveIcon />}
                    />) : (<CircularProgress />)
        );
    }

}


//Exports.
export default OurNeedsPage;

