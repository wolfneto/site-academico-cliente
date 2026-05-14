<template>
  <div
    v-if="
      (!retornoManutencao.manutencao && rodouGetManutencao) ||
      (retornoManutencao.acessoDental && rodouGetManutencao)
    "
  >
    <div
      id="offline-overlay"
      class="d-flex align-items-center justify-content-center"
      :class="offline ? 'offline-overlay-active' : ''"
    >
      <div v-if="offline" class="overlay-text">
        <h3>Sem acesso a internet.</h3>
        <br />
        <span
          >Fique tranquilo! Assim que sua conexão voltar, poderá continuar
          navegando!</span
        >
      </div>
    </div>
    <div
      v-if="retornoManutencao.acessoDental && retornoManutencao.manutencao"
      class="manutencao-text"
    >
      <h3>Em manutenção - Acesso apenas pela rede da Dental</h3>
    </div>
    <Header />
    <router-view :key="refresh" />
    <Footer />
  </div>
  <div
    v-if="
      retornoManutencao.manutencao &&
      !retornoManutencao.acessoDental &&
      rodouGetManutencao
    "
  >
    <Manutencao :retornoManutencao="retornoManutencao" />
    <Footer />
  </div>
</template>

<script>
import Manutencao from "./components/Manutencao";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    hasFooter: true,
    refresh: 0,
    rodouGetManutencao: false,
  }),
  components: {
    Manutencao,
    Header,
    Footer,
  },
  async created() {
    this.internet_listener();
    await this.get_manutencao();
    this.rodouGetManutencao = true;
  },
  computed: {
    ...mapState({
      offline: (state) => state.offline,
      retornoManutencao: (state) => state.manutencao,
    }),
  },
  methods: {
    ...mapActions(["internet_listener", "get_manutencao"]),
  },
};
</script>

<style>
:root {
  /* paleta de cores WIP */
  --primary: #1a7f8b;
  --secondary: white;
  --success: rgb(6, 252, 6);
  --warning: #ff9800;
  --danger: #d32f2f;
  --text: #555555;
}
.btn {
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: 8px;
  transition: all 0.3s ease;
}
.form-container {
  max-width: 750px;
  margin: 0px auto;
}
.checkout-min-height {
  min-height: 502px;
}
.manutencao-text {
  background: rgb(219, 4, 4);
  padding: 20px;
  color: white;
}
@media only screen and (max-device-width: 780px) {
  .checkout-min-height {
    min-height: 100px !important;
  }
  .checkout-bottom-bar {
    border-top: 1px solid lime;
    z-index: 3;
    display: flex;
    align-items: center;
    padding: 6px 0px;
    box-shadow: 0px -5px 14px 1px #00000062;
    width: 100%;
    background: #ffffff;
    position: fixed;
    bottom: 0px;
    left: 0px;
    margin: auto;
    min-width: 100%;
  }
  .checkout-bottom-bar button {
    width: 100%;
    max-width: 200px;
    font-size: 13px;
    padding: 8px 3px !important;
    white-space: nowrap;
  }
}

.w3-text-red {
  color: #f44336;
}
.invalid-input {
  border-color: rgb(199, 0, 0) !important;
}
.p-password-input {
  max-width: 80% !important;
}
.slider-horizontal {
  height: 15px !important;
}
.slider-handle-lower {
  width: 22px !important;
  height: 22px !important;
  top: -4px !important;
  right: -11px !important;
}
.slider-tooltip {
  transform: translate(-50%) !important;
  left: 52% !important;
  bottom: 22px !important;
}
.primeiro-slider .slider-connect,
.primeiro-slider .slider-tooltip {
  background: #63d1dd !important;
  border: 1px solid #5bc0cb !important;
}
.primeiro-slider .slider-base {
  background-color: #d5d5d5 !important;
  /* #e22e2e; */
}
.segundo-slider .slider-connect,
.segundo-slider .slider-tooltip {
  background: #d5d5d5 !important;
  /* #e22e2e */
  border: 1px solid #bbbaba !important;
  /* #b62323 */
}
.segundo-slider .slider-base {
  cursor: not-allowed !important;
  background-color: #63d1dd !important;
}
.segundo-slider .slider-connect {
  cursor: not-allowed !important;
}

