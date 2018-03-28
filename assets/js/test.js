// function tablePopulate(input) {
//   var thetaVal = [];
//   var table = document.getElementById("table");
//   thetaVal.push(input.match(/.{2}/g));
//
//   console.log(thetaVal);
//   thetaVal.forEach(function(thetaVal) {
//     for (var v = 0; v < 8; v++) {
//       thetaVal.push("");
//     }
//     for (var i = 0; i < thetaVal.length / 16; i++) {
//     for (var i = 0; i < 13; i++) {
//       //cells
//       for (var j = 0; j < 16; j++) {
//
//         table.rows[i].cells[j].innerHTML = thetaVal[i];
//
//       }
//     }
//   });
// }
// var totalRows = 13;
// var cellsInRow = 1;
//
//
// function tablePopulate(input) {
//
//
//
//    get the reference for the body
//   var div1 = document.getElementById('div1');
//
//    creates a <table> element
//   var tbl = document.createElement("table");
//
//   var thetaVal = [];
//   thetaVal.push(input.match(/.{2}/g));
//   thetaVal.forEach(function(thetaVal){
//    creating rows
//   for (var r = 0; r < totalRows; r++) {
//     var row = document.createElement("tr");
//
//      create cells in row
//     for (var c = 0; c < cellsInRow; c++) {
//       var cell = document.createElement("td");
//
//       var cellText = document.createTextNode(thetaVal);
//       cell.appendChild(cellText);
//       row.appendChild(cell);
//
//     }
//
//     tbl.appendChild(row);  add the row to the end of the table body
//   }
// });
//   div1.appendChild(tbl);  appends <table> into <div1>
//
// }
//
function tablePopulate(input) {
  var array = [];
  array.push(input.match(/.{2}/g));
  var count = 0;
  var totalCells = 16;

  array.forEach(function(array) {

  //   declare html variable (a string holder):
  for (var v =0; v < 8; v++){
    array.push("")
  }
    var html = '';
    for (var i = 0; i < 13; i++) {
  //     add opening <tr> tag to the string:
      html += '<tr>';
      for (var j = 0; j < totalCells; j++) {
    //     add <td> elements to the string:
      html += '<td>' + array[count] + '</td>';
        count++;
      }
  //     add closing </tr> tag to the string:
      html += '</tr>';
    }
    //   append the whole created html string to the body:
    $('#div1').append(html);

    //    reset the count:
    count = 0;

  });
}
