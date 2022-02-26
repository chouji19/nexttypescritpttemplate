/** @type {import('next').NextConfig} */
// require('dotenv').config()
// import dotenv from 'dotenv';
// import webpack from 'web'

module.exports = {
  reactStrictMode: true,
  env: {
    BACK_URL: 'http://localhost:4000/api'
  },
  webpack: config => {
    config.resolve.mainFields = ["main", "browser", "module"];
    return config;
  },

}
