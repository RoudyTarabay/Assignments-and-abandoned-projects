var zoom_scale=1;

  drawMap()
    function drawMap(){
      var counties=0;
      var width = $(window).width(),
      height = $(window).height();
      var projection = d3.geoAlbersUsa()
      //.scale(1000)
      .translate([width / 2, height / 2]);
      var path = d3.geoPath()
      .projection(projection);
      var svg = d3.select("body").append("svg")
      .attr("id","mapsvg")
      .attr("width", width)
      .attr("height", height);
      var g=svg.append("g");
      d3.json("us.json", function(error, us) {

        if (error) throw error;
        g.insert("path", ".graticule")
        .datum(topojson.feature(us, us.objects.land))
        .attr("class", "land")
        .attr("d", path)
        .attr("style","opacity:0")
        .transition().duration(500)
        .attr("style","opacity:1")


        g.insert("path", ".graticule")
        .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
        .attr("class", "state-boundary")
        .attr("d", path);



g.insert("path", ".graticule")
      .datum(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b && !(a.id / 1000 ^ b.id / 1000);}))
      .attr("class", "county-boundary invisible")
      .attr("d", path)
d3.csv("data/unidata2013.csv",function(error,data){
  d3.selectAll(".overlay").attr("style","display:none")
   var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Name: </strong> <span style='color:red'>" + d.INSTNM+"</span></strong>"
  })
  svg.call(tip);


g.selectAll(".spin").data(data).enter()
.append("a")
    .attr("class","spine")
    //.attr("r", 1)
    //.attr("cx",0)
    .on('mouseover', function(d){
      d3.select("#name").html(d.INSTNM);
      d3.select(".chart").attr("style","visibility:visible");
      //percentageOfDegree(json_2013p1,d.INSTNM.trim(),"pie1");
      //raceChart(json_2013p1,d.INSTNM.trim(),"pie2")
      //loan(json_2012more,json_2013more,d.INSTNM.trim(),'line')



    })
    //.transition().duration(2000)
    .attr("transform", function(d,i){
      if (d.LONGITUDE!="NULL"&&d.LATITUDE!="NULL"&&projection([d.LONGITUDE,d.LATITUDE])!=null){
        return "translate("+projection([d.LONGITUDE,d.LATITUDE])+")";
      }
    })
    .attr("style","opacity:0")
    .transition().duration(function(d,i){
      return i*1.5;
    })
    .attr("style","opacity:1")

    d3.selectAll(".spine")
    .append("text")
    .attr("font-size","12px")
    .attr("class","university-icons")
    .text(function(d){return '\uf19c'})
    .on("mouseover",function(d){

      if(zoom_scale!==1){
        d3.select(this).attr("style","font-size:"+(5/(zoom_scale/3))*2+"px");
      }
      else{
        d3.select(this).attr("style","font-size:24px");
      }
        //d3.select(this).attr("style","font-size:"+(parseInt(d3.select(this).style("font-size"))*2+"px"));
    })
    .on("mouseout",function(d){
      console.log(zoom_scale)

      if(zoom_scale!==1){
        d3.select(this).attr("style","font-size:"+5/(zoom_scale/3)+"px");
      }
      else{
        d3.select(this).attr("style","font-size:12px");
      }


    })
  });
  d3.select('svg').on('click', function(){d3.select(".chart").attr("style","visibility:hidden");})



  var zoom = d3.zoom().on("zoom",function() {
     zoom_scale=d3.event.transform.k;
     console.log(zoom_scale)
    if(counties==0&&zoom_scale>3){
      console.log("in")
      /*g.insert("path", ".graticule")
      .datum(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b; }))
      .attr("class", "county-boundary")
      .attr("d", path)*/
      d3.selectAll(".county-boundary").classed("invisible",false);

      counties=1;
    }
    if(zoom_scale<4){
     d3.selectAll(".county-boundary").classed("invisible",true);
      counties=0;
    }
    g.attr("transform",d3.event.transform);
            //g.selectAll("circle")
           // .attr("r", nodeRadius / d3.event.scale);
           g.selectAll("path")
            .style('stroke-width', 0.5 / zoom_scale )
            .attr("d", path.projection(projection));
            g.selectAll(".university-icons").attr("font-size",5/(zoom_scale/3)+"px")
          }).scaleExtent([1, 1000]);

  svg.call(zoom);




});
      d3.select(self.frameElement).style("height", height + "px");



      var path = d3.geoPath()
      .projection(projection)

    }
