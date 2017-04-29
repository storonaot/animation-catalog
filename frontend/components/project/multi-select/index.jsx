import Choices from 'choices.js'
import 'choices.js/assets/styles/css/choices.css'

class MultiSelect extends React.Component{
  componentDidMount() {
    const example = new Choices(this.select, {
      choices: this.props.options,
      removeItemButton: true,
      duplicateItems: false,
      placeholder: true,
      placeholderValue: this.props.placeholder
    })

    let results = []

    example.passedElement.addEventListener('addItem', event => {
      results.push(event.detail.value)
      this.props.updateValue(results, this.props.name)
    }, false)

    example.passedElement.addEventListener('removeItem', event => {
      const index = results.indexOf(event.detail.value)
      results.splice(index, 1)
      this.props.updateValue(results, this.props.name)
    })
  }
  render() {
    let label
    if (this.props.label) {
      label = <label>{this.props.label}</label>
    }
    return (
      <div>
        {label}
        <select multiple ref={(select) => this.select = select}></select>
      </div>
    )
  }
}
export default MultiSelect
