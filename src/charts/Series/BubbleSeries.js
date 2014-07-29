/**
 * The BubbleSeries class extends the Series class
 * @class insight.BubbleSeries
 * @param {string} name - A uniquely identifying name for this chart
 * @param {DataSet} data - The DataSet containing this series' data
 * @param {insight.Scales.Scale} x - the x axis
 * @param {insight.Scales.Scale} y - the y axis
 * @param {object} color - a string or function that defines the color to be used for the items in this series
 */
insight.BubbleSeries = function BubbleSeries(name, data, x, y, color) {

    insight.Series.call(this, name, data, x, y, color);

    var radiusFunction = d3.functor(10);
    var self = this;
    var selector = this.name + insight.Constants.Bubble;

    var xFunction = function(d) {
        return d.x;
    };

    var yFunction = function(d) {
        return d.y;
    };

    this.rangeY = function(d) {
        var f = self.yFunction();

        return self.y.scale(self.yFunction()(d));
    };

    this.rangeX = function(d, i) {
        var f = self.xFunction();
        return self.x.scale(self.xFunction()(d));
    };

    /**
     * The function to extract the radius of each bubble from the data objects.
     * @memberof! insight.BubbleSeries
     * @instance
     * @returns {function} - The current function used to determine the radius of data objects.
     *
     * @also
     *
     * Sets the function to extract the radius of each bubble from the data objects.
     * @memberof! insight.BubbleSeries
     * @instance
     * @param {boolean} reversed The new function to extract the radius of each bubble from the data objects.
     * @returns {this}
     */
    this.radiusFunction = function(radiusFunc) {
        if (!arguments.length) {
            return radiusFunction;
        }
        radiusFunction = radiusFunc;

        return this;
    };


    var className = function(d) {

        return selector + " " + insight.Constants.Bubble + " " + insight.Utils.keySelector(d) + " " + self.dimensionName;
    };

    this.bubbleData = function(data) {
        var max = d3.max(data, radiusFunction);

        var rad = function(d) {
            return d.radius;
        };

        //Minimum of pixels-per-axis-unit
        var xValues = data.map(xFunction);
        var yValues = data.map(yFunction);
        var xBounds = this.x.bounds[1];
        var yBounds = this.y.bounds[0];
        var maxRad = Math.min(xBounds / 10, yBounds / 10);

        // create radius for each item
        data.forEach(function(d) {
            var radiusInput = radiusFunction(d);

            if (radiusInput === 0)
                d.radius = 0;
            else
                d.radius = (radiusInput * maxRad) / max;
        });

        //this sort ensures that smaller bubbles are on top of larger ones, so that they are always selectable.  Without changing original array (hence concat which creates a copy)
        data = data.concat()
            .sort(function(a, b) {
                return d3.descending(rad(a), rad(b));
            });

        return data;
    };

    this.draw = function(chart, drag) {

        this.initializeTooltip(chart.container.node());

        var duration = drag ? 0 : function(d, i) {
            return 200 + (i * 20);
        };

        var click = function(filter) {
            return self.click(this, filter);
        };

        var bubbleData = this.bubbleData(this.dataset());

        var bubbles = chart.plotArea.selectAll('circle.' + selector)
            .data(bubbleData, self.keyAccessor);

        bubbles.enter()
            .append('circle')
            .attr('class', className)
            .on('mouseover', self.mouseOver)
            .on('mouseout', self.mouseOut)
            .on('click', click);


        var rad = function(d) {
            return d.radius;
        };

        bubbles.transition()
            .duration(duration)
            .attr('r', rad)
            .attr('cx', self.rangeX)
            .attr('cy', self.rangeY)
            .attr('opacity', 0.5)
            .attr('fill', this.color);
    };
};

insight.BubbleSeries.prototype = Object.create(insight.Series.prototype);
insight.BubbleSeries.prototype.constructor = insight.BubbleSeries;
