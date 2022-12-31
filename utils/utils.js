const getCurrentDate = ()  => {

    let date = new Date();
    let aaaa = date.getUTCFullYear();
    let gg = date.getUTCDate();
    let mm = (date.getUTCMonth() + 1);

    if (gg < 10)
        gg = "0" + gg;

    if (mm < 10)
        mm = "0" + mm;

    let cur_day = aaaa + "-" + mm + "-" + gg;

    let hours = date.getUTCHours() + 1
    let minutes = date.getUTCMinutes()
    let seconds = date.getUTCSeconds();

    if (hours < 10)
        hours = "0" + hours;

    if (minutes < 10)
        minutes = "0" + minutes;

    if (seconds < 10)
        seconds = "0" + seconds;

    return cur_day + " " + hours + ":" + minutes + ":" + seconds;

}

module.exports = {
    getCurrentDate
}