/* css login */
.login-icon {
  transition: all 0.2s !important;
  position: relative !important;
  z-index: 0 !important;
  border-radius: 0.25rem !important;
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  width: 2.5rem !important;
  background: var(--secondary) !important;
  border-color: var(--primary) !important;
  color: var(--text) !important;
  border-right: none !important;
}
.login .form-control {
  border-color: var(--primary) !important;
}
.login .form-control {
  border-radius: 0.25rem !important;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;

  border-left: none !important;
}
.login .form-control:focus {
  box-shadow: 4px 0 0 0.2rem rgb(101 213 225 / 45%) !important;
}
.login .form-control:focus ~ .login-icon {
  z-index: 0 !important;
  border-color: var(--primary) !important ;
  color: var(--primary) !important;
  box-shadow: -2px 0px 0 0.2rem rgb(101 213 225 / 45%) !important;
}
/* css login */
.no-close-icon .p-dialog-header-icons {
  display: none !important;
  width: 0% !important;
}
.slim-footer .p-dialog-footer {
  padding: 10px !important;
}
#offline-overlay {
  transition: all 0.5s;
  opacity: 0;
  z-index: 10000;
  position: fixed;
  height: 0%;
  width: 100%;
  background: #00000069;
  box-shadow: 0px 0px 17px 20px #00000069;
}
.offline-overlay-active {
  opacity: 1 !important;
  height: 100% !important;
}
.overlay-text {
  box-shadow: 0px 0px 17px 20px #00000080;
  background: #00000080;
  vertical-align: middle;
  text-align: center !important;
  color: white;
  font-size: 20px;
}
#app {
  font-family: "Montserrat", Helvetica, sans-serif !important;
  /* font-family: "Verdana", sans-serif !important; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@font-face {
  font-family: "Oswald";
  src: local("Oswald"),
    url(./fonts/Oswald/Oswald-VariableFont_wght.ttf) format("truetype");
}
@font-face {
  font-family: "Arvo";
  src: local("Arvo"), url(./fonts/Arvo/Arvo-Regular.ttf) format("truetype");
}
@font-face {
  font-family: "Dosis";
  src: local("Dosis"),
    url(./fonts/Dosis/Dosis-VariableFont_wght.ttf) format("truetype");
}
@font-face {
  font-family: "Montserrat";
  src: local("Montserrat"),
    url(./fonts/Montserrat/Montserrat-Regular.ttf) format("truetype");
}

.form-select:focus {
  border-color: #1a7f8b !important;
  box-shadow: 0 0 0 0.2rem rgba(26, 127, 139, 0.25) !important;
}
.form-select {
  transition: all 0.3s;
}
.form-control:focus {
  border-color: #1a7f8b;
  box-shadow: 0 0 0 0.2rem rgba(26, 127, 139, 0.25) !important;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.p-toast {
  max-width: 320px !important;
  display: flex !important;
  justify-content: center !important;
  z-index: 1052 !important;
}
.p-toast .p-toast-message {
  position: relative;
  font-size: 14px;
  margin: 0px auto 10px auto;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%),
    0 1px 10px 0 rgb(0 0 0 / 12%);
  border-radius: 3px;
  max-width: 320px;
}
.p-toast-bottom-center {
  bottom: 20px !important;
  transform: translate(-50%, 0%) !important;
  left: 50% !important;
  margin-left: auto !important;
  margin-right: auto !important;
}
.disabled-content {
  filter: grayscale() !important;
}
/* CSS RELACIONADO AO MODAL VUE PRIME */
.modal-itens-meusPedidos {
  width: 700px !important;
}
.p-dialog-header {
  background: var(--primary) !important;
  color: var(--secondary) !important;
  padding: 10px !important;
  border-top-left-radius: 15px !important;
  border-top-right-radius: 15px !important;
}
.p-dialog-header-icon:enabled:hover {
  color: var(--danger) !important;
  border-color: transparent !important;
  background: #ff92926c !important;
}
.p-dialog-header-icon {
  color: var(--danger) !important;
  font-weight: bold;
}

.p-dialog .p-dialog-content {
  padding: 10px !important;
}

.p-dialog-footer {
  padding: 10px !important;
  border-bottom-left-radius: 15px !important;
  border-bottom-right-radius: 15px !important;
}
.p-dialog-footer button {
  margin: 3px 5px !important;
}

.p-dialog {
  border-radius: 15px !important;
}
/* CSS RELACIONADO AO SHEPHERDJS */
@import "~shepherd.js/dist/css/shepherd.css";
.shepherd-button {
  width: 30% !important;
  font-size: 14px !important;
}
.cancel-tour-button {
  width: 40% !important;
}
#minimized-ajuda {
  box-shadow: 0px -3px 11px -1px #545353;
  cursor: pointer;
  transition: all 0.2s;
  position: fixed;
  bottom: 0px;
  right: 5px;
  background: var(--primary);
  color: var(--secondary);
  padding: 3px 10px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
