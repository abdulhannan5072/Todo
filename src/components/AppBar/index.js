import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import  Button  from "@material-ui/core/Button";
import {Link } from "react-router-dom";
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function MenuAppBar(props) {
  const classes = useStyles();
  
  

  return (
    <div className={classes.root}>
      <AppBar position="static" data-test='appbar'>
        <Toolbar>
          <Typography variant="h6" className={classes.title} data-test='logo'>
            Todo App
          </Typography> 
          {
            props.signedIn?
            (
              <Button onClick={props.onLogout} className="text-white" data-test='logoutbtn' >Logout</Button>
            ):(
              <Button className="text-white" data-test='loginbtn'>
                <Link to="/login">Login</Link>
                </Button>
            )
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

MenuAppBar.propTypes = {
  signedIn: PropTypes.bool,
  onLogout: PropTypes.func
}
export default MenuAppBar;