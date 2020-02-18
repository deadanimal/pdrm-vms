import { Component, OnInit, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
am4core.useTheme(am4themes_animated);

import * as L from 'leaflet';

@Component({
  selector: 'app-vessel',
  templateUrl: './vessel.component.html',
  styleUrls: ['./vessel.component.scss']
})
export class VesselComponent implements OnInit {

  public chartSpeedo: am4charts.GaugeChart
  public chartDistance: am4charts.XYChart
  public chartIdle: am4charts.XYChart

  leafletOptions = {
    layers: [
      L.tileLayer(
        'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
        {
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        }
      )
    ],
    zoom: 7,
    center: L.latLng(5.899815, 103.039459)
  };

  layers = [
    L.marker([5.899815, 103.039459], {
      icon: L.icon({
        iconSize: [35,35],
        iconUrl: 'assets/img/icons/marker/marine-marker.svg' 
      })
    })
  ]


  constructor(
    public zone: NgZone
  ) { }

  ngOnInit() {
    //this.initChartDistance()
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(
      () => {
        this.initChartSpeedo()
        this.initChartDistance()
        this.initChartIdle()
      }
    )
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(
      () => {
        if (this.chartDistance) {
          this.chartDistance.dispose()
        }
        if (this.chartIdle) {
          this.chartIdle.dispose()
        }
        if (this.chartSpeedo) {
          this.chartSpeedo.dispose()
        }
      }
    )
  }

  initChartSpeedo() {
    this.chartSpeedo = am4core.create("chartSpeedo", am4charts.GaugeChart);
    this.chartSpeedo.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    this.chartSpeedo.innerRadius = -35;

    let axis = this.chartSpeedo.xAxes.push(new am4charts.ValueAxis() as any);
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
    axis.renderer.grid.template.strokeOpacity = 0.3;

    let colorSet = new am4core.ColorSet();

    let range0 = axis.axisRanges.create();
    range0.value = 0;
    range0.endValue = 50;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = colorSet.getIndex(0);
    range0.axisFill.zIndex = - 1;

    let range1 = axis.axisRanges.create();
    range1.value = 50;
    range1.endValue = 80;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = colorSet.getIndex(2);
    range1.axisFill.zIndex = -1;

    let range2 = axis.axisRanges.create();
    range2.value = 80;
    range2.endValue = 100;
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = colorSet.getIndex(4);
    range2.axisFill.zIndex = -1;

    let hand = this.chartSpeedo.hands.push(new am4charts.ClockHand());

    // using chart.setTimeout method as the timeout will be disposed together with a chart
    this.chartSpeedo.setTimeout(randomValue, 2000);

    function randomValue() {
      hand.showValue(Math.random() * 100, 1000, am4core.ease.cubicOut);
      this.chartSpeedo.setTimeout(randomValue, 2000);
    }

  }

  initChartDistance() {
    this.chartDistance = am4core.create("chartDistance", am4charts.XYChart);

    // Add data
    this.chartDistance.data = [{
      "date": new Date(2018, 3, 20),
      "value": 90
    }, {
      "date": new Date(2018, 3, 21),
      "value": 102
    }, {
      "date": new Date(2018, 3, 22),
      "value": 65
    }, {
      "date": new Date(2018, 3, 23),
      "value": 62
    }, {
      "date": new Date(2018, 3, 24),
      "value": 55
    }, {
      "date": new Date(2018, 3, 25),
      "value": 81,
      "disabled": false
    }];
    
    // Create axes
    let dateAxis = this.chartDistance.xAxes.push(new am4charts.DateAxis());
    
    // Create value axis
    let valueAxis = this.chartDistance.yAxes.push(new am4charts.ValueAxis());
    
    // Create series
    let lineSeries = this.chartDistance.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.valueY = "value";
    lineSeries.dataFields.dateX = "date";
    lineSeries.name = "Sales";
    lineSeries.strokeWidth = 3;
    lineSeries.strokeDasharray = "5,4";
    
    // Add simple bullet
    let bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
    bullet.disabled = true;
    bullet.propertyFields.disabled = "disabled";
    
    let secondCircle = bullet.createChild(am4core.Circle);
    secondCircle.radius = 6;
    secondCircle.fill = this.chartDistance.colors.getIndex(8);
    
    
    bullet.events.on("inited", function(event){
      animateBullet(event.target.circle);
    })
    
    
    function animateBullet(bullet) {
      let animation = bullet.animate([{ property: "scale", from: 1, to: 5 }, { property: "opacity", from: 1, to: 0 }], 1000, am4core.ease.circleOut);
      animation.events.on("animationended", function(event){
        animateBullet(event.target.object);
      })
    }
  }

  initChartIdle() {
    let chart = am4core.create("chartIdle", am4charts.XYChart);
    // chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = [
      {
        "day": "Mon",
        "visits": 30
      }, 
      {
        "day": "Tue",
        "visits": 18
      },
      {
        "day": "Wed",
        "visits": 18
      }, 
      {
        "day": "Thu",
        "visits": 13
      }, 
      {
        "day": "Fri",
        "visits": 11
      }, 
      {
        "day": "Sat",
        "visits": 11
      }, 
      {
        "day": "Sun",
        "visits": 98
      }
    ];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "day";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.disabled = true;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 10;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "day";
    series.columns.template.strokeWidth = 0;

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
    });
  }

}
