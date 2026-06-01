<template>
  <div class="pagina-listas my-3">
    <Loader v-show="loading"></Loader>
    <!-- if saldao ideia do wolf -->
    <div v-if="semestre.id_semestre != 596" class="container" style="
        width: 90%;
        box-shadow: rgb(0 0 0 / 38%) 0px 0px 20px;
        margin: 5px auto !important;
        border-radius: 10px;
      ">
      <div id="avisos-container">
        <div id="avisos-inside">
          <span id="avisos-span" v-if="semestre.descri_semestre != undefined" style="color: red">
            AVISOS {{ (faculdade.nome_exibicao_faculdade || '').toUpperCase() }} -
            {{ (semestre.descri_semestre || '').toUpperCase() }}</span>
          <div v-for="aviso in avisos" :key="aviso.id_aviso">
            <div v-html="aviso.mensagem_aviso"></div>
          </div>
        </div>
      </div>
      <span v-if="verMaisAvisos != null" @click="toggleAvisos()" class="ver-mais-avisos">
        <span v-if="verMaisAvisos"> Ver mais </span>
        <span v-if="verMaisAvisos == false"> Ver menos </span>
      </span>
    </div>

    <Sidebar :showCloseIcon="false" v-model:visible="sidebarCarrinho" position="right">
      <div class="sidenav-container">
        <div class="sidenav-lista-container">
          <div class="row" style="margin: 0px 0px 17px 0px" v-for="lista in objToStore.session.carrinho.listas"
            :key="lista.id_lista">
            <div :title="(lista.nome_exibi_lista || '').toUpperCase()" style="
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow-x: hidden;
              " class="col-12">
              {{ (lista.nome_exibi_lista || '').toUpperCase() }}
            </div>
            <div style="font: size 0.7rem">
              Itens selecionados:
              <span v-if="lista.qtdItemsSelecionadosLista != null" style="font-weight: bold" class="ml-1 pl-1">
                {{ lista.qtdItemsSelecionadosLista }} </span><span v-else style="font-weight: bold" class="ml-1 pl-1">
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
            <div @click="removeCarrinho(lista)" class="remove-lista-btn col-6 text-left">
              Remover
            </div>
          </div>
        </div>
        <div style="border-top: 1px solid LightGrey; padding: 5px" class="text-center ; mb-2">
          <span v-if="objToStore.session.carrinho.listas.length > 0 && semestre.id_semestre != 596">
            {{
              (objToStore.session.carrinho.faculdade.nome_exibicao_faculdade || '').toUpperCase()
            }}
            <br />
            {{
              (objToStore.session.carrinho.semestre.descri_semestre || '').toUpperCase()
            }}
          </span>
          <span v-if="objToStore.session.carrinho.listas.length == 0 && semestre.id_semestre != 596">
            {{ (faculdade.nome_exibicao_faculdade || '').toUpperCase() }} <br />
            {{ (semestre.descri_semestre || '').toUpperCase() }}
          </span>
        </div>
        <span style="font-weight: bold">ITENS SELECIONADOS: </span> <br />
        <span v-if="objToStore.session.carrinho.qtdItemsSelecionados > 0">
          {{ objToStore.session.carrinho.qtdItemsSelecionados }}</span>
        <span v-else> 0</span>
        <br />
        <span style="font-weight: bold">VALOR TOTAL:</span> <br />

        <span class="lista-preco" style="font-size: 18px; color: #2bbacb;">
          <span v-if="
            objToStore.session.carrinho.listas[0].semestre_pagamentos[0]
              .desconto_pix != 0
          ">
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
          <span v-else style="font-weight: 800; font-size: 16px; margin-right: 4px;">{{
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(objToStore.session.carrinho.totalCarrinho)
          }}
            à vista</span>
        </span>
        <br />
        <div class="text-center mt-2 botoes-carrinho-sidenav">
          <button @click="sidebarCarrinho = !sidebarCarrinho" type="button" class="btn btn-danger mr-2 sidenav-button">
            VOLTAR
          </button>
          <button v-if="
            objToStore.session.carrinho.listas.length > 0 &&
            objToStore.session.carrinho.totalCarrinho > 0
          " @click="
              brindeTab = 0;
            loginEvent();
            " type="button" class="btn btn-success ; sidenav-button">
            AVANÇAR
          </button>
          <button v-else @click.stop="
            snackbar(
              'Seu carrinho está vazio, não é possivel avançar.',
              '#e1ad01'
            )
            " style="background-color: black" type="button" class="btn btn-dark ; sidenav-button">
            AVANÇAR
          </button>
        </div>
      </div>
    </Sidebar>

    <div id="imgBackDrop" class="imgBackDrop row">
      <div class="col-12 row">
        <div class="col-12">
          <img style="border: 1px solid LightGrey; border-radius: 10px" :src="img" alt="item" class="imagem" />
        </div>
        <div style="
            box-shadow: 0 0 1em 9px #0000008f;
            background: #0000007a;
            color: white;
          " class="col-12 mb-3 mt-4">
          <h4 class="m-0">{{ imgTitulo }}</h4>
        </div>
        <div class="col-12 mt-2">
          <button @click="closeImg()" type="button" class="btn btn-danger">
            FECHAR
          </button>
        </div>
      </div>
    </div>

    <Accordion :multiple="true" @click="nextStepIf(1)" v-model:activeIndex="accordionAberto">
      <AccordionTab :disabled="lista.status_lista == '0' && !ip_liberado" class="mobile-text" v-for="lista in listas"
        :key="lista.id_lista">
        <template #header>
          <div class="row" style="flex: 1 0 calc(100% - 24px)">
            <div class="col-8 text-left">
              <div class="row">
                <div class="col-12">
                  <span class="lista-nome">{{ lista.nome_exibi_lista }} </span>
                </div>
                <!-- if saldao ideia do wolf -->
                <div v-if="semestre.id_semestre != 596" class="col-12">
                  <span class="lista-preco">
                    <span v-if="lista.semestre_pagamentos[0].desconto_pix != 0">
                      de
                      <span class="preco-original">
                        {{
                          new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(lista.valor_total_lista)
                        }}
                      </span>
                      por
                      <span class="preco-final">{{
                        new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(
                          lista.valor_total_lista -
                          (lista.valor_total_lista *
                            lista.semestre_pagamentos[0].desconto_pix) /
                          100
                        )
                      }}
                        (Pix/Boleto)</span>
                    </span>
                    <span v-else>
                      <span class="preco-final">{{
                        new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(lista.valor_total_lista)
                      }}
                        à vista</span>
                    </span>
                  </span>
                </div>
                <!-- if saldao ideia do wolf -->
                <div v-if="semestre.id_semestre != 596" class="col-12">
                  <div v-if="lista.status_lista == '0'" style="color: yellow" class="lista-preco">
                    <span>AGUARDANDO LISTA OFICIAL</span>
                  </div>
                </div>
                <div class="col-12">
                  <span class="lista-itens">
                    Itens selecionados:
                    <span v-if="lista.qtdItemsSelecionadosLista != null" style="font-weight: bold">
                      {{ lista.qtdItemsSelecionadosLista }} </span><span v-else style="font-weight: bold">
                      {{ lista.total_itens_lista }}
                    </span>
                  </span>
                </div>
                <div class="col-12">
                  <span style="font-size: 11px; font-weight: normal">
                    clique para expandir/recolher
                  </span>
                </div>
              </div>
            </div>
            <div class="col-4 d-flex align-items-center justify-content-end">
              <div class="lista-button">
                <button :disabled="lista.status_lista == '0' && !ip_liberado" class="btn btn-success btn-sm"
                  style="color: white; border-radius: 10px; border-style: solid"
                  v-if="!lista.estaNoCarrinho && lista.valor_total_lista > 0" @click.stop="addCarrinho(lista)">
                  Adicionar
                </button>
                <button class="btn btn-dark btn-sm" v-if="!lista.estaNoCarrinho && lista.valor_total_lista <= 0"
                  @click.stop="
                    snackbar(
                      lista.nome_exibi_lista +
                      ' não contem itens selecionados e não pode ser adicionada ao carrinho!',
                      '#e1ad01'
                    )
                    ">
                  Adicionar
                </button>
                <button class="btn btn-danger btn-sm" style="color: white; border-radius: 10px"
                  v-if="lista.estaNoCarrinho" @click.stop="removeCarrinho(lista)">
                  Remover
                </button>
              </div>
            </div>
          </div>
        </template>
        <!-- Campo de busca apenas para semestre 596 -->
        <div v-if="semestre.id_semestre == 596" class="search-container mb-3">
          <div class="input-group">
            <input v-model="searchTerms[lista.id_lista]" @input="filterItems(lista)" type="text" class="form-control"
              placeholder="Buscar produto..." style="border-radius: 20px 0 0 20px;" />
            <div class="input-group-append">
              <button @click="clearSearch(lista.id_lista)" class="btn btn-outline-secondary" type="button"
                style="border-radius: 0 20px 20px 0;">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          <small v-if="searchTerms[lista.id_lista]" class="text-muted">
            Mostrando {{ getFilteredItems(lista).length }} de {{ lista.items.length }} produtos
          </small>
        </div>
        <table @click="lista.mostrar_completa ? (modalListaCompleta = true) : null" class="table-size"
          :id="'Table' + lista.id_lista" style="width: 100%; font-family: 'Montserrat'">
          <tr>
            <td colspan="4" class="responsive-table-header">
              <div v-if="!lista.mostrar_completa" class="row">
                <div style="justify-content: flex-start; !important" class="col5expand responsive-align">
                  <div v-if="checkIfMarcas(lista)">
                    <button @click="
                      tour.isActive()
                        ? snackbar(
                          'Esta função não está disponivel durante o Guia.',
                          '#e1ad01'
                        )
                        : callListaEconomic(lista)
                      " type="button" class="btn-warning lista-reset-button my-1" v-if="lista.economica">
                      Marcas: Sugeridas
                    </button>

                    <button @click="
                      tour.isActive()
                        ? snackbar(
                          'Esta função não está disponivel durante o Guia.',
                          '#e1ad01'
                        )
                        : callListaEconomic(lista)
                      " type="button" class="btn-warning lista-reset-button my-1" v-else>
                      Marcas: Econômicas
                    </button>
                  </div>
                </div>
                <div class="col responsive-align">
                  <button @click="
                    tour.isActive()
                      ? snackbar(
                        'Esta função não está disponivel durante o Guia.',
                        '#e1ad01'
                      )
                      : callListaReset(lista)
                    " v-if="lista.listaAlterada" type="button" class="btn btn-danger lista-reset-button my-1">
                    Resetar lista
                  </button>
                  <button v-else @click="
                    snackbar(
                      lista.nome_exibi_lista + ' já está padrão',
                      '#e1ad01'
                    )
                    " type="button" class="btn btn-dark lista-reset-button my-1">
                    Resetar lista
                  </button>
                </div>
                <div class="col5expand">
                  <span v-if="lista.allItemsSelected"> Desmarcar todos </span>
                  <span v-else> Marcar todos </span>
                  <input v-model="lista.allItemsSelected" @click="selecionarTodos(lista)" class="form-check-input ml-2"
                    type="checkbox" value="" id="flexCheckDefault" />
                </div>
              </div>
            </td>
          </tr>
          <tr style="
              color: white;
              background-color: #1f9baa;
              border-style: solid;
              border-top-style: none;
              border-color: #1f9baa !important;
            ">
            <th class="text-center"></th>
            <th style="text-align: start !important" class="text-center">
              Descrição
            </th>
            <!-- if saldao ideia do wolf -->
            <th v-if="semestre.id_semestre != 596" class="text-center">Marcas</th>
            <th v-else class="text-center">Valor</th>
            <th class="text-center">Quantidade</th>
          </tr>
          <tbody class="striped-table" style="border-color: lightgrey; !imporant"
            v-for="item in getFilteredItems(lista)" :key="item.descri_item">
            <tr v-if="item.opcional_item == '1' && semestre.id_semestre != 596">
              <td class="materiais-opcionais" colspan="4" v-if="itemsOpcionais(listas.indexOf(lista), item)">
                <span class="mobile-text">MATERIAIS OPCIONAIS!</span>
              </td>
            </tr>
            <tr :class="'tabela ; ' + itemRemovido(item)">
              <td v-if="item.outros_item == '0'" style="border-left-style: solid">
                <img :style="itemIndisponivel(item) + ';'" class="img-preview" @mouseenter="
                  item.selectedMarca.image_path && item.status_image
                    ? openImg($event, item)
                    : null
                  " @mouseleave="
                    item.selectedMarca.image_path && item.status_image
                      ? openImg($event, item)
                      : null
                    " :src="item.selectedMarca.image_path && item.status_image
                      ? 'https://academicosolident.com.br/img/' +
                      item.selectedMarca.image_path
                      : getURL('placeholder.png')
                    " alt="equipamento dental" />
                <OverlayPanel :ref="'openImg' + item.id_item">
                  <img :src="img" alt="Nature Image" class="overlay-panel-img" />
                </OverlayPanel>
              </td>
              <td :colspan="itemTituloColspan(item)" :style="itemtitulocenter(item)">
                <span class="mobile-text" :style="itemIndisponivel(item)">{{ item.descri_item }}
                </span>
                <br v-if="
                  item.outros_item == '0' &&
                  item.selectedMarca.nome_marca != ''
                " />
                <span class="mobile-text" v-if="item.outros_item == '0'"
                  :style="'color: green;' + itemIndisponivel(item)">{{
                    item.selectedMarca.nome_marca }}</span>
                <br v-if="item.outros_item == '0' && item.obs_item != ''" />
                <span class="mobile-text obs" v-if="item.outros_item == '0'" style="color: red">{{ item.obs_item
                  }}</span>
                <br v-if="
                  (item.saldoControlado != undefined &&
                    item.saldoControlado != 0) ||
                  item.saldoControlado == 0
                " />
                <div v-if="
                  item.saldoControlado != undefined &&
                  item.saldoControlado != 0
                "
                  style="background: #f6f5c3; display: inline-block; padding: 2px 5px; border-radius: 5px; color: #8b6822; border: 1px solid #8b6822; text-decoration: none !important;">
                  <i class="fas fa-exclamation-circle mr-1"></i>
                  <b>ESTOQUE LIMITADO</b>
                </div>
                <div v-else-if="
                  item.saldoControlado != undefined &&
                  item.saldoControlado == 0
                "
                  style="background: #f6f5c3; display: inline-block; padding: 2px 5px; border-radius: 5px; color: #8b6822; border: 1px solid #8b6822; text-decoration: none !important;">
                  <i class="fas fa-exclamation-circle mr-1"></i>
                  <b>SEM ESTOQUE</b>
                </div>
              </td>
              <!-- if saldao ideia do wolf -->
              <td v-if="item.outros_item == '0' && semestre.id_semestre != 596">
                <div v-if="item.kit_item == 1" class="mb-1">
                  <button :disabled="item.disponivel_item == '0'" style="background-color: rgb(38, 182, 199)"
                    type="button" class="btn btn-info ; mobile-button text-center" @click="getKitItem(item.id_item)">
                    Conteúdo Kit
                  </button>
                </div>
                <div v-if="item.marcas.length > 1" class="dropdown">
                  <button :id="'botao-marcas-' + item.id_item" v-if="
                    !lista.mostrar_completa ||
                    (lista.mostrar_completa &&
                      item.marcas[0].status_marca == '2') ||
                    item.marcas[0].status_marca == '3'
                  " :disabled="item.disponivel_item == '0'" class="btn btn-success dropdown-toggle mobile-button"
                    type="button" data-toggle="dropdown" aria-expanded="false">
                    <span v-if="item.marcas[0].status_marca == '2'">
                      Tamanho
                    </span>
                    <span v-else-if="item.marcas[0].status_marca == '3'">
                      Cores
                    </span>
                    <span v-else> Marcas </span>
                  </button>

                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li v-for="marca in item.marcas" :key="marca.cod_marca">
                      <a @click.stop="
                        item.selectedMarca = marca;
                      valorLista(lista);
                      marcaAlterada(item);
                      " class="dropdown-item ; pointer ;" :style="marcaSelecionada(marca.id_marca, item)">{{
                        marca.nome_marca }}
                        <i style="color: #51705d" v-if="marca.id_marca == item.selectedMarca.id_marca"
                          class="fas fa-check mobile-text"></i>
                        <!-- && !item.trocarMarca -->
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
              <td v-else-if="item.outros_item == '0'">
                {{ new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(item.selectedMarca.valor_marca)
                }}
              </td>
              <td @click="
                item.disponivel_item == '0'
                  ? snackbar('Este item não esta disponivel!', '#e1ad01')
                  : null
                " v-if="item.outros_item == '0'" style="border-right-style: solid">
                <input v-if="!lista.mostrar_completa && !item.trava_qtd_item" class="m-2; input-qtd"
                  :disabled="item.disponivel_item == '0'" @change="
                    minMaxQtdItem(item);
                  valorLista(lista);
                  " type="number" v-model="item.qtd_item" />
                <div class="qtd-item-div" :class="lista.mostrar_completa ? '' : 'text-left'" v-else>
                  {{ item.qtd_item }}
                </div>
                <input v-if="!lista.mostrar_completa" :disabled="item.disponivel_item == '0' || lista.mostrar_completa
                  " @click="
                    checkboxClick(item);
                  valorLista(lista);
                  " type="checkbox" v-model="item.selected" class="form-check-input ; m-2" />
              </td>
            </tr>
          </tbody>
        </table>
      </AccordionTab>
    </Accordion>

    <!-- if saldao ideia do wolf -->
    <Sidebar v-if="semestre.id_semestre != 596" position="top" id="sidebar-brindes" v-model:visible="sidebarBrindes">
      <Carousel indicatorsContentClass="brinde-indicators" :numVisible="brindes.length >= 4 ? 4 : brindes.length"
        :numScroll="1" :value="brindes" :responsiveOptions="[
          {
            breakpoint: '1100px',
            numVisible: brindes.length >= 3 ? 3 : brindes.length,
            numScroll: 1,
          },
          {
            breakpoint: '750px',
            numVisible: brindes.length >= 2 ? 2 : brindes.length,
            numScroll: 1,
          },
          {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1,
          },
        ]">
        <template #header>
          <h5 style="color: blueviolet;">BRINDES</h5>
        </template>
        <template #item="slotProps">
          <div class="brinde-item" :style="slotProps.data.desbloqueado
              ? 'border-color: rgb(40, 167, 69)'
              : 'border-color: rgb(255 0 0); opacity: 0.7;'
            ">
            <div v-if="slotProps.data.desbloqueado" class="badge-desbloqueio">
              <i class="fas fa-check"></i>
            </div>
            <div v-else class="badge-bloqueado">
              <i class="fas fa-times"></i>
            </div>
            <div>
              <img @click="
                brindeImg = slotProps.data.item.img_path;
              modalBrindeImg = true;
              " class="brinde-image" :src="'https://academicosolident.com.br/img/' +
                  slotProps.data.item.img_path
                  " :alt="slotProps.data.item.descricao_site" srcset="" />
              <h4 style="color: #2bbacb;" class="brinde-titulo">
                {{ slotProps.data.item.descricao_site }}
              </h4>
            </div>

            <div class="brinde-item-msg">
              <span v-html="slotProps.data.item.observacao"></span>
            </div>
            <div style="color: blueviolet;
    font-weight: 500;">
              Compras acima de:
              {{
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(slotProps.data.valor)
              }}
            </div>
          </div>
        </template>
      </Carousel>
      <span style="font-weight: 500;">
        <u>
          A Dental Solident reserva-se o direito de alterar os valores e
          condições sem aviso prévio.
          <br />
          Todos os brindes estão sujeitos à confirmação da disponibilidade em
          nosso estoque.</u>
      </span>
    </Sidebar>

    <nav id="bottom-navbar" class="navbar fixed-bottom navbar-light bg-light"
      v-if="objToStore.session.carrinho != null">
      <div style="color: black; padding: 0px 0px; width: 95%" class="container-fluid ; bottom-nav-text ;">
        <div class="row ; d-flex align-items-center">
          <div class="col-5">
            <div class="text-left">
              <!-- if saldao ideia do wolf -->
              <div v-if="semestre.id_semestre != 596" @click="openSideBrinde()" class="vert-pb-container">
                <div class="badge-brinde" :style="brindesDesbloqueados > 0
                    ? 'background: rgb(40, 167, 69)'
                    : 'background: rgb(161, 160, 160)'
                  ">
                  <div id="snackbarBrinde">
                    {{ tooltipBrindeText }}
                  </div>
                  <i class="fas fa-gift"></i>
                  <div v-if="brindesDesbloqueados > 0" class="brindes-counter">
                    {{ brindesDesbloqueados }}
                  </div>
                </div>
                <div class="vert-pb-back">
                  <div class="vert-pb-no-overflow">
                    <div v-for="brinde in brindes" :key="brinde.id" :style="'height: ' +
                      (brinde.valor / brindes[brindes.length - 1].valor) *
                      100 +
                      '% !important'
                      " class="vert-pb-tier">
                      <div class="confetti-target"></div>
                    </div>
                  </div>
                  <div class="vert-pb-overflow">
                    <div class="vert-pb-value" :style="'height: ' + brindeProgressBar + '% !important'"></div>
                  </div>
                </div>
              </div>
              <span v-if="objToStore.session.carrinho.listas.length > 0 && semestre.id_semestre != 596">
                {{
                  (objToStore.session.carrinho.faculdade.nome_exibicao_faculdade || '').toUpperCase()
                }}
                <br />
                {{
                  (objToStore.session.carrinho.semestre.descri_semestre || '').toUpperCase()
                }}
              </span>
              <span v-if="objToStore.session.carrinho.listas.length == 0 && semestre.id_semestre != 596">
                {{ (faculdade.nome_exibicao_faculdade || '').toUpperCase() }} <br />
                {{ (semestre.descri_semestre || '').toUpperCase() }}
              </span>
              <!-- if saldao ideia do wolf -->
              <br v-if="semestre.id_semestre != 596" />
              <span v-if="objToStore.session.carrinho.listas.length > 0" class="lista-preco"
                style="font-size: 18px; color: #2bbacb;">
                <span v-if="
                  objToStore.session.carrinho.listas[0].semestre_pagamentos[0]
                    .desconto_pix != 0
                ">
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
                <span v-else style="font-weight: 800; font-size: 18px; margin-right: 4px;">{{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(objToStore.session.carrinho.totalCarrinho)
                }}
                  à vista</span>
              </span>

              <br />
              <span>ITENS:
                <span v-if="objToStore.session.carrinho.qtdItemsSelecionados > 0" style="font-weight: bold">
                  {{ objToStore.session.carrinho.qtdItemsSelecionados }}</span>
                <span v-else style="font-weight: bold"> 0</span></span>
            </div>
          </div>
          <div class="col-2 d-flex justify-content-center">
            <div class="row">
              <div class="col-12">
                <div :style="objToStore.session.carrinho.listas.length > 0
                    ? ''
                    : 'border-color:black'
                  " id="botao-carrinho" class="carrinho-centro">
                  <div v-if="objToStore.session.carrinho.listas.length > 0" @click="openNav()">
                    <div>
                      <i style="color: #28a745" class="fas fa-shopping-cart fa-lg ; mobile-cart"></i>
                      <span class="badge rounded-pill bg-success pointer">
                        {{ objToStore.session.carrinho.listas.length }}
                      </span>
                    </div>
                  </div>
                  <div @click.stop="
                    snackbar(
                      'Seu carrinho está vazio e não pode ser aberto.',
                      '#e1ad01'
                    )
                    " v-else>
                    <i style="transform: translateX(-3px)" class="fas fa-shopping-cart fa-lg ; mobile-cart"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-5 ; text-right ; d-flex justify-content-end">
            <div>
              <div v-if="ajudaVisible" id="ajuda-container" @click.stop="callTour()">
                <div @click.stop="closeAjuda()" id="ajuda-close">
                  <i class="fas fa-times"></i>
                </div>
                <img class="ajuda-img" :src="getURL('dentinho-ajuda-teste-balaov3.png')" alt="" />
              </div>
              <div style="position: relative; height: 0px" v-else-if="!tour.isActive()">
                <div id="minimized-ajuda" @click="restoreAjuda()">
                  <span>Precisa de ajuda?</span>
                </div>
              </div>

              <button id="botao-avancar-login" @click="
                brindeTab = 0;
              loginEvent();
              " v-if="
                  objToStore.session.carrinho.listas.length > 0 &&
                  objToStore.session.carrinho.totalCarrinho > 0
                " type="button" class="btn btn-success mobile-button">
                <span class="mobile-text">AVANÇAR</span>
              </button>
              <button @click.stop="
                snackbar(
                  'Seu carrinho está vazio, adicione pelo menos uma lista para poder avançar.',
                  '#e1ad01'
                )
                " v-else style="background-color: #000000; cursor: default" type="button"
                class="btn btn-dark mobile-button">
                <span class="mobile-text">AVANÇAR</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div class="d-flex flex-row justify-content-center">
      <div id="snackbar">
        {{ tooltipText }}
      </div>
    </div>

    <Dialog style="width: 700px" modal closeOnEscape dismissableMask :closable="true" v-model:visible="modalKit">
      <template #header>
        <h3 class="mr-2 mb-0">Conteúdo do Kit!</h3>
      </template>
      <div class="modal-body mobile-text" style="padding: 2px 5px 0px 5px">
        <div style="border-bottom: 1px solid LightGrey" class="row p-1 d-flex align-items-center"
          v-for="item in kit_item" :key="item.id">
          <div class="col-2">
            <!-- colocacr imagem dos items dentro do kit item -->
            <img class="pointer" :src="getURL('placeholder.png')" alt="kit" height="30" width="30 " />
          </div>
          <div class="col-8 text-left">
            <span style="font-weight: bold">Descrição: </span>
            {{ item.descri_kit }}
          </div>
          <div class="col-2 text-left">
            <span style="font-weight: bold">QTD: </span>
            {{ item.qtd_kit }}
          </div>
        </div>
      </div>
      <template #footer>
        <div class="text-center">
          <button style="width: 7rem; text-align: center !important" @click="modalKit = false" type="button"
            class="btn btn-info">
            OK
          </button>
        </div>
      </template>
    </Dialog>

    <Dialog style="width: 300px" modal :closable="true" v-model:visible="modalCarrinhoSemestre">
      <template #header>
        <h3 class="mr-2 mb-0">AVISO!</h3>
      </template>
      <span>Você já possui listas de outro semestre ou faculdade no carrinho,
        deseja descarta-la(s) para adicionar esta?<br /></span>
      <template #footer>
        <div class="d-flex justify-content-center">
          <button style="height: 45px; width: 80px; font-size: 18px" type="button"
            class="btn btn-danger m-1 ; text-center ;" @click="modalCarrinhoSemestre = false">
            NÃO
          </button>
          <button style="height: 45px; width: 80px; font-size: 18px" @click="
            modalCarrinhoSemestre = false;
          limparCarrinho();
          addCarrinho(listaOnHold);
          snackbar(
            listaOnHold.nome_exibi_lista + ' adicionada!',
            '#007FFF'
          );
          " type="button" class="btn btn-success m-1 ; text-center ;" data-dismiss="modal">
            SIM
          </button>
        </div>
      </template>
    </Dialog>

    <Dialog style="width: 300px" modal :closable="true" v-model:visible="modalListaEconomic">
      <template #header>
        <h3 class="mr-2 mb-0">AVISO!</h3>
      </template>
      <span>Tem certeza que deseja trocar as
        <b v-if="listaEconomic.economica">
          <u style="color:red"> Marcas Sugeridas pelas Marcas Econômicas</u>
          de todos os produtos que possuem opção de marca?</b>
        <b v-else>
          <u style="color:red">Marcas Econômicas pelas Marcas Sugeridas</u>
          de todos os produtos que possuem opção de marca?</b>
        <br /></span>
      <template #footer>
        <div class="d-flex justify-content-center">
          <button style="height: 45px; width: 80px; font-size: 18px" type="button"
            class="btn btn-danger m-1 ; text-center ;" @click="modalListaEconomic = false">
            NÃO
          </button>
          <button style="height: 45px; width: 80px; font-size: 18px" @click="
            modalListaEconomic = false;
          setMarcasListaEconomica(listaEconomic);
          snackbar('Troca efetuada!', '#007FFF');
          " type="button" class="btn btn-success m-1 ; text-center ;">
            SIM
          </button>
        </div>
      </template>
    </Dialog>

    <Dialog style="width: 300px" modal :closable="true" v-model:visible="modalListaReset">
      <template #header>
        <h3 class="mr-2 mb-0">AVISO!</h3>
      </template>
      <span>Tem certeza que deseja restaurar esta lista ao padrão?
        <b> você perderá qualquer mudança feita nela.</b><br /></span>
      <template #footer>
        <div class="d-flex justify-content-center">
          <button style="height: 45px; width: 80px; font-size: 18px" type="button"
            class="btn btn-danger m-1 ; text-center ;" @click="modalListaReset = false">
            NÃO
          </button>
          <button style="height: 45px; width: 80px; font-size: 18px" @click="
            modalListaReset = false;
          listaOriginal(listaReset);
          snackbar(
            listaReset.nome_exibi_lista + ' Restaurada ao padrão!',
            '#007FFF'
          );
          " type="button" class="btn btn-success m-1 ; text-center ;">
            SIM
          </button>
        </div>
      </template>
    </Dialog>

    <Dialog style="width: 300px" modal :closable="false" v-model:visible="modalListasAlteradas">
      <template #header>
        <h3 class="mr-2 mb-0">ATENÇÃO!</h3>
      </template>
      <span>
        Listas deste semestre foram alteradas, seu carrinho foi descartado.
        <br />
        Por favor refaça seu pedido.
      </span>
      <template #footer>
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-info" @click="modalListasAlteradas = false">
            OK!
          </button>
        </div>
      </template>
    </Dialog>

    <Dialog style="width: 300px" modal :closable="true" v-model:visible="modalTour">
      <template #header>
        <h3 class="mr-2 mb-0">ATENÇÃO!</h3>
      </template>
      <span>
        Para iniciar esta parte do Guia precisamos limpar seu carrinho, tem
        certeza que deseja continuar?
      </span>
      <template #footer>
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-danger" @click="modalTour = false">
            Não!
          </button>
          <button type="button" class="btn btn-success" data-dismiss="modal" @click="
            modalTour = false;
          limparCarrinho();
          iniciarTour();
          ">
            Sim!
          </button>
        </div>
      </template>
    </Dialog>

    <Dialog style="width: 300px" modal :closable="true" v-model:visible="modalListaCompleta">
      <template #header>
        <h3 class="mr-2 mb-0">ATENÇÃO!</h3>
      </template>
      <span>
        Não é possivel alterar esta lista, caso deseje algum material
        separadamente, entre em contato conosco.
      </span>
      <template #footer>
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-info" @click="modalListaCompleta = false">
            Ok
          </button>
        </div>
      </template>
    </Dialog>

    <Dialog style="max-width: 550px" modal dismissableMask closeOnEscape :closable="true" v-model:visible="modalLogado">
      <template #header>
        <h3 class="mr-2 mb-0">Resumo do Pedido!</h3>
      </template>
      <div v-if="
        objToStore.session.carrinho.listas.length > 0 &&
        objToStore.session.aluno != null
      " class="row mobile-text">
        <div class="col-12">
          <span style="font-weight: bold">Olá, {{ objToStore.session.aluno.nome }}!</span>
        </div>
        <!-- if saldao ideia do wolf -->
        <div v-if="semestre.id_semestre != 596" class="col-6 text-center pr-3 mt-2"
          style="border-right: 1px solid LightGrey; font-weight: bold">
          {{
            (objToStore.session.carrinho.faculdade.nome_exibicao_faculdade || '').toUpperCase()
          }}
        </div>
        <!-- if saldao ideia do wolf -->
        <div v-if="semestre.id_semestre != 596" class="col-6 text-center pl-3 mt-2" style="font-weight: bold">
          {{
            (objToStore.session.carrinho.semestre.descri_semestre || '').toUpperCase()
          }}
        </div>
        <div class="col-12 mt-2" style="font-weight: bold">
          LISTAS SELECIONADAS:
        </div>
        <div v-for="lista in objToStore.session.carrinho.listas" :key="lista.id_lista"
          class="col-12 mt-2 px-3 text-left">
          {{ lista.nome_exibi_lista }}
        </div>
        <div class="col-12 mt-2">
          <span style="font-weight: bold"> TOTAL DO PEDIDO: </span> <br />
          <span class="lista-preco" style="font-size: 18px; color: #2bbacb;">
            <span v-if="
              objToStore.session.carrinho.listas[0]
                .semestre_pagamentos[0].desconto_pix != 0
            ">
              <span style="color: #888; text-decoration: line-through; font-size: 16px; margin-right: 4px;">{{
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(objToStore.session.carrinho.totalCarrinho)
              }}</span>
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
            <span v-else>
              {{
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(objToStore.session.carrinho.totalCarrinho)
              }} à vista
            </span>

          </span>
        </div>
        <div class="col-12 mt-2 pb-2 mb-2" style="border-bottom: 1px solid LightGrey">
          <span style="font-weight: bold"> ITENS SELECIONADOS: </span>{{
            objToStore.session.carrinho.qtdItemsSelecionados }}
        </div>
        <div class="col-12 text-left">
          <span style="font-weight: bold">Periodo:</span>
          <select v-model="logadoInfo.periodo" class="form-select ; mb-3" @change="getRepresentantes()">
            <option selected disabled :value="0">Selecione...</option>
            <option v-for="periodo of objToStore.session.carrinho.semestre.periodos" :key="periodo.id_periodo"
              :value="periodo">
              {{ periodo.nome_periodo }}
            </option>
          </select>
        </div>
        <div class="col-12 text-left">
          <span style="font-weight: bold"> Representante: </span>
          <select v-model="logadoInfo.contato" :disabled="logadoInfo.periodo == 0" class="form-select ; mb-3">
            <option selected disabled v-if="logadoInfo.periodo == 0" :value="0">
              Selecione um periodo.
            </option>
            <option selected disabled v-else :value="0">
              Selecione um representante.
            </option>
            <option v-for="representante of representantes" :key="representante.id_representante"
              :value="representante">
              {{ representante.nome_representante }}
            </option>
          </select>
        </div>
      </div>
      <template #footer>
        <div class="d-flex justify-content-center">
          <button disabled class="btn btn-dark" v-if="logadoInfo.periodo == 0 || logadoInfo.contato == 0">
            Ir para o pagamento!
          </button>
          <button v-else style="background-color: #2bbacb" type="button" class="btn btn-info" @click="
            modalLogado = false;
          doLogin();
          ">
            Ir para o pagamento!
          </button>
        </div>
      </template>
    </Dialog>

    <Dialog style="width: 340px" :closeOnEscape="false" :dismissableMask="false" :closable="true" modal
      v-model:visible="modalUpdateInfo" class="slim-footer">
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
          <input v-model="objToStore.session.aluno.email" type="text" class="form-control" autocomplete="none" />
        </div>

        <span>Celular</span>
        <div class="input-group mb-2">
          <input v-model="objToStore.session.aluno.celular" type="tel" v-mask="'## #####-####'" class="form-control"
            autocomplete="none" />
        </div>

        <span>Telefone</span>
        <div class="input-group mb-2">
          <input v-model="objToStore.session.aluno.telefone" type="tel" v-mask="'## ####-####'" class="form-control"
            autocomplete="none" />
        </div>

        <span v-if="!TemNascimento">data de nascimento</span>
        <div v-if="!TemNascimento" class="input-group mb-2">
          <input v-mask="'##/##/####'" v-model="objToStore.session.aluno.nascimento" placeholder="00/00/0000" type="tel"
            class="form-control" autocomplete="none" />
        </div>
      </div>

      <template #footer>
        <div class="container d-flex justify-content-center">
          <button :class="objToStore.session.aluno.email.trim().length < 5 ||
              objToStore.session.aluno.celular.trim().length < 12 ||
              objToStore.session.aluno.telefone.trim().length < 11 ||
              objToStore.session.aluno.nascimento.trim().length < 10
              ? 'disabled-content'
              : ''
            " :disabled="objToStore.session.aluno.email.trim().length < 5 ||
              objToStore.session.aluno.celular.trim().length < 12 ||
              objToStore.session.aluno.telefone.trim().length < 11 ||
              objToStore.session.aluno.nascimento.trim().length < 10
              " style="width: 100%; margin: 0px 0px 10px 0px !important" @click="updateAluno()" type="button"
            class="btn btn-info text-center">
            Atualizar
          </button>
        </div>
      </template>
    </Dialog>

    <Dialog style="max-width: 800px" modal class="brinde-modal" :closable="true" v-model:visible="modalEscolherBrinde">
      <template #header>
        <h3 class="mr-2 mb-0">Brindes adquiridos</h3>
      </template>
      <TabView v-model:activeIndex="brindeTab">
        <TabPanel v-for="(brinde, index) in brindes" :key="brinde.id" :disabled="!brinde.desbloqueado">
          <template #header>
            <span>{{ "Brinde " + (index + 1) }}</span>
            <div class="badge-desbloqueio" :style="brinde.desbloqueado
                ? index == brindeTab
                  ? 'background: rgb(40, 167, 69)'
                  : 'background: #6c757d'
                : 'background: rgb(161, 160, 160)'
              ">
              <i v-if="brinde.desbloqueado" class="fas fa-check"></i>
              <i v-else class="fas fa-times"></i>
            </div>
          </template>
          <div class="row">
            <div class="col-12 mb-1">Você ganhou um brinde!</div>

            <div class="col-12">
              <h5>
                {{ brinde.item.descricao_site }}
              </h5>
            </div>
            <div class="col-12">
              <img @click="
                brindeImg = brinde.item.img_path;
              modalBrindeImg = true;
              " class="brinde-image" :src="'https://academicosolident.com.br/img/' + brinde.item.img_path
                  " :alt="brinde.item.descricao_site" srcset="" />
            </div>
          </div>

          <div class="mt-2 d-flex justify-content-center">
            <button type="button" :class="'btn btn-' +
              (brindeTab != brindesDesbloqueados - 1
                ? 'primary'
                : 'success')
              " @click="
                brindeTab++;
              loginEvent();
              ">
              Confirmar
            </button>
          </div>
        </TabPanel>
      </TabView>
      <template #footer> </template>
    </Dialog>

    <Dialog class="brinde-modal-img" dismissableMask modal closeOnEscape v-model:visible="modalBrindeImg">
      <!-- brindeImg -->
      <img style="
          border-radius: 5px;
          max-width: 100%;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
        " :src="'https://academicosolident.com.br/img/' + brindeImg" :alt="brindeImg" />
      <template #footer>
        <div class="text-center">
          <button type="button" class="btn btn-danger" @click="modalBrindeImg = false">
            FECHAR
          </button>
        </div>
      </template>
    </Dialog>
  </div>
  <span v-show="false"> {{ watchListaParaSerRemovida }} </span>
  <span v-show="false"> {{ listaParaSerRemovida }} </span>
