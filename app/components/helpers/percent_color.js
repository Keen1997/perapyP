export default color = (percent) => {
    if (percent > 1 && percent <= 20) return '#ff6666'
    else if (percent > 20 && percent <= 40) return '#ffe17a'
    else if (percent > 40 && percent <= 60) return '#90EE90'
    else if (percent > 60 && percent <= 80) return '#A6D8FF'
    else if (percent > 80) return '#A6D8FF'
    else return '#fff'
}