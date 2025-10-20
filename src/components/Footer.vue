<template>
  <div
    class="container ; text-mobile"
    style="border-top-style: solid; border-width: 1px; border-color: LightGrey; margin: 20px auto; padding: 5vh 0px 85px"
  >
    <div class="m-2">
      A Dental Solident reserva-se o direito de alterar os preços e condições
      sem aviso prévio. <br />
      Listas elaboradas conforme solicitação de academicos das respectivas
      faculdades. <br />
      Todos o pedidos efetuados estão sujeitos à confirmação da disponibilidade
      de produto em nosso estoque. <br />
    </div>
    <div class="mb-2">
      <i
        onclick="window.open('https://www.facebook.com/dentalsolident14/','facebook');"
        style="font-size: 45px"
        class="fab fa-facebook-square m-2 redes-sociais"
      ></i>
      <i
        onclick="window.open('https://www.instagram.com/dental.solident/','instagram');"
        style="font-size: 45px"
        class="fab fa-instagram m-2 redes-sociais"
      ></i>
      <i
        onclick="window.open('https://www.youtube.com/channel/UCP0ygOu5qey2YktN_zzyuZg','youtube');"
        style="font-size: 45px"
        class="fab fa-youtube m-2 redes-sociais"
      ></i>
    </div>
    <div class="mb-2">
      CNPJ: 58.362.674/0001-16 <br>
      Rua Turiassu, 681 - Perdizes - São Paulo - SP <br>
      contato@academicosolident.com.br <br>
      (11) 2574-7951 <br>
      Copyright © DentalSolident. Todos Direitos Reservados.
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({}),
  created() {},
  mounted() {},
  computed: {},
  methods: {},
};
</script>

<style scoped>
.redes-sociais {
  transition: all 0.2s;
  color: black;
  cursor: pointer;
}
.redes-sociais:hover {
  transform: scale(1.2);
  color: var(--primary);
}
.redes-sociais:active {
  color: var(--primary);
  opacity: 0.7;
}
.app-stores {
  cursor: pointer;
}
.app-stores:hover {
  opacity: 0.8;
}
.app-stores:active {
  opacity: 1;
}
@media only screen and (max-device-width: 600px) {
  .text-mobile {
    font-size: 12px;
  }
}
</style>
