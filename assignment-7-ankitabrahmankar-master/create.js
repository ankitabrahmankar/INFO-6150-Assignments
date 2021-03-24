const { fromEvent, Subject } = rxjs;

var globalArray = new Map();
const subject = new Subject();
let subscription;

// append row to the HTML table
function appendRow() {
  var tbl = document.getElementById("dataTable"), // table reference
    row = tbl.insertRow(tbl.rows.length); // append table row
  console.log("row length", tbl.rows.length);

  // insert table cells to the new row
  for (let i = 0; i < tbl.rows[0].cells.length; i++) {
    var val = String.fromCharCode(65 + i);
    createCell(row.insertCell(i), "row", val + tbl.rows.length);
  }
}

// append column to the HTML table
function appendColumn() {
  var tbl = document.getElementById("dataTable"), // table reference
    i;
  // open loop for each row and append cell
  for (i = 0; i < tbl.rows.length; i++) {
    var val = String.fromCharCode(65 + tbl.rows[i].cells.length);
    createCell(
      tbl.rows[i].insertCell(tbl.rows[i].cells.length),
      "col",
      val + (i + 1)
    );
  }
}

// create DIV element and append to the table cell
function createCell(cell, style, id) {
  var element = document.createElement("input");
  element.type = "txtbox[]";
  element.setAttribute("id", id);
  //   element.setAttribute('value',id);
  element.setAttribute("class", style);
  element.setAttribute("className", style);
  // element.setAttribute('onchange','myFunction(this.value, this.id)');
  cell.appendChild(element);

  // const changeEvent = fromEvent(element, "change");
  // changeEvent.subscribe((x) => myFunction(x.target.value, x.target.id));

  const clickEvent = fromEvent(element, "focusin");
  clickEvent.subscribe((x) => onTextboxClick(x.target.id));

  const focusEvent = fromEvent(element, "focusout");
  focusEvent.subscribe((x) => myFunction(x.target.value, x.target.id));
}

//Function to subscribe subject on textbox --
function subscribeTextboxValue(id) {
  subscription = subject.subscribe({
    next: (changedValue) => {
      let id = changedValue;
      //      let fType = changedValue.split("-")[1];

      for (const [key, value] of globalArray.entries()) {
        if (value.includes(id)) {
          var bd = BODMAS(key, value);
          !bd ? Sum(key, value) : "";
        }
      }

      console.log(`Observable ${changedValue}`);
      console.log("inside observable id -->", id);
    },
  });
}

function onTextboxClick(id) {
  console.log("text box id ==>", id);
  if (globalArray.has(id)) {
    console.log("text box id in ga==>", id);
    document.getElementById(id).value = globalArray.get(id);
  }
}

function deleteRows() {
  var tbl = document.getElementById("dataTable"), // table reference
    lastRow = tbl.rows.length - 1; // set the last row index
  console.log("--------->", lastRow);
  if (lastRow >= 1) {
    tbl.deleteRow(lastRow);
  } else {
    alert("Cannot delete the last Row");
  }
}

// delete table columns with index greater then 0
function deleteColumns() {
  var tbl = document.getElementById("dataTable"), // table reference
    lastCol = tbl.rows[0].cells.length - 1; // set the last column index
  console.log("Last column---->", lastCol);
  if (lastCol >= 1) {
    for (i = 0; i < tbl.rows.length; i++) {
      tbl.rows[i].deleteCell(lastCol);
    }
  } else {
    alert("Cannot delete the last column");
  }
}

