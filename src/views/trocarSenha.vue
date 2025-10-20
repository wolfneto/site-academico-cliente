<template>
  <Loader v-if="loading" />
  <div class="trocar-senha-container">
    <div class="trocar-senha-header">
      <h3 style="margin: 0px">Alterar sua senha</h3>
    </div>
    <div class="trocar-senha-content">
      <div>
        <img class="dentinho-senha" :src="getURL('dentinho_key.png')" alt="" />
      </div>
      <div class="form">
        <div class="col-12 ; mb-2">
          <p class="text-left ; col" style="font-weight: bold">Nova senha:</p>
          <Password
            promptLabel="digite sua nova senha!"
            weakLabel="Fraca"
            mediumLabel="Normal"
            strongLabel="Forte"
            class="form-control"
            placeholder="digite sua nova senha!"
            v-model="senhaNova"
            toggleMask
          ></Password>
        </div>
        <div class="col-12 ; mb-2">
          <p class="text-left ; col" style="font-weight: bold">
            Confirme sua nova senha:
          </p>
          <Password
            promptLabel="digite sua nova senha!"
            weakLabel="Fraca"
            mediumLabel="Normal"
            strongLabel="Forte"
            class="form-control"
            placeholder="digite sua nova senha!"
            v-model="confirmSenhaNova"
            toggleMask
          ></Password>
        </div>
        <div style="font-size: 13px; color: red" v-if="showMsg" class="col-12">
          Sua senha deve ter no mínimo 4 caracteres e ambos os campos devem
          estar iguais!
        </div>
        <div class="col-12 mt-4">
          <button
            :class="
              senhaNova.length < 4 || senhaNova != confirmSenhaNova
                ? 'disabled-content'
                : ''
            "
            @click="
              senhaNova.length < 4 || senhaNova != confirmSenhaNova
                ? (showMsg = true)
                : updateTrocarSenha()
            "
            style="width:100%"
            type="button"
            class="btn btn-info"
          >
            Alterar senha
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "../components/Loader";
import Password from "primevue/password";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  components: {
    Loader,
    Password,
  },
  props: {
    idTrocarSenha: String,
  },
  data: () => ({
    loading: false,
    senhaNova: "",
    confirmSenhaNova: "",
    seePassword: false,
    showMsg: false,
  }),
  created() {
    this.getTrocarSenha();
  },
  mounted() {},
  computed: {
    ...mapState({
      aluno: (state) => state.aluno,
      trocarSenha: (state) => state.trocarSenha,
      error: (state) => state.error,
    }),
  },
  methods: {
    ...mapMutations([
      "set_snackbar",
      "set_scrollToPosvenda",
      "set_emailSenha",
      "set_aluno",
      "set_sessionExpired",
    ]),
    ...mapActions([
      "get_login",
      "update_senha",
      "get_trocarSenha",
      "update_trocarSenha",
    ]),
    async getTrocarSenha() {
      this.loading = true;
      await this.get_trocarSenha(this.idTrocarSenha);
      if (this.error) {
        this.$router.push({ name: "inicio" });
      } else if (this.trocarSenha.id == null) {
        this.$router.push({ name: "inicio" });
        this.set_snackbar({
          show: true,
          severity: "error",
          summary: "Informações não encontradas",
          detail: "tente novamente mais tarde.",
          life: null,
        });
      } else if (this.trocarSenha.status != "1") {
        this.$router.push({ name: "inicio" });
        this.set_snackbar({
          show: true,
          severity: "warn",
          summary: "Link já utilizado.",
          detail: "Faça a requisição de alteração da senha novamente.",
          life: 6000,
        });
      } else {
        let tempoAtual = Date.now();
        if (this.trocarSenha.timer + 1800000 < tempoAtual) {
          this.$router.push({ name: "inicio" });
          this.set_snackbar({
            show: true,
            severity: "warn",
            summary: "Tempo máximo de espera excedido",
            detail: "Faça a requisição de alteração da senha novamente.",
            life: 6000,
          });
        } else this.loading = false;
      }
    },
    async updateTrocarSenha() {
      this.loading = true;
      await this.update_trocarSenha({
        cpf: this.trocarSenha.cpf_aluno,
        senhaNova: this.senhaNova,
      });
      if (this.aluno.senhaTrocada) {
        //deletar trocar senha na base ou marcar como ja usado.
        // this.trocarSenha.status = "0";
        // this.update_trocarSenha(this.trocarSenha);
        this.$router.push({ name: "inicio" });
      } else {
        this.senhaNova = "";
        this.confirmSenhaNova = "";
      }
      this.loading = false;
    },
    getURL(img) {
      return require("../assets/" + img);
    },
  },
};
</script>

<style>
.trocar-senha-container .p-password-input:hover {
  border-color: var(--primary) !important;
}
.trocar-senha-container .p-password-input:focus {
  border-color: var(--primary) !important;
  box-shadow: 0 0 0 0.2rem #72dfea7d !important;
}
</style>

<style scoped>
.trocar-senha-container {
  margin: 10px auto;
  max-width: 320px;
  border-radius: 10px;
  background: var(--secondary);
  box-shadow: 0 0 15px rgb(172, 172, 172);
}
.trocar-senha-header {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 10px;
  background: var(--primary);
  color: white;
}
.trocar-senha-content {
  padding: 10px 25px;
}
.dentinho-senha {
  height: 100px;
  margin-bottom: 10px;
}
.login .form-control {
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  border-right: none !important;
}
.eye-icon {
  cursor: pointer;
  border-radius: 0.25rem !important;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  width: 2.8rem !important;
  border-color: var(--primary) !important;
}
.eye-icon:hover {
  color: var(--primary) !important;
  background: var(--secondary) !important;
}
</style>
