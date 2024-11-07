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

// Load existing vocab data
let existingData = [];
try {
    const existingContent = fs.readFileSync(outputFile, 'utf-8');
    existingData = JSON.parse(existingContent);
} catch (error) {
    console.warn("Warning: Couldn't load existing vocab data; starting fresh.");
}

// Read words from the input file
fs.readFile(inputFile, 'utf-8', async (err, data) => {
    if (err) {
        console.error("Error reading the input file:", err);
        return;
    }

    // Split the contents by new lines to get an array of words
    const words = data.split(/\r?\n/).filter(Boolean);
    const vocabDetails = existingData;
    const failedWords = []; // List to store words for which fetching failed

    // Helper function to find if a word already has meanings in the JSON data
    const wordHasMeanings = (word) => {
        const entry = vocabDetails.find((item) => item.word === word);
        return entry && entry.details && entry.details.some((detail) => detail.meanings && detail.meanings.length > 0);
    };

    // Function to fetch word details from the API
    const fetchWordDetails = async (word) => {
        try {
            const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const cleanedData = removeFields(response.data, ['audio', 'sourceUrl', 'license', 'sourceUrls']); // Remove specified fields
            vocabDetails.push({ word, details: cleanedData });
        } catch (error) {
            console.error(`Error fetching details for "${word}":`, error.message);
            failedWords.push(word); // Add word to failed list
        }
    };

    // Iterate over each word and fetch its details if meanings are missing, with a delay
    for (const word of words) {
        if (!wordHasMeanings(word)) {
            console.log(`Fetching details for "${word}"...`);
            await fetchWordDetails(word);
            await delay(500);  // Wait for 500ms before the next request
        } else {
            console.log(`Skipping "${word}" as it already has meanings.`);
        }
    }

    // Write the updated vocab details back to the output JSON file
    fs.writeFile(outputFile, JSON.stringify(vocabDetails, null, 2), (err) => {
        if (err) {
            console.error("Error writing to the output file:", err);
            return;
        }
        console.log("Vocabulary details written to vocab.json");

        // Print the list of words for which fetching failed
        if (failedWords.length > 0) {
            console.log("\nFailed to fetch meanings for the following words:");
            console.log(failedWords.join('\n'));
        } else {
            console.log("\nSuccessfully fetched meanings for all words.");
        }
    });
});