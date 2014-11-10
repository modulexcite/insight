(function(insight) {

    /**
     * Provides the default configurations for each series in ChartBuilder
     * @constructor
     */
    insight.ChartBuilderConfig = function ChartBuilderConfig() {
        var self = this;

        self.ColumnSeries = {
            xAxis: insight.scales.ordinal,
            yAxis: insight.scales.linear,
            constructor: insight.ColumnSeries
        };

        self.chart = {
            applyTheme: undefined
        };


    };

})(insight);
