import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    emailjs.init('ipF6aclGp6BxGrKjK');
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await emailjs.send(
        'service_d5sr3b1',
        'template_t2zet8l',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        }
      );
      
      console.log('Email sent successfully:', result.text);
      setFormData({ name: '', email: '', message: '' });
      alert(t('contact.form.success'));
    } catch (error) {
      console.error('Error sending email:', error);
      alert(t('contact.form.error'));
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: <EmailIcon />, text: t('contact.info.email'), link: `mailto:${t('contact.info.email')}` },
    { icon: <PhoneIcon />, text: t('contact.info.phone'), link: `tel:${t('contact.info.phone')}` },
    { icon: <LinkedInIcon />, text: t('contact.info.linkedin'), link: `https://${t('contact.info.linkedin')}` },
    { icon: <GitHubIcon />, text: t('contact.info.github'), link: `https://${t('contact.info.github')}` }
  ];

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
        duration: 0.5
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: 12,
        pb: 6,
        background: '#111111'
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <Grid container spacing={4}>
            {/* Contact Form */}
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={0}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    p: 3,
                    borderRadius: 2
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ color: '#fff', mb: 3 }}>
                    {t('contact.title')}
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      name="name"
                      label={t('contact.form.name')}
                      value={formData.name}
                      onChange={handleChange}
                      sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          color: '#fff',
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#4F46E5',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      name="email"
                      label={t('contact.form.email')}
                      value={formData.email}
                      onChange={handleChange}
                      sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                          color: '#fff',
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#4F46E5',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      name="message"
                      label={t('contact.form.message')}
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      sx={{
                        mb: 3,
                        '& .MuiOutlinedInput-root': {
                          color: '#fff',
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                          },
                          '&:hover fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#4F46E5',
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={loading}
                      sx={{
                        background: 'linear-gradient(135deg, #4F46E5 0%, #10B981 100%)',
                        color: '#fff',
                        py: 1.5,
                        '&:hover': {
                          background: 'linear-gradient(135deg, #4338CA 0%, #059669 100%)',
                        },
                        '&.Mui-disabled': {
                          background: 'rgba(255, 255, 255, 0.12)',
                          color: 'rgba(255, 255, 255, 0.3)',
                        }
                      }}
                    >
                      {loading ? 'Gönderiliyor...' : t('contact.form.send')}
                    </Button>
                  </form>
                </Paper>
              </motion.div>
            </Grid>

            {/* Contact Info and Map */}
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={0}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    p: 3,
                    borderRadius: 2,
                    mb: 3
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {contactInfo.map((info, index) => (
                      <Box
                        key={index}
                        component="a"
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          color: '#fff',
                          textDecoration: 'none',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateX(8px)',
                            '& .icon': {
                              color: '#4F46E5',
                            },
                          },
                        }}
                      >
                        <Box
                          className="icon"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: 'rgba(255, 255, 255, 0.7)',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {info.icon}
                        </Box>
                        <Typography
                          sx={{
                            fontSize: '0.9rem',
                            color: 'rgba(255, 255, 255, 0.7)',
                            '&:hover': {
                              color: '#fff',
                            },
                          }}
                        >
                          {info.text}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>

                {/* Map Section */}
                <motion.div variants={itemVariants}>
                  <Paper
                    elevation={0}
                    sx={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      p: 3,
                      borderRadius: 2,
                      overflow: 'hidden'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: '300px',
                        overflow: 'hidden',
                        borderRadius: 1
                      }}
                    >
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200064.57246874648!2d27.155983582031247!3d38.41885080000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd862a762cacd%3A0x628cbba1a59ce8fe!2zxLB6bWly!5e0!3m2!1str!2str!4v1652900436789!5m2!1str!2str&maptype=roadmap&map_id=8f348c7f8b3f3416"
                        width="100%"
                        height="100%"
                        style={{ 
                          border: 0,
                          filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(85%)'
                        }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </Box>
                  </Paper>
                </motion.div>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Contact; 