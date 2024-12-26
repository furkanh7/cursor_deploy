import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, CardActions, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

const projects = [
  {
    title: 'E-ticaret Platformu',
    description: 'React ve Node.js kullanılarak geliştirilmiş modern bir e-ticaret platformu.',
    image: 'https://source.unsplash.com/random/400x300?website',
    github: '#',
    demo: '#',
    tech: ['React', 'Node.js', 'MongoDB', 'Express']
  },
  {
    title: 'Sosyal Medya Uygulaması',
    description: 'MERN stack ile geliştirilmiş, gerçek zamanlı mesajlaşma özellikli sosyal platform.',
    image: 'https://source.unsplash.com/random/400x300?social',
    github: '#',
    demo: '#',
    tech: ['React', 'Node.js', 'Socket.io', 'MongoDB']
  },
  {
    title: 'Portfolio Sitesi',
    description: 'React ve Material UI kullanılarak geliştirilmiş kişisel portfolio sitesi.',
    image: 'https://source.unsplash.com/random/400x300?portfolio',
    github: '#',
    demo: '#',
    tech: ['React', 'Material UI', 'Framer Motion']
  }
];

const Projects = () => {
  return (
    <Container>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          mb: 4,
          background: 'linear-gradient(45deg, #90caf9 30%, #ce93d8 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Projeler
      </Typography>

      <Grid container spacing={4}>
        {projects.map((project, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  transition: 'transform 0.3s ease-in-out',
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={project.image}
                alt={project.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom component="div">
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {project.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {project.tech.map((tech, i) => (
                    <Typography
                      key={i}
                      component="span"
                      variant="body2"
                      sx={{
                        mr: 1,
                        mb: 1,
                        display: 'inline-block',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: 'rgba(144, 202, 249, 0.1)',
                        color: 'primary.main',
                      }}
                    >
                      {tech}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<GitHubIcon />}
                  href={project.github}
                  target="_blank"
                >
                  GitHub
                </Button>
                <Button
                  size="small"
                  startIcon={<LaunchIcon />}
                  href={project.demo}
                  target="_blank"
                >
                  Demo
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Projects; 