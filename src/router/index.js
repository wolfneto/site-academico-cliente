import { createRouter, createWebHistory } from 'vue-router'
import inicio from '../views/inicio.vue'
import listas from '../views/listas.vue'
import duvida from '../views/duvida.vue'
import politica from '../views/politica.vue'
import fidelidade from '../views/fidelidade.vue'
import login from '../views/login.vue'
import meusPedidos from '../views/meusPedidos.vue'
// import checkout from '../views/checkout.vue'
import checkout from '../views/checkout.vue'
import pedidoPago from '../views/pedidoPago.vue'
import pagamentoLogin from '../views/pagamentoLogin.vue'
import trocarSenha from '../views/trocarSenha.vue'
import kit from '../views/kit.vue'
import pagamentoSucesso from '../views/pagamentoSucesso.vue'
import pagamentoSucessoIugu from '../views/pagamentoSucessoIugu.vue'

const routes = [{
        path: '/',
        name: 'inicio',
        component: inicio
    },
    {
        path: '/politica',
        name: 'politica',
        component: politica
    },
    {
        path: '/duvidas',
        name: 'duvida',
        component: duvida
    },
    {
        path: '/listas/:id_semestre',
        name: 'listas',
        component: listas,
        props: true
    },
    {
        path: '/fidelidade',
        name: 'fidelidade',
        component: fidelidade
    },
    {
        path: '/kit',
        name: 'kit',
        component: kit,
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        props: true
    },
    {
        path: '/meus-pedidos',
        name: 'meusPedidos',
        component: meusPedidos
    },
    {
        path: '/checkout/:numeroPedido?',
        name: 'checkout',
        component: checkout,
        props: true,
        children: [{
                name: 'SeusDados',
                path: '/checkout/seus-dados/:numeroPedido?',
                component: () =>
                    import ('../components/steps/ConfirmeSeusDados.vue'),
                props: true
            },
            {
                name: 'EnderecoDeEntrega',
                path: '/checkout/entrega/:numeroPedido?',
                component: () =>
                    import ('../components/steps/Entrega.vue'),
                props: true
            },
            {
                path: '/checkout/metodo-de-pagamento/:numeroPedido?',
                component: () =>
                    import ('../components/steps/MetodoDePagamento.vue'),
                props: true
            },
            {
                path: '/checkout/informacoes-de-pagamento/:numeroPedido?',
                component: () =>
                    import ('../components/steps/InformacoesDePagamento.vue'),
                props: true
            },
        ]
    },
    {
        path: '/pagamento-login/:numeroPedido?',
        name: 'pagamentoLogin',
        component: pagamentoLogin,
        props: true
    },
    {
        path: '/pedido-pago/:numeroPedido?',
        name: 'pedidoPago',
        component: pedidoPago,
        props: true
    },
    {
        path: '/trocar-senha/:idTrocarSenha',
        name: 'trocarSenha',
        component: trocarSenha,
        props: true
    },

    {
        path: '/checkout-success',
        name: 'checkoutSuccess',
        component: pagamentoSucesso
    },
    {
        path: '/sucesso/iugu/:numeroPedido?',
        name: 'sucessoIugu',
        component: pagamentoSucessoIugu,
        props: true
    },
]

const router = createRouter({
    history: createWebHistory('/'), ///testeimagem/
    routes
})

export default router