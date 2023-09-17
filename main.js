function timeSection() {
    var gettime = new Date();
    var hour = gettime.getHours();
    var minute = gettime.getMinutes();
    var second = gettime.getSeconds();

    if (hour < 10){
        hour = "0" + hour;
    }
    if (minute < 10){
        minute = "0" + minute;
       }
    if (second < 10){
        second = "0" + second;
    }

    var time = hour +":"+ minute +":"+ second;
    document.querySelector('.current-time').innerHTML = time;
}
timeSection();//hiện ra thời gian ngay khi vào trang.
setInterval(timeSection, 1000);//cập nhật thời gian.

var bigCitiesClock = function() {
    var date = new Date();  
    var localOffset = date.getTimezoneOffset() * 60000;//vì 1 phút bằng 60000 mili giây.
    var utcTime = date.getTime() + localOffset;
    
    var timeOffsets = {
        Beijing: 8,
        NewYork: -4,
        London: 1,
        Moscow: 3,
        Tokyo: 9
    };

    var cityKeys = Object.keys(timeOffsets);//đây là 1 mảng lấy ra key.
    for (var i = 0; i < cityKeys.length; i++) {
        var cityName = cityKeys[i];
        var cityOffset = timeOffsets[cityName];
        var cityTimeHandle = utcTime + (cityOffset * 3600000);//vì 1 giờ bằng 3600000 mili giây.
        
        var cityDate = new Date(cityTimeHandle);
        var hour = cityDate.getHours();
        var minute = cityDate.getMinutes();
        
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }
        
        var cityTime = hour + ":" + minute;
        document.querySelector('#cities .mon' + (i + 1)).innerHTML = cityTime;
    }
}
bigCitiesClock();
setInterval(bigCitiesClock, 1000);

var isClockHidden = false;// nếu đặt trong hàm thì mỗi lần gọi sẽ bị reset.
function showClock() {
//loại bỏ các phần tử con của phần từ main mà không có class clock và current-time.
//dấu * là chỉ định lấy phần tử con của main(kể cả thẻ con của thẻ).
//:not(.element),:not(#element) không lấy thẻ có class hoặc id này.
    var mainNonClockElements = document.querySelectorAll('#main * :not(.clock):not(.current-time)');
    var logo = document.querySelector('.logo');
    var time = document.querySelector('.clock .current-time');
    var footer = document.getElementById('footer');
    
    if (!isClockHidden) {
            for (var i = 0; i < mainNonClockElements.length; i++) {
                mainNonClockElements[i].style.display = "none";
            }
            logo.style.display = 'inline-block';
            time.style.marginTop = '120px';
            footer.style.display = 'none';
           isClockHidden = true;//trạng thái của clock
        } else {
            for (var i = 0; i < mainNonClockElements.length; i++) {
                mainNonClockElements[i].style.display = "";// giữ nguyên display trong css.
                time.style.marginTop = "";
            }
            footer.style.display = 'block';
           isClockHidden = false;
        }
}

var currentCityIndex = -1; // Khởi tạo biến toàn cục lưu trữ chỉ số thành phố đã chọn.
function takeCitiesTime() {
    var date = new Date();
    var second = date.getSeconds();

    if (second < 10) {
        second = "0" + second;
    }

    var cities = document.querySelectorAll('#cities > li');
    var place = document.querySelector('.place-content .place');
    var clock = document.querySelector('.clock .current-time');

    var locations = [];
    for (let i = 0; i < cities.length; i++) {
//trim để loại bỏ khoảng trắng giưa 2 đầu stirng
//split lấy phần tử thứ [n] dựa trên dấu xuống dòng(ở đây là lấy dòng đầu tiên).
        var location = cities[i].textContent.trim().split('\n')[0].trim();
//cho tất cả là in thường và tách ra nếu cho vào 1 mảng nếu có 2 từ.
        location = location.toLowerCase().split(' ').map(function(word) {
//in hoa chữ đầu(lúc này nỏ chỉ trả về chữ đầu nên dùng slice(1) để lấy những từ còn lại).
            return word.charAt(0).toUpperCase() + word.slice(1);
          }).join(' ');//trả về từ mới với dấu cách ở giữa các phần từ trong mảng.  
        locations.push(location);
    }
   
    var locationsTime = [];
    for (let i = 0; i < cities.length; i++) {
        var citiesTime = document.querySelector('#cities .mon' + (i + 1));
        var cityTime = citiesTime.textContent + ":" + second;
        locationsTime.push(cityTime);
    }
    
    var country = ["Trung Quốc", "Mỹ", "Anh", "Nga", "Nhât Bản"];
    for (let i = 0; i < cities.length; i++) {
        cities[i].addEventListener("click", function () {
        place.innerHTML = locations[i] + ", " + country[i];
        clock.innerHTML = locationsTime[i];
        currentCityIndex = i; // Lưu chỉ số thành phố đã chọn vào biến toàn cục.
        });
    }

    // Kiểm tra nếu có thành phố đã chọn, sử dụng thời gian của thành phố đó.
    if (currentCityIndex !== -1) {
        clock.innerHTML = locationsTime[currentCityIndex];
    }
}
takeCitiesTime();
setInterval(takeCitiesTime, 1000);


var dateSection = function() {
    var getdate = new Date();
    var day = getdate.getDay();//từ 0 -> 6 với 0 là chủ nhật, 1 -> 6 tương ứng với thứ 2 -> thứ 7.
    var date = getdate.getDate();
    var month = getdate.getMonth();//tháng là từ 0->11 tương ứng theo 1->12.
    var year = getdate.getFullYear();

    var dayOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    var stringDay = dayOfWeek[day];
    var monthOfYear =["Một","Hai","Ba","Bốn","Năm","Sáu","Bảy","Tám","Chín","Mười","Mười Một","Mười Hai"];
    var stringMonth = monthOfYear[month];

    var clockDate = stringDay + ", " + date + " Tháng " + stringMonth  + ", "+year;
    document.querySelector('.current-date').innerHTML = clockDate;
}
dateSection();

function reloadWeb(){
    window.location.reload("http://127.0.0.1:5500/");//tải lại trang(lưu thông tin).
}


