function fillTable () {
    var myTable = document.getElementById("myTable");
    myTable.rows[5].cells[6].innerHTML = '23';   
}

function yearLoad () {
    var loadedData;
    fetch("year.json")
        .then(response => response.json())
        .then(parsed => loadedData);
console.log(loadedData);
};