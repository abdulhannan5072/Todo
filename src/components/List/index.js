import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

export default function MList(props) {
    return (
        <div>
            <List >
                <ListItem button>
                  <ListItemText
                    primary={props.text}
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={props.onDelete} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton  onClick={props.onEdit} edge="end" aria-label="delete">
                      <EditIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
            </List>
        </div>
    )
}
