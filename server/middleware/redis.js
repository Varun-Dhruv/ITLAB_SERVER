const { createClient } = require("redis");
const redis = createClient({ host: "redis", port: 6379 });

// client.on("error", (err) => console.log("Redis Client Error", err));
redis
  .connect()
  .then(() => {
    console.log("Redis Client Connected");
  })

  .catch((error) => console.error(error));

module.exports = redis;
