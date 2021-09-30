import React from 'react'
import ReactDom from 'react-dom'
import Test from './components/Test.js'

let App = () => {

  return (

    <div>
      this is the app
      <Test/>
      </div>
  )
}
let target = document.getElementById('app')
ReactDom.render(<App/>,target)