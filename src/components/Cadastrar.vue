<template>
  <Loader v-show="loading"> </Loader>
  <div>
    <div id="painel-cadastrar" class="painel">
      <header class="painel-header" style="background-color: #4caf50">
        <h2 class="pt-2">CADASTRO</h2>
      </header>
      <div class="painel-body">
        <h3>Dados Pessoais!</h3>
        <div class="demarcador-area ; mobile-text">
          <form action="">
            <div class="row">
              <div v-if="objToStore.session.carrinho.faculdade.id_faculdade == 13 && objToStore.session.carrinho.semestre.id_semestre == 214" class="col-12 mt-2 mb-2">
                <span style="font-weight: bold">SOU ALUNO ESTRANGEIRO</span>
                <input
                    v-model="cadastro.estrangeiro"
                    class="form-check-input ml-2"
                    type="checkbox"
                  />
              </div>
              <div class="col-6">
                <p class="text-left" style="font-weight: bold">CPF: *</p>
                <div class="input-group mb-3">
                  <input
                    :disabled="cadastro.estrangeiro"
                    :class="v$.cadastro.cpf.$error ? 'invalid-input' : ''"
                    @blur="
                      validarCPF(cadastro.cpf);
                      v$.cadastro.cpf.$touch();
                    "
                    v-model="cadastro.cpf"
                    @keyup="validarCPF(cadastro.cpf)"
                    v-mask="'###.###.###-##'"
                    id="cpf-campo"
                    type="tel"
                    class="form-control"
                    placeholder="Só números!"
                    aria-label="CPF"
                    autocomplete="CPF"
                  />
                </div>
              </div>
              <div class="col-6">
                <p class="text-left" style="font-weight: bold">Nascimento *:</p>
                <div class="input-group mb-3">
                  <input
                    :class="
                      v$.cadastro.nascimento.$error ? 'invalid-input' : ''
                    "
                    @blur="v$.cadastro.nascimento.$touch"
                    v-model="cadastro.nascimento"
                    v-mask="'##/##/####'"
                    id="nascimento-campo"
                    type="tel"
                    class="form-control"
                    placeholder="00/00/0000"
                    autocomplete="none"
                  />
                </div>
              </div>
              <div class="col6pc-12mobile">
                <p class="text-left" style="font-weight: bold">Nome: *</p>
                <div class="input-group mb-3">
                  <input
                    :class="v$.cadastro.nome.$error ? 'invalid-input' : ''"
                    @blur="v$.cadastro.nome.$touch"
                    v-model="cadastro.nome"
                    id="nome-campo"
                    type="text"
                    class="form-control"
                    placeholder="Seu nome!"
                    aria-label="Nome"
                    autocomplete="name"
                  />
                </div>
              </div>
              <div class="col6pc-12mobile">
                <p class="text-left" style="font-weight: bold">Sobrenome: *</p>
                <div class="input-group mb-3">
                  <input
                    :class="v$.cadastro.sobrenome.$error ? 'invalid-input' : ''"
                    @blur="v$.cadastro.sobrenome.$touch"
                    v-model="cadastro.sobrenome"
                    autocomplete="additional-name"
                    id="sobrenome-campo"
                    type="text"
                    class="form-control"
                    placeholder="Seu sobrenome!"
                    aria-label="Sobrenome"
                  />
                </div>
              </div>

              <div class="col6pc-12mobile">
                <p class="text-left ; col" style="font-weight: bold">
                  Senha: *
                </p>
                <div class="input-group mb-3">
                  <Password
                    :class="v$.cadastro.senha.$error ? 'invalid-input' : ''"
                    @blur="
                      v$.confirmaSenha.$touch();
                      v$.cadastro.senha.$touch();
                    "
                    id="senha-campo"
                    promptLabel="Insira uma senha"
                    weakLabel="Fraca"
                    mediumLabel="Normal"
                    strongLabel="Forte"
                    class="form-control"
                    placeholder="Sua senha!"
                    v-model="cadastro.senha"
                    toggleMask
                    autocomplete="none"
                  ></Password>
                  <!-- <input

                    v-model="cadastro.senha"
                    autocomplete="new-password"
                    type="password"
                    class="form-control"
                    placeholder="Sua senha!"
                    aria-label="Senha"
                  /> -->
                </div>
              </div>
              <div class="col6pc-12mobile">
                <p class="text-left ; col" style="font-weight: bold">
                  Confirme a senha: *
                </p>
                <div class="input-group mb-3">
                  <Password
                    :class="v$.confirmaSenha.$error ? 'invalid-input' : ''"
                    @blur="
                      v$.confirmaSenha.$touch();
                      v$.cadastro.senha.$touch();
                    "
                    id="confirmaSenha-campo"
                    promptLabel="Insira uma senha"
                    autocomplete="none"
                    weakLabel="Fraca"
                    mediumLabel="Normal"
                    strongLabel="Forte"
                    class="form-control"
                    placeholder="Confirme a senha!"
                    v-model="confirmaSenha"
                    toggleMask
                  ></Password>
                </div>
              </div>
              <div
                style="color: red"
                v-if="v$.confirmaSenha.$error"
                class="col-12"
              >
                Senhas não conferem ou não tem o minimo de 4 caracteres.
              </div>
              <div class="col-12">
                <p class="text-left" style="font-weight: bold">E-mail: *</p>
                <div class="input-group mb-3">
                  <input
                    :class="v$.cadastro.email.$error ? 'invalid-input' : ''"
                    @blur="v$.cadastro.email.$touch"
                    v-model="cadastro.email"
                    id="email-campo"
                    type="text"
                    class="form-control"
                    placeholder="Seu endereço de email!"
                    aria-label="Username"
                    autocomplete="email"
                  />
                </div>
              </div>
              <div class="col-6">
                <p class="text-left" style="font-weight: bold">Celular: *</p>
                <div class="input-group mb-3">
                  <input
                    :class="v$.cadastro.celular.$error ? 'invalid-input' : ''"
                    @blur="v$.cadastro.celular.$touch"
                    v-mask="'## #####-####'"
                    v-model="cadastro.celular"
                    id="celular-campo"
                    type="tel"
                    class="form-control"
                    placeholder="Só números!"
                    autocomplete="tel"
                  />
                </div>
              </div>
              <div class="col-6">
                <p class="text-left" style="font-weight: bold">Telefone *:</p>
                <div class="input-group mb-3">
                  <input
                    :class="v$.cadastro.telefone.$error ? 'invalid-input' : ''"
                    @blur="v$.cadastro.telefone.$touch"
                    v-mask="'## ####-####'"
                    v-model="cadastro.telefone"
                    id="telefone-campo"
                    type="tel"
                    class="form-control"
                    placeholder="Só números!"
                    autocomplete="tel"
                  />
                </div>
              </div>
              <div class="col-6">
                <p class="text-left" style="font-weight: bold">CEP: *</p>
                <div class="input-group mb-3">
                  <input
                    :class="v$.cadastro.cep.$error ? 'invalid-input' : ''"
                    @keyup="getCep(cadastro.cep, cadastro, 'numero-campo')"
                    @blur="
                      getCep(cadastro.cep, cadastro, 'numero-campo');
                      v$.cadastro.cep.$touch();
                    "
                    maxlength="9"
                    v-mask="'#####-###'"
                    v-model="cadastro.cep"
                    id="cep-campo"
                    type="tel"
                    class="form-control"
                    placeholder="Só números!"
                    aria-label="CEP"
                    autocomplete="none"
                  />
                </div>
              </div>
              <div class="col-6"></div>
              <div class="col-12">
                <p class="text-left" style="font-weight: bold">Endereço: *</p>
                <div class="input-group mb-3">
                  <input
                    :class="v$.cadastro.endereco.$error ? 'invalid-input' : ''"
                    @blur="v$.cadastro.endereco.$touch"
                    @change="lastCep = ''"
                    v-model="cadastro.endereco"
                    id="endereco-campo"
                    type="text"
                    class="form-control"
                    placeholder="Rua, Av, Travessa, Estrada, Rodovia, Etc..."
                    aria-label="endereço"
                    autocomplete="street-address"
                  />
                </div>
              </div>
              <div class="col-3">
                <p class="text-left" style="font-weight: bold">Número: *</p>
                <div class="input-group mb-3">
                  <input
                    :class="v$.cadastro.numero.$error ? 'invalid-input' : ''"
                    @blur="v$.cadastro.numero.$touch"
                    v-model="cadastro.numero"
                    id="numero-campo"
                    placeholder="Número"
                    type="number"
                    class="form-control"
                    autocomplete="none"
                  />
                </div>
              </div>

              <div class="col-9">
                <p class="text-left" style="font-weight: bold">Complemento:</p>
                <div class="input-group mb-3">
                  <input
                    v-model="cadastro.complemento"
                    id="complemento-campo"
                    type="text"
                    class="form-control"
                    placeholder="apto 12b, casa 2, Etc...!"
                    autocomplete="none"
                  />
                </div>
              </div>
              <div class="col-12">
                <p class="text-left" style="font-weight: bold">Bairro: *</p>
                <div class="input-group mb-3">
                  <input
                    :class="v$.cadastro.bairro.$error ? 'invalid-input' : ''"
                    @blur="v$.cadastro.bairro.$touch"
                    @change="lastCep = ''"
                    v-model="cadastro.bairro"
                    id="bairro-campo"
                    type="text"
                    class="form-control"
                    placeholder="Seu Bairro!"
                    autocomplete="none"
                  />
                </div>
              </div>
              <div class="col-8">
                <p class="text-left" style="font-weight: bold">Cidade: *</p>
                <div class="input-group mb-3">
                  <input
                    readonly
                    :class="v$.cadastro.cidade.$error ? 'invalid-input' : ''"
                    @blur="v$.cadastro.cidade.$touch"
                    v-model="cadastro.cidade"
                    id="cidade-campo"
                    type="text"
                    class="form-control"
                    placeholder="Preencha o CEP!"
                    autocomplete="none"
                  />
                </div>
              </div>
              <div class="col-4">
                <p class="text-left" style="font-weight: bold">Estado: *</p>
                <div class="input-group mb-3">
                  <input
                    readonly
                    :class="v$.cadastro.estado.$error ? 'invalid-input' : ''"
                    @blur="v$.cadastro.estado.$touch"
                    v-model="cadastro.estado"
                    id="estado-campo"
                    type="text"
                    class="form-control"
                    placeholder="Preencha o CEP"
                    autocomplete="none"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <h3>Dados Acadêmicos!</h3>
        <div class="demarcador-area ; mobile-text">
          <div class="row">
            <div class="col-12">
              <p class="text-left" style="font-weight: bold">Periodo: *</p>
              <select
                id="periodo-campo"
                :class="v$.cadastro.periodo.$error ? 'invalid-input' : ''"
                @blur="v$.cadastro.periodo.$touch"
                @change="getRepresentantes()"
                v-model="cadastro.periodo"
                class="form-select ; mb-3"
              >
                <option selected disabled :value="null">Selecione...</option>
                <option
                  v-for="periodo of paginaDeKits
                    ? $parent.selectedSemestre.periodos
                    : objToStore.session.carrinho.semestre.periodos"
                  :key="periodo.id_periodo"
                  :value="periodo"
                >
                  {{ periodo.nome_periodo }}
                </option>
              </select>
            </div>
            <div class="col-12">
              <p class="text-left" style="font-weight: bold">
                Representante: *
              </p>
              <select
                id="contato-campo"
                :class="v$.cadastro.contato.$error ? 'invalid-input' : ''"
                @blur="v$.cadastro.contato.$touch"
                v-model="cadastro.contato"
                :disabled="cadastro.periodo == null"
                class="form-select ; mb-3"
              >
                <option
                  selected
                  disabled
                  v-if="cadastro.periodo == null"
                  :value="null"
                >
                  Selecione um periodo.
                </option>
                <option selected disabled v-else :value="null">
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
            <div class="col-12">
              <p class="text-left" style="font-weight: bold">
                R.A / Nº da Matricula:
              </p>
              <div class="input-group mb-3">
                <input
                  v-model="cadastro.ra"
                  id="ra-campo"
                  type="text"
                  class="form-control"
                  placeholder="Seu R.A!"
                  autocomplete="none"
                />
              </div>
            </div>
            <div class="col-12">
              <button
                :disabled="disable_btn_concluir"
                @click="validForm()"
                style="background-color: #4caf50"
                type="button"
                class="btn btn-success"
              >
                Ir para o pagamento!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Dialog
    style="max-width: 500px"
    modal
    closeOnEscape
    dismissableMask
    :closable="true"
    v-model:visible="modalCPFexistente"
  >
    <template #header>
      <h3 class="mr-2 mb-0">Atenção!</h3>
    </template>

    <span style="font-size: 17px; padding: 10px 1px"
      >O CPF <span style="color: red">{{ cpfOnHold }}</span> já possui cadastro
      em nosso site. <br />
      caso tenha esquecido sua senha, clique no botão abaixo.</span
    >
    <br />
    <div v-if="senhaRecover.show" class="col-12">
      <div
        class="alert alert-success fade show text-left mb-0 mx-2"
        role="alert"
        style="font-size: 14px"
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
            >, um email de alteração de senha foi enviado para o e-mail:
            <span style="font-weight: bold"> {{ senhaRecover.email }}</span
            >. <br />
            Se você não recebeu, olhe sua caixa de spam.
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="d-flex justify-content-between">
        <button
          @click="modalCPFexistente = false"
          type="button"
          class="btn btn-info"
        >
          Fechar
        </button>
        <button
          @click="recuperarSenha()"
          type="button"
          class="btn btn-outline-danger ; mobile ; m-3"
        >
          <span class="mobile-text"> Esqueceu sua senha? </span>
        </button>
      </div>
    </template>
  </Dialog>
