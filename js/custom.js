var app = new Vue({
    el:'#app',
    data:{
        startJip:'',
        endJip:'',
        startCity:'',
        endCity:''
    },
    watch:{
        startJip:function () {
            this.startCity = '';
            if(this.startJip.length == 5){
                this.lookUpStartZip();
            }
        },
        endJip:function () {
            this.endCity = '';
            if(this.endJip.length == 5){
                this.lookUpEndZip();
            }
        }
    },
    methods:{
        lookUpStartZip: _.debounce(function () {
            var app = this;
            app.startCity = 'Searching....';
            axios.get('http://ZiptasticAPI.com/'+ app.startJip)
                .then(function (response) {
                   app.startCity = response.data.city +','+ response.data.state
                })
                .catch(function (error) {
                   app.startCity = "Invalid ZipCode";
                })
        },500),
        lookUpEndZip: _.debounce(function () {
            var app = this;
            app.endCity = 'Searching....';
            axios.get('http://ZiptasticAPI.com/'+ app.endJip)
                .then(function (response) {
                   app.endCity = response.data.city +','+ response.data.state
                })
                .catch(function (error) {
                   app.endCity = error[0];
                })
        },500)

    }
});