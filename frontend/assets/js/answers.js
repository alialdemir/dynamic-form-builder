(function () {
    angular.module('app', ['builder', 'builder.components', 'validator.rules'])
        .filter('groupBy', function () {// Gruplama için...
            return function (data, key) {
                if (!(data && key)) return;
                var result = {};
                for (var i = 0; i < data.length; i++) {
                    if (!result[data[i][key]])
                        result[data[i][key]] = [];
                    result[data[i][key]].push(data[i])
                }
                return result;
            };
        })
        .controller('FormController', [
            '$scope', '$builder', '$validator', '$http', '$location', function ($scope, $builder, $validator, $http) {
                $scope.Answers = [];
                $scope.input = [];
                $scope.SelectedFormId = 0;
                $scope.defaultValue = {};
                $scope.IsShowForm = false;
                $scope.GetFormIds = function () {
                    $http({
                        method: 'get',
                        url: 'http://localhost:49808/api/Forms'
                    }).then(function successCallback(response) {
                        $scope.FormIds = response.data;
                    }, function errorCallback(response) {
                        console.log(response)
                    });
                }
                $scope.GetFormIds();
                $scope.onSelectedForm = function () {
                    $http({
                        method: 'get',
                        url: 'http://localhost:49808/api/Answers?formId=' + $scope.SelectedFormId
                    }).then(function successCallback(response) {
                        $scope.Answers = response.data;
                        console.log($scope.Answers);
                    }, function errorCallback(response) {
                        console.log(response)
                    });
                }
            }
        ]);
}).call(this);