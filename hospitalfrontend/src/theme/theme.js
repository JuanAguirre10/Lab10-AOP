import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#2563eb',
            light: '#3b82f6',
            dark: '#1e40af',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#10b981',
            light: '#34d399',
            dark: '#059669',
            contrastText: '#ffffff',
        },
        error: {
            main: '#ef4444',
            light: '#f87171',
            dark: '#dc2626',
        },
        warning: {
            main: '#f59e0b',
            light: '#fbbf24',
            dark: '#d97706',
        },
        info: {
            main: '#3b82f6',
            light: '#60a5fa',
            dark: '#2563eb',
        },
        success: {
            main: '#10b981',
            light: '#34d399',
            dark: '#059669',
        },
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
        },
        text: {
            primary: '#1e293b',
            secondary: '#64748b',
        },
        grey: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '3rem',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontSize: '2.25rem',
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontSize: '1.875rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: 1.4,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
            lineHeight: 1.5,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 1.6,
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 500,
            lineHeight: 1.5,
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 500,
            lineHeight: 1.57,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.43,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',
        },
    },
    shape: {
        borderRadius: 12,
    },
    shadows: [
        'none',
        '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
        '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)',
        '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
        '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
        '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
        '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)',
        '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
        '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
        '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
        '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)',
        '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
        '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
        '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
        '0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)',
        '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
        '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
        '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
    ],
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarColor: '#cbd5e1 #f1f5f9',
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        width: 8,
                        height: 8,
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: 8,
                        backgroundColor: '#cbd5e1',
                        minHeight: 24,
                    },
                    '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
                        backgroundColor: '#94a3b8',
                    },
                    '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
                        backgroundColor: '#94a3b8',
                    },
                    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#94a3b8',
                    },
                    '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
                        backgroundColor: '#f1f5f9',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    padding: '10px 24px',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: 'none',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0px 4px 12px rgba(37, 99, 235, 0.3)',
                    },
                },
                contained: {
                    '&:hover': {
                        boxShadow: '0px 6px 16px rgba(37, 99, 235, 0.4)',
                    },
                },
                outlined: {
                    borderWidth: 2,
                    '&:hover': {
                        borderWidth: 2,
                    },
                },
                sizeLarge: {
                    padding: '12px 28px',
                    fontSize: '1rem',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.3s ease-in-out',
                    border: '1px solid #f1f5f9',
                    '&:hover': {
                        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
                        transform: 'translateY(-4px)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
                elevation1: {
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.06)',
                },
                elevation2: {
                    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 10,
                        backgroundColor: '#ffffff',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            backgroundColor: '#f8fafc',
                        },
                        '&.Mui-focused': {
                            backgroundColor: '#ffffff',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderWidth: 2,
                            },
                        },
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    fontWeight: 700,
                    backgroundColor: '#f8fafc',
                    color: '#1e293b',
                    borderBottom: '2px solid #e2e8f0',
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                },
                root: {
                    borderBottom: '1px solid #f1f5f9',
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    borderRight: 'none',
                    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.04)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.06)',
                },
            },
        },
    },
});

export default theme;