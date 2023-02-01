import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(localizedFormat)

type Format = 'LL' | 'LLL' | 'LLLL' | 'l' | 'll' | 'lll' | 'llll' | 'LT'

export const formatDate = (date: Date, format: Format = 'LL') => {
  return dayjs(date).format(format)
}
