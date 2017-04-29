import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import { getSerials } from 'store/actions/serials'

class Serials extends React.Component{
  constructor(props) {
    super(props)

    this.goToAddForm = this.goToAddForm.bind(this)
  }

  goToAddForm() {
    hashHistory.push('serial/add')
  }

  componentDidMount() {
    this.props.onGetSerials()
  }

  render() {
    if (this.props.serials.data) {
      let serials
      if (this.props.serials.data.length) {
        serials = <ul>
                {this.props.serials.data.map(serial => {
                  return <li key={serial._id}>
                          <Link to={`serials/${serial._id}`}>{serial.title}</Link>
                         </li>
                })}
              </ul>
      } else {
        serials = <div>Нет сериалов</div>
      }

      return (
        <div>
          <br/>
          <button onClick={this.goToAddForm}>Add serial</button>
          <br/>
          <br/>
          {serials}
        </div>
      )
    } else if (this.props.serials.loading) {
      return (<div>Загрузка</div>)
    } else if (this.props.serials.errors) {
      return (<div>Ошибки</div>)
    } else {
      return (<div>Что то пошло не так</div>)
    }
  }
}

export default connect(
  (state, ownProps) => ({
    serials: state.serials,
    ownProps
  }),
  dispatch => ({
    onGetSerials: () => {
      dispatch(getSerials())
    }
  })
)(Serials)
