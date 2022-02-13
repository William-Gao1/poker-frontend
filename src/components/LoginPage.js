import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LoadingButton from '@mui/lab/LoadingButton'
import PageWrapper from './PageWrapper';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { isLoggedIn, login } from '../services/auth';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    }
}));


export default function SignIn() {
    const classes = useStyles();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {state} = useLocation();
    const redirectURL = state?.from || '/';
    const navigate = useNavigate();

    if (isLoggedIn()) {
        return <Navigate to={redirectURL} />
    }

    return (
        <PageWrapper>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                        setLoading(true);
                        setError('');
                        await login(document.getElementById('email').value, document.getElementById('password').value);
                        navigate(redirectURL)
                    } catch (e) {
                        setError('Invalid email or password please try again');
                    }
                    setLoading(false)
                }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Typography color="error">
                        {error}
                    </Typography>
                    <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="loginFormSubmit"
                        loading={loading}
                    >
                        Sign In
                    </LoadingButton>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Click Here"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
        </PageWrapper>    
    );
}