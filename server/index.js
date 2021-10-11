const express = require('express')
const path = require('path')

// ENV config
require('dotenv').config({ path: path.join(__dirname, './.env') });