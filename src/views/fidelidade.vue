<template>
  <Loader v-if="loading" />
  <template v-if="false">
    <div
      v-if="objToStore.session.aluno != null"
      style="padding:0px; margin:0px"
      class="row print"
    >
      <div class="col3">
        <!-- ocupa o espaco da sidebar fixada -->
      </div>
      <div class="side-bar">
        <div class="side-nav-container text-left">
          <div>
            <img
              :src="getURL('dentinho_4x.png')"
              alt="dentinho"
              class="dentinho-icon"
            />
          </div>

          <div style="margin: 15px 0px 23px 0px">
            <span style="font-weight: bold ; font-size: 18px ;">
              Fidelidade Solident
            </span>
          </div>

          <div
            style="margin: 0px 0px 35px 0px; font-weight: bold"
            v-if="objToStore.session.aluno != null"
          >
            Olá {{ objToStore.session.aluno.nome }} <br />
            <div style="margin: 5px 0px 0px 0px">
              <span class="pontos">
                {{ objToStore.session.aluno.pontos }} pontos</span
              >
            </div>
          </div>

          <div style="margin:0px 0px 28px 0px">
            <div
              class="screen-option"
              :class="screen == 'meusResgates' ? 'screen-option-active' : ''"
              @click="
                screen = 'meusResgates';
                scrollToTop();
              "
            >
              <i class="fas fa-heart"></i> Meus resgates
            </div>
            <div
              class="screen-option"
              :class="screen == 'extrato' ? 'screen-option-active' : ''"
              @click="
                screen = 'extrato';
                scrollToTop();
              "
            >
              <i style="padding-right: 4px" class="fas fa-file-invoice"></i>
              Extrato de pontos
            </div>
            <div class="screen-option" @click="modalSair = true">
              <i class="fas fa-sign-out-alt"></i> Sair
            </div>
          </div>

          <div style="margin: 0px 0px 28px 0px">
            <div style="margin-bottom: 7px">
              <span style="font-weight: bold ; font-size: 18px"
                >Categorias</span
              >
            </div>
            <div
              class="screen-option"
              :class="screen == 'produtos' ? 'screen-option-active' : ''"
              @click="
                screen = 'produtos';
                scrollToTop();
              "
            >
              Produtos
            </div>
            <div
              class="screen-option"
              :class="screen == 'valeCompras' ? 'screen-option-active' : ''"
              @click="
                screen = 'valeCompras';
                scrollToTop();
              "
            >
              Vale compras
            </div>
          </div>

          <div style="margin: 10px 0px">
            <div
              class="screen-option"
              :class="screen == 'comoFunciona' ? 'screen-option-active' : ''"
              @click="
                screen = 'comoFunciona';
                scrollToTop();
              "
            >
              Como funciona
            </div>
            <div
              class="screen-option"
              :class="screen == 'regulamento' ? 'screen-option-active' : ''"
              @click="
                screen = 'regulamento';
                scrollToTop();
              "
            >
              Regulamento
            </div>
            <div
              class="screen-option"
              :class="screen == 'faleConosco' ? 'screen-option-active' : ''"
              @click="
                screen = 'faleConosco';
                scrollToTop();
              "
            >
              Fale conosco
            </div>
          </div>
        </div>
      </div>

      <div class="mobile-bottom-bar">
        <div class="row text-left" style="margin:0px; padding:0px 20px">
          <div class="col-9">
            <div
              style="margin: 0px 0px 0px 0px; font-weight: bold; font-size:14px"
              v-if="objToStore.session.aluno != null"
            >
              Olá {{ objToStore.session.aluno.nome }} <br />
              <div style="margin: 2px 0px 0px 0px">
                <span class="pontos">
                  {{ objToStore.session.aluno.pontos }} pontos</span
                >
              </div>
            </div>
          </div>
          <div
            class="col-3 text-center d-flex align-items-center justify-content-end"
          >
            <div
              @click="mobileSideBar = !mobileSideBar"
              class="mobile-menu-button"
            >
              <i class="fas fa-ellipsis-v"></i>
            </div>
          </div>
        </div>
      </div>

      <Sidebar
        :modal="false"
        :showCloseIcon="false"
        v-model:visible="mobileSideBar"
        position="right"
        class="p-sidebar-sm"
      >
        <div class="side-nav-container text-left">
          <div>
            <img
              :src="getURL('dentinho_4x.png')"
              alt="dentinho"
              class="dentinho-icon"
            />
          </div>

          <div style="margin: 15px 0px 23px 0px">
            <span style="font-weight: bold ; font-size: 18px ;">
              Fidelidade Solident
            </span>
          </div>

          <div style="margin:0px 0px 28px 0px">
            <div
              style="margin-bottom: 8px"
              class="screen-option"
              :class="screen == 'meusResgates' ? 'screen-option-active' : ''"
              @click="
                screen = 'meusResgates';
                mobileSideBar = false;
                scrollToTop();
              "
            >
              <i class="fas fa-heart"></i> Meus resgates
            </div>
            <div
              style="margin-bottom: 10px"
              class="screen-option"
              :class="screen == 'extrato' ? 'screen-option-active' : ''"
              @click="
                screen = 'extrato';
                mobileSideBar = false;
                scrollToTop();
              "
            >
              <i style="padding-right: 4px" class="fas fa-file-invoice"></i>
              Extrato de pontos
            </div>
            <div class="screen-option" @click="modalSair = true">
              <i class="fas fa-sign-out-alt"></i> Sair
            </div>
          </div>

          <div style="margin: 0px 0px 28px 0px">
            <div style="margin-bottom: 8px">
              <span style="font-weight: bold ; font-size: 18px ;"
                >Categorias</span
              >
            </div>
            <div
              style="margin-bottom: 8px"
              class="screen-option"
              :class="screen == 'produtos' ? 'screen-option-active' : ''"
              @click="
                screen = 'produtos';
                mobileSideBar = false;
                scrollToTop();
              "
            >
              Produtos
            </div>
            <div
              class="screen-option"
              :class="screen == 'valeCompras' ? 'screen-option-active' : ''"
              @click="
                screen = 'valeCompras';
                mobileSideBar = false;
                scrollToTop();
              "
            >
              Vale compras
            </div>
          </div>

          <div style="margin: 10px 0px">
            <div
              style="margin-bottom: 8px"
              class="screen-option"
              :class="screen == 'comoFunciona' ? 'screen-option-active' : ''"
              @click="
                screen = 'comoFunciona';
                mobileSideBar = false;
                scrollToTop();
              "
            >
              Como funciona
            </div>
            <div
              style="margin-bottom: 8px"
              class="screen-option"
              :class="screen == 'regulamento' ? 'screen-option-active' : ''"
              @click="
                screen = 'regulamento';
                mobileSideBar = false;
                scrollToTop();
              "
            >
              Regulamento
            </div>
            <div
              class="screen-option"
              :class="screen == 'faleConosco' ? 'screen-option-active' : ''"
              @click="
                screen = 'faleConosco';
                mobileSideBar = false;
                scrollToTop();
              "
            >
              Fale conosco
            </div>
          </div>
        </div>
      </Sidebar>

      <div class="col9 print">
        <div
          v-if="screen == 'produtos'"
          style="padding: 15px; min-height: 500px"
        >
          <div class="text-left pl-2">
            <span style="font-weight: bold; font-size: 20px"> Produtos </span>
          </div>
          <div
            style="min-height: 500px; width: 100%;"
            class="d-flex justify-content-center align-items-center"
            v-if="produtos.length <= 0"
          >
            <span style="font-size: 23px; color: #1994a1 ; font-weight: bold">
              Não há produtos disponiveis no momento, tente novamente mais
              tarde!
            </span>
          </div>
          <div class="row item-grid" style="margin:0px; padding:0px">
            <div
              v-for="produto in produtos"
              :key="produto"
              class="item"
              :class="
                objToStore.session.aluno.pontos < produto.pontos
                  ? 'disabled-content'
                  : ''
              "
              @click="
                objToStore.session.aluno.pontos < produto.pontos
                  ? pontosInsuficientes()
                  : null
              "
            >
              <img
                :src="getURL(produto.img_url.substring(15))"
                alt="item"
                class="item-img"
              />
              <div
                class="d-flex align-items-center"
                style="margin-top: 15px; height: 40px"
              >
                <span style="font-weight: bold; font-size: 14px">
                  {{ produto.nome }}
                </span>
              </div>
              <div style="margin-top: 10px">
                <span
                  style="font-weight: bold; font-size: 22px; color: #1994a1 "
                >
                  {{ produto.pontos }} pontos
                </span>
              </div>
              <div style="margin-top: 10px">
                <button
                  :disabled="objToStore.session.aluno.pontos < produto.pontos"
                  @click="
                    selectedItem = produto;
                    modalResgatarItem = true;
                  "
                  style="width: 100%"
                  type="button"
                  class="btn btn-info"
                >
                  Resgatar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="screen == 'valeCompras'"
          style="padding: 15px; min-height: 500px"
        >
          <div class="text-left pl-2">
            <span style="font-weight: bold; font-size: 20px">
              Vale Compras
            </span>
          </div>
        </div>
        <div
          v-if="screen == 'meusResgates'"
          style="padding: 15px; min-height: 500px"
        >
          <div class="text-left pl-2">
            <span style="font-weight: bold; font-size: 20px">
              Meus resgates
            </span>
          </div>

          <div class="text-left" style="max-width: 900px; margin: 20px auto;">
            <div
              v-if="resgates.length <= 0"
              class="text-center"
              style="color: #1994a1; background: white; border-radius: 5px; padding:10px"
            >
              Você não possui resgates.
            </div>
            <div v-else>
              <div
                class="row d-flex align-items-center resgates-header"
                style="margin:0px; padding:0px; font-weight:bold"
              >
                <div class="col-3 mobile-col">Vale compras</div>
                <div class="col-2 mobile-col">Pontos</div>
                <div class="col mobile-col">Resgatado em</div>
              </div>
              <div class="resgates" v-for="resgate in resgates" :key="resgate">
                <div
                  class="row d-flex align-items-center"
                  style="margin:0px; padding:0px"
                >
                  <div class="col-3 mobile-col">{{ resgate.nome_produto }}</div>
                  <div class="col-2 mobile-col">
                    {{ resgate.pontos_produto }}
                  </div>
                  <div class="col-4 mobile-col">{{ resgate.create_at }}</div>
                  <div class="col-3 mobile-col text-right">
                    <button
                      @click="imprimirEvent(resgate.id)"
                      type="button"
                      class="btn btn-info mobile-btn"
                    >
                      Imprimir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="screen == 'extrato'"
          style="padding: 15px; min-height: 500px"
        >
          <div class="text-left pl-2">
            <span style="font-weight: bold; font-size: 20px">
              Extrato de pontos
            </span>
          </div>

          <div style="max-width: 900px; margin: 20px auto;">
            <div
              v-if="extratos.length <= 0"
              style="color: #1994a1; background: white ; border-radius: 5px; padding:10px"
            >
              Você não possui pontos.
            </div>
            <div
              class="row extratos"
              v-else
              v-for="extrato in extratos"
              :key="extrato"
            >
              <div
                class="col-2 d-flex align-items-center justify-content-center"
                style="padding:0px"
              >
                <i class="fas fa-gem"></i>
              </div>
              <div class="col-5" style="padding:3px 0px">Pontos inseridos:</div>
              <div
                class="col-5 d-flex align-items-center justify-content-center"
                style="color:#1F98A7 ; padding:0px ; font-weight:bold"
              >
                {{ extrato.pontos }}
              </div>
              <div
                class="col-2 d-flex align-items-center justify-content-center"
                style="padding:0px"
              >
                <i class="fas fa-calendar-alt"></i>
              </div>
              <div class="col-5" style="padding:0px">
                Válidos até:
              </div>
              <div
                class="col-5 d-flex align-items-center justify-content-center"
                style="color:#1F98A7 ; padding:0px ; font-weight:bold"
              >
                {{ extrato.validade }}
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="screen == 'comoFunciona'"
          style="padding: 15px; min-height: 500px"
        >
          <div class="text-left pl-2 mb-3">
            <span style="font-weight: bold; font-size: 20px">
              Como funciona?
            </span>
          </div>
          <img
            :src="getURL('comofunciona.png')"
            alt=""
            class="como-funciona-img"
          />
        </div>
        <div
          v-if="screen == 'regulamento'"
          style="padding: 15px; min-height: 500px"
        >
          <div class="text-left pl-2">
            <span style="font-weight: bold; font-size: 20px">
              Regulamento
            </span>
          </div>

          <div style="max-width: 800px; margin: 20px auto;" class="text-left">
            <div class="pergunta">1. SOBRE O PROGRAMA</div>

            O PROGRAMA FIDELIDADE SOLIDENT é destinado exclusivamente aos Alunos
            de Odontologia.
            <div class="pergunta">2. COMO PARTICIPAR</div>

            Toda compra feita pelo acadêmico na Dental Solident será convertida
            em pontos, na proporção de R$1,00 = 1 PONTO.
            <div class="pergunta">3. COMPUTAÇÃO DE PONTOS</div>

            Após a confirmação de pagamento os pontos são inseridos, Seguindo a
            seguinte regra: <br />

            <span style="color: #1F98A7">R$ 1,00 = 1 Ponto.</span>
            <div class="pergunta">
              4. VALIDADE DOS PONTOS
            </div>

            Os pontos tem validade de 1 ano, a partir da data da compra do
            acadêmico. Os Vale Prêmios tem validade de <b>30 dias</b>, para ser
            utilizado após a emissão.

            <div class="pergunta">
              5. RESGATE DE PONTOS
            </div>

            O acadêmico deverá efetuar o login e resgatar o Vale Prêmio que lhe
            compete de acordo com sua pontuação.
            <div class="pergunta">6. ENTREGA DOS PRÊMIOS</div>

            A entrega do Prêmio deverar estar vinculada a entrega de um novo
            pedido feito pelo aluno, há também a possibilidade do aluno agendar
            a retirada do Prêmio na Dental Solident por e-mail.

            <div class="my-2" style="color:red">
              NÃO ENVIAMOS OS PRÊMIOS RESGATADOS POR CORREIO OU TRANSPORTADORA.
            </div>

            A Dental Solident poderá a qualquer momento e a seu critério
            exclusivo modificar, excluir e incluir novos Prêmios no site.
            <div class="pergunta">7. DUVIDAS/RECLAMAÇÕES SOBRE SEUS PONTOS</div>
            Qualquer duvida/reclamação relacionada à computação de pontos devera
            ser enviada através da seção Fale Conosco. O prazo de resposta do
            e-mail será de até <b>7 dias</b> úteis.
          </div>
        </div>
        <div
          v-if="screen == 'faleConosco'"
          style="padding: 15px; min-height: 500px"
        >
          <div class="text-left pl-2">
            <span style="font-weight: bold; font-size: 20px">
              Fale conosco
            </span>
          </div>

          <div style="max-width: 600px; margin: 20px auto;">
            <div>
              <b>DÚVIDAS? FALE CONOSCO</b>
            </div>
            <div style="color:#1994a1; font-size:14px; margin-top: 10px">
              fidelidade@academicosolident.com.br
            </div>
            <div class="input-group my-2">
              <textarea
                v-model="fidelidadeContato.mensagem"
                placeholder="Descreva em poucas palavras seu problema para que possamos ajudar."
                @keyup="countCharLeft()"
                style="height: 200px;"
                class="form-control ; mb-2"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
              <p class="mb-2 col-12" style="font-size: 0.8rem">
                Resuma sua mensagem em 350 caracteres. (caracteres restantes:
                {{ charLeft }})
              </p>
            </div>
            <button
              @click="emailFidelidadeContato()"
              :disabled="charLeft < 0 || charLeft == 350"
              style="width: 100%; padding:10px"
              type="button"
              class="btn btn-info"
            >
              Enviar
            </button>
          </div>
        </div>
        <div class="print" v-if="screen == 'resgate'">
          <div class="text-center">
            <span style="font-weight: bold; font-size: 20px"
              >Comprovante de Resgate</span
            >
          </div>

          <div
            style="max-width:700px; margin: 20px auto 0px auto"
            class="text-center"
          >
            <button
              @click="screen = 'meusResgates'"
              style="width: 45%;"
              type="button"
              class="btn btn-danger"
            >
              Voltar
            </button>
            <button
              @click="imprimirPagina()"
              style="width: 45%; margin-left: 10%"
              type="button"
              class="btn btn-info"
            >
              Imprimir
            </button>
          </div>

          <div
            v-if="resgate != null"
            id="comprovante"
            class="container-comprovante text-left print"
          >
            <div class="row print" style="padding: 0px; margin: 0px">
              <div class="col-4 print" style="margin-bottom: 15px">
                <img
                  class="dentinho print"
                  :src="getURL('dentinho_4x.png')"
                  alt=""
                />
              </div>
              <div class="col-8 print" style="margin-bottom: 15px">
                <h3 class="print">
                  Brinde Acadêmico Solident
                </h3>
                <br class="print" />
                <h4 class="print">
                  Validade: {{ resgate.resgate.expirationDate }}
                </h4>
              </div>
              <div class="col-12 print">
                <p class="print">
                  Comprovante de Resgate no Programa de Fidelidade Dental
                  Solident
                </p>
                <p class="print">
                  Cliente:
                  <b class="print">
                    {{
                      objToStore.session.aluno.nome +
                        " " +
                        objToStore.session.aluno.sobrenome
                    }}
                  </b>
                </p>
                <p class="print">
                  CPF do Cliente:
                  <b class="print"> {{ resgate.resgate.cpf_aluno }} </b>
                </p>
                <p class="print">
                  Codigo Resgate:
                  <b class="print"> {{ resgate.resgate.id }} </b>
                </p>
                <p class="print">
                  Data do Resgate:
                  <b class="print"> {{ resgate.resgate.create_at }} </b>
                </p>
                <p class="print">
                  Quantidade de Pontos Resgatados:
                  <b class="print">
                    {{ resgate.resgate.pontos_produto }} Pontos
                  </b>
                </p>
              </div>
              <div class="col-12 print">
                <h4 class="print">
                  <b class="print"> {{ resgate.resgate.nome_produto }} </b>
                </h4>
              </div>
              <div class="col-12 print">
                <p class="print">
                  Produto a ser retirado diretamente na sede da Dental Solident
                  no período de 90 dias após o resgate. Cores disponíveis variam
                  de acordo com a disponibilidade em estoque.
                </p>
                <p class="print">
                  <b class="print"
                    >Os produtos brinde podem ser entregues junto com a sua
                    próxima compra.
                  </b>
                </p>
              </div>
              <div class="col-12 text-center print">
                <h5 class="print">
                  BRINDE INSTRANSFERÍVEL. <br class="print" />
                  NÃO SERÃO ACEITOS COMPROVANTES VIA SMS OU NA TELA DE
                  SMARTPHONES.
                </h5>
              </div>
              <div class="col-12 print">
                <p class="print">
                  <b class="print">
                    Em caso de dúvida: entre em contato através do "Fale
                    conosco".
                  </b>
                </p>
                <p>
                  Na hipótese de falsificação, fraude, devolução do produto,
                  inadimplência no pagamento, cancelamento da compra efetuada,
                  pontos acumulados indevidamente, ou falha no Programa de
                  Fidelidade, os pontos utilizados neste resgate serão
                  cancelados e o comprovante será invalidado.
                </p>
              </div>
            </div>
          </div>
        </div>
        <br class="mobile-break" />
        <br class="mobile-break" />
      </div>
    </div>
    <div class="fidelidade">
      <Dialog
        @show="confirmarItem = false"
        modal
        :closable="true"
        :dismissableMask="true"
        v-model:visible="modalResgatarItem"
      >
        <template #header>
          <h3 class="mr-2 mb-0"></h3>
        </template>
        <div v-if="selectedItem != null">
          <div
            v-if="!confirmarItem"
            class="row"
            style="padding:0px; margin:0px"
          >
            <div class="col6">
              <img
                :src="getURL(selectedItem.img_url.substring(15))"
                class="selected-item-img"
              />
            </div>
            <div class="col6">
              <div style="font-size:20px; font-weight: bold" class="col-12">
                {{ selectedItem.nome }}
              </div>
              <div
                style="font-size: 22px; font-weight: bold; color:#1F98A7; padding: 5px 0px"
                class="col-12"
              >
                {{ selectedItem.pontos }} pontos
              </div>
              <div class="col-12">
                <button
                  @click="confirmarItem = true"
                  type="button"
                  class="btn btn-info"
                  style="width: 100%"
                >
                  Resgatar
                </button>
              </div>
              <div
                style="font-size:13px; padding: 5px 0px"
                v-html="selectedItem.descricao_detalhada"
                class="col-12 text-left"
              ></div>
            </div>
            <div
              style="width:95% ; border-top: 1px solid lightGrey; margin: auto; padding: 5px 0px"
            >
              <div>
                <b>Informações adicionais</b>
              </div>
              <span style="color: red; font-size:17px">{{
                selectedItem.info_adicional
              }}</span>
            </div>
          </div>
          <div v-else>
            <div class="row text-left" style="padding:0px; margin:0px">
              <div
                class="col-12 text-center"
                style="font-size: 20px; font-weight:bold; margin-bottom: 22px"
              >
                CONFIRMAÇÃO
              </div>
              <div
                class="col-8 confirmação-text"
                style="font-size: 18px; font-weight:bold; margin-bottom: 10px"
              >
                {{ selectedItem.nome }}
              </div>
              <div
                class="col-4 d-flex align-items-center"
                style="font-size: 18px; font-weight:bold; margin-bottom: 10px; padding-left:18px"
              >
                {{ selectedItem.pontos }}
              </div>
              <div class="col-8 confirmação-text">
                Seus pontos:
              </div>
              <div
                class="col-4"
                style="color: #1F98A7; font-weight:bold; padding-left:18px"
              >
                {{ objToStore.session.aluno.pontos }}
              </div>
              <div class="col-8 confirmação-text">
                Resgate:
              </div>
              <div class="col-4" style="color: red; font-weight:bold">
                -{{ selectedItem.pontos }}
              </div>
              <div class="col-8 confirmação-text" style="padding-bottom: 15px">
                Pontos restantes:
              </div>
              <div
                class="col-4"
                style="color: #1F98A7; font-weight:bold; padding:0px 0px 15px 18px"
              >
                {{ objToStore.session.aluno.pontos - selectedItem.pontos }}
              </div>
              <div
                style="padding: 20px 5px 0px 5px; margin: 5px auto; border-top: 1px solid lightGrey;"
              >
                <button
                  @click="modalResgatarItem = false"
                  type="button"
                  class="btn btn-outline-danger"
                  style="width: 45%"
                >
                  Cancelar
                </button>
                <button
                  @click="
                    modalResgatarItem = false;
                    resgatarItem();
                  "
                  type="button"
                  class="btn btn-info"
                  style="width: 45%; margin-left: 10%"
                >
                  Resgatar
                </button>
              </div>
            </div>
          </div>
        </div>
        <template #footer> </template>
      </Dialog>
    </div>
  </template>
  <template v-else>
    <div class="container">
      <div style="margin: 1rem">
        <img
          :src="require('../assets/dentinho_construção.png')"
          alt=""
          style="height: 230px"
        />

        <h1>Fidelidade em manutenção,</h1>
        <h3>Estará de volta em breve!</h3>
      </div>
    </div>
  </template>

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
        <button @click="modalSair = false" type="button" class="btn btn-danger">
          NÃO
        </button>
      </div>
    </template>
  </Dialog>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Loader from "../components/Loader.vue";
