(function(insight) {

    /**
     * A Legend listing out the all of the series or only the selected series on a chart depending
     * on the parameter passed to the constructor.
     * @constructor insight.Legend
     * @param {String[]} filteredSeries - An array of uniquely identifying series names corresponding to
     * the series to be shown on the legend.
     */
    insight.Legend = function Legend(filteredSeries) {

        // Private variables ------------------------------------------------------------------------------------------

        var self = this,
            initialised = false;

        // Private functions ------------------------------------------------------------------------------------------

        function blobPositionY(item, index) {
            return index * 20 + 5;
        }

        function blobFillColor(item) {
            return item.colorClass();
        }

        function textPositionY(item, index) {
            return index * 20 + 14;
        }

        function textContent(item) {

            var title = item.title();

            return title.length >= 9 ? title.substring(0, 9) + '...' : title;
        }

        // Internal functions -----------------------------------------------------------------------------------------

        self.init = function(chart) {
            initialised = true;

            //Get rid of any previous legend objects
            if (chart.legendView !== null) {
                chart.legendView.removeChild(chart.legendBox);
                chart.legendView.removeChild(chart.legendItems);
                chart.chartSVG.removeChild(chart.legendView);
            }

            chart.legendView = chart.chartSVG.append("g")
                .attr("class", insight.constants.LegendView)
                .attr("transform", "translate(" + (chart.width() - 80) + ",30)");

            chart.legendBox = chart.legendView.append("rect")
                .style("stroke", 'black')
                .style("stroke-width", 1)
                .style("fill", 'white');

            chart.legendItems = chart.legendView.append("g")
                .attr("class", insight.constants.Legend);
        };

        self.draw = function(chart) {
            if (!initialised) {
                self.init(chart);
            }

            var series = filteredSeries ? chart.series().filter(function(elem) {
                return $.inArray(elem.name, filteredSeries) > -1;
            }) : chart.series();
            var ctx = chart.measureCanvas.getContext('2d');
            ctx.font = "12px sans-serif";

            chart.legendItems.selectAll('rect')
                .data(series)
                .enter()
                .append("rect")
                .attr("x", 5)
                .attr("y", blobPositionY)
                .attr("width", 10)
                .attr("height", 10)
                .attr('class', blobFillColor);

            chart.legendItems.selectAll('rect')
                .data(series)
                .transition()
                .attr('class', blobFillColor);

            chart.legendItems.selectAll('text')
                .data(series)
                .enter()
                .append("text")
                .attr("x", 20)
                .attr("y", textPositionY)
                .attr("width", function(item) {
                    return ctx.measureText(item.title()).width;
                })
                .attr("height", 20)
                .text(textContent)
                .attr("font-family", "sans-serif")
                .attr("font-size", "12px")
                .attr("fill", "black");

            var legendHeight = 0;
            var legendWidth = 0;

            for (var index = 0; index < series.length; index++) {
                var seriesTextWidth = ctx.measureText(series[index].title())
                    .width;
                legendWidth = Math.min(Math.max(legendWidth, seriesTextWidth + 25), 79);
            }
            legendHeight = series.length * 20;

            // Adjust legend to tightly wrap items
            chart.legendBox
                .attr("width", legendWidth)
                .attr("height", legendHeight);

            chart.legendItems
                .attr("width", legendWidth)
                .attr("height", legendHeight);
        };

    };

})(insight);
