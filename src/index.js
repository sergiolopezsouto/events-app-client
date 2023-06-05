import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter as Router} from 'react-router-dom'
import { ThemeProviderWrapper } from './contexts/theme.context'
import { AuthProviderWrapper } from './contexts/auth.context'
import { LoadScript } from '@react-google-maps/api';


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthProviderWrapper>
      <ThemeProviderWrapper>
        <Router>
          <LoadScript googleMapsApiKey="AIzaSyBRgKaKfGaksL3PDZ-uWmOsj-PCBgJSE-E" libraries={['places']}>
            <App />
          </LoadScript>
        </Router>
      </ThemeProviderWrapper>
    </AuthProviderWrapper>
  </React.StrictMode>
)
