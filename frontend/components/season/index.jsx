import { connect } from 'react-redux'
import { getSeason } from 'store/actions/seasons'
import { getEpisodes } from 'store/actions/episodes'
import { getVoiceovers, getVideoformats, getMediacontainers, getTranslators } from 'store/actions/other'

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
      translators: null, // multiSelect
      voiceovers: null, // multiSelect
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
    if (p.season.data && p.episodes.data && p.voiceovers.data && p.mediacontainers.data && p.translators.data && p.videoformats.data) {

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
          <Select
            options={this.getOptions(p.voiceovers.data)}
            updateValue={this.updateValue}
            name="voiceovers"
            label="Озвучка"
            placeholder="Выберите озвучку"
            multiple={true}
          />
          <br/>
          <Select
            options={this.getOptions(p.translators.data)}
            updateValue={this.updateValue}
            name="translators"
            label="Перевод"
            placeholder="Выберите перевод"
            multiple={true}
          />
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
    } else if (p.season.loading || p.episodes.loading || p.voiceovers.loading || p.mediacontainers.loading || p.translators.loading || p.videoformats.loading) {
      return (<div>Загрузка</div>)
    }
    return (<div>Что то пошло не так</div>)
  }

}

export default connect(
  (state, ownProps) => ({
    season: state.season,
    episodes: state.episodes,
    voiceovers: state.voiceovers,
    mediacontainers: state.mediacontainers,
    translators: state.translators,
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
      dispatch(getVoiceovers())
      dispatch(getMediacontainers())
      dispatch(getTranslators())
      dispatch(getVideoformats())
    }
  })
)(Season)



// number:
// title:
// originalTitle:
// description:
// date:
// timeMs:
// sizeB:
//
// translators: [],
// voiceovers: [],
// notes: [],
// _videoformat:
// _mediacontainer:


// import axios from 'axios'
// import { Link } from 'react-router'
//
// class Season extends React.Component{
//   constructor(props) {
//     super(props)
//     this.state = {
//       season: null,
//       seasonId: props.params.id,
//       form: {
//         number: '', // required
//         title: '', // required
//         originalTitle: '', // required
//         description: '', // min length 5
//         date: new Date(), // required
//         timeMs: 10, // required
//         sizeB: 10, // required
//         // rating: null,
//         // marks: {
//         //   tabbed: null,
//         //   viewed: null
//         // },
//         // _cover: null,
//         // _season: null
//         // scenes: null // array
//         // translators: null // array
//         // voiceovers: null // array
//         // notes: null // array
//         _videoformat: '58ebd73e7869ab156f21c49a',
//         _mediacontainer: '58ebd7147869ab156f21c498'
//       }
//     }
//   }
//
//   setStateRecursive(nextState) {
//     const prevState = this.state
//     this.setState(_.merge(prevState, nextState))
//   }
//
//   componentDidMount() {
//     const seasonId = this.state.seasonId
//     if (seasonId) {
//       axios.get(`/season/${seasonId}`).then(response => {
//         console.log('response', response.data)
//         this.setState({ season: response.data })
//       }, error => {
//         console.error('error', error)
//         console.error('error.response', error.response)
//       })
//     }
//   }
//
//   updateValue(event) {
//     const key = event.target.name
//     this.setStateRecursive({ form: { [key]: event.target.value } })
//   }
//
//   addEpisode() {
//     const data = {
//       _season: this.state.seasonId
//     }
//     axios.post('/episode', Object.assign(this.state.form, data)).then(response => {
//       console.log('response', response)
//     }, error => {
//       console.error('error', error)
//       console.error('error.response', error.response)
//     })
//   }
//
//   render() {
//     if (this.state.season) {
//       const season = this.state.season
//       const episodes = season.episodes.map(episode => {
//         return (
//           <li key={episode._id}>
//             <Link to={`/episode/${episode._id}`}>Эпизод {episode.number}</Link>
//             <div>{episode.title} ({episode.originalTitle})</div>
//             <div>{episode.date}</div>
//           </li>
//         )
//       })
//       return (
//         <div>
//           <h1>Сезон {this.state.season.number}</h1>
//           <ul>{episodes}</ul>
//           <br/>
//           <label> Номер эпизода
//             <br/>
//             <input type="text" value={this.state.form.number} name="number" onChange={this.updateValue.bind(this)}/>
//           </label>
//           <br/>
//           <label> Название
//             <br/>
//             <input type="text" value={this.state.form.title} name="title" onChange={this.updateValue.bind(this)}/>
//           </label>
//           <br/>
//           <label> Оригинальное название
//             <br/>
//             <input type="text" value={this.state.form.originalTitle} name="originalTitle" onChange={this.updateValue.bind(this)}/>
//           </label>
//           <br/>
//           <label> Описание
//             <br/>
//             <textarea name="description" value={this.state.form.description} onChange={this.updateValue.bind(this)}/>
//           </label>
//           <br/>
//           <button onClick={this.addEpisode.bind(this)}>Добавить эпизод</button>
//         </div>
//       )
//     }
//     return (<div>Season</div>)
//   }
// }
//
// export default Season
