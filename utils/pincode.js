const request = require("postman-request");

const pincode = (pin, today, callback) => {
  const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${today}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback({ error: "Unable to connect to vaccine services!" }, undefined);
    } else if (response.body.error) {
      callback({ error: "Please enter a valid input" }, undefined);
    } else {
      const pincodeData = response.body.sessions;
      let hospitalAddress = pincodeData.map((names) => {
        return {
          name: names.name,
          address: names.address,
          age: names.min_age_limit,
          date: names.date,
          from: names.from,
          to: names.to,
          vaccine: names.vaccine,
          fee: names.fee_type,
          d1: names.available_capacity_dose1,
          d2: names.available_capacity_dose2,
        };
      });
      callback(undefined, hospitalAddress);
    }
  });
};

module.exports = pincode;
