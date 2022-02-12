import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';
import BurgerMenu from './BurgerMenu';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
        '&:hover': {
            cursor: 'pointer'
        }
    },
});

export default function ButtonAppBar({ loggedIn }) {
    const classes = useStyles();
    const navigate = useNavigate();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <BurgerMenu/>
                    <Typography variant="h6" className={classes.title} onClick={() => navigate('/')} id="appHeaderTitle">
                        {process.env.REACT_APP_NAME}
                    </Typography>
                    <Button color="inherit" onClick={async (e) => {
                        if (loggedIn) {
                            e.preventDefault();
                            await logout();
                            navigate('/login');
                        }
                    }}>{loggedIn ? 'Logout' : 'Login'}</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
