import { connect } from 'react-redux'
import { getSeason } from 'store/actions/seasons'
import { getEpisodes } from 'store/actions/episodes'
import { getVideoformats, getMediacontainers } from 'store/actions/other'

import { Link } from 'react-router'
import List from 'project/list'
import TextField from 'project/text-field'
import MultiSelect from 'project/multi-select'
import Select from 'project/select'

// import update from 'react-addons-update'

class Season extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.ownProps.params.id,
      number: '', // required
      title: '', // required
      originalTitle: '', // required
      description: '',
      date: '', // date
      timeMs: '', // required
      sizeB: '', // required
      _season: this.props.ownProps.params.id, // required ID
      _serial: null, // required ID
      // translators: null, // multiSelect
      // voiceovers: null, // multiSelect
      _videoformat: null, //select
      _mediacontainer: null //select
    }

    this.updateValue = this.updateValue.bind(this)
  }
  componentDidMount() {
    this.props.onGetSeason(this.state.id)
    this.props.onGetEpisodes()
    this.props.onGetSelects()
  }

  getOptions(dump, value = '_id', label = 'name') {
    return dump.map(x => {
      return {
        value: x[value],
        label: x[label]
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
    console.log(value, name);
    this.setState({ [name]: value })
  }

  render() {
    const p = this.props
    if (p.season.data && p.episodes.data && p.mediacontainers.data && p.videoformats.data) {

      const episodes = this.props.episodes.data
      const season = this.props.season.data
      return (
        <div>
          <Link to={`serials/${season._serial._id}`}>{season._serial.title}</Link>
          <div>{season.number} Сезон</div>
          <List
            arrData={episodes}
            name="Эпизод"
            url="episodes"
          />
          <br/>
          <TextField
            updateValue={this.updateValue}
            name="number"
            value={this.state.number}
            label="Номер"
          />
          <br/>
          <TextField
            updateValue={this.updateValue}
            name="title"
            value={this.state.title}
            label="Название"
          />
          <br/>
          <TextField
            updateValue={this.updateValue}
            name="originalTitle"
            value={this.state.originalTitle}
            label="Оригинальное Название"
          />
          <br/>
          <TextField
            updateValue={this.updateValue}
            name="description"
            value={this.state.description}
            label="Описание"
            fieldType="textarea"
          />
          <br/>
          <TextField
            type="date"
            updateValue={this.updateValue}
            name="date"
            value={this.state.date}
            label="Дата"
          />
          <TextField
            updateValue={this.updateValue}
            name="timeMs"
            value={this.state.timeMs}
            label="Длительность"
          />
          <TextField
            updateValue={this.updateValue}
            name="sizeB"
            value={this.state.sizeB}
            label="Размер"
          />
          <br/>
          {/* <Select
            options={this.getOptions(p.voiceovers.data)}
            updateValue={this.updateValue}
            name="voiceovers"
            label="Озвучка"
            placeholder="Выберите озвучку"
            multiple={true}
          /> */}
          <br/>
          {/* <Select
            options={this.getOptions(p.translators.data)}
            updateValue={this.updateValue}
            name="translators"
            label="Перевод"
            placeholder="Выберите перевод"
            multiple={true}
          /> */}
          <br/>
          <Select
            options={this.getOptions(p.mediacontainers.data)}
            updateValue={this.updateValue}
            name="_mediacontainer"
            label="Медиаконтейнер"
            placeholder="Выберите медиаконтейнер"
          />
          <br/>
          <Select
            options={this.getOptions(p.videoformats.data, '_id', 'format')}
            updateValue={this.updateValue}
            name="_videoformat"
            label="Видеоформат"
            placeholder="Выберите видеоформат"
          />
          <br/>
        <button>Сохранить</button>

        </div>
      )
    } else if (p.season.loading || p.episodes.loading || p.mediacontainers.loading || p.videoformats.loading) {
      return (<div>Загрузка</div>)
    }
    return (<div>Что то пошло не так</div>)
  }

}

export default connect(
  (state, ownProps) => ({
    season: state.season,
    episodes: state.episodes,
    // voiceovers: state.voiceovers,
    mediacontainers: state.mediacontainers,
    // translators: state.translators,
    videoformats: state.videoformats,
    ownProps
  }),
  dispatch => ({
    onGetSeason: (id) => {
      dispatch(getSeason(id))
    },
    onGetEpisodes: () => {
      dispatch(getEpisodes())
    },
    onGetSelects: () => {
      // dispatch(getVoiceovers())
      dispatch(getMediacontainers())
      // dispatch(getTranslators())
      dispatch(getVideoformats())
    }
  })
)(Season)
