import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const defaultUser = {
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    phone: '+91 98765 43210',
    pan: 'ABCPS1234F',
    address: '123 MG Road, Bangalore, Karnataka 560001',
    avatar: '',
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('donor'); // 'donor' | 'admin'

    const login = (_email, _password) => {
        setUser(defaultUser);
        return true;
    };

    const register = (data) => {
        setUser({ ...defaultUser, ...data });
        return true;
    };

    const logout = () => {
        setUser(null);
    };

    const switchRole = () => {
        setRole((prev) => (prev === 'donor' ? 'admin' : 'donor'));
    };

    const updateProfile = (data) => {
        setUser((prev) => ({ ...prev, ...data }));
    };

    return (
        <AuthContext.Provider
            value={{ user, role, login, register, logout, switchRole, updateProfile }}
        >
            {children}
        </AuthContext.Provider>
    );
}
