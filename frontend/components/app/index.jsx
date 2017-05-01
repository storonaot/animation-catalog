import { Link } from 'react-router'


const App = ({ children }) => {
  return (
    <div>
      <h1>App</h1>
      <Link to='/'>Home</Link>
      <br/>
      <br/>
      <Link to='/serials'>Serials</Link>
      {children}
    </div>
  )
}

export default App
