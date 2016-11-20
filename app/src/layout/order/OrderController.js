app
    .controller('OrderController', ['$scope', '$location','$rootScope', '$timeout', function($scope, $location,$rootScope, $timeout) {


        //Products Collection
        $scope.productsList = [];

        //for test
        /*$scope.product1 = {ref: '1231231241', qtt:1, price:'12.00'};
        $scope.product2 = {ref: '4125125123', qtt:2, price:'42.00'};
        $scope.productsList.push($scope.product1);
        $scope.productsList.push($scope.product2);
        */


        //after "add new product" and then decoded
        $scope.afterDecode = function (codeResult){

            var newProduct = {
                    ref: codeResult,
                    qtt: 1
            };

            $timeout(function() {
                var alreadyInlist = false;
                //#1 - check if already in list
                $scope.productsList.forEach(function(product) {
                    if(product.ref === newProduct.ref){
                        //+1 qtt
                        product.qtt++;
                        alreadyInlist = true;
                    }
                });

                //#2 - store it into order if not in list
                if(!alreadyInlist){
                    $scope.productsList.push(newProduct);
                }

                //#3 - reset input file
                var input = document.querySelector("input[type=file]");
                input.value = "";
            });




        };

        //on Remove product from list
        $scope.removeProduct = function (ref){

            for (var i = 0; i < $scope.productsList.length; i++){
                if($scope.productsList[i].ref === ref){
                    $scope.productsList.splice(i, 1);
                }
            }

        };






        /**
         * Bar code matters
         */

        $scope.onAddNewProduct = function (){
            console.log('adding...');
            //simmulate the "choose file" button
            var input = document.querySelector("input[type=file]");
            input.click();
        };


        $scope.onResetAll = function (){
            console.log('resetting...')
        };


        /**
         *
         * CODE BAR
         *
         */
        $scope.lastResult = undefined;

        /**
         * To check out the Live Stream Option
         * Go to View2Controller
         */

        //When file is taken from camera or Src
        $scope.imageUploaded = function (e){
            $scope.decodeQuagga(URL.createObjectURL(e.files[0]));
        };

        //run de decoder!
        $scope.decodeQuagga = function(src) {
            Quagga.decodeSingle({
                src: src,
                numOfWorkers: 0,  // Needs to be 0 when used within node
                inputStream: {
                    size: 800  // restrict input-size to be 800px in width (long-side)
                },
                decoder: {
                    readers : ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader"]
                },
            }, function(result) {
                if(result.codeResult) {
                    console.log("result", result.codeResult.code);
                    $scope.afterDecode(result.codeResult.code);

                } else {
                    console.log("not detected");
                }
            });



        };

        //Quaggajs processes---
        Quagga.onProcessed(function(result) {
            var drawingCtx = Quagga.canvas.ctx.overlay,
                drawingCanvas = Quagga.canvas.dom.overlay,
                area;

            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                    result.boxes.filter(function (box) {
                        return box !== result.box;
                    }).forEach(function (box) {
                        Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
                    });
                }

                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
                }

                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
                }

            }
        });

        Quagga.onDetected(function(result) {
            var code = result.codeResult.code,
                $node,
                canvas = Quagga.canvas.dom.image;

            $node = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
            $node.find("img").attr("src", canvas.toDataURL());
            $node.find("h4.code").html(code);
            $("#result_strip ul.thumbnails").prepend($node);
        });


    }]);