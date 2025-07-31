/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9445945945945946, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.99, 500, 1500, "Criando mapa"], "isController": true}, {"data": [1.0, 500, 1500, "https://api-map.sit.sdlc-quattrus.com/api/v1/Page/798 -2"], "isController": false}, {"data": [0.99, 500, 1500, "https://map.sit.sdlc-quattrus.com/editor"], "isController": false}, {"data": [0.5, 500, 1500, "Inserindo shape 1"], "isController": true}, {"data": [1.0, 500, 1500, "https://api-map.sit.sdlc-quattrus.com/api/v1/Map/798 "], "isController": false}, {"data": [0.9133333333333333, 500, 1500, "https://api-map.sit.sdlc-quattrus.com/api/v1/Page/798 "], "isController": false}, {"data": [1.0, 500, 1500, "https://api-map.sit.sdlc-quattrus.com/api/v1/Page/798 -1"], "isController": false}, {"data": [1.0, 500, 1500, "https://api-map.sit.sdlc-quattrus.com/api/v1/PaaIntegration/project "], "isController": false}, {"data": [1.0, 500, 1500, "https://api-map.sit.sdlc-quattrus.com/api/v1/Page/798 -0"], "isController": false}, {"data": [1.0, 500, 1500, "https://api-map.sit.sdlc-quattrus.com/api/v1/PaaIntegration/project -0"], "isController": false}, {"data": [1.0, 500, 1500, "https://api-map.sit.sdlc-quattrus.com/api/v1/Map/newMap "], "isController": false}, {"data": [1.0, 500, 1500, "https://api-map.sit.sdlc-quattrus.com/api/v1/PaaIntegration/project -1"], "isController": false}, {"data": [1.0, 500, 1500, "https://api-map.sit.sdlc-quattrus.com/api/v1/Map/798 -1"], "isController": false}, {"data": [0.745, 500, 1500, "Abrindo mapa"], "isController": true}, {"data": [1.0, 500, 1500, "https://api-map.sit.sdlc-quattrus.com/api/v1/Map/798 -0"], "isController": false}, {"data": [0.5, 500, 1500, "Inserindo Tag"], "isController": true}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1600, 0, 0.0, 243.77687500000008, 148, 983, 155.0, 450.0, 458.0, 906.98, 113.56377315636313, 191.035282401164, 79.7282288043864], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Criando mapa", 50, 0, 0.0, 328.7999999999999, 316, 507, 321.5, 335.8, 376.45, 507.0, 4.972155926809865, 85.33676256712411, 5.389739334725538], "isController": true}, {"data": ["https://api-map.sit.sdlc-quattrus.com/api/v1/Page/798 -2", 100, 0, 0.0, 154.57999999999996, 149, 220, 152.0, 157.0, 170.79999999999995, 219.8099999999999, 9.654373431164316, 46.07040602674261, 5.006320597605715], "isController": false}, {"data": ["https://map.sit.sdlc-quattrus.com/editor", 50, 0, 0.0, 456.82000000000005, 450, 525, 453.0, 464.0, 467.9, 525.0, 4.872819413312542, 45.2115793416821, 2.4316510939479583], "isController": false}, {"data": ["Inserindo shape 1", 50, 0, 0.0, 1363.8199999999997, 1347, 1438, 1356.5, 1388.1, 1423.8999999999999, 1438.0, 4.49802087081684, 47.576234425602735, 13.964070652662828], "isController": true}, {"data": ["https://api-map.sit.sdlc-quattrus.com/api/v1/Map/798 ", 50, 0, 0.0, 306.7, 299, 385, 302.0, 321.9, 331.04999999999995, 385.0, 4.9805757545572265, 2.217912640701265, 5.097307998804662], "isController": false}, {"data": ["https://api-map.sit.sdlc-quattrus.com/api/v1/Page/798 ", 300, 0, 0.0, 431.34, 299, 983, 305.0, 901.0, 907.0, 927.99, 22.65861027190332, 46.670688963368576, 27.51191937311178], "isController": false}, {"data": ["https://api-map.sit.sdlc-quattrus.com/api/v1/Page/798 -1", 300, 0, 0.0, 203.23666666666662, 149, 484, 151.0, 450.0, 451.0, 475.96000000000004, 22.91825821237586, 5.431149732620321, 11.899290966386555], "isController": false}, {"data": ["https://api-map.sit.sdlc-quattrus.com/api/v1/PaaIntegration/project ", 100, 0, 0.0, 306.70999999999987, 300, 408, 303.0, 313.0, 317.0, 407.6099999999998, 9.653441451877594, 4.298798146539241, 10.294490298291342], "isController": false}, {"data": ["https://api-map.sit.sdlc-quattrus.com/api/v1/Page/798 -0", 300, 0, 0.0, 176.43999999999997, 148, 311, 151.0, 297.0, 299.0, 307.99, 22.921760391198045, 5.320057017878973, 11.968262912591689], "isController": false}, {"data": ["https://api-map.sit.sdlc-quattrus.com/api/v1/PaaIntegration/project -0", 100, 0, 0.0, 152.73999999999995, 149, 208, 151.0, 155.9, 160.95, 207.99, 9.796238244514107, 1.7602615595611284, 5.25208476195141], "isController": false}, {"data": ["https://api-map.sit.sdlc-quattrus.com/api/v1/Map/newMap ", 100, 0, 0.0, 164.40000000000006, 157, 319, 161.0, 167.9, 187.24999999999983, 317.97999999999945, 9.943323058566174, 85.32827725713433, 5.389203415531471], "isController": false}, {"data": ["https://api-map.sit.sdlc-quattrus.com/api/v1/PaaIntegration/project -1", 100, 0, 0.0, 153.9, 149, 219, 152.0, 156.0, 165.0, 218.8199999999999, 9.795278675678324, 2.601870898227055, 5.194176094622392], "isController": false}, {"data": ["https://api-map.sit.sdlc-quattrus.com/api/v1/Map/798 -1", 50, 0, 0.0, 153.8199999999999, 150, 199, 151.0, 157.9, 172.3499999999999, 199.0, 5.060216577269507, 1.3441200283372128, 2.683298438923186], "isController": false}, {"data": ["Abrindo mapa", 100, 0, 0.0, 687.24, 450, 991, 712.5, 926.9, 947.8, 990.97, 8.698677800974252, 46.16500440370564, 15.524251641875434], "isController": true}, {"data": ["https://api-map.sit.sdlc-quattrus.com/api/v1/Map/798 -0", 50, 0, 0.0, 152.76000000000005, 149, 186, 150.0, 165.2, 174.45, 186.0, 5.05663430420712, 0.9086139765372169, 2.493750316039644], "isController": false}, {"data": ["Inserindo Tag", 50, 0, 0.0, 1226.6800000000003, 1200, 1314, 1217.0, 1273.8, 1283.8, 1314.0, 4.56037942356804, 8.123175848230572, 19.45732197418825], "isController": true}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1600, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
