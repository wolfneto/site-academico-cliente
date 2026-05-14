<template>
  <div class="header-main-div">
    <Loader v-if="loading"></Loader>
    <div id="header-principal" class="header ; d-flex justify-content-center">
      <div class="container ; my-2 ; d-flex justify-content-around">
        <div class="row ; align-items-center ;">
          <div
            @click="inicioEvent()"
            class="
              col
              ;
              d-flex
              align-items-center
              justify-content-center
              ;
              header-options
            "
            :class="rotaAtual.name == 'inicio' ? 'header-option-current' : ''"
          >
            LISTAS
          </div>
          <div
            @click="politicaEvent()"
            class="col ; d-flex align-items-center justify-content-center ; header-options"
            :class="rotaAtual.name == 'politica' ? 'header-option-current' : ''"
          >
            POLÍTICA COMERCIAL
          </div>
          <div
            @click="duvidaEvent()"
            class="
              col
              ;
              d-flex
              align-items-center
              justify-content-center
              ;
              header-options
            "
            :class="rotaAtual.name == 'duvida' ? 'header-option-current' : ''"
          >
            DÚVIDAS FREQUENTES
          </div>
          <!-- <div
            @click="fidelidadeEvent()"
            class="
              col
              ;
              d-flex
              align-items-center
              justify-content-center
              ;
              header-options
            "
            :class="
              rotaAtual.name == 'fidelidade' ? 'header-option-current' : ''
            "
          >
            FIDELIDADE
          </div> -->
          <div
            @click="atendimentoEvent()"
            class="
              col
              ;
              d-flex
              align-items-center
              justify-content-center
              ;
              header-options
            "
            :class="
              rotaAtual.name == 'meusPedidos' ? 'header-option-current' : ''
            "
          >
            PÓS-VENDA
          </div>
          <div
            class="
              col
              ;
              d-flex
              justify-content-around
              ;
              d-flex
              align-items-center
              ;
              minha-conta
            "
          >
            <div style="max-width:70%;" class="text-left">
              <div
                style="white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;"
                v-if="objToStore.session.aluno != null"
              >
                <div style="margin-left: 13px;">
                  Olá {{ objToStore.session.aluno.nome }}!
                </div>
                <div class="minha-conta-text" @click="toggleMinhaConta">
                  <i class="fas fa-caret-down"></i> Minha conta
                </div>
              </div>

              <div
                class="minha-conta-text"
                @click="
                  modalLogin = true;
                  pushDestino = '';
                "
                v-else
              >
                Olá, clique aqui <br />
                para fazer login!
              </div>
            </div>

            <div
              v-if="
                !rotaAtual.fullPath.includes('checkout') &&
                  !rotaAtual.fullPath.includes('login')
              "
            >
              <div
                @click="sidebarCarrinho = !sidebarCarrinho"
                class="carrinho-button"
                v-if="
                  objToStore.session.carrinho != null &&
                    objToStore.session.carrinho.listas.length > 0
                "
              >
                <div class="bagde">
                  {{ objToStore.session.carrinho.listas.length }}
                </div>
                <i class="fas fa-shopping-cart fa-lg ; carrinho"></i>
              </div>
              <div
                @click="
                  simpleSnackbar(
                    'Seu carrinho está vazio e não pode ser aberto.',
                    '#e1ad01'
                  )
                "
                style="color: black; border-color: black"
                class="carrinho-button"
                v-else
              >
                <i class="fas fa-shopping-cart fa-lg ; carrinho"></i>
              </div>
            </div>
            <div style="width: 39px" v-else></div>
          </div>
        </div>
      </div>
    </div>

    <OverlayPanel style="max-width: 350px" ref="minhaConta">
      <div @click="toggleMinhaConta" style="margin: 0px" class="row">
        <div class="col-12">
          <div
            @click="meusPedidosEvent()"
            class="overlay-panel-option"
            style="color: var(--success)"
          >
            <div style="margin: 0px" class="row">
              <div class="col-3 text-center"><i class="fas fa-box"></i></div>
              <div class="col-9">MEUS PEDIDOS</div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div @click="MeusDadosEvent()" class="overlay-panel-option">
            <div style="margin: 0px" class="row">
              <div class="col-3 text-center">
                <i class="fas fa-user-cog"></i>
              </div>
              <div class="col-9">MEUS DADOS</div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div @click="mudarSenhaEvent()" class="overlay-panel-option">
            <div style="margin: 0px" class="row">
              <div class="col-3 text-center">
                <i class="fas fa-key"></i>
              </div>
              <div class="col-9">MUDAR SENHA</div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div @click="atendimentoEvent()" class="overlay-panel-option">
            <div style="margin: 0px" class="row">
              <div class="col-3 text-center">
                <i class="fas fa-headset"></i>
              </div>
              <div style="font-size: 15px" class="col-9">
                ATENDIMENTO PÓS-VENDA
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div @click="modalLogout = true" class="overlay-panel-option">
            <div style="margin: 0px" class="row">
              <div class="col-3 text-center">
                <i class="fas fa-sign-out-alt"></i>
              </div>
              <div class="col-9">SAIR</div>
            </div>
          </div>
        </div>
      </div>
    </OverlayPanel>

    <Sidebar
      :showCloseIcon="false"
      v-model:visible="sidebarCarrinho"
      position="right"
    >
      <div class="sidenav-container">
        <div class="sidenav-lista-container">
          <div
            class="row"
            style="margin: 0px 0px 17px 0px"
            v-for="lista in objToStore.session.carrinho.listas"
            :key="lista.id_lista"
          >
            <div
              :title="lista.nome_exibi_lista.toUpperCase()"
              style="
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow-x: hidden;
              "
              class="col-12"
            >
              {{ lista.nome_exibi_lista.toUpperCase() }}
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
            <div style="font-weight: bold" class="col-6">
              {{
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(lista.valor_total_lista)
              }}
            </div>
            <div
              @click="removeCarrinho(lista)"
              class="remove-lista-btn col-6 text-left"
            >
              Remover
            </div>
          </div>
        </div>
        <div
          style="border-top: 1px solid LightGrey; padding: 5px"
          class="text-center ; mb-2"
        >
          <span v-if="objToStore.session.carrinho.listas.length > 0">
            {{
              objToStore.session.carrinho.faculdade.nome_exibicao_faculdade.toUpperCase()
            }}
            <br />
            {{
              objToStore.session.carrinho.semestre.descri_semestre.toUpperCase()
            }}
          </span>
          <span v-if="objToStore.session.carrinho.listas.length == 0">
            {{
              objToStore.session.faculdade.nome_exibicao_faculdade.toUpperCase()
            }}
            <br />
            {{ objToStore.session.semestre.descri_semestre.toUpperCase() }}
          </span>
        </div>
        <span style="font-weight: bold">ITENS SELECIONADOS: </span> <br />
        <span v-if="objToStore.session.carrinho.qtdItemsSelecionados > 0">
          {{ objToStore.session.carrinho.qtdItemsSelecionados }}</span
        >
        <span v-else> 0</span>
        <br />
        <span style="font-weight: bold">VALOR TOTAL:</span> <br />
        <span
                v-if="objToStore.session.carrinho.listas.length > 0"
                class="lista-preco"
                style="font-size: 18px; color: #2bbacb;"
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
                  style="font-weight: 800; font-size: 16px; margin-right: 4px;"
                  >{{
                    new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(objToStore.session.carrinho.totalCarrinho)
                  }}
                  à vista</span
                >
              </span>
        <br />
        <div class="text-center mt-2 botoes-carrinho-sidenav">
          <button
            @click="sidebarCarrinho = !sidebarCarrinho"
            type="button"
            class="btn btn-danger mr-2 sidenav-button"
          >
            VOLTAR
          </button>
          <button
            v-if="
              objToStore.session.carrinho.listas.length > 0 &&
                objToStore.session.carrinho.totalCarrinho > 0
            "
            @click="avancarEvent()"
            type="button"
            class="btn btn-success ; sidenav-button"
          >
            Avançar
          </button>
          <button
            v-else
            @click.stop="
              simpleSnackbar(
                'Seu carrinho está vazio, não é possivel avancar.',
                '#e1ad01'
              )
            "
            style="background-color: black"
            type="button"
            class="btn btn-dark ; sidenav-button"
          >
            Avançar
          </button>
        </div>
      </div>
    </Sidebar>

    <div class="header-mobile" id="header-principal-mobile">
      <div class="container">
        <div class="row">
          <div class="col text-left d-flex align-items-center">
            <div @click="showSideBar = !showSideBar" class="menu-button">
              <i class="fas fa-bars"> </i>
              <span style="font-weight: bold; font-family: arial"> Acadêmico Solident </span>
            </div>
          </div>
          <div
            style="margin: 5px 0px; padding: 3px; max-width: 175px"
            class="
              col
              ;
              d-flex
              justify-content-around
              ;
              d-flex
              align-items-center
              ;
              minha-conta
            "
          >
            <div style="max-width:70%">
              <div
                class="col-12 text-right"
                style="white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;"
                v-if="objToStore.session.aluno != null"
              >
                Olá {{ objToStore.session.aluno.nome }}!
              </div>

              <div
                class="minha-conta-text"
                @click="
                  modalLogin = true;
                  pushDestino = '';
                "
                v-else
              >
                Olá, clique aqui <br />
                para fazer login!
              </div>
            </div>

            <div
              style="margin-right: 5px"
              v-if="
                !rotaAtual.fullPath.includes('checkout') &&
                  !rotaAtual.fullPath.includes('login')
              "
            >
              <div
                @click="sidebarCarrinho = !sidebarCarrinho"
                class="carrinho-button"
                v-if="
                  objToStore.session.carrinho != null &&
                    objToStore.session.carrinho.listas.length > 0
                "
              >
                <div class="bagde">
                  {{ objToStore.session.carrinho.listas.length }}
                </div>
                <i class="fas fa-shopping-cart fa-lg ; carrinho"></i>
              </div>
              <div
                @click="
                  simpleSnackbar(
                    'Seu carrinho está vazio e não pode ser aberto.',
                    '#e1ad01'
                  )
                "
                style="color: black; border-color: black"
                class="carrinho-button"
                v-else
              >
                <i class="fas fa-shopping-cart fa-lg ; carrinho"></i>
              </div>
            </div>
            <div style="width: 30px; height: 30px" v-else></div>
          </div>
        </div>
      </div>
    </div>

    <Sidebar
      :showCloseIcon="false"
      v-model:visible="showSideBar"
      position="left"
    >
      <div class="sidenav-header">
        <div class="container">
          <div class="text-left" style="padding: 8px 5px 0px 5px">
            <div
              @click="showSideBar = !showSideBar"
              class="menu-button"
              style="font-size: 18px; margin-left: -5px"
            >
              <i class="fas fa-bars"> </i>
              <span style="font-weight: bold; font-family: arial"> Academico Solident </span>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="text-left" style="padding: 0px 5px 0px 5px">
          <div
            @click="
              showSideBar = !showSideBar;
              meusPedidosEvent();
            "
            class="header-options-mobile ; header-options-text ; row"
            style="color: var(--success)"
          >
            <div class="col-1"><i class="fas fa-box"></i></div>
            <div class="col-11">MEUS PEDIDOS</div>
          </div>
          <div
            @click="
              showSideBar = !showSideBar;
              inicioEvent();
            "
            class="header-options-mobile ; header-options-text ; row"
          >
            <div class="col-1"><i class="fas fa-list"></i></div>
            <div class="col-11">LISTAS</div>
          </div>
          <div
            @click="
              showSideBar = !showSideBar;
              politicaEvent();
            "
            class="header-options-mobile ; header-options-text ; row"
          >
            <div class="col-1"><i class="fas fa-briefcase"></i></div>
            <div class="col-11">POLÍTICA COMERCIAL</div>
          </div>
          <div
            @click="
              showSideBar = !showSideBar;
              duvidaEvent();
            "
            class="header-options-mobile ; header-options-text ; row"
          >
            <div class="col-1"><i class="fas fa-question-circle"></i></div>
            <div class="col-11">DÚVIDAS FREQUENTES</div>
          </div>
          <div
            @click="
              showSideBar = !showSideBar;
              fidelidadeEvent();
            "
            class="header-options-mobile ; header-options-text ; row"
          >
            <div class="col-1"><i class="fas fa-handshake"></i></div>
            <div class="col-11">FIDELIDADE</div>
          </div>
          <div
            @click="
              showSideBar = !showSideBar;
              atendimentoEvent();
            "
            class="header-options-mobile ; header-options-text ; row"
          >
            <div class="col-1"><i class="fas fa-headset"></i></div>
            <div class="col-11">ATENDIMENTO PÓS-VENDA</div>
          </div>
          <div
            v-if="objToStore.session.aluno != null"
            @click="
              showSideBar = !showSideBar;
              modalLogout = true;
            "
            class="header-options-mobile ; header-options-text ; row"
          >
            <div class="col-1"><i class="fas fa-sign-out-alt"></i></div>
            <div class="col-11">SAIR</div>
          </div>
        </div>
      </div>
    </Sidebar>

    <Dialog
      contentStyle="border-bottom-left-radius: 15px !important;
    border-bottom-right-radius: 15px !important;"
      style="max-width: 500px"
      modal
      closeOnEscape
      dismissableMask
      :closable="true"
      v-model:visible="modalLogin"
      class="login"
    >
      <template #header>
        <h3 class="ml-2 mb-0">Entrar</h3>
      </template>

      <div class="mb-3 lessthan580px">
        <img
          id="dentinho"
          :src="require('@/assets/dentinho_4x.png')"
          alt="dentinho"
          class="dentinho"
        />
      </div>
      <div class="row" style="padding: 0px 8%; --bs-gutter-x: 0">
        <div class="col-12">
          <p class="text-left" style="font-weight: bold">CPF:</p>
          <div
            class="input-group mb-3"
            style="display: flex; flex-direction: row-reverse"
          >
            <input
              id="campo-cpf"
              v-on:keyup.enter="enterLogin()"
              v-model="login.cpf"
              v-mask="'###.###.###-##'"
              maxlength="14"
              type="tel"
              class="form-control"
              placeholder="Digite seu CPF"
              aria-label="CPF"
            />
            <span class="input-group-text login-icon" id="basic-addon1"
              ><i class="fas fa-id-card"></i
            ></span>
          </div>
        </div>
        <div class="col-12 ; mb-3">
          <p class="text-left ; col" style="font-weight: bold">Senha:</p>
          <div
            class="input-group mb-3"
            style="display: flex; flex-direction: row-reverse"
          >
            <input
              v-on:keyup.enter="enterLogin()"
              type="password"
              v-model="login.senha"
              class="form-control"
              placeholder="Digite sua senha"
              aria-label="Senha"
              autocomplete="current-password"
            />
            <span class="input-group-text login-icon" id="basic-addon1"
              ><i class="fas fa-lock"></i
            ></span>
          </div>
        </div>
        <div class="col-12 ; mb-3 ; d-flex justify-content-start">
          <button
            @click="doLogin()"
            :disabled="!cpfValido || login.senha == ''"
            :class="!cpfValido || login.senha == '' ? 'disabled-content' : ''"
            style="background-color: #2bbacb; width: 100%"
            type="button"
            class="btn btn-info"
          >
            Entrar
          </button>
        </div>
        <div class="col-12 ; d-flex justify-content-end">
          <button
            style="width: 100%"
            @click="recuperarSenha()"
            type="button"
            class="btn btn-outline-danger ; mobile"
          >
            Esqueceu sua senha?
          </button>
        </div>
        <div
          class="text-left mt-2"
          style="font-size: 14px; color: red"
          v-if="preenchaAmbosCampos"
        >
          <span>Preencha ambos os campos para fazer login.</span>
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
                Olá
                <span style="font-weight: bold"> {{ senhaRecover.nome }}</span
                >, enviamos um email de alteração de senha para:
                <span style="font-weight: bold; word-break: break-word">
                  {{ senhaRecover.email }}</span
                >. <br />
                Sempre verifique seu lixo eletrônico/spam.
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-12 ; mt-3 pt-3 ; text-center"
          style="border-top: 1px solid LightGrey"
        >
          <span>
            Caso não tenha cadastro, ele é feito no momento do pedido.
          </span>
        </div>
      </div>
    </Dialog>

    <Dialog
      modal
      closeOnEscape
      dismissableMask
      :closable="true"
      v-model:visible="modalLogout"
    >
      <template #header>
        <h3 class="mr-2 mb-0">Atenção</h3>
      </template>

      <span>Tem certeza que deseja sair?</span>

      <template #footer>
        <button
          style="width: 45%; margin-left: 3.33%"
          @click="modalLogout = false"
          type="button"
          class="btn btn-danger"
        >
          NÃO
        </button>
        <button
          style="width: 45%; margin: 0px 3.33%"
          @click="
            modalLogout = false;
            doLogout();
          "
          type="button"
          class="btn btn-success"
        >
          SIM
        </button>
      </template>
    </Dialog>

    <Dialog
      :closable="false"
      style="max-width: 700px"
      modal
      v-model:visible="modalCarrinhoBase"
    >
      <template #header>
        <h3 class="mb-0">Atenção!</h3>
      </template>

      <div class="mb-2 mx-1">
        <span>
          Você ja possui listas no carrinho, por favor, escolha quais deseja
          manter.
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
              {{
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(lista.valor_total_lista)
              }}
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
              {{
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(lista.valor_total_lista)
              }}
            </div>
          </div>
        </div>
        <div class="col-6 mt-2 text-left">
          <button
            style="width: 100%"
            @click="setChosenCarrinho(objToStore.session)"
            type="button"
            class="btn btn-info"
          >
            Manter Carrinho Atual
          </button>
        </div>
        <div class="col-6 mt-2 text-right">
          <button
            style="width: 100%"
            @click="setChosenCarrinho(aluno.session)"
            type="button"
            class="btn btn-info"
          >
            Manter Carrinho Antigo
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
            @click="setChosenCarrinho(objToStore.session)"
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
            @click="setChosenCarrinho(aluno.session)"
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

    <div style="padding-bottom: 4.5rem; width: 100%"></div>

    <Toast position="bottom-center" />
    <div class="d-flex flex-row justify-content-center">
      <div id="snackbar2">
        <span>{{ tooltiptext }}</span>
      </div>
    </div>
    <span v-show="false"> {{ watchSnackbar }}</span>
    <span v-show="false"> {{ currentSessionExpired }}</span>
    <span v-show="false"> {{ watchRefreshHeader }}</span>
    <span v-show="false"> {{ refreshHeader }}</span>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { nextTick } from "vue";
