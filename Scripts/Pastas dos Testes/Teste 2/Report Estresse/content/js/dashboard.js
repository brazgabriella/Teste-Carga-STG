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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.942972972972973, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.975, 500, 1500, "Criando mapa"], "isController": true}, {"data": [1.0, 500, 1500, "https://api-map.sit.sdlc-quattrus.com/api/v1/Page/798 -2"], "isController": false}, {"data": [0.995, 500, 1500, "https://map.sit.sdlc-quattrus.com/editor"], "isController": false}, {"data": [0.495, 500, 1500, "Inserindo shape 1"], "isController": true}, {"data": [1.0, 500, 1500, "https://api-map.sit.sdlc-quattrus.com/api/v1/Map/798 "], "isController": false}, {"data": [0.9083333333333333, 500, 1500, "https://api-map.sit.sdlc-quattrus.com/api/v1/Page/798 "], "isController": false}, {"data": [0.9983333333333333, 500, 1500, "https://api-map.sit.sdlc-quattrus.com/api/v1/Page/798 -1"], "isController": false}, {"data": [0.9975, 500, 1500, "https://api-map.sit.sdlc-quattrus.com/api/v1/PaaIntegration/project "], "isController": false}, {"data": [1.0, 500, 1500, "https://api-map.sit.sdlc-quattrus.com/api/v1/Page/798 -0"], "isController": false}, {"data": [1.0, 500, 1500, "https://api-map.sit.sdlc-quattrus.com/api/v1/PaaIntegration/project -0"], "isController": false}, {"data": [1.0, 500, 1500, "https://api-map.sit.sdlc-quattrus.com/api/v1/Map/newMap "], "isController": false}, {"data": [1.0, 500, 1500, "https://api-map.sit.sdlc-quattrus.com/api/v1/PaaIntegration/project -1"], "isController": false}, {"data": [1.0, 500, 1500, "https://api-map.sit.sdlc-quattrus.com/api/v1/Map/798 -1"], "isController": false}, {"data": [0.7475, 500, 1500, "Abrindo mapa"], "isController": true}, {"data": [1.0, 500, 1500, "https://api-map.sit.sdlc-quattrus.com/api/v1/Map/798 -0"], "isController": false}, {"data": [0.495, 500, 1500, "Inserindo Tag"], "isController": true}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 3200, 0, 0.0, 247.07468750000055, 148, 1031, 156.0, 452.0, 463.0, 909.0, 133.03400681799286, 223.78952370187912, 93.39744039452899], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Criando mapa", 100, 0, 0.0, 341.4099999999999, 317, 728, 322.0, 393.8, 497.64999999999924, 726.3899999999992, 4.989770969512499, 85.64113489222095, 5.408833765780151], "isController": true}, {"data": ["https://api-map.sit.sdlc-quattrus.com/api/v1/Page/798 -2", 200, 0, 0.0, 156.95000000000002, 149, 272, 152.0, 163.9, 197.0, 205.0, 9.870693909781858, 47.102681435692425, 5.1184945957950845], "isController": false}, {"data": ["https://map.sit.sdlc-quattrus.com/editor", 100, 0, 0.0, 461.30999999999983, 452, 525, 455.0, 482.8, 487.0, 524.6599999999999, 4.939003309132217, 45.82565472662617, 2.464678409147034], "isController": false}, {"data": ["Inserindo shape 1", 100, 0, 0.0, 1375.9, 1349, 1582, 1361.0, 1440.2, 1475.35, 1581.1099999999994, 4.7594117367093425, 50.34100441435439, 14.775556553709961], "isController": true}, {"data": ["https://api-map.sit.sdlc-quattrus.com/api/v1/Map/798 ", 100, 0, 0.0, 308.32, 298, 408, 302.0, 315.9, 349.5499999999999, 407.99, 5.011275369581559, 2.231583563016788, 5.128727136056127], "isController": false}, {"data": ["https://api-map.sit.sdlc-quattrus.com/api/v1/Page/798 ", 600, 0, 0.0, 437.2383333333333, 299, 1031, 305.0, 905.0, 910.0, 950.98, 25.85872516484937, 53.26207144550274, 31.39747554195578], "isController": false}, {"data": ["https://api-map.sit.sdlc-quattrus.com/api/v1/Page/798 -1", 600, 0, 0.0, 206.03166666666664, 149, 527, 151.0, 451.0, 454.0, 484.97, 26.10966057441253, 6.187445604873803, 13.556285356832028], "isController": false}, {"data": ["https://api-map.sit.sdlc-quattrus.com/api/v1/PaaIntegration/project ", 200, 0, 0.0, 310.395, 299, 531, 302.5, 321.0, 352.84999999999997, 410.96000000000004, 9.868258745744313, 4.394458972714265, 10.523572803078897], "isController": false}, {"data": ["https://api-map.sit.sdlc-quattrus.com/api/v1/Page/798 -0", 600, 0, 0.0, 178.70333333333332, 148, 331, 151.0, 299.0, 300.0, 311.95000000000005, 26.028110359187924, 6.041029520215166, 13.59019824744057], "isController": false}, {"data": ["https://api-map.sit.sdlc-quattrus.com/api/v1/PaaIntegration/project -0", 200, 0, 0.0, 155.11500000000007, 148, 331, 151.0, 161.8, 191.84999999999997, 205.96000000000004, 9.942828734775043, 1.7866020382798908, 5.330676733780761], "isController": false}, {"data": ["https://api-map.sit.sdlc-quattrus.com/api/v1/Map/newMap ", 200, 0, 0.0, 170.70499999999998, 157, 436, 161.0, 174.8, 232.79999999999995, 401.97, 9.979541939024998, 85.64113489222095, 5.408833765780151], "isController": false}, {"data": ["https://api-map.sit.sdlc-quattrus.com/api/v1/PaaIntegration/project -1", 200, 0, 0.0, 155.18499999999992, 149, 261, 152.0, 157.9, 192.4999999999999, 236.69000000000028, 9.94184023462743, 2.640801312322911, 5.271893796291693], "isController": false}, {"data": ["https://api-map.sit.sdlc-quattrus.com/api/v1/Map/798 -1", 100, 0, 0.0, 154.43999999999997, 149, 258, 151.0, 159.0, 166.84999999999997, 257.4999999999998, 5.049484952534842, 1.3412694405170673, 2.677607743385175], "isController": false}, {"data": ["Abrindo mapa", 200, 0, 0.0, 697.8099999999997, 452, 1216, 712.0, 937.1, 1032.55, 1162.7000000000003, 9.307520476545047, 49.396210966586004, 16.610833662974684], "isController": true}, {"data": ["https://api-map.sit.sdlc-quattrus.com/api/v1/Map/798 -0", 100, 0, 0.0, 153.78000000000003, 148, 203, 150.0, 158.9, 189.5499999999999, 202.98, 5.052035970496109, 0.9077877134485197, 2.4914825831059915], "isController": false}, {"data": ["Inserindo Tag", 100, 0, 0.0, 1242.3300000000006, 1202, 1502, 1216.0, 1350.7, 1433.1999999999996, 1501.61, 4.791337262229889, 8.53456949834699, 20.442727049494515], "isController": true}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 3200, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
