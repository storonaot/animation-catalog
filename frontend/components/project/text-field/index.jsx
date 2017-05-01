import PropTypes from 'prop-types'
import s from './style'

class TextField extends React.Component{
  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleInput(event) {
    this.props.updateValue(event.target.value, this.props.name)
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) { // enter
      this.props.saveValue(this.props.name)
    } else if (event.keyCode === 27) { // esc
      this.props.cancelUpdate(this.props.name)
    }
  }

  render() {
    const labelElem = this.props.label ? <label className={s.label}>{this.props.label}</label> : null
    const input = (
      <input
        type={this.props.type}
        name={this.props.name}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.handleInput}
        onKeyDown={this.handleKeyDown}
        autoFocus={this.props.autoFocus}
      />
    )
    const textarea = (
      <textarea
        name={this.props.name}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.handleInput}
        onKeyDown={this.handleKeyDown}
        autoFocus={this.props.autoFocus}
      ></textarea>
    )
    const fieldElem = this.props.fieldType === 'input' ? input : textarea

    return (
      <div className={s.field}>
        {labelElem}
        {fieldElem}
      </div>
    )
  }

}

// const TextField = (props) => {
//   const { value,
//     name,
//     type,
//     label,
//     updateValue,
//     saveValue,
//     cancelUpdate,
//     placeholder,
//     fieldType,
//     autoFocus
//   } = props
//
//
//   const handleInput = (event) => {
//     updateValue(event.target.value, name)
//   }
//
//   const handleKeyDown = (event) => {
//     if (event.keyCode === 13) { // enter
//       saveValue(name)
//     } else if (event.keyCode === 27) { // esc
//       cancelUpdate(name)
//     }
//   }
//
//   document.addEventListener('keydown', handleKeyDown)
//
//   const labelElem = label ? <label className={s.label}>{label}</label> : null
//   const input = (
//     <input
//       type={type}
//       name={name}
//       value={value}
//       placeholder={placeholder}
//       onChange={handleInput}
//       autoFocus={autoFocus}
//     />
//   )
//   const textarea = (
//     <textarea
//       name={name}
//       value={value}
//       placeholder={placeholder}
//       onChange={handleInput}
//       onKeyDown={handleKeyDown}
//       autoFocus={autoFocus}
//     ></textarea>
//   )
//
//   const fieldElem = fieldType === 'input' ? input : textarea
//
//   return (
//     <div className={s.field}>
//       {labelElem}
//       {fieldElem}
//     </div>
//   )
// }
//
export default TextField

TextField.defaultProps = {
  type: 'text',
  placeholder: 'Начните вводить значение',
  fieldType: 'input',
  saveValue: () => {},
  cancelUpdate: () => {},
  autoFocus: false
}

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  updateValue: PropTypes.func.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  fieldType: PropTypes.oneOf(['input', 'textarea']),
  saveValue: PropTypes.func,
  cancelUpdate: PropTypes.func,
  autoFocus: PropTypes.bool
}

// static get propTypes() {
//   return {
//     items: PropTypes.array.isRequired,
//     isLoading: PropTypes.bool,
//     submit: PropTypes.func,
//     title: PropTypes.string,
//     type: PropTypes.oneOf(['news', 'photos']),
//     user: PropTypes.shape({
//       name: PropTypes.string,
//       age: PropTypes.number
//     }),
//     users: PropTypes.arrayOf(
//       PropTypes.shape({
//         name: PropTypes.string,
//         age: PropTypes.number
//       })
//     )
//   }
// }
