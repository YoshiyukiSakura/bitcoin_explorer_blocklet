import {Component} from 'react';
import './../assets/style/search.scss';

export class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search_text: ''
        }
        console.log(this.search)
    }

    render() {
        return (
            <div className="co-search-container">
                <input className="search-input" onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        this.props.search(this.state.search_text)
                    }
                }} type="text" name="block_hash" value={this.state.search_text}
                       onChange={(event) => {
                           let value = event.target.value
                           this.setState({search_text: value});
                       }}
                       placeholder="Search with block hash or height"/>
                <div className="search-button" onClick={() => {
                    this.props.search(this.state.search_text)
                }}>Search
                </div>
            </div>
        )
    }
}

export default Search;
