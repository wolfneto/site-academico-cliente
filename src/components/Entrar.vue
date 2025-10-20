<template>
  <Loader v-show="loading"></Loader>
  <div>
    <div id="painel-entrar" class="painel">
      <header class="painel-header">
        <h2 class="pt-2">ENTRAR!</h2>
      </header>
      <div class="painel-body">
        <form action="">
          <div class="row">
            <div class="col-12">
              <p class="text-left" style="font-weight: bold">CPF:</p>
              <div class="input-group mb-3">
                <input
                  autocomplete="CPF"
                  v-mask="'###.###.###-##'"
                  maxlength="14"
                  v-model="login.cpf"
                  type="tel"
                  class="form-control"
                  placeholder="Apenas números!"
                  aria-label="CPF"
                />
              </div>
            </div>
            <div class="col-7">
              <p class="text-left ; col" style="font-weight: bold">Senha:</p>
              <div class="input-group mb-3">
                <input
                  @keyup="senhaValida()"
                  v-model="login.senha"
                  type="password"
                  class="form-control"
                  placeholder="digite sua senha!"
                  aria-label="Senha"
                  autocomplete="current-password"
                />
              </div>
            </div>
            <div
              class="col-5 ; d-flex align-items-end justify-content-center pb-3"
            >
              <button
                @click="recuperarSenha()"
                type="button"
                style="width: 100%"
                tabindex="-1"
                class="btn btn-outline-danger ; mobile"
              >
                <span class="mobile-text"> Esqueceu sua senha? </span>
              </button>
            </div>
            <div v-if="senhaRecover.show" class="col-12 mt-3">
              <div
                class="alert alert-success fade show text-left mb-0"
                role="alert"
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
                    <span style="font-weight: bold">
                      {{ senhaRecover.nome }}</span
                    >, sua senha foi enviada para o e-mail:
                    <span style="font-weight: bold">
                      {{ senhaRecover.email }}</span
                    >. <br />
                    Se você não recebeu, olhe sua caixa de spam.
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 mt-3">
              <p class="text-left" style="font-weight: bold">Periodo:</p>
              <select
                v-model="login.periodo"
                class="form-select ; mb-3"
                @change="getRepresentantes()"
              >
                <option selected disabled :value="0">Selecione...</option>
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
              <p class="text-left" style="font-weight: bold">Representante:</p>
              <select
                v-model="login.representante"
                :disabled="login.periodo == 0"
                class="form-select ; mb-3"
              >
                <option selected disabled v-if="login.periodo == 0" :value="0">
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
            <div class="col-12">
              <button
                disabled
                class="btn btn-dark"
                v-if="
                  !loginValido.cpf ||
                    !loginValido.senha ||
                    login.periodo == 0 ||
                    login.representante == 0
                "
              >
                Finalizar pedido!
              </button>
              <button
                v-else
                id="doLogin-button"
                style="background-color: #2bbacb"
                type="button"
                class="btn btn-info"
                @click="doLogin()"
              >
                Finalizar pedido!
              </button>
              <br />
              <span
                v-if="
                  !loginValido.cpf ||
                    !loginValido.senha ||
                    login.periodo == 0 ||
                    login.representante == 0
                "
                >Preencha todos os campos para poder finalizar o pedido.</span
              >
            </div>
          </div>
        </form>
      </div>
    </div>

    <Dialog
      :closable="true"
      style="max-width: 700px"
      modal
      v-model:visible="modalCarrinhoBase"
    >
      <template #header>
        <h3 class="mb-0">Atenção!</h3>
      </template>

      <div class="mb-2 mx-1">
        <span>
          Você ja possui um carrinho, por favor, escolha qual pedido deseja
          realizar.
        </span>
      </div>

      <div style="margin: 0px" class="row carrinho-base-desktop">
        <div class="col-6">
          <h5>Carrinho Atual</h5>
          <div
            class="mb-2 text-left"
            v-for="lista in objToStore.session.carrinho.listas"
            :key="lista.id_lista"
          >
            <div
              style="
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow-x: hidden;
              "
            >
              {{ lista.nome_exibi_lista }}
            </div>
            <div style="font: size 0.7rem">
              Itens selecionados:
              <span
                v-if="lista.qtdItemsSelecionadosLista != null"
                style="font-weight: bold"
                class="ml-1 pl-1"
              >
                {{ lista.qtdItemsSelecionadosLista }} </span
              ><span v-else style="font-weight: bold" class="ml-1 pl-1">
                {{ lista.total_itens_lista }}
              </span>
            </div>
            <div style="font-weight: bold">
              <span
                class="lista-preco"
                style="font-size: 14px; color: #2bbacb;"
              >
              <span
                  v-if="
                    objToStore.session.carrinho.listas[0].semestre_pagamentos[0]
                      .desconto_pix != 0
                  "
                >
                  <span style="color: #1a8b99; font-weight: 600;">
                    {{
                      new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(
                        objToStore.session.carrinho.totalCarrinho -
                          (objToStore.session.carrinho.totalCarrinho *
                            objToStore.session.carrinho.listas[0]
                              .semestre_pagamentos[0].desconto_pix) /
                            100
                      )
                    }}
                    <span style="font-size: 12px;">(Pix/Boleto)</span>
                  </span>
                </span>
                <span
                  v-else
                  style="font-size: 18px; margin-right: 4px;"
                  >{{
                    new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(objToStore.session.carrinho.totalCarrinho)
                  }}
                  à vista</span
                >
              </span>
            </div>
          </div>
        </div>
        <div class="col-6">
          <h5>Carrinho Antigo</h5>
          <div
            class="mb-2 text-left"
            v-for="lista in aluno.session.carrinho.listas"
            :key="lista.id_lista"
          >
            <div
              style="
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow-x: hidden;
              "
            >
              {{ lista.nome_exibi_lista }}
            </div>
            <div style="font: size 0.7rem">
              Itens selecionados:
              <span
                v-if="lista.qtdItemsSelecionadosLista != null"
                style="font-weight: bold"
                class="ml-1 pl-1"
              >
                {{ lista.qtdItemsSelecionadosLista }} </span
              ><span v-else style="font-weight: bold" class="ml-1 pl-1">
                {{ lista.total_itens_lista }}
              </span>
            </div>
            <div style="font-weight: bold">
              <span
                class="lista-preco"
                style="font-size: 14px; color: #2bbacb;"
              >
              <span
                  v-if="
                    objToStore.session.carrinho.listas[0].semestre_pagamentos[0]
                      .desconto_pix != 0
                  "
                >
                  <span style="color: #1a8b99; font-weight: 600;">
                    {{
                      new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(
                        objToStore.session.carrinho.totalCarrinho -
                          (objToStore.session.carrinho.totalCarrinho *
                            objToStore.session.carrinho.listas[0]
                              .semestre_pagamentos[0].desconto_pix) /
                            100
                      )
                    }}
                    <span style="font-size: 12px;">(Pix/Boleto)</span>
                  </span>
                </span>
                <span
                  v-else
                  style="font-size: 18px; margin-right: 4px;"
                  >{{
                    new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(objToStore.session.carrinho.totalCarrinho)
                  }}
                  à vista</span
                >
              </span>
            </div>
          </div>
        </div>
        <div class="col-6 mt-2 text-left">
          <button
            style="width: 100%"
            @click="setChosenCarrinho(objToStore.session, false)"
            type="button"
            class="btn btn-info"
          >
            Carrinho Atual
          </button>
        </div>
        <div class="col-6 mt-2 text-right">
          <button
            style="width: 100%"
            @click="setChosenCarrinho(aluno.session, true)"
            type="button"
            class="btn btn-info"
          >
            Carrinho Antigo
          </button>
        </div>
      </div>

      <div style="margin: 0px" class="row carrinho-base-mobile">
        <div class="mb-2">
          <h5 class="mb-">Carrinho Atual</h5>
          <div>
            {{ objToStore.session.carrinho.listas.length }} Lista(s)
            selecionada(s)
          </div>
          <div>
            Total:
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(objToStore.session.carrinho.totalCarrinho)
            }}
          </div>
          <div
            @click="
              detalhesCarrinho = objToStore.session;
              toggleDetalhesCarrinhobase($event);
            "
            style="text-decoration: underline"
          >
            Detalhes
          </div>
          <button
            style="width: 100%"
            @click="setChosenCarrinho(objToStore.session, false)"
            type="button"
            class="btn btn-info mt-3"
          >
            Manter Carrinho Atual
          </button>
        </div>

        <div>
          <h5 class="mb-1">Carrinho Antigo</h5>
          <div>
            {{ aluno.session.carrinho.listas.length }} Lista(s) selecionada(s)
          </div>
          <div>
            Total:
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(aluno.session.carrinho.totalCarrinho)
            }}
          </div>
          <div
            @click="
              detalhesCarrinho = aluno.session;
              toggleDetalhesCarrinhobase($event);
            "
            style="text-decoration: underline"
          >
            Detalhes
          </div>
          <button
            style="width: 100%"
            @click="setChosenCarrinho(aluno.session, true)"
            type="button"
            class="btn btn-info mt-3"
          >
            Manter Carrinho Antigo
          </button>
        </div>
      </div>
      <template #footer> </template>
    </Dialog>

    <OverlayPanel style="width: 320px" ref="detalhesCarrinhobase">
      <div style="padding: 3px">
        <div
          class="mb-2 text-left"
          v-for="lista in detalhesCarrinho.carrinho.listas"
          :key="lista.id_lista"
        >
          <div
            style="
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow-x: hidden;
            "
          >
            {{ lista.nome_exibi_lista }}
          </div>
          <div style="font: size 0.7rem">
            Itens selecionados:
            <span
              v-if="lista.qtdItemsSelecionadosLista != null"
              style="font-weight: bold"
              class="ml-1 pl-1"
            >
              {{ lista.qtdItemsSelecionadosLista }} </span
            ><span v-else style="font-weight: bold" class="ml-1 pl-1">
              {{ lista.total_itens_lista }}
            </span>
          </div>
          <div style="font-weight: bold">
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(lista.valor_total_lista)
            }}
          </div>
        </div>
      </div>
    </OverlayPanel>

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
        <div class="text-center" style="width: 100%">
          <h5 class="text-center mb-0">ATUALIZE SUAS INFORMAÇÕES!</h5>
        </div>
      </template>

      <!-- email, telefone, celular, data de nascimento se n estiver preenchido -->
      <div class="container text-left">
        <div class="mb-2">
          <span>
            A última atualização dos seus dados foi há mais de 5 meses, confira
            se ainda são validos.
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

        <span v-if="!TemNascimento">Data de Nascimento</span>
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
              objToStore.session.aluno.email.trim().length < 5 ||
              objToStore.session.aluno.celular.trim().length < 12 ||
              objToStore.session.aluno.telefone.trim().length < 11 ||
              objToStore.session.aluno.nascimento.trim().length < 10
                ? 'disabled-content'
                : ''
            "
            :disabled="
              objToStore.session.aluno.email.trim().length < 5 ||
                objToStore.session.aluno.celular.trim().length < 12 ||
                objToStore.session.aluno.telefone.trim().length < 11 ||
                objToStore.session.aluno.nascimento.trim().length < 10
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
    <Dialog
      style="max-width: 500px"
      modal
      :closable="false"
      v-model:visible="dialogUpdateEmailTemp"
    >
      <template #header>
        <h3 class="mr-2 mb-0">ATENÇÃO: E-MAIL NÃO ENVIADO</h3>
      </template>

      <div class="container text-left">
        <div class="mb-2">
          <span>
            Estamos com dificuldades tecnicas para enviar e-mails para os
            seguintes provedores:
          </span>
          <br />
          <b>@outlook, @live, @hotmail, @mail, @icloud</b>
          <br />
          <span
            >Por favor,
            <b>forneça um e-mail diferente dos listados acima</b> para continuar
            recebendo nossas mensagens.</span
          >
        </div>

        <span>Email</span>
        <div class="input-group mb-2">
          <input
            v-model="emailUpdateTemp"
            type="text"
            class="form-control"
            autocomplete="none"
          />
        </div>
      </div>

      <template #footer>
        <div class="d-flex justify-content-center">
          <button
            style="width: 100%; max-width: 150px"
            @click="updateEmailTemp()"
            type="button"
            class="btn btn-info"
          >
            Atualizar
          </button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Loader from "./Loader";
