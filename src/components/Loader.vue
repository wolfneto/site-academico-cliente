<template>
  <div class="loader-backdrop">
    <div class="lds-dual-ring"></div>
    <div style="position: absolute; color:white" v-if="show_slow">
      <h2>Parece que o processamento do seu pagamento está demorando mais que o normal, aguarde!</h2>
      <h3>Caso você não receba a confirmação do pagamento, não tente realiza-lo novamente!</h3>
      <h3>Entre em contato conosco, informando CPF e Número do Pedido.</h3>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data: () => ({}),
  created() {},
  computed: {
    ...mapState({
      show_slow: (state) => state.show_slow,
    }),
  },
  methods: {
    ...mapActions([""]),
    ...mapMutations([]),
  },
};
</script>

<style scoped>
.loader-backdrop {
  justify-content: center !important;
  transition: all 0.2s;
  align-items: center;
  margin: auto;
  z-index: 1051;
  position: fixed; /* Sit on top of the page content */
  display: flex;
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
}
.lds-dual-ring {
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
  border: 6px solid rgb(2, 238, 255);
  border-color: rgb(3, 237, 253) transparent rgba(0, 238, 247, 0.966)
    transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
