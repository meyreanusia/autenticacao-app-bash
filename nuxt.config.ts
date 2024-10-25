import dotenv from 'dotenv';
dotenv.config();

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: ['~/index.css'],
  runtimeConfig: {
    public: {
      appToken: process.env.APP_TOKEN, 
    },
    private: {
    },
  },
})
