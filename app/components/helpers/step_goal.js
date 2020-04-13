export default stepGoal = stepToday => {
    let goal
    let color

    if(stepToday < 1000) {
        goal = 1000
        color = '#ff6666'
    } else if(stepToday > 1000 && stepToday < 2000) {
        goal = 2000
        color = '#ffe17a'
    } else if(stepToday > 2000 && stepToday < 4000) {
        goal = 4000
        color = '#90EE90'
    } else {
        goal = (Math.floor(stepToday / 4000) +1) * 4000
        color = '#A6D8FF'
    }
    
    return { goal, color }
}