<template>
  <Loader v-show="loading"></Loader>
  <div
    v-if="objToStore.session.aluno != null"
    class="row"
    style="margin-right: 0; --bs-gutter-x: 0"
  >
    <div class="sidenav">
      <img
        id="dentinho"
        :src="require('@/assets/dentinho_4x.png')"
        alt="dentinho"
        class="dentinho ; mb-1"
      />

      <div
        @click="smoothScroll('header-principal')"
        class="
              sidenav-options
            "
      >
        <div class="col-12"><i class="fas fa-box"></i> <br /></div>
        <div class="col-12">
          MEUS PEDIDOS
        </div>
      </div>
      <div
        @click="smoothScroll('div-target-dados')"
        class="
              sidenav-options
            "
      >
        <div class="col-12"><i class="fas fa-user-cog"></i> <br /></div>
        <div class="col-12">
          MEUS DADOS
        </div>
      </div>
      <div
        @click="smoothScroll('div-target-senha')"
        class="
              sidenav-options
            "
      >
        <div class="col-12"><i class="fas fa-key"></i> <br /></div>
        <div class="col-12">
          MUDAR SENHA
        </div>
      </div>
      <div
        @click="smoothScroll('div-target-atendimento')"
        class="
              sidenav-options
            "
      >
        <div class="col-12">
          <i class="fas fa-headset"></i>
        </div>
        <div class="col-12">
          PÓS-VENDA
        </div>
      </div>
      <div
        @click="modalSair = true"
        class="
              sidenav-options
            "
      >
        <div class="col-12"><i class="fas fa-sign-out-alt"></i> <br /></div>
        <div class="col-12">
          SAIR
        </div>
      </div>
    </div>

    <div
      style="margin-right: 0; --bs-gutter-x: 0"
      class="sidenav-mobile ; row d-flex justify-content-between px-2"
    >
      <button
        @click="smoothScroll('header-principal-mobile')"
        class="
              btn btn-info
              sidenav-options-mobile
              col-2
              d-flex
              justify-content-center
              d-flex
              align-items-center
            "
      >
        <div>MEUS PEDIDOS</div>
      </button>
      <button
        @click="smoothScroll('div-target-dados')"
        class="
              btn btn-info
              sidenav-options-mobile
              col-2
              d-flex
              justify-content-center
              d-flex
              align-items-center
            "
      >
        <div>MEUS DADOS</div>
      </button>
      <button
        @click="smoothScroll('div-target-senha')"
        class="
              btn btn-info
              sidenav-options-mobile
              col-2
              d-flex
              justify-content-center
              d-flex
              align-items-center
            "
      >
        <div>MUDAR SENHA</div>
      </button>
      <button
        @click="smoothScroll('div-target-atendimento')"
        class="
              btn btn-info
              sidenav-options-mobile
              col-2
              d-flex
              justify-content-center
              d-flex
              align-items-center
            "
      >
        <span>PÓS-VENDA</span>
      </button>
      <button
        style="background-color: red !important"
        type="button"
        @click="modalSair = true"
        class="
              btn btn-danger
              sidenav-options-mobile
              col-2
              d-flex
              justify-content-center
              d-flex
              align-items-center
            "
      >
        <span>SAIR</span>
      </button>
    </div>

    <div class="container-meus-pedidos container">
      <div class="container">
        <div class="mt-4">
          <h1 v-if="objToStore.session.aluno != null" class="pt-3">
            Olá, {{ objToStore.session.aluno.nome }}
            {{ objToStore.session.aluno.sobrenome }}!
          </h1>
          <p class="mt-2">
            Aqui você consegue ver os seus pedidos, alterar os seus dados, e até
            entrar em contato conosco.
          </p>
        </div>

        <h3 class="text-left ; pl-2 ; section-title">Meus Pedidos</h3>

        <div class="text-left mb-4 section pedidos-box">
          <div
            class="d-flex align-items-center d-flex justify-content-center"
            style="min-height: 200px"
            v-if="pedidos.length == 0"
          >
            <span style="font-size: 18px; color: #666969">
              Você ainda não tem pedidos!</span
            >
          </div>
          <div
            v-else
            v-for="pedido in pedidos"
            :key="pedido.id_pedidos"
            class="pedido-container"
            style="color: #666969"
          >
            <div class="row mobile-text m-0">
              <div class="col4 row m-0 p-0 d-flex align-items-stretch my-1">
                <div class="col12to6 d-flex align-items-center my-1">
                  <button
                    @click="
                      modalItens = true;
                      pedidoModal = pedido;
                    "
                    type="button"
                    class="btn btn-info ; mobile-btn"
                  >
                    Itens
                  </button>
                </div>
                <div
                  v-if="pedido.status_aluno == 'EXCLUIDO'"
                  class="col12to6 d-flex align-items-center my-1"
                ></div>
                <template
                  v-else-if="
                    (pedido.pagamentos_boleto == null &&
                      pedido.pagamentos_cartao_credito == null &&
                      pedido.pagamentos_pix == null) ||
                      (pedido.pagamentos_cartao_credito != null &&
                        pedido.pagamentos_pix == null &&
                        pedido.status_aluno == 'AGUARDANDO PAGAMENTO') ||
                      (pedido.pagamentos_cartao_credito == null &&
                        pedido.pagamentos_boleto == null &&
                        pedido.pagamentos_pix != null &&
                        pedido.pagamentos_pix.status != 'CONCLUIDA')
                  "
                >
                  <div
                    v-if="
                      pedido.status_aluno != 'CANCELADO' &&
                        pedido.temporario == 1
                    "
                    class="col12to6 d-flex align-items-center my-1"
                  >
                    <button
                      @click="pagamentoEvent(pedido.id_pedidos)"
                      style="color: white"
                      type="button"
                      class="btn btn-success ; mobile-btn"
                    >
                      Fazer pagamento
                    </button>
                  </div>
                  <div
                    v-if="
                      pedido.status_aluno != 'CANCELADO' &&
                        pedido.temporario == 1
                    "
                    class="col12to6 d-flex align-items-center my-1"
                  >
                    <button
                      @click="editarPedidoEvent(pedido)"
                      style="color: white"
                      type="button"
                      class="btn btn-primary ; mobile-btn"
                    >
                      Editar pedido
                    </button>
                  </div>
                </template>

                <div
                  v-else-if="pedido.pagamentos_cartao_credito != null"
                  class="col12to6 d-flex align-items-center my-1"
                >
                  <button
                    @click="
                      pedidoDetalhes = pedido;
                      modalDetalhes = true;
                    "
                    type="button"
                    class="btn btn-primary ; mobile-btn"
                  >
                    Detalhes
                  </button>
                </div>

                <div
                  v-else-if="pedido.pagamentos_boleto != null"
                  class="col12to6 d-flex align-items-center my-1"
                >
                  <button
                    v-if="pedido.status_aluno == 'AGUARDANDO PAGAMENTO'"
                    @click="abrirLink(pedido.pagamentos_boleto)"
                    type="button"
                    class="btn btn-warning ; mobile-btn"
                  >
                    REIMPRIMIR BOLETO!
                  </button>

                  <button
                    v-else
                    @click="
                      pedidoDetalhes = pedido;
                      modalDetalhes = true;
                    "
                    type="button"
                    class="btn btn-primary ; mobile-btn"
                  >
                    Detalhes
                  </button>
                </div>

                <div v-else-if="pedido.pagamentos_pix != null">
                  <button
                    @click="
                      pedidoDetalhes = pedido;
                      modalDetalhes = true;
                    "
                    type="button"
                    class="btn btn-primary ; mobile-btn"
                  >
                    Detalhes
                  </button>
                </div>
              </div>

              <div class="col4to6 row m-0 p-0 d-flex align-items-stretch my-1">
                <div
                  class="col-12 d-flex align-items-center pr-0"
                  style="min-height:30px"
                >
                  Nº do pedido:
                  <span style="color: grey; margin-left: 3px">{{
                    pedido.id_pedidos
                  }}</span>
                </div>
                <div
                  class="col-12 d-flex align-items-center pr-0"
                  style="min-height:30px"
                >
                  Valor total:
                  <span style="color: grey; margin-left: 3px">
                    {{
                      new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(
                        pedido.valor_total +
                          pedido.valor_frete -
                          pedido.valor_desconto
                      )
                    }}
                  </span>
                </div>
              </div>

              <div
                class="col4to6 row m-0 p-0 d-flex align-items-stretch my-1 pr-0"
              >
                <div
                  style="min-height:30px"
                  class="col-12 d-flex align-items-center pr-0"
                >
                  Data:
                  <span style="color: grey; margin-left: 3px">
                    {{ pedido.data_pedido }}
                  </span>
                </div>
                <div
                  v-if="
                    pedido.pagamentos_boleto != null &&
                      pedido.status_aluno == 'AGUARDANDO PAGAMENTO'
                  "
                  class="col-12 d-flex align-items-center pr-0"
                  style="min-height:30px"
                >
                  Vencimento:
                  <span
                    style="color: grey; margin-left: 3px"
                    class="mobile-text"
                  >
                    {{ pedido.pagamentos_boleto.expiration_date }}
                  </span>
                </div>
                <div
                  class="col-12 d-flex align-items-center pr-0"
                  style="min-height:30px"
                >
                  Status:
                  <span
                    v-if="
                      pedido.pagamentos_boleto == null &&
                        pedido.pagamentos_cartao_credito == null &&
                        pedido.temporario == 0 &&
                        pedido.status_aluno == 'AGUARDANDO PAGAMENTO'
                    "
                    style="color: grey; margin-left: 3px; word-break: break-word;
