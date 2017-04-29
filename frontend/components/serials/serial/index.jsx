import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getSerial, updateSerial } from 'store/actions/serials'
import Title from './title'
import update from 'react-addons-update'

class Serial extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.ownProps.params.id,
      modes: {
        title: 'default',
        originalTitle: 'default'
      },
      data: {
        title: null,
        originalTitle: null
      }
    }
    this.updateValue = this.updateValue.bind(this)
    this.saveValue = this.saveValue.bind(this)
    this.setMode = this.setMode.bind(this)
    this.cancelUpdate = this.cancelUpdate.bind(this)
  }

  componentDidMount() {
    this.props.onGetSerial(this.state.id)
  }

  updateValue(value, name) {
    const newState = update(this.state, { data: { [name]: { $set: value } } })
    this.setState(newState)
  }

  setMode(mode, name) {
    if (mode === 'edit') {
      const arr = _.toPairs(this.state.modes).filter(x => x[1] === 'edit')
      const prewName = arr.length ? arr[0][0] : null
      if (prewName) {
        const newState = update(this.state, {
          modes: {
            [prewName]: { $set: 'default' },
            [name]: { $set: 'edit' }
          }
        })
        this.setState(newState)
        return
      }
    }
    const newState = update(this.state, { modes: { [name]: { $set: mode } } })
    this.setState(newState)
  }

  saveValue(name) {
    if (this.state.data[name]) {
      const data = { [name]: this.state.data[name] }
      console.log('data', data);
      this.props.onUpdateSerial(this.state.id, data)
      this.setMode('default', name)
      console.log(this.state.data);
    } else {
      console.log('saveValue2')
    }
  }

  cancelUpdate(name) {
    console.log('cancelUpdate');
    const value = this.props.serial.data[name] || null
    const newState = update(this.state, {
      data: { [name]: { $set: value } },
      modes: { [name]: { $set: 'default' } }
    })
    this.setState(newState)
  }

  render() {
    if (this.props.serial.data) {
      // console.log('this.state.modes', this.state.modes);
      const serial = this.props.serial.data
      const title = this.state.data.title === null ? serial.title : this.state.data.title
      const originalTitle = this.state.data.originalTitle === null ? serial.originalTitle : this.state.data.originalTitle
      // console.log('originalTitle', originalTitle);
      // console.log('this.state.data.originalTitle', this.state.data.originalTitle);
      // console.log('serial.originalTitle', serial.originalTitle);


      return (
        <div>
          <br/>
          <Link to="serials">Все сериалы</Link>
          <br/>
          <br/>
          <Title
            value={title}
            name="title"
            mode={this.state.modes.title}
            updateValue={this.updateValue}
            saveValue={this.saveValue}
            cancelUpdate={this.cancelUpdate}
            setMode={this.setMode}
          />
          <Title
            value={originalTitle}
            name="originalTitle"
            mode={this.state.modes.originalTitle}
            updateValue={this.updateValue}
            saveValue={this.saveValue}
            cancelUpdate={this.cancelUpdate}
            setMode={this.setMode}
          />
        </div>
      )
    }
    return (<div>Serial</div>)
  }
}

export default connect(
  (state, ownProps) => ({
    serial: state.serial,
    ownProps
  }),
  dispatch => ({
    onGetSerial: (id) => {
      dispatch(getSerial(id))
    },
    onUpdateSerial: (id, data) => {
      dispatch(updateSerial(id, data))
    }
  })
)(Serial)