import OverlayPanel from "primevue/overlaypanel";
import Toast from "primevue/toast";
import Loader from "./Loader";
import Sidebar from "primevue/sidebar";
import Dialog from "primevue/dialog";
export default {
  components: {
    OverlayPanel,
    Toast,
    Sidebar,
    Loader,
    Dialog,
  },
  data: () => ({
    modalCarrinhoBase: false,
    modalLogin: false,
    modalLogout: false,
    showSideBar: false,
    sidebarCarrinho: false,
    preenchaAmbosCampos: false,
    objToStore: { session: {}, shared: {} },
    login: {
      cpf: "",
      senha: "",
    },
    tooltipTimer: 0,
    tooltiptext: "",
    pushDestino: "meusPedidos",
    cpfValido: true,
    loading: false,
    senhaRecover: { show: false, nome: "", email: "" },
    detalhesCarrinho: { carrinho: { listas: [] } },
    rotaAtual: null,
  }),
  created() {
    this.rotaAtual = this.$route;
    this.getSession();
  },
  mounted() {},
  watch: {
    $route() {
      this.rotaAtual = this.$route;
      if (
        this.rotaAtual.name == "fidelidade" ||
        this.rotaAtual.name == "meusPedidos"
      ) {
        this.$parent.hasFooter = false;
      } else {
        this.$parent.hasFooter = true;
      }
      this.rotaAtual.name === "fidelidade"
        ? (document.body.style.background = "#edf7fa")
        : (document.body.style.background = "white");
    },
  },
  computed: {
    ...mapState({
      snackbar: (state) => state.snackbar,
      aluno: (state) => state.aluno,
      scrollTo: (state) => state.scrollTo,
      emailSenha: (state) => state.emailSenha,
      error: (state) => state.error,
      sessionExpired: (state) => state.sessionExpired,
      refreshHeader: (state) => state.refreshHeader,
    }),
    watchRefreshHeader() {
      if (this.refreshHeader) {
        this.getSession();
        this.set_refreshHeader(false);
      }
      return true;
    },
    watchSnackbar() {
      if (this.snackbar.show) {
        this.callSnackbar();
      }
      return true;
    },
    currentSessionExpired() {
      if (this.sessionExpired) {
        this.doLogout();
      }
      return true;
    },
  },
  methods: {
    ...mapMutations([
      "set_refreshHeader",
      "set_snackbar",
      "set_scrollTo",
      "set_emailSenha",
      "set_aluno",
      "set_sessionExpired",
      "set_listaParaSerRemovida",
      "set_doAvancarFromHeader",
    ]),
    ...mapActions(["get_login", "get_usuario", "get_logout", "email_senha"]),
    getSession() {
      this.objToStore = this.$LS.get();
    },
    enterLogin() {
      if (this.cpfValido && this.login.senha != "") {
        this.doLogin();
      } else {
        this.preenchaAmbosCampos = true;
      }
    },
    duvidaEvent() {
      document.activeElement.blur();
      this.$router.push({
        name: "duvida",
      });
    },
    politicaEvent() {
      document.activeElement.blur();
      this.$router.push({
        name: "politica",
      });
    },
    inicioEvent() {
      document.activeElement.blur();
      this.$router.push({
        name: "inicio",
      });
    },
    meusPedidosEvent() {
      this.loading = true;
      this.pushDestino = "meusPedidos";
      this.objToStore = this.$LS.get();
      if (this.objToStore.session.aluno != null) {
        this.$router.push({
          name: "meusPedidos",
        });
      } else {
        this.modalLogin = true;
      }
      this.loading = false;
    },
    kitsEvent() {
      this.$router.push({
        name: "kit",
      });
    },
    atendimentoEvent() {
      if (this.rotaAtual.name == "meusPedidos") {
        this.smoothScroll("div-target-atendimento");
      } else {
        this.set_scrollTo("div-target-atendimento");
        this.meusPedidosEvent();
      }
    },
    mudarSenhaEvent() {
      if (this.rotaAtual.name == "meusPedidos") {
        this.smoothScroll("div-target-senha");
      } else {
        this.set_scrollTo("div-target-senha");
        this.meusPedidosEvent();
      }
    },
    MeusDadosEvent() {
      if (this.rotaAtual.name == "meusPedidos") {
        this.smoothScroll("div-target-dados");
      } else {
        this.set_scrollTo("div-target-dados");
        this.meusPedidosEvent();
      }
    },
    fidelidadeEvent() {
      this.loading = true;
      this.pushDestino = "fidelidade";
      this.objToStore = this.$LS.get();
      if (this.objToStore.session.aluno != null) {
        this.$router.push({
          name: "fidelidade",
        });
      } else {
        this.modalLogin = true;
      }
      this.loading = false;
    },
    avancarEvent() {
      this.sidebarCarrinho = false;
      if (this.rotaAtual.name == "listas") {
        document.getElementById("botao-avancar-login").click();
      } else {
        this.$router.push({
          name: "listas",
          params: {
            id_semestre: this.objToStore.session.carrinho.semestre.id_semestre,
          },
        });
        this.set_doAvancarFromHeader(true);
      }
    },
    removeCarrinho(lista) {
      if (this.rotaAtual.name == "listas") {
        this.set_listaParaSerRemovida(lista);
      } else {
        for (
          let i = 0;
          i < this.objToStore.session.carrinho.listas.length;
          i++
        ) {
          if (
            this.objToStore.session.carrinho.listas[i].id_lista ==
            lista.id_lista
          ) {
            this.objToStore.session.carrinho.listas[i].estaNoCarrinho = false;
            this.objToStore.session.carrinho.listas.splice(i, 1);
          }
        }

        let qtdItemsSelecionados = 0;
        for (
          let i = 0;
          i < this.objToStore.session.carrinho.listas.length;
          i++
        ) {
          for (
            let x = 0;
            x < this.objToStore.session.carrinho.listas[i].items.length;
            x++
          ) {
            qtdItemsSelecionados += parseInt(
              this.objToStore.session.carrinho.listas[i].items[x].qtd_item
            );
          }
        }
        this.objToStore.session.carrinho.qtdItemsSelecionados = parseInt(
          qtdItemsSelecionados
        );

        let totalCarrinho = 0.0;
        this.objToStore.session.carrinho.listas.forEach((lista) => {
          totalCarrinho += parseFloat(lista.valor_total_lista);
        });
        this.objToStore.session.carrinho.totalCarrinho = totalCarrinho.toFixed(
          2
        );
        this.$LS.set(this.objToStore);
        this.simpleSnackbar(
          lista.nome_exibi_lista + " removida!",
          "rgb(255 0 0)"
        );
      }
    },
    simpleSnackbar(msg, cor) {
      clearTimeout(this.tooltipTimer);
      let snackbar = document.getElementById("snackbar2");
      if (snackbar != null) {
        this.tooltiptext = msg;
        snackbar.classList.remove("show");
        void snackbar.offsetWidth;
        snackbar.style.backgroundColor = cor;
        snackbar.className = "show";
        this.tooltipTimer = setTimeout(function() {
          snackbar.classList.remove("show");
        }, 2800);
      }
    },
    async callSnackbar() {
      this.$toast.add({
        severity: this.snackbar.severity,
        summary: this.snackbar.summary,
        detail: this.snackbar.detail,
        life: this.snackbar.life,
      });

      await nextTick();
    },
    async doLogin() {
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
        await this.get_login({ cpf: this.login.cpf, senha: this.login.senha });

        if (this.aluno.success) {
          await this.get_usuario();
          //checa se o aluno tem uma session na base com carrinho.
          //se não tiver, cria um local storage
          if (
            this.aluno.session &&
            this.aluno.session.carrinho != null &&
            this.aluno.session.carrinho.listas.length > 0
          ) {
            //checa se o aluno tem um carrinho local
            //e abre o modal de escolha caso tenha.
            //se não tiver, usa a session da base
            if (
              this.objToStore.session.carrinho != null &&
              this.objToStore.session.carrinho.listas.length > 0
            ) {
              this.modalCarrinhoBase = true;
            } else {
              this.objToStore.session = this.aluno.session;
            }
          } else {
            this.objToStore = this.$LS.get();
          }
          //atribui os dados do aluno buscados na base na session local
          //sem incluir a session da base, caso ela exista
          //isso resolve o loop de session dentro de aluno e vice versa
          let alunoBase = JSON.parse(JSON.stringify(this.aluno));
          if (alunoBase.session) {
            delete alunoBase.session;
          }
          this.objToStore.session.aluno = alunoBase;
          // this.objToStore.session.aluno =
          //   this.aluno.session == null ? this.aluno : this.aluno.session.aluno;
          // inutilizado depois que mudamos o metodo de checar o ultimo pedido
          // //por enquanto resolve
          // this.objToStore.session.pedido =
          //   this.aluno.session == null ? null : this.aluno.session.pedido;

          this.$LS.set(this.objToStore);

          this.modalLogin = false;
          this.login.cpf = "";
          this.login.senha = "";

          this.$parent.refresh++;
          if (this.pushDestino != "") {
            this.$router.push({
              name: this.pushDestino,
            });
          }
        } else if (this.aluno.error) {
          this.set_snackbar({
            show: true,
            severity: "error",
            summary: "Erro interno!",
            detail: "Tente novamente mais tarde.",
            life: null,
          });
        } else {
          this.set_snackbar({
            show: true,
            severity: "warn",
            summary: "Aviso!",
            detail: "CPF ou senha incorretos.",
            life: 4000,
          });
        }
        this.loading = false;
      }
    },
    async doLogout() {
      this.set_sessionExpired(false);
      await this.get_logout();
      this.objToStore = this.$LS.get();
      this.objToStore.session = {};
      this.$LS.set(this.objToStore);
      this.$router.push({
        name: "inicio",
      });
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
        document.getElementById("campo-cpf").focus();
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
      this.cpfValido = false;
      let cpf = this.login.cpf;
      if (cpf.length >= 14) {
        if (typeof cpf !== "string") {
          this.login.cpf = "";
          this.set_snackbar({
            show: true,
            severity: "warn",
            summary: "Aviso!",
            detail: "CPF invalido.",
            life: 2500,
          });
          return false;
        }
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
          this.login.cpf = "";
          this.set_snackbar({
            show: true,
            severity: "warn",
            summary: "Aviso!",
            detail: "CPF invalido.",
            life: 2500,
          });
          return false;
        }
        let soma = 0;
        let resto;
        for (let i = 1; i <= 9; i++)
          soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto == 10 || resto == 11) resto = 0;
        if (resto != parseInt(cpf.substring(9, 10))) {
          this.login.cpf = "";
          this.set_snackbar({
            show: true,
            severity: "warn",
            summary: "Aviso!",
            detail: "CPF invalido.",
            life: 2500,
          });
          return false;
        }
        soma = 0;
        for (let i = 1; i <= 10; i++)
          soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if (resto == 10 || resto == 11) resto = 0;
        if (resto != parseInt(cpf.substring(10, 11))) {
          this.login.cpf = "";
          this.set_snackbar({
            show: true,
            severity: "warn",
            summary: "Aviso!",
            detail: "CPF invalido.",
            life: 2500,
          });
          return false;
        }
        this.cpfValido = true;
        return true;
      }
    },
    toggleMinhaConta(event) {
      this.$refs.minhaConta.toggle(event);
    },
    toggleDetalhesCarrinhobase(event) {
      this.$refs.detalhesCarrinhobase.toggle(event);
    },
    setChosenCarrinho(session) {
      this.objToStore.session = session;
      this.$LS.set(this.objToStore);
      this.$parent.refresh++;
      this.modalCarrinhoBase = false;
    },
    smoothScroll(target) {
      setTimeout(function() {
        document.getElementById(target).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    },
  },
};
</script>

