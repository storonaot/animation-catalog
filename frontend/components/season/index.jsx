import axios from 'axios'
import { Link } from 'react-router'

class Season extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      season: null,
      seasonId: props.params.id,
      form: {
        number: '', // required
        title: '', // required
        originalTitle: '', // required
        description: '', // min length 5
        date: new Date(), // required
        timeMs: 10, // required
        sizeB: 10, // required
        // rating: null,
        // marks: {
        //   tabbed: null,
        //   viewed: null
        // },
        // _cover: null,
        // _season: null
        // scenes: null // array
        // translators: null // array
        // voiceovers: null // array
        // notes: null // array
        _videoformat: '58ebd73e7869ab156f21c49a',
        _mediacontainer: '58ebd7147869ab156f21c498'
      }
    }
  }

  setStateRecursive(nextState) {
    const prevState = this.state
    this.setState(_.merge(prevState, nextState))
  }

  componentDidMount() {
    const seasonId = this.state.seasonId
    if (seasonId) {
      axios.get(`/season/${seasonId}`).then(response => {
        console.log('response', response.data)
        this.setState({ season: response.data })
      }, error => {
        console.error('error', error)
        console.error('error.response', error.response)
      })
    }
  }

  updateValue(event) {
    const key = event.target.name
    this.setStateRecursive({ form: { [key]: event.target.value } })
  }

  addEpisode() {
    const data = {
      _season: this.state.seasonId
    }
    axios.post('/episode', Object.assign(this.state.form, data)).then(response => {
      console.log('response', response)
    }, error => {
      console.error('error', error)
      console.error('error.response', error.response)
    })
  }

  render() {
    if (this.state.season) {
      const season = this.state.season
      const episodes = season.episodes.map(episode => {
        return (
          <li key={episode._id}>
            <Link to={`/episode/${episode._id}`}>Эпизод {episode.number}</Link>
            <div>{episode.title} ({episode.originalTitle})</div>
            <div>{episode.date}</div>
          </li>
        )
      })
      return (
        <div>
          <h1>Сезон {this.state.season.number}</h1>
          <ul>{episodes}</ul>
          <br/>
          <label> Номер эпизода
            <br/>
            <input type="text" value={this.state.form.number} name="number" onChange={this.updateValue.bind(this)}/>
          </label>
          <br/>
          <label> Название
            <br/>
            <input type="text" value={this.state.form.title} name="title" onChange={this.updateValue.bind(this)}/>
          </label>
          <br/>
          <label> Оригинальное название
            <br/>
            <input type="text" value={this.state.form.originalTitle} name="originalTitle" onChange={this.updateValue.bind(this)}/>
          </label>
          <br/>
          <label> Описание
            <br/>
            <textarea name="description" value={this.state.form.description} onChange={this.updateValue.bind(this)}/>
          </label>
          <br/>
          <button onClick={this.addEpisode.bind(this)}>Добавить эпизод</button>
        </div>
      )
    }
    return (<div>Season</div>)
  }
}

export default Season
