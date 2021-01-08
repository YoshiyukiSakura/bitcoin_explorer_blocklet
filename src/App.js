import './App.css';
import React, {Component} from 'react'
import axios from 'axios'

const querystring = require('querystring');

class App extends Component {
    //if requested with a hash, then show data
    //if not, then show basic query page
    componentDidMount() {
        const query = querystring.decode(window.location.search.replace('?', ''))
        if (query.hash) {
            (async () => {
                var {data: block} = await axios({method: 'get', url: 'http://127.0.0.1:3001/', params: query});
                this.setState({block: block})
                window.r = this;
            })()
        } else {
            console.log('fuck')
        }
    }

    state = {
        searching: "",
        block: {brief_info: []},
    }

    searchingChange = (e) => {
        this.setState({searching: e.target.value});
        console.log(this.state.searching)
    }

    search = async (e) => {
        // let get_block_config = {method: 'get', url: 'https://blockstream.info/api/tx/' + this.state.searching};
        // let {data: tx_info} = await axios(get_block_config);
    }

    render() {
        return (
            <div className="App">
                <input style={{width: "310px", height: "43px"}} onChange={this.searchingChange} type="text"
                       placeholder="Please input bitcoin transaction hash"/>
                <button onClick={this.search}>search</button>
                <table>
                    <tbody>
                    {
                        this.state.block.brief_info.map((info) => {
                            return <tr style={{borderBottom:"1px solid black"}} key={info[0]}>
                                <td style={{"width": "200px"}}>{info[0]}</td>
                                <td style={{"width": "500px"}}>{info[1]}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default App;
