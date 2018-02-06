import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'

import { Route, Switch } from 'react-router-dom'
import { Link } from 'react-router-dom';

import Invest from "./components/Invest.js";
import NewProject from "./components/NewProject.js";
import Redeem from "./components/Redeem.js";
import VoteProject from "./components/VoteProject.js";

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      projects: [],
      users: [{
        name: 'User 1', grants: 'admin'
      }, {
        name: 'User 2', grants: 'admin'
      }, {
        name: 'User 3', grants: 'regular'
      }],
      user: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance

        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(5, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  selectUser(_user) {
    this.setState({
      user: _user
    })
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12"> 
            <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <a className="nav-link" href="#">Balance: 0<span className="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item dropdown" style={{'margin-left': 'auto', 'margin-right': 0}}>
                    <a className="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Select User
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      {this.state.users.map((user) => {
                        return (<a key={user.name} className="dropdown-item" href="#" onClick={() => this.selectUser(user)}>{user.name}</a>)
                      })}
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>

        <div className="row mx-3 my-3">
          <div className="col-3"> 
            <div className="row w-100">
              <ul className="list-group w-100">
                <li className="list-group-item w-100"><Link to='/Invest'>Invest</Link></li>
                <li className="list-group-item w-100"><Link to='/NewProject'>New Project</Link></li>
                <li className="list-group-item w-100"><Link to='/VoteProject'>Vote Project</Link></li>
                <li className="list-group-item w-100"><Link to='/Redeem'>Reedem</Link></li>
              </ul>
            </div>
          </div>

          <div className="col-9">
            <Switch>
              <Route exact path='/Invest' render={ props => <Invest/> } />
              <Route exact path='/NewProject' render={ props => <NewProject props/> } />
              <Route exact path='/VoteProject' render={ props => <VoteProject/> } />
              <Route exact path='/Redeem' render={ props => <Redeem/> } />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App
