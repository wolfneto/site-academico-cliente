<template>
  <div class="container">
    <div style="margin: 1rem">
      <img
        :src="require('../assets/dentinho_construção.png')"
        alt=""
        class="dentinho"
      />

      <h1>Estamos em manutenção,</h1>
      <h3 v-if="retornoManutencao.telaPagamento">
        Não se preocupe, nenhuma cobrança foi feita.
      </h3>
      <h3>voltaremos em breve!</h3>
      <div
        style="margin-top: 1rem; font-size: 20px"
        v-if="retornoManutencao.msg_manutencao != ''"
      >
        {{ retornoManutencao.msg_manutencao }}
      </div>
    </div>

    <div class="Aviso-container">
      <b>Atenção:</b> Não estamos separando material na hora, faça o pedido pelo
      site. <br />
      <b> Horário de Funcionamento:</b> De segunda a sexta-feira das 09:00 às
      17:00. <br />
      <b>Horário de Atendimento em Loja:</b> De segunda a sexta-feira das 09:30
      às 15:00.
      <br />
      <br />
      <b style="color: red">Loja fechada para almoço: </b> das 12:00 às 13:00.
    </div>
  </div>
</template>

<script>
export default {
  props: ["retornoManutencao"],
  data: () => ({}),
  created() {},
  mounted() {},
  computed: {},
  methods: {},
};
</script>

<style scoped>
.Aviso-container {
  padding: 0.5rem;
  border-radius: 15px;
  max-width: 700px;
  margin: auto;
}
.dentinho {
  height: 270px;
}
@media only screen and (max-device-width: 700px) {
  .dentinho {
    height: 140px;
  }
}
</style>
