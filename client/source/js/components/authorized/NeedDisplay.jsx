import React from 'react';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';

import ConfirmDialog from '../ConfirmDialog.jsx';

class Need extends React.Component {
    state = {
        open: false,
    };

    constructor(props) {
        super(props);

        this.onConfirm = this.onConfirm.bind(this);
    }

    onConfirm() {
        this.props.onClick(this.props.need._id);
    }

    render() {
        return (
            this.props.clickable ? (
                    <div className="need-display">
                        <ListItem
                            primaryText={this.props.need.title}
                            leftIcon={
                                <IconButton style={{padding: '1em'}} onTouchTap={() => {
                                    this.setState({open: true});
                                }}>
                                    {this.props.icon}
                                </IconButton>
                            }
                            nestedItems={[
                                <ListItem>
                                    <p>{this.props.need.description}</p>
                                </ListItem>,
                                <ListItem
                                    primaryText='skills needed'
                                    nestedItems={this.props.need.skills.map((skill) => (
                                        <p>
                                            {skill}
                                        </p>))}
                                />
                            ]}
                        />
                        <ConfirmDialog onConfirm={this.onConfirm} open={this.state.open} text={this.props.confirmPrompt}/>
                    </div>
                ) :
                (<div className="need-display">
                    <ListItem
                        primaryTogglesNestedList={true}
                        primaryText={this.props.need.title}
                        nestedItems={[
                            <ListItem>
                                <p>{this.props.need.description}</p>
                            </ListItem>,
                            <ListItem
                                primaryText='skills needed'
                                nestedItems={this.props.need.skills.map((skill) => (
                                    <p>
                                        {skill}
                                    </p>))}
                            />
                        ]}
                    />
                </div>)
        );
    }
}


export default Need;