"
                    class="mobile-text"
                  >
                    PEDIDO ENVIADO - MÉTODO OUTROS
                  </span>
                  <span
                    v-else
                    style="color: grey; ; margin-left: 3px"
                    class="mobile-text"
                  >
                    {{ pedido.status_aluno }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="div-target-dados"></div>
        <br />
        <div class="text-left mb-4">
          <h3 class="pl-2 ; section-title">Meus Dados</h3>
          <div class="p-2 m-0 section row d-flex justify-content-center">
            <div
              style="border-bottom: 1px solid LightGrey"
              class="row p-0 m-0 pb-3"
            >
              <div class="col-12 mb-1">
                <p>Email:</p>
                <input
                  id="email-campo"
                  :class="v$.aluno.email.$error ? 'invalid-input' : ''"
                  v-model="aluno.email"
                  class="form-control ; uppercase"
                  type="text"
                />
              </div>

              <div class="col6">
                <p>Celular:</p>
                <input
                  id="celular-campo"
                  :class="v$.aluno.celular.$error ? 'invalid-input' : ''"
                  v-mask="'## #####-####'"
                  v-model="aluno.celular"
                  class="form-control"
                  type="tel"
                />
              </div>

              <div class="col6">
                <p>Telefone:</p>
                <input
                  id="telefone-campo"
                  :class="v$.aluno.telefone.$error ? 'invalid-input' : ''"
                  v-mask="'## ####-####'"
                  v-model="aluno.telefone"
                  class="form-control"
                  type="tel"
                />
              </div>
            </div>

            <div class="row p-0 m-0 pt-2 d-flex justify-content-center">
              <div class="col4">
                <p>CEP:</p>
                <input
                  :class="v$.aluno.cep.$error ? 'invalid-input' : ''"
                  @blur="getCep(aluno.cep, aluno, 'numero-campo')"
                  @keyup="getCep(aluno.cep, aluno, 'numero-campo')"
                  id="cep-campo"
                  v-mask="'#####-###'"
                  v-model="aluno.cep"
                  class="form-control ; uppercase"
                  type="text"
                />
              </div>

              <div class="col8">
                <p>Endereço:</p>
                <input
                  id="endereco-campo"
                  :class="v$.aluno.endereco.$error ? 'invalid-input' : ''"
                  @change="lastCep = ''"
                  v-model="aluno.endereco"
                  class="form-control ; uppercase"
                  type="text"
                  maxlength="33"
                />
              </div>

              <div class="col4">
                <p>Número:</p>
                <input
                  id="numero-campo"
                  :class="v$.aluno.numero.$error ? 'invalid-input' : ''"
                  v-model="aluno.numero"
                  class="form-control ; uppercase"
                  type="text"
                />
              </div>

              <div class="col8">
                <p>Complemento:</p>
                <input
                  id="complemento-campo"
                  v-model="aluno.complemento"
                  class="form-control ; uppercase"
                  maxlength="10"
                  type="text"
                />
              </div>

              <div class="col-12">
                <p>Bairro:</p>
                <input
                  id="bairro-campo"
                  :class="v$.aluno.bairro.$error ? 'invalid-input' : ''"
                  @change="lastCep = ''"
                  v-model="aluno.bairro"
                  class="form-control ; uppercase"
                  type="text"
                />
              </div>

              <div class="col6">
                <p>Cidade:</p>
                <input
                  id="cidade-campo"
                  :class="v$.aluno.cidade.$error ? 'invalid-input' : ''"
                  readonly
                  v-model="aluno.cidade"
                  class="form-control ; uppercase"
                  type="text"
                />
              </div>

              <div class="col6">
                <p>Estado:</p>
                <input
                  id="estado-campo"
                  :class="v$.aluno.estado.$error ? 'invalid-input' : ''"
                  readonly
                  v-model="aluno.estado"
                  class="form-control ; uppercase"
                  type="text"
                />
              </div>
              <div class="col-12 d-flex justify-content-center">
                <button
                  @click="validForm()"
                  type="button"
                  class="btn btn-info mt-3 mb-2"
                  style=" max-width: 500px;"
                >
                  SALVAR! <i class="fas fa-save"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="div-target-senha"></div>
        <br />
        <div class="text-left mb-4">
          <h3 class="pl-2 section-title">Mudar minha senha</h3>
          <div class="p-2 section meus-pedidos">
            <div class="row m-0">
              <!-- este campo serve de guia para o password manager do browser -->
              <div class="col-12" style="display: none">
                <div class="input-group mb-3">
                  <input
                    autocomplete="username"
                    type="text"
                    v-model="senhaAtual"
                    class="form-control"
                    placeholder="digite sua senha atual!"
                  />
                </div>
              </div>
              <div class="col6">
                <p>Senha atual:</p>
                <div class="input-group mb-3">
                  <Password
                    :feedback="false"
                    promptLabel="digite sua senha atual!"
                    class="form-control"
                    placeholder="digite sua senha atual!"
                    v-model="senhaAtual"
                    toggleMask
                    autocomplete="none"
                  ></Password>
                </div>
              </div>
              <div class="col6">
                <p>Nova senha:</p>
                <div class="input-group mb-3">
                  <Password
                    promptLabel="digite sua nova senha!"
                    weakLabel="Fraca"
                    mediumLabel="Normal"
                    strongLabel="Forte"
                    class="form-control"
                    placeholder="digite sua nova senha!"
                    v-model="senhaNova"
                    toggleMask
                    autocomplete="none"
                  ></Password>
                </div>
              </div>
              <div class="col-12">
                <div class="d-flex justify-content-center">
                  <button
                    type="button"
                    class="btn btn-info"
                    @click="validSenha()"
                  >
                    ALTERAR! <i class="fas fa-save"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="div-target-atendimento"></div>
        <br />
        <div class="text-left" style="margin-bottom: 90px">
          <h3 class="pl-2 ; section-title">Pós-Venda</h3>
          <div class="p-2 ; section row m-0">
            <div class="col6">
              <p>Pedido:</p>
              <select
                v-model="posVenda.pedido"
                class="form-select mb-3"
                aria-label="Default select example"
              >
                <option :value="null" disabled selected>Selecione</option>
                <option :value="0">Não tenho numero do pedido</option>
                <option
                  v-for="pedido in pedidos"
                  :key="pedido.id_pedidos"
                  :value="pedido.id_pedidos"
                >
                  Nº {{ pedido.id_pedidos }}
                </option>
              </select>
            </div>

            <div class="col6">
              <p>Motivo:</p>
              <select
                v-model="posVenda.motivo"
                class="form-select mb-3"
                aria-label="Default select example"
              >
                <option :value="null" disabled selected>Selecione</option>
                <option v-for="motivo in motivos" :key="motivo" :value="motivo">
                  {{ motivo }}
                </option>
              </select>
            </div>

            <div class="col-12">
              <p>Mensagem:</p>
              <textarea
                maxlength="350"
                v-model="posVenda.mensagem"
                style="height: 200px"
                class="form-control ; mb-2"
                rows="3"
              ></textarea>
              <p class="mb-2 col-12" style="font-size: 0.8rem">
                Resuma sua mensagem em 350 caracteres. (caracteres restantes:
                {{ 350 - posVenda.mensagem.length }})
              </p>
            </div>

            <div class="col-12 d-flex justify-content-center">
              <button
                @click="validPosVenda()"
                type="button"
                class="btn btn-info"
              >
                ENVIAR! <i class="fas fa-paper-plane"></i>
              </button>
            </div>
            <div class="col-12 text-center">
              <p class="my-2">Preencha todos os campos para enviar.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Dialog
      class="modal-itens-meusPedidos"
      modal
      closeOnEscape
      dismissableMask
      :closable="true"
      v-model:visible="modalItens"
    >
      <template #header>
        <h3 class="mr-2 mb-0">Itens do Pedido!</h3>
      </template>

      <div class="table-container">
        <table v-if="pedidoModal != null" class="table-itens">
          <tr>
            <th style="padding-left: 5px; text-align: left">Descrição</th>
            <th>Marca</th>
            <th class="text-center">QTD</th>
          </tr>
          <tr
            style="
              border-bottom: 1px solid LightGrey;
              font-weight: normal !important;
            "
            v-for="item in pedidoModal.itempedidos"
            :key="item.id_item"
          >
            <td
              :class="item.qtd_item <= 0 ? 'item-titulo' : ''"
              :colspan="item.qtd_item <= 0 ? 3 : 1"
              :style="
                'padding-left: 5px;' +
                  (item.qtd_item > 0 ? ' text-align: left' : '')
              "
            >
              {{ item.descri_item }}
            </td>
            <td v-if="item.qtd_item <= 0 ? false : true">
              {{ item.marca_item }}
            </td>
            <td v-if="item.qtd_item <= 0 ? false : true" class="text-center">
              {{ item.qtd_item }}
            </td>
          </tr>
        </table>
      </div>

      <template #footer>
        <div class="d-flex justify-content-center">
          <button
            @click="modalItens = false"
            type="button"
            class="btn btn-info"
          >
            FECHAR
          </button>
        </div>
      </template>
    </Dialog>

    <Dialog
      style="max-width: 500px"
      modal
      closeOnEscape
      dismissableMask
      :closable="true"
      v-model:visible="modalDetalhes"
    >
      <template #header>
        <h3 class="mr-2 mb-0">Detalhes do pedido!</h3>
      </template>

      <div class="text-left mobile-text" style="font-weight: bold">
        <table
          v-if="pedidoDetalhes.pagamentos_boleto != null"
          style="width: 100%"
        >
          <tr
            style="
              border-bottom: 1px solid LightGrey;
              border-top: 1px solid LightGrey;
            "
          >
            <td>FORMA DE PAGAMENTO:</td>
            <td><span style="color: #636262"> BOLETO</span></td>
          </tr>
          <tr style="border-bottom: 1px solid LightGrey">
            <td>PEDIDO:</td>
            <td>
              <span style="color: #636262">
                {{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pedidoDetalhes.valor_total)
                }}
              </span>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid LightGrey">
            <td>FRETE:</td>
            <td>
              <span style="color: #636262">
                {{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pedidoDetalhes.valor_frete)
                }}
              </span>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid LightGrey">
            <td>DESCONTO:</td>
            <td>
              <span style="color: #636262">
                -
                {{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pedidoDetalhes.valor_desconto)
                }}
              </span>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid LightGrey">
            <td>DESCONTO A VISTA:</td>
            <td>
              <span style="color: #636262">
                -
                {{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(
                    (pedidoDetalhes.valor_total -
                      pedidoDetalhes.valor_desconto) *
                      (pedidoDetalhes.pagamentos_boleto.desconto / 100)
                  )
                }}</span
              >
            </td>
          </tr>
          <tr style="border-bottom: 1px solid LightGrey">
            <td>VALOR FATURADO:</td>
            <td>
              <span style="color: #636262">
                {{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pedidoDetalhes.valor_faturado)
                }}
              </span>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid LightGrey">
            <td>VALOR PAGO:</td>
            <td>
              <span style="color: #636262">
                {{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pedidoDetalhes.pagamentos_boleto.amount / 100)
                }}
              </span>
            </td>
          </tr>
          <tr
            v-if="pedidoDetalhes.pagamentos_boleto.status != 'PAGO'"
            style="border-bottom: 1px solid LightGrey"
          >
            <td>VENCIMENTO:</td>
            <td>
              <span style="color: #636262">
                {{
                  dateFormat(pedidoDetalhes.pagamentos_boleto.expiration_date)
                }}</span
              >
            </td>
          </tr>
          <tr
            style="
              border-bottom: 1px solid LightGrey;
              border-top: 1px solid LightGrey;
            "
          >
            <td>STATUS:</td>
            <td>
              <span style="color: #636262">
                {{ pedidoDetalhes.pagamentos_boleto.status }}
              </span>
            </td>
          </tr>
        </table>

        <table
          v-else-if="pedidoDetalhes.pagamentos_cartao_credito != null"
          style="width: 100%"
        >
          <tr
            style="
              border-bottom: 1px solid LightGrey;
              border-top: 1px solid LightGrey;
            "
          >
            <td>FORMA DE PAGAMENTO:</td>
            <td>
              <span style="color: #636262"> CARTÃO DE CREDITO</span>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid LightGrey">
            <td>PEDIDO:</td>
            <td>
              <span style="color: #636262">
                {{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pedidoDetalhes.valor_total)
                }}
              </span>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid LightGrey">
            <td>FRETE:</td>
            <td>
              <span style="color: #636262">
                {{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pedidoDetalhes.valor_frete)
                }}
              </span>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid LightGrey">
            <td>DESCONTO:</td>
            <td>
              <span style="color: #636262">
                -
                {{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pedidoDetalhes.valor_desconto)
                }}
              </span>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid LightGrey">
            <td>VALOR FATURADO:</td>
            <td>
              <span style="color: #636262">
                {{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pedidoDetalhes.valor_faturado)
                }}
              </span>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid LightGrey">
            <td
              v-if="pedidoDetalhes.pagamento.status_pagamento == 'RESERVA PAGA'"
            >
              VALOR PAGO:
            </td>
            <td v-else>VALOR RESERVADO:</td>
            <td>
              <span style="color: #636262">
                {{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(
                    pedidoDetalhes.pagamentos_cartao_credito.amount / 100
                  )
                }}
              </span>
            </td>
          </tr>

          <tr style="border-bottom: 1px solid LightGrey">
            <td>Nº DE PARCELAS:</td>
            <td>
              <span style="color: #636262">
                {{
                  pedidoDetalhes.pagamentos_cartao_credito.number_installments
                }}</span
              >
            </td>
          </tr>

          <tr
            v-if="pedidoDetalhes.pagamentos_cartao_credito.bandeira != null"
            style="border-bottom: 1px solid LightGrey"
          >
            <td>BANDEIRA DO CARTÃO:</td>
            <td style="word-break: break-all; width: 50%">
              <span style="color: #636262">
                {{
                  pedidoDetalhes.pagamentos_cartao_credito.bandeira.toUpperCase()
                }}
              </span>
            </td>
          </tr>

          <tr style="border-bottom: 1px solid LightGrey">
            <td>DATA DE AUTORIZAÇÃO:</td>
            <td>
              <span style="color: #636262">
                {{
                  dateFormat(
                    pedidoDetalhes.pagamentos_cartao_credito.authorized_at
                  )
                }}</span
              >
            </td>
          </tr>

          <tr style="border-bottom: 1px solid LightGrey">
            <td>STATUS:</td>
            <td>
              <span style="color: #636262">
                {{ statusFormat(pedidoDetalhes) }}</span
              >
            </td>
          </tr>
        </table>

        <table
          v-else-if="pedidoDetalhes.pagamentos_pix != null"
          style="width: 100%"
        >
          <tr
            style="
              border-bottom: 1px solid LightGrey;
              border-top: 1px solid LightGrey;
            "
          >
            <td>FORMA DE PAGAMENTO:</td>
            <td><span style="color: #636262"> PIX</span></td>
          </tr>
          <tr style="border-bottom: 1px solid LightGrey">
            <td>PEDIDO:</td>
            <td>
              <span style="color: #636262">
                {{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pedidoDetalhes.valor_total)
                }}
              </span>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid LightGrey">
            <td>FRETE:</td>
            <td>
              <span style="color: #636262">
                {{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pedidoDetalhes.valor_frete)
                }}
              </span>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid LightGrey">
            <td>DESCONTO:</td>
            <td>
              <span style="color: #636262">
                -
                {{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pedidoDetalhes.valor_desconto)
                }}
              </span>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid LightGrey">
            <td>VALOR FATURADO:</td>
            <td>
              <span style="color: #636262">
                {{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pedidoDetalhes.valor_faturado)
                }}
              </span>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid LightGrey">
            <td>VALOR PAGO:</td>
            <td>
              <span style="color: #636262">
                {{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pedidoDetalhes.pagamentos_pix.valor)
                }}
              </span>
            </td>
          </tr>
          <tr
            style="
              border-bottom: 1px solid LightGrey;
              border-top: 1px solid LightGrey;
            "
          >
            <td>STATUS:</td>
            <td>
              <span style="color: #636262">
                {{ pedidoDetalhes.pagamentos_pix.status }}
              </span>
            </td>
          </tr>
        </table>
      </div>

      <template #footer>
        <div class="d-flex justify-content-center">
          <button
            @click="modalDetalhes = false"
            type="button"
            class="btn btn-info"
          >
            FECHAR
          </button>
        </div>
      </template>
    </Dialog>

    <Dialog
      modal
      closeOnEscape
      dismissableMask
      :closable="true"
      v-model:visible="modalSair"
    >
      <template #header>
        <h3 class="mr-2 mb-0">Atenção</h3>
      </template>

      <span>Tem certeza que deseja sair?</span>

      <template #footer>
        <div class="d-flex justify-content-center">
          <button
            @click="
              modalSair = false;
              doLogout();
            "
            type="button"
            class="btn btn-success"
          >
            SIM
          </button>
          <button
            @click="modalSair = false"
            type="button"
            class="btn btn-danger"
          >
            NÃO
          </button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { mapState, mapMutations, mapActions } from "vuex";