#minimized-ajuda:hover {
  padding: 3px 10px 20px 10px;
}
#ajuda-close {
  transition: all 0.3s;
  transform: translate(8px, -91px);
  right: 0px;
  top: 0px;
  width: 32px;
  height: 32px;
  font-size: 23px;
  border-radius: 50%;
  color: var(--danger);
  position: absolute;
  z-index: 3;
}
#ajuda-close:hover {
  transform: translate(8px, -91px) scale(1.2);
}
#ajuda-close:active {
  transition: all 0.1s;
  transform: translate(8px, -91px) scale(0.8);
}
.ajuda-img {
  transition: all 0.2s;
  height: 170px;
  transform: translate(-20px, -78px);
}
#ajuda-container {
  z-index: 2;
  transition: all 0.2s;
  background-color: #1c8ea2;
  border-radius: 50%;
  cursor: pointer;
  position: fixed;
  height: 90px;
  width: 90px;
  color: var(--primary);
  bottom: 14px;
  right: 15px;
  box-shadow: 0px 0px 11px 2px rgb(0 0 0 / 72%);
}
#ajuda-container:hover {
  transform: scale(1.2);
}
@media screen and (max-width: 700px) {
  #ajuda-close {
    transform: translate(7px, -75px);
  }
  #ajuda-close:hover {
    transform: translate(7px, -75px) scale(1.2);
  }
  #ajuda-close:active {
    transition: all 0.1s;
    transform: translate(7px, -75px) scale(0.8);
  }
  #ajuda-container {
    height: 81px;
    width: 76px;
  }
  .ajuda-img {
    height: 140px;
    transform: translate(-18px, -60px);
  }
  #ajuda-container:hover {
    transform: none !important;
  }
}

.ajuda-container-clicked {
  height: 0px !important;
  cursor: default !important;
  opacity: 0 !important;
}
.ajuda-container-clicked .ajuda-img {
  height: 0px !important;
  cursor: default !important;
  opacity: 0 !important;
}
.shepherd-arrow:before {
  box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px, rgb(0 0 0 / 23%) 0px 3px 6px !important;
  background-color: var(--primary) !important;
  border: 1px solid var(--secondary) !important;
}
.shepherd-content {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
.shepherd-header {
  background-color: var(--primary) !important;
}
.shepherd-title {
  color: var(--secondary) !important;
}
.shepherd-cancel-icon {
  transition: all 0.2s, transform 0.1s !important;
  display: flex !important;
  align-items: center !important;
  color: var(--secondary) !important;
}
.shepherd-cancel-icon:hover {
  transform: scale(1.3) !important;
}
.shepherd-cancel-icon:focus {
  outline: none !important;
}
.shepherd-button {
  transition: all 0.2s, transform 0.1s !important;
  background-color: var(--primary) !important;
  color: var(--secondary) !important;
  border-radius: 15px !important;
}
.shepherd-button:hover {
  background-color: #6ddeeb !important;
  transform: scale(1.1) !important;
  color: var(--secondary) !important;
  border-radius: 15px !important;
}
.cancel-tour-button {
  transition: all 0.2s, transform 0.1s !important;
  background-color: var(--danger) !important;
  color: var(--secondary) !important;
  border-radius: 15px !important;
}
.cancel-tour-button:hover {
  opacity: 0.7 !important;
  background-color: var(--danger) !important;
  color: var(--secondary) !important;
}
.shepherd-button:active {
  transform: scale(0.9) !important;
}
.shepherd-button:focus {
  outline: none !important;
}
/* CSS RELACIONADO AO SHEPHERDJS */

/* CSS OVERLAY PANEL */
.p-overlaypanel {
  background: #063d44ad !important;
  color: var(--secondary) !important;
}
.p-overlaypanel:before {
  border-bottom-color: #063d44ad !important;
}
.p-overlaypanel:after {
  border-bottom-color: #063d44ad !important;
}
.p-overlaypanel-content {
  padding: 10px 0px !important;
}
/* CSS OVERLAY PANEL */

/* CSS SIDENAV CARRINHO */
.p-sidebar-top {
  padding: 1rem 4px !important;
  border-left: none !important;
  height: auto !important;
  overflow-y: auto;
}
.p-sidebar-right {
  padding: 0px !important;
  background: #ffffff !important;
  color: #495057 !important;
  box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%),
    0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%) !important;
  border-left: 2px solid var(--success) !important;
}
.sidenav-container {
  font-family: "Montserrat" !important;
  padding: 10px 10px !important;
  margin: auto !important;
}
.sidenav-lista-container {
  font-size: 14px !important;
  margin: 0px 6px 0px 6px !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  height: 64vh !important;
  text-align: left !important;
}
@media only screen and (max-height: 500px) {
  .sidenav-lista-container {
    height: 40vh !important;
  }
}
@media only screen and (min-height: 501px) and (max-height: 600px) {
  .sidenav-lista-container {
    height: 50vh !important;
  }
}
@media only screen and (min-height: 601px) and (max-height: 700px) {
  .sidenav-lista-container {
    height: 60vh !important;
  }
}

.sidenav-button {
  border-radius: 25px !important;
  width: 106px !important;
  text-align: center !important;
}
.sidenav-button:focus {
  box-shadow: none !important;
}
.remove-lista-btn {
  transition: all 0.2s !important;
  color: red !important;
  cursor: pointer !important;
}
.remove-lista-btn:hover {
  color: rgb(247, 48, 48) !important;
  transform: scale(1.1) !important;
}
/* CSS SIDENAV CARRINHO */

.p-carousel-item {
  margin: 0 auto !important;
}
.pi-times {
  color:red !important
}
</style>
