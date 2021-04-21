const express = require('express');
// like import express from 'express';(ES2015)
const app = express();

app.get('/', (req, res) => {
  res.send({ bye: 'buddy' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);