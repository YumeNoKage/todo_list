const globalFunction = {
    methods: {
        formatDate(date, format){
            return this.$moment(date).format(format)
        },
        getPriority(id, type){
            let data = [
                {name: 'Very High',value: 'very-high',color: 'red'},
                {name: 'High',value: 'high',color: 'yellow'},
                {name: 'Medium',value: 'normal',color: 'green'},
                {name: 'Low',value: 'low',color: 'blue-strong'},
                {name: 'Very Low',value: 'very-low',color: 'purpel'}
            ]

            if(type == 'option'){
                return data
            } else {
                return data.filter((item)=> item.value == id)[0]
            }
        }
    }
}

export default globalFunction