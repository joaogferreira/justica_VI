var portugal = "portugal";
var continente = "continente";
var acores = "acores";
var madeira = "madeira";

window.onload = function() {
    /*
        Limpar SVG já utlizado anteriormente
    */
    d3.select("svg").remove();
    
    /*
        Definir SVG
    */    
    d3.csv("data/taxa_pt.csv", function(sample) {
        //Ordenar os valores de forma crescente
        sample = sample.sort(function (a, b) {
            return d3.ascending(a.value, b.value);
        })

        //Dimensions
        var margin = {top: 45,right: 25,bottom: 15,left: 600};
        var width = 1500 - margin.left - margin.right;
        var height = 500 - margin.top - margin.bottom;

        //Definir SVG
        var svg = d3.select("#graphic").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        //Eixo X
        var x = d3.scale.linear().range([0, width]).domain([0, 19]);

        //Eixo Y - Incluir todos os crimes (coluna name no CSV , d.name) neste eixo
        var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0], .1)
            .domain(sample.map(function (d) {
                return d.name;
            }));

        /*
            Construir gráfico
        */
        var yAxis = d3.svg.axis()
            .scale(y)
            .tickSize(0)
            .orient("left");

        var gy = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        var bars = svg.selectAll(".bar")
            .data(sample)
            .enter()
            .append("g")

        bars.append("rect")
            .attr("class", "bar")
            .attr("y", function (d) {
                return y(d.name);
            })
            .attr("height", y.rangeBand())
            .attr("x", 0)
            .attr("width", function (d) {
                return x(d.value);
            });

        bars.append("text")
            .attr("class", "label")
            .attr("y", function (d) {
                return y(d.name) + y.rangeBand() / 2 + 4;
            })
            .attr("x", function (d) {
                return x(d.value) + 3;
            })
            .text(function (d) {
                return d.value;
            });

        
            document.getElementById("titulo").innerHTML = "Taxa de criminalidade em Portugal no ano 2019";
    });
}


