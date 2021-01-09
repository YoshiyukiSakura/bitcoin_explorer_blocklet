import { Component } from 'react';
import './../assets/style/table.scss';

export class Table extends Component {
  constructor(props) {
    super(props);

    let txData = props.txData

    let pageSize = 10,
      currentPage = 1
    let tableData = txData.slice(pageSize * (currentPage - 1), pageSize * currentPage)
    let pages = new Array(5).fill('').map((_, index) => currentPage + index)
    this.state = {
      page: {
        pageTotal: txData.length,
        currentPage: currentPage,
        pageSize: pageSize,
        pageStart: currentPage,
        pageCount: Math.ceil(txData.length / pageSize)
      },
      tableData,
      pages
    };
  }

  componentDidMount () {
  }

  togglePage (currentPage) {
    let page = this.state.page
    let pageStart = page.pageStart
    let pageEnd = pageStart + 4

    if (currentPage === 'prev') {
      currentPage = page.currentPage - 1
    }
    if (currentPage === 'next') {
      currentPage = page.currentPage + 1
    }
    if (currentPage === 'sub') {
      currentPage = page.currentPage - 10
    }
    if (currentPage === 'add') {
      currentPage = page.currentPage + 10
    }

    // 分页溢出
    if (currentPage < 1 || currentPage > page.pageCount) {
      return
    }
    
    if (currentPage < pageStart) {
      pageStart = currentPage
    } else if (currentPage > pageEnd) {
      pageStart = currentPage - 4
    }

    let pages = new Array(5).fill('').map((_, index) => pageStart + index)
    
    page.pageStart = pageStart
    page.currentPage = currentPage

    let { pageSize } = this.state.page
    let tableData = this.props.txData.slice(pageSize * (currentPage - 1), pageSize * currentPage)

    this.setState({
      tableData,
      page,
      pages
    });
  }

  stampToDate (time) {
    let date = new Date(time)
    let month = ('00' + (date.getMonth() + 1)).slice(-2)
    let day = ('00' + date.getDate()).slice(-2)
    let hour = ('00' + date.getHours()).slice(-2)
    let second = ('00' + date.getSeconds()).slice(-2)
    return `${date.getFullYear()}-${month}-${day} ${hour}:${second}`
  }

  getBTCValue (value) {
    return value / 1000000
  }

  render() {
    let { tableData, pages, page } = this.state;
    return (
      <div className="co-table-container">
        <header className='table-header'>Block Transactions</header>
        {
          tableData.map((item, index) => (
            <div className='table-item-box' key={index}>
              <div className='row-item hash-item'>
                <div className='left'>
                  <span className='name'>hash</span>
                  <span className='addr'>{ item.hash }</span>
                </div>
                <div className='right'>
                  <div className='fr text'>{ this.stampToDate(item.time) }</div>
                </div>
              </div>
              <div className='row-item value-item'>
                <div className='left'>
                  <span className='name'></span>
                  {
                    page.currentPage === 1 && index === 0 ? 
                    (
                      <div className='tansfer'>COINBASE (Newly Generated Coins)</div>
                    ) : (
                      <div className='tansfer'>
                        {
                          item.inputs.map((input, input_i) => (
                            <div className='' key={input_i}>
                              <span className='addr'>{ input.prev_out.addr }</span>
                              <span className='fr text'>{ this.getBTCValue(input.prev_out.value) } BTC</span>
                            </div>

                          ))
                        }
                      </div>
                    )
                  }
                </div>
                <div className='right'>
                  <span className='name'> => </span>
                  <div className='tansfer'>
                    {
                      item.out.map((out, out_i) => {
                        return out.addr !== 'null' ? (
                          <div key={out_i}>
                            <span className='addr'>{ out.addr }</span>
                            <span className='fr text'>{ this.getBTCValue(out.value) } BTC</span>
                          </div>
                        ) : (
                          <div className='text' key={out_i}>Unable to decode output address</div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
              <div className='row-item fee-item'>
              <div className='left'>
                  <span className='name'>Fee</span>
                  <div className='tansfer'>
                    <div className='text'>{ this.getBTCValue(item.fee) } BTC</div>
                    <div className='text'></div>
                  </div>
                </div>
                <div className='right'>
                  <span className='name'></span>
                  <div className='tansfer'>
                    <div className='fr text total-value'>{ this.getBTCValue(item.fee) } BTC</div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }

        <ul className='btn-container'>
          {
            page.currentPage > 1 && (
              <li className='btn' onClick={ 
                () => { this.togglePage('prev') }
              }>《</li>
            )
          }

          {
            page.currentPage > 10 && (
              <li className='btn' onClick={ 
                () => { this.togglePage('sub') }
              }>-10</li>
            )
          }
            
          {
            pages.map(current => (
              <li className={page.currentPage === current ? 'btn current' : 'btn'} key={current} onClick={ 
                () => { this.togglePage(current) }
               }>{ current }</li>
            ))
          }

          {
            page.currentPage < page.pageCount - 10 && (
              <li className='btn' onClick={ 
                () => { this.togglePage('add') }
              }>+10</li>
            )
          }

          {
            page.currentPage < page.pageCount && (
              <li className='btn' onClick={ 
                () => { this.togglePage('next') }
              }>》</li>
            )
          }
        </ul>
      </div>
    )
  }
}

export default Table;
