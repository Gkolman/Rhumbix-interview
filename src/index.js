import React from 'react'
import ReactDom from 'react-dom'
import Test from './components/Test.js'
import css from './file.css'

let listOfSuggestions = ['about','above','across','app','apple','appreciate','bad','ball','balloon','bell','cat']


let NewForm = (props) => {
  return (
    <div>
      <form>
        <input onChange={(e) => {
          props.changeFormInput(e)
        }}></input>
      <button onClick={(e) => {
        e.preventDefault()
        props.getGify()
      }}> GO </button>
      </form>
    </div>
  )
}
let NewGif = (props) => {
  if (props.gifUrl) {
    return (
    <div>
      <img src={props.gifUrl} alt="loading..." />
    </div>
    )
  } else {
    return <div> search for a gif in the input bar above! </div>
  }
}
class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      input: '',
      currentGif: null
    }
    this.changeFormInput = this.changeFormInput.bind(this)
    this.getGify = this.getGify.bind(this)

  }
  changeFormInput = (e) => {
    let value = e.target.value
    let suggestions = []
    for (var i = 0; i < listOfSuggestions.length; i++) {
      let index = listOfSuggestions[i].indexOf(value)
      if ( index > - 1) {
          suggestions.push([listOfSuggestions[i], index])
      }
    }
    // let sorted = suggestions.sort((a,b) => {a[1] - b[1]})
    // let suggest = sorted.map((cv) => {return cv[0]})
    // console.log('suggestions', suggestions)
    // display suggestions based on search here;
    //

    this.setState({input:value })
  }
  getGify = () => {
    let search = this.state.input
    let string = `https://api.giphy.com/v1/gifs/search?q=[${search}]&api_key=DLCVuTK6KZExOS7JoMq82bi5MaI6EbWO&limit=1`
    $.ajax({
      url : string,
      type: 'get',

      success: (data) => {
        if (data.data) {
          let gifUrl = data.data[0].images.downsized.url
          this.setState({currentGif: gifUrl})
        }
      },
      error: (error) => {console.log('error getting gif -> ', error)},


    })
  }

  // create a form with a go button
  // from should have one input element;
  // when the go button is hit,
  // whatever is in the input filed
  // will be submitted with an ajax request;
  // when we get the data back;
  // find a way to render that component to the dom;
  //
  //

  render() {
    return (
      <div id="main">
        {/* this is the app */}
        {/* <Test/> */}
        <NewForm
        changeFormInput={this.changeFormInput}
        getGify={this.getGify}
        />
        <NewGif gifUrl={this.state.currentGif }/>
        </div>
      )
  }
}
let target = document.getElementById('app')
ReactDom.render(<App/>,target)