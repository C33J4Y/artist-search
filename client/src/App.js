import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import logo from './logo1.png';
import Loader from 'react-loader-spinner';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {artists: [],
                  artistName: '',
                  token: '',
                  calledAPI: false,
                  isLoading: false};
  }
   

  getToken(){
    fetch('https://accounts.spotify.com/api/token',{
        method: 'POST',
        headers:{
          'Content-Type':'application/x-www-form-urlencoded',
          'Authorization': 'Basic MTk4OTIyNzE0ZGI1NGVjZTlhZGU5NzUzOTA3ZDcyM2I6Yjc3Y2ZiNTNjNjMzNGVmN2JlMTdhN2Y1MDU2NzZjOTY='
        },
        body:'grant_type=client_credentials'
      })
      .then(response => response.json())
      .then(data => {
        this.setState({token:data.access_token});
      });

    }

    
  async sendQuery(){
    
    this.state.artistName === '' ? alert('Please enter an artist') : 
    this.setState({isLoading: true});
    
    try{
      let result = await fetch('https://react-node-restapi-app.herokuapp.com/testAPI',{
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({artistName: this.state.artistName,
                             token: this.state.token})

      });
     this.callAPI();
      console.log(result)

    }catch (e){
      console.log(e)
    }
    
  }


  callAPI(){
    
    fetch("https://react-node-restapi-app.herokuapp.com/testAPI")
    .then(this.handleErrors)
    .then(res => res.json())
    .then((data) => {
        this.setState({artists: data.artists.items});
        this.setState({calledAPI: true});
        this.setState({isLoading: false});
    })
    .catch(console.log)
  }

  componentDidMount(){
    this.getToken();
  }
  
 
  render (){
   return(
     <div className="App">
        <img className="Logo" src={logo} alt="Logo"/>
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
                  {this.state.isLoading ? <div>
                                              <Loader color="#ffff"/>
                                              <h4>Loading</h4>
                                          </div> : 
                  
                                <ul className="results-list">
                                {(this.state.artists.length === 0 && this.state.calledAPI === true) ? <h3>"Artist Not Found"</h3> 
                                      : this.state.artists.map(items =>
                                      <li key={items.id}> <a className="artist-link"  
                                                              href={items.external_urls.spotify} 
                                                              target="_blank" 
                                                              rel="noreferrer">{items.name}
                                                          </a>
                                      </li>)}
                                </ul>
                  }
      </div>
    );
  }
}

export default App;
