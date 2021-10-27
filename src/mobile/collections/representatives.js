/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let Representatives
const Backbone = require("backbone")
const { API_URL } = require("sharify").data
const Representative = require("../models/representative")

module.exports = Representatives = (function () {
  Representatives = class Representatives extends Backbone.Collection {
    static initClass() {
      this.prototype.model = Representative

      this.prototype.url = `${API_URL}/api/v1/admins/available_representatives`
    }

    fetch() {
      const dfd = $.Deferred()
      Backbone.Collection.prototype.fetch.call(this, {
        success: () => {
          const promises = this.map(representative => representative.fetch())
          return $.when.apply(null, promises).then(dfd.resolve)
        },
      })
      return dfd.promise()
    }
  }
  Representatives.initClass()
  return Representatives
})()