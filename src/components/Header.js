import React, { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CloudIcon from '@mui/icons-material/Cloud';
import { useTranslation } from 'react-i18next';
import TranslateIcon from '@mui/icons-material/Translate';

const Header = () => {
  const [weather, setWeather] = useState(null);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const currentLang = i18n.language || 'tr';
    const newLang = currentLang === 'tr' ? 'en' : 'tr';
    i18n.changeLanguage(newLang).catch(err => console.error('Dil değiştirme hatası:', err));
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'dc24b80c66msh211254ea2ddeb6dp148629jsn97c9e085b1f8',
            'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
          }
        };

        const pointResponse = await fetch(
          'https://meteostat.p.rapidapi.com/point/hourly?lat=38.4192&lon=27.1287&start=2024-03-09&end=2024-03-09',
          options
        );
        
        if (!pointResponse.ok) {
          throw new Error(`HTTP error! status: ${pointResponse.status}`);
        }
        
        const data = await pointResponse.json();
        if (data && data.data && data.data[0]) {
          setWeather(data.data[0]);
        }
      } catch (error) {
        console.error('Hava durumu alınamadı:', error);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 1800000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (temp) => {
    if (temp < 10) return <AcUnitIcon />;
    if (temp > 25) return <WbSunnyIcon />;
    return <CloudIcon />;
  };

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/contact', label: t('nav.contact') }
  ];

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{ 
        background: 'transparent',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.03)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 4, md: 6 }, py: 1.5 }}>
        {/* Left Section: Logo */}
        <Box
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '38px',
            height: '38px',
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
            borderRadius: '10px',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '2px',
              height: '100%',
              background: 'linear-gradient(to bottom, #4F46E5, #10B981)',
              transition: 'all 0.3s ease',
            },
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)',
              transform: 'translateY(-2px)',
              '&::before': {
                width: '4px',
              },
              '& .logo-text': {
                transform: 'translateX(2px)',
                background: 'linear-gradient(45deg, #4F46E5, #10B981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }
            },
          }}
        >
          <Typography
            className="logo-text"
            sx={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#F8FAFC',
              letterSpacing: '-0.02em',
              transform: 'translateX(0)',
              transition: 'all 0.3s ease',
            }}
          >
            f
          </Typography>
        </Box>

        {/* Center Section: Navigation */}
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '30px',
            padding: '4px',
            display: 'flex',
            gap: '4px'
          }}
        >
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                minWidth: 'auto',
                px: 2.5,
                py: 1,
                color: location.pathname === item.path ? '#fff' : 'rgba(255, 255, 255, 0.6)',
                textTransform: 'lowercase',
                fontSize: '0.9rem',
                fontWeight: location.pathname === item.path ? 500 : 400,
                borderRadius: '25px',
                background: location.pathname === item.path ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)' : 'transparent',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)',
                  color: '#fff'
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Right Section: Weather and Language */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {weather && weather.temp && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
                padding: '6px 16px',
                borderRadius: '30px',
                border: '1px solid rgba(255, 255, 255, 0.03)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              <Box 
                className="weather-icon"
                sx={{ 
                  color: '#4F46E5',
                  display: 'flex',
                  alignItems: 'center',
                  '& svg': {
                    fontSize: '1.1rem'
                  }
                }}
              >
                {getWeatherIcon(weather.temp)}
              </Box>
              <Typography
                sx={{
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  letterSpacing: '0.5px',
                }}
              >
                {t('weather.izmir')} {Math.round(weather.temp)}°
              </Typography>
            </Box>
          )}

          <IconButton
            onClick={toggleLanguage}
            sx={{
              color: '#fff',
              background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.03)',
              borderRadius: '50%',
              padding: '8px',
              '&:hover': {
                background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)',
                transform: 'translateY(-2px)',
              }
            }}
          >
            <TranslateIcon sx={{ fontSize: '1.1rem' }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 