import {HOC} from 'formsy-react';

class MyInput extends React.Component {
  render() {
    return (
      <div>
        <input value={this.props.getValue()} onChange={(e) => this.props.setValue(e.target.value)}/>
      </div>
    );
  }
};
export default HOC(MyInput);
