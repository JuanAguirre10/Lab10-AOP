import React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Box,
    CircularProgress,
    Typography,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const RecetaTable = ({ recetas, loading, onEdit, onDelete, consultas }) => {
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (recetas.length === 0) {
        return (
            <Paper sx={{ p: 6, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    No hay recetas registradas
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Haz clic en "Nueva Receta" para agregar una
                </Typography>
            </Paper>
        );
    }

    const getConsultaInfo = (idConsulta) => {
        const consulta = consultas.find(c => c.id === idConsulta);
        return consulta ? `Consulta ${consulta.fecha}` : idConsulta;
    };

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Consulta</TableCell>
                        <TableCell>Indicaciones</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {recetas.map((receta) => (
                        <TableRow 
                            key={receta.id}
                            sx={{ 
                                '&:hover': { 
                                    bgcolor: 'action.hover',
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            <TableCell sx={{ fontWeight: 600 }}>
                                {getConsultaInfo(receta.idConsulta)}
                            </TableCell>
                            <TableCell>{receta.indicaciones}</TableCell>
                            <TableCell align="center">
                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => onEdit(receta)}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => onDelete(receta.id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RecetaTable;