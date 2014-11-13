/**
 * Created by tferguson on 13/11/2014.
 */

(function(insight) {
    insight.SimpleRowChart = function(data, element, keyProperty, valueProperty) {

        insight.SimpleChart.call(this, data, element, keyProperty, valueProperty, {
            xAxisScale: insight.scales.linear,
            xAxisName: valueProperty,
            yAxisScale: insight.scales.ordinal,
            yAxisName: keyProperty,
            seriesType: insight.RowSeries
        });
    };

})(insight);
