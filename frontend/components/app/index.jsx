import { Link } from 'react-router'

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <Link to='/'>Home</Link>
        {this.props.children}
      </div>
    )
  }
}

export default App
