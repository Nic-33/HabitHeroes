export const months = {
    length: {
        0: 31,
        1: 28,
        2: 31,
        3: 30,
        4: 31,
        5: 30,
        6: 31,
        7: 31,
        8: 30,
        9: 31,
        10: 30,
        11: 31
    },
    calcTomorrow: (months) => {
        const tempdate = new Date(Date.now())
        let day = tempdate.getDate()
        let month = tempdate.getMonth()+1
        let year = tempdate.getFullYear()

        day++;
        if (months[month] > day) {
            return `${year}-${month}-${day}`
        }
        day = day - months[month]
        month++
        if (month <= 11) {
            return `${year}-${month}-${day}`
        }
        month = 0
        year++
        return `${year}-${month}-${day}`
    },
    calcNextWeek: (months) => {
        const tempdate = new Date(Date.now())
        let day = tempdate.getDate()
        let month = tempdate.getMonth()
        let year = tempdate.getFullYear()

        day += 7;
        if (months[month] > day) {
            return `${year}-${month+1}-${day}`
        }
        day = day - months[month]
        month++
        if (month <= 11) {
            return `${year}-${month+1}-${day}`
        }
        month = 0
        year++
        return `${year}-${month}-${day}`
    },
    calcNextMonth:(months)=>{
        const tempdate = new Date(Date.now())
        let day = tempdate.getDate()
        let nextMonth = tempdate.getMonth() + 1
        let year = tempdate.getFullYear()

        if (nextMonth > 12 ) {
            nextMonth = 0
            year++
        }

        if (months[nextMonth] > day) {
            return `${year}-${nextMonth}-${day}`
        }

        day = months[nextMonth]
        return `${year}-${nextMonth}-${day}`
    }
}
