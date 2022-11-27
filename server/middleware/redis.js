const { createClient } = require("redis");
// const redis = createClient({
//   url: "redis://:@redis:6379",
// });
const redis = createClient();

redis
  .connect()
  .then(() => {
    console.log("Redis Client Connected");
  })

  .catch((error) => console.error(error));

module.exports = redis;
