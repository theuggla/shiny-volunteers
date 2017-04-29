import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const NeedsList = ({needs, onNeedClick}) => (
        <div className="needs-list">
            <List>
                <Subheader>Matches</Subheader>
                {needs.map( (row) => (
                    <div style={{textAlign: 'left'}}>
                    <ListItem
                        leftAvatar={
                            <FloatingActionButton
                                mini={true}
                                onTouchTap={onNeedClick}
                            >
                            <ContentAdd />
                            </FloatingActionButton>
                        }
                        key={row._id}
                        primaryText={row.title}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                            <ListItem
                                primaryText={row.description}
                            />,
                            <ListItem
                                primaryText='skills needed'
                                nestedItems={row.skills.map((skill) => (
                                    <ListItem
                                        primaryText={skill}
                                    />))}
                                />
                        ]}
                    />
                    </div>
                ))}
            </List>
        </div>
    );

export default NeedsList;
