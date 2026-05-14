<template>
  <div class="container my-4 py-2 ; painel">
    <div style="background-color: #2bbacb; color: white" class="painel">
      <h2 class="p-2">POLÍTICA COMERCIAL</h2>
    </div>
    <img class="img-fluid" :src="require('../assets/CONFERENCIA.jpg')" alt="politica conferencia solident">
    <img class="img-fluid" :src="require('../assets/TROCA.jpg')" alt="politica troca solident">
    <!-- <div class="text-margin">
      <p style="font-size: 21px; color: black" class="text-center ; mx-1">
        <Tag><h2>Conferência de Materiais</h2></Tag>
      </p>
      <div class="container d-flex align-items-center justify-content-center">
        <div style="max-width: 400px;">
          <p
            style="margin: 0;
        text-indent: 2rem;
        text-align: justify;"
          >
            Todos os pedidos solicitados à Dental Solident passam por cuidadoso
            processo de separação e conferência via código de barras, usando um
            rigoroso processo informatizado que permite ter a garantia do item
            enviado.
          </p>
          <p
            style="margin: 0;
        text-indent: 2rem;
        text-align: justify;"
          >
            Caso o cliente, após receber seus materiais, note a falta de algum
            item, ele tem o prazo de <u style="color:red">7 (sete) dias corridos</u> para entrar
            em contato com o Setor Pós-Vendas, por meio da opção Pós-Venda do
            menu principal.
          </p>
          <p
            style="margin: 0;
        text-indent: 2rem;
        text-align: justify;
        color:red"
          >
            Após esse prazo não são aceitas reclmações.
          </p>
        </div>
      </div>
    </div>
    <div class="text-margin">
      <p style="font-size: 21px; color: black" class="text-center ; mx-1">
        <Tag><h2>Trocas e Devoluções</h2></Tag>
      </p>
      <div class="container d-flex align-items-center justify-content-center">
        <div style="max-width: 400px;">
          <p
            style="margin: 0;
        text-indent: 2rem;
        text-align: justify;"
          >
            Após a entrega do pedido, os clientes da Dental Solident tem até <u style="color:red">10 (dez) dias corridos</u>
            para solicitar alguma Troca ou Devolução de mercadoria. Troca e devoluções só são
            aceitas com os produtos na embalagem original lacrada.
          </p>
          <p
            style="margin: 0;
        text-indent: 2rem;
        text-align: justify;"
          >
            Para comunicar troca ou devolução acessar o link do setor de Pós-Vendas, clicando
            na opção Pós-Venda do menu principal.
          </p>
          <p
            style="margin: 0;
        text-indent: 2rem;
        text-align: justify;
        color:red"
          >
            Após esse prazo não são aceitas reclmações.
          </p>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
// import Tag from "primevue/tag";
export default {
  // components: {
  //   Tag,
  // },
  data: () => ({}),
  created() {},
  mounted() {},
  computed: {},
  methods: {},
};
</script>

<style scoped>
.painel {
  transition: all 0.3s ease;
  box-shadow: 0px 4px 12px rgba(26, 127, 139, 0.12);
  border-radius: 15px;
  background: linear-gradient(135deg, #ffffff 0%, #f5f9fa 100%);
}
.painel:hover {
  box-shadow: 0px 8px 20px rgba(26, 127, 139, 0.2);
  transform: translateY(-2px);
}
.painel-header {
  padding: 16px 12px;
  background: linear-gradient(135deg, #1a7f8b 0%, #2bbacb 100%);
  color: white;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.text-margin {
  margin-left: 40px;
  margin-right: 40px;
}
.pergunta {
  margin-left: 10px;
  margin-top: 20px;
  display: inline-block;
  color: #1a3a40;
  font-weight: 600;
  letter-spacing: 0.3px;
}
.resposta {
  margin: 10px;
  display: inline-block;
  color: #555555;
  line-height: 1.6;
}
@media only screen and (max-device-width: 600px) {
  .text-margin {
    margin-left: 20px;
    margin-right: 20px;
  }
  .pergunta {
    font-size: 18px;
  }
  .resposta {
    font-size: 18px;
  }
}
</style>
