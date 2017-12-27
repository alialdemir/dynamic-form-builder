(function () {
    angular.module('app', ['builder', 'builder.components', 'validator.rules']).run([
        '$builder', function ($builder) {
            return $builder.registerComponent('name', {
                group: 'Default',
                label: 'Name',
                required: false,
                arrayToText: true,
                template: "<div class=\"form-group\">\n    <label for=\"{{formName+index}}\" class=\"col-md-4 control-label\" ng-class=\"{'fb-required':required}\">{{label}}</label>\n    <div class=\"col-md-8\">\n        <input type='hidden' ng-model=\"inputText\" validator-required=\"{{required}}\" validator-group=\"{{formName}}\"/>\n        <div class=\"col-sm-6\" style=\"padding-left: 0;\">\n            <input type=\"text\"\n                ng-model=\"inputArray[0]\"\n                class=\"form-control\" id=\"{{formName+index}}-0\"/>\n            <p class='help-block'>First name</p>\n        </div>\n        <div class=\"col-sm-6\" style=\"padding-left: 0;\">\n            <input type=\"text\"\n                ng-model=\"inputArray[1]\"\n                class=\"form-control\" id=\"{{formName+index}}-1\"/>\n            <p class='help-block'>Last name</p>\n        </div>\n    </div>\n</div>",
                popoverTemplate: "<form>\n    <div class=\"form-group\">\n        <label class='control-label'>Label</label>\n        <input type='text' ng-model=\"label\" validator=\"[required]\" class='form-control'/>\n    </div>\n    <div class=\"checkbox\">\n        <label>\n            <input type='checkbox' ng-model=\"required\" />\n            Required\n        </label>\n    </div>\n\n    <hr/>\n    <div class='form-group'>\n        <input type='submit' ng-click=\"popover.save($event)\" class='btn btn-primary' value='Save'/>\n        <input type='button' ng-click=\"popover.cancel($event)\" class='btn btn-default' value='Cancel'/>\n        <input type='button' ng-click=\"popover.remove($event)\" class='btn btn-danger' value='Delete'/>\n    </div>\n</form>"
            });
        }
    ]).controller('FormController', [
        '$scope', '$builder', '$validator', '$http', '$location', function ($scope, $builder, $validator, $http, $location) {
            $scope.FormIds = [];
            $scope.input = [];
            $scope.defaultValue = {};
            $scope.IsShowForm = false;
            var searchObject = $location.search();// guid bir şekilde formları okumak için querystring kullandım bunun yerine url kısmından örneğin www.sample.com/form/{GuidId} routing şeklinde olabilrdi
            if (searchObject.GuidId) {
                $http({
                    method: 'get',
                    url: 'http://localhost:49808/api/Forms?GuidId=' + searchObject.GuidId
                }).then(function successCallback(response) {
                    $scope.AddFormInputs(response.data);
                }, function errorCallback(response) {
                    console.log(response)
                });
            }
            else {// Querystring boş ise form listesi çekildi                
                $http({
                    method: 'get',
                    url: 'http://localhost:49808/api/Forms'
                }).then(function successCallback(response) {
                    $scope.FormIds = response.data;
                }, function errorCallback(response) {
                    console.log(response)
                });
            }
            $scope.AddFormInputs = function (data) {// Api'den gelen component bilgileri builder'e dönüştürdüm
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    var textbox = $builder.addFormObject('default', {
                        id: 'input' + element.InputId,
                        component: element.component,
                        label: element.Label,
                        description: element.description,
                        placeholder: element.placeholder,
                        required: element.Required,
                        options: element.Options,
                        editable: false
                    });
                    $scope.defaultValue[textbox.id] = element.Value;
                }
                $scope.IsShowForm = true;
            }
            return $scope.submit = function () {
                var inputs = [];
                for (let i = 0; i < $scope.input.length; i++) {// builder.forms içindeki modeli bizim api tarafındaki modele çevirdim.
                    const element = $scope.input[i];
                    console.log(element);
                    inputs.push({
                        InputId: element.id.replace('input', ''),
                        UserAnswer: element.value,
                    });
                }
                $http({
                    method: 'Post',
                    data: JSON.stringify(inputs),
                    url: 'http://localhost:49808/api/Answers'
                }).then(function successCallback(response) {
                    alert('Cevabınız kaydedilmiştir.');
                }, function errorCallback(response) {
                    console.log(response.data);
                    alert('Ops! bir hata oluştu.');
                });
            };
        }
    ]);
}).call(this);