const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const Crawler = require("crawler");
const prisma = require("../models/prisma");
var JSSoup = require("jssoup").default;
const getCrawledData = () => {
  try {
    var c = new Crawler({
      rateLimit: 1000, // `maxConnections` will be forced to 1
      callback: async function (error, res, done) {
        if (error) {
          console.log(error);
        } else {
          const data = res.$(".c-hdgSans.c-hdgSans_2 a");
          // console.log(data);
          var soup = new JSSoup(data);
          await Promise.all(
            await soup.contents.map(async (val, key) => {
              var authorName = val.nextElement._text;
              await prisma.author.create({
                data: {
                  authorName: authorName,
                },
              });
            })
          );
          done();
        }
      },
    });
    c.queue({
      uri: "https://www.poetryfoundation.org/poets",
      parameter1: "poet",
      parameter2: "years",
    });
  } catch (error) {
    console.error(error);
  }
};
const getPoets = async () => {
  try {
    const url = "https://poetrydb.org/author";
    const poets = await axios.get(url);
    return poets.data.authors;
  } catch (error) {
    console.error(error);
  }
};

const showPoets = async (req, res, next) => {
  try {
    const poets = await getPoets();
    res.status(200).send(poets);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getPoetryByPoets = async (req, res, next) => {
  try {
    const poetImage = await image();
    var poetries = [];
    try {
      await Promise.all(
        await poetImage.map(async (poet) => {
          const url = "https://poetrydb.org/author" + `/${[poet.name]}`;
          //console.log(url)
          if (url) {
            const poetryByPoets = await axios.get(url);
            poetries.push({
              poets: poet.name,
              image: poet.images,
              poetries: JSON.stringify(poetryByPoets.data),
            });
          }
        })
      );
    } catch (error) {}
    res.status(200).send(poetries);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

async function image() {
  var authorImage = [];
  var authors = await prisma.author.findMany({
    select: {
      authorName: true,
    },
  });
  authors = authors.map((author, key) => {
    return author.authorName;
  });
  console.log(authors);
  await Promise.all(
    await authors.map(async (author) => {
      //const authorName = author.replace(/ /g, "_");
      try {
        const response = await axios.get(
          `https://dbpedia.org/page/${author.split(/\s+/)[0]}`
        );

        if (response) {
          const data = new JSDOM(response.data);
          if (data) {
            const image = data.window.document.querySelector(
              "body > section:nth-child(3) > div > div.row.pt-2 > div.col-xs-3.col-sm-2 > a > img"
            )?.src;
            if (typeof image !== "undefined") {
              authorImage.push({
                name: author,
                image: image,
              });
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    })
  );
  return authorImage;
}

const getPoetWithImage = async (req, res) => {
  try {
    const imagePoet = await image();
    console.log(imagePoet);
    res.status(200).send(imagePoet);
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  getPoetryByPoets,
  getPoetWithImage,
  showPoets,
  getCrawledData,
};