async function update(newRegion) {
    if(newRegion ==undefined){
        return;
    }
    else if(newRegion=="portugal"){
        /*
            Limpar SVG já utlizado anteriormente
        */
        d3.select("svg").remove();
        
        //Ler CSV
        d3.csv("data/taxa_pt.csv", function(sample) {
            //Ordenar os dados por ordem crescente
            sample = sample.sort(function (a, b) {
                return d3.ascending(a.value, b.value);
            })

            var margin = {top: 45,right: 25,bottom: 15,left: 600};

            var width = 1500 - margin.left - margin.right;
            var height = 500 - margin.top - margin.bottom;

            /*
                Definir SVG
            */
            var svg = d3.select("#graphic").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            //Eixo X
            var x = d3.scale.linear().range([0, width]).domain([0, 19]);

            //Eixo Y
            var y = d3.scale.ordinal()
                .rangeRoundBands([height, 0], .1)
                .domain(sample.map(function (d) {
                    return d.name;
                }));

            var yAxis = d3.svg.axis()
                .scale(y)
                .tickSize(0)
                .orient("left");

            /*
                Construir Gráfico
            */
            var gy = svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)

            var bars = svg.selectAll(".bar")
                .data(sample)
                .enter()
                .append("g")

            bars.append("rect")
                .attr("class", "bar")
                .attr("y", function (d) {
                    return y(d.name);
                })
                .attr("height", y.rangeBand())
                .attr("x", 0)
                .attr("width", function (d) {
                    return x(d.value);
                });

            bars.append("text")
                .attr("class", "label")
                .attr("y", function (d) {
                    return y(d.name) + y.rangeBand() / 2 + 4;
                })
                .attr("x", function (d) {
                    return x(d.value) + 3;
                })
                .text(function (d) {
                    return d.value;
                });

            
                document.getElementById("titulo").innerHTML = "Taxa de criminalidade em Portugal no ano 2019";
        });
    }
    else if(newRegion=="continente"){
        //Processo semelhante ao para Portugal
        d3.select("svg").remove();
            
        d3.csv("data/taxa_cont.csv", function(sample) {
            sample = sample.sort(function (a, b) {
                return d3.ascending(a.value, b.value);
            })

            var margin = {top: 45,right: 25,bottom: 15,left: 600};

            var width = 1500 - margin.left - margin.right;
            var height = 500 - margin.top - margin.bottom;

            var svg = d3.select("#graphic").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            var x = d3.scale.linear().range([0, width]).domain([0, 19]);

            var y = d3.scale.ordinal()
                .rangeRoundBands([height, 0], .1)
                .domain(sample.map(function (d) {
                    return d.name;
                }));

            var yAxis = d3.svg.axis()
                .scale(y)
                .tickSize(0)
                .orient("left");

            var gy = svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)

            var bars = svg.selectAll(".bar")
                .data(sample)
                .enter()
                .append("g")

            bars.append("rect")
                .attr("class", "bar")
                .attr("y", function (d) {
                    return y(d.name);
                })
                .attr("height", y.rangeBand())
                .attr("x", 0)
                .attr("width", function (d) {
                    return x(d.value);
                });

            bars.append("text")
                .attr("class", "label")
                .attr("y", function (d) {
                    return y(d.name) + y.rangeBand() / 2 + 4;
                })
                .attr("x", function (d) {
                    return x(d.value) + 3;
                })
                .text(function (d) {
                    return d.value;
                });

            
                document.getElementById("titulo").innerHTML = "Taxa de criminalidade em Portugal Continental no ano 2019";
        });
    }
    else if(newRegion=="acores"){
        //Processo semelhante ao para Portugal
        d3.select("svg").remove();
            
        d3.csv("data/taxa_ac.csv", function(sample) {
            sample = sample.sort(function (a, b) {
                return d3.ascending(a.value, b.value);
            })

            var margin = {top: 45,right: 25,bottom: 15,left: 600};

            var width = 1500 - margin.left - margin.right;
            var height = 500 - margin.top - margin.bottom;

            var svg = d3.select("#graphic").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            var x = d3.scale.linear().range([0, width]).domain([0, 19]);

            var y = d3.scale.ordinal()
                .rangeRoundBands([height, 0], .1)
                .domain(sample.map(function (d) {
                    return d.name;
                }));

            var yAxis = d3.svg.axis()
                .scale(y)
                .tickSize(0)
                .orient("left");

            var gy = svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)

            var bars = svg.selectAll(".bar")
                .data(sample)
                .enter()
                .append("g")

            bars.append("rect")
                .attr("class", "bar")
                .attr("y", function (d) {
                    return y(d.name);
                })
                .attr("height", y.rangeBand())
                .attr("x", 0)
                .attr("width", function (d) {
                    return x(d.value);
                });

            bars.append("text")
                .attr("class", "label")
                .attr("y", function (d) {
                    return y(d.name) + y.rangeBand() / 2 + 4;
                })
                .attr("x", function (d) {
                    return x(d.value) + 3;
                })
                .text(function (d) {
                    return d.value;
                });

            
                document.getElementById("titulo").innerHTML = "Taxa de criminalidade na Região autónoma dos Açores em 2019";
        });
    }

    else if(newRegion=="madeira"){
        //Processo semelhante ao para Portugal
        d3.select("svg").remove();

        d3.csv("data/taxa_mad.csv", function(sample) {
            sample = sample.sort(function (a, b) {
                return d3.ascending(a.value, b.value);
            })


            var margin = {top: 45,right: 25,bottom: 15,left: 600};

            var width = 1500 - margin.left - margin.right;
            var height = 500 - margin.top - margin.bottom;

            var svg = d3.select("#graphic").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var x = d3.scale.linear()
                .range([0, width])
                .domain([0, 12]);

            var y = d3.scale.ordinal()
                .rangeRoundBands([height, 0], .1)
                .domain(sample.map(function (d) {
                    return d.name;
                }));


            var yAxis = d3.svg.axis()
                .scale(y)
                .tickSize(0)
                .orient("left");

            var gy = svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)

            var bars = svg.selectAll(".bar")
                .data(sample)
                .enter()
                .append("g")


            bars.append("rect")
                .attr("class", "bar")
                .attr("y", function (d) {
                    return y(d.name);
                })
                .attr("height", y.rangeBand())
                .attr("x", 0)
                .attr("width", function (d) {
                    return x(d.value);
                });


            bars.append("text")
                .attr("class", "label")
                .attr("y", function (d) {
                    return y(d.name) + y.rangeBand() / 2 + 4;
                })
                .attr("x", function (d) {
                    return x(d.value) + 3;
                })
                .text(function (d) {
                    return d.value;
                });

            
                document.getElementById("titulo").innerHTML = "Taxa de criminalidade na Região autónoma da Madeira em 2019";
        });          
    }        
}

/*
Chamar a função update sempre que o dropdown é alterado
*/
d3.select('#region')
    .on('change', function() {
        var newRegion = eval(d3.select(this).property('value'));
        update(newRegion);
    })

