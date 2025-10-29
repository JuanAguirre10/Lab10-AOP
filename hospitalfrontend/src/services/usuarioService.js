import api from './api';

export const getAllUsuarios = () => api.get('/usuarios');

export const getUsuarioById = (id) => api.get(`/usuarios/${id}`);

export const createUsuario = (usuario) => {
    // Transformar datos del frontend al formato del backend
    const usuarioBackend = {
        nombreUsuario: usuario.username,
        contrasena: usuario.password,
        rol: usuario.rol,
    };
    return api.post('/usuarios', usuarioBackend);
};

export const updateUsuario = (id, usuario) => {
    // Transformar datos del frontend al formato del backend
    const usuarioBackend = {
        nombreUsuario: usuario.username,
        rol: usuario.rol,
    };
    
    // Solo incluir contraseña si se proporcionó
    if (usuario.password) {
        usuarioBackend.contrasena = usuario.password;
    }
    
    return api.put(`/usuarios/${id}`, usuarioBackend);
};

export const deleteUsuario = (id) => api.delete(`/usuarios/${id}`);