import axios from "axios";
import * as cheerio from "cheerio";
import { v2_base_url } from "../utils/base_v2.js";

const baseUrl = v2_base_url;

export default async function extractQtip(id) {
  try {
    // Fetch data from the specified URL
    const { data } = await axios.get(
      `https://${baseUrl}/ajax/movie/qtip/${id}`
    );
    const $ = cheerio.load(data);

    // Extract data
    const title = $(".pre-qtip-title").text();
    const rating = $(".pqd-li i.fas.fa-star").parent().text().trim();
    const quality = $(".tick-item.tick-quality").text();
    const subCount = $(".tick-item.tick-sub").text().trim();
    const dubCount = $(".tick-item.tick-dub").text().trim();
    const episodeCount = $(".tick-item.tick-eps").text().trim();
    const type = $(".badge.badge-quality").text();
    const description = $(".pre-qtip-description").text().trim();
    const japaneseTitle = $(".pre-qtip-line:contains('Japanese:') .stick-text")
      .text()
      .trim();
    const airedDate = $(".pre-qtip-line:contains('Aired:') .stick-text")
      .text()
      .trim();
    const status = $(".pre-qtip-line:contains('Status:') .stick-text")
      .text()
      .trim();
    const genres = [];
    $(".pre-qtip-line:contains('Genres:') a").each((i, elem) => {
      genres.push($(elem).text().trim());
    });
    const watchLink = $(".pre-qtip-button a.btn.btn-play").attr("href");

    const extractedData = {
      title,
      rating,
      quality,
      subCount,
      dubCount,
      episodeCount,
      type,
      description,
      japaneseTitle,
      airedDate,
      status,
      genres,
      watchLink,
    };
    return extractedData;
  } catch (error) {
    console.error("Error extracting data:", error);
    return error;
  }
}