var portugal = "portugal";
var continente = "continente";
var acores = "acores";
var madeira = "madeira";


async function updateLegend(newRegion) {
    if(newRegion ==undefined){
        return;
    }

    else if(newRegion=="madeira"){
      
        
        d3.selectAll("svg > *").remove();
            
        d3.csv("data/taxa_mad.csv", function(sample) {
            //sort bars based on value
            sample = sample.sort(function (a, b) {
                return d3.ascending(a.value, b.value);
            })

            //set up svg using margin conventions - we'll need plenty of room on the left for labels
            var margin = {
                top: 15,
                right: 25,
                bottom: 15,
                left: 60
            };

            var width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var svg = d3.select("#graphic").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var x = d3.scale.linear()
                .range([0, width])
                .domain([0, d3.max(sample, function (d) {
                    return d.value;
                })]);

            var y = d3.scale.ordinal()
                .rangeRoundBands([height, 0], .1)
                .domain(sample.map(function (d) {
                    return d.name;
                }));

            //make y axis to show bar names
            var yAxis = d3.svg.axis()
                .scale(y)
                //no tick marks
                .tickSize(0)
                .orient("left");

            var gy = svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)

            var bars = svg.selectAll(".bar")
                .data(sample)
                .enter()
                .append("g")

            //append rects
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

            //add a value label to the right of each bar
            bars.append("text")
                .attr("class", "label")
                //y position of the label is halfway down the bar
                .attr("y", function (d) {
                    return y(d.name) + y.rangeBand() / 2 + 4;
                })
                //x position is 3 pixels to the right of the bar
                .attr("x", function (d) {
                    return x(d.value) + 3;
                })
                .text(function (d) {
                    return d.value;
                });
            
        });

        
            
    }        
}



d3.select('#region')
    .on('change', function() {
        var newRegion = eval(d3.select(this).property('value'));
        updateLegend(newRegion);
    })

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}