<style scoped>
.overlay-panel-option {
  text-align: left;
  cursor: pointer;
  transition: background ease-out 0.2s;
  width: 100%;
  margin: 2px 0px;
  padding: 7px 3px;
  border-radius: 10px;
  background: #325458b8;
}
.overlay-panel-option:hover {
  background: #32a0ad;
}
/* The snackbar - position it at the bottom and in the middle of the screen */
#snackbar2 {
  max-width: 600px;
  opacity: 0.8;
  visibility: hidden; /* Hidden by default. Visible on click */
  background-color: #333; /* Black background color */
  color: #fff; /* White text color */
  text-align: center; /* Centered text */
  border-radius: 25px; /* Rounded borders */
  padding: 8px; /* Padding */
  position: fixed; /* Sit on top of the screen */
  z-index: 1112; /* Add a z-index if needed */
  bottom: 15%; /* 30px from the bottom */
}

/* Show the snackbar when clicking on a button (class added with JavaScript) */
#snackbar2.show {
  visibility: visible; /* Show the snackbar */
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}
@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 15%;
    opacity: 0.8;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 15%;
    opacity: 0.8;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 15%;
    opacity: 0.8;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 15%;
    opacity: 0.8;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}
.carrinho-button {
  transition: transform ease-out 0.2s, background ease-in 0.2s;
  cursor: pointer;
  position: relative;
  border-radius: 50%;
  padding: 8px;
  background: var(--secondary);
  color: rgb(4, 202, 4);
  border: 1px solid rgb(4, 202, 4);
}
.carrinho-button:hover {
  background: rgb(218, 218, 218);
  transform: scale(1.07);
}
.carrinho-button:active {
  transform: scale(0.8);
}
.carrinho-button:hover .bagde {
  color: rgb(218, 218, 218);
}
.carrinho {
  transform: translate(-1px, 2px);
}
.bagde {
  transition: color ease-in 0.2s;
  font-size: 12px;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  transform: translate(15px, -8px);
  background: rgb(4, 202, 4);
  position: absolute;
  color: white;
}
.minha-conta {
  margin-left: 1rem;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}
