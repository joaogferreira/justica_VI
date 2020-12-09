var portugal = "portugal";
var continente = "continente";
var acores = "acores";
var madeira = "madeira";


window.onload = function(){
    render_chart(["2015","2016","2017","2018","2019"]);
}


function render_chart(selected){
    //Limpar o gráfico 
    d3.selectAll("svg > *").remove();

    //Definir SVG
    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);

    //Bars
    var x1 = d3.scaleBand().padding(0.05);

    var y = d3.scaleLinear().rangeRound([height, 0]);

    /*
    Atribuição de cores a cada barra de acordo com o número de barras a visualizar
    */
    if(selected.length=="5"){
            var z = d3.scaleOrdinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b","#6c487c"]); 
    }
    else if(selected.length=="4"){
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
    Ler CSV com os dados
    */
    var linha=1;
    d3.csv("data/data_vigilancia.csv", function(d, i, columns, rows) {
        
        for (var i = 1; i < columns.length; ++i) {
            if(i==1){
                if(selected.includes("2015")){
                    d[columns[i]] = +d[columns[i]];
                }
            }
            else if(i==2){
                if(selected.includes("2016")){
                    d[columns[i]] = +d[columns[i]];
                }
            }
            else if(i==3){
                if(selected.includes("2017")){
                    d[columns[i]] = +d[columns[i]];
                }
            }
            else if(i==4){
                if(selected.includes("2018")){
                    d[columns[i]] = +d[columns[i]];
                }
            }
            else if(i==5){
                if(selected.includes("2019")){
                    d[columns[i]] = +d[columns[i]];
                }
            }   
        }
        linha+=1;
        return d;
    }).then(function(data) {


        var keys = data.columns.slice(1);
        
        /*
        Keys apenas com os anos pretendidos 
        Remover os anos que não são pretendidos
        */
        for(x in keys){
            if(selected.includes("2015")==false){
                if(keys[x]=="2015"){
                    keys.splice(x,1);
                }
            }
            if(selected.includes("2016")==false){
                if(keys[x]=="2016"){
                    keys.splice(x,1);
                }
            }
            if(selected.includes("2017")==false){
                if(keys[x]=="2017"){
                    keys.splice(x,1);
                }
            }
            if(selected.includes("2018")==false){
                if(keys[x]=="2018"){
                    keys.splice(x,1);
                }
            }
            if(selected.includes("2019")==false){
                if(keys[x]=="2019"){
                    keys.splice(x,1);
                }
            }
            
        }

        x0.domain(data.map(function(d) { return d.Crime; }));

        x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        
        y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

        /*
        Build graph
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

            svg.select(".y").transition().call(d3.axisLeft(y).ticks(null, "s")).duration(500);

            var bars = svg.selectAll(".bar").selectAll("rect").data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })

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
Chamar a função render_chart sempre que os valores seleccionados mudam
*/
var selected = ["2015","2016","2017","2018","2019"];
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


