import Alert from "react-native";

const nameField = new RegExp("^[a-zA-Z-]+[a-zA-Z -]*$");
const reqField = new RegExp("[a-zA-Z-0-9]+");
const emailField = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
const numberField = new RegExp("^[0-9]*$");
const priceField = new RegExp("^[0-9.]*$");

export function getItemType(typeId) {
  const types = {
    1: "SHEEP",
    2: "CATTLE",
    3: "PIG",
    4: "HORSE"
  };

  return types[typeId];
}

export function removeDocAttribute(data) {
  return data.map(item => item.doc);
}

export function isUndefined(state) {
  if (typeof state === "undefined") {
    return true;
  }
  return false;
}

export function convertToArray(item) {
  if (!Array.isArray(item)) {
    return [];
  }
  return item;
}

export function isInArray(array, item) {
  return array.indexOf(item) > -1;
}

function _ascendingCompare(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/**
 * @summary: this function group the data by attribute
 * @param: data - [array] - object array to be group by the attribute
 * @param: attribute - [String] - attribute name
 * @return [object array] - array object contains attribute value as key and group data as data
 * ex:- [{key: 'groupAttribute', data: [{name: 'auction 1'}, {name: 'auction 2'}]}, {...}]
 */
export function groupBy(data, attribute) {
  let groupObject = {};
  data.forEach(datum => {
    groupObject[datum[attribute]] = groupObject[datum[attribute]] || [];
    groupObject[datum[attribute]].push(datum);
  });

  return Object.keys(groupObject).map(key => {
    return { key: key, data: groupObject[key] };
  });
}

export function groupByKey(collection, property) {
  let i = 0,
    val,
    index,
    values = [],
    result = {};
  for (; i < collection.length; i++) {
    if (!isUndefined(collection[i][property])) {
      val = collection[i][property];
      index = values.indexOf(val);
      if (index > -1) result[val].push(collection[i]);
      else {
        values.push(val);
        result[val] = [collection[i]];
      }
    }
  }
  return result;
}

function compareByLotNumber(a, b) {
  let firstLotNumber = 0;
  let secondLotNumber = 0;
  if (!isUndefined(a.lotNumber) && a.lotNumber !== "") {
    firstLotNumber = Number(a.lotNumber);
  }
  if (!isUndefined(b.lotNumber) && b.lotNumber !== "") {
    secondLotNumber = Number(b.lotNumber);
  }

  return firstLotNumber - secondLotNumber;
}

export function groupByKey2(
  collection,
  property,
  collectionId = "_id",
  returnProperties,
  sortBy = false
) {
  let i = 0,
    val,
    index,
    values = [],
    result = {};

  if (sortBy === "lotNumber") collection.sort(compareByLotNumber);

  for (; i < collection.length; i++) {
    if (
      !isUndefined(collection[i][property]) &&
      collection[i][property] !== "" &&
      collection[i][property] !== null
    ) {
      val = collection[i][property];
      index = values.indexOf(val);
      if (index > -1) result[val].push(collection[i][collectionId]);
      else {
        values.push(val);
        result[val] = [collection[i][collectionId]];
      }
    }
  }
  if (returnProperties) return { ...result, visibleIds: values };
  return result;
}

//return from this format 2017-10-17 00:00:00
export function formatDateTime(date, time = "00:00:00") {
  const dateArr = date.split("/");
  if (time)
    return (
      dateArr[2] +
      "-" +
      twoDigits(dateArr[0]) +
      "-" +
      twoDigits(dateArr[1]) +
      " " +
      time
    );
  return dateArr[2] + "-" + dateArr[0] + "-" + dateArr[1];
}

function twoDigits(number) {
  return ("0" + number).slice(-2);
}

/*convert to date fromat from 'YYYY-MM-DD' to 'DD/MM/YYYY'*/
export function formatUsDate(date) {
  const dateArr = date.split("-");
  return dateArr[2] + "/" + dateArr[1] + "/" + dateArr[0];
}

export function generatePenNumber(reservedPenArray) {
  if (!Array.isArray(reservedPenArray) || reservedPenArray.length === 0) {
    return null;
  }
  let startPenNumber = reservedPenArray[0];
  let endPenNumber =
    reservedPenArray.length === 1
      ? null
      : reservedPenArray[reservedPenArray.length - 1];
  return endPenNumber === null
    ? startPenNumber.toString()
    : startPenNumber + "-" + endPenNumber;
}

export function setPenNumber(reservedPenArray) {
  let from = "";
  let to = "";
  let fromCharacter = "0";
  let toCharacter = "0";
  let fromPrefix = "0";

  if (!Array.isArray(reservedPenArray) || reservedPenArray.length === 0) {
    return null;
  }

  let startPenNumber = reservedPenArray[0];
  let firstPenNumberArr = reservedPenArray[0].split(/(\d+)/);

  if (firstPenNumberArr[0] !== "") {
    fromPrefix = firstPenNumberArr[0];
    startPenNumber = firstPenNumberArr[1] + firstPenNumberArr[2];
  }

  let endPenNumber =
    reservedPenArray.length === 1
      ? null
      : reservedPenArray[reservedPenArray.length - 1];

  if (endPenNumber === null) {
    let startPenNumberArray = startPenNumber
      .toString()
      .match(/([0-9]+)([A-Za-z]+)/);

    if (
      typeof startPenNumberArray === "undefined" ||
      startPenNumberArray === null
    ) {
      from = to = startPenNumber.toString();
    } else {
      from = to = startPenNumberArray[1];
      fromCharacter = toCharacter = startPenNumberArray[2];
    }
  } else {
    let startPenNumberArray = startPenNumber
      .toString()
      .match(/([0-9]+)([A-Za-z]+)/);
    if (
      typeof startPenNumberArray === "undefined" ||
      startPenNumberArray === null
    ) {
      from = startPenNumber.toString();
    } else {
      from = startPenNumberArray[1];
      fromCharacter = startPenNumberArray[2];
    }

    let endPenNumberArray = endPenNumber
      .toString()
      .match(/([0-9]+)([A-Za-z]+)/);
    if (
      typeof endPenNumberArray === "undefined" ||
      endPenNumberArray === null
    ) {
      to = endPenNumber.toString();
      toCharacter = fromCharacter;
    } else {
      to = endPenNumberArray[1];
      toCharacter = endPenNumberArray[2];
    }
  }
  return { fromPrefix, from, fromCharacter, to, toCharacter };
}

export function generatePenNumbers(from, to) {
  if (isUndefined(from.prefix) || from.prefix === "" || from.prefix === "0") {
    return generatePenArray(from, to);
  }
  return generatePenArray(from, to).map(penNumber => from.prefix + penNumber);
}

function generatePenArray(from, to) {
  if (from.number === to.number) {
    if (
      (isUndefined(from.character) || from.character === "0") &&
      (isUndefined(to.character) || to.character === "0")
    ) {
      return [from.number.toString()];
    }
    if (from.character === to.character) {
      return [from.number + from.character];
    }
    if (isUndefined(from.character) || from.character === "0") {
      return [from.number.toString()].concat(
        _getPenRange(from.number, to.character)
      );
    }
    return _getPenRange(from.number, to.character, from.character);
  }

  let numberRange = [];
  let characterRange = [];

  if (!isUndefined(from.character) && from.character !== "0") {
    numberRange = [from.number + from.character].concat(
      getNumberRange(to.number, from.number + 1)
    );
  } else {
    numberRange = getNumberRange(to.number, from.number);
  }
  if (!isUndefined(to.character) && to.character !== "0") {
    characterRange = _getPenRange(to.number, to.character);
  }
  return numberRange.concat(characterRange);
}

function getNumberRange(end, start) {
  if (isUndefined(start)) return false;
  if (isUndefined(end) || isNaN(end) || start === end || end === 0)
    return [start.toString()];
  return Array(end - start + 1)
    .fill()
    .map((_, index) => start + index)
    .sort(_ascendingCompare)
    .map(number => number.toString());
}

function _getPenRange(penNumber, lastCharacter, firstCharacter = "A") {
  return _getCharacterRange(lastCharacter, firstCharacter).map(
    character => penNumber + character
  );
}

function _getCharacterRange(lastCharacter, firstCharacter = "A") {
  let firstValue = firstCharacter.charCodeAt(0);
  let lastValue = lastCharacter.charCodeAt(0);
  let resultArr = [];

  while (lastValue >= firstValue) {
    resultArr.unshift(String.fromCharCode(lastValue));
    lastValue -= 1;
  }
  return resultArr;
}

export function generateCharArray(firstCharacter, lastCharacter) {
  let characterArray = [],
    i = firstCharacter.charCodeAt(0),
    j = lastCharacter.charCodeAt(0);
  for (; i <= j; ++i) {
    characterArray.push({
      label: String.fromCharCode(i),
      value: String.fromCharCode(i)
    });
  }
  return characterArray;
}

export function isArraysEquals(array1, array2) {
  if (!Array.isArray(array1) || !Array.isArray(array1)) return false;
  if (array1.length !== array2.length) return false;
  for (let i = array1.length; i--; ) {
    if (array1[i] !== array2[i]) return false;
  }
  return true;
}

//if all array1 elements contains in array2 return true otherwise return false
export function isArrayContains(array1, array2) {
  return array1.every(elem => array2.indexOf(elem) > -1);
}

//validation methods return true -> invalid and false -> valid
export function checkName(val) {
  if (!nameField.test(val) || isUndefined(val)) {
    return true;
  }
  return false;
}

export function checkPicker(val) {
  if (val === "0" || isUndefined(val)) {
    return true;
  }
  return false;
}

export function checkReqField(val) {
  if (!reqField.test(val) || isUndefined(val)) {
    return true;
  }
  return false;
}

export function checkEmail(val) {
  if (isUndefined(val)) return false;
  if (val === "") return false; //optional
  if (!emailField.test(val)) {
    return true;
  }
  return false;
}

export function checkInteger(val) {
  if (isUndefined(val) || val === "" || !numberField.test(val)) return true;
  return false;
}

export function checkNumber(val) {
  if (isUndefined(val) || val === "" || !priceField.test(val)) return true;
  return false;
}

export function checkContactNumber(val) {
  if (isUndefined(val)) return false;
  if (val === "") return false; //optional
  if (!numberField.test(val) || val.length !== 10) {
    return true;
  }
  return false;
}

export function checkBSB(val) {
  if (isUndefined(val)) return false;
  if (val === "") return false; //optional
  if (!numberField.test(val) || val.length !== 6) {
    return true;
  }
  return false;
}

export function checkAccountNo(val) {
  if (isUndefined(val)) return false;
  if (val === "") return false; //optional
  if (!numberField.test(val) || val.length < 6 || val.length > 10) {
    return true;
  }
  return false;
}

export function checkCode(val) {
  if (isUndefined(val)) return false;
  if (val === "") return false; //optional
  if (val.length < 3) {
    return true;
  }
  return false;
}

export function checkUserName(val) {
  if (isUndefined(val)) return false;
  if (val === "") return false; //optional
  if (val.length < 2) {
    return true;
  }
  return false;
}

//get auction type name by id
export function getAuctionTypeName(auctionTypeId) {
  switch (auctionTypeId) {
    case 1:
      return "live";
    case 6:
      return "general";
    case 3:
      return "private";
    default:
      return "live";
  }
}

export function getAuctionSubTypeNameById(subTypeId) {
  switch (subTypeId) {
    case 0:
      return "General";
    case 1:
      return "Sheep-Lamb";
    case 2:
      return "Cattle";
    case 3:
      return "Pig";
    case 4:
      return "Horse";
    case 5:
      return "Paddoc";
    case 6:
      return "Over the hook";
    case 7:
      return "Online";
    case "general":
      return "General";
    default:
      return "Sheep-Lamb";
  }
}

export function getLocationById(locationId) {
  switch (locationId) {
    case 1:
      return "Melbourne";
    case 2:
      return "Bendigo";
    default:
      return "Melbourne";
  }
}
//get auction type name by id
export function getAuctionTypeIdByName(auctionTypeId) {
  switch (auctionTypeId) {
    case "live":
      return 1;
    case "general":
      return 6;
    case "private":
      return 3;
    default:
      return false;
  }
}

export function displayAlert(title, msg, options = null) {
  Alert.alert(
    title,
    msg,
    options ? options : [{ text: "OK", style: "cancel" }]
  );
}
//this function return relevant id name of the breeds, categories, etc.
export function getIdName(name) {
  switch (name) {
    case "ages":
      return "aucSubTypeAgeID";
    case "additionalClassifications":
      return "aucAdditionalClassificationID";
    case "breeds":
      return "aucSubTypeBreedID";
    case "categories":
      return "aucSaleCategoryID";
    case "markings":
      return "aucSubTypeMarkingID";
    case "sexTypes":
      return "aucSubTypeSexID";
    case "subTypes":
      return "aucSubTypeID";
    case "types":
      return "aucTypeID";
    default:
      return "_id";
  }
}
// @param displayObjects array
//ex:- [{name: 'breeds', id: 'efg123'}, {name: 'categories', id: 'eft124'}, ...]
export function displaySubTypes(configs, subTypeId, displayObjects) {
  return displayObjects
    .reduce((displayData, displayObj) => {
      if (displayObj.id && displayObj.id !== "") {
        return (
          displayData +
          _getSubTypeName(
            configs[displayObj.name][subTypeId],
            displayObj.name,
            displayObj.id,
            displayObj.crossBreed
          ) +
          " - "
        );
      }
      return displayData;
    }, "")
    .replace(/-\s*$/, "");
}
//@param data - array
//ex:- [{id: 'abc123', name: 'breeds'}, {id: 'abc124', name: 'breeds'}]
function _getSubTypeName(data, type, id, crossBreed = false) {
  if (data.filter(option => option.id === Number(id)).length === 0) {
    return null;
  }
  let crossBreedString = "";
  if (type === "breeds" && crossBreed) crossBreedString = " X";
  return (
    data.filter(option => option.id === Number(id))[0]["name"] +
    crossBreedString
  );
}

export function removeDuplicates(arr, prop) {
  let new_arr = [];
  let lookup = {};

  for (let i in arr) {
    // eslint-disable-line
    lookup[arr[i][prop]] = arr[i];
  }

  for (let i in lookup) {
    // eslint-disable-line
    new_arr.push(lookup[i]);
  }
  return new_arr;
}

export function multipleSearch(Arr, propertiesArr, valuesArr) {
  let result = [];
  if (Arr && Arr.length > 0) {
    let index = 1;
    for (let property of propertiesArr) {
      for (let obj of Arr) {
        for (let value of valuesArr["param" + index]) {
          if (property.indexOf("|") >= 0) {
            let subStates = valuesArr[property.split("|")[1]];
            let subState = subStates[obj.doc[property.split("|")[1]]];
            let objValue = subState[property.split("|")[0]].toString();
            if (objValue.indexOf(value.toString()) >= 0) {
              result.push(obj);
            }
          } else {
            let objValue = obj.doc[property].toString();
            if (objValue.indexOf(value.toString()) >= 0) {
              result.push(obj);
            }
          }
        }
      }
      index++;
    }
  }
  return removeDuplicates(result, "id");
}

export function asyncLoop(iterations, func, callback) {
  let index = 0;
  let done = false;
  let loop = {
    next() {
      if (done) {
        return;
      }

      if (index < iterations) {
        index++;
        func(loop);
      } else {
        done = true;
        callback();
      }
    },

    iteration() {
      return index - 1;
    },

    break() {
      done = true;
      callback();
    }
  };
  loop.next();
  return loop;
}

export function getIconColor(item) {
  const colors = {
    done: "#A5D6A7",
    none: "#ef9a9a",
    pending: "#FFCC80"
  };

  return colors[item];
}

export function paginate(array, page_size, page_number) {
  --page_number; // because pages logically start with 1, but technically with 0
  return array.slice(page_number * page_size, (page_number + 1) * page_size);
}

export const sg = (obj = {}, key, returnType = "str") => {
  let rType;

  switch (returnType) {
    case "str":
      rType = "";
      break;
    default:
      rType = {};
  }

  if (isUndefined(obj)) {
    console.warn("caller 1", sg.caller);
    return rType;
  }
  if (isUndefined(obj[key])) {
    console.warn("caller 2", sg.caller);
    return rType;
  }
  return obj[key];
};
