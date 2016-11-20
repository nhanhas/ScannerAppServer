app
    .controller('SettingsController', ['$scope', '$location','$rootScope', '$http',function($scope, $location,$rootScope, $http) {
        //initialize view vars
        $scope.backendUrl = '';
        $scope.appId = '';
        $scope.username = '';
        $scope.password = '';

        $scope.credentials = undefined;

        //check if it is in cache
        var cachedObject =  localStorage.getItem('credentials');
        if ( cachedObject ){
            $scope.credentials = JSON.parse(cachedObject);
            //view variables
            $scope.backendUrl = $scope.credentials.backendUrl;
            $scope.appId = $scope.credentials.appId;
            $scope.username = $scope.credentials.username;
            $scope.password = $scope.credentials.password;

        }


        //Do the Drive FX connection
        $scope.connect = function (){

            //all fields are fulfilled?
            if($scope.backendUrl !== '' && $scope.appId !== '' && $scope.username !== '' && $scope.password !== '' ){

                $scope.credentials = {
                    backendUrl : $scope.backendUrl,
                    appId : $scope.appId,
                    username : $scope.username,
                    password : $scope.password
                };

                //Store credentials
                localStorage.setItem('credentials',  JSON.stringify($scope.credentials));

            }

        };

        //Reset settings
        $scope.resetConnection = function(){

            //Store credentials
            localStorage.removeItem('credentials');

            $scope.credentials = undefined;

            $scope.backendUrl = '';
            $scope.appId = '';
            $scope.username = '';
            $scope.password = '';
        };

        //test Connection to drive
        $scope.testConnection = function(){

            var formData = {};

            $http.post('/api/testconnection', $scope.credentials)
                .success(function(data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.todos = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });

        }

    }]);