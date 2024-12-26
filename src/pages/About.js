import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  const education = [
    {
      school: "Konya Teknik Üniversitesi",
      degree: "Bilgisayar Programcılığı",
      year: "2021 - 2024"
    }
  ];

  const experience = [
    {
      company: "Sisbim Yazılım Teknolojileri",
      position: "Stajyer",
      period: "06/2023 - 09/2023"
    },
    {
      company: "Belsoft Yazılım Geliştirme Teknolojileri",
      position: "Stajyer",
      period: "06/2022 - 09/2022"
    },
    {
      company: "Acun Medya Akademi - Nişantaşı Üniversitesi",
      position: "Burslu Öğrenci",
      period: "01/2024 - 07/2024"
    }
  ];

  const skills = [
    "ASP.NET Core", "MVC", "Entity Framework", "MSSQL", "PostgreSQL", "MySQL",
    "C#", ".NET Core", "Layered Architecture", "API", "Azure", "Docker"
  ];

  const languages = [
    { language: "Türkçe", level: "Native" },
    { language: "İngilizce", level: "A2" }
  ];

  const references = [
    {
      name: "Murat Yücedağ",
      position: "Software Engineer - Trainer"
    },
    {
      name: "Gökhan Mutlay",
      position: "Acun Medya Akademi - Managing Partner"
    }
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
          {/* Education Section */}
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                background: 'rgba(255, 255, 255, 0.03)',
                p: 3,
                mb: 3,
                borderRadius: 2
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: '#fff', mb: 2 }}>
                {t('about.education.title')}
              </Typography>
              {education.map((edu, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                    {edu.school}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {edu.degree} • {edu.year}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </motion.div>

          {/* Experience Section */}
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                background: 'rgba(255, 255, 255, 0.03)',
                p: 3,
                mb: 3,
                borderRadius: 2
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: '#fff', mb: 2 }}>
                {t('about.experience.title')}
              </Typography>
              {experience.map((exp, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                    {exp.company}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {exp.position} • {exp.period}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </motion.div>

          <Grid container spacing={3}>
            {/* Skills Section */}
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={0}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    p: 3,
                    borderRadius: 2,
                    height: '100%'
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ color: '#fff', mb: 2 }}>
                    {t('about.skills.title')}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {skills.map((skill, index) => (
                      <Box
                        key={index}
                        sx={{
                          background: 'rgba(79, 70, 229, 0.1)',
                          border: '1px solid rgba(79, 70, 229, 0.2)',
                          px: 2,
                          py: 0.5,
                          borderRadius: 2,
                          fontSize: '0.9rem',
                          color: '#818CF8'
                        }}
                      >
                        {skill}
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            </Grid>

            {/* Languages Section */}
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={0}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    p: 3,
                    borderRadius: 2,
                    height: '100%'
                  }}
                >
                  <Typography variant="h6" gutterBottom sx={{ color: '#fff', mb: 2 }}>
                    {t('about.languages.title')}
                  </Typography>
                  {languages.map((lang, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                        {lang.language}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {lang.level}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              </motion.div>
            </Grid>
          </Grid>

          {/* References Section */}
          <motion.div variants={itemVariants}>
            <Paper
              elevation={0}
              sx={{
                background: 'rgba(255, 255, 255, 0.03)',
                p: 3,
                mt: 3,
                borderRadius: 2
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: '#fff', mb: 2 }}>
                {t('about.references.title')}
              </Typography>
              <Grid container spacing={2}>
                {references.map((ref, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ color: '#fff' }}>
                        {ref.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {ref.position}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About; 