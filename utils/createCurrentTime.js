export  function createTime() {
    let date = new Date();
    let minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    let time = `${date.getHours()}:${minutes}`;

    return time;
}