</template>

<script>
import { nextTick } from "vue";
import { mapState, mapActions, mapMutations } from "vuex";
import Dialog from "primevue/dialog";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Carousel from "primevue/carousel";
import Loader from "../components/Loader";
import Sidebar from "primevue/sidebar";
import OverlayPanel from "primevue/overlaypanel";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import party from "party-js";
export default {
  inheritAttrs: false,
  components: {
    Carousel,
    Loader,
    AccordionTab,
    Accordion,
    Sidebar,
    Dialog,
    OverlayPanel,
    TabView,
    TabPanel,
  },
  props: {
    id_semestre: [Number, String],
  },
  data: () => ({
    modalListaCompleta: false,
    modalUpdateInfo: false,
    modalLogado: false,
    modalTour: false,
    modalListasAlteradas: false,
    modalListaReset: false,
    modalListaEconomic: false,
    modalCarrinhoSemestre: false,
    modalEscolherBrinde: false,
    modalBrindeImg: false,
    modalKit: false,
    TemNascimento: true,
    ajudaVisible: true,
    verMaisAvisos: null,
    accordionAberto: [],
    tour: {},
    sidebarBrindes: false,
    sidebarCarrinho: false,
    listas: [],
    listaOnHold: {},
    listaReset: {},
    listaEconomic: {},
    brindes: [],
    brindeImg: "",
    brindesDesbloqueados: 0,
    brindeProgressBar: 0,
    brindeTab: 0,
    items: [],
    itemsOpcionaisStarted: [],
    img: "",
    imgTitulo: "",
    tooltipTimer: 0,
    tooltipText: "",
    tooltipBrindeTimer: 0,
    tooltipBrindeText: "",
    objToStore: { session: {}, shared: {} },
    logadoInfo: {
      contato: 0,
      periodo: 0,
    },
    loading: false,
    searchTerms: {}, // Para armazenar os termos de busca de cada lista
  }),
  async created() { },
  async mounted() {
    this.tour = this.$shepherd({
      keyboardNavigation: false,
      useModalOverlay: true,
    });
    await this.getSession();
  },
  computed: {
    ...mapState({
      faculdade: (state) => state.faculdade,
      semestre: (state) => state.semestre,
      avisos: (state) => state.avisos,
      brindes_store: (state) => state.brindes,
      listas_store: (state) => state.listas,
      error: (state) => state.error,
      redirect: (state) => state.redirect,
      // resetListas: (state) => state.resetListas,
      kit_item: (state) => state.kit_item,
      pedido: (state) => state.pedido,
      id_pedido: (state) => state.id_pedido,
      tourVaiContinuar: (state) => state.tourVaiContinuar,
      representantes: (state) => state.representantes,
      aluno: (state) => state.aluno,
      ip_liberado: (state) => state.ip_liberado,
      hasListaTeste: (state) => state.hasListaTeste,
      item_controlar_saldo: (state) => state.item_controlar_saldo,
      refreshHeader: (state) => state.refreshHeader,
      listaParaSerRemovida: (state) => state.listaParaSerRemovida,
      doAvancarFromHeader: (state) => state.doAvancarFromHeader,
      editarPedido: (state) => state.editarPedido,
    }),
    watchListaParaSerRemovida() {
      if (
        this.listaParaSerRemovida != {} &&
        this.listaParaSerRemovida.id_lista != undefined
      ) {
        this.removeCarrinho(this.listaParaSerRemovida);
      }
      this.set_listaParaSerRemovida({});
      return true;
    },
  },
  methods: {
    ...mapActions([
      "checar_Info",
      "get_avisos",
      "get_listas",
      "get_kit_item",
      "get_login",
      "get_representantes",
      "salvar_pedido",
      "update_pedido",
      "update_aluno",
      "get_ip_liberado",
    ]),
    ...mapMutations([
      "set_semestre",
      "set_faculdade",
      "set_snackbar",
      "set_aluno",
      "set_pedido",
      "set_tourVaiContinuar",
      "set_refreshHeader",
      "set_listaParaSerRemovida",
      "set_doAvancarFromHeader",
      "set_redirect",
      "set_infocheck",
      "set_resetListas",
      "set_editarPedido",
    ]),
    clearSearch(listaId) {
      this.searchTerms[listaId] = '';
    },
    // Retorna os itens filtrados para uma lista
    getFilteredItems(lista) {
      const searchTerm = this.searchTerms[lista.id_lista];

      if (!searchTerm || searchTerm.trim() === '') {
        return lista.items;
      }

      const normalizedSearch = searchTerm
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s/g, "");

      return lista.items.filter(item => {
        // Busca na descrição do item
        const descricaoMatch = item.descri_item
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s/g, "")
          .includes(normalizedSearch);

        // Busca nas marcas do item
        const marcaMatch = item.marcas && item.marcas.some(marca =>
          marca.nome_marca
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s/g, "")
            .includes(normalizedSearch)
        );

        // Busca na observação do item
        const obsMatch = item.obs_item && item.obs_item
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s/g, "")
          .includes(normalizedSearch);

        return descricaoMatch || marcaMatch || obsMatch;
      });
    },
    async getSession() {
      this.loading = true;
      this.objToStore = this.$LS.get();
      if (this.objToStore.session.carrinho == null) {
        this.objToStore.session.carrinho = {
          listas: [],
          totalCarrinho: 0.0,
          qtdItemsSelecionados: 0,
          faculdade: {},
          semestre: {},
        };
      }
      if (this.objToStore.shared.ajudaVisible != null) {
        this.ajudaVisible = this.objToStore.shared.ajudaVisible;
      }
      if (await this.getListas()) {
        await this.get_avisos({
          id_semestre: this.id_semestre,
          id_faculdade: this.faculdade.id_faculdade,
        });
        document.getElementById("avisos-inside")?.clientHeight > 250
          ? (this.verMaisAvisos = true)
          : null;
        this.getLastCarrinho();
        this.checarItensSaldo();
        this.calcTotalCarrinho();
        if (this.objToStore.session.carrinho.listas.length > 0) {
          await this.checar_Info({
            id_semestre: this.objToStore.session.carrinho.semestre.id_semestre,
            carrinho: this.objToStore.session.carrinho,
            paginaListas: true,
          });
        }
        if (this.redirect) {
          this.set_resetListas(false);
          this.set_redirect(false);
          this.limparCarrinho();
          this.$LS.set(this.objToStore);
          this.$router.push({
            name: "inicio",
          });
        }
        this.loading = false;
        if (this.tourVaiContinuar) {
          this.set_tourVaiContinuar(false);
          this.callTour();
        } else if (this.doAvancarFromHeader) {
          this.set_doAvancarFromHeader(false);
          document.getElementById("botao-avancar-login").click();
        } else if (this.editarPedido != null) {
          this.loading = true;
          this.getCarrinhoEditarPedido();
          this.loading = false;
        }
      }
    },
    filterItems() {
      // A filtragem é feita no computed getFilteredItems
      // Este método pode ser usado para ações adicionais se necessário
    },
    async getListas() {
      await this.get_listas({
        id_semestre: this.id_semestre,
      });
      if (this.redirect) {
        this.set_redirect(false);
        this.set_snackbar();
        this.$router.push({
          name: "inicio",
        });
        return false;
      } else {
        this.listas = this.listas_store;
        this.brindes = this.brindes_store;

        if (this.hasListaTeste) {
          await this.get_ip_liberado();
        }
        if (this.semestre.limite_venda != -1) {
          if (this.semestre.listas_vendidas >= this.semestre.limite_venda) {
            this.set_infocheck({
              show: true,
              msg:
                "Listas esgotadas, tente novamente mais tarde ou entre em contato conosco.",
            });
            this.$router.push({ name: "inicio" });
            return false;
          }
        }
        this.objToStore.session.semestre = this.semestre;
        this.objToStore.session.faculdade = this.faculdade;
        this.$LS.set(this.objToStore);
        for (let i = 0; i < this.listas.length; i++) {
          this.listas[i].listaAlterada = false;
          this.listas[i].allItemsSelected = true;
        }
        return true;
      }
    },
    async getKitItem(id_item) {
      this.loading = true;
      await this.get_kit_item(id_item);
      this.loading = false;
      this.modalKit = true;
    },
    async getRepresentantes() {
      this.logadoInfo.contato = 0;
      this.loading = true;
      await this.get_representantes({
        id_semestre: this.objToStore.session.carrinho.semestre.id_semestre,
        id_faculdade: this.objToStore.session.carrinho.faculdade.id_faculdade,
        cod_periodo: this.logadoInfo.periodo.cod_periodo,
      });
      this.loading = false;
    },
    getCarrinhoEditarPedido() {
      let hora = this.editarPedido.hora_pedido.split(":");
      let data = this.editarPedido.data_pedido.split("/");
      let dataPedido = new Date(
        data[2],
        parseInt(data[1]) - 1,
        data[0],
        hora[0],
        hora[1],
        hora[2]
      );
      let listasModificadas = [];

      for (let itemPedido of this.editarPedido.itempedidos) {
        if (itemPedido.qtd_item != 0) {
          for (let lista of this.listas) {
            let marcaEscolhida = null;
            let itemAtual = lista.items.find((item) => {
              for (let marca of item.marcas) {
                if (marca.cod_marca == itemPedido.cod_item) {
                  marcaEscolhida = marca;
                  return true;
                }
              }
            });

            if (itemAtual != undefined && itemAtual.disponivel_item == "1") {
              if (!listasModificadas.includes(lista)) {
                if (
                  (lista.date_modify
                    ? new Date(lista.date_modify)
                    : new Date(lista.date_create)) > dataPedido
                ) {
                  this.set_editarPedido(null);
                  this.set_infocheck({
                    show: true,
                    msg:
                      "Listas alteradas ou indisponiveis, por favor refaça seu pedido",
                  });
                  this.limparCarrinho();
                  this.$LS.set(this.objToStore);
                  this.$router.push({
                    name: "inicio",
                  });
                  return;
                } else {
                  if (!lista.estaNoCarrinho) {
                    this.addCarrinho(lista);
                  }
                  for (let itemLista of lista.items) {
                    itemLista.qtd_item = 0;
                    itemLista.selected = false;
                  }
                  listasModificadas.push(lista);
                }
              }
              itemAtual.qtd_item = itemPedido.qtd_item;
              itemAtual.selected = true;
              itemAtual.selectedMarca = marcaEscolhida;
              break;
            }
          }
        }
      }

      for (let listaModificada of listasModificadas) {
        this.valorLista(listaModificada);
      }

      this.set_editarPedido(null);
    },
    checarItensSaldo() {
      if (this.item_controlar_saldo.length < 1) return;
      let itensSaldo = JSON.parse(JSON.stringify(this.item_controlar_saldo));
      for (let lista of this.listas) {
        let alterouLista = false;
        for (let item of lista.items) {
          for (let i = 0; i < itensSaldo.length; i++) {
            if (itensSaldo[i].status) {
              if (itensSaldo[i].codigo == item.marcas[0].cod_marca) {
                alterouLista = true;
                if (itensSaldo[i].saldo == 0) {
                  item.disponivel_item = 0;
                  item.qtd_item = 0;
                  item.selected = false;
                }
                item.saldoControlado = itensSaldo[i].saldo;
                if (item.qtd_item > item.saldoControlado) {
                  item.qtd_item = item.saldoControlado;
                }
                itensSaldo.splice(i, 1);
                if (itensSaldo.length < 1) return;
                break;
              }
            }
          }
        }
        if (alterouLista) {
          this.valorLista(lista);
        }
      }
    },
    async getLastCarrinho() {
      for (let lista = 0; lista < this.listas.length; lista++) {
        for (
          let carrinho = 0;
          carrinho < this.objToStore.session.carrinho.listas.length;
          carrinho++
        ) {
          if (
            this.listas[lista].id_lista ==
            this.objToStore.session.carrinho.listas[carrinho].id_lista
          ) {
            this.listas[lista] = this.objToStore.session.carrinho.listas[
              carrinho
            ];
          }
        }
      }

      // this.listas = this.listas;
    },
    async updateAluno() {
      this.loading = true;
      await this.update_aluno(this.objToStore.session.aluno);
      if (!this.error) {
        this.objToStore.session.aluno = this.aluno;
        this.$LS.set(this.objToStore);
        this.modalUpdateInfo = false;
        this.modalLogado = true;
      } else {
        this.modalUpdateInfo = false;
      }
      this.loading = false;
    },
    async loginEvent() {
      //termina a tour
      if (this.tour.isActive()) {
        this.set_tourVaiContinuar(true);
        this.tourCompleta();
      }
      //termina a tour

      // this.modalEscolherBrinde = true;
      // if (this.brindeTab != this.brindesDesbloqueados) {
      //   return;
      // }
      // this.brindeTab = 0;
      // this.modalEscolherBrinde = false;
      // this.objToStore.session.carrinho.brindesMarcas = [];
      // this.brindes.forEach((brinde) => {
      //   this.objToStore.session.carrinho.brindesMarcas.push(
      //     brinde.selectedMarca.codigo
      //   );
      // });
      this.$LS.set(this.objToStore);

      if (this.objToStore.session.aluno == null) {
        this.$router.push({
          name: "login",
        });
      } else {
        let dataAtual = new Date();
        this.objToStore.session.aluno.updated_at = new Date(
          this.objToStore.session.aluno.updated_at == undefined
            ? null
            : this.objToStore.session.aluno.updated_at
        );
        if (
          this.objToStore.session.aluno.updated_at.setMonth(
            this.objToStore.session.aluno.updated_at.getMonth() + 5
          ) < dataAtual ||
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
        } else {
          this.logadoInfo.periodo = 0;
          this.logadoInfo.contato = 0;
          this.modalLogado = true;
        }
      }
    },
    async doLogin() {
      this.loading = true;
      let aluno = this.objToStore.session.aluno;
      aluno.periodo = this.logadoInfo.periodo;
      aluno.contato = this.logadoInfo.contato;

      this.set_pedido({
        doCadastro: false,
        aluno: aluno,
        carrinho: this.objToStore.session.carrinho,
        numeroPedido:
          this.objToStore.session.pedido == null
            ? null
            : this.objToStore.session.pedido.numeroPedido,
      });
      await this.salvar_pedido(this.pedido);

      this.objToStore.session.pedido = {
        numeroPedido: this.id_pedido,
        semestre: this.objToStore.session.carrinho.semestre,
        periodo: this.logadoInfo.periodo,
        contato: this.logadoInfo.contato,
      };

      this.objToStore.session.aluno.periodo = this.logadoInfo.periodo.id_periodo.toString();
      this.objToStore.session.aluno.contato = this.logadoInfo.contato.id_representante.toString();
      // this.objToStore.session.pedido = {
      //   carrinho: this.objToStore.session.carrinho,
      //   numeroPedido: this.id_pedido,
      //   semestre: this.objToStore.session.carrinho.semestre,
      //   periodo: this.logadoInfo.periodo,
      //   contato: this.logadoInfo.contato,
      // };
      //delete this.objToStore.session.carrinho;
      this.$LS.set(this.objToStore);
      this.set_refreshHeader(true);
      this.$router.push({
        name: "SeusDados",
        params: { numeroPedido: this.id_pedido },
      });
      this.loading = false;
    },
    calcTotalCarrinho() {
      let totalCarrinho = 0.0;
      this.objToStore.session.carrinho.listas.forEach((lista) => {
        totalCarrinho += parseFloat(lista.valor_total_lista);
      });
      this.objToStore.session.carrinho.totalCarrinho = totalCarrinho.toFixed(2);
      this.$LS.set(this.objToStore);
      this.set_refreshHeader(true);
      this.desbloquearBrindes();
    },
    addCarrinho(lista) {
      if (this.objToStore.session.carrinho.listas.length <= 0) {
        this.objToStore.session.carrinho.semestre = this.semestre;
        this.objToStore.session.carrinho.faculdade = this.faculdade;
        lista.estaNoCarrinho = true;
        this.objToStore.session.carrinho.listas.push(lista);
        this.snackbar(lista.nome_exibi_lista + " adicionada!", "#007FFF");
        this.nextStepIf(8);
      } else if (
        this.objToStore.session.carrinho.semestre.id_semestre ==
        this.semestre.id_semestre
      ) {
        lista.estaNoCarrinho = true;
        this.objToStore.session.carrinho.listas.push(lista);
        this.snackbar(lista.nome_exibi_lista + " adicionada!", "#007FFF");
        this.nextStepIf(8);
      } else {
        this.listaOnHold = lista;
        this.modalCarrinhoSemestre = true;
      }

      this.listasItemsSelecionados();
      this.calcTotalCarrinho();
    },
    smoothScroll(target) {
      setTimeout(function () {
        document.getElementById(target).scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    },
    desbloquearBrindes() {
      if (
        this.brindes.length < 1 ||
        this.id_semestre !=
        this.objToStore.session.carrinho.semestre.id_semestre
      )
        return;
      if (this.brindes[0].acumula) {
        let brindesDesbloqueados = 0;
        for (let brinde of this.brindes) {
          if (this.objToStore.session.carrinho.totalCarrinho >= brinde.valor) {
            brindesDesbloqueados++;
            brinde.desbloqueado = true;
            if (brindesDesbloqueados > this.brindesDesbloqueados) {
              this.snackbar(
                "PARABÉNS!! Você ganhou um brinde!!",
                "rgb(40, 167, 69)",
                true
              );
              let el = document.getElementsByClassName("confetti-target")[
                brindesDesbloqueados - 1
              ];
              setTimeout(() => {
                party.confetti(el, { gravity: 100 });
                brindesDesbloqueados == this.brindes.length
                  ? party.sparkles(el)
                  : null;
              }, 200);
            }
          } else {
            brinde.desbloqueado = false;
          }
        }
        if (brindesDesbloqueados < this.brindesDesbloqueados) {
          this.snackbar(
            " Opa, você não vai ganhar o brinde. :(",
            "#555555",
            true
          );
        }
        this.brindesDesbloqueados = brindesDesbloqueados;
        this.brindeProgressBar =
          (this.objToStore.session.carrinho.totalCarrinho /
            this.brindes[this.brindes.length - 1].valor) *
          100;
      }
    },
    toggleMenu(event) {
      this.$refs.menu.toggle(event);
    },
    removeCarrinho(lista) {
      for (let i = 0; i < this.objToStore.session.carrinho.listas.length; i++) {
        if (
          this.objToStore.session.carrinho.listas[i].id_lista == lista.id_lista
        ) {
          this.objToStore.session.carrinho.listas[i].estaNoCarrinho = false;
          this.objToStore.session.carrinho.listas.splice(i, 1);
        }
      }
      this.snackbar(lista.nome_exibi_lista + " removida!", "rgb(255 0 0)");
      this.listasItemsSelecionados();
      this.calcTotalCarrinho();
    },
    valorLista(lista) {
      let valorLista = 0.0;
      let qtdItemsSelecionadosLista = 0;

      lista.listaAlterada = false;
      lista.allItemsSelected = true;

      lista.items.forEach((item) => {
        if (item.outros_item == 0 && item.disponivel_item == "1") {
          if (item.qtd_item == 0 && item.opcional_item == "0") {
            lista.allItemsSelected = false;
          }
          if (
            item.qtd_item != item.qtd_item_original ||
            item.selectedMarca.id_marca != item.marcas[0].id_marca
          ) {
            lista.listaAlterada = true;
          }
          qtdItemsSelecionadosLista += parseInt(item.qtd_item);
          valorLista +=
            parseFloat(item.selectedMarca.valor_marca) *
            parseInt(item.qtd_item);
        }
      });
      lista.valor_total_lista = valorLista.toFixed(2);
      lista.qtdItemsSelecionadosLista = qtdItemsSelecionadosLista;
      if (lista.valor_total_lista <= 0 && lista.estaNoCarrinho) {
        this.removeCarrinho(lista);
      }
      this.listasItemsSelecionados();
      this.calcTotalCarrinho();
    },
    listasItemsSelecionados() {
      let qtdItemsSelecionados = 0;
      for (let i = 0; i < this.objToStore.session.carrinho.listas.length; i++) {
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
    },
    checkIfMarcas(lista) {
      let retorno = false;
      for (let index = 0; index < lista.items.length; index++) {
        if (lista.items[index].marcas.length > 1) {
          retorno = true;
          break;
        }
      }
      return retorno;
    },
    setMarcasListaEconomica(lista) {
      for (let index = 0; index < lista.items.length; index++) {
        let marca = lista.items[index].marcas.reduce(function (prev, current) {
          if (lista.economica) {
            return prev && prev.valor_marca < current.valor_marca
              ? prev
              : current;
          } else {
            return prev && prev.valor_marca > current.valor_marca
              ? prev
              : current;
          }
        });
        if (marca.status_marca != 2 && marca.status_marca != 3) {
          lista.items[index].selectedMarca = marca;
        }
      }
      lista.economica = !lista.economica;
      this.valorLista(lista);
    },
    listaOriginal(lista) {
      lista.allItemsSelected = false;
      for (let index = 0; index < lista.items.length; index++) {
        lista.items[index].selectedMarca = lista.items[index].marcas[0];
        if (lista.items[index].disponivel_item == "0") {
          lista.items[index].selected = false;
          lista.items[index].qtd_item = 0;
        } else if (lista.items[index].opcional_item == "1") {
          lista.items[index].qtd_item = 0;
          if (lista.items[index].qtd_item > 0)
            lista.items[index].selected = true;
          else lista.items[index].selected = false;
        } else {
          lista.items[index].qtd_item = lista.items[index].qtd_item_original;
          if (lista.items[index].qtd_item > 0)
            lista.items[index].selected = true;
          else lista.items[index].selected = false;
        }
      }

      this.valorLista(lista);
    },
    selecionarTodos(lista) {
      if (lista.allItemsSelected) {
        for (let item of lista.items) {
          item.selected = false;
          item.qtd_item = 0;
        }
        lista.allItemsSelected = false;
        this.snackbar(
          "Todos os itens da lista " +
          lista.nome_exibi_lista +
          " foram desmarcados!",
          "#007FFF"
        );
      } else {
        for (let item of lista.items) {
          if (item.disponivel_item == "1" && item.opcional_item == "0") {
            item.selected = true;
            item.qtd_item = item.qtd_item_original;
          }
        }
        lista.allItemsSelected = true;
        this.snackbar(
          "Todos os itens principais da lista " +
          lista.nome_exibi_lista +
          " foram marcados!",
          "#007FFF"
        );
      }
      this.valorLista(lista);
    },
    checkboxClick(item) {
      if (item.selected) {
        item.qtd_item = 0;
        item.selected = false;
      } else {
        if (item.opcional_item == "1") {
          item.qtd_item = 1;
        } else {
          if (
            item.saldoControlado == undefined ||
            item.saldoControlado >= item.qtd_item_original
          ) {
            item.qtd_item = item.qtd_item_original;
          } else {
            item.qtd_item = item.saldoControlado;
          }
        }
        item.selected = true;
      }
    },
    minMaxQtdItem(item) {
      if (item.qtd_item > (item.saldoControlado ? item.saldoControlado : 99)) {
        item.qtd_item = item.saldoControlado ? item.saldoControlado : 99;
      }
      if (item.qtd_item <= 0) {
        item.qtd_item = 0;
        item.selected = false;
      } else {
        item.selected = true;
      }
    },
    snackbar(msg, cor, isBrinde = false) {
      clearTimeout(isBrinde ? this.tooltipBrindeTimer : this.tooltipTimer);
      let snackbar = document.getElementById(
        isBrinde ? "snackbarBrinde" : "snackbar"
      );
      if (snackbar != null) {
        isBrinde ? (this.tooltipBrindeText = msg) : (this.tooltipText = msg);
        snackbar.classList.remove("show");
        void snackbar.offsetWidth;
        snackbar.style.backgroundColor = cor;
        snackbar.className = "show";
        let timer = setTimeout(function () {
          snackbar.classList.remove("show");
        }, 2800);
        isBrinde
          ? (this.tooltipBrindeTimer = timer)
          : (this.tooltipTimer = timer);
      }
    },
    itemsOpcionais(indexLista, item) {
      if (item.opcional_item) {
        if (this.itemsOpcionaisStarted[indexLista] == null) {
          this.itemsOpcionaisStarted[indexLista] = item.id_item;
          return true;
        } else if (this.itemsOpcionaisStarted[indexLista] == item.id_item) {
          return true;
        } else return false;
      }
    },
    itemIndisponivel(item) {
      if (item.disponivel_item == "0") {
        if (item.outros_item != "0") {
          return "color:white ; font-size: 20px ;";
        }
        return "opacity:0.3";
      }
      return "";
    },
    itemRemovido(item) {
      if (item.outros_item != "0") {
        return "item-outros";
      } else {
        if (item.qtd_item == 0) {
          if (item.opcional_item == "1") {
            return "item-opcional";
          } else return "item-removido";
        } else return "";
      }
    },
    rowClasses(item) {
      if (item.outros_item != "0") {
        return "item-outros";
      } else {
        if (item.qtd_item == 0) {
          if (item.opcional_item == "1") {
            return "item-opcional";
          } else return "item-removido";
        }
      }
    },
    itemtitulocenter(item) {
      if (item.outros_item != "0")
        return "border: 1px solid #2196F3 ; vertical-align: center ; padding: 5px 0px";
      else return "text-align: start ; flex: 0 0 auto; width: 50%";
    },
    itemTituloColspan(item) {
      if (item.outros_item != "0") return "4";
      else return "1";
    },
    collapseEstaAberto(id_lista) {
      let collapseIndicator = document.getElementById(
        "collapse-indicator" + id_lista
      );
      if (collapseIndicator.classList.contains("flipped"))
        collapseIndicator.classList.remove("flipped");
      else collapseIndicator.classList.add("flipped");
    },
    marcaSelecionada(id_marca, item) {
      if (id_marca == item.selectedMarca.id_marca)
        // && !item.trocarMarca
        return "border-bottom: 2px solid rgb(33 135 56); background: #19f24a5e;";
      else return "";
    },
    toggle(target) {
      if (target.nextElementSibling.style.display === "block") {
        target.nextElementSibling.style.display = "none";
      } else {
        target.nextElementSibling.style.display = "block";
      }
    },
    getURL(img) {
      return require("../assets/" + img);
    },
    callListaReset(lista) {
      this.listaReset = lista;
      this.modalListaReset = true;
    },
    callListaEconomic(lista) {
      this.listaEconomic = lista;
      this.modalListaEconomic = true;
    },
    marcaAlterada(item) {
      if (item.marcas[0].status_marca == "2") {
        this.snackbar(
          "Tamanho selecionado: " + item.selectedMarca.nome_marca,
          "#007FFF"
        );
      } else if (item.marcas[0].status_marca == "3") {
        this.snackbar(
          "Cor selecionada: " + item.selectedMarca.nome_marca,
          "#007FFF"
        );
      } else {
        this.snackbar(
          "Marca selecionada: " + item.selectedMarca.nome_marca,
          "#007FFF"
        );
      }
      // item.trocarMarca = false;
      //clica em um elemento qualquer para fechar o dropdown do bootstrap
      document.getElementById("avisos-span").click();
    },
    openNav() {
      this.nextStepIf(9);
      this.sidebarCarrinho = true;
    },
    openImg(event, item) {
      this.img =
        "https://academicosolident.com.br/img/" + item.selectedMarca.image_path;
      this.imgTitulo = item.descri_item;
      if (screen.width > 770) {
        //precisa ser repensado
        this.$refs["openImg" + item.id_item].toggle(event);
      } else {
        document.getElementById("imgBackDrop").style.display = "flex";
      }
    },
    closeImg() {
      document.getElementById("imgBackDrop").style.display = "none";
    },
    callTour() {
      if (this.objToStore.session.carrinho.listas.length == 0) {
        this.iniciarTour();
      } else {
        this.modalTour = true;
      }
    },
    limparCarrinho() {
      this.objToStore.session.carrinho.listas = [];
      this.objToStore.session.carrinho.semestre = {};
      for (let lista of this.listas) {
        lista.estaNoCarrinho = false;
      }
      this.listasItemsSelecionados();
      this.calcTotalCarrinho();
    },
    async iniciarTour() {
      await nextTick();

      this.accordionAberto = null;

      if (this.tour.isActive()) {
        this.tourCompleta();
      }

      this.hideAjuda();

      const lista = document.getElementsByClassName("p-accordion-tab");
      const listaInside = document.getElementsByClassName(
        "p-toggleable-content"
      );
      const row = listaInside[0].querySelector(
        ".tabela:not(.item-outros,.item-removido)"
      );
      const botao = document.getElementsByClassName("lista-button");
      const botaoCarrinho = document.getElementById("botao-carrinho");

      this.tour.addStep({
        title: "PAGINA DE LISTAS!",
        text:
          "Bem-vindo a <b>pagina de listas</b>, aqui aparecem todas as <b>listas disponíveis</b> para esse <b>semestre</b>, desta <b>faculdade</b>, vamos selecionar uma <b>lista</b>!",
        buttons: [
          {
            text: "Fechar Guia",
            action: this.tourCompleta,
            classes: "cancel-tour-button",
          },
          {
            text: "Avançar",
            action: this.tour.next,
          },
        ],
      });

      this.tour.addStep({
        title: "LISTAS!",
        text:
          "Esta é <b>uma lista</b>, no topo fica <b>o nome da lista</b>, em seguida, <b>o preço atual da lista</b> e depois a <b>quantidade de itens selecionados na lista</b>. Clique na <b>lista</b> para <b>abri-la</b>",
        scrollTo: { behavior: "smooth", block: "center", inline: "nearest" },
        attachTo: { element: lista[0], on: "top" },
        modalOverlayOpeningRadius: 10,
        buttons: [
          {
            text: "Fechar Guia",
            action: this.tourCompleta,
            classes: "cancel-tour-button",
          },
          {
            text: "Voltar",
            action: this.tour.back,
          },
        ],
        popperOptions: {
          modifiers: [{ name: "focusAfterRender", enabled: false }],
        },
      });

      this.tour.addStep({
        title: "LISTAS!",
        text:
          "Dentro da lista Você pode ver a <b>foto, descrição, marca e quantidade</b> de cada item! <b>clique em avançar</b>.",
        attachTo: { element: listaInside[0], on: "top" },
        modalOverlayOpeningRadius: 15,
        arrow: false,
        buttons: [
          {
            text: "Fechar Guia",
            action: this.tourCompleta,
            classes: "cancel-tour-button",
          },
          {
            text: "Avançar",
            action: this.tour.next,
          },
        ],
      });

      this.tour.addStep({
        title: "LISTAS!",
        text: "Aqui fica a <b>foto do item, clique em avançar.</b>",
        scrollTo: { behavior: "smooth", block: "center", inline: "nearest" },
        attachTo: { element: row.children[0], on: "bottom" },
        modalOverlayOpeningRadius: 15,
        buttons: [
          {
            text: "Fechar Guia",
            action: this.tourCompleta,
            classes: "cancel-tour-button",
          },
          {
            text: "Voltar",
            action: this.tour.back,
          },
          {
            text: "Avançar",
            action: this.tour.next,
          },
        ],
      });

      this.tour.addStep({
        title: "LISTAS!",
        text:
          "Aqui fica o <span style='color:#000000'>nome do item (em preto)</span>, <span style='color:green'>marca ou tamanho do item (em verde)</span>, e <span style='color:red'>possiveis observações (em vermelho)</span>. <b>clique em avançar.</b>",
        attachTo: { element: row.children[1], on: "bottom" },
        modalOverlayOpeningRadius: 15,
        buttons: [
          {
            text: "Fechar Guia",
            action: this.tourCompleta,
            classes: "cancel-tour-button",
          },
          {
            text: "Voltar",
            action: this.tour.back,
          },
          {
            text: "Avançar",
            action: this.tour.next,
          },
        ],
      });

      this.tour.addStep({
        title: "LISTAS!",
        text:
          "<b>Caso</b> o item esteja <b>disponível em mais de uma marca ou tamanho</b>, você poderá <b>escolher entre eles</b> através de um <b>botão aqui. Clique em avançar.</b>",
        attachTo: { element: row.children[2], on: "bottom" },
        modalOverlayOpeningRadius: 15,
        buttons: [
          {
            text: "Fechar Guia",
            action: this.tourCompleta,
            classes: "cancel-tour-button",
          },
          {
            text: "Voltar",
            action: this.tour.back,
          },
          {
            text: "Avançar",
            action: this.tour.next,
          },
        ],
      });

      this.tour.addStep({
        title: "LISTAS!",
        text:
          "Aqui você pode <b>selecionar ou remover</b> um item, tambem como <b>diminuir ou aumentar a quantidade</b> dele! <b>Clique em avançar.</b>",
        attachTo: { element: row.children[3], on: "bottom" },
        modalOverlayOpeningRadius: 15,
        buttons: [
          {
            text: "Fechar Guia",
            action: this.tourCompleta,
            classes: "cancel-tour-button",
          },
          {
            text: "Voltar",
            action: this.tour.back,
          },
          {
            text: "Avançar",
            action: this.stepOverlay,
          },
        ],
      });

      this.tour.addStep({
        title: "LISTAS!",
        text:
          "Fique a vontade para alterar esta lista como quiser, <b>quando estiver pronto, clique em avançar!</b>",
        attachTo: { element: lista[0], on: "top" },
        arrow: false,
        buttons: [
          {
            text: "Fechar Guia",
            action: this.tourCompleta,
            classes: "cancel-tour-button",
          },
          {
            text: "Avançar",
            action: this.stepOverlay,
          },
        ],
      });

      this.tour.addStep({
        title: "COLOCANDO A LISTA NO CARRINHO!",
        text:
          'Depois de personalizar sua lista, clique no botão <b style="color:#28a745">"adicionar"</b> para <b>adiciona-la ao seu carrinho</b>',
        scrollTo: { behavior: "smooth", block: "center", inline: "nearest" },
        attachTo: {
          element: botao[0],
          on: screen.width > 700 ? "left" : "bottom",
        },
        modalOverlayOpeningPadding: 10,
        modalOverlayOpeningRadius: 15,
        buttons: [
          {
            text: "Fechar Guia",
            action: this.tourCompleta,
            classes: "cancel-tour-button",
          },
        ],
        popperOptions: {
          modifiers: [{ name: "focusAfterRender", enabled: false }],
        },
      });

      this.tour.addStep({
        title: "VERIFICANDO SEU CARRINHO!",
        text:
          "Muito bem! <b>Para ver o seu carrinho, clique no icone de carrinho</b>, aqui em baixo.",
        attachTo: { element: botaoCarrinho, on: "top" },
        modalOverlayOpeningPadding: 10,
        modalOverlayOpeningRadius: 25,
        buttons: [
          {
            text: "Fechar Guia",
            action: this.tourCompleta,
            classes: "cancel-tour-button",
          },
        ],
      });

      this.tour.addStep({
        title: "VERIFICANDO SEU CARRINHO!",
        text:
          "No <b>seu carrinho</b> você pode verificar o <b>preço de cada lista</b> e o <b>preço total do seu pedido</b>. você tambem pode <b>remover qualquer lista do carrinho</b>.",
        arrow: false,
        buttons: [
          {
            text: "Fechar Guia",
            action: this.tourCompleta,
            classes: "cancel-tour-button",
          },
          {
            text: "Avançar",
            action: this.tour.next,
          },
        ],
      });

      this.tour.addStep({
        title: "ESTÁ TUDO CERTO?",
        text:
          "<b>Caso</b> esteja satisfeito com seu carrinho, <b>você pode clicar em  Avançar, no seu carrinho,</b> para <b>finalizar seu pedido</b>, se não, <b>você pode clicar em Voltar, no seu carrinho, para escolher outras listas!</b> <br> Este é o fim do guia. <b>Obrigado por chegar até aqui!</b>",
        buttons: [
          {
            text: "Terminar Guia",
            action: this.tourCompleta,
            classes: "cancel-tour-button",
          },
        ],
      });

      this.tour.start();
    },
    stepOverlay() {
      this.tour.options.useModalOverlay = !this.tour.options.useModalOverlay;
      this.tour.next();
    },
    nextStepIf(step) {
      if (
        this.tour.isActive() &&
        this.tour.getCurrentStep().id == this.tour.steps[step].id
      ) {
        if (step == 9) {
          this.tour.options.useModalOverlay = false;
        }
        this.tour.next();
      }
    },
    tourCompleta() {
      this.tour.complete();
      this.tour.options.useModalOverlay = true;
      this.showAjuda();
    },
    showAjuda() {
      if (!this.tour.isActive() && this.ajudaVisible) {
        setTimeout(function () {
          document
            .getElementById("ajuda-container")
            .classList.remove("ajuda-container-clicked");
        }, 500);
      }
    },
    hideAjuda() {
      if (this.ajudaVisible) {
        document
          .getElementById("ajuda-container")
          .classList.add("ajuda-container-clicked");
      }
    },
    closeAjuda() {
      this.objToStore.shared.ajudaVisible = false;
      this.$LS.set(this.objToStore);
      this.ajudaVisible = false;
    },
    restoreAjuda() {
      this.objToStore.shared.ajudaVisible = true;
      this.$LS.set(this.objToStore);
      this.ajudaVisible = true;
    },
    toggleAvisos() {
      let avisosContainer = document.getElementById("avisos-container");
      avisosContainer.clientHeight > 250
        ? (avisosContainer.style.maxHeight = "250px")
        : (avisosContainer.style.maxHeight = "1000px");
      this.verMaisAvisos = !this.verMaisAvisos;
    },
    hideLoading() {
      document.getElementById("loader-backdrop").style.display = "none";
      document.body.style.overflow = "";
    },
    openSideBrinde() {
      if (this.brindes.length > 0)
        if (this.brindes[0].acumula) {
          this.sidebarBrindes = !this.sidebarBrindes;
        }
    },
  },
};
</script>

<style>
.brinde-modal-img .p-dialog-header {
  display: none !important;
}

.brinde-modal-img .p-dialog-content {
  border-top-left-radius: 15px !important;
  border-top-right-radius: 15px !important;
}

.brinde-modal-img .p-dialog-footer {
  padding-top: 0px !important;
}

.p-carousel-item {
  max-width: 25% !important;
}

@media (max-width: 1100px) {
  .p-carousel-item {
    max-width: 33.33% !important;
  }
}

@media (max-width: 750px) {
  .p-carousel-item {
    max-width: 50% !important;
  }
}

@media (max-width: 480px) {
  .p-carousel-item {
    max-width: none !important;
  }
}

.brinde-indicators .p-highlight button {
  background-color: rgb(40, 167, 69) !important;
}

.brinde-modal .p-tabview-panels {
  padding-bottom: 0px !important;
}

.brinde-modal .p-tabview-title {
  width: 100% !important;
}

.brinde-modal .p-dialog-content {
  padding: 2px !important;
}

.brinde-modal .p-tabview-nav {
  flex: 1 0 100% !important;
  flex-wrap: wrap !important;
}

.brinde-modal .p-tabview-nav li {
  flex: 1 0 0% !important;
}

.brinde-modal .badge-desbloqueio .badge-bloqueado {
  transform: none !important;
  height: 25px !important;
  width: 25px !important;
  position: relative !important;
  font-size: 17px !important;
  margin-left: 2px !important;
  right: 0px !important;
}

.brinde-modal .p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
  background: #ffffff;
  border-color: rgb(40, 167, 69);
  color: rgb(40, 167, 69);
}

