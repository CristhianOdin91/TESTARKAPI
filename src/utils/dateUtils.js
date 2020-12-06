/**
 * Funciones de utilidad para fechas
 */
import Moment from 'moment-timezone'

import { DATE_CONSTANTS } from '../config'

const randomDate = (start, end, startHour = 0, endHour = 23) => {
  const date = new Date(+start + Math.random() * (end - start))
  const hour = startHour + Math.random() * (endHour - startHour) | 0
  date.setHours(hour)

  return date
}

const getCurrentTime = () => (Moment().tz(DATE_CONSTANTS.TIME_ZONE))

const getYesterday = () => (getCurrentTime().subtract(1, 'days'))

const getLastWeek = () => (getCurrentTime().subtract(7, 'days'))

export {
  randomDate,
  getCurrentTime,
  getYesterday,
  getLastWeek
}
