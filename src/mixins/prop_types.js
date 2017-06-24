import PropTypes from 'prop-types'

// Standard React styles. Can be plain objects, number IDs, or arrays of those.
let styleProp = PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.number])

// Collection of sectioned forecast data expected by views
let forecastDetails = PropTypes.arrayOf(PropTypes.shape({title: PropTypes.string, data: PropTypes.array}))

export default {
  styleProp: styleProp,
  forecastDetailsProp: forecastDetails
}
