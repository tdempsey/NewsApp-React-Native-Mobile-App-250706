import { newsApiKey } from "./ApiKey"; // Assuming ApiKey.js exports newsApiKey
import axios from "axios";
// import { generateNewsArticles } from './generateDummyData.js'; // REMOVE or comment out if not using dummy data

// Endpoints
const apiBaseUrl = "https://newsapi.org/v2";

// Function to simulate an API call returning dummy data (REMOVE or keep commented if not needed)
/*
const simulateApiCall = (dataToReturn, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ articles: dataToReturn });
    }, delay);
  });
};
*/

// --- IMPORTANT: Only ONE declaration for each fetch function! ---

// This is the correct, singular definition for fetching Breaking News
export const fetchBreakingNews = async () => {
  // console.log('--- Fetching REAL Breaking News ---'); // Optional: for debugging
  const breakingNewsUrl = `${apiBaseUrl}/top-headlines?country=us&apiKey=${newsApiKey}`;
  return await newsApiCall(breakingNewsUrl);
};

// This is the correct, singular definition for fetching Recommended News
export const fetchRecommendedNews = async () => {
  // console.log('--- Fetching REAL Recommended News ---'); // Optional: for debugging
  const recommendedNewsUrl = `${apiBaseUrl}/top-headlines?country=us&category=business&apiKey=${newsApiKey}`; // Use your specific recommended endpoint
  return await newsApiCall(recommendedNewsUrl);
};


export const fetchDiscoverNews = async (discover) => {
  // console.log(`--- Fetching REAL Discover News for category: ${discover} ---`); // Optional: for debugging
  const discoverNewsUrl = (category) =>
    `${apiBaseUrl}/top-headlines?country=us&category=${category}&apiKey=${newsApiKey}`;
  return await newsApiCall(discoverNewsUrl(discover));
};


export const fetchSearchNews = async (query) => {
  // console.log(`--- Fetching REAL Search News for query: ${query} ---`); // Optional: for debugging
  const searchNewsUrl = (searchQuery) =>
    `${apiBaseUrl}/everything?q=${searchQuery}&apiKey=${newsApiKey}`;
  const endpoint = searchNewsUrl(query);
  return await newsApiCall(endpoint);
};

// Generic API call helper
const newsApiCall = async (endpoints, params) => {
  const options = {
    method: "GET",
    url: endpoints,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data; // News API usually returns { articles: [...] }
  } catch (error) {
    console.error('Error in newsApiCall:', error); // Use console.error for errors
    return { articles: [] }; // Return an empty array or object with articles to prevent crashes
  }
};