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

        const sample = [
            { type: 'Crimes contra as pessoas', value: 86383 },
            { type: 'Crimes contra a integridade física', value: 56460 },
            { type: 'Crimes de homicídio voluntário consumado', value: 89},
            { type: 'Ofensa à integridade física voluntária simples', value: 23279 },
            { type: 'Violência doméstica contra cônjuge ou análogos', value: 24793},
            { type: 'Crimes contra o património',value: 172357},
            { type: 'Roubo por esticão e na via pública', value: 8941 },
            { type: 'Furto de veículo e em veículo motorizado', value: 31352 },
            { type: 'Crimes contra a identidade cultural e integridade pessoal', value:91},
            { type: 'Crimes contra a vida em sociedade', value: 42529 },
            { type: 'Condução de veículo com excesso de álcool', value: 16872},
            { type: 'Crimes contra o estado', value: 5269 },
            { type: 'Crimes contra animais de companhia', value: 2014 },
            { type: 'Crimes previstos em legislação avulsa', value: 26971 },
            { type: 'Condução sem habilitação legal', value: 9664 }
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
            .padding(0.1)
        
          
            
        const yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(sample, function(d) { return d.value; })]);
          
        
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
                .attr('y', (a) => yScale(a.value)- 20)
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
            .attr('x', (a) => xScale(a.type) + xScale.bandwidth() / 10)
            .attr('y', (a) => yScale(a.value))
            .attr('text-anchor', 'start')
            .text((a) => `${a.value}`)
          
          svg
            .append('text')
            .attr('class', 'label')
            .attr('x', -(height / 2) - margin)
            .attr('y', margin / 2.4 - 15)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Valor')
      
          svg.append('text')
            .attr('class', 'label')
            .attr('x', width / 2 + margin)
            .attr('y', 650)
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
            .attr('y', 800)
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