import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import logo from './logo.png';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {artists: [],
                  artistName: ''};
  }

  //TODO: Send POST Request for token

  async sendQuery(){
    try{
      let result = await fetch('http://localhost:9000/testAPI',{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({artistName: this.state.artistName})

      });
     this.callAPI();
      console.log(result)

    }catch (e){
      console.log(e)
    }
    
  }

  callAPI(){
    fetch("http://localhost:9000/testAPI")
    .then(res => res.json())
    .then((data) => {
        this.setState({artists: data.artists.items})
        console.log(this.state.artists)
    })
    .catch(console.log)
  }

  
  // componentDidMount(){
  //   this.callAPI();
  // }
 
//TODO: Fix key errors when rendering response from API
  render (){
   return(
     <div className="App">
     <img clasName="Logo" src={logo} alt="Logo"/>
      <TextField
       className="input-field"
       type="text"
       id="outlined-secondary"
       placeholder="Search Artists"
       color="primary"
       variant="outlined"
       onChange={event =>this.setState({artistName : event.target.value})}
       />
       <Button className="input-button"
               variant="contained" 
               startIcon={<SearchIcon />}
               size="large" 
               type="submit" onClick={() => this.sendQuery()}>Search</Button>
       {/* <h1>{this.state.artistName}</h1> */}
       <ul className="results-list">
          {this.state.artists.map(items =>
       <li> <a className="artist-link" key="{items}" href={items.external_urls.spotify} target="_blank" rel="noreferrer">{items.name}</a></li>)}
       </ul>
    </div>
    );
  }
}

export default App;
