import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Header from './header'

export default class DateHeader extends Component {
  get isToday () {
    try {
      let title = this.props.title
      return title && equalDates(date(title), new Date()) && !title.match(/night/)
    } catch (e) {
      return false
    }
  }

  get isTonight () {
    try {
      let title = this.props.title
      return title && equalDates(date(title), new Date()) && title.match(/night/)
    } catch (e) {
      return false
    }
  }

  get smartDate () {
    if (this.isToday) {
      return "today"
    } else if (this.isTonight) {
      return "tonight"
    } else {
      return this.props.title || ""
    }
  }

  render () {
    return (
      <Header style={[Styles.date, this.props.style || {}]} title={this.smartDate} />
    )
  }
}

function date(dateDisplay) {
  // If EDT, that's OK; err on this side
  let easternTime = " 00:00:00-0500"
  return new Date(dateDisplay.replace('night', '') + easternTime)
}

function equalDates (d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate()
}

const Styles = StyleSheet.create({
  date: {
    color: '#dedede',
    fontFamily: 'Lobster',
    fontSize: 18,
    lineHeight: 24
  }
})

DateHeader.propTypes = {
  title: PropTypes.string,
  style: PropTypes.oneOfType(PropTypes.object, PropTypes.array),
}
