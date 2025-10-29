import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    Box,
    CircularProgress,
} from '@mui/material';
import { PictureAsPdf, TableChart } from '@mui/icons-material';
import { toast } from 'react-toastify';

const ReporteCard = ({ titulo, descripcion, color, icon: Icon, onPDF, onExcel }) => {
    const [loadingPDF, setLoadingPDF] = useState(false);
    const [loadingExcel, setLoadingExcel] = useState(false);

    const descargarPDF = async () => {
        try {
            setLoadingPDF(true);
            await onPDF();
            toast.success('✅ Reporte PDF descargado correctamente');
        } catch (error) {
            console.error('Error al descargar PDF:', error);
            toast.error('❌ Error al descargar el reporte PDF');
        } finally {
            setLoadingPDF(false);
        }
    };

    const descargarExcel = async () => {
        try {
            setLoadingExcel(true);
            await onExcel();
            toast.success('✅ Reporte Excel descargado correctamente');
        } catch (error) {
            console.error('Error al descargar Excel:', error);
            toast.error('❌ Error al descargar el reporte Excel');
        } finally {
            setLoadingExcel(false);
        }
    };

    return (
        <Card 
            sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderTop: `4px solid ${color}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                }
            }}
        >
            <CardContent sx={{ flex: 1, p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box
                        sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 2,
                            bgcolor: `${color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Icon sx={{ fontSize: 32, color }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, flex: 1 }}>
                        {titulo}
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {descripcion}
                </Typography>
            </CardContent>

            <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={loadingPDF ? <CircularProgress size={20} color="inherit" /> : <PictureAsPdf />}
                    onClick={descargarPDF}
                    disabled={loadingPDF}
                    sx={{ 
                        bgcolor: '#dc3545',
                        '&:hover': { bgcolor: '#c82333' }
                    }}
                >
                    {loadingPDF ? 'Generando...' : 'Descargar PDF'}
                </Button>

                <Button
                    fullWidth
                    variant="contained"
                    startIcon={loadingExcel ? <CircularProgress size={20} color="inherit" /> : <TableChart />}
                    onClick={descargarExcel}
                    disabled={loadingExcel}
                    sx={{ 
                        bgcolor: '#28a745',
                        '&:hover': { bgcolor: '#218838' }
                    }}
                >
                    {loadingExcel ? 'Generando...' : 'Descargar Excel'}
                </Button>
            </CardActions>
        </Card>
    );
};

export default ReporteCard;