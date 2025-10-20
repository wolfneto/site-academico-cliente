<template>
  <Loader v-show="loading"> </Loader>
  <div
    @click.self="viewImg = !viewImg"
    id="backdrop"
    :class="viewImg ? 'active-backdrop' : ''"
    class="d-flex align-items-center justify-content-center"
  >
    <div style="position: relative" v-if="viewImg">
      <div
        @click="viewImg = !viewImg"
        class="close-img"
        style="padding: 0px 10px"
      >
        <i class="fas fa-times"></i>
      </div>
      <img :src="getURL(kitImage)" alt="" class="view-img" />
    </div>
  </div>
  <div class="container mt-4 painel" style="padding:0px">
    <div class="painel-header">
      <h3 style="margin:0px">KITS ACADÊMICOS</h3>
    </div>
    <div class="row" style="margin: 0px">
      <div class="col-12 mb-2 custom">
        <span>SELECIONE SUA FACULDADE</span>
        <AutoComplete
          style="height: 42px !important"
          :scrollHeight="mobile ? '180px' : '230px'"
          :style="mobile ? 'border-right: 1px solid #ced4da !important' : ''"
          @item-select="getSemestres()"
          :delay="50"
          :forceSelection="true"
          v-model="searchFaculdade"
          :dropdown="!mobile"
          :suggestions="filteredFaculdades"
          @complete="filterFaculdades($event)"
          placeholder="Procure por sua faculdade"
          field="nome_exibicao_faculdade"
        >
          <template #item="slotProps">
            <div class="row">
              <div class="col-2">
                <img :src="getURL(slotProps.item.imagem_path)" height="30" />
              </div>
              <div class="col-10 text-left pl-4">
                <div>{{ slotProps.item.nome_exibicao_faculdade }}</div>
              </div>
            </div>
          </template></AutoComplete
        >
      </div>
      <div class="col-6 d-flex align-items-center justify-content-center">
        <img
          @click="kitImage == 'placeholder.png' ? null : (viewImg = !viewImg)"
          :src="getURL(kitImage)"
          class="img-kit"
        />
      </div>
      <div
        class="col-6 text-left d-flex align-items-center justify-content-center"
      >
        <div style="width: 100%;">
          <div class="my3" style="">
            <span> SELECIONE SEU SEMESTRE</span>
            <select
              @change="focusKits()"
              :disabled="selectedFaculdade == null || semestres.length == 0"
              id="select-semestre"
              v-model="selectedSemestre"
              class="form-select select-faculdade select-semestre"
            >
              <option disabled selected :value="0">
                <span v-if="selectedFaculdade == null"
                  >Selecione sua Faculdade.</span
                >
                <span v-else> Selecione seu semestre</span>
              </option>
              <option
                :hidden="semestre.situacao_semestre != '1'"
                :value="semestre"
                v-for="semestre in semestres"
                :key="semestre.id_semestre"
                :disabled="semestre.status_semestre == '0'"
              >
                {{ semestre.descri_semestre }}
                <span v-if="semestre.status_semestre == '0'"
                  >- Indisponível</span
                >
              </option>
            </select>
          </div>
          <div class="my3">
            <span> SELECIONE O KIT</span>
            <select
              @change="kitImage = selectedKit.url_image.substring(9)"
              v-model="selectedKit"
              :disabled="selectedSemestre == 0"
              id="select-kit"
              class="form-select"
            >
              <option disabled selected :value="0">
                <span v-if="selectedFaculdade == null"
                  >Selecione sua faculdade.</span
                >
                <span v-else-if="selectedSemestre == 0"
                  >Selecione seu semestre.</span
                >
                <span v-else> Selecione o kit</span>
              </option>
              <option
                :value="kit"
                v-for="kit in selectedSemestre.kit_academicos"
                :key="kit.id_kit"
              >
                {{ kit.nome_kit }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div
        v-html="selectedKit.descricao_kit"
        class="col-12 mt-2"
        style="padding: 0px 10px"
      ></div>

      <div v-if="objToStore.session.aluno == undefined" class="py-2">
        <div class="col-12 mt-2">
          <button
            :disabled="selectedKit == 0"
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
            :disabled="selectedKit == 0"
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

      <div class="my-2" v-else>
        <button
          @click="logadoEvent()"
          :disabled="selectedKit == 0"
          :class="selectedKit == 0 ? 'disabled-content' : ''"
          style="margin: auto"
          type="button"
          class="btn btn-info"
        >
          Avançar
        </button>
      </div>
    </div>
  </div>

  <div id="target"><br /></div>

  <div class="painel-login">
    <Entrar v-if="login == 1" />
    <Cadastrar v-if="login == 2" />
  </div>

  <Dialog
    style="max-width: 550px;"
    modal
    dismissableMask
    closeOnEscape
    :closable="true"
    v-model:visible="modalLogado"
  >
    <template #header>
      <h3 class="mr-2 mb-0">Finalização do Pedido!</h3>
    </template>
    <div class="row mobile-text" style="margin: 0px">
      <div class="col-12">
        <span style="font-weight: bold"
          >Olá, {{ objToStore.session.aluno.nome }}!</span
        >
      </div>
      <div
        class="col-6 text-center pr-3 mt-2"
        style="border-right: 1px solid LightGrey; font-weight: bold"
      >
        {{ selectedFaculdade.nome_exibicao_faculdade }}
      </div>
      <div class="col-6 text-center pl-3 mt-2" style="font-weight: bold">
        {{ selectedSemestre.descri_semestre }}
      </div>
      <div class="col-12">
        {{ selectedKit.nome_kit }}
      </div>
      <div class="col-12" v-html="selectedKit.descricao_kit"></div>
      <div class="col-12 text-left">
        <span style="font-weight: bold">Periodo:</span>
        <select
          v-model="logadoInfo.periodo"
          class="form-select ; mb-3"
          @change="getRepresentantes()"
        >
          <option selected disabled :value="0">Selecione...</option>
          <option
            v-for="periodo of selectedSemestre.periodos"
            :key="periodo.id_periodo"
            :value="periodo"
          >
            {{ periodo.nome_periodo }}
          </option>
        </select>
      </div>
      <div class="col-12 text-left">
        <span style="font-weight: bold"> Representante: </span>
        <select
          v-model="logadoInfo.contato"
          :disabled="logadoInfo.periodo == 0"
          class="form-select ; mb-3"
        >
          <option selected disabled v-if="logadoInfo.periodo == 0" :value="0">
            Selecione um periodo.
          </option>
          <option selected disabled v-else :value="0">
            Selecione um representante.
          </option>
          <option
            v-for="representante of representantes"
            :key="representante.id_representante"
            :value="representante"
          >
            {{ representante.nome_representante }}
          </option>
        </select>
      </div>
    </div>
    <template #footer>
      <div class="d-flex justify-content-center">
        <button
          disabled
          class="btn btn-dark"
          v-if="logadoInfo.periodo == 0 || logadoInfo.contato == 0"
        >
          <span> Finalizar pedido! </span>
        </button>
        <button
          v-else
          style="background-color: #2bbacb"
          type="button"
          class="btn btn-info"
          @click="
            modalLogado = false;
            doLogin();
          "
        >
          <span> Finalizar pedido! </span>
        </button>
      </div>
    </template>
  </Dialog>

  <Dialog
    style="width: 340px"
    :closeOnEscape="false"
    :dismissableMask="false"
    :closable="false"
    modal
    v-model:visible="modalUpdateInfo"
    class="no-close-icon slim-footer"
  >
    <template #header>
      <div class="text-center" style="width: 100%;">
        <h5 class="text-center mb-0">ATUALIZE SUAS INFORMAÇÕES!</h5>
      </div>
    </template>

    <!-- email, telefone, celular, data de nascimento se n estiver preenchido -->
    <div class="container text-left">
      <div class="mb-2">
        <span>
          A última atualização dos seus dados foi há mais de 5 meses, confira se
          ainda são validos.
        </span>
      </div>

      <span>Email</span>
      <div class="input-group mb-2">
        <input
          v-model="objToStore.session.aluno.email"
          type="text"
          class="form-control"
          autocomplete="none"
        />
      </div>

      <span>Celular</span>
      <div class="input-group mb-2">
        <input
          v-model="objToStore.session.aluno.celular"
          type="tel"
          v-mask="'## #####-####'"
          class="form-control"
          autocomplete="none"
        />
      </div>

      <span>Telefone</span>
      <div class="input-group mb-2">
        <input
          v-model="objToStore.session.aluno.telefone"
          type="tel"
          v-mask="'## ####-####'"
          class="form-control"
          autocomplete="none"
        />
      </div>

      <span v-if="!TemNascimento">data de nascimento</span>
      <div v-if="!TemNascimento" class="input-group mb-2">
        <input
          v-mask="'##/##/####'"
          v-model="objToStore.session.aluno.nascimento"
          placeholder="00/00/0000"
          type="tel"
          class="form-control"
          autocomplete="none"
        />
      </div>
    </div>

    <template #footer>
      <div class="container d-flex justify-content-center">
        <button
          :class="
            objToStore.session.aluno.email.length < 5 ||
            objToStore.session.aluno.celular.length < 9 ||
            objToStore.session.aluno.telefone.length < 8 ||
            objToStore.session.aluno.nascimento.length < 10
              ? 'disabled-content'
              : ''
          "
          :disabled="
            objToStore.session.aluno.email.length < 5 ||
              objToStore.session.aluno.celular.length < 9 ||
              objToStore.session.aluno.telefone.length < 8 ||
              objToStore.session.aluno.nascimento.length < 10
          "
          style="width: 100%; margin: 0px 0px 10px 0px !important"
          @click="updateAluno()"
          type="button"
          class="btn btn-info text-center"
        >
          Atualizar
        </button>
      </div>
    </template>
  </Dialog>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import AutoComplete from "primevue/autocomplete";
import Loader from "../components/Loader";
import Entrar from "../components/Entrar";
import Cadastrar from "../components/Cadastrar";
import Dialog from "primevue/dialog";
export default {
  components: {
    Dialog,
    Cadastrar,
    Entrar,
    Loader,
    AutoComplete,
  },
  data: () => ({
    modalUpdateInfo: false,
    TemNascimento: true,
    mobile: false,
    allowNotlogged: true,
    search: "",
    viewImg: false,
    objToStore: { session: {}, shared: {} },
    loading: false,
    login: 0,
    searchFaculdade: null,
    selectedFaculdade: null,
    filteredFaculdades: null,
    selectedSemestre: 0,
    selectedKit: 0,
    kitImage: "placeholder.png",
    modalLogado: false,
    logadoInfo: {
      contato: 0,
      periodo: 0,
    },
  }),
  async created() {
    this.loading = true;
    this.mobile = screen.width > 700 ? false : true;
    this.getSession();
    await this.get_faculdades();
    this.loading = false;
  },
  async mounted() {},
  computed: {
    ...mapState({
      faculdades: (state) => state.faculdades,
      semestres: (state) => state.semestres,
      pedido: (state) => state.pedido,
      id_pedido: (state) => state.id_pedido,
      representantes: (state) => state.representantes,
      aluno: (state) => state.aluno,
      error: (state) => state.error,
    }),
  },
  methods: {
    ...mapMutations(["set_pedido", "set_snackbar"]),
    ...mapActions([
      "get_faculdades",
      "get_semestres_com_kits",
      "get_representantes",
      "salvar_pedido",
      "update_aluno",
    ]),
    getSession() {
      this.objToStore = this.$LS.get();
    },
    filterFaculdades(event) {
      this.kitImage = "placeholder.png";
      this.login = 0;
      this.selectedFaculdade = null;
      this.selectedSemestre = 0;
      this.selectedKit = 0;
      this.filteredFaculdades = this.faculdades.filter((faculdade) =>
        faculdade.nome_exibicao_faculdade
          .toLowerCase()
          .replace(/\s/g, "")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(
            event.query
              .toLowerCase()
              .replace(/\s/g, "")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          )
      );
    },
    async getSemestres() {
      this.loading = true;
      this.kitImage = "placeholder.png";
      this.login = 0;
      this.selectedFaculdade = this.searchFaculdade;
      await this.get_semestres_com_kits(this.selectedFaculdade.id_faculdade);
      if (this.semestres.length == 0) {
        this.set_snackbar({
          show: true,
          severity: "info",
          summary: "Faculdade sem kits disponíveis",
          detail: "Entre em contato conosco para mais informações.",
          life: 6000,
        });
      }
      window.setTimeout(function() {
        document.getElementById("select-semestre").focus();
      }, 0);
      this.loading = false;
    },
    async focusKits() {
      this.loading = true;
      this.kitImage = "placeholder.png";
      this.selectedKit = 0;
      this.login = 0;
      window.setTimeout(function() {
        document.getElementById("select-kit").focus();
      }, 100);
      this.loading = false;
    },
    async getRepresentantes() {
      this.logadoInfo.contato = 0;
      this.loading = true;
      await this.get_representantes({
        id_semestre: this.selectedSemestre.id_semestre,
        id_faculdade: this.selectedFaculdade.id_faculdade,
        cod_periodo: this.logadoInfo.periodo.cod_periodo,
      });
      this.loading = false;
    },
    logadoEvent() {
      let dataAtual = new Date();
      this.objToStore = this.$LS.get();
      this.objToStore.session.aluno.updated_at = new Date(
        this.objToStore.session.aluno.updated_at
      );
      if (
        this.objToStore.session.aluno.updated_at.setMonth(
          this.objToStore.session.aluno.updated_at.getMonth() + 5
        ) < dataAtual
      ) {
        if (this.objToStore.session.aluno.nascimento == null) {
          this.TemNascimento = false;
          this.objToStore.session.aluno.nascimento = "";
        }
        this.modalUpdateInfo = true;
      } else {
        this.logadoInfo.periodo = 0;
        this.logadoInfo.contato = 0;
        this.modalLogado = true;
      }
    },
    async doLogin() {
      this.loading = true;
      let aluno = this.objToStore.session.aluno;
      aluno.periodo = this.logadoInfo.periodo;
      aluno.contato = this.logadoInfo.contato;
      let carrinho = {
        kit: this.selectedKit,
        faculdade: this.selectedFaculdade,
        semestre: this.selectedSemestre,
      };
      this.set_pedido({
        doCadastro: false,
        aluno: aluno,
        carrinho: carrinho,
        kit: true,
      });
      await this.salvar_pedido(this.pedido);
      this.objToStore.session.aluno.periodo = this.logadoInfo.periodo.id_periodo.toString();
      this.objToStore.session.aluno.contato = this.logadoInfo.contato.id_representante.toString();
      this.$LS.set(this.objToStore);

      this.$router.push({
        name: "SeusDados",
        params: { numeroPedido: this.id_pedido },
      });
      this.loading = false;
    },
    async updateAluno() {
      this.loading = true;
      await this.update_aluno(this.objToStore.session.aluno);
      if (!this.error) {
        this.objToStore.session.aluno = this.aluno;
        this.$LS.set(this.objToStore);
      }
      this.modalUpdateInfo = false;
      this.modalLogado = true;
      this.loading = false;
    },
    smoothScroll(target) {
      setTimeout(function() {
        document.getElementById(target).scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    },
    getURL(img) {
      return require("../assets/" + img);
    },
  },
};
</script>

<style>
.custom .p-inputtext:enabled:focus {
  box-shadow: 0 0 0 0.2rem #65d5e185 !important;
  border-color: #65d5e1 !important;
}
.custom .p-inputtext:enabled:hover {
  border-color: #ced4da !important;
}
.custom .p-button {
  color: #343a40 !important;
  /* background: #2196F3; */
  /* border: 1px solid #2196F3; */
  background: #00000000 !important;
  border-radius: 0px !important;
  border-top-right-radius: 0.25rem !important;
  border-bottom-right-radius: 0.25rem !important;
  cursor: default !important;
  border-color: #ced4da !important;
  border-left: none !important;
}
.custom .p-autocomplete {
  border-right: none !important;
  border-radius: 0.25rem !important;
  width: 100% !important;
}
.custom .p-inputtext {
  height: 42px !important;
  width: 100% !important;
  padding: 0px 10px !important;
  border-right: none !important;
}
</style>
<style scoped>
.close-img {
  position: absolute;
  top: -18px;
  right: -18px;
  color: red;
  font-size: 30px;
}
.view-img {
  height: 250px;
  border-radius: 15px;
  cursor: default;
}
.painel-login {
  margin: auto;
  max-width: 700px;
}
.painel {
  margin: auto;
  max-width: 700px;
  box-shadow: 0px 0px 1em 3px #0000006e;
  border-radius: 15px;
}
.painel-header {
  padding: 5px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: #2bbacb;
  color: white;
  margin-bottom: 10px;
}
.img-kit {
  cursor: pointer;
  height: 213px;
}
.my3 {
  margin: 16px 0px;
}
#backdrop {
  top: 0px;
  z-index: 2;
  cursor: pointer;
  transition: all 0.2s;
  position: fixed;
  width: 100%;
  height: 0%;
  background: #0000005b;
  box-shadow: 1px -14px 1em 15px #0000005c;
}
.active-backdrop {
  height: 100% !important;
  box-shadow: -1px 0px 1em 15px #0000005c !important;
}
@media only screen and (max-width: 400px) {
  .img-kit {
    height: 150px;
  }
  .my3 {
    margin: 5px 0px;
    font-size: 14px !important;
  }
}
</style>