.brinde-modal .p-tabview-nav-link {
  display: flex;
  justify-content: center;
}

.brinde-modal .p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus {
  box-shadow: none !important;
}

.vert-pb-container {
  transition: transform 0.2s;
  cursor: pointer;
  position: absolute;
  width: 50px !important;
  padding: 0px 10px !important;
  height: 250px !important;
  left: 10px;
  top: -142px;
}

.vert-pb-container:hover {
  transform: scale(1.1);
}

.vert-pb-container>.badge-brinde {
  box-shadow: inset 0px 0px 13px 6px #0000006b, 0px 0px 13px 6px #0000006b;
  transform: translate(5px, -28px) !important;
  border: 2px solid rgb(0, 0, 0);
}

.vert-pb-back {
  position: relative;
  box-shadow: inset 0px 0px 13px 6px #0000006b, 0px 0px 13px 6px #0000006b;
  z-index: 4 !important;
  border: 2px solid rgb(0, 0, 0);
  background: rgb(161, 160, 160);
  width: 100%;
  height: 130px !important;
  border-radius: 10px;
}

.vert-pb-overflow,
.vert-pb-no-overflow {
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
}

.vert-pb-overflow {
  border-radius: 8px;
  overflow: hidden;
}

.vert-pb-no-overflow {
  position: absolute;
  z-index: 1;
}

