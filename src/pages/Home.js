import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const canvasRef = useRef(null);
  const { t } = useTranslation();
  const [mediumPosts, setMediumPosts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchMediumPosts = async () => {
      try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@furkanhilaloglu');
        const data = await response.json();
        if (data.items) {
          setMediumPosts(data.items);
        }
      } catch (error) {
        console.error('Medium posts fetch error:', error);
      }
    };

    fetchMediumPosts();
  }, []);

  useEffect(() => {
    if (mediumPosts.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % mediumPosts.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [mediumPosts]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Canvas boyutlarını ayarla
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Matrix karakterleri
    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    let frameCount = 0;

    // Animasyon fonksiyonu
    const draw = () => {
      frameCount++;
      
      // Her 8 frame'de bir güncelle (yavaşlatma)
      if (frameCount % 8 === 0) {
        ctx.fillStyle = 'rgba(17, 17, 17, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#4F46E5';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          // Her sütun için farklı hız
          if (frameCount % (16 + (i % 8)) === 0) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
              drops[i] = 0;
            }
            drops[i]++;
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mediumPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mediumPosts.length) % mediumPosts.length);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        pt: 8,
        background: '#111111',
        '@keyframes matrixRain': {
          '0%': {
            transform: 'translateY(-50%)'
          },
          '100%': {
            transform: 'translateY(50%)'
          }
        }
      }}
    >
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="matrix">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01"
              numOctaves="3"
              seed="1"
            />
            <feDisplacementMap
              in="SourceGraphic"
              scale="10"
            />
          </filter>
        </defs>
      </svg>

      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.3,
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div variants={itemVariants}>
                <Typography variant="h1" gutterBottom>
                  {t('home.welcome')}
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography variant="h4" gutterBottom>
                  {t('home.intro')}
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography variant="h6" gutterBottom>
                  {t('home.title')}
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography variant="body1" paragraph>
                  {t('home.description')}
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Box sx={{ display: 'flex', gap: 2, mb: 6 }}>
                  <Button
                    component={Link}
                    to="/about"
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                  >
                    {t('home.about.button')}
                  </Button>
                  <Button
                    component={Link}
                    to="/contact"
                    variant="outlined"
                  >
                    {t('home.contact.button')}
                  </Button>
                  <Button
                    component="a"
                    href="furkan_hilaloglu_CV.pdf"
                    download="furkan_cv.pdf"
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(135deg, #4F46E5 0%, #10B981 100%)',
                      color: '#fff',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #4338CA 0%, #059669 100%)',
                      }
                    }}
                  >
                    {t('home.cv.download')}
                  </Button>
                </Box>
              </motion.div>
            </Grid>

            {/* Medium Posts Carousel */}
            <Grid item xs={12} md={5}>
              <motion.div variants={itemVariants}>
                <Box
                  sx={{
                    position: 'relative',
                    background: 'rgba(255, 255, 255, 0.01)',
                    borderRadius: 2,
                    p: 3,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -50,
                      left: -50,
                      right: -50,
                      bottom: -50,
                      background: 'linear-gradient(rgba(79, 70, 229, 0.1), transparent)',
                      filter: 'url(#matrix)',
                      opacity: 0.3,
                      animation: 'matrixRain 20s linear infinite',
                      pointerEvents: 'none',
                      zIndex: 0
                    }
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        color: '#fff',
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        '&::before': {
                          content: '""',
                          width: 4,
                          height: 24,
                          background: 'linear-gradient(180deg, #4F46E5 0%, #10B981 100%)',
                          borderRadius: 4,
                          display: 'block'
                        }
                      }}
                    >
                      {t('home.blog.title')}
                    </Typography>
                    
                    {mediumPosts.length > 0 && (
                      <Box sx={{ position: 'relative' }}>
                        <motion.div
                          key={currentSlide}
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Box
                            sx={{
                              minHeight: '150px',
                              background: 'rgba(17, 17, 17, 0.8)',
                              borderRadius: 2,
                              p: 2.5,
                              position: 'relative',
                              overflow: 'hidden',
                              backdropFilter: 'blur(10px)',
                              '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '100%',
                                background: 'linear-gradient(180deg, rgba(79, 70, 229, 0.1) 0%, transparent 100%)',
                                opacity: 0,
                                transition: 'opacity 0.3s ease',
                              },
                              '&:hover': {
                                '&::before': {
                                  opacity: 1
                                }
                              }
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                color: '#fff',
                                mb: 1.5,
                                fontSize: '1rem',
                                fontWeight: 500,
                                lineHeight: 1.4
                              }}
                            >
                              {mediumPosts[currentSlide].title}
                            </Typography>
                            <Typography
                              sx={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                mb: 1.5,
                                fontSize: '0.85rem',
                                lineHeight: 1.5,
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                              }}
                            >
                              {mediumPosts[currentSlide].description.replace(/<[^>]*>/g, '')}
                            </Typography>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                              }}
                            >
                              <Button
                                component="a"
                                href={mediumPosts[currentSlide].link}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="contained"
                                endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                                sx={{
                                  background: 'linear-gradient(135deg, #4F46E5 0%, #10B981 100%)',
                                  color: '#fff',
                                  textTransform: 'none',
                                  fontSize: '0.85rem',
                                  py: 0.75,
                                  px: 2,
                                  minWidth: 'auto',
                                  borderRadius: 1.5,
                                  '&:hover': {
                                    background: 'linear-gradient(135deg, #4338CA 0%, #059669 100%)',
                                    transform: 'translateX(4px)'
                                  }
                                }}
                              >
                                {t('home.blog.readMore')}
                              </Button>
                              <Typography
                                sx={{
                                  color: 'rgba(255, 255, 255, 0.5)',
                                  fontSize: '0.8rem'
                                }}
                              >
                                {new Date(mediumPosts[currentSlide].pubDate).toLocaleDateString('tr-TR', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </Typography>
                            </Box>
                          </Box>
                        </motion.div>

                        {/* Progress Indicator with Matrix Background */}
                        <Box
                          sx={{
                            position: 'relative',
                            mt: 3,
                            p: 2,
                            borderRadius: 2,
                            background: 'rgba(17, 17, 17, 0.8)',
                            backdropFilter: 'blur(10px)',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: -20,
                              left: -20,
                              right: -20,
                              bottom: -20,
                              background: 'linear-gradient(rgba(79, 70, 229, 0.1), transparent)',
                              filter: 'url(#matrix)',
                              opacity: 0.3,
                              animation: 'matrixRain 20s linear infinite',
                              pointerEvents: 'none'
                            }
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              gap: 1,
                              position: 'relative',
                              zIndex: 1
                            }}
                          >
                            {mediumPosts.map((_, index) => (
                              <Box
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                sx={{
                                  width: 24,
                                  height: 3,
                                  borderRadius: 4,
                                  background: index === currentSlide 
                                    ? 'linear-gradient(90deg, #4F46E5 0%, #10B981 100%)'
                                    : 'rgba(255, 255, 255, 0.2)',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    background: index === currentSlide
                                      ? 'linear-gradient(90deg, #4F46E5 0%, #10B981 100%)'
                                      : 'rgba(255, 255, 255, 0.3)'
                                  }
                                }}
                              />
                            ))}
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home; 