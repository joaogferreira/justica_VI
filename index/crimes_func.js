var portugal = "pt";
var continente = "continente";
var acores = "acores";
var madeira = "madeira";


// function that wraps around the d3 pattern (bind, add, update, remove)
function updateLegend(newData) {
    console.log(newData);
}


// handle on click event
d3.select('#region')
    .on('change', function() {
    var newData = eval(d3.select(this).property('value'));
    updateLegend(newData);
});