.vert-pb-value {
  box-shadow: inset 0px 0px 13px 6px #0000006b;
  transition: height 0.55s;
  width: 100%;
  background: rgb(40, 167, 69);
  height: 0px;
}

.vert-pb-tier {
  position: absolute;
  background: transparent;
  width: 100% !important;
  border-top: 2px solid black;
}

.confetti-target {
  transform: translate(0px, 8px);
}

.item-outros {
  background-color: #2196f3 !important;
}

.item-opcional {
  background-color: #00f2ff2e !important;
}

.item-opcional:hover {
  background-color: #04bbc52e !important;
}

.item-removido {
  background-color: #ff001842 !important;
}

.item-removido>td>*:not(.obs) {
  text-decoration: line-through;
}

.p-accordion-tab {
  margin: 10px auto;
  width: 95%;
}

.p-accordion .p-accordion-content {
  max-width: 100%;
  overflow-x: auto;
  border: 0px !important;
  padding: 0 !important;
}

.p-accordion-header-link {
  font-family: "Montserrat" !important;
  box-shadow: rgb(187 187 187) 5px -6px 10px !important;
  border-top-right-radius: 10px !important;
  border-top-left-radius: 10px !important;
  border: 0px !important;
  transition: background-color 0.2s !important;
  color: var(--secondary) !important;
  background-color: var(--primary) !important;
  padding: 3px 10px 3px 10px !important;
}

