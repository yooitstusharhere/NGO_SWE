import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#009688',
        light: '#4DB6AC',
        dark: '#00695C',
        contrastText: '#fff',
      },
      secondary: {
        main: '#FF6F00',
        light: '#FFA040',
        dark: '#C43E00',
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#F5F7FA',
        paper: mode === 'dark' ? '#1E1E1E' : '#FFFFFF',
      },
      success: { main: '#43A047' },
      warning: { main: '#FB8C00' },
      error: { main: '#E53935' },
      info: { main: '#039BE5' },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: { fontWeight: 700 },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 600 },
      subtitle1: { fontWeight: 500 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow:
              mode === 'dark'
                ? '0 2px 12px rgba(0,0,0,0.4)'
                : '0 2px 12px rgba(0,0,0,0.08)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow:
                mode === 'dark'
                  ? '0 6px 20px rgba(0,0,0,0.5)'
                  : '0 6px 20px rgba(0,0,0,0.12)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 10, padding: '10px 24px' },
          containedPrimary: {
            background: 'linear-gradient(135deg, #009688 0%, #00796B 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #00796B 0%, #004D40 100%)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });
