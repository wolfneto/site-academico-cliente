<template>
  <Loader v-show="loading"></Loader>
  <div class="main-div">
    <div style="cursor: pointer;" class="container py-2 my-3 d-flex justify-content-around align-items-center saldao-container" @click="clickSaldao(faculdadeSaldao)" v-if="faculdadeSaldao">
  <img class="saldao-image" :src="'https://academicosolident.com.br/img/' + faculdadeSaldao.imagem_path" alt="saldao" />
</div>
    <div  v-else class="container ; py-2 my-3 ; d-flex justify-content-around align-items-center ; painel"
      style="box-shadow: 0px 0px 20px #00000062">
     
  
        <div>
        <img id="dentinho" :src="getURL('dentinho_academico_solident.png')" alt="dentinho"
          style="height: 140px !important" /><br />
      </div>
      <div  class="avisos-desktop">
        <div v-for="aviso in avisoGeral" :key="aviso.id">
          <div v-if="!aviso.modal" v-html="aviso.msg"></div>
        </div>
      </div>

      
    </div>

    <div id="pesquisar-faculdade" class="container ; d-flex justify-content-center mt-3 ; painel-header">
      <div class="col-12">
        <div class="input-group p-2">
          <span title="Limpa o campo de pesquisa" v-if="search.trim().length > 0" @click="
            search = '';
          updateStepOne();
          " class="input-group-text botao-limpar" id="basic-addon1">Limpar</span>
          <input @focus="
            hideAjuda();
          isFocused = true;
          " @blur="
            showAjuda();
          isFocused = false;
          " @keyup="updateStepOne()" @change="updateStepOne()" autocomplete="off" id="input-pesquisar-faculdade"
            type="text" class="form-control input-pesquisa" :style="isFocused || search.length > 0
              ? 'padding: 5px 20px !important;'
              : 'padding: 17px 20px !important;'
              " :placeholder="isFocused ? '' : 'Procure por sua faculdade!!!!'" v-model="search" />
          <span class="input-group-text botao-pesquisar d-flex align-items-center" id="basic-addon1"><i
              class="fas fa-search"></i></span>
        </div>
      </div>
    </div>
    <div class="container ; p-5; mb-3 ;" style="box-shadow: 0px 0px 20px #00000062; border-radius: 0px 0px 10px 10px">
      <div v-if="filteredFaculdades.length > 0" id="container-faculdades" class="row d-flex justify-content-center">
        <div @click="removeBlock()" class="overlay"></div>
        <div v-for="faculdade in filteredFaculdades" :key="faculdade.nome_exibicao_faculdade" :class="faculdade.status == '0'
          ? 'faculdade-container-desativada'
          : 'faculdade-container'
          " :id="'faculdade-' + faculdade.id_faculdade" @click="
            faculdade.status == '0'
              ? callSnackbar(
                'warn',
                'Atenção!',
                faculdade.mensagem != null && faculdade.mensagem.trim() != ''
                  ? faculdade.mensagem.trim()
                  : 'Faculdade indisponível no momento.',
                3000
              )
              : clickedFaculdade(faculdade)
            ">
          <div class="faculdade-background">
            <img v-if="faculdade.imagem_path && !imageErrors[faculdade.id_faculdade]"
              :src="'https://academicosolident.com.br/img/' + faculdade.imagem_path" alt="faculdade_imagem"
              class="card-img-top" style="height: 90px; width: 150px" @error="handleImageError(faculdade.id_faculdade)" />
            <div v-else class="faculdade-placeholder card-img-top"
              :style="{ backgroundColor: getPlaceholderColor(faculdade.nome_exibicao_faculdade) }">
              {{ getFaculdadeInitials(faculdade.nome_exibicao_faculdade) }}
            </div>
          </div>
          <div @click.stop="" :id="'loader-' + faculdade.id_faculdade"></div>
          <div @click.stop="" v-if="faculdade.status != '0'" class="tipo-escolha align-items-start">
            <div class="row" style="height:72px">
              <div style="height: 58px; width:100%"></div>
              <div v-if="graduacao.length > 0" class="col-12 d-flex align-items-center" style="padding: 0px;">
                <button @click="
                  botaoSemestreEvent(faculdade.id_faculdade),
                  (semestresTipo = graduacao),
                  (isGraduacao = true)
                  " type="button" class="btn btn-info botao-faculdade" style="background-color: #17a2b8bd">
                  <div class="row">
                    <div class="col-3 text-center">
                      <i class="fas fa-graduation-cap"></i>
                    </div>
                    <div class="col text-left">Graduação</div>
                  </div>
                </button>
              </div>
              <div v-if="especializacao.length > 0" class="col-12 d-flex align-items-center" style="padding: 0px;">
                <button @click="
                  botaoSemestreEvent(faculdade.id_faculdade),
                  (semestresTipo = especializacao),
                  (isGraduacao = false)
                  " type="button" class="btn btn-success botao-faculdade" style="background-color: #28a745b5">
                  <div class="row">
                    <div class="col-3 text-center">
                      <i class="fas fa-certificate"></i>
                    </div>
                    <div class="col text-left">Especialização</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div @click.stop="" class="semestre-escolha">
            <div class="row">
              <div class="col-12"></div>
              <div class="col-12">
                <div class="input-group">
                  <span @click.stop="graduacaoBack(faculdade.id_faculdade)" class="input-group-text botao-limpar"
                    id="basic-addon1"><i class="fas fa-undo pointer"></i></span>
                  <select @change="
                    (semestreEscolhido.limite_venda != -1 &&
                      semestreEscolhido.listas_vendidas >=
                      semestreEscolhido.limite_venda) ||
                      semestreEscolhido.status_semestre == '0' ||
                      semestreEscolhido.situacao_semestre != '1' ||
                      (semestreEscolhido.msg_semestre != null &&
                        semestreEscolhido.msg_semestre.trim() != '')
                      ? (modalSemestre = true)
                      : semestreEvent(semestreEscolhido)
                    " id="select-semestre" v-model="semestreEscolhido"
                    class="form-select select-faculdade select-semestre" aria-label="Default select example">
                    <option :value="0" selected disabled>
                      <span v-if="isGraduacao"> Selecione seu semestre </span><span v-else> Selecione sua Especialização
                      </span>
                    </option>
                    <option :hidden="semestre.situacao_semestre != '1'" :value="semestre"
                      v-for="semestre in semestresTipo" :key="semestre.id_semestre"
                      :disabled="semestre.situacao_semestre != '1'">
                      {{ semestre.descri_semestre }}
                      <!-- <span v-if="semestre.status_semestre == '0'"
                        >- Indisponível</span
                      > -->
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else style="padding: 20px 10px; font-size:20px">
        Nenhum resultado encontrado para " {{ search }} "
      </div>
    </div>

    <Dialog style="max-width:450px" modal closeOnEscape dismissableMask :closable="true"
      v-model:visible="modalAvisosDesktop">
      <template #header>
        <h3 class="mr-2 mb-0">AVISO!</h3>
      </template>
      <div v-for="aviso in avisoGeral" :key="aviso.id">
        <div v-if="aviso.modal" v-html="aviso.msg"></div>
      </div>
      <template #footer>
        <div class="d-flex justify-content-center">
          <button style="min-width: 50%" @click="modalAvisosDesktop = false" type="button" class="btn btn-info">
            OK
          </button>
        </div>
      </template>
    </Dialog>

    <Dialog style="font-size: 15px" modal closeOnEscape dismissableMask :closable="true" v-model:visible="modalAvisos">
      <template #header>
        <h3 class="mr-2 mb-0">AVISOS!</h3>
      </template>

      <div v-for="aviso in avisoGeral" :key="aviso.id" v-html="aviso.msg"></div>

      <template #footer>
        <div class="d-flex justify-content-center">
          <button style="width: 80%;" @click="modalAvisos = false" type="button" class="btn btn-info">
            OK
          </button>
        </div>
      </template>
    </Dialog>

    <Dialog modal :closable="true" v-model:visible="modalInfocheck" style="width: 300px">
      <template #header>
        <h3 class="mr-2 mb-0">ATENÇÃO!</h3>
      </template>

      {{ infocheck.msg }}

      <template #footer>
        <div class="d-flex justify-content-center">
          <button @click="modalInfocheck = false" type="button" class="btn btn-info">
            OK
          </button>
        </div>
      </template>
    </Dialog>

    <Dialog style="max-width:500px" dismissableMask :baseZIndex="1000" @hide="semestreEscolhido = 0" modal
      :closable="true" v-model:visible="modalSemestre">
      <template #header>
        <h3 class="mr-2 mb-0">ATENÇÃO</h3>
      </template>
      <div class="container">
        <div v-if="
          semestreEscolhido.msg_semestre != null &&
          semestreEscolhido.msg_semestre.trim() != ''
        ">
          {{ semestreEscolhido.msg_semestre }}
        </div>
        <div v-else>
          Semestre ou especialização indisponível
        </div>
        <div v-if="
          semestreEscolhido.limite_venda != -1 &&
          semestreEscolhido.listas_vendidas >=
          semestreEscolhido.limite_venda
        ">
          Listas esgotadas, tente novamente mais tarde ou entre em contato
          conosco.
        </div>
      </div>

      <template #footer>
        <div class="d-flex justify-content-center">
          <button @click="modalSemestre = false" type="button" class="btn btn-danger" style="padding: 3px .75rem;">
            Fechar
          </button>
          <button style="padding: 3px .75rem;" v-if="
            (semestreEscolhido.limite_venda == -1 ||
              semestreEscolhido.listas_vendidas <
              semestreEscolhido.limite_venda) &&
            semestreEscolhido.status_semestre != '0' &&
            semestreEscolhido.situacao_semestre != '0'
          " @click="
            semestreEvent(semestreEscolhido);
          modalSemestre = false;
          " type="button" class="btn btn-success">
            Avançar
          </button>
        </div>
      </template>
    </Dialog>

    <Dialog style="max-width: 500px" modal :closable="false" v-model:visible="modalIpBlocked">
      <template #header>
        <h3 class="mr-2 mb-0">ATENÇÃO!</h3>
      </template>

      <div class="row m-0">
        <div class="col-12 col-md-3 d-flex align-items-center justify-content-center">
          <img :src="require('@/assets/blocked.png')" alt="" height="80" />
        </div>
        <div class="col-md-9">
          Detectamos que você esta usando um adblock em seu navegador, para
          visualizar nosso site corretamente, será necessário desativa-lo.
        </div>
      </div>

      <template #footer>
        <div class="d-flex justify-content-center">
          <button style="width:100% ; max-width: 150px" @click="modalIpBlocked = false" type="button"
            class="btn btn-info">
            OK
          </button>
        </div>
      </template>
    </Dialog>

    <div class="mobile-text d-flex justify-content-center" id="cookies-aviso">
      <div style="height: 100%" class="row container">
        <div class="col-10 d-flex align-items-center d-flex justify-content-center">
          <span id="cookies-span">Este website utiliza cookies para fornecer uma melhor experiência
            aos seus visitantes.
          </span>
        </div>
        <div style="height: 100%" class="col-2 d-flex align-items-center d-flex justify-content-center">
          <button id="botao-cookie" @click="fecharCookies()" type="button" class="btn btn-info cookie-button">
            Aceitar
          </button>
        </div>
      </div>
    </div>
  </div>

  <div :style="objToStore.shared.cookies ? 'bottom: 14px' : 'bottom:55px'" v-if="ajudaVisible" id="ajuda-container"
    @click.stop="iniciarTour()">
    <div @click.stop="closeAjuda()" id="ajuda-close">
      <i class="fas fa-times"></i>
    </div>
    <img @click="null" class="ajuda-img" :src="getURL('dentinho-ajuda-teste-balaov3.png')" alt="" />
  </div>

  <div :style="objToStore.shared.cookies ? 'bottom: 0px' : 'bottom:50px'" v-else id="minimized-ajuda"
    @click="restoreAjuda()">
    <span>Precisa de ajuda?</span>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Loader from "../components/Loader";
