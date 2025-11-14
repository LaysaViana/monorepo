import { Grid, Box, Typography, Button, useTheme } from '@mui/material';
import { Preferences, Features, RecommendationType } from './Fields';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';

function Form({ onFormSubmit }) {
  const theme = useTheme();
  const { preferences, features } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '', // começar vazio para forçar seleção
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      selectedPreferences: formData.selectedPreferences,
      selectedFeatures: formData.selectedFeatures,
      mode:
        formData.selectedRecommendationType === 'MultipleProducts'
          ? 'MultipleProducts'
          : formData.selectedRecommendationType === 'SingleProduct'
          ? 'SingleProduct'
          : null,
    };
    if (onFormSubmit) onFormSubmit(formattedData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
        boxShadow:
          theme.palette.mode === 'light'
            ? '0 4px 12px rgba(0, 0, 0, 0.08)'
            : '0 4px 12px rgba(0, 0, 0, 0.4)',
      }}
    >
      <Typography
        variant="h6"
        sx={{ color: theme.palette.primary.main, mb: 1, fontWeight: 'bold' }}
      >
        Escolha suas preferências
      </Typography>

      <Grid container spacing={12}>
        <Grid item xs={12} md={6}>
          <Preferences
            preferences={preferences}
            onPreferenceChange={(selected) =>
              handleChange('selectedPreferences', selected)
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Features
            features={features}
            onFeatureChange={(selected) =>
              handleChange('selectedFeatures', selected)
            }
          />
        </Grid>
      </Grid>

      <RecommendationType
        onRecommendationTypeChange={(selected) =>
          handleChange('selectedRecommendationType', selected)
        }
      />

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          color="secondary"
          sx={{
            px: { xs: 3, md: 5 },
            py: 1.5,
            fontWeight: 600,
            borderRadius: 2,
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor:
                theme.palette.mode === 'light'
                  ? theme.palette.primary.dark
                  : theme.palette.primary.light,
            },
          }}
        >
          Obter recomendação
        </Button>
      </Box>
    </Box>
  );
}

export default Form;
