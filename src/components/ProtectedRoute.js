import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import axios from '../api/axios';
import { isLoggedIn, logout } from '../services/auth';
import { setUser } from '../redux/User/user.actions';


const ProtectedRoute =  ({ user, setUser }) => {
    useEffect(() => {
        async function getUser() {
            try{
                const u = await axios.get('/user/me');
                setUser(u.data);
            } catch (e) {
                logout();
            }
        }
        if (!user) {
            getUser();
        }
     }, [user, setUser])

    if (!isLoggedIn()) {
        return <Navigate to='/login' />
    }
    return <Outlet />
};

const mapStateToProps = state => ({
    user: state.user.username
})

const mapDispatchToProps = dispatch => ({
    setUser: (user) => dispatch(setUser(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);