/**
  Provides shared PropType and schema definitions.
*/
import PropTypes from 'prop-types'

/**
  Standard React styles. Can be plain objects, number IDs, or arrays of those.
*/
let StyleProp = PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.number])

/**
  Forecast details are shaped for easy consumption by a SectionList.
  @example:
  {
    title: "June 26",
    data: [
      { description: "Sunny and warm", key: 2 }
    ],
    key: 1
  }
*/
const ForecastDetailsShape = PropTypes.shape({
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({description: PropTypes.string})),
})

/**
  Data for a single forecast (e.g., "Extended").
  `details` may encompass multiple days (via sections of ForecastDetailsShape).
*/
const ForecastShape = PropTypes.shape({
  // details: PropTypes.arrayOf(ForecastDetailsShape).isRequired,
  details: PropTypes.array,
  uri: PropTypes.string,
  soundcloudId: PropTypes.string,
})

export default {
  StyleProp: StyleProp,
  ForecastProp: ForecastShape,
  ForecastDetailsProp: ForecastDetailsShape
}
