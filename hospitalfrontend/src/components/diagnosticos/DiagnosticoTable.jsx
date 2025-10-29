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
    Chip,
    Box,
    CircularProgress,
    Typography,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const getTipoColor = (tipo) => {
    switch (tipo?.toLowerCase()) {
        case 'principal':
            return 'error';
        case 'secundario':
            return 'warning';
        case 'diferencial':
            return 'info';
        default:
            return 'default';
    }
};

const DiagnosticoTable = ({ diagnosticos, loading, onEdit, onDelete, consultas }) => {
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (diagnosticos.length === 0) {
        return (
            <Paper sx={{ p: 6, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    No hay diagnósticos registrados
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Haz clic en "Nuevo Diagnóstico" para agregar uno
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
                        <TableCell>Descripción</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {diagnosticos.map((diagnostico) => (
                        <TableRow 
                            key={diagnostico.id}
                            sx={{ 
                                '&:hover': { 
                                    bgcolor: 'action.hover',
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            <TableCell>{getConsultaInfo(diagnostico.idConsulta)}</TableCell>
                            <TableCell>{diagnostico.descripcion}</TableCell>
                            <TableCell>
                                <Chip
                                    label={diagnostico.tipo}
                                    color={getTipoColor(diagnostico.tipo)}
                                    size="small"
                                    sx={{ fontWeight: 600, textTransform: 'capitalize' }}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => onEdit(diagnostico)}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => onDelete(diagnostico.id)}
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

export default DiagnosticoTable;