const { createClient } = require("redis");
const redis = createClient({
  url: "redis://:@redis:6379",
});
// const redis = createClient({
//   port: 6379,
//   host: "redis",
// });

// client.on("error", (err) => console.log("Redis Client Error", err));
redis
  .connect()
  .then(() => {
    console.log("Redis Client Connected");
  })

  .catch((error) => console.error(error));

module.exports = redis;
