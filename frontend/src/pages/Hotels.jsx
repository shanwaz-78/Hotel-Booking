import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import axios from 'axios';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => { 
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:8118/api/hotel/get-hotels');
        if (response.data.success) {
          setHotels(response.data.hotels);
        }
      } catch (err) {
        setError(err.response?.data?.errorregister || "Failed to fetch hotels");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Available Hotels</Typography>
      <Grid container spacing={4}>
        {hotels.map((hotel) => (
          <Grid item key={hotel.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`https://source.unsplash.com/random/?hotel,${hotel.id}`}
                alt={hotel.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {hotel.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {hotel.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rooms available: {hotel.rooms.length}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button 
                    size="small" 
                    variant="contained"
                    onClick={() => navigate(`/book/${hotel.id}`)}
                  >
                    Book Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Hotels;