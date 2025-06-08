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
      url: 'https://api.mediastack.com/v1/news',
      params: {
        access_key: apiKey,
        keywords: searchTerm,
        languages: 'es', // Puedes ajustar esto según tus necesidades
        limit: 10,
      },
    };

    const response = await axios.request(options);

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.data || []),
    };
  } catch (error) {
    console.error('Error al buscar noticias:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al buscar noticias' }),
    };
  }
};