function myFunction(value, id) {
  var tbl = document.getElementById("dataTable");
  currentCellId = id;
  console.log("Current cell id --->", id);
  console.log("this is from " + value + " on change");

  //Validation for circular reference start --
  var s = new Set();

  for (const [key, value] of globalArray.entries()) {
    if (value.includes(id)) {
      s.add(key);
    }
  }

  s.forEach((val) => {
    if (value.includes(val)) {
      alert("Circular reference between " + id + " and " + val);
      return;
    }
  });

  if (!isNaN(parseInt(value))) {
    console.log("subscription-->", subscription);
    subscription !== undefined ? subscription.unsubscribe() : "";
    globalArray.delete(id);
  } else {
    subscribeTextboxValue(id);
    console.log("subscription in else -->", subscription);
  }

  //Validation for circular reference ends here --

  //adding the value for curret cell in global array
  if (isNaN(parseInt(value)) && value !== "undefined" && value !== "") {
    console.log("Checking value to be added in global array-->", value);
    globalArray.set(currentCellId, value);
  }
  console.log("Global Array ---->", globalArray);
  regexSUM = /^=SUM\([A-Z][0-9]{1,6}:[A-Z][0-9]{1,6}\)$/;
  //regexBODMAS = /^=([A-Z][0-9]{1,6}[-+/*][A-Z][0-9]{1,6})*/;
  regexBODMAS = /^=([A-Z][0-9]{1,6}[-+/*][A-Z][0-9]{1,6})*/;
  value = value.toUpperCase();

  console.log("value--------->", value);
  if (value.match(regexSUM)) {
    console.log("Entered correct formula");
    Sum(currentCellId, value);
  } else if (value.match(regexBODMAS)) {
    BODMAS(currentCellId, value);
  } else {
    //alert("Column or row does not exist !");
    console.log("Entered wrong formula");
  }

  subject.next(id);
  // console.log('value of x and id --> ', x, id)
}

function Sum(currentCellId, formula) {
  var tbl = document.getElementById("dataTable");
  globalArray.set(currentCellId, formula);
  console.log("Global Array ---->", globalArray);

  //check for sum across the rows
  newstr = formula.slice(0, -1).substring(5).split(":");
  console.log("new split string --->", newstr);

  elem1 = newstr[0][0];
  elem2 = newstr[1][0];
  elem3 = newstr[0].substring(1);

  elem4 = newstr[1].substring(1);
  //console.log("elem3", elem3, elem4);

  var existingCol = 64 + tbl.rows[0].cells.length;
  console.log("Exisiting columns ------>", existingCol);
  var inputCol1 = elem1.charCodeAt(0);
  var inputCol2 = elem2.charCodeAt(0);
  var inputrow1 = elem3;
  var inputrow2 = elem4;
  console.log("Input columns ------>", inputCol1, inputCol2);

  //Validation to check the column in formula exists in table for not
  console.log("Condition 1", inputCol1 <= existingCol);
  console.log("Condition 2", inputCol2 <= existingCol);
  console.log("Condition 3", inputrow1 <= tbl.rows.length, tbl.rows.length);
  console.log("Condition 4", inputrow2 <= tbl.rows.length);

  if (
    inputCol1 <= existingCol &&
    inputCol2 <= existingCol &&
    inputrow1 <= tbl.rows.length &&
    inputrow2 <= tbl.rows.length
  ) {
    console.log("valid column entry");
    console.log("----------------->", elem1, elem2);
    if (elem1 == elem2) {
      console.log("Sum across the column");
      columnSum(newstr[0], newstr[1], currentCellId);
    } else if (elem3 == elem4) {
      console.log("Sum across the row");
      rowSum(newstr[0], newstr[1], currentCellId);
    } else {
      console.log("Invalid Formula");
      alert("Invalid Formula!");
    }
  } else {
    alert("Column or row does not exist !");
    console.log("Column or row does not exist !");
  }
}

function BODMAS(id, formula) {
  var tbl = document.getElementById("dataTable");
  //adding the formula for curret cell in global array
  //   globalArray.set(currentCellId, value );
  console.log("Global Array ---->", globalArray);
  equation_split = [];
  equation_split = formula.split(/[-+*/=]/);
  let valueObject = {};
  console.log("Splitted equation ---->", equation_split);
  var existingColumn = 64 + tbl.rows[0].cells.length;
  for (let i = 1; i < equation_split.length; i++) {
    var cellIDChar = equation_split[i][0].charCodeAt(0);
    var cellIDNum = equation_split[i].substring(1);
    console.log(
      "Cell ID sepearation -- >",
      cellIDChar,
      existingColumn,
      cellIDNum,
      tbl.rows.length
    );
    console.log("Condition 1", cellIDChar > existingColumn);
    console.log("Condition 2", cellIDNum > tbl.rows.length);
    if (cellIDChar > existingColumn || cellIDNum > tbl.rows.length) {
      alert("Column or row does not exist !");
      return;
    }
  }

  for (let i = 1; i < equation_split.length; i++) {
    var cellValue = document.getElementById(equation_split[i]).value;
    console.log("Cell value --->", cellValue);
    var key = equation_split[i];
    var con = cellValue === "" || cellValue === "=" + id;
    valueObject = { ...valueObject, [key]: con ? 0 : cellValue };
  }
  var equation = formula.replace("=", "");
  equation = equation.replace(/[A-Z][0-9]/gi, function (matched) {
    return valueObject[matched];
  });

  console.log("valueobject--> ", valueObject);
  console.log("equation-->", equation);
  console.log(eval(equation));

  document.getElementById(id).value = eval(equation);
  return true;
}

function columnSum(index1, index2, resultCell) {
  let sum = 0;
  //index1 = A1 and index2 = A6
  for (let i = index1.substring(1); i <= index2.substring(1); i++) {
    console.log("i============>", i);
    var id = index1[0].concat(i);
    console.log(id);
    var inputValue = document.getElementById(id).value;
    console.log("Value ---->", inputValue);

    sum = sum + parseInt(inputValue);
  }

  var result = document.getElementById(resultCell);
  result.value = sum.toString();
  console.log("Sum ----->", sum);
  console.log("Global Array ---->", globalArray);
}

function rowSum(index1, index2, resultCell) {
  let sum = 0;
  let rowId = index1.substring(1);
  console.log("Row ID------->", rowId);
  for (let i = index1[0].charCodeAt(0); i <= index2[0].charCodeAt(0); i++) {
    var id = String.fromCharCode(i).concat(rowId);
    var inputValue = document.getElementById(id).value;
    console.log("Value ---->", inputValue);
    sum = sum + parseInt(inputValue);
  }
  var result = document.getElementById(resultCell);
  result.value = sum.toString();
  console.log("Sum ----->", sum);
}

function exportTableToCSV(filename) {
  var csv = [];
  var tbl = document.getElementById("dataTable");
  var rows = tbl.querySelectorAll("tr");
  //console.log("Rows=========>",rows);
  for (var i = 0; i < rows.length; i++) {
    var row = [],
      cols = rows[i].querySelectorAll("td");
    //console.log("Cols=========>",cols);
    for (var j = 0; j < cols.length; j++) {
      row.push(cols[j].querySelector("input").value);
    }
    csv.push(row.join(","));
  }

  // Download CSV file
  downloadCSV(csv.join("\n"), filename);
}

function downloadCSV(csv, filename) {
  var csvFile;
  var downloadLink;

  // CSV file
  csvFile = new Blob([csv], { type: "text/csv" });

  // Download link
  downloadLink = document.createElement("a");

  // File name
  downloadLink.download = filename;

  // Create a link to the file
  downloadLink.href = window.URL.createObjectURL(csvFile);

  // Hide download link
  downloadLink.style.display = "none";

  // Add the link to DOM
  document.body.appendChild(downloadLink);

  // Click download link
  downloadLink.click();
}

function UploadCSV() {
  var fileUpload = document.getElementById("fileUpload");
  var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
  if (regex.test(fileUpload.value.toLowerCase())) {
    if (typeof FileReader != "undefined") {
      var reader = new FileReader();
      reader.onload = function (e) {
        var obj = document.getElementById("dataTable");
        if (obj) {
          obj.remove();
        }
        var tbl = document.createElement("TABLE");
        tbl.setAttribute("id", "dataTable");
        tbl.setAttribute("class", "table");

        var dvCSV = document.getElementById("dvCSV");
        //dvCSV.innerHTML = "";
        dvCSV.appendChild(tbl);
        var rows = e.target.result.split("\n");
        console.log("rows--->", rows);
        console.log("Rows of CSV ------>", rows[0]);
        for (let i = 0; i < rows.length; i++) {
          // var cells = rows[i].split(",");
          if (rows[i] !== "") {
            appendRow();
          }
        }

        var cells = rows[0].split(",");
        for (var j = 0; j < cells.length; j++) {
          appendColumn();
        }

        for (var i = 0; i < rows.length; i++) {
          if (rows[i] !== "") {
            var column = rows[i].split(",");

            for (var j = 0; j < column.length; j++) {
              var val = String.fromCharCode(65 + j);
              var id = val + (i + 1);
              console.log("id-->", id);
              var txt = document.getElementById(id);

              txt.value = column[j];
            }
          }
        }
      };
      reader.readAsText(fileUpload.files[0]);
    } else {
      alert("This browser does not support HTML5.");
    }
  } else {
    alert("Please upload a valid CSV file.");
  }
}
