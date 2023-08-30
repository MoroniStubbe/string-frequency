class CommonString
{
    string;
    count;
}


class CommonStringsFinder
{
    //in"", out[]
    textToStringArray(string)
    {
        string = string.toLowerCase();
        let stringArray = [];
        let regex = /[\w']+/g;
        stringArray = string.match(regex);

        return stringArray;
    }

    createCombinations(stringArray, combinationLength)
    {
        let newStringArray = [];
        let combination;

        for(let x = 0; x < stringArray.length - combinationLength + 1; x++)
        {
            combination = stringArray[x];

            for(let y = 1; y < combinationLength; y++)
            {
                combination += " " + stringArray[x + y];
            }

            newStringArray.push(combination);
        }
        
        return newStringArray;
    }
    
    //in[], out[]
    getCommonStrings(stringArray) 
    {
        let commonString;
        let commonStrings = [];
        let exists;

        for(let x = 0; x <stringArray.length; x++)
        {
            exists = false;

            for(let y = 0; y < commonStrings.length; y++)
            {
                if(stringArray[x] == commonStrings[y].string)
                {
                    exists = true;
                    commonStrings[y].count++;
                    break;
                }
            }

            if(!exists)
            {
                commonString = new CommonString;
                commonString.string = stringArray[x];
                commonString.count = 1;
                commonStrings.push(commonString);
            }
        }

        return commonStrings;
    }

    //will exclude strings that dont overlap
    mergeCommonStrings(commonStrings1, commonStrings2)
    {
        let commonStrings = [];
        let commonString;

        for(let x = 0; x <commonStrings1.length; x++)
        {
            for(let y = 0; y < commonStrings2.length; y++)
            {
                if(commonStrings1[x].string == commonStrings2[y].string)
                {
                    commonString = new CommonString;
                    commonString.string = commonStrings1[x].string;
                    commonString.count = commonStrings1[x].count + commonStrings2[y].count;
                    commonStrings.push(commonString);
                    break;
                }
            }
        }

        return commonStrings;
    }
    
    //in[], out[]
    sortCommonStrings(commonStrings)
    {
        let largestCount;
        let sortedCommonStrings = [];

        while(commonStrings.length > 0)
        {
            largestCount = 0;

            //find largest count
            for(let x = 0; x < commonStrings.length; x++)
            {
                if(commonStrings[x].count > largestCount)
                {
                    largestCount = commonStrings[x].count;
                }
            }

            //put all largest count in sortedCommonStrings
            for(let y = 0; y < commonStrings.length; y++)
            {
                if(commonStrings[y].count == largestCount)
                {
                    sortedCommonStrings.push(commonStrings[y]);
                    commonStrings.splice(y, 1);
                }
            }
        }

        return sortedCommonStrings;
    }
    
    //in[], inNum, out[]
    removeUncommonStrings(stringArray, minimumCount)
    {
        let commonStrings = [];
        for(let x = 0; x < stringArray.length; x++)
        {
            if(stringArray[x].count >= minimumCount)
            {
                commonStrings.push(stringArray[x]);
            }
        }
        return commonStrings;
    }
    
    //in[], outNum
    getTotalStringCount(commonStringArray)
    {
        let count = 0;
        for(let x = 0; x < commonStringArray.length; x++)
        {
            count = count + commonStringArray[x].count;
        }
        return count;
    }

    shortenListSize(list, maxItemCount)
    {
        list = this.sortCommonStrings(list);
        let newList = []
        let minStringCount = 0;

        if(maxItemCount < list.length)
        {
            minStringCount = list[maxItemCount].count;
        }

        let listItem;

        for(let x = 0; x < list.length; x++)
        {
            listItem = list[x];

            if(listItem.count > minStringCount)
            {
                newList.push(listItem);
            }
        }
        return newList;
    }
}