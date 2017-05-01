import { connect } from 'react-redux'
import { getCountries, getDirectors, getStudios } from 'store/actions/other'
import { getSerial, createSeral } from 'store/actions/serials'

import { Link } from 'react-router'
import MultiSelect from 'project/multi-select'
import TextField from 'project/text-field'

class SerialCreate extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      originalTitle: '',
      description: '',
      countries: null,
      directors: null,
      studios: null
    }
    this.updateValue = this.updateValue.bind(this)
    this.saveData = this.saveData.bind(this)
  }

  componentWillMount() {
    this.props.onGetSelects()
  }

  saveData() {
    this.props.onCreateSerial(this.state)
  }

  getOptions(obj) {
    return obj.map(item => {
      return {
        value: item._id,
        label: item.name
      }
    })
  }

  multiSelect(props, name, label, placeholder) {
    if (props) {
      return (
        <MultiSelect
          options={this.getOptions(props)}
          updateValue={this.updateValue}
          name={name}
          label={label}
          placeholder={placeholder}
        />
      )
    }
  }

  updateValue(value, name) {
    this.setState({ [name]: value })
  }

  render() {
    if (this.props.studios.loading ||
        this.props.directors.loading ||
        this.props.countries.loading) {
      return (<div>Loading</div>)
    }
    return (
      <div>
        <Link to="serials">Сериалы</Link>
        <br/>
        <TextField
          updateValue={this.updateValue}
          value={this.state.title}
          name="title"
          label="Название"
        />
        <TextField
          updateValue={this.updateValue}
          value={this.state.originalTitle}
          name="originalTitle"
          label="Оригинальное название"
        />
        <TextField
          updateValue={this.updateValue}
          value={this.state.description}
          name="description"
          label="Описание"
          fieldType="textarea"
        />
        <br/>
        {this.multiSelect(this.props.countries.data,
                          'countries',
                          'Страны',
                          'Выберите страны')}
        <br/>
        {this.multiSelect(this.props.directors.data,
                          'directors',
                          'Режиссеры',
                          'Выберите режиссеров')}
        <br/>
      {this.multiSelect(this.props.studios.data,
                          'studios',
                          'Студии',
                          'Выберите студии')}
        <br/>
        <button onClick={this.saveData}>Save Serial</button>
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    directors: state.directors,
    countries: state.countries,
    studios: state.studios,
    ownProps
  }),
  dispatch => ({
    onGetSelects: () => {
      dispatch(getDirectors())
      dispatch(getCountries())
      dispatch(getStudios())
    },
    onCreateSerial: (data) => {
      dispatch(createSeral(data))
    }
  })
)(SerialCreate)