import Dialog from "primevue/dialog";
export default {
  components: {
    Loader,
    Dialog,
  },
  data: () => ({
    modalIpBlocked: false,
    modalSemestre: false,
    modalInfocheck: false,
    modalAvisos: false,
    modalAvisosDesktop: false,
    ajudaVisible: true,
    isGraduacao: true,
    tour: {},
    semestreEscolhido: 0,
    search: "",
    objToStore: { session: {}, shared: {} },
    loading: false,
    graduacao: [],
    especializacao: [],
    semestresTipo: [],
    isFocused: false,
    imageErrors: {},
  }),
  async created() {
    this.getSession();
    this.getFaculdades();
    await this.get_avisoGeral();
    if (this.infocheck != undefined && this.infocheck.show) {
      this.modalInfocheck = true;
      this.set_infocheck({ show: false, msg: this.infocheck.msg });
    } else if (this.ipBlocked) {
      this.modalIpBlocked = true;
      this.set_ipBlocked(false);
    } else {
      this.modalAvisos = screen.width <= 760;
      this.modalAvisosDesktop = screen.width > 760;
    }
  },
  mounted() {
    this.tour = this.$shepherd({
      keyboardNavigation: false,
      useModalOverlay: true,
    });
  },
  computed: {
    ...mapState({
      faculdades: (state) => state.faculdades,
      semestres: (state) => state.semestres,
      avisoGeral: (state) => state.avisoGeral,
      error: (state) => state.error,
      infocheck: (state) => state.infocheck,
      tourVaiContinuar: (state) => state.tourVaiContinuar,
      ipBlocked: (state) => state.ipBlocked,
    }),
    faculdadeSaldao: function () {
      return this.faculdades.find(
        (faculdade) => faculdade.nome_faculdade === "saldao"
      );
    },
    filteredFaculdades: function () {
      // Primeiro filtra para excluir "saldao"
      let faculdadesFiltradas = this.faculdades.filter(
        (faculdade) => faculdade.nome_faculdade !== "saldao"
      );

      // Depois aplica o filtro de busca se houver texto
      if (this.search != "") {
        return faculdadesFiltradas.filter(
          (faculdade) =>
            (faculdade.nome_exibicao_faculdade || "")
              .toLowerCase()
              .replace(/\s/g, "")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(
                this.search
                  .toLowerCase()
                  .replace(/\s/g, "")
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
              ) ||
            (faculdade.sigla || "")
              .toLowerCase()
              .replace(/\s/g, "")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(
                this.search
                  .toLowerCase()
                  .replace(/\s/g, "")
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
              )
        );
      }
      return faculdadesFiltradas;
    },
  },

  methods: {
    ...mapMutations([
      "set_semestres",
      "set_snackbar",
      "set_infocheck",
      "set_tourVaiContinuar",
      "set_ipBlocked",
    ]),
    ...mapActions(["get_faculdades", "get_semestres", "get_avisoGeral"]),
    handleImageError(id) {
      this.imageErrors = { ...this.imageErrors, [id]: true };
    },
    getFaculdadeInitials(nome) {
      if (!nome) return "?";
      return nome.trim().split(/\s+/).filter(Boolean).slice(0, 2)
        .map((w) => w[0].toUpperCase()).join("");
    },
    getPlaceholderColor(nome) {
      const palette = ["#1976d2", "#388e3c", "#f57c00", "#7b1fa2", "#c2185b", "#0097a7", "#5d4037", "#455a64"];
      if (!nome) return palette[0];
      let hash = 0;
      for (let i = 0; i < nome.length; i++) hash = nome.charCodeAt(i) + ((hash << 5) - hash);
      return palette[Math.abs(hash) % palette.length];
    },
    getSession() {
      this.objToStore = this.$LS.get();
      if (this.objToStore.shared.ajudaVisible != null) {
        this.ajudaVisible = this.objToStore.shared.ajudaVisible;
      }
    },
    async getFaculdades() {
      this.loading = true;
      await this.get_faculdades();
      this.loading = false;
      if (this.objToStore.shared.cookies == undefined) {
        document.getElementById("cookies-aviso").style.borderTop =
          "1px solid #94e6f7";
        document.getElementById("cookies-aviso").style.height = "50px";
        document.getElementById("botao-cookie").style.display = "flex";
        document.getElementById("cookies-span").style.display = "inline";
      }
    },

    async clickSaldao(faculdade){
      await this.get_semestres(faculdade.id_faculdade);
      let semestre = this.semestres.graduacao[0]
      this.objToStore = this.$LS.get();
      this.objToStore.session.semestre = semestre;
      this.objToStore.session.semestre.descri_semestre = this.objToStore.session.semestre.descri_semestre.toUpperCase();
      this.$LS.set(this.objToStore);
      //termina a tour
      this.$router.push({
        name: "listas",
        params: { id_semestre: semestre.id_semestre },
      });
      
    },
    async clickedFaculdade(faculdade) {
      //OVERLAY START
      let overlay = document.getElementsByClassName("overlay");
      overlay[0].classList.add("block");
      void overlay[0].offsetHeight; // Reflow
      overlay[0].classList.add("overlayLigado");
      //OVERLAY END

      let els = document.getElementsByClassName("faculdade-container");
      for (let element of els) {
        element.classList.remove("background-transition");
        element.classList.remove("faculdade-container-ativo");
      }
      document
        .getElementById("faculdade-" + faculdade.id_faculdade)
        .classList.add("faculdade-container-clicado");

      this.smoothScroll("faculdade-" + faculdade.id_faculdade);

      document.getElementById("container-faculdades").classList.add("greyOut");

      let loader = document.getElementById("loader-" + faculdade.id_faculdade);
      loader.classList.add("lds-dual-ring");
      await this.get_semestres(faculdade.id_faculdade);
      this.graduacao = this.semestres.graduacao;
      this.especializacao = this.semestres.especializacao;
      loader.classList.remove("lds-dual-ring");

      //avança a tour
      if (this.tour.isActive()) {
        this.tour.show(3);
      }
      //avança a tour
    },
    botaoSemestreEvent(id_faculdade) {
      //avança a tour
      if (this.tour.isActive()) {
        this.tour.next();
      }
      //avança a tour
      let el = document.getElementById("faculdade-" + id_faculdade);
      el.classList.add("faculdade-container-ativo");
    },
    graduacaoBack(faculdade) {
      //volta a tour
      if (this.tour.isActive()) {
        this.tour.back();
      }
      //volta a tour
      let el = document.getElementById("faculdade-" + faculdade);
      el.classList.remove("faculdade-container-ativo");
    },
    semestreEvent(semestre) {
      this.objToStore = this.$LS.get();
      this.objToStore.session.semestre = semestre;
      this.objToStore.session.semestre.descri_semestre = this.objToStore.session.semestre.descri_semestre.toUpperCase();
      this.$LS.set(this.objToStore);
      //termina a tour
      if (this.tour.isActive()) {
        this.set_tourVaiContinuar(true);
        this.tourCompleta();
      }
      //termina a tour
      this.$router.push({
        name: "listas",
        params: { id_semestre: semestre.id_semestre },
      });
    },
    removeBlock() {
      //volta a tour
      if (this.tour.isActive()) {
        this.tour.show(2);
      }
      //volta a tour
      let els = document.getElementsByClassName("faculdade-container");
      for (let element of els) {
        element.classList.add("background-transition");
        element.classList.remove("faculdade-container-clicado");
        element.classList.remove("faculdade-container-ativo");
      }
      document
        .getElementById("container-faculdades")
        .classList.remove("greyOut");
      document
        .getElementsByClassName("overlay")[0]
        .classList.remove("overlayLigado");
      setTimeout(function () {
        document.getElementsByClassName("overlay")[0].classList.remove("block");
      }, 200);
    },
    getURL(img) {
      return require("../assets/" + img);
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
    fecharCookies() {
      this.objToStore = this.$LS.get();
      document.getElementById("cookies-span").style.display = "none";
      document.getElementById("cookies-aviso").style.height = "0px";
      document.getElementById("botao-cookie").style.display = "none";
      document.getElementById("cookies-aviso").style.borderTop =
        "0px solid #94e6f7";
      this.objToStore.shared.cookies = true;
      this.$LS.set(this.objToStore);
    },
    showAjuda() {
      if (!this.tour.isActive() && this.ajudaVisible) {
        setTimeout(function () {
          document
            .getElementById("ajuda-container")
            .classList.remove("ajuda-container-clicked");
        }, 500);
      }
    },
    hideAjuda() {
      if (this.ajudaVisible) {
        document
          .getElementById("ajuda-container")
          .classList.add("ajuda-container-clicked");
      }
    },
    closeAjuda() {
      this.objToStore = this.$LS.get();
      this.objToStore.shared.ajudaVisible = false;
      this.$LS.set(this.objToStore);
      this.ajudaVisible = false;
    },
    restoreAjuda() {
      this.objToStore = this.$LS.get();
      this.objToStore.shared.ajudaVisible = true;
      this.$LS.set(this.objToStore);
      this.ajudaVisible = true;
    },
    iniciarTour() {
      this.hideAjuda();

      this.search = "";

      if (this.tour.isActive()) {
        this.tourCompleta();
      }

      const pesquisarFaculdade = document.getElementById("pesquisar-faculdade");
      const containerFaculdades = document.getElementById(
        "container-faculdades"
      );

      this.tour.addStep({
        title: "VAMOS FAZER UM PEDIDO!",
        text:
          "<b>leia atentamente as instruções</b> e siga os passos para realizar seu <b>primeiro pedido!</b>",
        buttons: [
          {
            text: "Fechar Guia",
            action: this.tourCompleta,
            classes: "cancel-tour-button",
          },
          {
            text: "Avançar",
            action: this.tour.next,
          },
        ],
      });

      this.tour.addStep({
        title: "1. PASSO",
        text:
          "Pesquise pela sua <b>faculdade</b>, digite <b>pelo menos 3 letras!</b>",
        scrollTo: { behavior: "smooth", block: "center", inline: "nearest" },
        attachTo: { element: pesquisarFaculdade, on: "top" },
        modalOverlayOpeningRadius: 15,
        buttons: [
          {
            text: "Fechar Guia",
            action: this.tourCompleta,
            classes: "cancel-tour-button",
          },
        ],
        popperOptions: {
          modifiers: [{ name: "focusAfterRender", enabled: false }],
        },
      });

      this.tour.addStep({
        title: "2. PASSO",
        text: "Clique na sua <b>faculdade!</b>",
        attachTo: { element: containerFaculdades, on: "top" },
        modalOverlayOpeningRadius: 15,
        buttons: [
          {
            text: "Fechar Guia",
            action: this.tourCompleta,
            classes: "cancel-tour-button",
          },
          {
            text: "Voltar",
            action: this.tour.back,
          },
        ],
        arrow: false,
      });

      this.tour.addStep({
        title: "3. PASSO",
        text: "Escolha entre <b>Graduação</b> ou <b>especialização!</b>",
        scrollTo: false,
        attachTo: { element: containerFaculdades, on: "top" },
        modalOverlayOpeningRadius: 15,
        arrow: false,
        buttons: [
          {
            text: "Fechar Guia",
            action: this.tourCompleta,
            classes: "cancel-tour-button",
          },
        ],
      });

      this.tour.addStep({
        title: "4. PASSO",
        text:
          "Escolha seu <b>semestre</b> ou <b>especialização</b>, isto te levará para a <b>pagina de listas!</b>",
        scrollTo: false,
        attachTo: { element: containerFaculdades, on: "bottom" },
        modalOverlayOpeningRadius: 15,
        arrow: false,
        buttons: [
          {
            text: "Fechar Guia",
            action: this.tourCompleta,
            classes: "cancel-tour-button",
          },
        ],
      });

      this.tour.start();

      this.updateStepOne();
    },
    updateStepOne() {
      if (
        this.tour.isActive() &&
        this.tour.getCurrentStep().id == this.tour.steps[1].id
      ) {
        let step = this.tour.getCurrentStep();
        if (
          this.search.length >= 3 &&
          Object.keys(this.filteredFaculdades).length > 0
        ) {
          step.updateStepOptions({
            buttons: [
              {
                text: "Fechar Guia",
                action: this.tourCompleta,
                classes: "cancel-tour-button",
              },
              {
                text: "Avançar",
                action: this.stepOverlay,
              },
            ],
          });
        } else {
          step.updateStepOptions({
            buttons: [
              {
                text: "Fechar Guia",
                action: this.tourCompleta,
                classes: "cancel-tour-button",
              },
            ],
          });
        }
      }
    },
    stepOverlay() {
      this.tour.options.useModalOverlay = !this.tour.options.useModalOverlay;
      this.tour.next();
    },
    tourCompleta() {
      this.updateStepOne();
      this.tour.complete();
      if (!this.tourVaiContinuar) {
        this.showAjuda();
      }
    },
    smoothScroll(target) {
      setTimeout(function () {
        document.getElementById(target).scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }, 100);
    },
  },
};
</script>

<style scoped>
#container-faculdades {
  padding: 20px 0px;
}

