const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const client = new Client({
  user: 'carlotapearl',
  host: 'localhost',
  database: 'tacos',
  password: '',
  port: 5432
});
client.connect();

app.get('/', function (request, response) {
  response.send('ok');
});

app.get('/api/restaurants', function (request, response) {
  client.query('SELECT * FROM franchise', function (error, dbResponse) {
    console.log(dbResponse);
    response.json({ restaurants: dbResponse.rows})
  });
});

app.get('/api/restaurants/:franchise_id', function (request, response) {
  client.query('SELECT * FROM franchise WHERE franchise_id=$1', [request.params.franchise_id], function (error, dbResponse) {
    response.json({ restaurant: dbResponse.rows[0] })
  })
})

app.get('/api/restaurants/:franchise_id/locations', function (request, response) {
  client.query('SELECT * FROM location WHERE franchise_id=$1', [request.params.franchise_id], function (error, dbResponse) {
    response.json({ locations: dbResponse.rows });
  });
});

app.get('/api/restaurants/:franchise_id/menu_items', function (request, response) {
  client.query('SELECT * FROM menu_item WHERE franchise_id=$1', [request.params.franchise_id], function (error, dbResponse) {
    response.json({ status: 'ok', payload: {
      menu_items: dbResponse.rows } });
  });
});

app.post('/api/restaurants/:franchise_id/menu_items', function (request, response) {
  client.query('INSERT INTO menu_item (name, course, price, picture, franchise_id) VALUES ($1, $2, $3, $4, $5)', [request.body.name, request.body.course, request.body.price, request.body.picture, request.params.franchise_id], function (error, dbResponse) {
    console.log(dbResponse);
    response.json({ status: 'ok', payload: { menu_item: dbResponse.rows[0] }})
  })
})
app.listen(3000, function() {
  console.log('ok so far')
});
