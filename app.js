const fetch = require('node-fetch');
const CONST_API_KEY = 'dict.1.1.20210216T114936Z.e4989dccd61b9626.373cddfbfb8a3b2ff30a03392b4e0b076f14cff9';
const CONST_API = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup'
let CONST_WORDS = {};



fetch('http://norvig.com/big.txt')
.then((res) => res.text())
.then((text) => {
    const removeNumeric = text.replace(/[0-9]/g, "");
    const allWords = removeNumeric.replace(/[^\n\w\s\\D\\d]/g, "").split(/\s+/);
    return allWords;
})
.then((allWords) => {
    let countsMap = allWords.reduce((dict, word) => {
        dict[word] = (dict[word] || 0) + 1;
        return dict;
    }, {});
    return countsMap;
})
.then((countsMap) => {
    const keyValueArray = Object.entries(countsMap);
    const sortedkeyValueArray = keyValueArray.sort((a, b) => a[1] - b[1]);
    const reverseSortedKeyValueArray = sortedkeyValueArray.reverse()
    return reverseSortedKeyValueArray.slice(0, 10);
})
.then(async function(words){
    let jsonWordData = {};
    for( word of words){
        const res = await fetch(`${CONST_API}?key=${CONST_API_KEY}&lang=en-en&text=${word[0]}`);
        const json = await res.json()
        let output = {};
        if(json.def[0]){
            const translations = json.def[0].tr;
            let pos = [];
            let syn = [];
            for(ele of translations){
                pos.push(ele.pos)
                syn.push(ele.syn);
            }
            let uniPos = [...new Set(pos)]
            let synonyms = [];
            for(e of syn){
                if(e){
                    synonyms.push(e[0]['text']);
                }   
            }
            output['Pos'] = uniPos;
            output['Synonyms'] = synonyms
            jsonWordData[word[0]] = output
        }else{
            jsonWordData[word[0]] = {'Error' : "No Response"}
        }
    }
    return jsonWordData;
})
.then((jsonWordData) => {
    CONST_WORDS = jsonWordData;
    console.log(CONST_WORDS);
    console.log(Object.keys(CONST_WORDS).length);
})




