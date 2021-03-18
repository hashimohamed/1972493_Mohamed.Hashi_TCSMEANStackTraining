// #1 Store in session
var empObj = [];
function storeInSession() {
  console.log(empObj);
  sessionStorage.setItem("bloggingTable", JSON.stringify(empObj))
  console.log(empObj)
}
// function retrieveFromSession() {
//   var empObj = JSON.parse(sessionStorage.getItem("bloggingTable"));
//   console.log(empObj);
// }
// function addBlog() {
//   var data = readFormData();
//   // insertNewRecord(data);
//   empObj.push(data);
//   resetData();

// }
function addBlog() {
  var data = readFormData();
  if (sessionStorage.getItem("bloggingTable") != null) {
    empObj = JSON.parse(sessionStorage.getItem("bloggingTable"))
  }
  empObj.push(data);

  sessionStorage.setItem("bloggingTable", JSON.stringify(empObj))
  resetData();
  retrieveFromSession();
}

function readFormData() {
  var obj = {}
  obj.titleInfo = document.getElementById("title").value;
  obj.descIfno = document.getElementById("desc").value;
  obj.imageInfo = document.getElementById("imageId").files[0].name;
  console.log(obj);
  return obj;
}
function retrieveFromSession() {
  var data = JSON.parse(sessionStorage.getItem("bloggingTable"));
  var itemContainer = document.getElementById("itemContainer");
  itemContainer.innerHTML = "";
  var arrayLength = 0;
  if (data != null) {
    for (var i = 0; i < data.length; i++) {      
      itemContainer.innerHTML += `<div><span style="color:blue">Title:  </span>${data[i].titleInfo}<br /><span style="color:blue">Description: </span>${data[i].descIfno}<br /><img style="width:200px" src="${data[i].imageInfo}" /></div><hr>`;
    }
  }
  
}
function resetData() {
  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("imageId").value = "";
}