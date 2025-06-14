import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Link,
  Box,
  useTheme
} from '@mui/material';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement login functionality
    console.log('Login:', { email, password });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {t('auth.login')}
      </Typography>
      <Paper sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label={t('auth.email')}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label={t('auth.password')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            {t('auth.login')}
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Link component={RouterLink} to="/register">
              {t('auth.noAccount')}
            </Link>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login; 