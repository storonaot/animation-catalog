import PropTypes from 'prop-types'
import { Link } from 'react-router'

const List = ({ dataArr, name, url }) => {

  let body
  if (!dataArr || !dataArr.length) {
    body = <div>Пусто</div>
  } else {
    body = dataArr.map(item => {
      return (
        <li key={item._id}>
          <Link to={`${url}/${item._id}`}>{item.number} {name}</Link>
        </li>
      )
    })
  }

  return (
    <div>
      <br/>
      {body}
      <br/>
    </div>
  )
}

export default List

List.propTypes = {
  dataArr: PropTypes.array,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}
