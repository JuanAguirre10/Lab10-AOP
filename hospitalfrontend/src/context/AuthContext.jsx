import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                localStorage.removeItem('user');
            }
        }
    }, []);

    const login = async (username, password) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/usuarios/login', {
                nombreUsuario: username,
                contrasena: password
            });
            
            const userData = {
                id: response.data.id,
                username: response.data.nombreUsuario,
                rol: response.data.rol
            };
            
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return { 
                success: false, 
                error: error.response?.data?.error || 'Credenciales incorrectas'
            };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);