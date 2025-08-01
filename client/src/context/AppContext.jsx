import { createContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

export const AppContextProvider = (props) =>{

    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const getAuthState = async () =>{
        try {
            const {data} = await axios.get(backendUrl + '/api/auth/is-auth')
            if(data.sucess){
                setIsLoggedin(true)
                getUserData();
            }
        }catch (error) {
            console.log('Not authenticated:', error.message)
        }
    }

    const getUserData = async () =>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/data')
            if(data.sucess){
                setUserData(data.user)
            } else {
                toast.error(data.message || 'Failed to get user data')
            }
        }catch (error) {
            toast.error(error.message)
        }
    }
    
    useEffect(() =>{
        getAuthState();
    }, [])
    
    const value = {
            backendUrl,
            isLoggedin, setIsLoggedin,
            userData, setUserData, getUserData
        }
    return (
        <AppContext.Provider value={value}>
                {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;