.greyOut>*:not(.faculdade-container-clicado, .overlay) {
  opacity: 0.3;
  filter: grayscale();
}

.block {
  display: block !important;
}

.overlayLigado.overlay {
  opacity: 1 !important;
}

.overlay {
  transition: all 0.2s;
  opacity: 0;
  position: fixed;
  /* Sit on top of the page content */
  display: none;
  /* Hidden by default */
  width: 100%;
  /* Full width (cover the whole page) */
  height: 10000px;
  /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  /* Black background with opacity */
  z-index: 3;
  /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer;
  /* Add a pointer on hover */
}

.faculdade-container-desativada {
  opacity: 0.4;
  cursor: default;
  transition: all 0.2s, opacity 1s;
  width: 300px;
  height: 130px;
}

.faculdade-container {
  background: var(--secondary);
  border-radius: 25px;
  padding: 0px;
  transition: all 0.2s;
  width: 300px;
  height: 130px;
  cursor: pointer;
}

.faculdade-container:hover {
  transform: scale(1.1);
}

.faculdade-background {
  transition: all 0.2s;
  transform: translateY(18px);
  height: 0;
  overflow: visible;
  transition: opacity 0.3s, color 2s;
}

.faculdade-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 22px;
  border-radius: 6px;
}

.faculdade-container-clicado>.faculdade-background {
  transition: all 0.1s;
  transform: scale(0.5) translateY(18px);
}

.background-transition>.faculdade-background {
  transition: all 0.2s;
  transform: scale(1) translateY(18px);
}

.tipo-escolha {
  cursor: default;
  --bs-gutter-x: none !important;
  --bs-gutter-y: none !important;
  align-items: flex-end;
  transition: all 0.2s;
  position: absolute;
  opacity: 0;
  display: none;
  width: 100%;
  height: 100%;
}

.botao-faculdade {
  transition: all 0.2s;
  font-size: 14px;
  padding: 3px;
  border: 2px solid #00000038;
  border-radius: 25px;
  box-shadow: 0 0 1em grey;
  margin: 0px auto 2px auto;
  width: 65%;
}

.faculdade-loader {
  transition: all 0.2s;
  width: 100%;
  height: 100%;
  background: #842029;
  display: none;
}

.semestre-escolha {
  cursor: default;
  transition: all 0.2s;
  position: absolute;
  display: none;
  width: 100%;
  height: 100%;
  align-items: flex-end;
}

.semestre-escolha .input-group {
  margin: 0px auto 17px auto;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 90%;
}

.select-faculdade {
  cursor: pointer;
  font-size: 15px;
  border-color: var(--primary);
  box-shadow: 0 0 1em grey;
}

.faculdade-container-clicado {
  z-index: 999;
  transition: all 0.2s;
  transform: scale(1.1);
}

