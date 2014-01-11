'use strict';

angular.module('app').controller('MainCtrl', function ($scope, $interval) {
  var widgetDefinitions = [
    {
      directive: 'time',
      style: {
        width: '33%'
      }
    },
    {
      directive: 'random',
      style: {
        width: '33%'
      }
    },
    {
      directive: 'scope-watch',
      attrs: {
        value: 'randomValue'
      },
      style: {
        width: '34%'
      }
    },
    {
      directive: 'top-n',
      attrs: {
        data: 'topTen'
      },
      style: {
        width: '40%'
      }
    },
    {
      directive: 'gauge',
      attrs: {
        value: 'percentage'
      },
      style: {
        width: '30%',
        'max-width': '300px'
      }
    },
    {
      directive: 'progressbar',
      attrs: {
        class: 'progress-striped',
        type: 'success',
        value: 'percentage'
      },
      style: {
        width: '30%'
      }
    },
    {
      directive: 'line-chart',
      attrs: {
        chart: 'chart'
      },
      style: {
        width: '50%'
      }
    }
  ];

  var defaultWidgets = _.clone(widgetDefinitions);

  $scope.dashboardOptions = {
    widgetButtons: true,
    widgetDefinitions: widgetDefinitions,
    defaultWidgets: defaultWidgets
  };

  // random scope value (scope-watch widget)
  $interval(function () {
    $scope.randomValue = Math.random();
  }, 500);

  // top 10 (topN widget)
  $interval(function () {
    var topTen = _.map(_.range(1, 11), function (index) {
      return {
        name: 'item' + index,
        value: Math.floor(Math.random() * 100)
      };
    });
    $scope.topTen = topTen;
  }, 1000);

  // percentage (gauge widget, progressbar widget)
  $scope.percentage = 10;
  $interval(function () {
    $scope.percentage = ($scope.percentage + 10) % 100;
  }, 1000);

  var max = 30;

  // line chart
  var data = [];
  var chartValue = 50;
  function nextValue() {
    chartValue += Math.random() * 40 - 20;
    chartValue = chartValue < 0 ? 0 : chartValue > 100 ? 100 : chartValue;
    return chartValue;
  }
  var now = Date.now();
  for (var i = max - 1; i >= 0; i--) {
    data.push({
      timestamp: now - i * 1000,
      value: nextValue()
    });
  }
  $scope.chart = {
    data: data,
    max: max
  };

  $interval(function () {
    data.shift();
    data.push({
      timestamp: Date.now(),
      value: nextValue()
    });

    $scope.chart = {
      data: data,
      max: max
    };
  }, 1000);

  // external controls
  $scope.addWidget = function (id) {
    $scope.dashboardOptions.addWidget(id);
  };

  $scope.addWidgetScopeWatch = function () {
    $scope.dashboardOptions.addWidget('scope-watch',
      {
        value: 'randomValue'
      });
  };
});