var portugal = "portugal";
var continente = "continente";
var acores = "acores";
var madeira = "madeira";


// function that wraps around the d3 pattern (bind, add, update, remove)
async function updateLegend(newData) {
    if(newData=="portugal"){
      /*
      const sample = [{}]


      d3.csv("data/crimes_pt.csv").then(function(data) {
        for(i=0;i<data.length;i++){
          const aux = { type: data[i].Tipo , value: +data[i].Valor };
          sample.push(aux);

        }
      });
      */
      
      /*
     Crimes de homicídio voluntário consumado,89
     Crimes contra a integridade física,56460
     Ofensa à integridade física voluntária simples,23279
     Violência doméstica contra cônjuge ou análogos,24793
     Crimes contra o património,172357
     Roubo por esticão e na via pública,8941
     Furto de veículo e em veículo motorizado,31352
     Crimes contra a identidade cultural e integridade pessoal,91
     Crimes contra a vida em sociedade,42529
     Condução de veículo com taxa de álcool igual ou superior a 1.2 g/l,16872
     Crimes contra o estado,5269
     Crimes contra animais de companhia,2014
     Crimes previstos em legislação avulsa,26971
     Condução sem habilitação legal,9664 */
      
        const sample = [
            { type: 'Crimes contra as pessoas', value: 78.9 },
            { type: 'Crimes de homicídio voluntário consumado', value: 75.1 },
            { type: 'Ofensa à integridade física voluntária simples', value: 68.0 },
            { type: 'Violência doméstica contra cônjuge ou análogos', value: 67.0},
            { type: 'Crimes contra o património',value: 65.6},
            { type: 'Roubo por esticão e na via pública', value: 65.1 },
            { type: 'Furto de veículo e em veículo motorizado', value: 61.9 },
            { type: 'Crimes contra a identidade cultural e integridade pessoal', value: 60.4 },
            { type: 'Crimes contra a integridade pessoal', value: 59.6 },
            { type: 'Crimes contra o estado', value: 59.6 }
          ];
        
        
        
        
        const svg = d3.select('svg');
        const svgContainer = d3.select('#container');
        
        const margin = 80;
        const width = 1000 - 2 * margin;
        const height = 600 - 2 * margin;

        const chart = svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);

        const xScale = d3.scaleBand()
            .range([0, width])
            .domain(sample.map((s) => s.type))
            .padding(0.4)
        
          
            
        const yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, 100]);
        
        const makeYLines = () => d3.axisLeft()
            .scale(yScale)
      
        chart.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale))
            .selectAll(".tick text")  
        .call(wrap, xScale.bandwidth());
      
        chart.append('g')
            .call(d3.axisLeft(yScale));

            chart.append('g')
            .attr('class', 'grid')
            .call(makeYLines()
              .tickSize(-width, 0, 0)
              .tickFormat('')
            )
      
          const barGroups = chart.selectAll()
            .data(sample)
            .enter()
            .append('g')
      
          barGroups
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (g) => xScale(g.type))
            .attr('y', (g) => yScale(g.value))
            .attr('height', (g) => height - yScale(g.value))
            .attr('width', xScale.bandwidth())
            .on('mouseenter', function (actual, i) {
              d3.selectAll('.value')
                .attr('opacity', 1)
      
              d3.select(this)
                .transition()
                .duration(300)
                .attr('opacity', 1)
                .attr('x', (a) => xScale(a.type) - 5)
                .attr('width', xScale.bandwidth() + 10)
      
              const y = yScale(actual.value)
      
              line = chart.append('line')
                .attr('id', 'limit')
                .attr('x1', 0)
                .attr('y1', y)
                .attr('x2', width)
                .attr('y2', y)
      
              barGroups.append('text')
                .attr('class', 'divergence')
                .attr('x', (a) => xScale(a.type) + xScale.bandwidth() / 2)
                .attr('y', (a) => yScale(a.value) + 100)
                .attr('fill', 'white')
                .attr('text-anchor', 'middle')
                .text((a, idx) => {
                  const divergence = (a.value - actual.value).toFixed(1)
                  
                  let text = ''
                  if (divergence > 0) text += '+'
                  text += `${divergence}`
      
                  return idx !== i ? text : '';
                })
      
            })
            .on('mouseleave', function () {
              d3.selectAll('.value')
                .attr('opacity', 1)
      
              d3.select(this)
                .transition()
                .duration(300)
                .attr('opacity', 1)
                .attr('x', (a) => xScale(a.type))
                .attr('width', xScale.bandwidth())
      
              chart.selectAll('#limit').remove()
              chart.selectAll('.divergence').remove()
            })
      
          barGroups 
            .append('text')
            .attr('class', 'value')
            .attr('x', (a) => xScale(a.type) + xScale.bandwidth() / 2)
            .attr('y', (a) => yScale(a.value) + 30)
            .attr('text-anchor', 'middle')
            .text((a) => `${a.value}`)
          
          svg
            .append('text')
            .attr('class', 'label')
            .attr('x', -(height / 2) - margin)
            .attr('y', margin / 2.4)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Valor')
      
          svg.append('text')
            .attr('class', 'label')
            .attr('x', width / 2 + margin)
            .attr('y', height + margin * 1.7)
            .attr('text-anchor', 'middle')
            .text('Tipos de crime')
      
          svg.append('text')
            .attr('class', 'title')
            .attr('x', width / 2 + margin)
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .text('Crimes registados em ' + newData.charAt(0).toUpperCase() + newData.slice(1) + ' em 2019')
      
          svg.append('text')
            .attr('class', 'source')
            .attr('x', width - margin / 2)
            .attr('y', height + margin * 1.7)
            .attr('text-anchor', 'start')
            .text('Source: INE, 2020')

    }


    else if (newData=="continente"){
        //Exibir dadops de Continente
        d3.selectAll("svg > *").remove();
    }
    else if (newData=="acores"){
        //Exibir dados de Açores
        d3.selectAll("svg > *").remove();
    }
    else if(newData=="madeira"){
        //Exibir dados de Madeira
        d3.selectAll("svg > *").remove();
    }
}


// handle on click event
d3.select('#region')
    .on('change', function() {
    var newData = eval(d3.select(this).property('value'));
    updateLegend(newData);
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