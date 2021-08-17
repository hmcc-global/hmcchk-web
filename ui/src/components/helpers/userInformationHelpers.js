import axios from "axios";
// Only allow setting field values that are defined here
const settableDataFields = [
  "email",
  "countryOfOrigin",
  "birthday",
  "campus",
  "lifestage",
  "isMember",
  "isBaptised",
  "ministryTeam",
  "phoneNumber",
  "fullName",
  "address",
  "membershipInfo",
  "baptismInfo",
];

const userDataCleanup = (data) => {
  data.address = {
    floor: data["addressFloor"],
    flat: data["addressFlat"],
    street: data["addressStreet"],
    district: data["addressDistrict"],
  };

  // Sanitize input
  delete data["addressFloor"];
  delete data["addressFlat"];
  delete data["addressStreet"];
  delete data["addressDistrict"];

  // Don't allow these fields to be reset or changed through here
  delete data["email"];
  delete data["isMember"];
  delete data["isBaptised"];
  delete data["baptismDate"];
  delete data["baptismPlace"];
  delete data["membershipRecognitionDate"];
  delete data["membershipRecommitmentDate"];
  delete data["membershipInfo"];
  delete data["baptismInfo"];

  data.fullName = data.firstName + " " + data.lastName;

  for (let key in data) {
    if (!settableDataFields.includes(key)) {
      delete data[key];
    }
  }
};

const getUserDataRequest = async (uid) => {
  return await axios.get("/api/users/get", {
    userId: uid,
  });
};

const updateUserDataRequest = async (data) => {
  return await axios.put("/api/users/update", {
    params: data,
  });
};

export {
  settableDataFields,
  userDataCleanup,
  getUserDataRequest,
  updateUserDataRequest,
};
