import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getSerial, updateSerial } from 'store/actions/serials'
import { getCountries, getDirectors, getStudios } from 'store/actions/other'
import Title from './title'
import MultiTitle from './multi-title'

import update from 'react-addons-update'

class Serial extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.ownProps.params.id,
      modes: {
        title: 'default',
        originalTitle: 'default',
        description: 'default',
        countries: 'default',
        directors: 'default',
        studios: 'default'
      },
      data: {
        title: null,
        originalTitle: null,
        description: null,
        countries: null,
        directors: null,
        studios: null
      }
    }
    this.updateValue = this.updateValue.bind(this)
    this.saveValue = this.saveValue.bind(this)
    this.setMode = this.setMode.bind(this)
    this.cancelUpdate = this.cancelUpdate.bind(this)

    this.getDefaults = this.getDefaults.bind(this)
  }

  componentDidMount() {
    this.props.onGetSerial(this.state.id)
    this.props.onGetSelects()
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
            [name]: { $set: mode }
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
      this.props.onUpdateSerial(this.state.id, data)
    }
    this.setMode('default', name)
  }

  cancelUpdate(name) {
    const value = this.getDefaults(this.props.serial.data[name], name) || null
    const newState = update(this.state, {
      data: { [name]: { $set: value } },
      modes: { [name]: { $set: 'default' } }
    })
    this.setState(newState)
  }

  getOptions(dump, part, value = '_id', label = 'name') {
    return dump.map(x => {
      const isSelected = part.indexOf(x._id) !== -1
      return {
        value: x[value],
        label: x[label],
        selected: isSelected
      }
    })
  }

  getDefaults(data, name) {
    if (typeof data === 'string') {
      return data
    }
    return data.map(x => (x._id || x))
  }

  render() {
    const p = this.props
    if (p.serial.data && p.directors.data && p.countries.data && p.studios.data) {
      const serial = p.serial.data
      const title = this.state.data.title === null ? serial.title : this.state.data.title
      const originalTitle = this.state.data.originalTitle === null ? serial.originalTitle : this.state.data.originalTitle
      const description = this.state.data.description === null ? serial.description : this.state.data.description
      const countries = this.state.data.countries || this.getDefaults(p.serial.data.countries, 'countries')
      const countriesOptions = this.getOptions(p.countries.data, countries)
      const directors = this.state.data.directors || this.getDefaults(p.serial.data.directors, 'directors')
      const directorsOptions = this.getOptions(p.directors.data, directors)
      const studios = this.state.data.studios || this.getDefaults(p.serial.data.studios, 'studios')
      const studiosOptions = this.getOptions(p.studios.data, studios)

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
          <Title
            value={description}
            name="description"
            mode={this.state.modes.description}
            updateValue={this.updateValue}
            saveValue={this.saveValue}
            cancelUpdate={this.cancelUpdate}
            setMode={this.setMode}
            fieldType="textarea"
          />
          <MultiTitle
            options={countriesOptions}
            name="countries"
            mode={this.state.modes.countries}
            updateValue={this.updateValue}
            saveValue={this.saveValue}
            setMode={this.setMode}
            values={countries}
            cancelUpdate={this.cancelUpdate}
          />
          <MultiTitle
            options={directorsOptions}
            name="directors"
            mode={this.state.modes.directors}
            updateValue={this.updateValue}
            saveValue={this.saveValue}
            setMode={this.setMode}
            values={directors}
            cancelUpdate={this.cancelUpdate}
          />
          <MultiTitle
            options={studiosOptions}
            name="studios"
            mode={this.state.modes.studios}
            updateValue={this.updateValue}
            saveValue={this.saveValue}
            setMode={this.setMode}
            values={studios}
            cancelUpdate={this.cancelUpdate}
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
    directors: state.directors,
    countries: state.countries,
    studios: state.studios,
    ownProps
  }),
  dispatch => ({
    onGetSerial: (id) => {
      dispatch(getSerial(id))
    },
    onUpdateSerial: (id, data) => {
      dispatch(updateSerial(id, data))
    },
    onGetSelects: () => {
      dispatch(getDirectors())
      dispatch(getCountries())
      dispatch(getStudios())
    }
  })
)(Serial)
