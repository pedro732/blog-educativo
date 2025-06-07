const axios = require('axios');

exports.handler = async (event, context) => {
  const apiKey = process.env.NEWS_API_KEY;
  const { queryStringParameters } = event;
  const searchTerm = queryStringParameters.q;

  if (!searchTerm) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Falta el término de búsqueda' }),
    };
  }

  try {
    const options = {
      method: 'GET',
      url: 'https://api.apitube.io/v1/news/everything',
      params: {
        per_page: '50',
        api_key: apiKey, // Usar la API Key desde las variables de entorno
        q: searchTerm, // Incluir el término de búsqueda
      },
    };

    const response = await axios.request(options);

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.articles || []),
    };
  } catch (error) {
    console.error('Error al buscar noticias:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al buscar noticias' }),
    };
  }
};