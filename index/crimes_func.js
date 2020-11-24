var portugal = "portugal";
var continente = "continente";
var acores = "acores";
var madeira = "madeira";


// function that wraps around the d3 pattern (bind, add, update, remove)
function updateLegend(newData) {
    if(newData=="portugal"){
        //Exibir dados de Portugal
        console.log(true);
    }
    else if (newData=="continente"){
        //Exibir dadops de Continente
        console.log(true);
    }
    else if (newData=="acores"){
        //Exibir dados de Açores
        console.log(true);
    }
    else if(newData=="madeira"){
        //Exibir dados de Madeira
        console.log(true);
    }
}


// handle on click event
d3.select('#region')
    .on('change', function() {
    var newData = eval(d3.select(this).property('value'));
    updateLegend(newData);
});