/* @media only screen and (max-width: 700px) { */
.faculdade-container-clicado>.tipo-escolha {
  display: flex;
  opacity: 1;
}

.faculdade-container-ativo.faculdade-container-clicado>.semestre-escolha {
  opacity: 1;
  display: flex;
}

.faculdade-container-ativo>.tipo-escolha {
  opacity: 1;
  display: none;
}

/* } */

/* @media only screen and (max-width: 700px) {
  .faculdade-container-clicado > .tipo-escolha  {
    display: block;
  }
} */

.lds-dual-ring~* {
  display: none !important;
}

.lds-dual-ring {
  cursor: default;
  position: initial;
  display: inline-block;
  width: 100px;
  height: 100px;
  margin-top: 13px;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 85px;
  height: 85px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid var(--primary);
  border-color: rgb(3, 237, 253) transparent rgba(0, 238, 247, 0.966) transparent;
  animation: lds-dual-ring;
  animation-duration: 1.2s;
  animation-timing-function: linear;
  animation-fill-mode: infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.botao-limpar {
  border-top-left-radius: 25px !important;
  border-bottom-left-radius: 25px !important;
  padding-left: 1.2rem;
  transition: all 0.2s;
  background-color: #f8d7da;
  color: #842029;
  border-color: #f5c2c7;
}

.botao-limpar:hover {
  cursor: pointer;
  color: #63191f;
  background-color: #e7adb2;
}

.botao-limpar:active {
  opacity: 0.5;
}

.botao-limpar~.input-pesquisa {
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}

.botao-pesquisar {
  border-top-right-radius: 25px !important;
  border-bottom-right-radius: 25px !important;
  display: none !important;
  font-size: 20px;
  transition: all 0.2s;
  background-color: #d7eff8;
  color: #207d84;
  border-color: #c2e9f5;
}

.botao-pesquisar:hover {
  cursor: pointer;
  color: #196063;
  background-color: #ade7e7;
}

.botao-pesquisar:active {
  opacity: 0.5;
}

@media screen and (max-width: 700px) {
  .botao-pesquisar {
    display: flex !important;
  }
}

#cookies-aviso {
  box-shadow: 0px -2px 20px #727272;
  color: #055160;
  background-color: #cff4fc;
  z-index: 2;
  position: fixed;
  bottom: 0px;
  height: 0px;
  width: 100%;
  transition: height 0.4s;
}

