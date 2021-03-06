import PropTypes from 'prop-types'
import Choices from 'choices.js'
import 'choices.js/assets/styles/css/choices.css'

class Select extends React.Component{
  constructor(props) {
    super(props)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  componentDidMount() {
    const example = new Choices(this.select, {
      choices: this.props.options,
      removeItemButton: true,
      duplicateItems: false,
      placeholder: true,
      placeholderValue: this.props.placeholder
    })


    let results = this.props.values || []
    let result = this.props.value || ''

    example.passedElement.addEventListener('addItem', event => {
      if (this.props.multiple) {
        results.push(event.detail.value)
        this.props.updateValue(results, this.props.name)
      } else {
        result = event.detail.value
        this.props.updateValue(result, this.props.name)
      }
    }, false)

    example.passedElement.addEventListener('removeItem', event => {
      if (this.props.multiple) {
        const index = results.indexOf(event.detail.value)
        results.splice(index, 1)
        this.props.updateValue(results, this.props.name)
      }
    })

    example.passedElement.addEventListener('hideDropdown', event => {
      this.props.saveValue(this.props.name)
    })
  }

  handleKeyDown(event) {
    if (event.keyCode === 27) { // esc
      this.props.cancelUpdate(this.props.name)
    }
  }

  render() {
    let label = this.props.label ? <label>{this.props.label}</label> : null
    return (
      <div>
        {label}
        <select multiple={this.props.multiple} ref={(select) => this.select = select}></select>
      </div>
    )
  }
}
export default Select

Select.defaultProps = {
  placeholder: 'Выберите значение',
  saveValue: () => {},
  cancelUpdate: () => {},
  multiple: false
}

Select.propTypes = {
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  updateValue: PropTypes.func.isRequired,
  values: PropTypes.array,
  value: PropTypes.string,
  saveValue: PropTypes.func,
  cancelUpdate: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  multiple: PropTypes.bool
}
