const User = require("../models/userModel");
const mongoose = require("mongoose");
const OverallStat = require("../models/overallStatModel");
const Transaction = require("../models/transactionModel");

// get a single user
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    // hardcoded values
    const currentMonth = "November";
    const currentYear = "2021";
    const currentDay = "2021-11-15";

    // Recent transactions
    const transactions = await Transaction.find({})
      .limit(50)
      .sort({ createdOn: -1 });

    // overall stats
    const overallStat = await OverallStat.find({ year: currentYear });
    const {
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    // current month stats
    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });
    // current day stats
    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports = { getUser, getDashboardStats };
