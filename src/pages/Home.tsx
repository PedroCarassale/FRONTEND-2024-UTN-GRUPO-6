import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Home.css";

// Imágenes representativas para cada carta
const images = {
  crearRutina: "src/assets/crearRutinas.png", // Cambiar URL por imágenes reales
  verRutinas: "src/assets/verRutinas.png",
  gimnasios: "src/assets/gimnasio.png",
};

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        padding: "20px",
      }}
    >
      <Grid container spacing={3} maxWidth={800}>
        {[
          {
            title: "Rutinas",
            path: "/rutinas",
            image: images.verRutinas,
          },
          {
            title: "Entrenamiento",
            path: "/entrenamiento",
            image: images.crearRutina,
          },
          { title: "Gimnasios", path: "/gimnasios", image: images.gimnasios },
        ].map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: "#FFFFFF",
                color: "#333",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "15px",
                paddingTop: "50px",
                height: "250px",
                position: "relative",
                overflow: "visible",
              }}
              onClick={() => handleNavigate(card.path)}
            >
              {/* Imagen Circular */}
              <Avatar
                src={card.image}
                alt={card.title}
                sx={{
                  width: 80,
                  height: 80,
                  position: "absolute",
                  top: "-40px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  border: "4px solid #FFF",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ marginTop: 4 }}>
                  {card.title}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                >
                  Ir
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
