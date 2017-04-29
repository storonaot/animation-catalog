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
        title: 'default'
      },
      data: {
        title: null
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
    console.log('updateValue');
    const newState = update(this.state, { data: { [name]: { $set: value } } })
    this.setState(newState)
  }

  setMode(mode, name) {
    const newState = update(this.state, { modes: { [name]: { $set: mode } } })
    this.setState(newState)
  }

  saveValue(name) {
    if (this.state.data[name]) {
      const data = { [name]: this.state.data[name] }
      this.props.onUpdateSerial(this.state.id, data)
      this.setMode('default', name)
    }
  }

  cancelUpdate(name) {
    const value = this.props.serial.data[name]
    this.state.data[name] = value

    console.log(this.state)
    this.setMode('default', name)
  }

  render() {
    if (this.props.serial.data) {
      const serial = this.props.serial.data
      const title = this.state.data.title === null ? serial.title : this.state.data.title
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



// import { connect } from 'react-redux'
// import { Link } from 'react-router'
// import { getSerial, updateSerial } from 'store/actions/serials'
// import Title from './title'
// import update from 'react-addons-update'
//
// class Serial extends React.Component{
//   constructor(props) {
//     super(props)
//     this.state = {
//       id: this.props.ownProps.params.id,
//       modes: {
//         title: 'default'
//       },
//       data: {
//         title: null
//       }
//     }
//     this.setMode = this.setMode.bind(this)
//     this.update = this.update.bind(this)
//     this.cancel = this.cancel.bind(this)
//   }
//
//   componentDidMount() {
//     this.props.onGetSerial(this.state.id)
//   }
//
//   setMode(name, mode) {
//     const newState = update(this.state, { modes: { [name]: { $set: mode } } })
//     this.setState(newState)
//     if (mode === 'default') {
//       this.save(name)
//     }
//   }
//
//   update(value, name) {
//     const newState = update(this.state, { data: { [name]: { $set: value } } })
//     this.setState(newState)
//   }
//
//   save(name) {
//     const data = { [name]: this.state.data[name] }
//     this.props.onUpdateSerial(this.state.id, data)
//   }
//
//   cancel(name) {
//     const newState = update(this.state,
//       {
//         data: { [name]: { $set: this.props.serial.data[name] } },
//         modes: { [name]: { $set: 'default' } }
//       }
//     )
//     this.setState(newState)
//   }
//
//   render() {
//     if (this.props.serial.data) {
//       const serial = this.props.serial.data
//       const text = this.state.data.title === null ? serial.title : this.state.data.title
//       return (
//         <div>
//           <br/>
//           <Link to="serials">Все сериалы</Link>
//           <br/>
//           <br/>
//           <Title
//             name="title"
//             mode={this.state.modes.title}
//             text={text}
//             setMode={this.setMode}
//             update={this.update}
//             cancel={this.cancel}
//           />
//         </div>
//       )
//     }
//     return (<div>Serial</div>)
//   }
//
//   // render() {
//   //   if (this.props.serial.data) {
//   //     const serial = this.props.serial.data
//   //     return (
//   //       <div>
//   //         <br/>
//   //         <Link to="serials">Все сериалы</Link>
//   //         <Title
//   //           name="title"
//   //           mode={this.state.titleMode}
//   //           text={serial.title}
//   //           setMode={this.setMode}
//   //         />
//   //         <h2>{serial.title} ({serial.originalTitle})</h2>
//   //         <p>{serial.description}</p>
//   //         <p>{serial.countries.map(country => {
//   //             return `${country.name}, `
//   //           })}</p>
//   //         <p>{serial.directors.map(director => {
//   //             return `${director.name} (${director.originalName}), `
//   //           })}</p>
//   //         <p>{serial.studios.map(studio => {
//   //             return `${studio.name}, `
//   //           })}</p>
//   //       </div>
//   //     )
//   //   }
//   //   return (<div>Serial</div>)
//   // }
// }
//
// export default connect(
//   (state, ownProps) => ({
//     serial: state.serial,
//     ownProps
//   }),
//   dispatch => ({
//     onGetSerial: (id) => {
//       dispatch(getSerial(id))
//     },
//     onUpdateSerial: (id, data) => {
//       dispatch(updateSerial(id, data))
//     }
//   })
// )(Serial)
