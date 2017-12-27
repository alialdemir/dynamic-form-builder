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
    ]).controller('AppController', [
        '$scope', '$builder', '$validator', '$http', function ($scope, $builder, $validator, $http) {
            var textbox, textboxSurname;
            textbox = $builder.addFormObject('default', {
                id: 'textbox',
                component: 'textInput',
                label: 'Adınız',
                description: 'Adınız',
                placeholder: 'Adınız',
                required: false,
                editable: false
            });
            textboxSurname = $builder.addFormObject('default', {
                id: 'textbox',
                component: 'textInput',
                label: 'Soyadınız',
                description: 'Soyadınız',
                placeholder: 'Soyadınız',
                required: false,
                editable: false
            });
            $scope.form = $builder.forms['default'];
            $scope.input = [];
            $scope.defaultValue = {};
            $scope.defaultValue[textbox.id] = '';
            $scope.defaultValue[textboxSurname.id] = '';



            $scope.SendForm = function () {
                var inputs = [];
                for (let i = 0; i < $scope.form.length; i++) {// builder.forms içindeki modeli bizim api tarafındaki modele çevirdim.
                    const element = $scope.form[i];
                    console.log(element);
                    inputs.push({
                        component: element.component,
                        Label: element.label,
                        Placeholder: element.placeholder,
                        Required: element.required,
                        Description: element.description,
                        Options: element.options
                    });
                }
                $http({
                    method: 'Post',
                    data: JSON.stringify(inputs),
                    url: 'http://localhost:49808/api/Forms'
                }).then(function successCallback(response) {
                    alert('Formunuz kaydedilmiştir.')
                }, function errorCallback(response) {
                    console.log(response.data);
                    alert('Ops! bir hata oluştu.');
                });
            }

            return $scope.submit = function () {
                return $validator.validate($scope, 'default').success(function () {
                    $scope.SendForm();
                    return console.log('success');
                }).error(function (err) {
                    console.log(err);
                });
            };
        }
    ]);
}).call(this);