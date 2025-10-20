<template>
  <Loader v-show="loading"></Loader>
  <div class="form-container text-left d-flex checkout-min-height" style="font-weight: bold">
    <div class="row m-0 p-0">
      <div class="col-12 m-0 p-0">
        <div class="col-12 mb-4 text-center">
          <h4>Formas de pagamento disponíveis</h4>
        </div>

        <div class="col-12 text-center" style="font-weight: normal">
          <span v-if="!pagamento_pedido.temDesconto">
            Pedido: <b>{{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(pagamento_pedido.pedido.valor_total)
            }}</b>
          </span>
          <span v-else>
            Pedido:
            <b>
              {{
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(pagamento_pedido.pedido.valor_total)
              }}</b>
            <br />
            <span v-if="pagamento_pedido.pedido.desconto_representante.porcentagem">
              ({{
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(
                  pagamento_pedido.pedido.valor_total *
                  (pagamento_pedido.pedido.desconto_representante
                    .desconto_porcentagem /
                    100)
                )
              }}
              de desconto)
            </span>
            <span v-else>
              ({{
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(
                  pagamento_pedido_prop.pedido.valor_total -
                  pagamento_pedido_prop.valor_pos_desconto
                )
              }}
              de desconto)
            </span>
          </span>
        </div>
        <div style="font-weight: normal" class="col-12 text-center">
          Frete:
          <b v-if="pagamento_pedido.frete > 0">{{
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(pagamento_pedido.frete)
          }}</b>
          <b v-else-if="
            pagamento_pedido.frete == 0 && pagamento_pedido.freteGratis
          ">
            FRETE GRATÍS
          </b>
          <b v-else> FRETE A COMBINAR </b>
          <!-- <button
            style="min-width: 50%"
            @click="cancelarTesteA()"
            type="button"
            class="btn btn-info"
          >
            Ir
          </button> -->
        </div>

        <div class="text-center" style="font-weight: normal">
          Total:
          <b>
            <span class="lista-preco" style="font-size: 18px; color: #2bbacb;">
              <span v-if="
                pagamento_pedido.pedido.semestre_pagamento.desconto_pix != 0
              ">
                <span style="color: #888; text-decoration: line-through; font-size: 16px; margin-right: 4px;">{{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pagamento_pedido.valor_final)
                }}</span>
                <span style="color: #1a8b99; font-weight: 600;">
                  {{
                    new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(
                      pagamento_pedido.valor_final -
                      (pagamento_pedido.valor_final *
                        pagamento_pedido.pedido.semestre_pagamento
                          .desconto_pix) /
                      100
                    )
                  }}
                  <span style="font-size: 12px;">(Pix/Boleto)</span>
                </span>
              </span>
              <span v-else>
                {{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pagamento_pedido.valor_final)
                }}
                à vista
              </span>

            </span>
          </b>
        </div>
      </div>

      <div class="row d-flex justify-content-center m-0 p-0 mb-4 text-center">
        <button id="botao-credito" v-if="pagamento_pedido.formas_pagamento.credito" type="button"
          class="btn btn-outline-info botão-metodo-pagamento m-1" @click="nextPage(1)">
          CARTÃO DE CRÉDITO <br />
          <span style="color: #1a8b99; font-weight: 600;">
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(
                pagamento_pedido.valor_final *
                (1 +
                  pagamento_pedido.pedido.parcelas_pagamento_creditos[0].acrescimo /
                  100)
              )
            }}
            <span
              v-if="pagamento_pedido.pedido.parcelas_pagamento_creditos[pagamento_pedido.pedido.parcelas_pagamento_creditos.length - 1].acrescimo != 0"
              style="font-size: 10px;"><br>parcelamento c/ juros</span>
          </span>
        </button>
        <button v-if="pagamento_pedido.formas_pagamento.dois_cartoes" id="botao-boleto" type="button"
          @click="nextPage(3)" class="btn btn-outline-info botão-metodo-pagamento m-1">
          DOIS CARTÕES <br />
          <i class="fas fa-credit-card"></i>
          <i class="far fa-credit-card"></i>
        </button>
        <button v-if="pagamento_pedido.formas_pagamento.boleto" id="botao-boleto" type="button"
          class="btn botão-metodo-pagamento m-1" :class="obj_disable.disabled ? 'btn-outline-danger' : 'btn-outline-info'
            " :style="obj_disable.disabled ? 'opacity: 0.7' : ''" @click="
            obj_disable.disabled
              ? callSnackbar('error', 'ATENÇÃO', obj_disable.msg, 5000)
              : nextPage(2)
            ">
          BOLETO À VISTA <br />
          <span style="color: #1a8b99; font-weight: 600;">
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(
                pagamento_pedido.valor_final -
                (pagamento_pedido.valor_final *
                  pagamento_pedido.pedido.semestre_pagamento.desconto_pix) /
                100
              )
            }}
          </span>
        </button>
        <button v-if="pagamento_pedido.formas_pagamento.pix" id="botao-pix" type="button"
          class="btn btn-outline-info botão-metodo-pagamento m-1" @click="nextPage(5)">
          PIX <br />
          <i class="fas fa-qrcode"></i>
          <br>
          <span style="color: #1a8b99; font-weight: 600;">
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(
                pagamento_pedido.valor_final -
                (pagamento_pedido.valor_final *
                  pagamento_pedido.pedido.semestre_pagamento.desconto_pix) /
                100
              )
            }}
          </span>
        </button>
        <button v-if="pagamento_pedido.formas_pagamento.outros" id="botao-boleto" type="button"
          class="btn btn-outline-info botão-metodo-pagamento m-1" @click="nextPage(4)">
          OUTROS <br />
          <i class="fas fa-ellipsis-h"></i>
        </button>
      </div>
    </div>
  </div>

  <div class="form-container mt-3 checkout-bottom-bar">
    <div class="row m-0 p-0">
      <div class="col-6 d-flex justify-content-start">
        <button @click="prevPage()" type="button" class="btn btn-danger">
          <i class="fas fa-arrow-left"></i> VOLTAR
        </button>
      </div>
      <div class="col-6 d-flex justify-content-end"></div>
    </div>
  </div>

  <Dialog style="max-width: 320px" modal :closable="true" v-model:visible="dialogIugu">
    <template #header>
      <h3 class="mr-2 mb-0">ATENÇÃO!</h3>
    </template>

    <b>Você será redirecionado para o site da nossa plataforma de pagamentos
      PagBank.</b>
    <br />
    <b> <u>Ambiente 100% Seguro.</u></b>

    <template #footer>
      <div class="d-flex justify-content-center">
        <button style="min-width: 50%" @click="callIugu()" type="button" class="btn btn-info">
          Ir
        </button>
      </div>
    </template>
  </Dialog>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
