<template>
  <Loader v-show="loading"></Loader>

  <img class="dentinho" :src="getURL('dentinho_4x.png')" alt="dentinho" />

  <div v-if="objToStore.session.aluno != null" class="container my-3">
    <div class="my-2">
      <h4>Olá {{ objToStore.session.aluno.nome }} !</h4>
      <span style="font-size: 18px">
        O pedido numero <b>{{ numeroPedido }}</b> já foi pago! <br />
        Você pode checar o status atual dele na página
        <a href="/meusPedidos">Meus pedidos.</a>
      </span>
    </div>

    <div class="mt-4">
      <button @click="paginaInicialEvent()" type="button" class="btn btn-info">
        Voltar a pagina inicial!
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Loader from "../components/Loader";
export default {
  data: () => ({
    loading: false,
    ObjToStore: null,
  }),
  components: {
    Loader,
  },
  props: {
    numeroPedido: [String],
  },
  async created() {
    this.getSession();
  },
  computed: {
    ...mapState({
      pagamentoPedido: (state) => state.pagamentoPedido,
    }),
  },
  methods: {
    ...mapActions(["get_pedido"]),
    async getSession() {
      this.loading = true;
      await this.get_pedido(this.numeroPedido);
      this.objToStore = this.$LS.get();
      if (
        this.objToStore.session.aluno == null ||
        this.pagamentoPedido.id_pedidos == undefined ||
        this.pagamentoPedido.cpf_aluno != this.objToStore.session.aluno.cpf
      ) {
        this.$router.push({
          name: "inicio",
        });
      } else if (
        this.pagamentoPedido.status_aluno ==
        ("AGUARDANDO PAGAMENTO" && "EM ANÁLISE")
      ) {
        this.$router.push({
          name: "SeusDados",
          params: { numeroPedido: this.numeroPedido },
        });
      }
      this.loading = false;
    },
    paginaInicialEvent() {
      this.$router.push({
        name: "inicio",
      });
    },
    getURL(img) {
      return require("../assets/" + img);
    },
  },
};
</script>

<style scoped>
.dentinho {
  height: 200px;
}
</style>
