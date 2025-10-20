<template>
  <Loader v-if="loading" />
  <div class="container painel my-3" style="max-width: 600px">
    <div class="painel-header">
      <h3 style="margin: 0px">Entrar!</h3>
    </div>
    <div class="painel-content login">
      <img
        id="dentinho"
        src="https://academicosolident.com.br/img/dentinho.png"
        alt="dentinho"
        class="dentinho"
      />

      <div class="row" style="padding: 0px 8%; --bs-gutter-x: 0">
        <div class="col-12">
          <p class="text-left" style="font-weight: bold">CPF:</p>
          <div
            class="input-group mb-3"
            style="display: flex; flex-direction: row-reverse"
          >
            <input
              v-on:keyup.enter="enterLogin()"
              @keyup="validarCPF()"
              v-model="login.cpf"
              v-mask="'###.###.###-##'"
              maxlength="14"
              type="tel"
              class="form-control"
              placeholder="Digite seu CPF"
              aria-label="CPF"
            />
            <span class="input-group-text login-icon" id="basic-addon1"
              ><i class="fas fa-id-card"></i
            ></span>
          </div>
        </div>
        <div class="col-12 ; mb-3">
          <p class="text-left ; col" style="font-weight: bold">Senha:</p>
          <div
            class="input-group mb-3"
            style="display: flex; flex-direction: row-reverse"
          >
            <input
              v-on:keyup.enter="enterLogin()"
              type="password"
              v-model="login.senha"
              class="form-control"
              placeholder="Digite sua senha"
              aria-label="Senha"
              autocomplete="current-password"
            />
            <span class="input-group-text login-icon" id="basic-addon1"
              ><i class="fas fa-lock"></i
            ></span>
          </div>
        </div>
        <div class="col-12 ; mb-3 ; d-flex justify-content-start">
          <button
            @click="doLogin()"
            :disabled="!cpfValido || login.senha == ''"
            :class="!cpfValido || login.senha == '' ? 'disabled-content' : ''"
            style="background-color: #2bbacb; width: 100%"
            type="button"
            class="btn btn-info"
          >
            Entrar
          </button>
        </div>
        <div class="col-12 ; d-flex justify-content-end">
          <button
            style="width: 100%"
            @click="recuperarSenha()"
            type="button"
            class="btn btn-outline-danger ; mobile"
          >
            Esqueceu sua senha?
          </button>
        </div>
        <div
          class="text-left mt-2"
          style="font-size: 14px; color: red"
          v-if="preenchaAmbosCampos"
        >
          <span>Preencha ambos os campos para fazer login.</span>
        </div>
        <div v-if="senhaRecover.show" class="col-12 mt-3">
          <div
            class="alert alert-success fade show text-left mb-0"
            role="alert"
          >
            <div class="row">
              <div class="col-12 d-flex justify-content-between">
                Tudo Certo!
                <div
                  class="pointer text-center"
                  style="width: 50px"
                  @click="senhaRecover.show = false"
                  aria-label="Close"
                >
                  <i class="fas fa-times fa-lg"></i>
                </div>
              </div>
              <div class="col-12">
                Olá,
                <span style="font-weight: bold"> {{ senhaRecover.nome }}</span
                >, sua senha foi enviada para o e-mail:
                <span style="font-weight: bold"> {{ senhaRecover.email }}</span
                >. <br />
                Se você não recebeu, olhe sua caixa de spam.
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-12 ; mt-3 pt-3 ; text-center"
          style="border-top: 1px solid LightGrey"
        >
          <span>
            Caso não tenha cadastro, ele é feito no momento do pedido.
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Loader from "../components/Loader.vue";
export default {
  components: {
    Loader,
  },
  props: {
    numeroPedido: [String],
  },
  data: () => ({
    loading: true,
    objToStore: { session: {}, shared: {} },
    preenchaAmbosCampos: false,
    login: {
      cpf: "",
      senha: "",
    },
    cpfValido: false,
    entrar: true,
    senhaRecover: { show: false, nome: "", email: "" },
  }),
  async created() {
    await this.getPedido();
  },
  mounted() {},
  computed: {
    ...mapState({
      pagamento_pedido_base: (state) => state.pagamento_pedido_base,
      emailSenha: (state) => state.emailSenha,
      aluno: (state) => state.aluno,
    }),
  },
  methods: {
    ...mapActions(["get_pedido", "email_senha", "get_login"]),
    ...mapMutations(["set_snackbar", "set_emailSenha", "set_refreshHeader"]),
    getSession() {
      this.objToStore = this.$LS.get();
    },
    async getPedido() {
      this.getSession();
      await this.get_pedido(this.numeroPedido);
      if (
        this.pagamento_pedido_base.pedido.id_pedidos == undefined ||
        this.pagamento_pedido_base.pedido.status_aluno ==
          ("CANCELADO" || "EXCLUIDO") ||
        this.pagamento_pedido_base.pedido.listasModified
      ) {
        this.$router.push({
          name: "inicio",
        });
      } else if (
        this.pagamento_pedido_base.pedido.status_aluno !=
        ("AGUARDANDO PAGAMENTO" || "EM ANÁLISE")
      ) {
        this.$router.push({
          name: "pedidoPago",
          params: { numeroPedido: this.numeroPedido },
        });
      } else if (this.objToStore.session.aluno != null) {
        if (
          this.objToStore.session.aluno.cpf ==
          this.pagamento_pedido_base.pedido.cpf_aluno
        ) {
          this.$router.push({
            name: "SeusDados",
            params: { numeroPedido: this.numeroPedido },
          });
        } else {
          this.$router.push({
            name: "inicio",
          });
        }
      }
      this.loading = false;
    },
    async doLogin() {
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
        await this.get_login({ cpf: this.login.cpf, senha: this.login.senha });
        this.loading = false;
        if (this.aluno.error == true) {
          this.set_snackbar({
            show: true,
            severity: "error",
            summary: "Erro interno!",
            detail: "Tente novamente mais tarde.",
            life: null,
          });
        } else if (this.aluno.success == true) {
          await this.get_usuario();
          this.objToStore = this.$LS.get();
          if (this.aluno.session == null) {
            this.objToStore.session.aluno = this.aluno;
          } else {
            this.objToStore.session.aluno = this.aluno.session.aluno;
          }
          this.$LS.set(this.objToStore);
          this.set_refreshHeader(true);
          this.$router.push({
            name: "SeusDados",
            params: { numeroPedido: this.numeroPedido },
          });
        } else {
          this.set_snackbar({
            show: true,
            severity: "warn",
            summary: "Senha ou CPF incorretos!",
            detail: "verifique suas informações e tente novamente.",
            life: 3500,
          });
        }
      }
    },
    validarCPF() {
      this.cpfValido = false;
      let cpf = this.login.cpf;
      if (cpf.length >= 14) {
        if (typeof cpf !== "string") {
          this.login.cpf = "";
          this.set_snackbar({
            show: true,
            severity: "warn",
            summary: "Aviso!",
            detail: "CPF invalido.",
            life: 2500,
          });
          return false;
        }
        cpf = cpf.replace(/[\s.-]*/gim, "");
        if (
          !cpf ||
          cpf.length != 11 ||
          cpf == "00000000000" ||
          cpf == "11111111111" ||
          cpf == "22222222222" ||
          cpf == "33333333333" ||
          cpf == "44444444444" ||
          cpf == "55555555555" ||
          cpf == "66666666666" ||
          cpf == "77777777777" ||
          cpf == "88888888888" ||
          cpf == "99999999999"
        ) {
          this.login.cpf = "";
          this.set_snackbar({
            show: true,
            severity: "warn",
            summary: "Aviso!",
            detail: "CPF invalido.",
            life: 2500,
          });
          return false;
        }
        let soma = 0;
        let resto;
        for (let i = 1; i <= 9; i++)
          soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto == 10 || resto == 11) resto = 0;
        if (resto != parseInt(cpf.substring(9, 10))) {
          this.login.cpf = "";
          this.set_snackbar({
            show: true,
            severity: "warn",
            summary: "Aviso!",
            detail: "CPF invalido.",
            life: 2500,
          });
          return false;
        }
        soma = 0;
        for (let i = 1; i <= 10; i++)
          soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto == 10 || resto == 11) resto = 0;
        if (resto != parseInt(cpf.substring(10, 11))) {
          this.login.cpf = "";
          this.set_snackbar({
            show: true,
            severity: "warn",
            summary: "Aviso!",
            detail: "CPF invalido.",
            life: 2500,
          });
          return false;
        }
        this.cpfValido = true;
        return true;
      }
    },
    async recuperarSenha() {
      this.loading = true;
      if (this.login.cpf.length == 14) {
        this.objToStore = this.$LS.get();
        let tempo = new Date();
        tempo = tempo.getTime();
        if (
          this.objToStore.shared.senhaRecoverCoolDown == null ||
          tempo > this.objToStore.shared.senhaRecoverCoolDown + 300000
        ) {
          await this.email_senha(this.login.cpf);
          if (this.emailSenha.sent) {
            this.senhaRecover = this.emailSenha.aluno;
            this.objToStore.shared.senhaRecoverCoolDown = tempo;
            this.$LS.set(this.objToStore);
            this.set_emailSenha(false);
          }
        } else {
          this.set_snackbar({
            show: true,
            severity: "info",
            summary: "Aviso!",
            detail:
              "Aguarde 5 minutos para poder enviar outro email. Tempo restante: " +
              this.msToTime(
                this.objToStore.shared.senhaRecoverCoolDown + 300000 - tempo
              ),
            life: 5000,
          });
        }
      } else {
        this.set_snackbar({
          show: true,
          severity: "info",
          summary: "Aviso!",
          detail: "Preencha seu CPF para recuperar sua senha",
          life: 4000,
        });
      }
      this.loading = false;
    },
    msToTime(duration) {
      let seconds = Math.floor((duration / 1000) % 60);
      let minutes = Math.floor((duration / (1000 * 60)) % 60);
      let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      return hours + ":" + minutes + ":" + seconds;
    },
    enterLogin() {
      if (this.cpfValido && this.login.senha != "") {
        this.doLogin();
      } else {
        this.preenchaAmbosCampos = true;
      }
    },
  },
};
</script>

<style scoped>
.painel-header {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background: #2bbacb;
  color: white;
  padding: 10px;
}
.painel {
  padding: 0px;
  border-radius: 15px;
  box-shadow: 1px 4px 12px 8px #00000042;
}
.painel-content {
  padding: 15px;
}
</style>
