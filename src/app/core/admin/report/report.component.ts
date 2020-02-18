import { Component, OnInit } from '@angular/core';

const data = {
  chart: {
    showvalues: "0",
    labeldisplay: "ROTATE",
    rotatelabels: "1",
    plothighlighteffect: "fadeout",
    plottooltext: "$seriesName $label : <b>$dataValue</b>",
    theme: "fusion"
  },
  axis: [
    {
      title: "Data 1",
      titlepos: "left",
      numberprefix: "$",
      divlineisdashed: "1",
      maxvalue: "100000",
      dataset: [
        {
          seriesname: "Data 1",
          linethickness: "3",
          data: [
            {
              value: "38450.2"
            },
            {
              value: "16544.4"
            },
            {
              value: "10659.4"
            },
            {
              value: "9657.4"
            },
            {
              value: "9040.4"
            },
            {
              value: "9040.4"
            },
            {
              value: "6992.3"
            },
            {
              value: "6650.5"
            },
            {
              value: "6650.5"
            },
            {
              value: "6337.2"
            },
            {
              value: "5835.4"
            },
            {
              value: "4582.9"
            }
          ]
        }
      ]
    },
    {
      title: "Data 2",
      axisonleft: "1",
      titlepos: "left",
      numdivlines: "8",
      divlineisdashed: "1",
      maxvalue: "25",
      numbersuffix: "%",
      dataset: [
        {
          seriesname: "Data 2",
          dashed: "1",
          data: [
            {
              value: "17.23"
            },
            {
              value: "7.41"
            },
            {
              value: "4.78"
            },
            {
              value: "4.33"
            },
            {
              value: "4.05"
            },
            {
              value: "4.05"
            },
            {
              value: "3.13"
            },
            {
              value: "2.98"
            },
            {
              value: "2.98"
            },
            {
              value: "2.84"
            },
            {
              value: "2.62"
            },
            {
              value: "2.05"
            }
          ]
        }
      ]
    },
    {
      title: "Data 3",
      titlepos: "RIGHT",
      axisonleft: "0",
      numdivlines: "5",
      numbersuffix: "",
      divlineisdashed: "1",
      maxvalue: "400000",
      dataset: [
        {
          seriesname: "Data 3",
          linethickness: "3",
          data: [
            {
              value: "358196"
            },
            {
              value: "166138"
            },
            {
              value: "107288"
            },
            {
              value: "97268"
            },
            {
              value: "91098"
            },
            {
              value: "91098"
            },
            {
              value: "70617"
            },
            {
              value: "67199"
            },
            {
              value: "67199"
            },
            {
              value: "64066"
            },
            {
              value: "59048"
            },
            {
              value: "46523"
            }
          ]
        }
      ]
    },
    {
      title: "Data 4",
      titlepos: "RIGHT",
      axisonleft: "0",
      numdivlines: "5",
      divlineisdashed: "1",
      maxvalue: "20",
      numbersuffix: "%",
      dataset: [
        {
          seriesname: "Data 4",
          dashed: "1",
          data: [
            {
              value: "16.3"
            },
            {
              value: "7.03"
            },
            {
              value: "4.54"
            },
            {
              value: "4.12"
            },
            {
              value: "3.86"
            },
            {
              value: "3.86"
            },
            {
              value: "2.99"
            },
            {
              value: "2.84"
            },
            {
              value: "2.84"
            },
            {
              value: "2.71"
            },
            {
              value: "2.5"
            },
            {
              value: "1.97"
            }
          ]
        }
      ]
    }
  ],
  categories: [
    {
      category: [
        {
          label: "2006"
        },
        {
          label: "2007"
        },
        {
          label: "2008"
        },
        {
          label: "2009"
        },
        {
          label: "2010"
        },
        {
          label: "2011"
        },
        {
          label: "2012"
        },
        {
          label: "2013"
        },
        {
          label: "2014"
        },
        {
          label: "2015"
        },
        {
          label: "2016"
        },
        {
          label: "2017"
        }
      ]
    }
  ]
};

