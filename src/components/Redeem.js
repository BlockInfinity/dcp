var React = require('react');

class Redeem extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <label for="exampleFormControlSelectProject">Select Project</label>
            <select className="form-control" id="exampleFormControlSelectProject">
              <option>1</option>
              <option>2</option>
            </select>
          </div>
          <div className="form-group">
            <label for="exampleInputAmount">Project Amount</label>
            <input type="text" className="form-control" id="exampleInputAmount" placeholder="Enter Amount"/>
          </div>
          <button type="submit" className="btn btn-primary">Redeem</button>
        </form>
      </div>
    )
  }
}

export default Redeem;
