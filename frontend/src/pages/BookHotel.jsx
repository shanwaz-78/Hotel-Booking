import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl,
  Grid,
  Paper
} from '@mui/material';
import axios from 'axios';

const BookHotel = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`http://localhost:8118/api/hotel/book-hotel`);
        const foundHotel = response.data.hotels.find(h => h.id === parseInt(hotelId));
        if (foundHotel) {
          setHotel(foundHotel);
        } else {
          setError('Hotel not found');
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch hotel');
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [hotelId]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!hotel) return <Typography>Hotel not found</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Book {hotel.name}</Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Hotel Details</Typography>
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Select Room</InputLabel>
              <Select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
              >
                {hotel.rooms.map((room) => (
                  <MenuItem key={room.id} value={room.id}>
                    {room.type} - ${room.price} (Capacity: {room.capacity})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookHotel;
