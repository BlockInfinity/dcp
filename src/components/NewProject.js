var React = require('react');

class NewProject extends React.Component {

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
            <label for="exampleInputTitle">Project Title</label>
            <input type="text" className="form-control" id="exampleInputTitle" aria-describedby="titleHelp" placeholder="Enter title"/>
          </div>
          <div className="form-group">
            <label for="exampleInputAmount">Project Amount</label>
            <input type="text" className="form-control" id="exampleInputAmount" placeholder="Enter Amount"/>
          </div>
          <button type="submit" className="btn btn-primary">Create Project</button>
        </form>
      </div>
    )
  }
}

export default NewProject;
