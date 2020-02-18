import { Component, OnInit, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  constructor(
    public zone: NgZone
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(
      () => {
        this.initChartOne()
        this.initChartTwo()
        this.initChartThree()
        this.initChartFour()
        this.initChartFive()
        this.initChartSix()
        this.initChartSeven()
      }
    )
  }

  initChartOne() {
    let chart = am4core.create("chartdiv1", am4charts.XYChart3D);

    // Add data
    chart.data = [{
      "country": "Jan",
      "visits": 4025
    }, {
      "country": "Feb",
      "visits": 1882
    }, {
      "country": "Mar",
      "visits": 1809
    }, {
      "country": "Apr",
      "visits": 1322
    }, {
      "country": "May",
      "visits": 1122
    }, {
      "country": "Jun",
      "visits": 1114
    }, {
      "country": "Jul",
      "visits": 984
    }, {
      "country": "Aug",
      "visits": 711
    }, {
      "country": "Sep",
      "visits": 665
    }, {
      "country": "Oct",
      "visits": 580
    }, {
      "country": "Nov",
      "visits": 443
    }, {
      "country": "Dec",
      "visits": 441
    }];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.renderer.labels.template.hideOversized = false;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.tooltip.label.rotation = 270;
    categoryAxis.tooltip.label.horizontalCenter = "right";
    categoryAxis.tooltip.label.verticalCenter = "middle";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Countries";
    valueAxis.title.fontWeight = "bold";

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "country";
    series.name = "Visits";
    series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
    columnTemplate.stroke = am4core.color("#FFFFFF");

    columnTemplate.adapter.add("fill", function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    })

    columnTemplate.adapter.add("stroke", function(stroke, target) {
      return chart.colors.getIndex(target.dataItem.index);
    })

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.strokeOpacity = 0;
    chart.cursor.lineY.strokeOpacity = 0;

  }

  initChartTwo() {
    let chart = am4core.create("chartdiv2", am4charts.XYChart);
    chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = [{
      "country": "Jan",
      "visits": 3025
    }, {
      "country": "Feb",
      "visits": 1882
    }, {
      "country": "Mar",
      "visits": 1809
    }, {
      "country": "Apr",
      "visits": 1322
    }, {
      "country": "May",
      "visits": 1122
    }, {
      "country": "Jun",
      "visits": 1114
    }, {
      "country": "Jul",
      "visits": 984
    }, {
      "country": "Aug",
      "visits": 711
    }, {
      "country": "Sep",
      "visits": 665
    }];

    prepareParetoData();

    function prepareParetoData(){
        let total = 0;

        for(var i = 0; i < chart.data.length; i++){
            let value = chart.data[i].visits;
            total += value;
        }

        let sum = 0;
        for(var i = 0; i < chart.data.length; i++){
            let value = chart.data[i].visits;
            sum += value;   
            chart.data[i].pareto = sum / total * 100;
        }    
    }

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.tooltip.disabled = true;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "country";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    let hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    })


    let paretoValueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    paretoValueAxis.renderer.opposite = true;
    paretoValueAxis.min = 0;
    paretoValueAxis.max = 100;
    paretoValueAxis.strictMinMax = true;
    paretoValueAxis.renderer.grid.template.disabled = true;
    paretoValueAxis.numberFormatter = new am4core.NumberFormatter();
    paretoValueAxis.numberFormatter.numberFormat = "#'%'"
    paretoValueAxis.cursorTooltipEnabled = false;

    let paretoSeries = chart.series.push(new am4charts.LineSeries())
    paretoSeries.dataFields.valueY = "pareto";
    paretoSeries.dataFields.categoryX = "country";
    paretoSeries.yAxis = paretoValueAxis;
    paretoSeries.tooltipText = "pareto: {valueY.formatNumber('#.0')}%[/]";
    paretoSeries.bullets.push(new am4charts.CircleBullet());
    paretoSeries.strokeWidth = 2;
    paretoSeries.stroke = new am4core.InterfaceColorSet().getFor("alternativeBackground");
    paretoSeries.strokeOpacity = 0.5;

    // Cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panX";


  }

  initChartThree() {
    let chart = am4core.create("chartdiv3", am4charts.XYChart3D);

    // Add data
    chart.data = [{
        "country": "Jan",
        "year2017": 3.5,
        "year2018": 4.2
    }, {
        "country": "Feb",
        "year2017": 1.7,
        "year2018": 3.1
    }, {
        "country": "Mar",
        "year2017": 2.8,
        "year2018": 2.9
    }, {
        "country": "Apr",
        "year2017": 2.6,
        "year2018": 2.3
    }, {
        "country": "May",
        "year2017": 1.4,
        "year2018": 2.1
    }, {
        "country": "Jun",
        "year2017": 2.6,
        "year2018": 4.9
    }, {
        "country": "Jul",
        "year2017": 6.4,
        "year2018": 7.2
    }, {
        "country": "Aug",
        "year2017": 8,
        "year2018": 7.1
    }, {
        "country": "Sep",
        "year2017": 9.9,
        "year2018": 10.1
    }];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "GDP growth rate";
    valueAxis.renderer.labels.template.adapter.add("text", function(text) {
      return text + "%";
    });

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = "year2017";
    series.dataFields.categoryX = "country";
    series.name = "Year 2017";
    series.clustered = false;
    series.columns.template.tooltipText = "GDP grow in {category} (2017): [bold]{valueY}[/]";
    series.columns.template.fillOpacity = 0.9;

    let series2 = chart.series.push(new am4charts.ColumnSeries3D());
    series2.dataFields.valueY = "year2018";
    series2.dataFields.categoryX = "country";
    series2.name = "Year 2018";
    series2.clustered = false;
    series2.columns.template.tooltipText = "GDP grow in {category} (2017): [bold]{valueY}[/]";

  }

  initChartFour() {
    let chart = am4core.create("chartdiv4", am4charts.RadarChart);

    let data = [];
    let value1 = 500;
    let value2 = 600;

    for(var i = 0; i < 12; i++){
      let date = new Date();
      date.setMonth(i, 1);
      value1 -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 50);
      value2 -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 50);
      data.push({date:date, value1:value1, value2:value2})
    }

    chart.data = data;

    /* Create axes */
    let categoryAxis = chart.xAxes.push(new am4charts.DateAxis() as any);

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis() as any);
    valueAxis.extraMin = 0.2;
    valueAxis.extraMax = 0.2;
    valueAxis.tooltip.disabled = true;

    /* Create and configure series */
    let series1 = chart.series.push(new am4charts.RadarSeries());
    series1.dataFields.valueY = "value1";
    series1.dataFields.dateX = "date";
    series1.strokeWidth = 3;
    series1.tooltipText = "{valueY}";
    series1.name = "Series 2";
    series1.bullets.create(am4charts.CircleBullet);
    series1.dataItems.template.locations.dateX = 0.5;

    let series2 = chart.series.push(new am4charts.RadarSeries());
    series2.dataFields.valueY = "value2";
    series2.dataFields.dateX = "date";
    series2.strokeWidth = 3;
    series2.tooltipText = "{valueY}";
    series2.name = "Series 2";
    series2.bullets.create(am4charts.CircleBullet);
    series2.dataItems.template.locations.dateX = 0.5;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();

    chart.cursor = new am4charts.RadarCursor();

    chart.legend = new am4charts.Legend();
 
  }

  initChartFive() {
    let chart = am4core.create("chartdiv5", am4charts.ChordDiagram);


    chart.data = [
        { from: "A", to: "D", value: 10 },
        { from: "B", to: "D", value: 8 },
        { from: "B", to: "E", value: 4 },
        { from: "B", to: "C", value: 2 },
        { from: "C", to: "E", value: 14 },
        { from: "E", to: "D", value: 8 },
        { from: "C", to: "A", value: 4 },
        { from: "G", to: "A", value: 7 },
        { from: "D", to: "B", value: 1 }
    ];

    chart.dataFields.fromName = "from";
    chart.dataFields.toName = "to";
    chart.dataFields.value = "value";

    // make nodes draggable
    let nodeTemplate = chart.nodes.template;
    nodeTemplate.readerTitle = "Click to show/hide or drag to rearrange";
    nodeTemplate.showSystemTooltip = true;

    let nodeLink = chart.links.template;
    let bullet = nodeLink.bullets.push(new am4charts.CircleBullet());
    bullet.fillOpacity = 1;
    bullet.circle.radius = 5;
    bullet.locationX = 0.5;

    // create animations
    chart.events.on("ready", function() {
        for (var i = 0; i < chart.links.length; i++) {
            let link = chart.links.getIndex(i);
            let bullet = link.bullets.getIndex(0);

            animateBullet(bullet);
        }
    })

    function animateBullet(bullet) {
        let duration = 3000 * Math.random() + 2000;
        let animation = bullet.animate([{ property: "locationX", from: 0, to: 1 }], duration)
        animation.events.on("animationended", function(event) {
            animateBullet(event.target.object);
        })
    }


  }

  initChartSix() {
    let chart = am4core.create("chartdiv6", am4charts.RadarChart);
    chart.scrollbarX = new am4core.Scrollbar();

    let data = [];

    for(var i = 0; i < 20; i++){
      data.push({category: i, value:Math.round(Math.random() * 100)});
    }

    chart.data = data;
    chart.radius = am4core.percent(100);
    chart.innerRadius = am4core.percent(50);

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis() as any);
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;
    categoryAxis.renderer.grid.template.disabled = true;
    //categoryAxis.renderer.labels.template.disabled = true;
    let labelTemplate = categoryAxis.renderer.labels.template;
    labelTemplate.radius = am4core.percent(-60);
    labelTemplate.location = 0.5;
    labelTemplate.relativeRotation = 90;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis() as any);
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.tooltip.disabled = true;

    // Create series
    let series = chart.series.push(new am4charts.RadarColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "category";
    series.columns.template.strokeWidth = 0;
    series.tooltipText = "{valueY}";
    series.columns.template.radarColumn.cornerRadius = 10;
    series.columns.template.radarColumn.innerCornerRadius = 0;

    series.tooltip.pointerOrientation = "vertical";

    // on hover, make corner radiuses bigger
    let hoverState = series.columns.template.radarColumn.states.create("hover");
    hoverState.properties.cornerRadius = 0;
    hoverState.properties.fillOpacity = 1;


    series.columns.template.adapter.add("fill", function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    })

    // Cursor
    chart.cursor = new am4charts.RadarCursor();
    chart.cursor.innerRadius = am4core.percent(50);
    chart.cursor.lineY.disabled = true;

  }

  initChartSeven() {
    let chart = am4core.create("chartdiv7", am4charts.XYChart);

    let data = [];
    let value = 50;
    for(var i = 0; i < 300; i++){
      let date = new Date();
      date.setHours(0,0,0,0);
      date.setDate(i);
      value -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({date:date, value: value});
    }

    chart.data = data;

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}"

    series.tooltip.pointerOrientation = "vertical";

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.snapToSeries = series;
    chart.cursor.xAxis = dateAxis;

    //chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarX = new am4core.Scrollbar();
  }

}