import Dialog from "primevue/dialog";
import OverlayPanel from "primevue/overlaypanel";
export default {
  components: {
    OverlayPanel,
    Loader,
    Dialog,
  },
  data: () => ({
    modalCarrinhoBase: false,
    modalUpdateInfo: false,
    TemNascimento: true,
    paginaDeKits: false,
    login: {
      cpf: "",
      senha: "",
      periodo: 0,
      representante: 0,
    },
    objToStore: { session: {}, shared: {} },
    loading: false,
    loginValido: {
      cpf: true,
      senha: false,
    },
    senhaRecover: { show: false, nome: "", email: "" },
    dialogUpdateEmailTemp: false,
    emailUpdateTemp: "",
  }),
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
      semestre: (state) => state.semestre,
      faculdade: (state) => state.faculdade,
      pedido: (state) => state.pedido,
      id_pedido: (state) => state.id_pedido,
      emailSenha: (state) => state.emailSenha,
      representantes: (state) => state.representantes,
      error: (state) => state.error,
    }),
  },
  methods: {
    ...mapActions([
      "get_login",
      "get_usuario",
      "salvar_pedido",
      "email_senha",
      "get_representantes",
      "update_aluno",
      "update_email",
    ]),
    ...mapMutations([
      "set_doAvancarFromHeader",
      "set_refreshHeader",
      "set_aluno",
      "set_pedido",
      "set_snackbar",
      "set_emailSenha",
    ]),
    async getSession() {
      this.objToStore = this.$LS.get();
      if (!this.paginaDeKits && this.objToStore.session.carrinho.lenght < 1) {
        await this.$router.push({ name: "inicio" });
      }
    },
    async updateEmailTemp() {
      this.loading = true;
      let aluno = {
        cpf: this.login.cpf,
        email: this.emailUpdateTemp,
      };
      await this.update_email(aluno);
      await this.email_senha(this.login.cpf);
      if (this.emailSenha.sent) {
        this.senhaRecover = this.emailSenha.aluno;
        let emailCheck = this.senhaRecover.email.toUpperCase();
        if (
          emailCheck.includes("@hotmail") ||
          emailCheck.includes("@mail") ||
          emailCheck.includes("@live") ||
          emailCheck.includes("@outlook") ||
          emailCheck.includes("@icloud")
        ) {
          this.senhaRecover.show = false;
          this.dialogUpdateEmailTemp = true;
        }
        //this.objToStore.shared.senhaRecoverCoolDown = tempo;
        this.$LS.set(this.objToStore);
        this.set_emailSenha(false);
      }
      this.loading = false;
      this.dialogUpdateEmailTemp = false;
    },
    async getRepresentantes() {
      this.login.representante = 0;
      this.loading = true;
      await this.get_representantes({
        id_semestre: this.paginaDeKits
          ? this.$parent.selectedSemestre.id_semestre
          : this.objToStore.session.carrinho.semestre.id_semestre,
        id_faculdade: this.paginaDeKits
          ? this.$parent.selectedFaculdade.id_faculdade
          : this.objToStore.session.carrinho.faculdade.id_faculdade,
        cod_periodo: this.login.periodo.cod_periodo,
      });
      this.loading = false;
    },

    async doLogin() {
      this.loading = true;
      //faz o login, mas somente retorna o cookie
      await this.get_login({ cpf: this.login.cpf, senha: this.login.senha });

      if (this.aluno.error) {
        this.set_snackbar({
          show: true,
          severity: "error",
          summary: "Erro interno!",
          detail: "Tente novamente mais tarde.",
          life: null,
        });
      } else if (!this.aluno.success) {
        this.set_snackbar({
          show: true,
          severity: "warn",
          summary: "Aviso!",
          detail: "CPF ou senha incorretos.",
          life: 4000,
        });
      } else if (this.aluno.success) {
        // com o cookie setado busca os dados do aluno
        await this.get_usuario();
        let alunoBase = JSON.parse(JSON.stringify(this.aluno));
        if (alunoBase.session) {
          delete alunoBase.session;
        }
        this.objToStore.session.aluno = alunoBase;
        let dataAtual = new Date();
        let dataLastUpdate = new Date(
          this.objToStore.session.aluno.updated_at == undefined
            ? null
            : this.objToStore.session.aluno.updated_at
        );
        if (
          dataLastUpdate.setMonth(dataLastUpdate.getMonth() + 5) < dataAtual ||
          this.objToStore.session.aluno.nascimento == null
        ) {
          if (
            this.objToStore.session.aluno.nascimento == null ||
            this.objToStore.session.aluno.nascimento.length != 10
          ) {
            this.TemNascimento = false;
            this.objToStore.session.aluno.nascimento = "";
          }
          this.modalUpdateInfo = true;
          this.loading = false;
          return;
        }

        if (
          this.aluno.session &&
          this.aluno.session.carrinho != null &&
          this.aluno.session.carrinho.listas.length > 0 &&
          this.objToStore.session.carrinho != null &&
          this.objToStore.session.carrinho.listas.length > 0
        ) {
          this.modalCarrinhoBase = true;
          this.loading = false;
          return;
        }
        this.$LS.set(this.objToStore);
        this.set_refreshHeader(true);

        let aluno = this.aluno;
        aluno.periodo = this.login.periodo;
        aluno.contato = this.login.representante;

        this.set_pedido({
          doCadastro: false,
          aluno: aluno,
          carrinho: this.objToStore.session.carrinho,
          kit: this.paginaDeKits,
        });
        await this.salvar_pedido(this.pedido);
        this.$LS.set(this.objToStore);
        this.set_refreshHeader(true);
        this.$router.push({
          name: "SeusDados",
          params: { numeroPedido: this.id_pedido },
        });
      }
      this.loading = false;
    },
    async updateAluno() {
      this.loading = true;
      await this.update_aluno(this.objToStore.session.aluno);
      if (!this.error) {
        this.objToStore.session.aluno = this.aluno;
        this.$LS.set(this.objToStore);
        this.modalUpdateInfo = false;
        this.doLogin();
      } else {
        this.modalUpdateInfo = false;
      }
    },
    async recuperarSenha() {
      this.loading = true;
      if (this.login.cpf.length == 14) {
        this.objToStore = this.$LS.get();
        let tempo = new Date();
        tempo = tempo.getTime();
        if (
          this.objToStore.shared.senhaRecoverCoolDown == null ||
          tempo > this.objToStore.shared.senhaRecoverCoolDown + 300000
        ) {
          await this.email_senha(this.login.cpf);
          if (this.emailSenha.sent) {
            this.senhaRecover = this.emailSenha.aluno;
            let emailCheck = this.senhaRecover.email.toUpperCase();

            if (
              emailCheck.includes("@HOTMAIL") ||
              emailCheck.includes("@MAIL") ||
              emailCheck.includes("@LIVE") ||
              emailCheck.includes("@OUTLOOK") ||
              emailCheck.includes("@ICLOUD")
            ) {
              this.senhaRecover.show = false;
              this.dialogUpdateEmailTemp = true;
            }
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
          detail: "Preencha seu CPF para recuperar sua senha",
          life: 4000,
        });
      }
      this.loading = false;
    },
    toggleDetalhesCarrinhobase(event) {
      this.$refs.detalhesCarrinhobase.toggle(event);
    },
    async setChosenCarrinho(session, trocou) {
      this.loading = true;
      this.modalCarrinhoBase = false;
      this.objToStore.session = session;
      if (!trocou) {
        let aluno = this.objToStore.session.aluno;
        aluno.periodo = this.login.periodo;
        aluno.contato = this.login.representante;
        this.set_pedido({
          doCadastro: false,
          aluno: aluno,
          carrinho: this.objToStore.session.carrinho,
          kit: this.paginaDeKits,
        });
        await this.salvar_pedido(this.pedido);
        this.$LS.set(this.objToStore);
        this.set_refreshHeader(true);
        this.$router.push({
          name: "SeusDados",
          params: { numeroPedido: this.id_pedido },
        });
      } else {
        this.$LS.set(this.objToStore);
        this.set_refreshHeader(true);
        this.set_doAvancarFromHeader(true);
        this.$router.push({
          name: "listas",
          params: {
            id_semestre: this.objToStore.session.carrinho.semestre.id_semestre,
          },
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
    validarCPF() {
      let cpf = this.login.cpf;
      this.loginValido.cpf = false;
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
        this.loginValido.cpf = true;
        return true;
      }
    },
    senhaValida() {
      if (this.login.senha.length >= 4) {
        this.loginValido.senha = true;
      } else {
        this.loginValido.senha = false;
      }
    },
    CPFinvalido() {
      this.login.cpf = "";
      this.set_snackbar({
        show: true,
        severity: "warn",
        summary: "Aviso!",
        detail: "CPF inválido, digite novamente.",
        life: 3000,
      });
    },
    senhaNull() {
      this.set_snackbar({
        show: true,
        severity: "warn",
        summary: "Aviso!",
        detail:
          'Senha incorreta, caso tenha esquecido sua senha, clique no botão "Esqueceu sua senha?".',
        life: 6500,
      });
    },
  },
};
</script>

<style scoped>
.fake-link {
  color: #0077cc;
  text-decoration: underline;
  cursor: pointer;
}
.fake-link:hover {
  color: #0095ff;
}
.form-control {
  border-color: #2bbacb;
}
.form-select {
  border-color: #2bbacb;
}
.modal-open {
  overflow: hidden;
}
.show {
  padding-right: 0px !important;
}
.modal-dialog.cadastro {
  max-width: 90%;
  margin: 0rem auto;
}
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
.modal-content {
  border: none;
}
.modal-header {
  padding: 10px 10px 10px 10px;
}
.pointer {
  cursor: pointer;
}
.carrinho-base-desktop {
  display: flex;
}
.carrinho-base-mobile {
  display: none;
}
@media only screen and (max-device-width: 770px) {
  .carrinho-base-desktop {
    display: none;
  }
  .carrinho-base-mobile {
    display: block;
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
  .painel {
    width: 95%;
  }
  .btn.mobile {
    padding: 6px 2px 6px 2px;
    font-size: 0.75rem;
  }
}
</style>
