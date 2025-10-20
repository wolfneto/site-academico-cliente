<template>
  <Loader v-show="loading"></Loader>
  <div class="mt-2" v-if="success">
    <Steps class="mb-3" :model="steps" />
    <div class="container" style="padding: 0px">
      <router-view
        v-slot="{ Component }"
        @prevPage="prevPage($event)"
        @nextPage="nextPage($event)"
        @complete="complete()"
        @scrollToTop="scrollToTop()"
        :pagamento_pedido_prop="pagamento_pedido_prop"
      >
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script>
const Decimal = require("decimal.js");
import { mapMutations, mapState, mapActions } from "vuex";
import Steps from "primevue/steps";
import Loader from "../components/Loader";
export default {
  components: {
    Steps,
    Loader,
  },
  data() {
    return {
      loading: false,
      success: false,
      objToStore: { session: {}, shared: {} },
      steps: [
        {
          label: "Confirmação",
          to: "/checkout/seus-dados/",
        },
        {
          label: "Entrega",
          to: "/checkout/entrega/",
        },
        {
          label: "Forma de Pagamento",
          to: "/checkout/metodo-de-pagamento/",
        },
        {
          label: "Pagamento",
          to: "/checkout/informacoes-de-pagamento/",
        },
      ],
      pagamento_pedido_prop: {},
    };
  },
  props: {
    numeroPedido: [String],
  },
  async created() {
    this.set_pix(null);
    this.loading = true;
    for (let step of this.steps) {
      step.to = step.to + this.numeroPedido;
    }
    await this.get_ip();
    if (this.ipBlocked) {
      this.$router.push({
        name: "inicio",
      });
    } else {
      await this.getPedido();
      // await this.get_carteirinha(this.pagamento_pedido_base.pedido.semestre);
      // this.pagamento_pedido_prop.carteirinha = this.carteirinha
      // console.log('carteirinha', this.carteirinha)
    }
    this.loading = false;
  },
  computed: {
    ...mapState({
      org_id: (state) => state.org_id,
      pagamento_pedido_base: (state) => state.pagamento_pedido_base,
      ip: (state) => state.ip,
      ipBlocked: (state) => state.ipBlocked,
      avisos: (state) => state.avisos,
      // carteirinha: (state) => state.carteirinha,
    }),
  },
  methods: {
    ...mapMutations([
      "set_snackbar",
      "set_pagamento_pedido",
      "set_infocheck",
      "set_pix",
      "set_descontoUsado",
    ]),
    ...mapActions([
      "get_pedido",
      "get_ip",
      "update_pedido_desconto_representante",
      "get_avisos",
      // "get_carteirinha"
    ]),
    getSession() {
      this.objToStore = this.$LS.get();
    },
    async getPedido() {
      this.getSession();
      if (this.objToStore.session.aluno == null) {
        this.$router.push({
          name: "inicio",
        });
      } else {
        await this.get_pedido(this.numeroPedido);
        if (
          this.pagamento_pedido_base.pedido.id_pedidos == undefined ||
          this.pagamento_pedido_base.pedido.cpf_aluno !=
            this.objToStore.session.aluno.cpf
        ) {
          this.$router.push({
            name: "inicio",
          });
          this.set_snackbar({
            show: true,
            severity: "error",
            summary: "Atenção!",
            detail: "Pedido não encontrado!",
            life: 5200,
          });
        } else if (
          this.pagamento_pedido_base.pedido.status_aluno ==
            ("CANCELADO" || "EXCLUIDO") ||
          this.pagamento_pedido_base.pedido.listasModified
        ) {
          this.$router.push({
            name: "inicio",
          });
          this.set_snackbar({
            show: true,
            severity: "warn",
            summary: "Aviso!",
            detail:
              "Pedido cancelado ou excluido, por favor, refaça seu pedido!",
            life: 5200,
          });
        } else if (
          this.pagamento_pedido_base.pedido.status_aluno !=
          ("AGUARDANDO PAGAMENTO" || "EM ANÁLISE")
        ) {
          this.$router.push({
            name: "pedidoPago",
            params: { numeroPedido: this.numeroPedido },
          });
        } else {
          if (this.pagamento_pedido_base.pedido.sem.limite_venda != -1) {
            if (
              this.pagamento_pedido_base.pedido.sem.listas_vendidas >=
              this.pagamento_pedido_base.pedido.sem.limite_venda
            ) {
              this.set_infocheck({
                show: true,
                msg:
                  "Listas esgotadas, por favor, refaça seu pedido ou entre em contato conosco.",
              });
              this.$router.push({ name: "inicio" });
              return false;
            }
          }
          await this.get_avisos({
            id_semestre: this.pagamento_pedido_base.pedido.semestre,
            id_faculdade: this.pagamento_pedido_base.pedido.faculdade
          })
          let session_id =
            this.pagamento_pedido_base.pedido.cpf_aluno +
            this.pagamento_pedido_base.pedido.id_pedidos.toString();
          if (!document.getElementById("metrix")) {
            let script = document.createElement("script");
            script.setAttribute(
              "src",
              "https://h.online-metrix.net/fp/tags.js?org_id=" +
                this.org_id +
                "&session_id=" +
                session_id
            );
            script.setAttribute("id", "metrix");
            document.head.appendChild(script);
          }

          let obj = {
            inicio: false,
            numero_pedido: this.numeroPedido,
            pedido: this.pagamento_pedido_base.pedido,
            aluno: this.pagamento_pedido_base.pedido.aluno,
            session_id: session_id,
            store: this.objToStore,
            kitFormasPagamento: this.pagamento_pedido_base.kitFormasPagamento,
            entrega: {
              cep: "",
              endereco: "",
              numero: "",
              complemento: "",
              bairro: "",
              cidade: "",
              estado: "",
            },
            formas_pagamento: this.pagamento_pedido_base.pedido
              .semestre_pagamento,
            pagamento_selecionado: null,
            frete: 0,
            freteGratis: false,
            dados_pagamento: {
              cpf_aluno: this.pagamento_pedido_base.pedido.aluno.cpf,
              dois_cartoes: false,
              desconto_boleto: null,
              banco: null,
              cartao: {
                numero: "",
                nome: "",
                validade: "",
                cvv: "",
                parcelas: 1,
                bandeira: "",
              },
              segundo_cartao: {
                numero: "",
                nome: "",
                validade: "",
                cvv: "",
                parcelas: 1,
                bandeira: "",
              },
              cliente: {
                cpf: "",
                nome: "",
                sobrenome: "",
                email: "",
                telefone: "",
                cep: "",
                logradouro: "",
                numero: "",
                complemento: "",
                bairro: "",
                cidade: "",
                uf: "",
              },
              segundo_cliente: {
                cpf: "",
                nome: "",
                sobrenome: "",
                email: "",
                telefone: "",
                cep: "",
                logradouro: "",
                numero: "",
                complemento: "",
                bairro: "",
                cidade: "",
                uf: "",
              },
              parentesco: null,
              segundo_parentesco: null,
              titular: null,
              segundo_titular: null,
              ip: this.ip,
            },
            valor_primeiro_cartao: 1,
            valor_segundo_cartao: 1,
            valor_pos_desconto: null,
            valor_final: null,
            temDesconto: false,
            parcelas: 10,
          };
          this.pagamento_pedido_prop = obj;
          // // PARA TESTES
          // this.pagamento_pedido_prop.pedido.valor_total = 0.01;
          // this.pagamento_pedido_prop.pedido.sem.valor_minimo_frete = 200;
          // this.pagamento_pedido_prop.formas_pagamento.dois_cartoes = true;
          // this.pagamento_pedido_prop.formas_pagamento.outros = true;
          // this.pagamento_pedido_prop.pedido.sem.valor_minimo_frete = 300;
          // this.pagamento_pedido_prop.pedido.desconto_representante = {
          //   valido: 1,
          //   desconto_porcentagem: 10,
          //   desconto_valor: 42,
          //   valor_minimo: 10.0,
          //   id_faculdade: "18",
          //   id_semestre: "124",
          //   porcentagem: true,
          // };
          // // PARA TESTES
          this.setDesconto();
          this.success = true;
        }
      }
    },
    setDesconto() {
      this.set_descontoUsado(false);
      if (
        this.pagamento_pedido_prop.pedido.desconto_representante != null &&
        this.pagamento_pedido_prop.pedido.desconto_representante.valido == 1 &&
        this.pagamento_pedido_prop.pedido.desconto_representante.id_faculdade ==
          this.pagamento_pedido_prop.pedido.faculdade &&
        this.pagamento_pedido_prop.pedido.desconto_representante.id_semestre ==
          this.pagamento_pedido_prop.pedido.semestre
      ) {
        if (
          this.pagamento_pedido_prop.pedido.desconto_representante.porcentagem
        ) {
          this.pagamento_pedido_prop.valor_pos_desconto =
            this.pagamento_pedido_prop.pedido.valor_total -
            this.pagamento_pedido_prop.pedido.valor_total *
              (this.pagamento_pedido_prop.pedido.desconto_representante
                .desconto_porcentagem /
                100);
          this.pagamento_pedido_prop.temDesconto = true;
        } else {
          if (
            this.pagamento_pedido_prop.pedido.valor_total >=
            this.pagamento_pedido_prop.pedido.desconto_representante
              .valor_minimo
          ) {
            this.pagamento_pedido_prop.valor_pos_desconto =
              this.pagamento_pedido_prop.pedido.valor_total -
              this.pagamento_pedido_prop.pedido.desconto_representante
                .desconto_valor;
            this.pagamento_pedido_prop.temDesconto = true;
          } else {
            this.pagamento_pedido_prop.valor_pos_desconto = this.pagamento_pedido_prop.pedido.valor_total;
            this.pagamento_pedido_prop.temDesconto = false;
          }
        }
      } else {
        this.pagamento_pedido_prop.valor_pos_desconto = this.pagamento_pedido_prop.pedido.valor_total;
        this.pagamento_pedido_prop.temDesconto = false;
      }
      this.pagamento_pedido_prop.valor_pos_desconto = parseFloat(
        new Decimal(this.pagamento_pedido_prop.valor_pos_desconto).toFixed(2)
      );
      if (this.pagamento_pedido_prop.temDesconto) {
        this.set_descontoUsado(true);
        this.update_pedido_desconto_representante({
          id_pedido: this.numeroPedido,
          desconto_representante:
            this.pagamento_pedido_prop.pedido.valor_total -
            this.pagamento_pedido_prop.valor_pos_desconto,
        });
      }
    },
    nextPage(event) {
      this.$router.push(this.steps[event.pageIndex + 1].to);
    },
    prevPage(event) {
      this.$router.push(this.steps[event.pageIndex - 1].to);
    },
    complete() {},

    scrollToTop() {
      document.body.scrollTop = 0; //Safari
      document.documentElement.scrollTop = 0; //Chrome, Firefox, IE e Opera
    },
  },
};
</script>

<style>
.p-steps-item {
  width: 33% !important;
}
.p-steps-title {
  white-space: break-spaces;
}
.p-steps .p-steps-item.p-highlight .p-steps-number {
  background: #23acbb !important;
  color: #ffffff !important;
}
@media screen and (max-width: 400px) {
  .p-steps-item {
    font-size: 13px !important;
  }
}
</style>

<style scoped></style>
