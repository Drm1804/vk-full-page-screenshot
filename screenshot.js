var page = require('webpage').create();
var system = require('system');

page.open('http://vk.com/rentatech', function (status) {

    var action = new Action();

    if (status === 'success') {
        page.injectJs('bower_components/jquery/dist/jquery.min.js');


        //action.logIn();


        action.getMoreNews();

        page.onUrlChanged = function (targetUrl) {
            console.log('New URL: ' + targetUrl);

        };
        page.onLoadFinished = function (status) {
            console.log('Status: ' + status);

        };

        page.onAlert = function(msg) {
            console.log('ALERT: ' + msg);
            if(msg === 'end_page_load'){
                action.screenshot();
                action.exit();

            }
        };

    } else {
        console.log('Загрузка страницы не удалась')
    }


});

page.onConsoleMessage = function (msg) {
    system.stderr.writeLine('console: ' + msg);
};


function Action() {
    var _this = this;

    // Логинимся в VK
    _this.logIn = function () {
        page.evaluate(function () {
            $('#quick_email').val('+79514862282');
            $('#quick_pass').val('87694ca901172d90c523586155ff918663875a115058d5e20aa6acdc3fbf2890');

            var btn = $('#quick_login_button');

            btn.on('click', function () {
                console.log('click on enter button');
            });

            btn.click();

        });
    };

    _this.getMoreNews = function () {

        page.evaluate(function (_this) {

            var moreBtn = $('#wall_more_link');



            // Подписываемся на событие клика
            moreBtn.on('click', function(e){

                // Флаг продолжение загрузки (false когда загрузка окончена)
                var continueLoad = true;

                while(continueLoad){

                    // Если пиконка прогресса скрылась и показалась кнопка занчит нажимаем еще раз
                    if($('#wall_more_progress').is(':hidden') && $('#wall_more_link').is(':visible')){

                        continueLoad = false;
                        console.log('1');
                        setTimeout(function(){
                            click();
                        }, 1000);

                    // Если прогресс скрылся, а кнопка не показалась, значит достугнут конец списка и мы останавливаем цикл
                    } else if($('#wall_more_progress').is(':hidden') && $('#wall_more_link').is(':hidden')){
                        continueLoad = false;
                        console.log('2');

                        alert('end_page_load');


                    // Значит произошло что-то непредвиденное (задержки с загрузкой и т.д.) просто продолжаем цикл
                    } else {
                        continueLoad = true;
                        console.log('3')
                    }
                }
            });

            // Создаем событие click
            function click(){
                console.log('Нажал кнопку');
                moreBtn.click();
            };

            click();

        });
    };

    _this.screenshot = function () {
        setTimeout(function(){
            page.render('github.png');
        }, 1000);
    };

}


