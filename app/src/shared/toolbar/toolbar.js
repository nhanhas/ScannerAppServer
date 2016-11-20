app

    .directive('toolbar', ['$location', function(location) {
        return {
            restrict: 'EA',
            scope: {
                viewSelected:'@',
                onAdd:'&?',
                onReset:'&?',
                onResetSettings:'&?',
                onTestConnection:'&?'
            },
            templateUrl: 'shared/toolbar/toolbar.html',

            link: function (scope, element, attrs) {

                scope.goBack = function (){
                    location.path('/home');
                };

                /**
                 * Orders
                 */
                scope.addNewProduct = function(){
                    if(scope.onAdd){
                        scope.onAdd();
                    }
                };

                scope.onResetAll = function(){
                    if(scope.onReset){
                        scope.onReset();
                    }
                };


                /**
                 * Settings
                 */

                scope.resetSettings = function(){
                    if(scope.onResetSettings){
                        scope.onResetSettings();
                    }
                };

                scope.testConnection = function(){
                    if(scope.onTestConnection){
                        scope.onTestConnection();
                    }
                };

            }
        };
    }]);