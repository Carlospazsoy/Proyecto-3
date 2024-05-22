Para poder utilizar un entorno de desarrollo con node es necesario instalar un bundler, en este caso utilizamos parcel.
Configuramos el script "start" para ejecutar el index.html

Si se tratase de un proyecto de react no seria neceario instalar parcel

ejecuta el proyecto ejecutando parcel:

npm start

con un entorno de desarrollo node mientra que no sea por cdn debes ejecutar tu equipo como un servidor

api key de CoinAPI recibida por email
10D7326F-19E4-4DF1-8037-EE9F7603DBB5

Endpoint de ejemplo
https://rest.coinapi.io/v1/exchangerate/USD?apikey=10D7326F-19E4-4DF1-8037-EE9F7603DBB5

Exchangee entre dos divisas
https://rest.coinapi.io/v1/exchangerate/MXN/USD?apikey=10D7326F-19E4-4DF1-8037-EE9F7603DBB5

Historial de valor de divisas
https://rest.coinapi.io/v1/exchangerate/USD/MXN/history?period_id=1hrs&apikey=10D7326F-19E4-4DF1-8037-EE9F7603DBB5