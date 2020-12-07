var portugal = "portugal";
var continente = "continente";
var acores = "acores";
var madeira = "madeira";


window.onload = function(){
    render_chart(["portugal","continente","acores","madeira"]);
}



function render_chart(selected){
    console.log("->"+selected);
    d3.selectAll("svg > *").remove();

    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // The scale spacing the groups:
    var x0 = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1);

    // The scale for spacing each group's bar:
    var x1 = d3.scaleBand()
        .padding(0.05);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    if(selected.length=="4"){
            var z = d3.scaleOrdinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b"]); 
    }
    else if(selected.length=="3"){
            var z = d3.scaleOrdinal()
            .range(["#98abc5", "#8a89a6", "#7b6888"]); 
    }
    else if(selected.length=="2"){
        var z = d3.scaleOrdinal()
        .range(["#98abc5", "#000000"]); 
    }
    else if(selected.length=="1"){
        var z = d3.scaleOrdinal().range(["#990000"])
    }
    else{
        var z = d3.scaleOrdinal().range(["#FFFFFF"])
    }


    /*
    var z = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);  */

    var linha=1;
    d3.csv("data/data.csv", function(d, i, columns, rows) {
        
        for (var i = 1; i < columns.length; ++i) {
            //console.log(linha,i);
            if(i==1){
                if(selected.includes("portugal")){
                    //console.log("pt");
                    d[columns[i]] = +d[columns[i]];
                }
                //console.log("Portugal",d[columns[i]]);
            }
            else if(i==2){
                if(selected.includes("continente")){
                    //console.log("cont");
                    d[columns[i]] = +d[columns[i]];
                }
                //console.log("Continente",d[columns[i]]);
            }
            else if(i==3){
                if(selected.includes("acores")){
                    //console.log("ac");
                    d[columns[i]] = +d[columns[i]];
                }
                //console.log("Acores",d[columns[i]]);
            }
            else if(i==4){
                if(selected.includes("madeira")){
                    //console.log("mad");
                    d[columns[i]] = +d[columns[i]];
                }
                //console.log("Madeira",d[columns[i]]);
            }
            
            
        }
        linha+=1;
        return d;
    }).then(function(data) {


        var keys = data.columns.slice(1);
        console.log("BEFORE:"+keys);

        
        for(x in keys){
            if(selected.includes("portugal")==false){
                if(keys[x]=="Portugal"){
                    keys.splice(x,1);
                }
            }
            if(selected.includes("continente")==false){
                if(keys[x]=="Continente"){
                    keys.splice(x,1);
                }
            }
            if(selected.includes("acores")==false){
                if(keys[x]=="Açores"){
                    keys.splice(x,1);
                }
            }
            if(selected.includes("madeira")==false){
                if(keys[x]=="Madeira"){
                    keys.splice(x,1);
                }
            }
            
        }

        console.log("AFTER:"+keys);

        x0.domain(data.map(function(d) { return d.State; }));
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

        g.append("g")
            .selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("class","bar")
            .attr("transform", function(d) { return "translate(" + x0(d.State) + ",0)"; })
            .selectAll("rect")
            .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
            .enter().append("rect")
            .attr("x", function(d) { return x1(d.key); })
            .attr("y", function(d) { return y(d.value); })
            .attr("width", x1.bandwidth())
            .attr("height", function(d) { return height - y(d.value); })
            .attr("fill", function(d) { return z(d.key); });
            //por aqui um mouseover

        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x0));

        g.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y).ticks(null, "s"))
            .append("text")
            .attr("x", 2)
            .attr("y", y(y.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .text("Nº");

        var legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width - 17)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", z)
            .attr("stroke", z)
            .attr("stroke-width",2)
            .on("click",function(d) { update(d) });

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function(d) { return d; });

        var filtered = [];

        ////
        //// Update and transition on click:
        ////

        function update(d) {

            //
            // Update the array to filter the chart by:
            //

            // add the clicked key if not included:
            if (filtered.indexOf(d) == -1) {
                filtered.push(d);
                // if all bars are un-checked, reset:
                if(filtered.length == keys.length) filtered = [];
            }
            // otherwise remove it:
            else {
                filtered.splice(filtered.indexOf(d), 1);
            }

            //
            // Update the scales for each group(/states)'s items:
            //
            var newKeys = [];
            keys.forEach(function(d) {
                if (filtered.indexOf(d) == -1 ) {
                    newKeys.push(d);
                }
            })
            x1.domain(newKeys).rangeRound([0, x0.bandwidth()]);
            y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { if (filtered.indexOf(key) == -1) return d[key]; }); })]).nice();

            // update the y axis:
            svg.select(".y")
                .transition()
                .call(d3.axisLeft(y).ticks(null, "s"))
                .duration(500);


            //
            // Filter out the bands that need to be hidden:
            //
            var bars = svg.selectAll(".bar").selectAll("rect")
                .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })

            bars.filter(function(d) {
                    return filtered.indexOf(d.key) > -1;
                })
                .transition()
                .attr("x", function(d) {
                    return (+d3.select(this).attr("x")) + (+d3.select(this).attr("width"))/2;
                })
                .attr("height",0)
                .attr("width",0)
                .attr("y", function(d) { return height; })
                .duration(500);

            //
            // Adjust the remaining bars:
            //
            bars.filter(function(d) {
                    return filtered.indexOf(d.key) == -1;
                })
                .transition()
                .attr("x", function(d) { return x1(d.key); })
                .attr("y", function(d) { return y(d.value); })
                .attr("height", function(d) { return height - y(d.value); })
                .attr("width", x1.bandwidth())
                .attr("fill", function(d) { return z(d.key); })
                .duration(500);


            // update legend:
            legend.selectAll("rect")
                .transition()
                .attr("fill",function(d) {
                    if (filtered.length) {
                        if (filtered.indexOf(d) == -1) {
                            return z(d);
                        }
                        else {
                            return "white";
                        }
                    }
                    else {
                        return z(d);
                    }
                })
                .duration(100);
        }
    });

}

var selected = ["portugal","continente","acores","madeira"];
d3.selectAll("input").on("change", function(d){
    if(d3.select(this).property("checked")){
        selected.push(this.value);
    }
    else{
        for(var i=0;i<selected.length;i++){
            if(selected[i]===this.value){
                selected.splice(i,1);
            }
        }
    }
    render_chart(selected);
  });


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
