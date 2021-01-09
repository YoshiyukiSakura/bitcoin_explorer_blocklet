import {Component} from 'react';
import axios from 'axios';
import {Search} from "./components/search";
import {Form} from "./components/form";
import {Table} from "./components/table";
import './assets/style/index.scss';

export class App extends Component {

    constructor() {
        super();

        this.state = {
            txData: [],
            loading: true
        };
    }

    componentDidMount() {
        this.getData()
    }

    search = (hash) => {
        this.setState({loading: true})
        this.getData(hash)
    }

    getData(hash = '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa') {
        let config = {
            method: 'get',
            url: `https://blockchain.info/rawblock/${hash}?cors=true`,
        };
        axios(config)
            .then((res) => {
                let data = res.data
                this.setState({
                    loading: false,
                    txData: data.tx,
                    data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        let {txData, data, loading} = this.state;
        return loading ? (
            <div className="App loading">loading...</div>
        ) : (
            <div className="App">
                <Search search={this.search}></Search>
                <Form data={data}></Form>
                <Table txData={txData}></Table>
            </div>
        )
    }
}

export default App;
