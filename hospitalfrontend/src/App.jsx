import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Páginas
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PacientesPage from './pages/PacientesPage';
import MedicosPage from './pages/MedicosPage';
import CitasPage from './pages/CitasPage';
import ConsultasPage from './pages/ConsultasPage';
import HospitalizacionPage from './pages/HospitalizacionPage';
import HabitacionesPage from './pages/HabitacionesPage';
import FacturacionPage from './pages/FacturacionPage';
import DiagnosticosPage from './pages/DiagnosticosPage';
import UsuariosPage from './pages/UsuariosPage';
import AuditoriaPage from './pages/AuditoriaPage';
import ReportesPage from './pages/ReportesPage';
import NotFound from './pages/NotFound';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Ruta pública - Login */}
                    <Route path="/login" element={<Login />} />

                    {/* Redirección de raíz a dashboard */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />

                    {/* Rutas protegidas */}
                    <Route path="/dashboard" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } />

                    <Route path="/pacientes" element={
                        <PrivateRoute>
                            <PacientesPage />
                        </PrivateRoute>
                    } />

                    <Route path="/medicos" element={
                        <PrivateRoute>
                            <MedicosPage />
                        </PrivateRoute>
                    } />

                    <Route path="/citas" element={
                        <PrivateRoute>
                            <CitasPage />
                        </PrivateRoute>
                    } />

                    <Route path="/consultas" element={
                        <PrivateRoute>
                            <ConsultasPage />
                        </PrivateRoute>
                    } />

                    <Route path="/hospitalizacion" element={
                        <PrivateRoute>
                            <HospitalizacionPage />
                        </PrivateRoute>
                    } />

                    <Route path="/habitaciones" element={
                        <PrivateRoute>
                            <HabitacionesPage />
                        </PrivateRoute>
                    } />

                    <Route path="/facturacion" element={
                        <PrivateRoute>
                            <FacturacionPage />
                        </PrivateRoute>
                    } />

                    <Route path="/diagnosticos" element={
                        <PrivateRoute>
                            <DiagnosticosPage />
                        </PrivateRoute>
                    } />

                    <Route path="/usuarios" element={
                        <PrivateRoute>
                            <UsuariosPage />
                        </PrivateRoute>
                    } />

                    {/* 🆕 NUEVAS RUTAS DEL LAB 10 */}
                    <Route path="/auditoria" element={
                        <PrivateRoute>
                            <AuditoriaPage />
                        </PrivateRoute>
                    } />

                    <Route path="/reportes" element={
                        <PrivateRoute>
                            <ReportesPage />
                        </PrivateRoute>
                    } />

                    {/* Ruta 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>

                {/* Toast notifications */}
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;