#cookies-span {
  display: none;
}

/* scrollbar */
/* !important is needed sometimes */
::-webkit-scrollbar {
  width: 12px !important;
  -webkit-border-radius: 10px !important;
  border-radius: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
  box-shadow: 0cm;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #2bbacb !important;
}

::-webkit-scrollbar-thumb:hover {
  background: #25a0ae !important;
}

::-webkit-scrollbar-thumb:active {
  background: #1e828d !important;
}

::-webkit-scrollbar-thumb:window-inactive {
  background: #2bbacb !important;
}

/* scrollbar */
.show {
  padding-right: 0px !important;
}

.zoom:hover {
  transform: scale(1.1);
}

body {
  font-family: Arial, Helvetica, sans-serif;
  overflow-x: hidden;
  overflow-y: scroll;
}

.col3 {
  flex: 0 0 auto;
  width: 25%;
}

.faculdade-indisponivel {
  opacity: 0.4;
  cursor: default !important;
}

.faculdade-btn {
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid white;
}

.faculdade-btn:hover {
  transform: scale(1.1);
  z-index: 2;
  opacity: 0.8;
  border: 1px solid #2bbacb;
  border-radius: 10px;
}

.faculdade-btn:active {
  transform: scale(0.8);
}

.botao-mobile {
  display: none;
}

