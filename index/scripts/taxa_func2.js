var portugal = "portugal";
var continente = "continente";
var acores = "acores";
var madeira = "madeira";


window.onload = function(){
    build_chart(["portugal","continente","acores","madeira"]);
}


function build_chart(selected){
    /*
    Limpar SVG já utlizado anteriormente
    */
    d3.selectAll("svg > *").remove();

    /*
    Definir SVG
    */
    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Eixo X - Criar escala
    var x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);
    var x1 = d3.scaleBand().padding(0.05);

    //Eixo Y - Criar escala
    var y = d3.scaleLinear().rangeRound([height, 0]);
    

    /*
        Definir as cores das barras de acordo com o número de regiões que temos para exibir
    */
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
        .range(["#98abc5", "#8a89a6"]); 
    }
    else if(selected.length=="1"){
        var z = d3.scaleOrdinal().range(["#98abc5"])
    }
    else{
        var z = d3.scaleOrdinal().range(["#98abc5"])
    }

    
    /*
        Iterar sobre o CSV
    */
    var linha=1;
    d3.csv("data/data_taxa.csv", function(d, i, columns, rows) {
        //Se a região não estiver incluída na lista passada à função não guardamos os dados do CSV para por no gráfico 
        for (var i = 1; i < columns.length; ++i) {
            if(i==1){
                if(selected.includes("portugal")){
                    d[columns[i]] = +d[columns[i]];
                }
            }
            else if(i==2){
                if(selected.includes("continente")){
                    d[columns[i]] = +d[columns[i]];
                }
            }
            else if(i==3){
                if(selected.includes("acores")){                
                    d[columns[i]] = +d[columns[i]];
                }
            }
            else if(i==4){
                if(selected.includes("madeira")){
                    d[columns[i]] = +d[columns[i]];
                }
            }
        }
        linha+=1;
        return d;
    }).then(function(data) {
        var keys = data.columns.slice(1);
        //Se a região não estiver incluída na lista passada como argumento à função eliminamos essa key da lista de keys (ou seja, os dados não vão ser exibidos)
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

        x0.domain(data.map(function(d) { return d.Crime; }));
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

        /*
            Construção do gráfico
        */
        g.append("g")
            .selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("class","bar")
            .attr("transform", function(d) { return "translate(" + x0(d.Crime) + ",0)"; })
            .selectAll("rect")
            .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
            .enter().append("rect")
            .attr("x", function(d) { return x1(d.key); })
            .attr("y", function(d) { return y(d.value); })
            .attr("width", x1.bandwidth())
            .attr("height", function(d) { return height - y(d.value); })
            .attr("fill", function(d) { return z(d.key); });

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

        var subtitle = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        subtitle.append("rect")
            .attr("x", width - 17)
            .attr("width", 15)
            .attr("height", 15)
            .attr("fill", z)
            .attr("stroke", z)
            .attr("stroke-width",2)
            .on("click",function(d) { update(d) });

        subtitle.append("text")
            .attr("x", width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function(d) { return d; });

        

        /*
            Função update - Source: https://bl.ocks.org/63anp3ca/6bafeb64181d87750dbdba78f8678715
        */
        var filtered = [];
        function update(d) {
            if (filtered.indexOf(d) == -1) {
                filtered.push(d);
                if(filtered.length == keys.length) filtered = [];
            }
            else {
                filtered.splice(filtered.indexOf(d), 1);
            }
            var newKeys = [];
            keys.forEach(function(d) {
                if (filtered.indexOf(d) == -1 ) {
                    newKeys.push(d);
                }
            })
            x1.domain(newKeys).rangeRound([0, x0.bandwidth()]);
            y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { if (filtered.indexOf(key) == -1) return d[key]; }); })]).nice();

            svg.select(".y")
                .transition()
                .call(d3.axisLeft(y).ticks(null, "s"))
                .duration(500);

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
            subtitle.selectAll("rect")
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

/*
Chamar a função build_chart sempre que a checkbox é alterada
*/
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
    build_chart(selected);
  });


/*
Casos em que o texto do eixo dos X é extenso e fica ilegível
Source: http://bl.ocks.org/LGBY4/204b1c74962cbcb33feba263e0fb4ad2
*/
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
