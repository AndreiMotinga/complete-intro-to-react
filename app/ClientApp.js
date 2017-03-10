import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router'
import App from './index'

render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('app'))
