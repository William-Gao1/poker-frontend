import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { isLoggedIn, createUser } from '../services/auth';
import PageWrapper from './PageWrapper';
import { LoadingButton } from '@mui/lab';

const theme = createTheme();

export default function SignUp() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { state } = useLocation();
    const redirectURL = state?.from || '/';
    const navigate = useNavigate();

    if (isLoggedIn()) {
        return <Navigate to={redirectURL} />
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            setLoading(true);
            setError('');
            await createUser(data.get('userName'), data.get('email'), data.get('password'));
            navigate(redirectURL)
        } catch (e) {
            setError(e.response.data.message);
            setLoading(false)
        }
    };

    return (
        <PageWrapper>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="username"
                                        name="userName"
                                        required
                                        fullWidth
                                        id="userName"
                                        label="User Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                            </Grid>
                            <Typography color="error">
                                {error}
                            </Typography>
                            <LoadingButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                loading={loading}
                            >
                                Sign Up
                            </LoadingButton>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link variant="body2" onClick={() => navigate('/login')} style={{ cursor: 'pointer' }}>
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </PageWrapper>
    );
}