</template>

<script>
const noNumbers = (value) => !value.match(/[0-9]/);
import useVuelidate from "@vuelidate/core";
import { required, minLength, sameAs, requiredIf } from "@vuelidate/validators";
import { mapState, mapMutations, mapActions } from "vuex";
import Loader from "./Loader";
import Dialog from "primevue/dialog";
import Password from "primevue/password";
export default {
  components: {
    Loader,
    Dialog,
    Password,
  },
  data: () => ({
    v$: useVuelidate(),
    paginaDeKits: false,
    modalCPFexistente: false,
    cadastro: {
      estrangeiro: false,
      cpf: "",
      nascimento: "",
      nome: "",
      sobrenome: "",
      senha: "",
      email: "",
      celular: "",
      telefone: "",
      cep: "",
      endereco: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      estado: "",
      periodo: null,
      contato: null,
      ra: "",
    },
    confirmaSenha: "",
    getCepCooldown: false,
    lastCep: "",
    cpfOnHold: "",
    loading: false,
    objToStore: { session: {}, shared: {} },
    senhaRecover: { show: false, nome: "", email: "" },
  }),
  validations() {
    return {
      cadastro: {
        cpf: { required: requiredIf(!this.cadastro.estrangeiro), minLength: minLength(14) },
        nascimento: { required, minLength: minLength(10) },
        nome: { required, minLength: minLength(2), noNumbers },
        sobrenome: { required, minLength: minLength(2), noNumbers },
        senha: {
          required,
          minLength: minLength(4),
          sameAs: sameAs(this.confirmaSenha),
        },
        email: { required },
        celular: { required, minLength: minLength(13) },
        telefone: { required, minLength: minLength(12) },
        cep: { required, minLength: minLength(9) },
        endereco: { required },
        numero: { required },
        bairro: { required },
        cidade: { required },
        estado: { required },
        periodo: { required },
        contato: { required },
      },
      confirmaSenha: {
        required,
        minLength: minLength(4),
        sameAs: sameAs(this.cadastro.senha),
      },
    };
  },
  async created() {
    this.loading = true;
    if (this.$parent.allowNotlogged) {
      this.paginaDeKits = true;
    }
    await this.getSession();
    this.loading = false;
  },
  computed: {
    ...mapState({
      aluno: (state) => state.aluno,
      pedido: (state) => state.pedido,
      estrangeiro: (state) => state.estrangeiro,
      emailSenha: (state) => state.emailSenha,
      id_pedido: (state) => state.id_pedido,
      representantes: (state) => state.representantes,
      cpfRepetido: (state) => state.cpfRepetido,
      disable_btn_concluir: (state) => state.disable_btn_concluir,
    }),
  },
  methods: {
    ...mapActions([
      "get_login",
      "get_usuario",
      "salvar_pedido",
      "email_senha",
      "get_representantes",
      "checar_cpf",
    ]),
    ...mapMutations([
      "set_snackbar",
      "set_pedido",
      "set_emailSenha",
      "set_refreshHeader",
    ]),
    validForm() {
      this.v$.$validate();
      this.v$.$touch();
      if (this.v$.$error) {
        let campoid = this.v$.$errors[0].$property + "-campo";
        let nome_campo =
          "o campo " + this.v$.$errors[0].$property.toUpperCase();
        let razao = "";
        if (this.v$.$errors[0].$property == "endereco") {
          nome_campo = "o campo ENDEREÇO ";
        }
        if (this.v$.$errors[0].$property == "numero") {
          nome_campo = "o campo NÚMERO ";
        }
        if (this.v$.$errors[0].$property == "contato") {
          nome_campo = "o campo REPRESENTANTE ";
        }
        switch (this.v$.$errors[0].$validator) {
          case "required":
            razao = "é obrigatório.";
            break;
          case "minLength":
            razao =
              "deve ter pelo menos " +
              this.v$.$errors[0].$params.min +
              " caracteres.";
            break;
          case "sameAs":
            nome_campo = "os campos SENHA e CONFIRME SUA SENHA";
            razao = "não conferem.";
            break;
          case "noNumbers":
            razao = "não permite números";
            break;
          // case "email":
          //   nome_campo = "O e-mail inserido ";
          //   razao = "não é um e-mail válido.";
          //   break;
          default:
            nome_campo = "";
            razao = "campos marcados com * são obrigatorios.";
            break;
        }
        this.smoothScroll(campoid);
        this.set_snackbar({
          show: true,
          severity: "warn",
          summary: "Aviso!",
          detail: nome_campo + " " + razao,
          life: 5000,
        });
      } else {
        this.concluir();
      }
    },
    async getSession() {
      this.objToStore = this.$LS.get();
      if (!this.paginaDeKits && this.objToStore.session.carrinho.lenght < 1) {
        await this.$router.push({ name: "inicio" });
      }
    },
    async concluir() {
      this.loading = true;
      let carrinho = this.objToStore.session.carrinho;

      if (this.paginaDeKits) {
        carrinho = {
          kit: this.$parent.selectedKit,
          faculdade: this.$parent.selectedFaculdade,
          semestre: this.$parent.selectedSemestre,
        };
      }

      this.set_pedido({
        doCadastro: true,
        aluno: this.cadastro,
        carrinho: carrinho,
        kit: this.paginaDeKits,
      });

      await this.salvar_pedido(this.pedido);

      if(this.estrangeiro.is) {
        this.cadastro.cpf = this.estrangeiro.cpf
      }

      //faz o login, mas somente retorna o cookie
      await this.get_login({
        cpf: this.cadastro.cpf,
        senha: this.cadastro.senha,
      });

      // com o cookie setado busca os dados do aluno
      await this.get_usuario();

      // QUE MERDA E ESSA?
      // this.aluno.aluno.periodo = this.cadastro.periodo.id_periodo.toString();
      // this.aluno.aluno.contato = this.cadastro.contato.id_representante.toString();
      this.objToStore.session.aluno = this.aluno;

      this.objToStore.session.pedido = {
        numeroPedido: this.id_pedido,
        semestre: this.objToStore.session.carrinho.semestre,
        periodo: this.cadastro.periodo,
        contato: this.cadastro.contato,
      };

      this.$LS.set(this.objToStore);
      this.set_refreshHeader(true);

      this.$router.push({
        name: "SeusDados",
        params: { numeroPedido: this.id_pedido },
      });
      this.loading = false;
    },
    async validarCPF(cpf) {
      if (cpf.length >= 14) {
        if (typeof cpf !== "string") return this.CPFinvalido();
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
          return this.CPFinvalido();
        }
        let soma = 0;
        let resto;
        for (let i = 1; i <= 9; i++)
          soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto == 10 || resto == 11) resto = 0;
        if (resto != parseInt(cpf.substring(9, 10))) return this.CPFinvalido();
        soma = 0;
        for (let i = 1; i <= 10; i++)
          soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto == 10 || resto == 11) resto = 0;
        if (resto != parseInt(cpf.substring(10, 11))) return this.CPFinvalido();
        this.loading = true;
        await this.checar_cpf(this.cadastro.cpf);
        if (this.cpfRepetido) {
          this.cpfOnHold = this.cadastro.cpf;
          this.cadastro.cpf = "";
          this.modalCPFexistente = true;
        }
        this.loading = false;
      }
    },
    async getRepresentantes() {
      this.loading = true;
      this.cadastro.contato = null;
      await this.get_representantes({
        id_semestre: this.paginaDeKits
          ? this.$parent.selectedSemestre.id_semestre
          : this.objToStore.session.carrinho.semestre.id_semestre,
        id_faculdade: this.paginaDeKits
          ? this.$parent.selectedFaculdade.id_faculdade
          : this.objToStore.session.carrinho.faculdade.id_faculdade,
        cod_periodo: this.cadastro.periodo.cod_periodo,
      });
      this.loading = false;
    },
    async recuperarSenha() {
      this.loading = true;
      if (this.cpfOnHold.length == 14) {
        this.objToStore = this.$LS.get();
        let tempo = new Date();
        tempo = tempo.getTime();
        if (
          this.objToStore.shared.senhaRecoverCoolDown == null ||
          tempo > this.objToStore.shared.senhaRecoverCoolDown + 300000
        ) {
          await this.email_senha(this.cpfOnHold);
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
          detail: "Preencha seu CPF para recuperar sua senha.",
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
    CPFinvalido() {
      this.cadastro.cpf = "";
      this.set_snackbar({
        show: true,
        severity: "warn",
        summary: "Aviso!",
        detail: "CPF inválido, digite novamente.",
        life: 3000,
      });
    },
    async getCep(cep, destino, camponumero) {
      if (
        cep.length == 9 &&
        !this.getCepCooldown &&
        cep.replace("-", "") != this.lastCep
      ) {
        //evita que a função seja chamada  duas vezes
        //caso o usuario solte duas teclas ao mesmo tempo
        this.getCepCooldown = true;
        setTimeout(() => {
          this.getCepCooldown = false;
        }, 2000);
        //-----------------------------------------------
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
          cep = cep.replace("-", "");
          let cepRetorno = await this.$axios.get(
            "https://viacep.com.br/ws/" + cep + "/json/",
            { withCredentials: false }
          );
          if (cepRetorno.data.erro) {
            this.set_snackbar({
              show: true,
              severity: "warn",
              summary: "Aviso!",
              detail: "CEP invalido!",
              life: 2500,
            });
            destino.cep = "";
            destino.endereco = "";
            destino.bairro = "";
            destino.cidade = "";
            destino.estado = "";
            this.lastCep = "";
          } else {
            this.set_snackbar({
              show: true,
              severity: "success",
              summary: "Successo!",
              detail: "CEP Válido!",
              life: 2500,
            });
            destino.endereco = cepRetorno.data.logradouro;
            destino.bairro = cepRetorno.data.bairro;
            destino.cidade = cepRetorno.data.localidade;
            destino.estado = cepRetorno.data.uf;
            document.getElementById(camponumero).focus();
            this.lastCep = cep;
          }
        }
        this.loading = false;
      }
    },
    smoothScroll(target) {
      setTimeout(function() {
        document.getElementById(target).scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    },
  },
};
</script>

<style scoped>
.painel {
  transition: width 1s;
  transition: box-shadow 0.2s;
  margin: 15px auto 15px auto;
  box-shadow: 0px 0px 15px #00000062;
  border-radius: 10px;
}
.painel:hover {
  box-shadow: 0px 0px 30px #00000062;
}
.painel-header {
  padding: 2px;
  background-color: #2bbacb;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.painel-body {
  padding: 20px;
}
.demarcador-area {
  border-top-style: solid;
  border-width: 1px;
  border-color: lightgray;
  padding: 8px 0px 0px 0px;
}
html {
  scroll-behavior: smooth;
}
.col6pc-12mobile {
  flex: 0 0 auto;
  width: 50%;
}
.pointer {
  cursor: pointer;
}
@media only screen and (max-device-width: 780px) {
  .painel {
    width: 95%;
  }
  .col6pc-12mobile {
    flex: 0 0 auto;
    width: 100%;
  }
  .form-select {
    font-size: 0.75rem;
  }
  .form-control {
    font-size: 0.75rem;
  }
  .mobile-text {
    font-size: 0.75rem;
  }
  .btn.mobile {
    padding: 6px 2px 6px 2px;
    font-size: 0.75rem;
  }
}
</style>
