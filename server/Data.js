const mongoose = require("mongoose")
const dashboards = new mongoose.Schema()
const dashboardModel = mongoose.model("dashboards", dashboards)
module.exports = dashboardModel