.input-pesquisa {
  transition: all 0.2s;
  border-radius: 25px !important;
  padding: 10px 5px !important;
  text-align: center;
  font-size: 22px;
  border: 1px solid #00d9ff;
}

.pointer {
  cursor: pointer;
}

.avisos-desktop {
  display: block !important;
  height: 100%;
}

.avisos-mobile {
  display: none !important;
}

.painel {
  transition: box-shadow 0.2s;
  box-shadow: 0px 0px 15px #00000062;
  border-radius: 10px;
}

.painel:hover {
  box-shadow: 0px 0px 30px #00000062;
}

.painel-header {
  box-shadow: 0px 0px 10px 2px #00000062;
  padding: 4px 8px;
  background-color: var(--primary);
  color: var(--secondary);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.cookie-button {
  padding: 4px;
  font-size: 1rem;
  display: none;
}

.cookie-button:focus {
  color: #fff;
  background-color: #138496;
  border-color: #117a8b;
  box-shadow: 0px 0px 0px 0rem rgb(187 228 233 / 0);
}

@media only screen and (max-device-width: 760px) {
  .cookie-button {
    padding: 4px 2px;
    font-size: 0.6rem;
  }

  .mobile-text {
    font-size: 11px;
  }

  .avisos-desktop {
    display: none !important;
  }

  .avisos-mobile {
    display: block !important;
  }

  .botao-mobile {
    display: block;
  }

  .col3 {
    flex: 0 0 auto;
    width: 100%;
  }

  .input-pesquisa {
    border-top-right-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
    font-size: 16px;
  }

  .botao-limpar {
    font-size: 14px;
    padding-left: 1rem;
  }
}

.saldao-container {
  box-shadow: 0px 0px 20px #00000062;
  border-radius: 10px;
  transition: box-shadow 0.2s;
}

.saldao-container:hover {
  box-shadow: 0px 0px 30px #00000062;
}

.saldao-image {
  height: 180px;
  max-width: 100%;
  object-fit: contain;
}

/* Ajustes para dispositivos móveis */
@media only screen and (max-device-width: 760px) {
  .saldao-container {
    padding: 15px 10px !important;
    margin: 15px auto !important;
  }
  
  .saldao-image {
    height: 120px !important;
    width: auto;
  }
}

@media only screen and (max-device-width: 480px) {
  .saldao-container {
    padding: 10px 5px !important;
    margin: 10px auto !important;
  }
  
  .saldao-image {
    height: 100px !important;
    width: auto;
  }
}
</style>
