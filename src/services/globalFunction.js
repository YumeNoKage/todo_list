const globalFunction = {
    methods: {
        formatDate(date, format){
            return this.$moment(date).format(format)
        }
    }
}

export default globalFunction