import Dialog from "primevue/dialog";
import Sidebar from "primevue/sidebar";
export default {
  components: {
    Dialog,
    Loader,
    Sidebar,
  },
  data: () => ({
    loading: false,
    selectedItem: null,
    confirmarItem: false,
    modalResgatarItem: false,
    modalSair: false,
    mobileSideBar: false,
    objToStore: { session: {}, shared: {} },
    screen: "produtos",
    charLeft: 350,
    fidelidadeContato: {
      mensagem: "",
      aluno: {},
    },
    produtos: [],
    resgates: [],
    extratos: [],
  }),
  async created() {
    this.loading = true;
    this.getSession();
    if (this.objToStore.session.aluno == null) { this.loading = false; return; }
    await this.get_fidelidade(this.objToStore.session.aluno.cpf);
    if (!this.error) {
      this.produtos = this.fidelidade.produtos;
      this.resgates = this.fidelidade.resgates;
      this.extratos = this.fidelidade.extratos;
    }
    this.loading = false;
  },
  mounted() {},
  computed: {
    ...mapState({
      error: (state) => state.error,
      fidelidade: (state) => state.fidelidade,
      resgate: (state) => state.resgate,
    }),
  },
  methods: {
    ...mapMutations(["set_snackbar", "set_refreshHeader"]),
    ...mapActions([
      "get_logout",
      "get_fidelidade",
      "salvar_resgate",
      "get_resgate",
      "email_fidelidade_contato",
    ]),
    getSession() {
      this.objToStore = this.$LS.get();
      if (this.objToStore.session.aluno == null) {
        this.$router.push({
          name: "inicio",
        });
        return;
      }
      if (this.objToStore.session.aluno.pontos == null)
        this.objToStore.session.aluno.pontos = 0;
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
    async resgatarItem() {
      this.loading = true;
      await this.salvar_resgate({
        produto: this.selectedItem,
        cpf: this.objToStore.session.aluno.cpf,
      });
      if (this.resgate.pontos) {
        this.objToStore.session.aluno.pontos = this.resgate.pontos;
        this.$LS.set(this.objToStore);
        this.resgates.unshift(this.resgate.resgate);
        this.screen = "resgate";
        this.scrollToTop();
      }
      this.loading = false;
    },
    async imprimirEvent(id_resgate) {
      this.loading = true;
      await this.get_resgate(id_resgate);
      this.scrollToTop();
      this.screen = "resgate";
      this.loading = false;
    },
    imprimirPagina() {
      window.print();
    },
    pontosInsuficientes() {
      this.set_snackbar({
        show: true,
        severity: "warn",
        summary: "Atenção!",
        detail: "Você não tem pontos o suficiente para este item.",
        life: 4000,
      });
    },
    async emailFidelidadeContato() {
      this.loading = true;
      this.objToStore = this.$LS.get();
      let tempo = new Date();
      tempo = tempo.getTime();
      if (
        this.objToStore.shared.emailFidelidadeCoolDown == null ||
        tempo > this.objToStore.shared.emailFidelidadeCoolDown + 1800000
      ) {
        this.objToStore.shared.emailFidelidadeCoolDown = tempo;
        this.fidelidadeContato.aluno = this.objToStore.session.aluno;
        await this.email_fidelidade_contato(this.fidelidadeContato);
        if (this.error) {
          this.objToStore.shared.emailFidelidadeCoolDown = null;
        } else {
          this.fidelidadeContato.mensagem = "";
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
              this.objToStore.shared.emailFidelidadeCoolDown + 1800000 - tempo
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
    scrollToTop() {
      document.body.scrollTop = 0; //Safari
      document.documentElement.scrollTop = 0; //Chrome, Firefox, IE e Opera
    },
    countCharLeft() {
      this.charLeft = 350 - this.fidelidadeContato.mensagem.length;
    },
    getURL(img) {
      return require("../assets/" + img);
    },
  },
};
</script>

<style>
.fidelidade .p-dialog-header {
  background: white !important;
  padding: 4px 6px 0px 0px !important;
}
.fidelidade .p-dialog-content {
  max-width: 600px;
  padding: 0px 5px !important;
}
.fidelidade .p-dialog-header-icon {
  color: black !important;
}
.fidelidade .p-dialog-header-icon:hover {
  color: rgb(255, 0, 0) !important;
}
@media print {
  #app :not(.print) {
    display: none;
  }
  .container-comprovante {
    box-shadow: none !important;
  }
  .header-main-div {
    display: none !important;
  }
  .col9 {
    flex: 0 0 auto !important;
    width: 100% !important;
  }
  .col3 {
    flex: 0 0 auto !important;
    width: 0% !important;
  }
  .row {
    margin: 0px auto !important;
  }
}
</style>

<style scoped>
.container-comprovante {
  background: white;
  font-family: Times, "Times New Roman", serif;
  max-width: 700px;
  margin: 25px auto;
  padding: 10px;
  box-shadow: 0px 0px 20px 2px #00000062;
  border-radius: 5px;
}
.dentinho {
  height: 100px;
}
.p-sidebar {
  z-index: 3 !important;
  font-family: "Montserrat";
  color: white !important;
  background-color: #2bbacb !important;
  padding: 10px 5px 3px 0px !important;
  border-left: none !important;
}
.side-bar {
  padding: 80px 5px 0px 5px;
  display: block;
  box-shadow: 0px 0px 15px #00000062;
  height: 100%;
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  overflow-x: hidden;
  width: 25%;
  background: #2bbacb;
  color: white;
}
.mobile-bottom-bar {
  display: none;
  box-shadow: 0px 0px 15px #00000062;
  padding: 5px 0px 7px 0px;
  width: 100%;
  position: fixed;
  z-index: 4;
  bottom: 0px;
  right: 0px;
  overflow-x: hidden;
  background: #2bbacb;
  color: white;
}
.mobile-menu-button {
  transition: all 0.1s;
  font-size: 28px;
}
.mobile-menu-button:active {
  color: #e9d700;
  transform: translate(-3px, 0px);
  font-size: 15px;
}
.side-nav-container {
  max-width: 200px;
  margin: auto;
}
.dentinho-icon {
  height: 80px;
  width: 80px;
  background: white;
  border-radius: 50%;
}
.pontos {
  border-radius: 5px;
  padding: 4px 9px;
  background: #e9d700;
  color: #1994a1;
}
.screen-option {
  cursor: pointer;
  transition: all 0.2s;
  padding: 3px;
  color: white;
}
.screen-option:hover {
  padding: 3px;
  transform: scale(1.3) translate(20px, 0px);
  color: #e9d700;
}
.screen-option:active {
  transition: all 0.1s;
  padding: 3px;
  transform: scale(0.9) translate(0px, 0px);
  color: #f3e97e;
}
.screen-option-active {
  padding: 3px;
  color: #e9d700;
}
.item-img {
  height: 150px;
}
.como-funciona-img {
  width: 100%;
  max-width: 620px;
}
.item {
  border-radius: 10px;
  padding: 20px;
  max-width: 230px;
  background: white;
  margin: 10px;
}
.pergunta {
  margin: 10px 0px 5px 0px;
  font-weight: bold;
  font-size: 18px;
}
.resgates {
  background: white;
  margin: 10px 0px;
  padding: 10px 5px;
  border-radius: 10px;
  color: #1994a1;
  font-weight: bold;
}
.extratos {
  background: white;
  margin: 10px;
  padding: 3px 0px;
  border-radius: 5px;
}
.selected-item-img {
  width: 100%;
  max-width: 266px;
}
.col9 {
  flex: 0 0 auto;
  width: 75%;
}
.col3 {
  flex: 0 0 auto;
  width: 25%;
}
.item-grid {
  display: flex !important;
  justify-content: flex-start;
  align-items: center;
}
.mobile-break {
  display: none;
}
.col6 {
  flex: 0 0 auto;
  width: 50%;
}
.confirmação-text {
  padding-left: 40px;
}
@media only screen and (max-width: 770px) {
  .confirmação-text {
    padding-left: 10px;
  }
  .selected-item-img {
    width: 100px;
  }
  .col6 {
    flex: 0 0 auto;
    width: 100%;
  }
  .mobile-col {
    padding: 0px;
  }
  .extratos {
    font-size: 13px;
  }
  .resgates {
    font-size: 12px;
  }
  .resgates-header {
    font-size: 11px;
  }
  .mobile-btn {
    padding: 5px 1px;
    font-size: 11px;
  }
  .side-bar {
    display: none;
  }
  .mobile-bottom-bar {
    display: block;
  }
  .mobile-break {
    display: block;
  }
  /* TODO: responsividade total */
  .col9 {
    flex: 0 0 auto;
    width: 100%;
  }
  .col3 {
    flex: 0 0 auto;
    width: 0%;
  }
  .item-grid {
    justify-content: center !important;
    align-items: center !important;
  }
}
</style>
