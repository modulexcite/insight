function ColumnSeries(name, chart, data, x, y, color)
{

    Series.call(this, name, chart, data, x, y, color);

    var self = this;
    var stacked = d3.functor(false);

    var barWidthFunction = this.x.rangeType;

    var mouseOver = function(d, item)
    {
        self.chart.mouseOver(self, this, d);
    };

    var mouseOut = function(d, item)
    {
        self.chart.mouseOut(self, this, d);
    };


    this.findMax = function()
    {
        var self = this;

        var max = 0;

        for (var series in this.series)
        {
            var s = this.series[series];
            var data = this.data.getData();
            var m = d3.max(data, s.accessor);
            max = m > max ? m : max;
        }

        return max;
    };


    this.series = [
    {
        name: 'default',
        accessor: function(d)
        {
            return d.value;
        },
        tooltipValue: function(d)
        {
            return d.value;
        },
        color: d3.functor('silver'),
        label: 'Value'
    }];

    this.stacked = function(_)
    {
        if (!arguments.length)
        {
            return stacked();
        }
        stacked = d3.functor(_);
        return this;
    };

    this.calculateYPos = function(func, d)
    {
        if (!d.yPos)
        {
            d.yPos = 0;
        }

        d.yPos += func(d);

        return d.yPos;
    };

    this.xPosition = function(d)
    {
        return self.x.scale(self.xFunction()(d));
    };

    this.calculateXPos = function(width, d)
    {
        if (!d.xPos)
        {
            d.xPos = self.xPosition(d);
        }
        else
        {
            d.xPos += width;
        }
        return d.xPos;
    };

    this.yPosition = function(d)
    {

        var position = self.stackedBars() ? self.y.scale(self.calculateYPos(self.yFunction(), d)) : self.y.scale(self.yFunction()(d));

        return position;
    };

    this.barWidth = function(d)
    {
        return self.x.scale.rangeBand(d);
    };

    this.groupedBarWidth = function(d)
    {

        var groupWidth = self.barWidth(d);

        var width = self.stackedBars() || (self.series.length == 1) ? groupWidth : groupWidth / self.series.length;

        return width;
    };

    this.offsetXPosition = function(d)
    {
        var width = self.groupedBarWidth(d);
        var position = self.stackedBars() ? self.xPosition(d) : self.calculateXPos(width, d);

        return position;
    };

    this.barHeight = function(d)
    {
        return (self.chart.height() - self.chart.margin()
            .top - self.chart.margin()
            .bottom) - self.y.scale(self.yFunction()(d));
    };

    this.stackedBars = function()
    {
        return self.stacked();
    };

    this.draw = function(drag)
    {
        var reset = function(d)
        {
            d.yPos = 0;
            d.xPos = 0;
        };

        var groups = this.chart.chart
            .selectAll('g.' + InsightConstants.BarGroupClass)
            .data(this.dataset(), this.matcher)
            .each(reset);

        var newGroups = groups.enter()
            .append('g')
            .attr('class', InsightConstants.BarGroupClass);

        var newBars = newGroups.selectAll('rect.bar');

        var click = function(filter)
        {
            return self.chart.filterClick(this, filter);
        };

        var duration = drag ? 0 : function(d, i)
        {
            return 200 + (i * 10);
        };

        for (var ser in this.series)
        {
            var s = this.series[ser];

            this.yFunction(s.accessor);

            newBars = newGroups.append('rect')
                .attr('class', s.name + 'class bar')
                .attr('y', this.y.bounds[0])
                .attr('height', 0)
                .attr('fill', s.color)
                .attr("clip-path", "url(#" + this.chart.clipPath() + ")")
                .on('mouseover', mouseOver)
                .on('mouseout', mouseOut)
                .on('click', click);

            newBars.append('svg:text')
                .attr('class', InsightConstants.ToolTipTextClass);

            newBars.append('svg:text')
                .attr('class', InsightConstants.ToolTipLabelClass);


            var bars = groups.selectAll('.' + s.name + 'class.bar')
                .transition()
                .duration(duration)
                .attr('y', this.yPosition)
                .attr('x', this.offsetXPosition)
                .attr('width', this.groupedBarWidth)
                .attr('height', this.barHeight);

            bars.selectAll("." + InsightConstants.ToolTipTextClass)
                .text(s.tooltipValue);

            bars.selectAll("." + InsightConstants.ToolTipLabelClass)
                .text(s.label);
        }
    };
}

ColumnSeries.prototype = Object.create(Series.prototype);
ColumnSeries.prototype.constructor = ColumnSeries;