import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import { getSerials, deleteSerial } from 'store/actions/serials'
import { createSeason } from 'store/actions/seasons'


class Serials extends React.Component{
  constructor(props) {
    super(props)

    this.goToCreateForm = this.goToCreateForm.bind(this)
  }

  goToCreateForm() {
    hashHistory.push('serial/create')
  }

  componentDidMount() {
    this.props.onGetSerials()
  }

  deleteSerial(id) {
    this.props.onDeleteSerial(id)
  }

  render() {
    if (this.props.serials.data) {
      let serials
      if (this.props.serials.data.length) {
        serials = <ul>
                {this.props.serials.data.map(serial => {
                  return <li key={serial._id}>
                          <Link to={`serials/${serial._id}`}>{serial.title}</Link>
                          <span onClick={this.deleteSerial.bind(this, serial._id)}>Удалить</span>
                         </li>
                })}
              </ul>
      } else {
        serials = <div>Нет сериалов</div>
      }

      return (
        <div>
          <br/>
          <button onClick={this.goToCreateForm}>Create serial</button>
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
    },
    onCreateSeason: () => {
      dispatch(createSeason())
    },
    onDeleteSerial: (id) => {
      dispatch(deleteSerial(id))
    }
  })
)(Serials)