.p-accordion-header-link:focus,
.p-accordion-header-link:active {
  box-shadow: rgb(187 187 187) 5px -6px 10px !important;
}

.p-accordion-header-link:hover {
  background-color: #15cce2 !important;
}

.p-accordion-header-link:active {
  opacity: 0.8 !important;
}

.pagina-listas .p-overlaypanel {
  border-radius: 15px !important;
  /* padding: 0px !important; */
}

.pagina-listas .p-overlaypanel-content {
  padding: 5px !important;
  background-color: white !important;
  border-radius: 15px !important;
  /* padding: 0px !important; */
}

.pagina-listas .p-overlaypanel:after {
  border-color: #00000000 !important;
}

.pagina-listas .p-overlaypanel:before {
  border-color: #00000000 !important;
}

@media (max-width: 769px) {
  .vert-pb-back {
    height: 70px !important;
  }

  .vert-pb-container {
    top: -90px !important;
  }

  #snackbarBrinde {
    min-width: 130px !important;
    font-size: 10px !important;
  }

  .confetti-target {
    transform: translate(0px, 8px);
  }

  .brinde-modal .p-tabview-nav-link {
    font-size: 14px !important;
    padding: 8px !important;
  }

  .p-carousel-prev,
  .p-carousel-next {
    width: 1rem !important;
  }
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.brindes-counter {
  font-weight: bold;
  font-size: 16px;
  position: absolute;
  background: rgb(40, 167, 69);
  color: white;
  height: 20px;
  width: 20px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transform: translate(16px, -17px);
  box-shadow: 0px 0px 13px 6px #0000006b;
}

