var React = require('react');

class VoteProject extends React.Component {

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
          <button type="submit" className="btn btn-primary">Contra</button>
        </form>
      </div>
    )
  }
}

export default VoteProject;
