import PropTypes from 'prop-types'
import MultiSelect from 'project/multi-select'

const MultiTitle = ({ options, name, mode, updateValue, setMode, values, saveValue, cancelUpdate }) => {

  const setEditMode = () => setMode('edit', name)

  if (mode === 'default') {
    return (
      <div onClick={setEditMode}>{options.map(item => {
        return item.selected ? <span key={item.value}>{item.label}, </span> : null
      })}</div>
    )
  }

  return(
    <MultiSelect
      options={options}
      updateValue={updateValue}
      name={name}
      values={values}
      saveValue={saveValue}
      cancelUpdate={cancelUpdate}
    />
  )

}

export default MultiTitle



// import PropTypes from 'prop-types'
//
// import TextField from 'project/text-field'
//
// const Title = ({ value, name, mode, updateValue, saveValue, cancelUpdate, setMode, fieldType }) => {
//   const setEditMode = () => setMode('edit', name)
//
//   if (mode === 'default') return <button onClick={setEditMode}>{value}</button>
//
//   return (
//     <TextField
//       name={name}
//       value={value}
//       updateValue={updateValue}
//       cancelUpdate={cancelUpdate}
//       saveValue={saveValue}
//       autoFocus={true}
//       fieldType={fieldType}
//     />
//   )
// }
//
// export default Title
//
// Title.propTypes = {
//   value: PropTypes.string,
//   name: PropTypes.string.isRequired,
//   setMode: PropTypes.func.isRequired,
//   mode: PropTypes.oneOf(['edit', 'default']),
//   updateValue: PropTypes.func.isRequired,
//   saveValue: PropTypes.func.isRequired,
//   cancelUpdate: PropTypes.func.isRequired,
//   fieldType: PropTypes.string
// }
