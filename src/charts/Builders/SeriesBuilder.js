/**
 * Created by tferguson on 10/11/2014.
 */

(function(insight) {
    insight.SeriesBuilder = function(seriesType, data, keyProperty, valueProperty) {

        var self = this;
        var dataset = new insight.DataSet(data);

        //Settable Property Defaults
        self.keyFunction = function(d) {
            return d[keyProperty];
        };

        self.valueFunction = function(d) {
            return d[valueProperty];
        };

        self.build = function(axes) {
            var series = new seriesType('series', dataset, axes.xAxis, axes.yAxis)
                .keyFunction(self.keyFunction)
                .valueFunction(self.valueFunction);

            if (self.filterFunction) {
                series.filterFunction(self.filterFunction);
            }
            if (self.groupKeyFunction) {
                series.groupKeyFunction(self.groupKeyFunction);
            }
            if (self.title) {
                series.title(self.title);
            }
            if (self.tooltipFormat) {
                series.tooltipFormat(self.tooltipFormat);
            }
            if (self.tooltipOffset) {
                series.tooltipOffset(self.tooltipOffset);
            }
            if (self.top) {
                series.top(self.top);
            }


            return series;
        };

    };
})(insight);
