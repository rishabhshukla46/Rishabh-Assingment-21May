# Rishabh-Assingment-21May

Problem Statement:

1. Fetch document from given url.
2. Analyse the document using asynchronous mechanism, fetched in step 1
  a. Find occurrences count of word in document
  b. Collect details for top 10 words(order by word Occurrences) from Given API
    i. synonyms/means
    ii. part Of Speech/pos
3. Show words list in JSON format for top 10 words.
  a. Word: text
  b. Output
    i. Count of Occurrence in that Particular Document
    ii. Synonyms
    iii. Pos
    
Solutions:
1. For this problem we have used node-fetch API.

2. Line 8-27 includes:
  a. Fetching the response from API
  b. Converting the response into text format.
  c. Deleting all numeric, commas, speciacl chars and spaces.
  d. Converting cleaned text data into array of words.
  e. Creating a map of all words and thier occurence.
  f. Converting map into array of enteries, then sort them on basis of second entry in each array, i.e Frequency.
  g. Reverse sort the array to get top 10.

3. Line 28-62 includes:
  a. Parsing top 10 words one by one and calling API for each.
  b. We used async/await to preserve the order and to call API one by one.
  c. filter the response according to its structure to get Pos and Synonyms.
  d. Creating Json data keeping word as keyword and output(inculdes pos array and synonyms array).
  e. Storing this json Data into CONST_WORDS variable.
  
NOTE----------------
Please note that due to aysn property if we try to access CONST_DATA at line 64 outside then function it will show an "{}".


