var App = new Vue({
    el: '#app',
    data: {
        baseURL: 'https://FastApi.ivisondev.repl.co',
        users: [],
        cards: [],
        user: {'nome': '', 'email': '', 'titulo': '', 'pontos_conhecimento': 0},
        tabelaAtual: 'users',
    },
    methods: {
        // Funções de interação
        alterarTabela(tabela){
            this.tabelaAtual = tabela
        },

        // Funçóes secundárias
        topontos_conhecimento(number){
            return `P$ ${number.toFixed(2)}`
        },

        // Requests
        getUsers(){
            axios.get(this.baseURL+ '/user').then(
                response =>  {
                    this.users = response.data
                }).catch(error => {
                    window.location.href('index.html')
                    alert("Error: "+ error)
                })
        },
        getCards(){
            axios.get(this.baseURL+ '/').then(
                response => {
                    this.cards = response.data
                }).catch(error => {
                    alert("Error: "+ error)
                })
        },
    },
    computed:{
        allUsers(){
            return this.users.map(user => ({
                ...user,
                titulo: user.titulo == 'null' ? 'Não atribuído' : user.titulo,
                pontos_conhecimento: this.topontos_conhecimento(
                    user.pontos_conhecimento
                ),
                }))
        },
        allCards(){
            return this.cards.map(card => ({
                ...card,
                preco: this.topontos_conhecimento(
                    card.preco
                ),
            }))
        },
    },
    mounted(){       
        this.getUsers(),
        this.getCards()
    },
})