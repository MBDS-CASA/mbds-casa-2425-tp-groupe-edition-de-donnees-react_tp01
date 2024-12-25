import React, { useState } from 'react';
import { Container, CssBaseline, Box, ThemeProvider, createTheme, Typography } from '@mui/material';
import './App.css';
import Header from './components/Header';
import MainContent from './components/MainContent';
import RandomItem from './components/RandomItem';
import Footer from './components/Footer';
import Notes from './components/Notes';
import Etudiants from './components/Etudiants';
import Matieres from './components/Matieres';
import APropos from './components/APropos';
import Menu from './components/Menu';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea',
    },
    secondary: {
      main: '#03dac6',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Quicksand, Roboto, sans-serif',
  },
});



function App() {
  const [selectedMenu, setSelectedMenu] = useState('');

  const renderContent = () => {
    console.log(selectedMenu);
    switch (selectedMenu) {
      case 'Notes':
        return <Notes />;
      case 'Etudiants':
        return <Etudiants />;
      case 'Matières':
        return <Matieres />;
      case 'A propos':
        return <APropos />;
      default:
        return <Typography variant="h6">Selectionner un menu</Typography>;
    }
  };



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box mb={4}>
        <Header />
      </Box>
      <Box mb={4}>
        <Menu selected={selectedMenu} onMenuClick={setSelectedMenu} />
      </Box>
      <Container>
        <Box mb={4} p={2}>
          {renderContent()}
        </Box>
        <Box mb={4}>
          <MainContent />
        </Box>

        <Box mt={4}>
          <Footer />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;