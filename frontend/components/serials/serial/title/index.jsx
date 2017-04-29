import PropTypes from 'prop-types'

import TextField from 'project/text-field'

const Title = ({ value, name, mode, updateValue, saveValue, cancelUpdate, setMode }) => {
  const setEditMode = () => setMode('edit', name)

  if (mode === 'default') return <div onClick={setEditMode}>{value}</div>

  return (
    <TextField
      name={name}
      value={value}
      updateValue={updateValue}
      cancelUpdate={cancelUpdate}
      saveValue={saveValue}
      autoFocus={true}
    />
  )
}

export default Title

Title.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['edit', 'default']),
  updateValue: PropTypes.func.isRequired,
  saveValue: PropTypes.func.isRequired,
  cancelUpdate: PropTypes.func.isRequired
}
