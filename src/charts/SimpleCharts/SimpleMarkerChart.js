/**
 * Created by tferguson on 13/11/2014.
 */

(function(insight) {
    insight.SimpleMarkerChart = function(data, element, keyProperty, valueProperty) {

        insight.SimpleChart.call(this, data, element, keyProperty, valueProperty, {
            xAxisScale: insight.scales.ordinal,
            xAxisName: keyProperty,
            yAxisScale: insight.scales.linear,
            yAxisName: valueProperty,
            seriesType: insight.MarkerSeries
        });
    };

})(insight);
