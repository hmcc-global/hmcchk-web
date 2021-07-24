const username = "root"
const password = "CRTVS2021"
const mongoURI = "hmcc-hk-shard-00-00.afsds.mongodb.net:27017,hmcc-hk-shard-00-01.afsds.mongodb.net:27017,hmcc-hk-shard-00-02.afsds.mongodb.net:27017"
const testbedDB = "hmcchk_db_test"
const replicaSet = "atlas-5d0fl1-shard-0"
const authSource = "admin"


module.exports = {
  mongodb: {
    dbURI: "mongodb://" + username + ":" + password + "@" + mongoURI + "/" + testbedDB + "?ssl=true&replicaSet=" + replicaSet + "&authSource=" + authSource
  }
}
