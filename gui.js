let commonStringsFinder = new CommonStringsFinder();
let commonStrings = [];

function getCommonStrings()
{
    let text = document.getElementById('input').value;
    let stringArray = commonStringsFinder.textToStringArray(text);
    let combinationLength = document.getElementById('combinationLength').value;
    let maxItemCount = document.getElementById('maxItemCount').value;
    stringArray = commonStringsFinder.createCombinations(stringArray, combinationLength);

    if(commonStrings.length > 0)
    {
        
        let commonStrings2 = commonStringsFinder.getCommonStrings(stringArray);
        commonStrings = commonStringsFinder.mergeCommonStrings(commonStrings, commonStrings2);
    }
    else
    {
        commonStrings = commonStringsFinder.getCommonStrings(stringArray);
    }

    commonStrings = commonStringsFinder.sortCommonStrings(commonStrings);
    commonStrings = commonStringsFinder.shortenListSize(commonStrings, maxItemCount);
    console.log(commonStrings);

    let commonStringsTable = document.getElementById('commonStringsTable');
    let commonStringsTableBody = document.getElementById('commonStringsTableBody');
    commonStringsTable.removeChild(commonStringsTableBody);

    commonStringsTableBody = document.createElement('tbody');
    commonStringsTableBody.id = "commonStringsTableBody";
    commonStringsTable.appendChild(commonStringsTableBody);
    
    let tr;
    let tdRank;
    let tdWord;
    let tdCount;

    for(let x = 0; x < commonStrings.length; x++)
    {
        tr = document.createElement('tr');
        tdRank = document.createElement('td');
        tdRank.innerText = x + 1;
        tdWord = document.createElement('td');
        tdWord.innerText = commonStrings[x].string;
        tdCount = document.createElement('td');
        tdCount.innerText = commonStrings[x].count;

        tr.appendChild(tdRank);
        tr.appendChild(tdWord);
        tr.appendChild(tdCount);
        commonStringsTableBody.appendChild(tr);
    }
}

