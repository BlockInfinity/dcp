var React = require('react');
import api from '../api';

class Invest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      accountBalance: 0
    }
  }

  componentWillMount() {
    this.getEtherBalance();
  }

  getEtherBalance () {
    // api.getEtherBalance().then(accountBalance => {
    //   this.setState({
    //     accountBalance: web3.fromWei(accountBalance).substring(0,7)
    //   })
    // }, err => {
    //   console.log(err)
    // })
  }

  render() {
    return (
      <div>
        {this.state.accountBalance}
        <form>
          <div className="form-group">
            <label for="exampleInputEmail1">Amount</label>
            <input type="text" className="form-control" id="amountInput" aria-describedby="emailHelp" placeholder="Enter Amount"/>
          </div>
          <button type="submit" className="btn btn-primary">Invest</button>
        </form>
      </div>
    )
  }
}

export default Invest;
