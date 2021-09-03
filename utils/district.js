const request = require("postman-request");

const districtData = (state, districtName, today, callback) => {
  const urlstate = "https://cdn-api.co-vin.in/api/v2/admin/location/states";
  // let state = "Odisha";
  // let districtName = "Khurda";
  let stateId;
  let districtId;
  request({ url: urlstate, json: true }, (error, response) => {
    if (error) {
      console.log("unable to connect to services!");
    } else {
      const states = response.body.states;
      stateId = states.find((data) => data.state_name === state);
      stateId = stateId.state_id;

      const urldistrict = `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`;
      request({ url: urldistrict, json: true }, (error, response) => {
        if (error) {
          console.log("unable to connect to services!");
        } else {
          const district = response.body.districts;

          //console.log(district);
          //console.log(districtName);
          districtId = district.find(
            (data) => data.district_name === districtName
          );
          //console.log(districtId.district_id);
          districtId = districtId.district_id;
          const urlvac = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${today}`;
          request({ url: urlvac, json: true }, (error, response) => {
            if (error) {
              callback(
                { error: "Unable to connect to vaccine services!" },
                undefined
              );
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
        }
      });
    }
  });
};

module.exports = districtData;

// const urldistrict = `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`;
// request({ url: urldistrict, json: true }, (error, response) => {
//   if (error) {
//     console.log("unable to connect to services!");
//   } else {
//     const districts = response.body;
//     console.log(districts);
//     // districtId = states.filter((data) => data.state_name === state);
//     // console.log(stateId[0].state_id);
//   }
// });