import Dialog from "primevue/dialog";
import Password from "primevue/password";
import Loader from "../components/Loader";
export default {
  data: () => ({
    v$: useVuelidate(),
    modalItens: false,
    modalDetalhes: false,
    modalSair: false,
    pedidoModal: null,
    objToStore: { session: {}, shared: {} },
    aluno: {
      cpf: "",
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
    },
    motivos: [
      "Itens errados/faltando",
      "Data de entrega",
      "Formas de pagamento",
      "Valor incorreto",
      "Alteração de cadastro",
      "Cancelamento",
      "Outros",
    ],
    posVenda: {
      pedido: null,
      motivo: null,
      mensagem: "",
      aluno: {},
    },
    senhaAtual: "",
    senhaNova: "",
    pedidoDetalhes: {},
    pagamento: {},
    itemsPedido: [],
    getCepCooldown: false,
    lastCep: "",
    loading: false,
  }),
  validations() {
    return {
      aluno: {
        email: { required, email },
        celular: { required, minLength: minLength(13) },
        telefone: { required, minLength: minLength(12) },
        cep: { required, minLength: minLength(9) },
        endereco: { required },
        numero: { required },
        bairro: { required },
        cidade: { required },
        estado: { required },
      },
    };
  },
  components: {
    Loader,
    Dialog,
    Password,
  },
  created() {
    this.getSession();
  },
  computed: {
    ...mapState({
      aluno_store: (state) => state.aluno,
      pedidos: (state) => state.pedidos,
      scrollTo: (state) => state.scrollTo,
      error: (state) => state.error,
    }),
  },
  methods: {
    ...mapMutations([
      "set_snackbar",
      "set_scrollTo",
      "set_refreshHeader",
      "set_editarPedido",
    ]),
    ...mapActions([
      "get_logout",
      "update_aluno",
      "update_senha",
      "get_pedidos",
      "email_pos_venda",
    ]),
    async getSession() {
      this.loading = true;
      this.objToStore = this.$LS.get();
      if (this.objToStore.session.aluno == null) {
        this.$router.push({
          name: "inicio",
        });
      } else {
        this.aluno.cpf = this.objToStore.session.aluno.cpf;
        this.aluno.email = this.objToStore.session.aluno.email.toLowerCase();
        this.aluno.celular = this.objToStore.session.aluno.celular;
        this.aluno.telefone = this.objToStore.session.aluno.telefone;
        this.aluno.cep = this.objToStore.session.aluno.cep;
        this.aluno.endereco = this.objToStore.session.aluno.endereco;
        this.aluno.numero = this.objToStore.session.aluno.numero;
        this.aluno.complemento = this.objToStore.session.aluno.complemento;
        this.aluno.bairro = this.objToStore.session.aluno.bairro;
        this.aluno.cidade = this.objToStore.session.aluno.cidade;
        this.aluno.estado = this.objToStore.session.aluno.estado;

        await this.get_pedidos(this.objToStore.session.aluno.cpf);
        this.v$.$touch();
      }
      this.lastCep = this.aluno.cep.replace("-", "");
      this.loading = false;
      if (this.scrollTo != "") {
        this.smoothScroll(this.scrollTo);
        this.set_scrollTo("");
      }
    },
    async doLogout() {
      await this.get_logout();
      if (!this.error) {
        this.objToStore = this.$LS.get();
        this.objToStore.session = {};
        this.$LS.set(this.objToStore);
        this.set_refreshHeader(true);
        this.$router.push({
          name: "inicio",
        });
      }
    },
    pagamentoEvent(numeroPedido) {
      this.$router.push({
        name: "SeusDados",
        params: { numeroPedido: numeroPedido },
      });
    },
    abrirLink(boleto) {
      if (boleto.bank == "C6") {
        const win = window.open("", "_blank");
        let html = "";

        html += "<html>";
        html += '<body style="margin:0!important">';
        html +=
          '<embed width="100%" height="100%" src="data:application/pdf;base64,' +
          boleto.boleto_html +
          '" type="application/pdf" />';
        html += "</body>";
        html += "</html>";

        setTimeout(() => {
          win.document.write(html);
        }, 0);
      }
      window.open(boleto.boleto_html);
    },
    validSenha() {
      if (this.senhaAtual.length < 4 || this.senhaNova.length < 4) {
        this.set_snackbar({
          show: true,
          severity: "warn",
          summary: "Aviso!",
          detail: "Senhas precisam ter no mínimo 4 caracteres.",
          life: 5000,
        });
        return;
      } else {
        this.updateSenha();
      }
    },
    validForm() {
      this.v$.$validate();
      if (this.v$.$error) {
        let campoid = this.v$.$errors[0].$property + "-campo";
        let nome_campo =
          "o campo " + this.v$.$errors[0].$property.toUpperCase();
        let razao = "";
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
          case "email":
            nome_campo = "O e-mail inserido ";
            razao = "não é um e-mail válido.";
            break;
          default:
            razao = "campos marcados com * são obrigatorios.";
            break;
        }
        this.smoothScroll(campoid, true);
        this.set_snackbar({
          show: true,
          severity: "warn",
          summary: "Aviso!",
          detail: nome_campo + " " + razao,
          life: 5000,
        });
      } else {
        this.updateAluno();
      }
    },
    validPosVenda() {
      if (this.posVenda.pedido == null) {
        this.set_snackbar({
          show: true,
          severity: "warn",
          summary: "Aviso!",
          detail: "Selecione um pedido para poder enviar a mensagem!",
          life: 5000,
        });
        return;
      }
      if (this.posVenda.motivo == null) {
        this.set_snackbar({
          show: true,
          severity: "warn",
          summary: "Aviso!",
          detail: "Selecione um motivo para poder enviar a mensagem!",
          life: 5000,
        });
        return;
      }
      if (this.posVenda.mensagem.length == 0) {
        this.set_snackbar({
          show: true,
          severity: "warn",
          summary: "Aviso!",
          detail: "Escreva uma mensagem!",
          life: 5000,
        });
        return;
      }
      this.enviarPosvenda();
    },
    editarPedidoEvent(pedido) {
      let obj = this.$LS.get();
      delete obj.session.carrinho;
      this.$LS.set(obj);
      this.set_editarPedido(pedido);
      this.$router.push({
        name: "listas",
        params: { id_semestre: pedido.semestre },
      });
    },
    async updateAluno() {
      this.loading = true;
      await this.update_aluno(this.aluno);
      if (!this.error && this.aluno_store.cpf) {
        this.objToStore = this.$LS.get();
        this.aluno = this.aluno_store;
        this.aluno.email = this.aluno.email.toLowerCase();
        this.objToStore.session.aluno.email = this.aluno.email.toUpperCase();
        this.objToStore.session.aluno.celular = this.aluno.celular;
        this.objToStore.session.aluno.telefone = this.aluno.telefone;
        this.objToStore.session.aluno.cep = this.aluno.cep;
        this.objToStore.session.aluno.endereco = this.aluno.endereco;
        this.objToStore.session.aluno.numero = this.aluno.numero;
        this.objToStore.session.aluno.complemento = this.aluno.complemento;
        this.objToStore.session.aluno.bairro = this.aluno.bairro;
        this.objToStore.session.aluno.cidade = this.aluno.cidade;
        this.objToStore.session.aluno.estado = this.aluno.estado;
        this.objToStore.session.aluno.updated_at = this.aluno.updated_at;
        this.$LS.set(this.objToStore);
      }
      this.loading = false;
    },
    async updateSenha() {
      this.loading = true;
      await this.update_senha({
        cpf: this.aluno.cpf,
        senhaNova: this.senhaNova,
        senhaAtual: this.senhaAtual,
      });
      this.senhaAtual = "";
      this.senhaNova = "";
      this.loading = false;
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
            this.lastCep = cep;
            document.getElementById(camponumero).focus();
          }
        }
        this.loading = false;
      }
    },
    async enviarPosvenda() {
      this.loading = true;
      this.objToStore = this.$LS.get();
      let tempo = new Date();
      tempo = tempo.getTime();
      if (
        this.objToStore.shared.emailCoolDown == null ||
        tempo > this.objToStore.shared.emailCoolDown + 1800000
      ) {
        this.objToStore.shared.emailCoolDown = tempo;
        this.posVenda.aluno = this.objToStore.session.aluno;
        await this.email_pos_venda(this.posVenda);
        if (this.error) {
          this.objToStore.shared.emailCoolDown = null;
        } else {
          this.posVenda.mensagem = "";
          this.posVenda.pedido = null;
          this.posVenda.motivo = null;
        }
        this.$LS.set(this.objToStore);
      } else {
        this.set_snackbar({
          show: true,
          severity: "info",
          summary: "Aviso!",
          detail:
            "Aguarde 30 minutos para poder enviar outro email. Tempo restante: " +
            this.msToTime(
              this.objToStore.shared.emailCoolDown + 1800000 - tempo
            ),
          life: 5000,
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
    statusFormat(pedido) {
      if (
        pedido.pedido_status == "CANCELADO" ||
        pedido.pagamentos_cartao_credito.status == "CANCELED"
      )
        return "ESTORNADO";
      if (pedido.pagamentos_cartao_credito.status == "AUTHORIZED")
        return "RESERVADO";
      if (pedido.pagamentos_cartao_credito.status == "CONFIRMED") return "PAGO";
      return pedido.status;
    },
    dateFormat(data) {
      if (data != null) {
        let date = data.split("-");
        return date[2].substring(0, 2) + " / " + date[1] + " / " + date[0];
      } else return false;
    },
    smoothScroll(target, iscenter = false) {
      setTimeout(function() {
        document.getElementById(target).scrollIntoView({
          behavior: "smooth",
          block: iscenter ? "center" : "start",
        });
      }, 100);
    },
  },
};
</script>

<style>
.meus-pedidos .p-password-input {
  border-color: #2bbacb !important;
}
</style>

<style scoped>
.pedido-container {
  margin: 10px 3px;
  background: rgb(232 232 232);
  border: 1px solid lightgray;
  border-radius: 25px;
  padding: 10px 0px;
}
.container-meus-pedidos {
  padding-left: 100px;
  margin: 0px auto 0px auto;
}

/* !important is needed sometimes */
::-webkit-scrollbar {
  width: 12px !important;
  -webkit-border-radius: 10px !important;
  border-radius: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgba(202, 202, 202, 0.527);
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #29a8b6 !important;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
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
.section-title {
  color: #666969;
}
p {
  color: #666969;
}
.uppercase {
  text-transform: uppercase;
}
.section {
  font-weight: bold;
  border: 1px solid #2bbacb;
  border-radius: 10px;
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
  padding: 4px 8px;
  background-color: #2bbacb;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.form-control {
  border-color: #2bbacb;
}
.form-select {
  border-color: #2bbacb;
}
html {
  scroll-behavior: smooth;
}

.sidenav {
  display: block;
  margin: auto;
  width: 100px;
  box-shadow: 0px 0px 15px #00000062;
  height: 100%;
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  background-color: #2bbacb;
  overflow-x: hidden;
}
.sidenav-options {
  flex: 1 0 100%;
  flex-wrap: wrap;
  display: flex;
  transition: all 0.2s;
  width: 100%;
  font-size: 13px;
  height: 13vh;
  min-height: 75px;
  max-height: 90px;
  padding: 10px 5px;
  color: white;
  cursor: pointer;
}
.sidenav-options > div {
  flex: 1 0 100%;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
}
.sidenav-options i {
  font-size: 30px;
}
.sidenav-options:hover {
  transform: scale(1.17);
}
.sidenav-options:active {
  color: rgb(172, 172, 172);
  transform: scale(0.8);
}

.sidenav-mobile {
  width: 100%;
  box-shadow: 0px 0px 15px #00000062;
  position: fixed;
  z-index: 4; /* Stay on top */
  bottom: 0; /* Stay at the bottom */
  left: 0;
  background-color: #2bbacb; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
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
  padding: 4px 8px;
  background-color: #2bbacb;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.dentinho {
  height: 70px;
}
.col6 {
  flex: 0 0 auto;
  width: 50%;
}
.col4 {
  flex: 0 0 auto;
  width: 33.333333%;
}
.col8 {
  flex: 0 0 auto;
  width: 66.666667%;
}
.pedidos-box {
  overflow-y: auto;
  max-height: 50vh;
  min-height: 200px;
}
.mobile-btn {
  width: 64%;
}
@media screen and (min-width: 991px) and (max-width: 1198px) {
  .mobile-btn {
    width: 90%;
  }
  .dentinho {
    height: 70px;
  }
}

@media screen and (min-width: 771px) and (max-width: 990px) {
  .mobile-btn {
    width: 100%;
  }
  .dentinho {
    height: 70px;
  }
}
.col4to6 {
  flex: 0 0 auto;
  width: 33.333333%;
}
.col12to6 {
  flex: 0 0 auto;
  width: 100%;
}
@media screen and (max-width: 770px) {
  /* .mobile-row {
    padding-right: 0px;
    padding-left: 6px;
  } */
  .mobile-btn {
    width: 100%;
    min-height: 30px;
    padding: 1px;
    font-size: 9px;
  }
  .mobile-text {
    font-size: 10px !important;
  }
  .col6,
  .col4,
  .col8 {
    flex: 0 0 auto;
    width: 100%;
  }
  .col4to6 {
    flex: 0 0 auto;
    width: 50%;
  }
  .col12to6 {
    flex: 0 0 auto;
    width: 50%;
  }
  .sidenav-options-mobile {
    margin: 4px 2px;
    font-size: 11px;
    height: 50px;
    background-color: #2bbacb;
    color: white;
    border: 1px solid #2bbacb;
    border-radius: 10px;
  }
  .sidenav-options-mobile:active {
    background-color: rgba(255, 255, 255, 0.582);
    border: 1px solid white;
    border-radius: 10px;
  }
  .sidenav-mobile {
    display: flex !important;
  }
  .sidenav {
    display: none;
  }
  .container-meus-pedidos {
    padding-left: 0px;
  }
}

.table-container {
  overflow-y: auto;
  max-height: 286px;
}
@media screen and (max-width: 780px) {
  .table-container {
    max-height: 210px;
  }
  .table-itens {
    font-size: 14px;
  }
}
.table-itens {
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 10px;
}
.item-titulo {
  text-align: center;
  background: #2bbacb;
  color: white;
}
@media screen and (max-width: 400px) {
  .table-itens {
    white-space: break-spaces;
    font-size: 10px;
    width: 100%;
    padding: 0px;
  }
}
@media screen and (min-width: 401px) and (max-width: 550px) {
  .table-itens {
    font-size: 12px;
  }
}
@media screen and (min-width: 781px) and (max-width: 1020px) {
  .table-itens {
    font-size: 12px;
  }
}
</style>
