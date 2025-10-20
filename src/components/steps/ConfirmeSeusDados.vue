<template>
  <Loader v-show="loading"></Loader>
  <div class="row" style="width: 100%; margin: auto; align-items: start;">
    <div
      class="middle-line col6 row m-0 mb-2 text-left"
      style="background-color: white; font-weight: bold"
    >
      <div class="col-12 text-center mb-4">
        <h4>Confira seus dados</h4>
      </div>
      <div class="col-6">
        Nome <br />
        <input
          readonly
          id="nome-campo"
          :class="v$.aluno.nome.$error ? 'invalid-input' : ''"
          v-model="aluno.nome"
          class="form-control"
          type="text"
        />
      </div>
      <div class="col-6">
        Sobrenome <br />
        <input
          readonly
          id="sobrenome-campo"
          :class="v$.aluno.sobrenome.$error ? 'invalid-input' : ''"
          v-model="aluno.sobrenome"
          class="form-control"
          type="text"
        />
      </div>
      <div class="col8">
        E-Mail * <br />
        <input
          id="email-campo"
          :class="v$.aluno.email.$error ? 'invalid-input' : ''"
          @change="watchAlunoUpdate()"
          v-model="aluno.email"
          style="text-transform: uppercase"
          class="form-control"
          type="text"
        />
      </div>
      <div class="col4">
        Celular * <br />
        <input
          id="celular-campo"
          :class="v$.aluno.celular.$error ? 'invalid-input' : ''"
          @change="watchAlunoUpdate()"
          v-model="aluno.celular"
          v-mask="'(##) # ####-####'"
          class="form-control"
          type="text"
        />
      </div>
      <div class="col6">
        CPF * <br />
        <input
          readonly
          id="cpf-campo"
          :class="v$.aluno.cpf.$error ? 'invalid-input' : ''"
          v-model="aluno.cpf"
          v-mask="'###.###.###-##'"
          class="form-control"
          type="tel"
          placeholder="000.000.000-00"
        />
      </div>
      <div class="col6">
        CEP * <br />
        <input
          id="cep-campo"
          :class="v$.aluno.cep.$error ? 'invalid-input' : ''"
          @change="watchAlunoUpdate()"
          @blur="getCep(aluno.cep, aluno, 'numero-campo')"
          @keyup="getCep(aluno.cep, aluno, 'numero-campo')"
          v-model="aluno.cep"
          v-mask="'#####-###'"
          class="form-control"
          type="tel"
          placeholder="00000-000"
          autocomplete="none"
        />
      </div>
      <div class="col8">
        Endereço * <br />
        <input
          id="endereco-campo"
          :class="v$.aluno.endereco.$error ? 'invalid-input' : ''"
          @change="
            watchAlunoUpdate();
            lastCep = '';
          "
          v-model="aluno.endereco"
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
          :class="v$.aluno.numero.$error ? 'invalid-input' : ''"
          @change="watchAlunoUpdate()"
          v-model="aluno.numero"
          id="numero-campo"
          v-mask="'########'"
          class="form-control"
          type="text"
          placeholder="ex: 130"
        />
      </div>
      <div class="col-12">
        Complemento <br />
        <input
          @change="watchAlunoUpdate()"
          v-model="aluno.complemento"
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
          id="bairro-campo"
          :class="v$.aluno.bairro.$error ? 'invalid-input' : ''"
          @change="
            watchAlunoUpdate();
            lastCep = '';
          "
          v-model="aluno.bairro"
          style="text-transform: uppercase"
          class="form-control"
          type="text"
          placeholder="Bairro"
        />
      </div>
      <div class="col6">
        Cidade * <br />
        <input
          id="cidade-campo"
          :class="v$.aluno.cidade.$error ? 'invalid-input' : ''"
          v-model="aluno.cidade"
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
          id="estado-campo"
          :class="v$.aluno.estado.$error ? 'invalid-input' : ''"
          v-model="aluno.estado"
          readonly
          style="text-transform: uppercase"
          class="form-control"
          type="text"
          placeholder="preencha o cep."
        />
      </div>
    </div>
    <div
      class="col6 row m-0 mb-2 text-left"
      style="background-color: white; font-weight: bold"
    >
      <div
        class="col-12 text-center mb-4 "
        style="font-size: 20px; font-weight: normal"
      >
        <h4>Confira seu pedido</h4>
      </div>
      <div
        v-if="pagamento_pedido.kitFormasPagamento == null"
        class="text-center justify-content-center align-items-center"
        :class="'col-12'"
        style="font-weight: normal"
      >
        <span v-if="!pagamento_pedido.temDesconto">
          Pedido:
          <b style=" margin-left: 0.4rem">
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
                    }).format(pagamento_pedido.valor_pos_desconto)
                  }}</span
                >
                <span style="color: #1a8b99; font-weight: 600;">
                  {{
                    new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(
                      pagamento_pedido.valor_pos_desconto -
                        (pagamento_pedido.valor_pos_desconto *
                          pagamento_pedido.pedido.semestre_pagamento
                            .desconto_pix) /
                          100
                    )
                  }}
                  <span style="font-size: 12px;">(Pix/Boleto)</span>
                </span>
              </span>
              <span v-else>
                <b>{{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pagamento_pedido.pedido.valor_total)
                }}</b>
                à vista
              </span>
            </span></b
          >
        </span>
        <span v-else>
          Pedido:
          <b>{{
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(pagamento_pedido.pedido.valor_total)
          }}</b>
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
                pagamento_pedido_prop.pedido.valor_total -
                  pagamento_pedido_prop.valor_pos_desconto
              )
            }}
            de desconto)
          </span>
          <br />
          <span class="lista-preco" style="font-size: 18px; color: #2bbacb;">
            <span
              v-if="
                pagamento_pedido.pedido.semestre_pagamento.desconto_pix != 0
              "
            >
              <span
                style="color: #292828; text-decoration: line-through; font-size: 16px; margin-right: 4px;"
                >{{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pagamento_pedido.valor_pos_desconto)
                }}</span
              >
              <span style="color: #1a8b99; font-weight: 600;">
                {{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(
                    pagamento_pedido.valor_pos_desconto -
                      (pagamento_pedido.valor_pos_desconto *
                        pagamento_pedido.pedido.semestre_pagamento
                          .desconto_pix) /
                        100
                  )
                }}
                <span style="font-size: 12px;">(Pix/Boleto)</span>
              </span>
            </span>
          </span>
        </span>
      </div>
      <div
        v-else
        class="text-center d-flex justify-content-center align-items-center"
        :class="
          pagamento_pedido.store.session.pedido != null &&
          pagamento_pedido.store.session.pedido.numeroPedido ==
            pagamento_pedido.numero_pedido
            ? 'col-6'
            : 'col-12'
        "
      >
        <div class="col-6">
          Total a vista no boleto:
          <b>
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(pagamento_pedido.kitFormasPagamento[0].valor)
            }}</b
          >
        </div>
        <div class="col-6">
          Total em até 10x:
          <b>
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(
                pagamento_pedido.kitFormasPagamento[
                  pagamento_pedido.kitFormasPagamento.length - 1
                ].valor
              )
            }}</b
          >
        </div>
      </div>
      <div
        class="col-12 m-0 p-0"
        style="overflow-y: auto; max-height: 410px; max-width: 100%"
      >
        <table class="table-itens">
          <tr>
            <th style="padding-left: 5px">Descrição</th>
            <th>Marca</th>
            <th class="text-center">QTD</th>
          </tr>
          <tr v-if="itensPedidoCheckout === false" class=" my-3">
            <th class="text-center py-3" :colspan="3">
              Erro ao buscar os itens
              <button
                @click="get_pedido_itens(numeroPedido)"
                type="button"
                class="btn btn-primary ml-3"
              >
                TENTAR NOVAMENTE
              </button>
            </th>
          </tr>
          <tr v-else-if="!itensPedidoCheckout">
            <th class="text-center py-3" :colspan="3">
              carregando itens...
            </th>
          </tr>
          <tr
            style="
                border-bottom: 1px solid LightGrey;
                font-weight: normal !important;
              "
            v-for="item in itensPedidoCheckout"
            :key="item.id_item"
          >
            <td
              :class="item.qtd_item <= 0 ? 'item-titulo' : ''"
              :colspan="item.qtd_item <= 0 ? 3 : 1"
              style="padding-left: 5px"
            >
              {{ item.descri_item }}
            </td>
            <td v-if="item.qtd_item <= 0 ? false : true">
              {{ item.marca_item }}
            </td>
            <td v-if="item.qtd_item <= 0 ? false : true" class="text-center">
              {{ item.qtd_item }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>

  <div class="form-container mt-3 checkout-bottom-bar">
    <div class="row m-0 p-0 ">
      <div class="col-6 d-flex justify-content-start"></div>
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

  <Dialog
    style="min-width:320px; max-width: 100%;"
    modal
    :closeOnEscape="false"
    :dismissableMask="false"
    v-model:visible="modalItensEmFalta"
    class="text-center"
  >
    <template #header>
      <h3 class="mr-2 mb-0">AVISO!</h3>
    </template>
    <div>
      Os seguintes itens e suas respectivas quantidades não estão mais
      disponiveis <br />
      e foram retirados do seu pedido:
      <br />
      <br />
      <div v-for="item in itensEmFalta" :key="item.id">
        <b>
          {{ item.descri_item }} - QTD:
          {{ item.qtd_item - item.qtd_disponivel }}
        </b>
      </div>
    </div>
    <template #footer>
      <div class="d-flex justify-content-center">
        <button
          style="min-width: 50%"
          @click="modalItensEmFalta = false"
          type="button"
          class="btn btn-info"
        >
          OK
        </button>
      </div>
    </template>
  </Dialog>

  <Dialog
    style="min-width:320px"
    modal
    :closeOnEscape="false"
    :dismissableMask="false"
    v-model:visible="modalAvisos"
    class="text-center"
  >
    <template #header>
      <h3 class="mr-2 mb-0">AVISO!</h3>
    </template>
    <div
      v-for="aviso in avisos"
      :key="aviso.id_aviso"
      v-html="aviso.mensagem_aviso"
    ></div>
    <template #footer>
      <div class="d-flex justify-content-center">
        <button
          style="min-width: 50%"
          @click="modalAvisos = false"
          type="button"
          class="btn btn-info"
        >
          OK
        </button>
      </div>
    </template>
  </Dialog>

  <Dialog
    style="max-width:450px"
    modal
    :closeOnEscape="true"
    :dismissableMask="false"
    :closable="false"
    v-model:visible="modalEstrangeiro"
  >
    <template #header>
      <h3 class="mr-2 mb-0">ATENÇÃO!</h3>
    </template>
    <div class="text-center">
      Utilize este CPF para fazer Login: {{ estrangeiro.cpf }}
    </div>
    <template #footer>
      <div class="d-flex justify-content-center">
        <button
          style="min-width: 50%"
          @click="modalEstrangeiro = false"
          type="button"
          class="btn btn-info"
        >
          OK
        </button>
      </div>
    </template>
  </Dialog>

  <Dialog
    style="width: 300px"
    modal
    :closable="true"
    v-model:visible="modalErroValorLista"
  >
    <template #header>
      <h3 class="mr-2 mb-0">ATENÇÃO!</h3>
    </template>
    <span>
      Pedido: {{ objToStore.session.pedido.numeroPedido }}<br />Ocorreu um erro
      inesperado, entre em contato conosco e informe o seguinte código:
      VALOR_LISTA_404
    </span>
    <template #footer>
      <div class="d-flex justify-content-center">
        <button
          type="button"
          class="btn btn-info"
          @click="modalErroValorLista = false"
        >
          Ok
        </button>
      </div>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { mapMutations, mapState, mapActions } from "vuex";
import Loader from "../Loader";
export default {
  components: {
    Dialog,
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
      modalEstrangeiro: false,
      modalAvisos: false,
      modalErroValorLista: false,
      objToStore: null,
      modalItensEmFalta: false,
      itensEmFalta: [],
      loading: false,
      pagamento_pedido: this.pagamento_pedido_prop,
      getCepCooldown: false,
      lastCep: "",
      canSaveUpdate: false,
      aluno: {
        nome: "",
        sobrenome: "",
        email: "",
        celular: "",
        cpf: "",
        cep: "",
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
      },
    };
  },
  validations() {
    return {
      aluno: {
        nome: { required, minLength: minLength(2) },
        sobrenome: { required, minLength: minLength(2) },
        email: { required },
        celular: { required, minLength: minLength(16) },
        cpf: { required, minLength: minLength(14) },
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
    this.get_pedido_itens(this.numeroPedido);
    this.pagamento_pedido.inicio = true;
    console.log('oba', this.pagamento_pedido);
    

    this.lastCep = this.pagamento_pedido.aluno.cep;

    this.aluno.nome = this.pagamento_pedido.aluno.nome;
    this.aluno.sobrenome = this.pagamento_pedido.aluno.sobrenome;
    this.aluno.email = this.pagamento_pedido.aluno.email.toLowerCase();
    this.aluno.celular = this.pagamento_pedido.aluno.celular;
    this.aluno.cpf = this.pagamento_pedido.aluno.cpf;
    this.aluno.cep = this.pagamento_pedido.aluno.cep;
    this.aluno.endereco = this.pagamento_pedido.aluno.endereco;
    this.aluno.numero = this.pagamento_pedido.aluno.numero;
    this.aluno.complemento = this.pagamento_pedido.aluno.complemento;
    this.aluno.bairro = this.pagamento_pedido.aluno.bairro;
    this.aluno.cidade = this.pagamento_pedido.aluno.cidade;
    this.aluno.estado = this.pagamento_pedido.aluno.estado;
    this.objToStore = this.$LS.get();
    if (this.objToStore.shared.itensEmFalta) {
      this.itensEmFalta = this.objToStore.shared.itensEmFalta;
      this.modalItensEmFalta = true;
      delete this.objToStore.shared.itensEmFalta;
      this.$LS.set(this.objToStore);
    } else {
      for (let aviso of this.avisos) {
        if (aviso.mensagem_aviso.trim() != "") {
          this.modalAvisos = true;
        }
      }
      if (this.estrangeiro.is) {
        this.modalEstrangeiro = true;
      }
    }
  },
  mounted() {
    this.v$.$touch();
  },
  computed: {
    ...mapState({
      estrangeiro: (state) => state.estrangeiro,
      itensPedidoCheckout: (state) => state.itensPedidoCheckout,
      avisos: (state) => state.avisos,
    }),
  },
  emits: ["nextPage", "prevPage", "complete", "scrollToTop"],
  methods: {
    ...mapActions(["update_aluno", "get_pedido_itens"]),
    ...mapMutations(["set_snackbar", "set_editar_pedido"]),
    watchAlunoUpdate() {
      this.canSaveUpdate = true;
    },
    async nextPage() {
      if (this.canSaveUpdate) {
        await this.update_aluno(this.pagamento_pedido.aluno);
        this.canSaveUpdate = false;
      }
      //atualiza os dados de entrega que serão vistos na proxima pagina.
      if (this.pagamento_pedido.entrega.cep == "") {
        this.pagamento_pedido.entrega.bairro = this.aluno.bairro;
        this.pagamento_pedido.entrega.cep = this.aluno.cep;
        this.pagamento_pedido.entrega.cidade = this.aluno.cidade;
        this.pagamento_pedido.entrega.complemento = this.aluno.complemento;
        this.pagamento_pedido.entrega.endereco = this.aluno.endereco;
        this.pagamento_pedido.entrega.estado = this.aluno.estado;
        this.pagamento_pedido.entrega.numero = this.aluno.numero;
      }
      this.$emit("nextPage", {
        pageIndex: 0,
        pagamento_pedido_prop: this.pagamento_pedido,
      });
      this.$emit("scrollToTop");
    },
    // editarPedidoEvent() {
    //   this.pagamento_pedido.store.session.carrinho = this.pagamento_pedido.store.session.pedido.carrinho;
    //   this.$LS.set(this.pagamento_pedido.store);
    //   this.set_editar_pedido(true);
    //   this.$router.push({
    //     path:
    //       "/listas/" +
    //       this.pagamento_pedido.store.session.pedido.semestre.id_semestre,
    //   });
    // },
    async callNextPage() {
      if (
        this.objToStore.session.carrinho.semestre.valor_minimo_venda >
        parseFloat(this.objToStore.session.carrinho.totalCarrinho)
      ) {
        this.modalErroValorLista = true;
        return;
      } else {
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
            // case "email":
            //   nome_campo = "O e-mail inserido ";
            //   razao = "não é um e-mail válido.";
            //   break;
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
          this.pagamento_pedido.aluno.nome = this.aluno.nome;
          this.pagamento_pedido.aluno.sobrenome = this.aluno.sobrenome;
          this.pagamento_pedido.aluno.email = this.aluno.email.toUpperCase();
          this.pagamento_pedido.aluno.celular = this.aluno.celular;
          this.pagamento_pedido.aluno.cpf = this.aluno.cpf;
          this.pagamento_pedido.aluno.cep = this.aluno.cep;
          this.pagamento_pedido.aluno.endereco = this.aluno.endereco;
          this.pagamento_pedido.aluno.numero = this.aluno.numero;
          this.pagamento_pedido.aluno.complemento = this.aluno.complemento;
          this.pagamento_pedido.aluno.bairro = this.aluno.bairro;
          this.pagamento_pedido.aluno.cidade = this.aluno.cidade;
          this.pagamento_pedido.aluno.estado = this.aluno.estado;
          this.nextPage();
        }
      }
    },
    async getCep(cep, destino, camponumero) {
      if (
        cep.length == 9 &&
        !this.getCepCooldown &&
        cep.replace("-", "") != this.lastCep
      ) {
        //evita que a função seja chamada  duas vezes
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
            destino.cep = "";
            destino.endereco = "";
            destino.bairro = "";
            destino.cidade = "";
            destino.estado = "";
            this.lastCep = "";
          } else {
            this.set_snackbar({
              show: true,
              severity: "success",
              summary: "Successo!",
              detail: "CEP Válido!",
              life: 2500,
            });
            destino.endereco = cepRetorno.data.logradouro;
            destino.bairro = cepRetorno.data.bairro;
            destino.cidade = cepRetorno.data.localidade;
            destino.estado = cepRetorno.data.uf;
            document.getElementById(camponumero).focus();
            this.lastCep = cep;
          }
        }
        this.loading = false;
      }
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
.table-container {
  overflow-y: auto;
  max-height: 410px;
}
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
.middle-line {
  border-right: 1px solid Lightgrey;
}

@media screen and (max-width: 780px) {
  .editar-pedido-botao {
    font-size: 13px;
    padding: 5px;
  }
  .table-container {
    max-height: 210px;
  }
  .col6,
  .col8,
  .col4 {
    flex: 0 0 auto;
    width: 100%;
    margin: auto;
  }
  .middle-line {
    border-left: none;
    border-bottom: 1px solid lightgrey;
    padding-bottom: 10px;
  }
  .table-itens {
    font-size: 11px !important;
  }
}
.table-itens {
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 10px;
}
.item-titulo {
  text-align: center;
  background: rgb(20, 155, 189);
  color: white;
}
@media screen and (max-width: 400px) {
  .table-itens {
    white-space: break-spaces;
    font-size: 10px;
    width: 100%;
    padding: 0px;
  }
}
@media screen and (min-width: 401px) and (max-width: 550px) {
  .table-itens {
    font-size: 12px;
  }
}
@media screen and (min-width: 781px) and (max-width: 1020px) {
  .editar-pedido-botao {
    font-size: 15px;
    padding: 5px;
  }
  .table-itens {
    font-size: 12px;
  }
}
</style>
