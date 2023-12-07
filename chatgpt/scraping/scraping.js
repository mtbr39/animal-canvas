const axios = require("axios");
const cheerio = require("cheerio");

async function scrapePage(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const linkSets = [];

    $("h2 > a").each((index, element) => {
      const link = $(element).attr("href");
      const text = $(element).text();

      if (link && link.startsWith("http")) {
        linkSets.push({ link, text });
      }
    });

    return linkSets;
  } catch (error) {
    console.error("Error fetching the page:", error);
    return [];
  }
}

async function scrapeRecursive(url, depth) {
  if (depth === 0) {
    return [];
  }

  const linkSets = await scrapePage(url);
  const subLinkSets = [];

  for (const linkSet of linkSets) {
    const subLinkSetsFromChild = await scrapeRecursive(linkSet.link, depth - 1);
    subLinkSets.push(...subLinkSetsFromChild);
  }

  return [...linkSets, ...subLinkSets];
}

const startingUrl =
  "https://auctions.yahoo.co.jp/list5/23140-submit.html#23260";
const depth = 2; // Set the desired depth

scrapeRecursive(startingUrl, depth)
  .then((allLinks) => {
    console.log(allLinks);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
