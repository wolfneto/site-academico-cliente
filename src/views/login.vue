<template>
  <Loader v-show="loading"> </Loader>
  <div v-if="objToStore.session.carrinho != null" class="mt-4">
    <div class="painel-login">
      <div id="painel-escolha" class="painel">
        <div class="painel-body mobile-text">
          <div class="demarcador-area mt-2">
            <div class="row">
              <div
                class="col-6 text-right pr-3"
                style="border-right: 1px solid LightGrey; font-weight: bold"
              >
                {{
                  objToStore.session.carrinho.faculdade.nome_exibicao_faculdade.toUpperCase()
                }}
              </div>
              <div class="col-6 text-left pl-3" style="font-weight: bold">
                {{
                  objToStore.session.carrinho.semestre.descri_semestre.toUpperCase()
                }}
              </div>
              <div class="col-12 mt-2" style="font-weight: bold">
                LISTAS SELECIONADAS:
              </div>
              <div
                v-for="lista in objToStore.session.carrinho.listas"
                :key="lista.id_lista"
                class="col-12 mt-2"
              >
                {{ lista.nome_exibi_lista }}
              </div>
              <div class="col-12 mt-2">
                <span style="font-weight: bold"> TOTAL DO PEDIDO: </span> <br />
                <span
                  v-if="objToStore.session.carrinho.listas.length > 0"
                  class="lista-preco"
                  style="font-size: 18px; color: #2bbacb;"
                >
                  <span
                    v-if="
                      objToStore.session.carrinho.listas[0]
                        .semestre_pagamentos[0].desconto_pix != 0
                    "
                  >
                    <span
                      style="color: #1a8b99; font-size: 16px; font-weight: 600;"
                    >
                      {{
                        new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(
                          objToStore.session.carrinho.totalCarrinho -
                            (objToStore.session.carrinho.totalCarrinho *
                              objToStore.session.carrinho.listas[0]
                                .semestre_pagamentos[0].desconto_pix) /
                              100
                        )
                      }}
                      <span style="font-size: 12px;">(Pix/Boleto)</span>
                    </span>
                  </span>
                  <span
                    v-else
                    style="font-weight: 800; font-size: 18px; margin-right: 4px;"
                    >{{
                      new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(objToStore.session.carrinho.totalCarrinho)
                    }}
                    à vista</span
                  >
                </span>
              </div>
              <div class="col-12 mt-2">
                <span style="font-weight: bold"> ITENS SELECIONADOS: </span
                >{{ objToStore.session.carrinho.qtdItemsSelecionados }}
              </div>
            </div>
          </div>
          <div class="demarcador-area mt-2">
            <div class="row mt-2">
              <div class="col-12 mt-2">
                <button
                  id="botao-entrar"
                  @click="
                    login = 1;
                    smoothScroll('target');
                  "
                  style="background-color: #2bbacb"
                  type="button"
                  class="btn btn-info"
                >
                  Entrar!
                </button>
              </div>
              <div class="col-12 mt-2">
                Já possuo cadastro, acessar com CPF e Senha.
              </div>
              <div class="col-12 mt-2">
                <button
                  id="botao-cadastrar"
                  @click="
                    login = 2;
                    smoothScroll('target');
                  "
                  style="background-color: #4caf50"
                  type="button"
                  class="btn btn-success"
                >
                  Cadastrar!
                </button>
              </div>
              <div class="col-12 mt-2">Meu primeiro pedido.</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="target"><br /></div>

    <div class="painel-login">
      <Entrar v-if="login == 1" />
      <Cadastrar v-if="login == 2" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Loader from "../components/Loader";