const data2 = {
  chart: {
    showhovereffect: "1",
    drawverticaljoints: "1",
    useforwardsteps: "0",
    numberprefix: "$",
    canvaspadding: "5",
    plottooltext: "<b>$datavalue</b>",
    theme: "fusion"
  },
  categories: [
    {
      category: [
        {
          label: "2011"
        },
        {
          label: "2012"
        },
        {
          label: "2013"
        },
        {
          label: "2014"
        },
        {
          label: "2015"
        },
        {
          label: "2016"
        },
        {
          label: "2017"
        },
        {
          label: "2018"
        },
        {
          label: "2019"
        }
      ]
    }
  ],
  dataset: [
    {
      linethickness: "3",
      data: [
        {
          value: ".10"
        },
        {
          value: ".12"
        },
        {
          value: ".18"
        },
        {
          value: ".20"
        },
        {
          value: ".28"
        },
        {
          value: ".36"
        },
        {
          value: ".42"
        },
        {
          value: ".46"
        },
        {
          value: ".49"
        }
      ]
    }
  ]
};

const data3 = {
  chart: {
    yaxisname: "# of Tickets",
    subcaption: "Last week",
    numdivlines: "3",
    showvalues: "0",
    legenditemfontsize: "15",
    legenditemfontbold: "1",
    plottooltext: "<b>$dataValue</b> Tickets $seriesName on $label",
    theme: "fusion"
  },
  categories: [
    {
      category: [
        {
          label: "Jan 1"
        },
        {
          label: "Jan 2"
        },
        {
          label: "Jan 3"
        },
        {
          label: "Jan 4"
        },
        {
          label: "Jan 5"
        },
        {
          label: "Jan 6"
        },
        {
          label: "Jan 7"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "Received",
      data: [
        {
          value: "55"
        },
        {
          value: "45"
        },
        {
          value: "52"
        },
        {
          value: "29"
        },
        {
          value: "48"
        },
        {
          value: "28"
        },
        {
          value: "32"
        }
      ]
    },
    {
      seriesname: "Resolved",
      data: [
        {
          value: "50"
        },
        {
          value: "30"
        },
        {
          value: "49"
        },
        {
          value: "22"
        },
        {
          value: "43"
        },
        {
          value: "14"
        },
        {
          value: "31"
        }
      ]
    }
  ]
};

const data4 = {
  chart: {
    formatnumberscale: "0",
    showvalues: "0",
    drawcrossline: "1",
    showsum: "1",
    plottooltext: "$dataValue from $seriesName",
    theme: "fusion"
  },
  categories: [
    {
      category: [
        {
          label: "2014"
        },
        {
          label: "2015"
        },
        {
          label: "2016"
        },
        {
          label: "2017"
        },
        {
          label: "2018"
        },
        {
          label: "2019"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "Data 1",
      data: [
        {
          value: "400"
        },
        {
          value: "830"
        },
        {
          value: "500"
        },
        {
          value: "420"
        },
        {
          value: "790"
        },
        {
          value: "380"
        }
      ]
    },
    {
      seriesname: "Data 2",
      data: [
        {
          value: "350"
        },
        {
          value: "620"
        },
        {
          value: "410"
        },
        {
          value: "370"
        },
        {
          value: "720"
        },
        {
          value: "310"
        }
      ]
    },
    {
      seriesname: "Data 3",
      data: [
        {
          value: "210"
        },
        {
          value: "400"
        },
        {
          value: "450"
        },
        {
          value: "180"
        },
        {
          value: "570"
        },
        {
          value: "270"
        }
      ]
    },
    {
      seriesname: "Data 4",
      data: [
        {
          value: "180"
        },
        {
          value: "330"
        },
        {
          value: "230"
        },
        {
          value: "160"
        },
        {
          value: "440"
        },
        {
          value: "350"
        }
      ]
    },
    {
      seriesname: "Data 5",
      data: [
        {
          value: "60"
        },
        {
          value: "200"
        },
        {
          value: "200"
        },
        {
          value: "50"
        },
        {
          value: "230"
        },
        {
          value: "150"
        }
      ]
    }
  ]
};

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  width = '100%';
  height = '100%';
  type = "multiaxisline";
  dataFormat = "json";
  dataSource = data;
  dataSource2 = data2
  type2 = "msstepline"
  dataSource3 = data3
  type3 = 'msspline'
  dataSource4 = data4
  type4 = 'stackedarea2d'
  
  constructor() { }

  ngOnInit() {
  }

}
