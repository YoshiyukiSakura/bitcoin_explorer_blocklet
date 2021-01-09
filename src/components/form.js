import { Component } from 'react';
import './../assets/style/form.scss';

export class Form extends Component {

  formatData (data) {
    return {
      "Hash": data.hash,
      "Timestamp": data.time,
      "Height": data.height,
      "Number of Transactions": data.tx.length,
      "Merkle root": data.mrkl_root,
      "Version": "0x" + data.ver.toString(16),
      "Nonce": data.nonce,
      "Size": data.size + " bytes",
    }
  }

  render() {
    let keys = ['Hash', 'Timestamp', 'Height', 'Number of Transactions', 'Merkle root', 'Version', 'Nonce', 'Size'];
    let data = this.formatData(this.props.data)
    return (
      <div className="co-form-container">
        <header className='form-header'>Block { data.Height }</header>
        {
          keys.map(key => {
            return (
              <div className='form-item' key={key}>
                <div className='ebXUGH bFeqhe'>{ key }</div>
                <div className='bFeqhe'>{ data[key] }</div>
              </div> 
            )
          })
        }
      </div>
    )
  }
}

export default Form;