import Dialog from "primevue/dialog";
import Loader from "../../components/Loader";

export default {
  components: { Dialog, Loader },
  props: {
    numeroPedido: [String],
    pagamento_pedido_prop: [Object],
  },
  emits: ["nextPage", "prevPage", "complete", "scrollToTop"],
  data() {
    return {
      dialogIugu: false,
      loading: false,
      pagamento_pedido: this.pagamento_pedido_prop,
      formas: [],
      obj_disable: {
        disabled: false,
        msg: "",
      },
    };
  },
  async created() {
    if (!this.pagamento_pedido.inicio) {
      this.$router.push({
        path: "/checkout/seus-dados/" + this.numeroPedido,
      });
    }
    this.disableBoleto();
  },
  computed: {
    ...mapState({
      iugu: (state) => state.iugu,
    }),
  },
  methods: {
    ...mapActions(["get_iugu", "cancelarTeste"]),
    ...mapMutations(["set_iugu"]),
    async cancelarTesteA() {
      await this.cancelarTeste();
    },
    async callIugu() {
      this.loading = true;
      if (this.pagamento_pedido.pagamento_selecionado == 2) {
        // DESCONTO BOLETO
        this.pagamento_pedido.valor_final =
          this.pagamento_pedido.valor_pos_desconto -
          this.pagamento_pedido.valor_pos_desconto *
          (this.pagamento_pedido.pedido.semestre_pagamento.desconto_boleto /
            100) +
          this.pagamento_pedido.frete;
        this.pagamento_pedido.dados_pagamento.desconto_boleto = this.pagamento_pedido.pedido.semestre_pagamento.desconto_boleto;
      } else if (this.pagamento_pedido.pagamento_selecionado == 5) {
        // DESCONTO PIX
        this.pagamento_pedido.valor_final =
          this.pagamento_pedido.valor_pos_desconto -
          this.pagamento_pedido.valor_pos_desconto *
          (this.pagamento_pedido.pedido.semestre_pagamento.desconto_pix /
            100) +
          this.pagamento_pedido.frete;
        this.pagamento_pedido.dados_pagamento.desconto_pix = this.pagamento_pedido.pedido.semestre_pagamento.desconto_pix;
      }

      await this.get_iugu(this.pagamento_pedido);
      window.location.href = this.iugu.url;
      //this.loading = false;
    },
    disableBoleto() {
      if (
        parseFloat(this.pagamento_pedido.pedido.valor_total) <
        parseFloat(
          this.pagamento_pedido.pedido.semestre_pagamento.valor_minimo_boleto
        )
      ) {
        this.obj_disable.disabled = true;
        this.obj_disable.msg =
          "O valor mínimo para este método de pagamento é de: " +
          new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(
            this.pagamento_pedido.pedido.semestre_pagamento.valor_minimo_boleto
          );
      }
      if (this.pagamento_pedido.pedido.naoPodeBoleto) {
        this.obj_disable.disabled = true;
        this.obj_disable.msg =
          "Você possui muitos boletos em aberto, entre em contato para que possamos ajudar";
      }
    },
    putCliente(pagamento_selecionado) {
      this.pagamento_pedido.dados_pagamento.dois_cartoes =
        pagamento_selecionado == 3;
      if (pagamento_selecionado == 1 || pagamento_selecionado == 3) {
        if (pagamento_selecionado == 3) {
          this.pagamento_pedido.valor_primeiro_cartao =
            this.pagamento_pedido.valor_final / 2;
          this.pagamento_pedido.valor_segundo_cartao =
            this.pagamento_pedido.valor_final -
            this.pagamento_pedido.valor_primeiro_cartao;
        }
        /**
         * SETA A PROPRIEDADE BANCO
         */
        this.pagamento_pedido.dados_pagamento.banco = this.pagamento_pedido.pedido.semestre_pagamento.banco_credito;
        /**
         * SETA A PROPRIEDADE BANCO
         */
      } else if (pagamento_selecionado == 2) {
        this.pagamento_pedido.dados_pagamento.titular = null;
        this.pagamento_pedido.dados_pagamento.segundo_titular = null;

        /**
         * SETA A PROPRIEDADE BANCO
         */
        this.pagamento_pedido.dados_pagamento.banco = this.pagamento_pedido.pedido.semestre_pagamento.banco_boleto;
        /**
         * SETA A PROPRIEDADE BANCO
         */
      } else {
        //metodo de pagamento é outros
      }
    },
    setParcelas() {
      if (this.pagamento_pedido.pedido.parcelas_pagamento_creditos.length > 0) {
        for (const registro of this.pagamento_pedido.pedido
          .parcelas_pagamento_creditos) {
          if (
            registro.valor_de <= this.pagamento_pedido.valor_final &&
            (registro.valor_ate >= this.pagamento_pedido.valor_final ||
              registro.valor_ate == 0)
          ) {
            this.pagamento_pedido.parcelas = registro.qtd_parcela;
          }
        }
      } else {
        this.pagamento_pedido.parcelas = this.pagamento_pedido.pedido
          .semestre_pagamento.max_parcelas
          ? this.pagamento_pedido.pedido.semestre_pagamento.max_parcelas
          : 10;
      }
    },
    nextPage(pagamento_selecionado) {
      this.pagamento_pedido.pagamento_selecionado = pagamento_selecionado;
      this.putCliente(pagamento_selecionado);
      this.setParcelas();
      if (
        pagamento_selecionado == 1 &&
        this.pagamento_pedido.pedido.semestre_pagamento.iugu
      ) {
        this.dialogIugu = true;
      } else {
        this.$emit("nextPage", {
          pageIndex: 2,
          pagamento_pedido_prop: this.pagamento_pedido,
        });
        this.$emit("scrollToTop");
      }
    },
    prevPage() {
      this.$emit("prevPage", {
        pageIndex: 2,
        pagamento_pedido_prop: this.pagamento_pedido,
      });
      this.$emit("scrollToTop");
    },
    avancarEvent(tipoPagamento) {
      this.set_forma_de_pagamento(tipoPagamento);
      this.$router.push({
        path: "/checkout/informacoes-de-pagamento/" + this.numeroPedido,
      });
    },
    voltarEvent() {
      this.$router.push({
        path: "/checkout/entrega/" + this.numeroPedido,
      });
    },
    callSnackbar(severity, summary, detail, life) {
      this.set_snackbar({
        show: true,
        severity: severity,
        summary: summary,
        detail: detail,
        life: life,
      });
    },
  },
};
</script>

<style scoped>
.botão-metodo-pagamento {
  border-radius: 30px;
  word-break: keep-all;
  font-size: 17px;
  height: 148px;
  width: 148px;
}

/* .botão-metodo-pagamento:hover {
  background: white;
  color: #17a2b8;
}
.botão-selected {
  color: #fff !important;
  background-color: #17a2b8 !important;
  border-color: #17a2b8 !important;
} */
</style>
