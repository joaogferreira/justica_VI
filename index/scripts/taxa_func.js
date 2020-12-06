var portugal = "portugal";
var continente = "continente";
var acores = "acores";
var madeira = "madeira";

window.onload = function() {
    d3.select("svg").remove();
            
        d3.csv("data/taxa_pt.csv", function(sample) {
            sample = sample.sort(function (a, b) {
                return d3.ascending(a.value, b.value);
            })

            var margin = {
                top: 45,
                right: 25,
                bottom: 15,
                left: 600
            };

            var width = 1500 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var svg = d3.select("#graphic").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            var x = d3.scale.linear()
                .range([0, width])
                .domain([0, 19]);

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

            
                document.getElementById("titulo").innerHTML = "Taxa de criminalidade em Portugal no ano 2019";
        });
}


async function updateLegend(newRegion) {
    if(newRegion ==undefined){
        return;
    }
    else if(newRegion=="portugal"){
        d3.select("svg").remove();
            
        d3.csv("data/taxa_pt.csv", function(sample) {
            sample = sample.sort(function (a, b) {
                return d3.ascending(a.value, b.value);
            })

            var margin = {
                top: 45,
                right: 25,
                bottom: 15,
                left: 600
            };

            var width = 1500 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var svg = d3.select("#graphic").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            var x = d3.scale.linear()
                .range([0, width])
                .domain([0, 19]);

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

            
                document.getElementById("titulo").innerHTML = "Taxa de criminalidade em Portugal no ano 2019";
        });
    }
    else if(newRegion=="continente"){
        d3.select("svg").remove();
            
        d3.csv("data/taxa_cont.csv", function(sample) {
            sample = sample.sort(function (a, b) {
                return d3.ascending(a.value, b.value);
            })

            var margin = {
                top: 45,
                right: 25,
                bottom: 15,
                left: 600
            };

            var width = 1500 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var svg = d3.select("#graphic").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            var x = d3.scale.linear()
                .range([0, width])
                .domain([0, 19]);

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
        d3.select("svg").remove();
            
        d3.csv("data/taxa_ac.csv", function(sample) {
            sample = sample.sort(function (a, b) {
                return d3.ascending(a.value, b.value);
            })

            var margin = {
                top: 45,
                right: 25,
                bottom: 15,
                left: 600
            };

            var width = 1500 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var svg = d3.select("#graphic").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            var x = d3.scale.linear()
                .range([0, width])
                .domain([0, 19]);

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
        
        d3.select("svg").remove();

        
        d3.csv("data/taxa_mad.csv", function(sample) {
            sample = sample.sort(function (a, b) {
                return d3.ascending(a.value, b.value);
            })


            var margin = {
                top: 45,
                right: 25,
                bottom: 15,
                left: 600
            };

            var width = 1500 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var svg = d3.select("#graphic").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var biggest_value=0;
            for (x in sample){
                if (+sample[x].value>biggest_value){
                    biggest_value=sample[x].value;
                }
            }

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

d3.select('#region')
    .on('change', function() {
        var newRegion = eval(d3.select(this).property('value'));
        updateLegend(newRegion);
    })

