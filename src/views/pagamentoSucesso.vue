<template>
  <div
    class="container d-flex align-items-center justify-content-center"
    style="min-height: 500px; max-width: 600px"
  >
    <div class="painel">
      <div class="header">
        <h3 style="margin: 0px">Sucesso!</h3>
      </div>

      <img :src="getURL('dentinho_4x.png')" alt="" class="dentinho" />

      <div class="content">
        <div class="mb-3" style="padding: 0px 5px">
          <div v-if="retorno_pagamento.reservado || retorno_pagamento.cobrado">
            o valor de
            <b>{{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(retorno_pagamento.total)
            }}</b>
            referente ao pedido <b>{{ retorno_pagamento.pedido }}</b> foi
            <b v-if="retorno_pagamento.reservado">reservado</b>
            <b v-else>cobrado</b> no seu cartao.
          </div>
          <div v-else-if="retorno_pagamento.boleto">
            O boleto no valor de
            <b>{{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(retorno_pagamento.total)
            }}</b>
            referente ao pedido <b>{{ retorno_pagamento.pedido }}</b> foi gerado
            com sucesso. clique no botão abaixo para salvar ou imprimir seu
            boleto.
            <br />
            Uma segunda via foi enviada para o seu email.
          </div>
          <div v-else-if="retorno_outros.outros">
            O pedido <b>{{ retorno_outros.id_pedido }}</b> no valor de
            <b>{{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(retorno_outros.total)
            }}</b>
            foi enviado com sucesso. Aguarde nosso contato para combinar a forma
            de pagamento.
            <br />
            Matenha sempre seus dados atualizados.
          </div>
        </div>

        <div class="row" style="margin: 10px auto; flex-direction: row-reverse">
          <div
            style="padding: 0px 5px"
            v-if="retorno_pagamento.boleto"
            class="col6 mb-3"
          >
            <button
              style="width: 100%"
              @click="imprimir_boleto()"
              type="button"
              class="btn btn-success"
            >
              Imprimir Boleto!
            </button>
          </div>
          <div
            style="padding: 0px 5px"
            class="mb-1"
            :class="retorno_pagamento.boleto ? 'col6' : 'col-12'"
          >
            <button
              style="width: 100%"
              @click="pushInicio()"
              type="button"
              class="btn btn-info"
            >
              Voltar ao inicio!
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      objToStore: { session: {}, shared: {} },
    };
  },
  created() {
    this.objToStore = this.$LS.get();
    if (
      this.lastCheckoutid != null &&
      this.lastCheckoutid ==
        (this.retorno_pagamento.pedido || this.retorno_outros.id_pedido)
    ) {
      this.$router.push({
        name: "inicio",
      });
    } else if (!this.retorno_outros.outros) {
      if (
        !this.retorno_pagamento.reservado &&
        !this.retorno_pagamento.cobrado &&
        !this.retorno_pagamento.boleto
      ) {
        this.$router.push({
          name: "meusPedidos",
        });
      } else {
        //reservado/cobrado ou boleto
        this.set_lastCheckoutid(this.retorno_pagamento.pedido);

        if (this.retorno_pagamento.boleto != null) {
          if (this.retorno_pagamento.boleto.bank != "C6") {
            this.email_pagamento_sucesso({
              aluno: this.objToStore.session.aluno,
              pedido: {
                outros: false,
                valor: this.retorno_pagamento.total,
                reservado: this.retorno_pagamento.reservado,
                boleto: this.retorno_pagamento.boleto,
                id_pedidos: this.retorno_pagamento.pedido,
                link: this.retorno_pagamento.boleto.pdf,
              },
            });
          }
        }

        if (this.descontoUsado) {
          this.update_desconto_representante(this.objToStore.session.aluno.cpf);
          this.set_descontoUsado(false);
        }
        this.update_listas_vendidas(this.retorno_pagamento.pedido);
        this.deleteLocalStorage();
      }
    } else {
      //outros
      this.set_lastCheckoutid(this.retorno_outros.id_pedido);
      this.email_pagamento_sucesso({
        aluno: this.objToStore.session.aluno,
        pedido: {
          outros: true,
          id_pedidos: this.retorno_outros.id_pedido,
          valor: this.retorno_outros.total,
        },
      });
      if (this.descontoUsado) {
        this.update_desconto_representante(this.objToStore.session.aluno.cpf);
        this.set_descontoUsado(false);
      }
      this.update_listas_vendidas(this.retorno_outros.id_pedido);
      this.deleteLocalStorage();
    }
  },
  computed: {
    ...mapState({
      lastCheckoutid: (state) => state.lastCheckoutid,
      retorno_pagamento: (state) => state.retorno_pagamento,
      retorno_outros: (state) => state.retorno_outros,
      descontoUsado: (state) => state.descontoUsado,
    }),
  },
  methods: {
    ...mapActions([
      "email_pagamento_sucesso",
      "update_listas_vendidas",
      "update_desconto_representante",
    ]),
    ...mapMutations([
      "set_refreshHeader",
      "set_lastCheckoutid",
      "set_descontoUsado",
    ]),
    imprimir_boleto() {
      if (this.retorno_pagamento.boleto.bank == "C6") {
        const win = window.open("", "_blank");
        let html = "";

        html += "<html>";
        html += '<body style="margin:0!important">';
        html +=
          '<embed width="100%" height="100%" src="data:application/pdf;base64,' +
          this.retorno_pagamento.boleto.pdf +
          '" type="application/pdf" />';
        html += "</body>";
        html += "</html>";

        setTimeout(() => {
          win.document.write(html);
        }, 0);
      } else {
        window.open(this.retorno_pagamento.boleto.pdf);
      }
    },
    pushInicio() {
      this.$router.push({
        name: "inicio",
      });
    },
    getURL(img) {
      return require("../assets/" + img);
    },
    deleteLocalStorage() {
      this.objToStore = this.$LS.get();
      this.objToStore.session.carrinho = {
        listas: [],
        totalCarrinho: 0.0,
        qtdItemsSelecionados: 0,
        faculdade: {},
        semestre: {},
      };
      delete this.objToStore.aluno;
      delete this.objToStore.pedido;
      delete this.objToStore.faculdade;
      delete this.objToStore.semestre;
      this.$LS.set(this.objToStore);
      this.set_refreshHeader(true);
    },
  },
};
</script>

<style scoped>
.col6 {
  flex: 0 0 auto;
  width: 50%;
}
.dentinho {
  height: 200px;
}
@media only screen and (max-width: 770px) {
  .col6 {
    flex: 0 0 auto;
    width: 100%;
  }
  .content {
    margin: 4px 15px !important;
  }
  .dentinho {
    height: 140px;
  }
}
.painel {
  border-radius: 25px;
  box-shadow: 0 0 1em 2px #7b7b7b;
}
.header {
  padding: 10px 3px;
  color: white;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  background: var(--primary);
  margin-bottom: 10px;
}
.content {
  margin: 10px 50px;
}
</style>
