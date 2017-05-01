import PropTypes from 'prop-types'
import TextField from 'project/text-field'
import { Link } from 'react-router'

const SeasonsList = ({ seasons, updateValue, name, value, createSeason }) => {

  let body
  if (!seasons.length) {
    body = <div>Сезоны не запонены</div>
  } else {
    body = seasons.map(season => {
      return (
        <li key={season._id}>
          <Link to={`seasons/${season._id}`}>{season.number} Сезон</Link>
        </li>
      )
    })
  }

  let button
  if (value.length && !isNaN(value)) {
    button = <button onClick={createSeason}>Create season</button>
  }

  return (
    <div>
      <br/>
    <div>Сезоны</div>
      <br/>
      {body}
      <br/>
      <TextField
        updateValue={updateValue}
        name={name}
        value={value}
      />
      <br/>
      {button}
    </div>
  )


}

export default SeasonsList

SeasonsList.propTypes = {
  seasons: PropTypes.array
}
