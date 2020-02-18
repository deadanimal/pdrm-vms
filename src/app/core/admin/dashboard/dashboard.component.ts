import { Component, OnInit, NgZone } from '@angular/core';
import * as L  from 'leaflet';
import 'leaflet.markercluster';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
/**
 * ------- Tile layer list
 *  
 * Open Street Map - > http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
 * Open Cycle Map -> http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png
 * Google Traffic -> https://{s}.google.com/vt/lyrs=m@221097413,traffic&x={x}&y={y}&z={z}
 * Google Street -> http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}
 * Google Hybrid -> http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}
 * Google Satellite -> http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}
 * Google Terrain -> http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}
 * 
**/

const dataMarkers = [
  { lat: 5.899815, long: 103.039459 },
  { lat: 5.528501, long:  103.259186},
  { lat: 4.850509, long: 103.632721 },
  { lat: 4.303311, long: 103.698639 },
  { lat: 3.404844 , long: 103.896393 },
  { lat: 2.439682, long: 101.501373 },
  { lat: 1.754324, long: 102.825226 },
  { lat: 2.424132, long: 101.655182 },
  { lat: 3.614563, long: 100.897125 },
  { lat: 4.562543, long: 100.375275 },
  { lat: 5.613151, long: 100.188507 },
  { lat: 5.378122, long: 100.10611 },
  { lat: 4.716121, long: 100.490631 },
  { lat: 6.3172, long: 100.052184 },
  { lat: 6.191701, long: 99.931334 }
]


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  clicked
  clicked1

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
    center: L.latLng(4.2105, 101.9758)
  };

  markerClusterGroup: L.MarkerClusterGroup
  markerClusterData: L.Marker[] = []
  markerClusterOptions: L.MarkerClusterGroupOptions

  chartTotal: am4charts.XYChart

  generateLat() { return Math.random() * 5 - 1; }
	generateLon() { return Math.random() * 110 - 100; }

  constructor(
    public zone: NgZone
  ) { }

  ngOnInit() {
    this.refreshData();
  }

  markerClusterReady(group: L.MarkerClusterGroup) {
		this.markerClusterGroup = group;
	}

	refreshData(): void {
		this.markerClusterData = this.generateData(500);
	}

	generateData(count: number): L.Marker[] {

    const data: L.Marker[] = []
    
    dataMarkers.forEach(
      (marker) => {
        data.push(
          L.marker(
            [marker.lat, marker.long],
            {
              icon: L.icon({
                iconSize: [35,35],
                iconUrl: 'assets/img/icons/marker/marine-marker.svg' 
              })
            }
          )
        )
      }
    )

		return data;
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(
      () => {
        this.initChartTotal()
        this.initChartActive()
        this.initChartOne()
        this.initChartTwo()
      }
    )
  }
  
  initChartTotal() {
    let chart = am4core.create("chartTotal", am4charts.XYChart);
    chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = [{
      "month": "Jan",
      "visits": 3025
    }, {
      "month": "Feb",
      "visits": 1882
    }, {
      "month": "Mar",
      "visits": 1809
    }, {
      "month": "Apr",
      "visits": 1322
    }, {
      "month": "May",
      "visits": 1122
    }, {
      "month": "Jun",
      "visits": 1114
    }, {
      "month": "Jul",
      "visits": 984
    }, {
      "month": "Aug",
      "visits": 711
    }, {
      "month": "Sep",
      "visits": 665
    }, {
      "month": "Oct",
      "visits": 580
    }, {
      "month": "Nov",
      "visits": 443
    }, {
      "month": "Dec",
      "visits": 441
    }];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "month";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "month";
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
    });

    // Cursor
    chart.cursor = new am4charts.XYCursor();

  }

  initChartActive() {
    let chart = am4core.create("chartActive", am4charts.XYChart);

    // Add data
    chart.data = [{
      "date": "2012-03-01",
      "price": 20
    }, {
      "date": "2012-03-02",
      "price": 75
    }, {
      "date": "2012-03-03",
      "price": 15
    }, {
      "date": "2012-03-04",
      "price": 75
    }, {
      "date": "2012-03-05",
      "price": 158
    }, {
      "date": "2012-03-06",
      "price": 57
    }, {
      "date": "2012-03-07",
      "price": 107
    }, {
      "date": "2012-03-08",
      "price": 89
    }, {
      "date": "2012-03-09",
      "price": 75
    }, {
      "date": "2012-03-10",
      "price": 132
    }, {
      "date": "2012-03-11",
      "price": 380
    }, {
      "date": "2012-03-12",
      "price": 56
    }, {
      "date": "2012-03-13",
      "price": 169
    }, {
      "date": "2012-03-14",
      "price": 24
    }, {
      "date": "2012-03-15",
      "price": 147
    }];

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.logarithmic = true;
    valueAxis.renderer.minGridDistance = 20;

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "price";
    series.dataFields.dateX = "date";
    series.tensionX = 0.8;
    series.strokeWidth = 3;

    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.fill = am4core.color("#fff");
    bullet.circle.strokeWidth = 3;

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.fullWidthLineX = true;
    chart.cursor.xAxis = dateAxis;
    chart.cursor.lineX.strokeWidth = 0;
    chart.cursor.lineX.fill = am4core.color("#000");
    chart.cursor.lineX.fillOpacity = 0.1;

    // Add scrollbar
    chart.scrollbarX = new am4core.Scrollbar();

    // Add a guide
    let range = valueAxis.axisRanges.create();
    range.value = 90.4;
    range.grid.stroke = am4core.color("#396478");
    range.grid.strokeWidth = 1;
    range.grid.strokeOpacity = 1;
    range.grid.strokeDasharray = "3,3";
    range.label.inside = true;
    range.label.text = "Average";
    range.label.fill = range.grid.stroke;
    range.label.verticalCenter = "bottom";


  }

  initChartOne() {
    let chart = am4core.create("chartdiv1", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    // Set format
    chart.numberFormatter.numberFormat = "'[font-size: 10]RM[/] [bold]'#";

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.labels.template.disabled = true;
    categoryAxis.dataFields.category = "category";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Set data
    chart.data = [{
      "category": "",
      "Data 1": 387.66,
      "Data 2": 120.93,
      "Data 3": 119.70,
      "Data 4": 101.43,
      "Data 5": 98.39,
      "Data 6": 97.27,
      "Data 7": 83.79,
      "Data 8": 74.48
    }];

    // Series
    let data = chart.data[0];
    for (var key in data){
      if (data.hasOwnProperty(key) && key != "category") {
        let series = chart.series.push(new am4charts.CurvedColumnSeries());
        series.dataFields.categoryX = "category";
        series.dataFields.valueY = key;
        series.name = key;
        series.tooltipText = "{name}: {valueY.value}";
        series.columns.template.strokeWidth = 2;
        series.columns.template.strokeOpacity = 1;
        series.columns.template.fillOpacity = 0;
        series.columns.template.width = am4core.percent(100);
        series.clustered = false;
      }
    }

    // Cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.maxTooltipDistance = 10;

    // Legend
    chart.legend = new am4charts.Legend();
    chart.legend.fontSize = 12;
    chart.legend.position = "right";
    chart.legend.valign = "top";
    chart.legend.marginTop = 0;
    chart.legend.labels.template.width = 130;
    chart.legend.labels.template.truncate = true;
    chart.legend.valueLabels.template.text = "{valueY.close}"
    chart.legend.valueLabels.template.fontSize = 12;
  }

  initChartTwo() {
    let chart = am4core.create("chartdiv2", am4charts.RadarChart);

    chart.data = [
        {
            category: "One",
            startDate1: "2018-01-01",
            endDate1: "2018-03-01"
        },
        {
            category: "One",
            startDate1: "2018-04-01",
            endDate1: "2018-08-15"
        },
        {
            category: "Two",
            startDate2: "2018-03-01",
            endDate2: "2018-06-01"
        },
        {
            category: "Two",
            startDate2: "2018-08-01",
            endDate2: "2018-10-01"
        },
        {
            category: "Three",
            startDate3: "2018-02-01",
            endDate3: "2018-07-01"
        },
        {
            category: "Four",
            startDate4: "2018-06-09",
            endDate4: "2018-09-01"
        },
        {
            category: "Four",
            startDate4: "2018-10-01",
            endDate4: "2019-01-01"
        },
        {
            category: "Five",
            startDate5: "2018-02-01",
            endDate5: "2018-04-15"
        },
        {
            category: "Five",
            startDate5: "2018-10-01",
            endDate5: "2018-12-31"
        }
    ];

    chart.padding(20, 20, 20, 20);
    chart.colors.step = 2;
    chart.dateFormatter.inputDateFormat = "YYYY-MM-dd";
    chart.innerRadius = am4core.percent(40);

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis() as any);
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.labels.template.location = 0.5;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.tooltipLocation = 0.5;
    categoryAxis.renderer.grid.template.strokeOpacity = 0.07;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.mouseEnabled = false;
    categoryAxis.tooltip.disabled = true;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis() as any);
    dateAxis.renderer.labels.template.horizontalCenter = "left";
    dateAxis.strictMinMax = true;
    dateAxis.renderer.maxLabelPosition = 0.99;
    dateAxis.renderer.grid.template.strokeOpacity = 0.07;
    dateAxis.min = new Date(2018, 0, 1, 0, 0, 0).getTime();
    dateAxis.max = new Date(2019, 0, 1, 0, 0, 0).getTime();
    dateAxis.mouseEnabled = false;
    dateAxis.tooltip.disabled = true;
    dateAxis.baseInterval = {count:1, timeUnit:"day"};

    let series1 = chart.series.push(new am4charts.RadarColumnSeries());
    series1.name = "Series 1";
    series1.dataFields.openDateX = "startDate1";
    series1.dataFields.dateX = "endDate1";
    series1.dataFields.categoryY = "category";
    series1.clustered = false;
    series1.columns.template.radarColumn.cornerRadius = 30;
    series1.columns.template.tooltipText = "{category}: {openDateX} - {dateX}";

    let series2 = chart.series.push(new am4charts.RadarColumnSeries());
    series2.name = "Series 2";
    series2.dataFields.openDateX = "startDate2";
    series2.dataFields.dateX = "endDate2";
    series2.dataFields.categoryY = "category";
    series2.clustered = false;
    series2.columns.template.radarColumn.cornerRadius = 30;
    series2.columns.template.tooltipText = "{category}: {openDateX} - {dateX}";

    let series3 = chart.series.push(new am4charts.RadarColumnSeries());
    series3.name = "Series 3";
    series3.dataFields.openDateX = "startDate3";
    series3.dataFields.dateX = "endDate3";
    series3.dataFields.categoryY = "category";
    series3.clustered = false;
    series3.columns.template.radarColumn.cornerRadius = 30;
    series3.columns.template.tooltipText = "{category}: {openDateX} - {dateX}";

    let series4 = chart.series.push(new am4charts.RadarColumnSeries());
    series4.name = "Series 4";
    series4.dataFields.openDateX = "startDate4";
    series4.dataFields.dateX = "endDate4";
    series4.dataFields.categoryY = "category";
    series4.clustered = false;
    series4.columns.template.radarColumn.cornerRadius = 30;
    series4.columns.template.tooltipText = "{category}: {openDateX} - {dateX}";

    let series5 = chart.series.push(new am4charts.RadarColumnSeries());
    series5.name = "Series 5";
    series5.dataFields.openDateX = "startDate5";
    series5.dataFields.dateX = "endDate5";
    series5.dataFields.categoryY = "category";
    series5.clustered = false;
    series5.columns.template.radarColumn.cornerRadius = 30;
    series5.columns.template.tooltipText = "{category}: {openDateX} - {dateX}";

    chart.seriesContainer.zIndex = -1;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.exportable = false;
    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.exportable = false;

    chart.cursor = new am4charts.RadarCursor();
    chart.cursor.innerRadius = am4core.percent(40);
    chart.cursor.lineY.disabled = true;

    let yearLabel = chart.radarContainer.createChild(am4core.Label);
    yearLabel.text = "2018";
    yearLabel.fontSize = 30;
    yearLabel.horizontalCenter = "middle";
    yearLabel.verticalCenter = "middle";

  }

}
