import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#4C4DFF",
            colorPrimaryHover: "#4C4DFF",
          },
        },
        token: {
          borderRadius: "4px",
          colorPrimary: "#4C4DFF",
        },
      }}  
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