.minha-conta:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
}
.minha-conta-text:hover .fas,
.minha-conta-text:hover {
  cursor: pointer;
  text-decoration: underline;
}
.p-sidebar-left {
  font-family: "Montserrat";
  /* color: white;
  background-color: #36b1bf; */
  background-color: #063d44ad;
  padding: 0px !important;
  border-left: none !important;
}
.pointer {
  cursor: pointer;
}
.header {
  position: absolute;
  z-index: 2;
  width: 100%;
  box-shadow: 0px 4px 12px #0000001a;
  background: linear-gradient(135deg, #1a7f8b 0%, #2bbacb 100%);
  color: var(--secondary);
  font-weight: 600;
}
.header-options {
  color: var(--secondary);
  margin: 0px 12px;
  padding: 0px 8px;
  transition: all 0.2s, transform 0.1s;
  min-height: 50px;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  opacity: 1;
  position: relative;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 0.5px;
}
.header-options::after {
  position: absolute;
  bottom: -2px;
  content: "";
  height: 2px;
  width: 100%;
  background: var(--secondary);
  transform: scaleX(0);
  transition: transform ease-out 0.2s;
}
.header-options:hover::after {
  transform: scaleX(1);
}
.header-options:hover {
  transform: scale(1.07);
}
.header-options:active {
  transform: scale(0.8);
}
.header-option-current {
  transform: scale(1.07);
}
.header-option-current::after {
  position: absolute;
  bottom: -2px;
  content: "";
  height: 2px;
  position: absolute;
  z-index: 2;
  display: none;
  width: 100%;
  box-shadow: 0px 4px 12px #0000001a;
  background: linear-gradient(135deg, #1a7f8b 0%, #2bbacb 100%);
  color: var(--secondary);
  font-weight: 600
  position: absolute;
  z-index: 2;
  display: none;
  width: 100%;
  box-shadow: 0px 0px 20px #00000062;
  background-color: var(--primary);
  color: var(--secondary);
}
.header-options-mobile {
  transition: all 0.2s;
  color: var(--secondary);
  align-items: center;
  padding: 10px 0px;
  border-radius: 15px;
  height: 50px;
  font-size: 16px;
  text-align: left;
}
.header-options-mobile:active {
  transform: scale(0.9);
  color: var(--primary) !important;
}
.sidenav-header {
  padding-bottom: 8px;
  background-color: #1e94a0;
  color: var(--secondary);
  -webkit-box-shadow: 0px 2px 6px 0px rgba(50, 50, 50, 0.62);
  -moz-box-shadow: 0px 2px 6px 0px rgba(50, 50, 50, 0.62);
  box-shadow: 0px 2px 6px 0px rgba(50, 50, 50, 0.62);
}
.menu-button {
  transition: all 0.1s;
  display: flex;
  align-items: center;
  gap: 10px;
}
.menu-button::before {
  content: "";
  display: inline-block;
  width: 40px;
  height: 40px;
  background-image: url('@/assets/logo.jpeg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.menu-button:active {
  color: var(--primary);
  transform: scale(0.8) translate(-20px, 0px);
}
.dentinho {
  height: 150px;
}
.lessthan580px {
  display: block;
}
.carrinho-base-desktop {
  display: flex;
}
.carrinho-base-mobile {
  display: none;
}

@media only screen and (max-width: 840px) {
  .minha-conta {
    font-size: 11px;
    margin-left: 0px;
    padding: 1px 2px;
  }
  .carrinho-button {
    padding: 6px;
  }
}
@media only screen and (min-width: 841px) and (max-width: 991px) {
  .minha-conta {
    font-size: 11px;
    margin-left: 1px;
    padding: 1px 2px;
  }
  .carrinho-button {
    padding: 7px;
  }
}
@media only screen and (min-width: 991px) and (max-width: 1199px) {
  .minha-conta {
    font-size: 11px;
    margin-left: 2px;
    padding: 2px 3px;
  }
  .carrinho-button {
    padding: 8px;
  }
}

@media only screen and (min-width: 771px) and (max-width: 1400px) {
  .btn {
    padding: 7px 2px;
    font-size: 14px;
  }
  .header-options {
    font-size: 14px;
    margin: 0px 4px;
  }
}
@media only screen and (max-width: 770px) {
  .btn {
    padding: 5px 1px;
    font-size: 14px;
  }
  .dentinho {
    height: 95px;
  }
  .header {
    display: none !important;
  }
  .header-mobile {
    display: block !important;
  }
  .header-options {
    padding: 5px 0px 5px 10px;
    margin: 5px 2px 5px 2px;
    min-height: 35px;
    border: 1px solid var(--primary);
    border-radius: 0px;
  }
  .carrinho-base-mobile {
    display: block;
  }
  .carrinho-base-desktop {
    display: none;
  }
}
@media only screen and (max-height: 580px) {
  .lessthan580px {
    display: none !important;
  }
}
</style>
