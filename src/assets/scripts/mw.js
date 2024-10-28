import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

// Define input and output file paths
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const inputFile = path.resolve("/Users/bijuale/My Documents/Writings/VocabularyWords.txt");
const outputFile = path.join(__dirname, "../../_data/vocab.json");

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to recursively remove specified fields
const removeFields = (obj, fieldsToRemove) => {
    if (Array.isArray(obj)) {
        return obj.map(item => removeFields(item, fieldsToRemove));
    } else if (typeof obj === 'object' && obj !== null) {
        for (const field of fieldsToRemove) {
            delete obj[field];
        }
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                removeFields(obj[key], fieldsToRemove); // Recurse into objects
            }
        }
    }
    return obj;
};

// Read words from the input file
fs.readFile(inputFile, 'utf-8', async (err, data) => {
    if (err) {
        console.error("Error reading the input file:", err);
        return;
    }

    // Split the contents by new lines to get an array of words
    const words = data.split(/\r?\n/).filter(Boolean);
    const vocabDetails = [];

    // Function to fetch word details from the API
    const fetchWordDetails = async (word) => {
        try {
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const cleanedData = removeFields(response.data, ['audio', 'sourceUrl', 'license', 'sourceUrls'],); // Remove specified fields
            vocabDetails.push({ word, details: cleanedData });
        } catch (error) {
            console.error(`Error fetching details for "${word}":`, error.message);
            vocabDetails.push({ word, error: error.message });
        }
    };

    // Iterate over each word and fetch its details with a delay
    for (const word of words) {
        await fetchWordDetails(word);
        await delay(500);  // Wait for 300ms before the next request
    }

    // Write the results to the output JSON file
    fs.writeFile(outputFile, JSON.stringify(vocabDetails, null, 2), (err) => {
        if (err) {
            console.error("Error writing to the output file:", err);
            return;
        }
        console.log("Vocabulary details written to vocab.json");
    });
});