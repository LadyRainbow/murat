
    // MAP
    var mapLink = $('.map-link li');
    mapLink.click(function () {
        mapLink.removeClass('white');
        $(this).addClass('white');
    });
    //Дождёмся загрузки API и готовности DOM.
    ymaps.ready(init);
    var locations = [
        {
            pos: [59.933343, 31.009634],
            city: 'Москва',
            phone: '8 (800) 555-98-54',
            address: 'Москва, Новочеркасский пр-т, д. 41',
            email: 'info@lenfincentr.ru',
            rezhim: 'По будним дням с 10:00 до 19:00. Выходные с 11:00 до 18:00',
        },
        {
            pos: [59.873104, 30.981789],
            city: 'Лондон',
            phone: '8 (700) 555-98-54',
            address: 'Лондон, НовоЛондонский пр-т, д. 41',
            email: '12info@lenfincentr.ru',
            rezhim: 'По Выходные с 11:00 до 18:00',
        },
        {
            pos: [59.795277, 30.820440],
            city: 'Гонконг',
            phone: '8 (600) 555-98-54',
            email: '123info@lenfincentr.ru',
            address: 'Гонконг, НовочПитерский пр-т, д. 41',
            rezhim: 'По будним дням с 11:00 до 00:00',
        },
    ];
    function init() {
        // в этой версии координаты просто элементы массива (и они поменяны местами)


        // Создание экземпляра карты и его привязка к контейнеру с
        // заданным id ("map").
        myMap = new ymaps.Map('map', {
            // При инициализации карты обязательно нужно указать
            // её центр и коэффициент масштабирования.
            center: locations[0].pos, // Москва
            zoom: 8
        });

        var marker, i, popUpContent;

        var myPlacemark;

        for (i = 0; i < locations.length; i++) {

            myGeoObject = new ymaps.GeoObject({
               // Описание геометрии.
               geometry: {
                   type: "Point",
                   coordinates: locations[i].pos,
                    iconContent: '12'
               },
               // Свойства.
               properties: {
                   // Контент метки.
                   // iconContent: 'Я тащусь',
                   // hintContent: 'Ну давай уже тащи',
                   city: locations[i].city,
                   phone: locations[i].phone,
                   address: locations[i].address,
                   rezhim: locations[i].rezhim,
               },
           },
            {
                preset: 'islands#darkBlueDotIcon'
              }
         );
            myMap.geoObjects.add(myGeoObject);

            myGeoObject.events.add('click', function (e) {
                var city = e.originalEvent.target.properties.get('city');
                var phone = e.originalEvent.target.properties.get('phone');
                var address = e.originalEvent.target.properties.get('address');
                var email = e.originalEvent.target.properties.get('email');
                var rezhim = e.originalEvent.target.properties.get('rezhim');
                $('.city-main').text(city);
                $('.map-phone').text(phone);
                $('.map-address').text(address);
                $('.map-email').text(email);
                $('.map-rezhim').text(rezhim);
            });
        };

        mapLink.click(function () {
            mapLink.removeClass('active');
            $(this).addClass('active');
            var index = $(this).attr('data-id');
            var destination = locations[index].pos;
            var city = locations[index].city;
            var phone = locations[index].phone;
            var address = locations[index].address;
            var email = locations[index].email;
            var rezhim = locations[index].rezhim;
            console.log(destination);
            myMap.panTo(destination, {
                flying: 1
            }).then(function () { myMap.setZoom(16)});


            $('.city-main').text(city);
            $('.map-phone').text(phone);
            $('.map-address').text(address);
            $('.map-email').text(email);
            $('.map-rezhim').text(rezhim);

            return false;
        });



}