.badge-brinde {
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background: rgb(40, 167, 69);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  font-size: 27px;
  right: 10px;
  top: -20px;
}

.badge-desbloqueio {
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background: rgb(40, 167, 69);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  font-size: 27px;
  right: 10px;
}

.badge-bloqueado {
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background: rgb(177, 34, 34);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  font-size: 27px;
  right: 10px;
}

.brinde-titulo {
  height: 60px;
}

.brinde-image {
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
  height: 120px;
  width: 120px;
  margin-bottom: 10px;
}

.brinde-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  border: solid 1px lightgray;
  border-radius: 10px;
  margin: 0px 5px;
  padding: 20px;
  height: 400px;
}

.brinde-item-msg {
  margin-top: 8px;
  height: 100px;
  overflow: auto;
  border-bottom: 1px solid #ccc !important;
  padding: 5px;
}

#avisos-inside {
  padding: 1rem 0.5rem !important;
}

#avisos-container {
  transition: max-height 0.55s;
  max-height: 250px;
  overflow-y: hidden;
}

.ver-mais-avisos {
  font-weight: bold;
  display: inline-block;
  margin-top: 10px;
  cursor: pointer;
  color: var(--primary);
  text-decoration: underline;
}

.ver-mais-avisos:hover {
  color: rgb(155, 234, 245);
}

