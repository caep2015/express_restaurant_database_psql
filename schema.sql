DROP DATABASE IF EXISTS tacosdb;
CREATE DATABASE tacosdb;

\c tacosdb;

CREATE TABLE franchise(
  franchise_id SERIAL PRIMARY KEY,
  rating FLOAT,
  price_point INTEGER,
  name TEXT,
  authenticity INTEGER
);


CREATE TABLE location(
  location_id SERIAL PRIMARY KEY,
  street TEXT,
  city TEXT,
  zip INTEGER,
  CHECK (zip > 9999 AND zip < 100000),
  franchise_id INTEGER REFERENCES franchise

);

CREATE TABLE menuItem(
  menuItem_id SERIAL PRIMARY KEY,
  picture TEXT,
  course TEXT,
  price FLOAT,
  name TEXT,
  franchise_id INTEGER REFERENCES franchise
);
