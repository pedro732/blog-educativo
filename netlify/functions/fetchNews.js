// File: netlify/functions/fetchNews.js
const fetch = require('node-fetch');

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
    const response = await fetch(`https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apiKey}`);
    
    if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en la respuesta de la API:', errorData);
        return {
            statusCode: response.status, // Usar el código de estado de la respuesta
            body: JSON.stringify({ error: errorData.message || 'Error en la respuesta de la API' }),
        };
    }

    const data = await response.json();

    return {
        statusCode: 200,
        body: JSON.stringify(data.articles || []),
    };
} catch (error) {
    console.error('Error al buscar noticias:', error);
    return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Error al buscar noticias' }),
    };
}
};