.brinde-container {
  box-shadow: 0px 0px 13px 6px #0000006b;
  cursor: pointer;
  transition: transform ease-out 0.2s;
  font-size: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  padding: 10px;
  position: absolute;
  top: -60px;
  background: rgb(40, 167, 69);
  color: white;
}

.brinde-container:hover {
  transform: scale(1.2);
}

.brinde-container:active {
  transition: transform ease-out 0.1s;
  transform: scale(0.9);
}

.navbar {
  padding: 1px 0px;
  background-color: var(--secondary);
  border-top: 2px solid var(--success);
}

.navbar-editando-pedido {
  background-color: #e1ad01 !important;
}

#minimized-ajuda {
  transition: all 0.2s;
  position: absolute;
  right: 0px;
  border-radius: 15px;
  bottom: 10px;
  word-wrap: break-word;
  text-align: center;
}

#ajuda-container {
  transition: all 0.2s;
  bottom: 100px;
  right: 25px;
}

input[type="number"]::-webkit-inner-spin-button {
  opacity: 1;
}

.input-qtd {
  background: none !important;
  outline: none !important;
  background: none;
  width: 42px;
  border: none;
  border-bottom: 1px solid rgb(63, 63, 63);
}

.qtd-item-div {
  display: inline-block;
  width: 42px;
}

.lista-button>* {
  text-align: center !important;
  border-radius: 25px !important;
}

.form-select {
  border-color: var(--primary);
}

/* The snackbar - position it at the bottom and in the middle of the screen */
#snackbar,
#snackbarBrinde {
  max-width: 600px;
  opacity: 0.8;
  visibility: hidden;
  /* Hidden by default. Visible on click */
  background-color: #333;
  /* Black background color */
  color: #fff;
  /* White text color */
  text-align: center;
  /* Centered text */
  border-radius: 25px;
  /* Rounded borders */
  padding: 8px;
  /* Padding */
  position: fixed;
  /* Sit on top of the screen */
  z-index: 1052;
  /* Add a z-index if needed */
  bottom: 15%;
  /* 30px from the bottom */
}

#snackbarBrinde {
  position: absolute;
  left: 15px;
  transform: translate(-17px, -45px) scale(1) !important;
  font-size: initial;
  min-width: 200px;
}

/* Show the snackbar when clicking on a button (class added with JavaScript) */
#snackbar.show,
#snackbarBrinde.show {
  visibility: visible;
  /* Show the snackbar */
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

.dropdown-item {
  border-bottom: 2px solid lightgrey;
  transition: all 0.2s;
}

.dropdown-item:active {
  border-bottom: 2px solid rgb(33 135 56) !important;
  background: #19f24a5e !important;
}

.dropdown-item:hover {
  border-bottom: 2px solid rgb(17, 177, 43);
  background-color: rgb(235, 232, 232);
}

tbody.striped-table:nth-child(even) {
  background-color: #f1f1f1;
}

.row {
  --bs-gutter-x: 0rem;
}

body {
  font-family: Verdana, sans-serif;
  overflow-x: hidden;
}

tr.tabela {
  transition: all 0.2s;
}

tr.tabela:hover {
  background-color: #00000029;
}

