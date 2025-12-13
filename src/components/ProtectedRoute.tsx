import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}:any) {
    const auth = useContext(AuthContext);

    if(!auth) return null;

    const {currentUser, loading} = auth;

    if(loading) return <div>Loading...</div>

    if(!currentUser){
        return <Navigate to="/login" />
    }
  return children;
}
