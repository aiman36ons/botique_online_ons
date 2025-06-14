import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Paper,
  Box,
  useTheme
} from '@mui/material';

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        {t('profile.title')}
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography variant="body1">
          {t('profile.comingSoon')}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Profile; 