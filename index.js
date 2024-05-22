// import axios from 'axios';
// import Chart from 'chart.js/auto';

const apikey = '10D7326F-19E4-4DF1-8037-EE9F7603DBB5';
let chart = null; // Variable para almacenar la instancia del gráfico

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('search-button').addEventListener('click', () => {
    // const quoteCurrency = 'mxn';
    const quoteCurrency = document.getElementById('quote-currency').value;
    // const baseCurrency = 'usd';
    const baseCurrency = document.getElementById('base-currency').value;
    const periodId = '1DAY';
    const url = `https://rest.coinapi.io/v1/exchangerate/${baseCurrency}/${quoteCurrency}/history?apikey=${apikey}&period_id=${periodId}`;

    // Recibimos los resultados de la promesa
    axios.get(url)
      .then((result) => { 
        console.log(result);
        handleApiResponse(result.data, baseCurrency, quoteCurrency); })
      .catch((error) => { handleApiError(error); });
  });
});

// Funcion que renderiza en el html y muestra el grafico
function handleApiResponse(data, baseCurrency, quoteCurrency) {
  const rateContainer = document.getElementById('rate-container');
  const rateInfo = document.getElementById('rate-info');
  const ctx = document.getElementById('rate-chart').getContext('2d');

  // Nos aseguramos de limpiar el contenido anterior
  rateInfo.innerHTML = ''; 
  rateContainer.innerHTML = '';


  if (data && data.length > 0) {
    // Ordenar los datos del arreglo del más viejo al más nuevo, convirtienedo dos strings en objetos de fecha
    data.sort((a, b) => new Date(a.time_period_start) - new Date(b.time_period_start));

    /* const rateDetails = data.map(rate => `
      <p>Date: ${new Date(rate.time_period_start).toLocaleDateString()}</p>
      <p>Rate: ${rate.rate_close}</p>
    `).join('');
    rateContainer.innerHTML = rateDetails; */

    /* Se hace un map en la rama del api que deseamos */
    const labels = data.map(rate => new Date(rate.time_period_start).toLocaleDateString()); // Devolvemos un array con fechas en formato mas simple
    const rates = data.map(rate => rate.rate_close);

    // Destruir el gráfico existente si existe
    if (chart) {
      chart.destroy();
    }

    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels, //recibe arreglo
        datasets: [{ 
          label: `Exchange Rate (${baseCurrency}/${quoteCurrency})`,
          data: rates, //recibe arreglo
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1
        }]
      }
    });

  } else {
    rateInfo.innerHTML = '<p>Rate information not found. Please try again.</p>';
  }
}

function handleApiError(error) {
  console.error('Error fetching data:', error);
  const rateInfo = document.getElementById('rate-info');
  rateInfo.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
}