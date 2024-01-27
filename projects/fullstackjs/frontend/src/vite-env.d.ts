/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string
  VITE_API_DEV_URL: string
  VITE_ENV: 'development' | 'production'
}