.materiais-opcionais {
  border-style: solid;
  background-color: #3cb4bb;
  padding: 5px 0px;
  font-size: 1rem;
  color: white;
}

.dropdown-menu {
  transition: all 0.1s;
  min-width: 0px;
  padding: 0px 0;
  margin: 0px;
}

.modal-content {
  border: none;
}

.form-check-input {
  vertical-align: middle !important;
}

.form-check-input:checked {
  background-color: #28a745;
  border-color: #008000;
}

.form-check-input:focus {
  border-color: #008000;
  box-shadow: 0 0 0 0.2rem #28a7464d;
}

#sideNavBackDrop {
  position: fixed;
  /* Sit on top of the page content */
  display: none;
  /* Hidden by default */
  width: 100%;
  /* Full width (cover the whole page) */
  height: 100%;
  /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.7);
  /* Black background with opacity */
  z-index: 3;
  /* Specify a stack order in case you're using a different order for other elements */
  animation-name: fadeinBackdrop;
  animation-duration: 0.2s;
}

@keyframes fadeinBackdrop {
  from {
    opacity: 0;
  }

  to {
    opacity: 0.7;
  }
}

#imgBackDrop {
  transition: all 0.2s;
  cursor: pointer;
  position: fixed;
  /* Sit on top of the page content */
  display: none;
  /* Hidden by default */
  width: 100%;
  /* Full width (cover the whole page) */
  height: 100%;
  /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  /* Black background with opacity */
  z-index: 1100;
  /* Specify a stack order in case you're using a different order for other elements */
  align-items: center;
  justify-content: center;
}

.btn {
  text-align: left;
}

.botoes {
  transition: all 0.2s ease-in-out;
  position: relative;
  left: 40%;
  top: -73px;
  z-index: 1;
}

.botoes:hover {
  transform: scale(1.2);
  opacity: 0.8;
}

.btn-lista:hover {
  background-color: #15cce2 !important;
}

.indicador-collapse {
  margin-right: 20px;
  position: relative;
  left: 40%;
  top: -73px;
  z-index: 1;
}

.flipped {
  transform: rotate(180deg);
}

.dropdown-menu {
  text-align: center;
}

tbody,
td,
tfoot,
th,
thead,
tr {
  border-color: inherit;
  border-style: solid;
  border-width: 1px;
  border-left-style: none;
  border-right-style: none;
  border-top-style: none;
}

.table-size {
  margin: auto;
  width: 100%;
}

.dropdown-menu {
  text-align: center;
  z-index: 1;
}

.pointer {
  cursor: pointer;
}

.sticky-top {
  box-shadow: 0px 8px 10px #00000062;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
}

.fixed-bottom {
  box-shadow: 0px 8px 10px #00000062;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
}

.rounded-pill {
  transition: all 0.2s ease-in-out;
}

.carrinho-centro {
  cursor: pointer;
  margin: auto;
  width: 70px;
  padding: 5px 0px;
  border-radius: 50px;
  border: 2px solid lime;
  background-color: white;
  position: relative;
  bottom: 40px;
  transition: background 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.carrinho-centro:hover {
  transform: scale(1.1);
  background-color: rgb(192, 192, 192);
}

.carrinho-centro:hover .rounded-pill {
  color: rgb(192, 192, 192);
}

.grow-hover {
  transition: all 0.2s ease-in-out;
}

.grow-hover:hover {
  transform: scale(1.3);
}

.bottom-nav-text {
  font-size: 15px;
}

/* The side navigation menu */
.sidenav {
  height: 100%;
  /* 100% Full-height */
  width: 0;
  /* 0 width - change this with JavaScript */
  position: fixed;
  /* Stay in place */
  z-index: 4;
  /* Stay on top */
  top: 0;
  /* Stay at the top */
  right: 0;
  background-color: rgb(255, 255, 255);
  /* Black*/
  overflow: hidden;
  /* Disable scroll */
  padding-top: 2px;
  /* Place content 60px from the top */
  transition: 0.2s;
  /* 0.5 second transition effect to slide in the sidenav */
}

.img-close {
  width: 40px;
  height: 40px;
  cursor: pointer;
  color: red;
  padding: 3px;
}

/* .img-painel {
  height: 430px !important;
  width: 420px !important;
  border-radius: 10px;
} */
.imagem {
  padding: 5px;
  background-color: white;
  cursor: default;
  height: 90vw;
  width: 90vw;
  max-height: 400px;
  max-width: 400px;
}

.responsive-table-header {
  padding: 0px 50px;
  color: black;
  border-color: #dafafd !important;
  border-style: solid;
  background-color: #dafafd !important;
  font-size: 19px;
}

.lista-nome {
  font-size: 16px;
  font-weight: normal;
}

.lista-preco {
  font-size: 14px;
  color: #ffffff;
  padding: 2px 0;
}

.lista-preco .preco-original {
  color: #e0e0e0;
  text-decoration: line-through;
  font-size: 13px;
  margin-right: 4px;
}

.lista-preco .preco-final {
  color: #ffeb3b;
  font-weight: 600;
}

/* Ajuste para telas muito pequenas */
@media screen and (max-width: 320px) {
  .lista-preco {
    font-size: 13px;
  }

  .lista-preco .preco-original {
    font-size: 12px;
  }
}

.lista-itens {
  font-weight: normal;
  font-size: 15px;
}

.lista-reset-button {
  padding: 2px 10px;
  border-radius: 15px;
}

.overlay-panel-img {
  height: 50vw;
  width: 50vw;
  max-height: 300px;
  max-width: 300px;
}

@media screen and (max-width: 380px) {

  /* .edicao-pedido-clicked ~ .edicao-texto {
    padding-left: 37px;
    transform: translate(16px, 0px);
    width: 250px;
  }
  .edicao-texto {
    font-size: 13px;
  } */
  .lista-reset-button {
    padding: 0px 6px;
    font-size: small;
  }

  .input-qtd {
    width: 22px;
  }

  .qtd-item-div {
    width: 22px;
  }

  .responsive-table-header {
    padding: 0px 10px;
    font-size: 13px;
  }

  .lista-nome {
    font-size: 12px;
  }

  .lista-preco {
    font-size: 13px;
  }

  .lista-itens {
    font-size: 11px;
  }

  .dropdown-item {
    padding: 0;
    white-space: break-spaces;
  }

  .dropdown-menu {
    font-size: 5px;
  }

  .carrinho-centro {
    bottom: 30px;
  }

  .bottom-nav-text {
    font-size: 10px;
  }

  #snackbar {
    font-size: 9px;
    max-width: 250px;
  }

  .dropdown-menu {
    font-size: 12px;
  }

  /* .img-painel {
    height: 260px !important;
    width: 260px !important;
    margin: 20px auto 20px auto !important;
  } */
  /* .imagem {
    height: 200px !important;
    width: 200px !important;
  } */
  .btn.mobile-button {
    font-size: 11px;
    padding: 2px 0px;
  }

  .botoes {
    margin: 10px;
    left: 29%;
    top: -72px;
  }

  .indicador-collapse {
    left: 31%;
    top: -72px;
  }

  .mobile-text {
    font-size: 9.7px !important;
  }

  .btn-sm {
    font-size: 10px;
  }

  .mobile-cart {
    font-size: 20px;
  }
}

@media only screen and (max-width: 430px) and (min-width: 381px) {

  /* .edicao-pedido-clicked ~ .edicao-texto {
    padding-left: 37px;
    transform: translate(16px, 0px);
    width: 285px;
  }
  .edicao-texto {
    font-size: 15px;
  } */
  .lista-reset-button {
    padding: 2px 8px;
    font-size: 14px;
  }

  .input-qtd {
    width: 29px;
  }

  .qtd-item-div {
    width: 29px;
  }

  .responsive-table-header {
    font-size: 15px;
    padding: 0px 13px;
  }

  .lista-nome {
    font-size: 13px;
  }

  .lista-preco {
    font-size: 14px;
  }

  .lista-itens {
    font-size: 12px;
  }

  .dropdown-item {
    padding: 0;
    white-space: break-spaces;
  }

  .dropdown-item {
    padding: 0;
    white-space: break-spaces;
  }

  .carrinho-centro {
    bottom: 31px;
  }

  .bottom-nav-text {
    font-size: 11px;
  }

  .btn.mobile-button {
    font-size: 11px;
    padding: 4px;
  }

  /* .img-painel {
    height: 260px !important;
    width: 260px !important;
    margin: 20px auto 20px auto !important;
  } */
  /* .imagem {
    height: 200px !important;
    width: 200px !important;
  } */
  #snackbar {
    font-size: 12px;
    max-width: 280px;
  }

  .indicador-collapse {
    left: 33%;
    top: -73px;
  }

  .mobile-text {
    font-size: 12.3px !important;
  }

  .btn-sm {
    font-size: 11px;
  }
}

@media only screen and (max-width: 600px) and (min-width: 431px) {
  .lista-reset-button {
    font-size: 15px;
  }

  .input-qtd {
    width: 38px;
  }

  .qtd-item-div {
    width: 38px;
  }

  .responsive-table-header {
    padding: 0px 15px;
    font-size: 17px;
  }

  .lista-nome {
    font-size: 14px;
  }

  .lista-preco {
    font-size: 15px;
  }

  .lista-itens {
    font-size: 13px;
  }

  .carrinho-centro {
    bottom: 35px;
  }

  .bottom-nav-text {
    font-size: 12px;
  }

  .btn.mobile-button {
    font-size: 12px;
    padding: 5px;
  }

  /* .img-painel {
    height: 360px !important;
    width: 370px !important;
    margin: 20px auto 20px auto !important;
  } */
  /* .imagem {
    height: 300px !important;
    width: 300px !important;
  } */
  .mobile-text {
    font-size: 14.5px !important;
  }

  .indicador-collapse {
    left: 35%;
    top: -73px;
  }

  .dropdown-menu {
    min-width: 0rem;
    font-size: 12px;
  }
}

@media only screen and (max-width: 780px) and (min-width: 601px) {
  .input-qtd {
    width: 39px;
  }

  .qtd-item-div {
    width: 39px;
  }

  .responsive-table-header {
    padding: 0px 20px;
    font-size: 18px;
  }

  .lista-nome {
    font-size: 15px;
  }

  .lista-preco {
    font-size: 16px;
  }

  .lista-itens {
    font-size: 14px;
  }

  .carrinho-centro {
    bottom: 35px;
  }

  .bottom-nav-text {
    font-size: 13px;
  }

  .indicador-collapse {
    left: 38%;
    top: -77px;
  }

  .mobile-text {
    font-size: 15px !important;
  }
}

.content {
  justify-content: center;
  width: 100%;
  display: none;
  overflow: scroll;
  height: 70vh;
  background-color: #f1f1f1;
  border: 2px solid #73ad21;
  overflow-x: hidden;
}

.table-border {
  border-style: none, none, ridge, none;
}

.carrinho-text {
  margin: 10px 10px;
}

/* .imagem {
  height: 600px;
  width: 600px;
} */
.img-preview {
  cursor: zoom-in;
  height: 40px;
  width: 40px;
}

.col5 {
  flex: 0 0 auto;
  width: 41.666667%;
}

.responsive-align {
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.col5expand {
  display: flex !important;
  align-items: center;
  justify-content: flex-end;
  flex: 0 0 auto;
  width: 41.666667%;
}

.col4 {
  flex: 0 0 auto;
  width: 33.333333%;
}

.col8 {
  flex: 0 0 auto;
  width: 66.666667%;
}

.brinde {
  border-radius: 15px;
  background: #f2f2f2;
  padding: 10px 0px;
  position: relative;
}

@media only screen and (max-width: 870px) {
  .brinde {
    font-size: 0.8rem;
  }

  .col4 {
    flex: 0 0 auto;
    width: 100%;
  }

  .col8 {
    flex: 0 0 auto;
    width: 100%;
  }

  .col5 {
    flex: 0 0 auto;
    width: 0px;
  }

  .col5expand {
    width: 50% !important;
  }

  .responsive-align {
    align-items: center;
    justify-content: flex-start;
  }
}

.search-container {
  padding: 10px 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin: 10px 0;
}

.search-container .form-control:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 0.2rem rgba(43, 186, 203, 0.25);
}

.search-container .btn-outline-secondary {
  border-color: #ced4da;
}

.search-container .btn-outline-secondary:hover {
  background-color: #e9ecef;
  border-color: #adb5bd;
}

@media screen and (max-width: 600px) {
  .search-container {
    padding: 8px 10px;
    margin: 8px 0;
  }

  .search-container .form-control {
    font-size: 14px;
  }

  .search-container small {
    font-size: 11px;
  }
}
</style>
