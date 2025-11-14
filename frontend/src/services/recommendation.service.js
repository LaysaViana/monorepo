// getRecommendations.js

const getRecommendations = (
  formData = {
    selectedPreferences: [],
    selectedFeatures: [],
    mode: 'SingleProduct',
  },
  products = []
) => {
  if (!products.length) return [];

  //Calcular pontuação de cada produto
  const scoredProducts = products.map((product) => {
    let score = 0;

    // Preferências — pontuação por match
    formData.selectedPreferences.forEach((pref) => {
      if (
        product.preferences.some((p) =>
          p.toLowerCase().includes(pref.toLowerCase())
        )
      ) {
        score += 2; // peso maior para preferências
      }
    });

    // Features — pontuação por match
    formData.selectedFeatures.forEach((feat) => {
      if (
        product.features.some((f) =>
          f.toLowerCase().includes(feat.toLowerCase())
        )
      ) {
        score += 1; // peso menor
      }
    });

    return { ...product, score };
  });

  //Ordenar por score (desc), e manter o último em caso de empate
  const sorted = scoredProducts.sort((a, b) => {
    if (a.score === b.score) return 1; // mantém o último válido
    return b.score - a.score;
  });

  //Filtrar só produtos com score > 0
  const valid = sorted.filter((p) => p.score > 0);

  //Retornar conforme o modo
  if (formData.mode === 'SingleProduct') {
    return valid.length ? valid[0] : null;
  }

  return valid;
};

export default getRecommendations;
