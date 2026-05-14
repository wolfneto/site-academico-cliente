<template>
  <div class="container my-4 py-2 ; painel">
    <div style="background-color: #2bbacb; color: white" class="painel">
      <h2 class="p-2">DÚVIDAS FREQUENTES!</h2>
    </div>
    <div class="text-margin">
      <p style="font-size: 21px; color: black" class="text-left ; mx-1">
        <span class="pergunta ;"> 1. Como se Cadastrar?</span><br />

        <span class="resposta"
          >O estudante deve acessar o site, e na pagina de cadastro seguir com
          todos os dados necessários pessoais e acadêmicos.</span
        >
        <br />

        <span class="pergunta"> 2. Quem pode se cadastrar?</span> <br />

        <span class="resposta"
          >Estudantes de odontologia das faculdades conveniadas de todo o
          Brasil.</span
        >
        <br />

        <span class="pergunta">
          3. Tenho como saber se a lista da minha faculdade já está
          cadastrada?</span
        >
        <br />

        <span class="resposta"
          >Sim, escolha a faculdade na pagina inicial, em seguida selecione o
          semestre, as listas disponíveis estarão visíveis na pagina
          seguinte.</span
        >
        <br />

        <span class="pergunta">
          4. O pedido da lista de matérias pode ser feito a qualquer
          momento?</span
        >
        <br />

        <span class="resposta"
          >Sim, enquanto a lista de materiais estiver disponível no site, é
          possível realizar o pedido. </span
        ><br />

        <span class="pergunta"> 5. Como é feita a confirmação do pedido?</span>
        <br />

        <span class="resposta"
          >A Solident entrará em contato através do telefone cadastrado para que
          a venda seja concluída. </span
        ><br />

        <span class="pergunta"> 6. Como é feita a entrega do pedido?</span>
        <br />

        <span class="resposta"
          >Para maiores informações consulte seu representante.</span
        >
        <br />

        <span class="pergunta">
          7. Com quem devo falar em caso de dúvidas? </span
        ><br />

        <span class="resposta"
          >O estudante poderá entrar em contato através da área Meus
          Pedidos.</span
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
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
