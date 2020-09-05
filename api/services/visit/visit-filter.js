const config = require('../../../config')
class VisitFilter {
  constructor (filter) {
    this.aggregate = []
    const page = filter.page || 0
    const size = filter.size || 0
    const interval = filter.interval || 'daily'
    const pageInt = parseInt(page)
    const sizeInt = parseInt(size)
    const $match1 = { $and: [] }
    const $match2 = { $and: [] }
    if (filter.from || filter.to) {
      const dateFilter = { createdAt: { } }
      if (filter.from) {
        dateFilter.createdAt.$gte = new Date(filter.from)
      }
      if (filter.to) {
        // less than To Date + 1 day
        const to = new Date(filter.to)
        const copy = new Date(Number(to))
        copy.setDate(to.getDate() + 1)
        dateFilter.createdAt.$lt = copy
      }
      $match1.$and.push(dateFilter)
    }
    if (filter.status) {
      $match1.$and.push({ status: filter.status })
    }
    if (filter.url && !filter.room) {
      $match1.$and.push({ url: { $regex: `.*${filter.url}.*` } })
    }
    if (filter.room) {
      const room = `^${config.appSettings.env.URL}/${filter.room}.*`
      $match1.$and.push({ url: { $regex: `${room}` } })
    }
    if (filter.referrer) {
      $match1.$and.push({ referrer: { $regex: `.*${filter.referrer}.*` } })
    }

    if (filter.user) {
      $match2.$and.push({ 'connection.user.username': filter.user })
    }
    if (filter.os) {
      $match2.$and.push({ 'connection.os.name': filter.os })
    }
    if (filter.browser) {
      $match2.$and.push({ 'connection.browser.name': filter.browser })
    }
    if (filter.country) {
      $match2.$and.push({ 'connection.geoip.country.code': filter.country })
    }
    if (filter.device) {
      $match2.$and.push({ 'connection.device_id': filter.device })
    }
    const $lookup = {
      from: 'connections',
      let: { connectionId: '$connection' },
      pipeline: [
        { $match: { $expr: { $eq: ['$_id', '$$connectionId'] } } },
        {
          $lookup: {
            from: 'users',
            let: { userId: '$user' },
            pipeline: [
              { $match: { $expr: { $eq: ['$_id', '$$userId'] } } }
            ],
            as: 'user'
          }
        },
        { $unwind: '$user' }
      ],
      as: 'connection'
    }

    if ($match1.$and.length) {
      this.aggregate.push({ $match: $match1 })
    }
    this.aggregate.push({ $lookup })
    this.aggregate.push({ $unwind: '$connection' })
    if ($match2.$and.length) {
      this.aggregate.push({ $match: $match2 })
    }
    const $addFields = {
      year: { $year: '$createdAt' },
      month: { $month: '$createdAt' },
      week: { $week: '$createdAt' },
      day: { $dayOfMonth: '$createdAt' },
      duration: {
        $divide: [{ $subtract: ['$updatedAt', '$createdAt'] }, 1000 * 60]
      },
      page: {
        $arrayElemAt: [
          {
            $split: [
              '$url',
              '?'
            ]
          },
          0
        ]
      },
      ref: {
        $arrayElemAt: [
          {
            $split: [
              '$referrer',
              '?'
            ]
          },
          0
        ]
      }
    }
    this.aggregate.push({ $addFields })
    this.aggregate.push({ $sort: { createdAt: -1 } })
    const $facet = {
      data: [
        { $skip: pageInt * sizeInt },
        { $limit: sizeInt }
      ],
      count: [
        { $group: { _id: null, count: { $sum: 1 } } }
      ],
      countries: [
        { $group: { _id: this.getGroupId(interval, '$connection.geoip.country.code'), count: { $sum: 1 }, duration: { $sum: '$duration' } } }
      ],
      users: [
        { $group: { _id: this.getGroupId(interval, '$connection.user.username'), count: { $sum: 1 }, duration: { $sum: '$duration' } } }
      ],
      os: [
        { $group: { _id: this.getGroupId(interval, '$connection.os.name'), count: { $sum: 1 }, duration: { $sum: '$duration' } } }
      ],
      browsers: [
        { $group: { _id: this.getGroupId(interval, '$connection.browser.name'), count: { $sum: 1 }, duration: { $sum: '$duration' } } }
      ],
      pages: [
        { $group: { _id: this.getGroupId(interval, '$page'), count: { $sum: 1 }, duration: { $sum: '$duration' } } }
      ],
      refs: [
        { $group: { _id: this.getGroupId(interval, '$ref'), count: { $sum: 1 }, duration: { $sum: '$duration' } } }
      ]
    }
    this.aggregate.push({ $facet })
  }

  getGroupId (interval, key) {
    const result = {
      year: '$year', month: '$month'
    }

    if (interval === 'weekly') {
      result.week = '$week'
    }
    if (interval === 'daily') {
      result.day = '$day'
    }
    result.key = key
    return result
  }

  getAggregate () {
    return this.aggregate
  }
}

module.exports = VisitFilter