import Entrar from "../components/Entrar";
import Cadastrar from "../components/Cadastrar";
export default {
  components: {
    Cadastrar,
    Entrar,
    Loader,
  },
  data: () => ({
    allowNotlogged: false,
    login: 0,
    cpfvalido: false,
    cpf: "",
    senha: "",
    objToStore: { session: {}, shared: {} },
    passwordVisible: false,
    loading: false,
  }),
  async created() {
    this.loading = true;
    window.scrollTo(0, 0);
    await this.getSession();
    this.loading = false;
  },
  async mounted() {},
  computed: {
    ...mapState({
      aluno: (state) => state.aluno,
      semestre: (state) => state.semestre,
      faculdade: (state) => state.faculdade,
      error: (state) => state.error,
      redirect: (state) => state.redirect,
      resetListas: (state) => state.resetListas,
    }),
  },
  methods: {
    ...mapActions(["checar_Info"]),
    ...mapMutations([
      "set_snackbar",
      "set_redirect",
      "set_refreshHeader",
      "set_resetListas",
    ]),
    async getSession() {
      this.objToStore = this.$LS.get();
      if (this.objToStore.session.carrinho == null) {
        await this.$router.push({ name: "inicio" });
      } else {
        //retorna a pagina de listas caso o usuario esteja logado ou caso o usuario tenha um carrinho vazio
        if (
          this.objToStore.session.aluno != null ||
          this.objToStore.session.carrinho.listas.length < 1 ||
          this.objToStore.session.carrinho.totalCarrinho <= 0
        ) {
          this.$router.push({
            path:
              "/listas/" +
              this.objToStore.session.carrinho.semestre.id_semestre,
          });
        } else {
          await this.checarInfo();
        }
      }
    },
    async checarInfo() {
      await this.checar_Info({
        id_semestre: this.objToStore.session.carrinho.semestre.id_semestre,
        carrinho: this.objToStore.session.carrinho,
      });
      if (this.error) {
        this.$router.push({
          name: "inicio",
        });
        this.set_snackbar({
          show: true,
          severity: "error",
          summary: "Erro interno!",
          detail: "tente novamente mais tarde.",
          life: 5000,
        });
      } else if (this.redirect) {
        if (this.resetListas) {
          this.set_resetListas(false);
          this.objToStore.session.carrinho.listas = [];
          this.$LS.set(this.objToStore);
          this.set_refreshHeader(true);
        }
        this.set_redirect(false);
        this.$router.push({
          name: "inicio",
        });
      }
    },
    smoothScroll(target) {
      setTimeout(function() {
        document.getElementById(target).scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    },
  },
};
</script>

<style scoped>
.modal-open {
  overflow: hidden;
}
.show {
  padding-right: 0px !important;
}
.modal-dialog.cadastro {
  max-width: 90%;
  margin: 0rem auto;
}
.painel-login {
  width: 100%;
  max-width: 700px;
  margin: 15px auto 15px auto;
}
.painel {
  transition: width 1s;
  transition: box-shadow 0.2s;
  margin: 15px auto 15px auto;
  box-shadow: 0px 0px 15px #00000062;
  border-radius: 10px;
}
.painel:hover {
  box-shadow: 0px 0px 30px #00000062;
}
.painel-header {
  padding: 2px;
  background-color: #2bbacb;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.painel-body {
  padding: 20px;
}
.demarcador-area {
  border-top-style: solid;
  border-width: 1px;
  border-color: lightgray;
  padding: 8px 0px 0px 0px;
}
html {
  scroll-behavior: smooth;
}
.col6pc-12mobile {
  flex: 0 0 auto;
  width: 50%;
}
.modal-content {
  border: none;
}
.modal-header {
  padding: 10px 10px 10px 10px;
}
.pointer {
  cursor: pointer;
}
@media only screen and (max-device-width: 780px) {
  .col6pc-12mobile {
    flex: 0 0 auto;
    width: 100%;
  }
  .form-select {
    font-size: 0.8rem;
  }
  .form-control {
    font-size: 0.8rem;
  }
  .mobile-text {
    font-size: 0.8rem;
  }
  .painel {
    width: 95%;
  }
  .btn.mobile {
    padding: 6px 2px 6px 2px;
    font-size: 0.8rem;
  }
}
</style>
