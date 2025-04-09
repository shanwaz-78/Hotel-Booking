import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Register from './pages/Register';
import Hotels from './pages/Hotels';
import BookHotel from './pages/BookHotel';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/book/:hotelId" element={<BookHotel />} />
          <Route path="/" element={<Hotels />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;