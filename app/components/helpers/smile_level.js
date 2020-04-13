export default (smilingProbability) => {
    let smilePercent = (smilingProbability * 100).toFixed(0)

    if (smilePercent >= 90) return 'high'
    else if (smilePercent > 35 && smilePercent < 90) return 'medium'
    else return 'low'
}