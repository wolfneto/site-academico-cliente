<template>
  <Loader v-show="loading"></Loader>
  <div
    class="form-container text-left d-flex checkout-min-height"
    style="font-weight: bold"
  >
    <div class="row m-0 p-0">
      <div class="col-12 m-0 p-0">
        <div class="col-12 mb-4  text-center">
          <h4>Dados de Entrega</h4>
        </div>

        <div
          v-if="pagamento_pedido.pedido.sem.base_frete > 0"
          class="col-12  text-center"
          style="font-size: 12px; font-weight: normal"
        >
          (O frete é calculado com base no seu CEP.)
        </div>
        <div class="col-12  text-center" style="font-weight: normal">
          <span v-if="!pagamento_pedido.temDesconto">
            Pedido:
            <b>{{
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
              }}</b
            >
            <br />
            <span
              v-if="pagamento_pedido.pedido.desconto_representante.porcentagem"
            >
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
                  pagamento_pedido.pedido.valor_total -
                    pagamento_pedido.valor_pos_desconto
                )
              }}
              de desconto)
            </span>
          </span>
        </div>
        <div style="font-weight: normal" class="col-12  text-center">
          Frete:
          <b v-if="freteFinal > 0">{{
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(freteFinal)
          }}</b>
          <b v-else-if="freteFinal == 0 && pagamento_pedido.freteGratis">
            FRETE GRATÍS
          </b>
          <b v-else>
            FRETE A COMBINAR
          </b>
        </div>

        <div class="text-center" style="font-weight: normal">
          Total:
          <b>
            <span class="lista-preco" style="font-size: 18px; color: #2bbacb;">
              <span
                v-if="
                  pagamento_pedido.pedido.semestre_pagamento.desconto_pix != 0
                "
              >
                <span
                  style="color: #888; text-decoration: line-through; font-size: 16px; margin-right: 4px;"
                  >{{
                    new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(pagamento_pedido.valor_final)
                  }}</span
                >
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

      <div class="row m-0 p-0 mb-4">
        <div class="col4">
          CEP * <br />
          <input
            :class="v$.entrega.cep.$error ? 'invalid-input' : ''"
            id="cep-campo"
            @change="watchEnderecoUpdate()"
            @blur="getCep(entrega.cep, entrega, 'numero-campo')"
            @keyup="
              getCep(
                entrega.cep,
                entrega,
                'numero-campo',
                pagamento_pedido.pedido.sem.zonas_fretes,
                pagamento_pedido.pedido.sem.base_frete
              )
            "
            v-model="entrega.cep"
            v-mask="'#####-###'"
            class="form-control"
            type="tel"
            placeholder="00000-000"
          />
        </div>
        <div class="col8">
          Endereço * <br />
          <input
            id="endereco-campo"
            :class="v$.entrega.endereco.$error ? 'invalid-input' : ''"
            @change="
              watchEnderecoUpdate();
              lastCep = '';
            "
            v-model="entrega.endereco"
            style="text-transform: uppercase"
            class="form-control"
            type="text"
            maxlength="33"
            placeholder="ex: Rua dos Ferroviarios"
          />
        </div>
        <div class="col4">
          Número * <br />
          <input
            :class="v$.entrega.numero.$error ? 'invalid-input' : ''"
            @change="watchEnderecoUpdate()"
            v-model="entrega.numero"
            id="numero-campo"
            v-mask="'########'"
            class="form-control"
            type="text"
            placeholder="ex: 130"
          />
        </div>
        <div class="col8">
          Complemento <br />
          <input
            @change="watchEnderecoUpdate()"
            v-model="entrega.complemento"
            style="text-transform: uppercase"
            class="form-control"
            type="text"
            maxlength="10"
            placeholder="Complemento"
          />
        </div>
        <div class="col-12">
          Bairro * <br />
          <input
            :class="v$.entrega.bairro.$error ? 'invalid-input' : ''"
            id="bairro-campo"
            @change="
              watchEnderecoUpdate();
              lastCep = '';
            "
            v-model="entrega.bairro"
            style="text-transform: uppercase"
            class="form-control"
            type="text"
            placeholder="Bairro"
          />
        </div>
        <div class="col6">
          Cidade * <br />
          <input
            :class="v$.entrega.cidade.$error ? 'invalid-input' : ''"
            id="cidade-campo"
            @change="watchEnderecoUpdate()"
            v-model="entrega.cidade"
            readonly
            style="text-transform: uppercase"
            class="form-control"
            type="text"
            placeholder="preencha o cep."
          />
        </div>
        <div class="col6">
          Estado * <br />
          <input
            :class="v$.entrega.estado.$error ? 'invalid-input' : ''"
            id="estado-campo"
            @change="watchEnderecoUpdate()"
            v-model="entrega.estado"
            readonly
            style="text-transform: uppercase"
            class="form-control"
            type="text"
            placeholder="preencha o cep."
          />
        </div>
      </div>
    </div>
  </div>

  <div class="form-container mt-3 checkout-bottom-bar">
    <div class="row m-0 p-0 ">
      <div class="col-6 d-flex justify-content-start">
        <button @click="prevPage()" type="button" class="btn btn-danger">
          <i class="fas fa-arrow-left"></i> VOLTAR
        </button>
      </div>
      <div class="col-6 d-flex justify-content-end">
        <button
          :class="v$.$error ? 'disabled-content' : ''"
          @click="callNextPage()"
          type="button"
          class="btn btn-success"
        >
          AVANÇAR <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const Decimal = require("decimal.js");
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { mapState, mapMutations, mapActions } from "vuex";
import Loader from "../Loader";
import calcularFrete from "../../utils/frete";
export default {
  components: {
    Loader,
  },
  props: {
    numeroPedido: [String],
    pagamento_pedido_prop: [Object],
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      loading: false,
      pagamento_pedido: this.pagamento_pedido_prop,
      freteFinal: 0,
      semestre: {
        frete_minimo: 25,
        frete_adicional: 20,
      },
      entrega: {
        cep: "",
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
      },
      canEnderecoUpdate: false,
      getCepCooldown: false,
      lastCep: "",
    };
  },
  validations() {
    return {
      entrega: {
        cep: { required, minLength: minLength(9) },
        endereco: { required },
        numero: { required },
        bairro: { required },
        cidade: { required },
        estado: { required },
      },
    };
  },

  async created() {
    if (!this.pagamento_pedido.inicio) {
      this.$router.push({
        path: "/checkout/seus-dados/" + this.numeroPedido,
      });
      this.$parent.$parent.$parent.$parent.$parent.refresh++;
    }
    this.lastCep = this.pagamento_pedido.entrega.cep.replace("-", "");
    this.entrega.cep = this.pagamento_pedido.entrega.cep;
    this.entrega.endereco = this.pagamento_pedido.entrega.endereco;
    this.entrega.numero = this.pagamento_pedido.entrega.numero;
    this.entrega.complemento = this.pagamento_pedido.entrega.complemento;
    this.entrega.bairro = this.pagamento_pedido.entrega.bairro;
    this.entrega.cidade = this.pagamento_pedido.entrega.cidade;
    this.entrega.estado = this.pagamento_pedido.entrega.estado;
    this.frete(
      this.pagamento_pedido.entrega.cep,
      this.pagamento_pedido.pedido.sem.zonas_fretes,
      this.pagamento_pedido.pedido.sem.base_frete,
      this.pagamento_pedido.pedido.sem.valor_minimo_frete,
      this.pagamento_pedido.pedido.valor_total
    );
  },
  mounted() {
    this.v$.$touch();
  },
  computed: {
    ...mapState({
      //pagamentoPedido: (state) => state.pagamentoPedido,
    }),
  },
  emits: ["nextPage", "prevPage", "complete", "scrollToTop"],
  methods: {
    ...mapMutations(["set_snackbar", "set_editar_pedido"]),
    ...mapActions(["salvar_endereco_entrega"]),
    watchEnderecoUpdate() {
      this.canEnderecoUpdate = true;
    },
    nextPage() {
      if (this.canEnderecoUpdate) {
        this.salvarEndereco();
        this.canEnderecoUpdate = false;
      }
      this.$emit("nextPage", {
        pageIndex: 1,
        pagamento_pedido_prop: this.pagamento_pedido,
      });
      this.$emit("scrollToTop");
    },
    prevPage() {
      this.$emit("prevPage", {
        pageIndex: 1,
        pagamento_pedido_prop: this.pagamento_pedido,
      });
      this.$emit("scrollToTop");
    },
    callNextPage() {
      this.v$.$validate();
      this.v$.$touch();
      if (this.v$.$error) {
        let campoid = this.v$.$errors[0].$property + "-campo";
        let nome_campo =
          "o campo " + this.v$.$errors[0].$property.toUpperCase();
        let razao = "";
        if (this.v$.$errors[0].$property == "endereco") {
          nome_campo = "o campo ENDEREÇO ";
        }
        switch (this.v$.$errors[0].$validator) {
          case "required":
            razao = "é obrigatório.";
            break;
          case "minLength":
            razao =
              "deve ter pelo menos " +
              this.v$.$errors[0].$params.min +
              " caracteres.";
            break;
          default:
            nome_campo = "";
            razao = "campos marcados com * são obrigatorios.";
            break;
        }
        this.smoothScroll(campoid, true);
        this.set_snackbar({
          show: true,
          severity: "warn",
          summary: "Aviso!",
          detail: nome_campo + " " + razao,
          life: 5000,
        });
      } else {
        this.pagamento_pedido.entrega.cep = this.entrega.cep;
        this.pagamento_pedido.entrega.endereco = this.entrega.endereco;
        this.pagamento_pedido.entrega.numero = this.entrega.numero;
        this.pagamento_pedido.entrega.complemento = this.entrega.complemento;
        this.pagamento_pedido.entrega.bairro = this.entrega.bairro;
        this.pagamento_pedido.entrega.cidade = this.entrega.cidade;
        this.pagamento_pedido.entrega.estado = this.entrega.estado;
        this.nextPage();
      }
    },
    async salvarEndereco() {
      this.loading = true;
      let entrega = this.pagamento_pedido.entrega;
      entrega.cpf_aluno = this.pagamento_pedido.aluno.cpf;
      await this.salvar_endereco_entrega(entrega);
      this.loading = false;
    },
    async getCep(cep, entrega, camponumero) {
      if (
        cep.length == 9 &&
        !this.getCepCooldown &&
        cep.replace("-", "") != this.lastCep
      ) {
        //evita que a função seja chamada duas vezes
        //caso o usuario solte duas teclas ao mesmo tempo
        this.getCepCooldown = true;
        setTimeout(() => {
          this.getCepCooldown = false;
        }, 2000);
        //-----------------------------------------------
        if (!navigator.onLine) {
          this.set_snackbar({
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente.",
            life: null,
          });
        } else {
          this.loading = true;
          cep = cep.replace("-", "");
          let cepRetorno = await this.$axios.get(
            "https://viacep.com.br/ws/" + cep + "/json/",
            { withCredentials: false }
          );
          if (cepRetorno.data.erro) {
            this.set_snackbar({
              show: true,
              severity: "warn",
              summary: "Aviso!",
              detail: "CEP invalido!",
              life: 2500,
            });
            entrega.cep = "";
            entrega.endereco = "";
            entrega.bairro = "";
            entrega.cidade = "";
            entrega.estado = "";
            this.lastCep = "";
          } else {
            this.set_snackbar({
              show: true,
              severity: "success",
              summary: "Successo!",
              detail: "CEP Válido!",
              life: 2500,
            });
            entrega.endereco = cepRetorno.data.logradouro;
            entrega.bairro = cepRetorno.data.bairro;
            entrega.cidade = cepRetorno.data.localidade;
            entrega.estado = cepRetorno.data.uf;
            this.frete(cep);
            document.getElementById(camponumero).focus();
            this.lastCep = cep;
          }
        }
        this.loading = false;
      }
    },
    frete(cep) {
      if (this.pagamento_pedido.pedido.sem.base_frete != 0) {
        this.freteFinal = calcularFrete(
          cep,
          this.pagamento_pedido.pedido.sem.zonas_fretes,
          this.pagamento_pedido.pedido.sem.base_frete,
          this.pagamento_pedido.pedido.sem.valor_minimo_frete,
          this.pagamento_pedido.pedido.valor_total
        );
        if (this.freteFinal == "FRETE GRÁTIS") {
          this.pagamento_pedido.freteGratis = true;
          this.freteFinal = 0;
        } else {
          this.pagamento_pedido.freteGratis = false;
        }
        this.pagamento_pedido.frete = this.freteFinal;
        this.pagamento_pedido.valor_final =
          this.pagamento_pedido.valor_pos_desconto + this.freteFinal;
      } else {
        this.freteFinal = 0;
        this.pagamento_pedido.valor_final = this.pagamento_pedido.valor_pos_desconto;
      }
      this.pagamento_pedido.valor_final = parseFloat(
        new Decimal(this.pagamento_pedido.valor_final).toFixed(2)
      );
    },
    smoothScroll(target, iscenter = false) {
      setTimeout(function() {
        document.getElementById(target).scrollIntoView({
          behavior: "smooth",
          block: iscenter ? "center" : "start",
        });
      }, 100);
    },
  },
};
</script>

<style scoped>
.col6 {
  flex: 0 0 auto;
  width: 50%;
}
.col4 {
  flex: 0 0 auto;
  width: 33.333333%;
}
.col8 {
  flex: 0 0 auto;
  width: 66.666667%;
}
@media screen and (max-width: 780px) {
  .col6,
  .col4,
  .col8 {
    flex: 0 0 auto;
    width: 100%;
    margin: auto;
  }
}
</style>
