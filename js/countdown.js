(function ($) {
    $.fn.countdown = function (options) {
        var settings = $.extend({endDateTime: new Date()}, options);

        return this.each(function () {
            var timeoutInterval = null;
            var container = $(this);
            settings.endDateTime = new Date(container.data("countdown"));

            updateCounter();
            getCountDown();

            function getCountDown() {
                clearTimeout(timeoutInterval);
                timeoutInterval = setTimeout(function () {
                    updateCounter();
                }, 1000);
            }

            function getCurrentCountDown() {
                var currentDateTime = new Date();

                var years = currentDateTime.getFullYear() - settings.endDateTime.getFullYear();

                var months = currentDateTime.getMonth() - settings.endDateTime.getMonth();
                var dates = currentDateTime.getDate() - settings.endDateTime.getDate();
                if (months < 0) {
                    years--;
                }

                var diff = parseFloat(currentDateTime - settings.endDateTime);
                var totalDays = parseFloat((((diff / 1000.0) / 60.0) / 60.0) / 24.0);
                var fullDays = totalDays - years * 365.25;
                var days = parseInt(fullDays);

                var hours = currentDateTime.getHours() - settings.endDateTime.getHours();
                if (hours < 0) {
                    hours += 24;
                }
                if (days >= 365) {
                    days = 0;
                }

                var minutes = currentDateTime.getMinutes() - settings.endDateTime.getMinutes();
                if (minutes < 0) {
                    minutes += 60;
                    hours--;
                }

                var seconds = currentDateTime.getSeconds() - settings.endDateTime.getSeconds();

                return {
                    years: formatNumber(years),
                    days: formatNumber(days),
                    hours: formatNumber(hours),
                    minutes: formatNumber(minutes),
                    seconds: formatNumber(seconds)
                };
            }

            function updateCounter() {
                var countDown = getCurrentCountDown();

                var years = container.find(".years .countdown-time").first();
                var days = container.find(".days .countdown-time").first();
                var hours = container.find(".hours .countdown-time").first();
                var minutes = container.find(".minutes .countdown-time").first();
                var seconds = container.find(".seconds .countdown-time").first();

                var yearVal = years.html();
                var dayVal = days.html();
                var hourVal = hours.html();
                var minuteVal = minutes.html();
                var secondVal = seconds.html();

                if (countDown.days == 0) {
                    years.parent().addClass("zero");
                }
                if (countDown.days == 0) {
                    days.parent().addClass("zero");
                }
                if (countDown.hours == 0) {
                    hours.parent().addClass("zero");
                }
                if (countDown.minutes == 0) {
                    minutes.parent().addClass("zero");
                }
                if (countDown.seconds == 0) {
                    seconds.parent().addClass("zero");
                }

                if (yearVal != countDown.years) {
                    years.html(countDown.years);
                }
                if (dayVal != countDown.days) {
                    days.html(countDown.days);
                }
                if (hourVal != countDown.hours) {
                    hours.html(countDown.hours);
                }
                if (minuteVal != countDown.minutes) {
                    minutes.html(countDown.minutes);
                }
                if (secondVal != countDown.seconds) {
                    seconds.html(countDown.seconds);
                }

                getCountDown();
            }

            function formatNumber(number) {
                return Math.max(0, number).toString();
            }
        });
    }
})(jQuery);
