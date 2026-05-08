<template>
  <Loader v-show="loading"></Loader>
  <div id="dropin-container"></div>
  <div
    class="d-flex row form-container checkout-min-height"
    style="margin: 0px auto"
  >
    <div
      v-if="
        pagamento_pedido.pagamento_selecionado == 1 ||
          pagamento_pedido.pagamento_selecionado == 3
      "
      id="pagamento-credito"
      class="row m-0 p-0 col-12"
    >
      <div class="col-12">
        <div class="col-12 mb-4 text-center">
          <h4 v-if="pagamento_pedido.pagamento_selecionado == 1">
            Cartão de Crédito
          </h4>
          <h4 v-if="pagamento_pedido.pagamento_selecionado == 3">
            Dois Cartões
          </h4>
        </div>
        <div class="col-12">
          <div class="my-2">
            <div v-if="pagamento_pedido.pedido.parcelas_pagamento_creditos[
                            pagamento_pedido.pedido.parcelas_pagamento_creditos.length - 1
                          ].acrescimo == 0" class="col-12" style="font-weight: normal">
              <span v-if="!pagamento_pedido.temDesconto">
                Pedido: <b>{{ 
          new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(pagamento_pedido.pedido.valor_total)
             }}</b>
              </span>
              <span v-else>
                Pedido:
              <b>
                {{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pagamento_pedido.pedido.valor_total)
                }}</b
              >
              <br>
                <span
                  v-if="
                    pagamento_pedido.pedido.desconto_representante.porcentagem
                  "
                >
                  ({{
                    new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(
                      pagamento_pedido.pedido.valor_total *
                        (pagamento_pedido.pedido.desconto_representante
                          .desconto_porcentagem /
                          100)
                    )
                  }}
                  de desconto)
                </span>
                <span v-else>
                  ({{
                    new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(
                      pagamento_pedido_prop.pedido.valor_total -
                        pagamento_pedido_prop.valor_pos_desconto
                    )
                  }}
                  de desconto)
                </span>
              </span>
            </div>
            <div style="font-weight: normal" class="col-12">
              Frete:
              <b v-if="pagamento_pedido.frete > 0">{{
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(pagamento_pedido.frete)
              }}</b>
              <b
                v-else-if="
                  pagamento_pedido.frete == 0 && pagamento_pedido.freteGratis
                "
              >
                FRETE GRATÍS
              </b>
              <b v-else> FRETE A COMBINAR </b>
            </div>

            <div v-if="pagamento_pedido.pedido.parcelas_pagamento_creditos[
                            pagamento_pedido.pedido.parcelas_pagamento_creditos.length - 1
                          ].acrescimo == 0" style="font-weight: normal">
              Valor a pagar:
              <b>
                {{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(pagamento_pedido.valor_final)
                }}
              </b>
            </div>
            <div v-else style="font-weight: normal">
              Valor a pagar:
              <b><u style="color:red"><span v-if="valor_a_pagar">{{ new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(valor_a_pagar) }}</span><span v-else>Selecione as parcelas.</span></u>
                
              </b>
            </div>

            <br />
            Campos marcados com * são obrigatórios.
          </div>
        </div>
      </div>

      <h3
        v-if="pagamento_pedido.dados_pagamento.dois_cartoes"
        style="color: red; margin-bottom: 40px"
      >
        PRIMEIRO CARTÃO
      </h3>
      <div
        v-if="pagamento_pedido.dados_pagamento.dois_cartoes"
        style="margin-bottom: 20px"
        class="primeiro-slider"
      >
        <Slider
          @update="
            pagamento_pedido.valor_segundo_cartao =
              pagamento_pedido.valor_final -
              pagamento_pedido.valor_primeiro_cartao
          "
          v-model="pagamento_pedido.valor_primeiro_cartao"
          :min="1.0"
          :max="pagamento_pedido.valor_final - 1"
          :step="-1"
          :format="format"
        />
      </div>

      <div class="col6ToNone d-flex justify-content-end">
        <div class="flip-container" :class="flip ? 'flipped' : ''">
          <div class="flipper">
            <div class="front">
              <div
                class="cartao-container d-flex justify-content-center align-items-center"
              >
                <img :src="getURL('creditcardfrontv2')" class="img-cartao" />
                <img
                  v-if="bandeiraCartão != ''"
                  class="img-bandeira"
                  :src="getURL(bandeiraCartão)"
                />
                <div
                  class="cartao-numero"
                  :class="selectedInfo.numero ? 'cartao-selected' : ''"
                >
                  <span v-if="cartao.numero.length > 0">{{
                    cartao.numero
                  }}</span>
                  <span v-else>0000 0000 0000 0000</span>
                </div>
                <div
                  class="cartao-nome"
                  :class="selectedInfo.nome ? 'cartao-selected' : ''"
                >
                  <span v-if="cartao.nome.length > 0">
                    {{ cartao.nome }}
                  </span>
                  <span v-else> NOME COMPLETO </span>
                </div>
                <div
                  class="cartao-validade"
                  :class="selectedInfo.validade ? 'cartao-selected' : ''"
                >
                  <div>valido até:</div>
                  <span
                    style="font-size: 18px"
                    v-if="cartao.validade.length > 0"
                  >
                    {{ cartao.validade }}</span
                  >
                  <span style="font-size: 18px" v-else> MM/AA </span>
                </div>
              </div>
            </div>
            <div class="back">
              <img :src="getURL('creditcardbackv2')" class="img-cartao" />
              <div class="cartao-cvv">
                <span v-if="cartao.cvv.length > 0">
                  {{ cartao.cvv }}
                </span>
                <span v-else> 000 </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col6">
        <div class="cartao-container">
          <div class="row text-left">
            <div class="col-12"></div>
            <div class="col-12">
              <h4 style="font-size: 1.3rem">
                <b> Informe os dados do cartão </b>
              </h4>
            </div>
            <div class="col-12">
              Número * <br />
              <input
                @keyup="validarBrand(cartao.numero)"
                @focus="selectedInfo.numero = true"
                @blur="
                  validarBrand(cartao.numero);
                  selectedInfo.numero = false;
                  v$.cartao.numero.$touch();
                "
                id="numero-campo-cartao"
                :class="v$.cartao.numero.$error ? 'invalid-input' : ''"
                v-model="cartao.numero"
                v-mask="'#### #### #### ####'"
                class="form-control"
                type="tel"
                placeholder="0000 0000 0000 0000"
              />
            </div>
            <div class="col-12">
              Nome * <br />
              <input
                @focus="selectedInfo.nome = true"
                @blur="
                  selectedInfo.nome = false;
                  v$.cartao.nome.$touch();
                "
                id="nome-campo-cartao"
                :class="v$.cartao.nome.$error ? 'invalid-input' : ''"
                v-model="cartao.nome"
                class="form-control"
                type="text"
                placeholder="Nome (como está no cartão)"
              />
            </div>
            <div class="col-6">
              Validade * <br />
              <input
                @focus="selectedInfo.validade = true"
                @blur="
                  selectedInfo.validade = false;
                  v$.cartao.validade.$touch();
                "
                id="validade-campo-cartao"
                :class="v$.cartao.validade.$error ? 'invalid-input' : ''"
                v-model="cartao.validade"
                v-mask="'##/##'"
                class="form-control"
                type="tel"
                placeholder="MM/AA"
              />
            </div>
            <div class="col-6">
              CVV * <br />
              <input
                @focus="flip = true"
                @blur="
                  flip = false;
                  v$.cartao.cvv.$touch();
                "
                id="cvv-campo-cartao"
                :class="v$.cartao.cvv.$error ? 'invalid-input' : ''"
                v-model="cartao.cvv"
                v-mask="'###'"
                class="form-control"
                type="tel"
                placeholder="000"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        Quantidade de Parcelas *
        <select
          @change="mudarValorAPagar()"
          id="parcela-campo-cartao"
          v-model="cartao.parcelas"
          class="form-select text-center"
        >
          <option
            v-for="parcela in pagamento_pedido.parcelas"
            :key="parcela"
            :value="parcela"
          >
            <span>
              {{ parcela }}x de
              {{
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(
                  pagamento_pedido.dados_pagamento.dois_cartoes
                    ? pagamento_pedido.valor_primeiro_cartao / parcela
                    : (pagamento_pedido.valor_final *
                        (1 +
                          pagamento_pedido.pedido.parcelas_pagamento_creditos[
                            parcela - 1
                          ].acrescimo /
                            100)) /
                        parcela
                )
              }}
              ({{
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(
                  pagamento_pedido.valor_final *
                    (1 +
                      pagamento_pedido.pedido.parcelas_pagamento_creditos[
                        parcela - 1
                      ].acrescimo /
                        100)
                )
              }} <u v-if="pagamento_pedido.pedido.parcelas_pagamento_creditos[
                            parcela - 1
                          ].acrescimo == 0">S/JUROS</u>
                          <u v-else>C/JUROS</u>)</span
            >
          </option>
        </select>
      </div>
      <div
        id="titular-campo"
        :style="
          v$.titular.$error
            ? 'border: 1px solid rgb(199, 0, 0); border-radius: 5px'
            : ''
        "
        class="py-1 my-2"
      >
        <div class="row" style="margin: 0px; padding: 0px">
          <div class="col6 d-flex align-items-center justify-content-center">
            Você é o titular deste cartão?
          </div>
          <div class="col6">
            <button
              class="btn btn-danger"
              :disabled="titular == false"
              @click="
                titular = false;
                updateCardInfo(1);
                smoothScroll('titular-campo');
              "
            >
              Não
            </button>
            <button
              style="margin-left: 10px"
              class="btn btn-success"
              :disabled="titular == true"
              @click="
                titular = true;
                updateCardInfo(1);
                smoothScroll('titular-campo');
              "
            >
              Sim
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="titular != null"
        class="row mt-2 text-left"
        style="padding: 0px; margin: auto"
      >
        <div id="dados-titular-cartao" class="col-12 text-center">
          <h4><b> Dados do titular do cartão </b></h4>
        </div>
        <div v-if="titular == false" class="col-12">
          Seu grau parentesco com o titular *
          <select
            id="parentesco-campo"
            @blur="v$.parentesco.$touch()"
            :class="v$.parentesco.$error ? 'invalid-input' : ''"
            v-model="parentesco"
            class="form-select text-center"
            aria-label="Default select example"
          >
            <option disabled :value="null">SELECIONE</option>
            <option
              v-for="parentesco in grauParentesco"
              :key="parentesco"
              :value="parentesco"
            >
              {{ parentesco }}
            </option>
          </select>
        </div>
        <div class="col-6">
          Nome <br />
          <input
            @blur="v$.cliente.nome.$touch()"
            :disabled="titular"
            placeholder="NOME DO TITULAR DO CARTÃO"
            id="nome-campo-cliente"
            :class="v$.cliente.nome.$error ? 'invalid-input' : ''"
            v-model="cliente.nome"
            class="form-control"
            type="text"
          />
        </div>
        <div class="col-6">
          Sobrenome <br />
          <input
            @blur="v$.cliente.sobrenome.$touch()"
            :disabled="titular"
            placeholder="SOBRENOME DO TITULAR DO CARTÃO"
            id="sobrenome-campo-cliente"
            :class="v$.cliente.sobrenome.$error ? 'invalid-input' : ''"
            v-model="cliente.sobrenome"
            class="form-control"
            type="text"
          />
        </div>
        <div class="col-6">
          E-Mail <br />
          <input
            @blur="v$.cliente.email.$touch()"
            placeholder="EMAIL DO TITULAR DO CARTÃO"
            id="email-campo-cliente"
            :class="v$.cliente.email.$error ? 'invalid-input' : ''"
            v-model="cliente.email"
            class="form-control"
            type="text"
          />
        </div>
        <div class="col-6">
          Celular <br />
          <input
            @blur="v$.cliente.telefone.$touch()"
            placeholder="TELEFONE/CELULAR DO TITULAR DO CARTÃO"
            id="telefone-campo-cliente"
            :class="v$.cliente.telefone.$error ? 'invalid-input' : ''"
            v-model="cliente.telefone"
            v-mask="['(##) ####-####', '(##) # ####-####']"
            class="form-control"
            type="text"
          />
        </div>
        <div class="col6">
          CPF * <br />
          <input
            @blur="v$.cliente.cpf.$touch()"
            :disabled="titular"
            @keyup="validarCPF(cliente.cpf, true)"
            id="cpf-campo-cliente"
            :class="v$.cliente.cpf.$error ? 'invalid-input' : ''"
            v-model="cliente.cpf"
            v-mask="'###.###.###-##'"
            class="form-control"
            type="tel"
            placeholder="000.000.000-00"
          />
        </div>
        <div class="col6">
          CEP * <br />
          <input
            @blur="v$.cliente.cep.$touch()"
            @keyup="getCep(cliente.cep, cliente, 'numero-campo-cliente')"
            v-model="cliente.cep"
            id="cep-campo-cliente"
            :class="v$.cliente.cep.$error ? 'invalid-input' : ''"
            v-mask="'#####-###'"
            class="form-control"
            type="tel"
            placeholder="00000-000"
          />
        </div>
        <div class="col-8">
          Endereço * <br />
          <input
            @blur="v$.cliente.logradouro.$touch()"
            id="endereco-campo-cliente"
            :class="v$.cliente.logradouro.$error ? 'invalid-input' : ''"
            v-model="cliente.logradouro"
            style="text-transform: uppercase"
            class="form-control"
            type="text"
            maxlength="33"
            placeholder="ex: Rua dos Ferroviarios"
          />
        </div>
        <div class="col-4">
          Número * <br />
          <input
            @blur="v$.cliente.numero.$touch()"
            id="numero-campo-cliente"
            :class="v$.cliente.numero.$error ? 'invalid-input' : ''"
            v-model="cliente.numero"
            v-mask="'########'"
            class="form-control"
            type="text"
            placeholder="ex: 130"
          />
        </div>
        <div class="col6">
          Complemento <br />
          <input
            v-model="cliente.complemento"
            style="text-transform: uppercase"
            class="form-control"
            type="text"
            maxlength="10"
            placeholder="Complemento"
          />
        </div>
        <div class="col6">
          Bairro * <br />
          <input
            @blur="v$.cliente.bairro.$touch()"
            id="bairro-campo-cliente"
            :class="v$.cliente.bairro.$error ? 'invalid-input' : ''"
            v-model="cliente.bairro"
            style="text-transform: uppercase"
            class="form-control"
            type="text"
            placeholder="Bairro"
          />
        </div>
        <div class="col6">
          Cidade * <br />
          <input
            @blur="v$.cliente.cidade.$touch()"
            id="cidade-campo-cliente"
            :class="v$.cliente.cidade.$error ? 'invalid-input' : ''"
            v-model="cliente.cidade"
            readonly
            style="text-transform: uppercase"
            class="form-control"
            type="text"
            placeholder="preencha o cep."
          />
        </div>
        <div class="col6">
          Estado * <br />
          <input
            @blur="v$.cliente.uf.$touch()"
            id="uf-campo-cliente"
            :class="v$.cliente.uf.$error ? 'invalid-input' : ''"
            v-model="cliente.uf"
            readonly
            style="text-transform: uppercase"
            class="form-control"
            type="text"
            placeholder="preencha o cep."
          />
        </div>
        <!-- <div v-if="pagamento_pedido.carteirinha.status && pagamento_pedido.valor_final >= pagamento_pedido.carteirinha.valor" class="col12 text-center">
          <h5 style="color: red;">Anexar comprovante de matrícula ou RA *</h5>
          <button class="btn btn-success form-control" onclick="document.getElementById('carteirinha').click()">Tirar Foto/Selecionar Foto</button>
          <input
            style="display: none;"
            id="carteirinha"
            @blur="v$.cliente.carteirinha.$touch()"
            :class="v$.cliente.carteirinha.$error ? 'invalid-input' : ''"
            class="form-control"
            type="file"
            accept="image/*"
            @change="handleFileUpload($event)"
          />
        </div> -->
      </div>
    </div>

    <div
      class="row m-0 p-0 col-12"
      v-if="pagamento_pedido.dados_pagamento.dois_cartoes"
    >
      <h3 style="color: red; margin-bottom: 40px">SEGUNDO CARTÃO</h3>
      <div style="margin-bottom: 20px" class="segundo-slider">
        <Slider
          :disabled="true"
          v-model="pagamento_pedido.valor_segundo_cartao"
          :max="pagamento_pedido.valor_final - 1"
          :min="1.0"
          :step="-1"
          :format="format"
        />
      </div>

      <div class="col6ToNone d-flex justify-content-end">
        <div class="flip-container" :class="flip2 ? 'flipped' : ''">
          <div class="flipper">
            <div class="front">
              <div
                class="cartao-container d-flex justify-content-center align-items-center"
              >
                <img :src="getURL('creditcardfront')" class="img-cartao" />
                <img
                  v-if="bandeiraCartão != ''"
                  class="img-bandeira"
                  :src="getURL(bandeiraCartão)"
                />
                <div
                  class="cartao-numero"
                  :class="selectedInfo.numero ? 'cartao-selected' : ''"
                >
                  <span v-if="segundo_cartao.numero.length > 0">{{
                    segundo_cartao.numero
                  }}</span>
                  <span v-else>0000 0000 0000 0000</span>
                </div>
                <div
                  class="cartao-nome"
                  :class="selectedInfo.nome ? 'cartao-selected' : ''"
                >
                  <span v-if="segundo_cartao.nome.length > 0">
                    {{ segundo_cartao.nome }}
                  </span>
                  <span v-else> NOME COMPLETO </span>
                </div>
                <div
                  class="cartao-validade"
                  :class="selectedInfo.validade ? 'cartao-selected' : ''"
                >
                  <div>valido até:</div>
                  <span
                    style="font-size: 18px"
                    v-if="segundo_cartao.validade.length > 0"
                  >
                    {{ segundo_cartao.validade }}</span
                  >
                  <span style="font-size: 18px" v-else> MM/AA </span>
                </div>
              </div>
            </div>
            <div class="back">
              <img :src="getURL('creditcardback')" class="img-cartao" />
              <div class="cartao-cvv">
                <span v-if="segundo_cartao.cvv.length > 0">
                  {{ segundo_cartao.cvv }}
                </span>
                <span v-else> 000 </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col6">
        <div class="cartao-container">
          <div class="row text-left">
            <div class="col-12"></div>
            <div class="col-12">
              <h4 style="font-size: 1.3rem">
                <b> Informe os dados do cartão </b>
              </h4>
            </div>
            <div class="col-12">
              Número * <br />
              <input
                @keyup="validarBrand(segundo_cartao.numero)"
                @focus="selectedInfo.numero = true"
                @blur="
                  validarBrand(segundo_cartao.numero);
                  selectedInfo.numero = false;
                  v$.segundo_cartao.numero.$touch();
                "
                id="numero-campo-segundo_cartao"
                :class="v$.segundo_cartao.numero.$error ? 'invalid-input' : ''"
                v-model="segundo_cartao.numero"
                v-mask="'#### #### #### ####'"
                class="form-control"
                type="tel"
                placeholder="0000 0000 0000 0000"
              />
            </div>
            <div class="col-12">
              Nome * <br />
              <input
                @focus="selectedInfo.nome = true"
                @blur="
                  selectedInfo.nome = false;
                  v$.segundo_cartao.nome.$touch();
                "
                id="nome-campo-segundo_cartao"
                :class="v$.segundo_cartao.nome.$error ? 'invalid-input' : ''"
                v-model="segundo_cartao.nome"
                class="form-control"
                type="text"
                placeholder="Nome (como está no cartão)"
              />
            </div>
            <div class="col-6">
              Validade * <br />
              <input
                @focus="selectedInfo.validade = true"
                @blur="
                  selectedInfo.validade = false;
                  v$.segundo_cartao.validade.$touch();
                "
                id="validade-campo-segundo_cartao"
                :class="
                  v$.segundo_cartao.validade.$error ? 'invalid-input' : ''
                "
                v-model="segundo_cartao.validade"
                v-mask="'##/##'"
                class="form-control"
                type="tel"
                placeholder="MM/AA"
              />
            </div>
            <div class="col-6">
              CVV * <br />
              <input
                @focus="flip2 = true"
                @blur="
                  flip2 = false;
                  v$.segundo_cartao.cvv.$touch();
                "
                id="cvv-campo-segundo_cartao"
                :class="v$.segundo_cartao.cvv.$error ? 'invalid-input' : ''"
                v-model="segundo_cartao.cvv"
                v-mask="'###'"
                class="form-control"
                type="tel"
                placeholder="000"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="">
        Quantidade de Parcelas *
        <select
          v-model="segundo_cartao.parcelas"
          class="form-select text-center"
          aria-label="Default select example"
        >
          <option
            v-for="parcela in pagamento_pedido.parcelas"
            :key="parcela"
            :value="parcela"
          >
            <span>
              {{ parcela }}x de
              {{
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(pagamento_pedido.valor_segundo_cartao / parcela)
              }}
            </span>
          </option>
        </select>
      </div>
      <div
        id="segundo_titular-campo"
        :style="
          v$.segundo_titular.$error
            ? 'border: 1px solid rgb(199, 0, 0); border-radius: 5px'
            : ''
        "
        class="py-1 my-2"
      >
        <div class="row" style="margin: 0px; padding: 0px">
          <div class="col6 d-flex align-items-center justify-content-center">
            Você é o titular deste cartão?
          </div>
          <div class="col6">
            <button
              class="btn btn-danger"
              :disabled="segundo_titular == false"
              @click="
                segundo_titular = false;
                updateCardInfo(2);
                smoothScroll('segundo_titular-campo');
              "
            >
              Não
            </button>
            <button
              style="margin-left: 10px"
              class="btn btn-success"
              :disabled="segundo_titular == true"
              @click="
                segundo_titular = true;
                updateCardInfo(2);
                smoothScroll('segundo_titular-campo');
              "
            >
              Sim
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="segundo_titular != null"
        class="row mt-2 text-left"
        style="padding: 0px; margin: auto"
      >
        <div class="col-12 text-center">
          <h4><b> Dados do titular do cartão </b></h4>
        </div>
        <div v-if="segundo_titular == false" class="col-12">
          Seu grau parentesco com o titular *
          <select
            @blur="v$.segundo_parentesco.$touch()"
            id="segundo_parentesco-campo"
            :class="v$.segundo_parentesco.$error ? 'invalid-input' : ''"
            v-model="segundo_parentesco"
            class="form-select text-center"
            aria-label="Default select example"
          >
            <option disabled :value="null">SELECIONE</option>
            <option
              v-for="parentesco in grauParentesco"
              :key="parentesco"
              :value="parentesco"
            >
              {{ parentesco }}
            </option>
          </select>
        </div>
        <div class="col-6">
          Nome <br />
          <input
            @blur="v$.segundo_cliente.nome.$touch()"
            id="nome-campo-segundo_cliente"
            :class="v$.segundo_cliente.nome.$error ? 'invalid-input' : ''"
            :disabled="segundo_titular"
            placeholder="NOME DO TITULAR DO CARTÃO"
            v-model="segundo_cliente.nome"
            class="form-control"
            type="text"
          />
        </div>
        <div class="col-6">
          Sobrenome <br />
          <input
            @blur="v$.segundo_cliente.sobrenome.$touch()"
            id="sobrenome-campo-segundo_cliente"
            :class="v$.segundo_cliente.sobrenome.$error ? 'invalid-input' : ''"
            :disabled="segundo_titular"
            placeholder="SOBRENOME DO TITULAR DO CARTÃO"
            v-model="segundo_cliente.sobrenome"
            class="form-control"
            type="text"
          />
        </div>
        <div class="col-6">
          E-Mail <br />
          <input
            @blur="v$.segundo_cliente.email.$touch()"
            id="email-campo-segundo_cliente"
            :class="v$.segundo_cliente.email.$error ? 'invalid-input' : ''"
            placeholder="EMAIL DO TITULAR DO CARTÃO"
            v-model="segundo_cliente.email"
            class="form-control"
            type="text"
          />
        </div>
        <div class="col-6">
          Celular <br />
          <input
            @blur="v$.segundo_cliente.telefone.$touch()"
            id="telefone-campo-segundo_cliente"
            :class="v$.segundo_cliente.telefone.$error ? 'invalid-input' : ''"
            placeholder="TELEFONE/CELULAR DO TITULAR DO CARTÃO"
            v-model="segundo_cliente.telefone"
            v-mask="['(##) ####-####', '(##) # ####-####']"
            class="form-control"
            type="text"
          />
        </div>
        <div class="col6">
          CPF * <br />
          <input
            @blur="v$.segundo_cliente.cpf.$touch()"
            id="cpf-campo-segundo_cliente"
            :class="v$.segundo_cliente.cpf.$error ? 'invalid-input' : ''"
            :disabled="segundo_titular"
            @keyup="validarCPF(segundo_cliente.cpf, false)"
            v-model="segundo_cliente.cpf"
            v-mask="'###.###.###-##'"
            class="form-control"
            type="tel"
            placeholder="000.000.000-00"
          />
        </div>
        <div class="col6">
          CEP * <br />
          <input
            @blur="v$.segundo_cliente.cep.$touch()"
            id="cep-campo-segundo_cliente"
            :class="v$.segundo_cliente.cep.$error ? 'invalid-input' : ''"
            @keyup="
              getCep(
                segundo_cliente.cep,
                segundo_cliente,
                'numero-campo-segundo_cliente'
              )
            "
            v-model="segundo_cliente.cep"
            v-mask="'#####-###'"
            class="form-control"
            type="tel"
            placeholder="00000-000"
          />
        </div>
        <div class="col-8">
          Endereço * <br />
          <input
            @blur="v$.segundo_cliente.logradouro.$touch()"
            id="endereco-campo-segundo_cliente"
            :class="v$.segundo_cliente.logradouro.$error ? 'invalid-input' : ''"
            v-model="segundo_cliente.logradouro"
            style="text-transform: uppercase"
            class="form-control"
            type="text"
            maxlength="33"
            placeholder="ex: Rua dos Ferroviarios"
          />
        </div>
        <div class="col-4">
          Número * <br />
          <input
            @blur="v$.segundo_cliente.numero.$touch()"
            id="numero-campo-segundo_cliente"
            :class="v$.segundo_cliente.numero.$error ? 'invalid-input' : ''"
            v-model="segundo_cliente.numero"
            v-mask="'########'"
            class="form-control"
            type="text"
            placeholder="ex: 130"
          />
        </div>
        <div class="col6">
          Complemento <br />
          <input
            v-model="segundo_cliente.complemento"
            style="text-transform: uppercase"
            class="form-control"
            type="text"
            placeholder="Complemento"
            maxlength="10"
          />
        </div>
        <div class="col6">
          Bairro * <br />
          <input
            @blur="v$.segundo_cliente.bairro.$touch()"
            id="bairro-campo-segundo_cliente"
            :class="v$.segundo_cliente.bairro.$error ? 'invalid-input' : ''"
            v-model="segundo_cliente.bairro"
            style="text-transform: uppercase"
            class="form-control"
            type="text"
            placeholder="Bairro"
          />
        </div>
        <div class="col6">
          Cidade * <br />
          <input
            @blur="v$.segundo_cliente.cidade.$touch()"
            id="cidade-campo-segundo_cliente"
            :class="v$.segundo_cliente.cidade.$error ? 'invalid-input' : ''"
            v-model="segundo_cliente.cidade"
            readonly
            style="text-transform: uppercase"
            class="form-control"
            type="text"
            placeholder="preencha o cep."
          />
        </div>
        <div class="col6">
          Estado * <br />
          <input
            @blur="v$.segundo_cliente.uf.$touch()"
            id="uf-campo-segundo_cliente"
            :class="v$.segundo_cliente.uf.$error ? 'invalid-input' : ''"
            v-model="segundo_cliente.uf"
            readonly
            style="text-transform: uppercase"
            class="form-control"
            type="text"
            placeholder="preencha o cep."
          />
        </div>
      </div>
    </div>

    <div
      class="row m-0"
      v-if="pagamento_pedido.pagamento_selecionado == 2"
      id="pagamento-boleto"
    >
      <div class="col-12">
        <div class="col-12 mb-4 text-center">
          <h4>Boleto Bancario</h4>
        </div>

        <div class="col-12" style="font-weight: normal">
          Pedido:
          <b>
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(pagamento_pedido.valor_pos_desconto)
            }}</b
          >
          <span v-if="pagamento_pedido.temDesconto">
            <span
              v-if="pagamento_pedido.pedido.desconto_representante.porcentagem"
            >
              ({{
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(
                  pagamento_pedido.pedido.valor_total *
                    (pagamento_pedido.pedido.desconto_representante
                      .desconto_porcentagem /
                      100)
                )
              }}
              de desconto)
            </span>
            <span v-else>
              ({{
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(
                  pagamento_pedido_prop.pedido.valor_total -
                    pagamento_pedido_prop.valor_pos_desconto
                )
              }}
              de desconto)
            </span>
          </span>
        </div>
        <div class="col-12">
          Boleto à vista:
          <b>
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(
                pagamento_pedido.valor_pos_desconto -
                  pagamento_pedido.valor_pos_desconto *
                    (pagamento_pedido.pedido.semestre_pagamento
                      .desconto_boleto /
                      100)
              )
            }}
            ({{ pagamento_pedido.pedido.semestre_pagamento.desconto_boleto }}%
            de desconto)
          </b>
        </div>
        <div style="font-weight: normal" class="col-12">
          Frete:
          <b v-if="pagamento_pedido.frete > 0">{{
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(pagamento_pedido.frete)
          }}</b>
          <b
            v-else-if="
              pagamento_pedido.frete == 0 && pagamento_pedido.freteGratis
            "
          >
            FRETE GRATÍS
          </b>
          <b v-else> FRETE A COMBINAR </b>
        </div>

        <div style="font-weight: normal">
          <br />
          Total:
          <b>
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(
                pagamento_pedido.valor_pos_desconto -
                  pagamento_pedido.valor_pos_desconto *
                    (pagamento_pedido.pedido.semestre_pagamento
                      .desconto_boleto /
                      100) +
                  pagamento_pedido.frete
              )
            }}
          </b>
        </div>
      </div>

      <div class="my-3">
        <img class="imagem-boleto" :src="getURL('imagem-boleto')" alt="" />
        <br />
        <br />
        <span style="font-size: 12px">
          <span style="font-weight: bold">Atenção:</span> Caso você possua um
          programa anti pop-up, será necessário desativá-lo para conseguir
          imprimir ou salvar o boleto.</span
        >
      </div>
    </div>

    <div class="row m-0 p-0" v-if="pagamento_pedido.pagamento_selecionado == 4">
      <div class="col-12">
        <div class="col-12 mb-4 text-center">
          <h4>Outras formas de pagamento</h4>
        </div>
        <div class="col-12" style="font-weight: normal">
          Pedido:
          <b>
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(pagamento_pedido.valor_pos_desconto)
            }}</b
          >
          <span v-if="pagamento_pedido.temDesconto">
            <span
              v-if="pagamento_pedido.pedido.desconto_representante.porcentagem"
            >
              ({{
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(
                  pagamento_pedido.pedido.valor_total *
                    (pagamento_pedido.pedido.desconto_representante
                      .desconto_porcentagem /
                      100)
                )
              }}
              de desconto)
            </span>
            <span v-else>
              ({{
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(
                  pagamento_pedido_prop.pedido.valor_total -
                    pagamento_pedido_prop.valor_pos_desconto
                )
              }}
              de desconto)
            </span>
          </span>
        </div>
        <div style="font-weight: normal" class="col-12">
          Frete:
          <b v-if="pagamento_pedido.frete > 0">{{
            new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(pagamento_pedido.frete)
          }}</b>
          <b
            v-else-if="
              pagamento_pedido.frete == 0 && pagamento_pedido.freteGratis
            "
          >
            FRETE GRATÍS
          </b>
          <b v-else> FRETE A COMBINAR </b>
        </div>

        <div style="font-weight: normal">
          Total:
          <b>
            {{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(pagamento_pedido.valor_final)
            }}
          </b>
        </div>
      </div>
      <div class="my-3">
        A Dental Solident entrará em contato para combinar a forma de pagamento.
        <br />
        Mantenha sempre seu dados atualizados.
        <!-- <br />
        <br />
        <b>Para pagamento em boleto parcelado:</b>
        <br />
        envie uma cópia de identidade e comprovante de endereço - parcela mínima
        de R$ 200
        <br />
        <br />
        <b>vencimento dos boletos parcelados:</b>
        <br />
        02/agosto e 02/setembro -->
      </div>
    </div>

    <div class="row m-0 p-0" v-if="pagamento_pedido.pagamento_selecionado == 5">
      <div class="col-12 mb-2 text-center">
        <h4>PIX</h4>
      </div>

      <div class="col-12">
        <div class="my-2">
          <div class="col-12" style="font-weight: normal">
            Pedido:
            <b>
              {{
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(pagamento_pedido.valor_pos_desconto)
              }}</b
            >
            <span v-if="pagamento_pedido.temDesconto">
              <span
                v-if="
                  pagamento_pedido.pedido.desconto_representante.porcentagem
                "
              >
                ({{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(
                    pagamento_pedido.pedido.valor_total *
                      (pagamento_pedido.pedido.desconto_representante
                        .desconto_porcentagem /
                        100)
                  )
                }}
                de desconto)
              </span>
              <span v-else>
                ({{
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(
                    pagamento_pedido_prop.pedido.valor_total -
                      pagamento_pedido_prop.valor_pos_desconto
                  )
                }}
                de desconto)
              </span>
            </span>
          </div>
          <div class="col-12">
            PIX:
            <b>
              {{
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(
                  pagamento_pedido.valor_pos_desconto -
                    pagamento_pedido.valor_pos_desconto *
                      (pagamento_pedido.pedido.semestre_pagamento.desconto_pix /
                        100)
                )
              }}
              ({{ pagamento_pedido.pedido.semestre_pagamento.desconto_pix }}% de
              desconto)
            </b>
          </div>
          <div style="font-weight: normal" class="col-12">
            Frete:
            <b v-if="pagamento_pedido.frete > 0">{{
              new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(pagamento_pedido.frete)
            }}</b>
            <b
              v-else-if="
                pagamento_pedido.frete == 0 && pagamento_pedido.freteGratis
              "
            >
              FRETE GRATÍS
            </b>
            <b v-else> FRETE A COMBINAR </b>
          </div>

          <div style="font-weight: normal">
            <br />
            Total:
            <b>
              {{
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(
                  pagamento_pedido.valor_pos_desconto -
                    pagamento_pedido.valor_pos_desconto *
                      (pagamento_pedido.pedido.semestre_pagamento.desconto_pix /
                        100) +
                    pagamento_pedido.frete
                )
              }}
            </b>
          </div>
        </div>
      </div>

      <div class="col-12 mb-2 d-flex justify-content-center">
        <div
          class="row m-0 p-0 d-flex align-items-center"
          style="max-width: 390px"
        >
          <div class="col-6">STATUS:</div>
          <div class="col-6">
            <span v-if="!pixPago" style="color: red"> NÃO PAGO </span>
            <span v-else style="color: green"> PAGO!</span>
          </div>
          <div v-if="pixTimer != 0 && !pixPago" class="col-6">
            <b>TEMPO RESTANTE:</b>
          </div>
          <div v-if="pixTimer != 0 && !pixPago" class="col-6">
            <b>{{ msToTime(pixTimer * 1000).substring(3) }}</b>
          </div>
        </div>
      </div>

      <div
        class="col-12 col-md-6 d-flex align-items-center justify-content-center"
      >
        <img
          style="max-height: 300px"
          :src="require('../../assets/pix-passo-a-passo.png')"
          alt=""
        />
      </div>

      <div
        class="col-12 col-md-6 d-flex align-items-center justify-content-center left-separator"
      >
        <button
          v-if="!pix"
          @click="gerarQRcode()"
          type="button"
          class="btn btn-primary"
        >
          GERAR QRCODE <i class="fas fa-qrcode"></i>
        </button>
        <div
          @click="copyPix()"
          style="max-width: 300px; max-height: 300px"
          class="row mx-auto"
          v-else
        >
          <QrcodeVue
            v-if="!pixPago"
            :value="
              pix.banco == 'BB' ? pix.textoImagemQRcode : pix.pixCopiaECola
            "
            :size="300"
            level="H"
          />
        </div>
      </div>
      <div v-if="!pixPago" class="col-12 mt-4 d-none d-sm-block">
        <div class="input-group mb-3">
          <input
            disabled
            id="pixInput"
            type="text"
            class="form-control"
            :value="
              pix
                ? pix.banco == 'BB'
                  ? pix.textoImagemQRcode
                  : pix.pixCopiaECola
                : 'Clique no botão acima para gerar o QRCode'
            "
          />
          <button
            @click="copyPix()"
            :disabled="!pix || pixPago"
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            Copiar <i class="fas fa-copy"></i>
          </button>
        </div>
      </div>
      <div v-if="!pixPago" class="d-sm-none d-flex justify-content-center mt-4">
        <button
          @click="copyPix()"
          :disabled="!pix || pixPago"
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          Copiar QRcode <i class="fas fa-copy"></i>
        </button>
      </div>
    </div>
  </div>

  <div class="form-container mt-3 checkout-bottom-bar">
    <div class="row m-0 p-0">
      <div class="col-6 d-flex justify-content-start">
        <button
          v-if="!pixPago"
          @click="prevPage()"
          type="button"
          class="btn btn-danger"
        >
          <i class="fas fa-arrow-left"></i> VOLTAR
        </button>
        <button
          v-else
          @click="
            $router.push({
              name: 'inicio',
            })
          "
          type="button"
          class="btn btn-primary"
        >
          VOLTAR AO INÍCIO
        </button>
      </div>
      <div class="col-6 d-flex justify-content-end">
        <button
          v-if="pagamento_pedido.pagamento_selecionado != 5"
          :class="v$.$error ? 'disabled-content' : ''"
          @click="callFinalizar()"
          type="button"
          class="btn btn-success"
        >
          <span
            v-if="
              pagamento_pedido.pagamento_selecionado == 1 ||
                pagamento_pedido.pagamento_selecionado == 3
            "
          >
            FINALIZAR<span class="ml-1 pagamento-label-mobile">PAGAMENTO</span>
            <i class="ml-1 fas fa-credit-card"></i
          ></span>
          <span v-if="pagamento_pedido.pagamento_selecionado == 2">
            GERAR BOLETO <i class="fas fa-barcode"></i>
          </span>
          <span v-if="pagamento_pedido.pagamento_selecionado == 4">
            ENVIAR PEDIDO <i class="fas fa-check"></i>
          </span>
        </button>
      </div>
    </div>
  </div>

  <div
    v-if="pagamento_pedido.pagamento_selecionado == 2"
    class="mt-4 form-container"
  >
    <div class="text-left">
      <ul>
        <li>
          Só emitimos boletos do Banco C6. Confira os dados antes de
          efetuar o pagamento.
        </li>
        <li>O boleto não será enviado para o seu endereço físico</li>
        <li>
          Não realize o pagamento por meio de transferência, depósito ou DOC
          para a conta indicada no boleto.
        </li>
        <li>
          Se o boleto não for pago até a data de vencimento, o pedido será
          cancelado.
        </li>
      </ul>
    </div>
  </div>

  <Dialog
    style="max-width: 320px"
    modal
    :closable="true"
    v-model:visible="modalPixPago"
  >
    <template #header>
      <h3 class="mr-2 mb-0">SUCESSO!</h3>
    </template>

    <span style="color: green">Pagamento recebido com sucesso! </span>
    <i style="color: green" class="fas fa-check ml-1"></i>

    <template #footer>
      <div class="d-flex justify-content-center">
        <button
          style="min-width: 50%"
          @click="
            $router.push({
              name: 'inicio',
            })
          "
          type="button"
          class="btn btn-primary"
        >
          VOLTAR AO INÍCIO
        </button>
      </div>
    </template>
  </Dialog>

  <Dialog
    style="max-width: 320px"
    modal
    :closable="true"
    v-model:visible="modalErros"
  >
    <template #header>
      <h3 class="mr-2 mb-0">ATENÇÃO!</h3>
    </template>

    <b>{{ retorno_pagamento.razao }}</b>

    <template #footer>
      <div class="d-flex justify-content-center">
        <button
          style="min-width: 50%"
          @click="modalErros = false"
          type="button"
          class="btn btn-info"
        >
          OK!
        </button>
      </div>
    </template>
  </Dialog>

  <Dialog
    style="max-width: 320px"
    modal
    :closable="true"
    v-model:visible="dialogExplain"
  >
    <template #header>
      <h3 class="mr-2 mb-0">ATENÇÃO!</h3>
    </template>

    <b
      >NÃO SE ESQUEÇA DE PREENCHER CORRETAMENTE
      <u>TODOS OS DADOS DO TITULAR DO CARTÃO.</u></b
    >
    <br />
    <b
      >NÃO TENTE ENVIAR O PAGAMENTO SEM TER CERTEZA QUE OS
      <u>DADOS DO TITULAR DO CARTÃO ESTÃO CORRETOS.</u></b
    >

    <template #footer>
      <div class="d-flex justify-content-center">
        <button
          style="min-width: 50%"
          @click="dialogExplain = false"
          type="button"
          class="btn btn-info"
        >
          OK!
        </button>
      </div>
    </template>
  </Dialog>

  <Dialog
    style="max-width: 320px"
    modal
    :dismissableMask="false"
    :closable="false"
    v-model:visible="modalAditum401"
  >
    <template #header>
      <h3 class="mr-2 mb-0">ATENÇÃO!</h3>
    </template>

    <b>Dados do cartão inválidos</b>

    <template #footer>
      <div class="d-flex justify-content-center">
        <button
          style="min-width: 50%"
          @click="resetAditum()"
          type="button"
          class="btn btn-info"
        >
          OK!
        </button>
      </div>
    </template>
  </Dialog>
</template>

<script>
const Decimal = require("decimal.js");
const AditumTransparent = require("adt-transparent");
const noNumbers = (value) => !value.match(/[0-9]/);
import QrcodeVue from "qrcode.vue";
import io from "socket.io-client";
import useVuelidate from "@vuelidate/core";
import { requiredIf, minLength } from "@vuelidate/validators";
import Dialog from "primevue/dialog";
import Slider from "@vueform/slider";
import Loader from "../../components/Loader";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  components: {
    QrcodeVue,
    Slider,
    Dialog,
    Loader,
  },
  props: {
    numeroPedido: [String],
    pagamento_pedido_prop: [Object],
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      socket: io(process.env.VUE_APP_URL_BASE, {
        path: process.env.VUE_APP_PATCH_SOCKET,
        secure: process.env.VUE_APP_URL_BASE.startsWith("https"),
        withCredentials: true,
        reconnection: true,
        rejectUnauthorized: false,
      }),
      valor_a_pagar: false,
      dropinInstance: null,
      pixTimer: 0,
      pixPago: false,
      modalPixPago: false,
      modalAditum401: false,
      modalBoleto: false,
      modalErros: false,
      dialogExplain: false,
      loading: false,
      flip: false,
      flip2: false,
      brand: null,
      msgInvalidInfo: "",
      selectedInfo: {
        numero: false,
        nome: false,
        validade: false,
      },
      objToStore: { session: {}, shared: {} },
      format: {
        prefix: "R$ ",
        decimals: 2,
      },
      grauParentesco: [
        "Pai / Mãe",
        "Amigo / Amiga",
        "Marido / Esposa",
        "Outros",
      ],
      pagamento_pedido: this.pagamento_pedido_prop,
      bandeiraCartão: "",
      cartao: {
        numero: "",
        bandeira: "",
        nome: "",
        validade: "",
        cvv: "",
        parcelas: 1,
      },
      segundo_cartao: {
        numero: "",
        bandeira: "",
        nome: "",
        validade: "",
        cvv: "",
        parcelas: 1,
      },
      titular: null,
      segundo_titular: null,
      parentesco: null,
      segundo_parentesco: null,
      cliente: {
        nome: "",
        sobrenome: "",
        email: "",
        telefone: "",
        cpf: "",
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        uf: "",
      },
      segundo_cliente: {
        nome: "",
        sobrenome: "",
        email: "",
        telefone: "",
        cpf: "",
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        uf: "",
      },
      file: "",
    };
  },
  validations() {
    const validDate = (value) => {
      if (
        this.pagamento_pedido.pagamento_selecionado == 1 ||
        this.pagamento_pedido.pagamento_selecionado == 3
      ) {
        let date = new Date();
        if (value.substring(3, 5) > date.getYear() - 100) {
          if (
            parseInt(value.substring(0, 3)) != 0 &&
            parseInt(value.substring(0, 3)) <= 12
          ) {
            return true;
          }
        } else if (value.substring(3, 5) == date.getYear() - 100) {
          if (
            parseInt(value.substring(0, 3)) > date.getMonth() + 1 &&
            parseInt(value.substring(0, 3)) <= 12
          ) {
            return true;
          }
        }
        return false;
      } else {
        return true;
      }
    };

    return {
      cartao: {
        numero: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 1 ||
              this.pagamento_pedido.pagamento_selecionado == 3
          ),
          minLength: minLength(19),
        },
        nome: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 1 ||
              this.pagamento_pedido.pagamento_selecionado == 3
          ),
          minLength: minLength(2),
          noNumbers,
        },
        validade: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 1 ||
              this.pagamento_pedido.pagamento_selecionado == 3
          ),
          minLength: minLength(5),
          validDate,
        },
        cvv: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 1 ||
              this.pagamento_pedido.pagamento_selecionado == 3
          ),
          minLength: minLength(3),
        },
      },
      titular: {
        required: requiredIf(
          this.pagamento_pedido.pagamento_selecionado == 1 ||
            this.pagamento_pedido.pagamento_selecionado == 3
        ),
      },
      parentesco: {
        required: requiredIf(
          (this.pagamento_pedido.pagamento_selecionado == 1 && !this.titular) ||
            (this.pagamento_pedido.pagamento_selecionado == 3 && !this.titular)
        ),
      },
      cliente: {
        nome: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 1 ||
              this.pagamento_pedido.pagamento_selecionado == 3
          ),
          minLength: minLength(2),
          noNumbers,
        },
        sobrenome: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 1 ||
              this.pagamento_pedido.pagamento_selecionado == 3
          ),
          minLength: minLength(2),
          noNumbers,
        },
        email: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 1 ||
              this.pagamento_pedido.pagamento_selecionado == 3
          ),
        },
        telefone: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 1 ||
              this.pagamento_pedido.pagamento_selecionado == 3
          ),
          minLength: minLength(16),
        },
        cpf: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 1 ||
              this.pagamento_pedido.pagamento_selecionado == 3
          ),
          minLength: minLength(14),
        },
        // carteirinha: {
        //   required: requiredIf(
        //     this.file.length == 0 && this.pagamento_pedido.carteirinha.status
        //   ),
        // },
        cep: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 1 ||
              this.pagamento_pedido.pagamento_selecionado == 3
          ),
          minLength: minLength(9),
        },
        logradouro: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 1 ||
              this.pagamento_pedido.pagamento_selecionado == 3
          ),
        },
        numero: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 1 ||
              this.pagamento_pedido.pagamento_selecionado == 3
          ),
        },
        bairro: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 1 ||
              this.pagamento_pedido.pagamento_selecionado == 3
          ),
        },
        cidade: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 1 ||
              this.pagamento_pedido.pagamento_selecionado == 3
          ),
        },
        uf: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 1 ||
              this.pagamento_pedido.pagamento_selecionado == 3
          ),
        },
      },
      segundo_cartao: {
        numero: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 3
          ),
          minLength: minLength(19),
        },
        nome: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 3
          ),
          minLength: minLength(2),
          noNumbers,
        },
        validade: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 3
          ),
          minLength: minLength(5),
        },
        cvv: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 3
          ),
          minLength: minLength(3),
        },
      },

      segundo_titular: {
        required: requiredIf(this.pagamento_pedido.pagamento_selecionado == 3),
      },
      segundo_parentesco: {
        required: requiredIf(
          this.pagamento_pedido.pagamento_selecionado == 3 &&
            !this.segundo_titular
        ),
      },
      segundo_cliente: {
        nome: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 3
          ),
          minLength: minLength(2),
          noNumbers,
        },
        sobrenome: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 3
          ),
          minLength: minLength(2),
          noNumbers,
        },
        email: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 3
          ),
        },
        telefone: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 3
          ),
          minLength: minLength(16),
        },
        cpf: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 3
          ),
          minLength: minLength(14),
        },
        cep: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 3
          ),
          minLength: minLength(9),
        },
        logradouro: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 3
          ),
        },
        numero: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 3
          ),
        },
        bairro: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 3
          ),
        },
        cidade: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 3
          ),
        },
        uf: {
          required: requiredIf(
            this.pagamento_pedido.pagamento_selecionado == 3
          ),
        },
      },
    };
  },
  emits: ["nextPage", "prevPage", "complete", "scrollToTop"],
  async created() {
    if (!this.pagamento_pedido.inicio) {
      this.$router.push({
        path: "/checkout/seus-dados/" + this.numeroPedido,
      });
    }
    if (
      this.pagamento_pedido.pedido.semestre_pagamento.banco_credito ==
        "SAFRA" &&
      this.pagamento_pedido.pagamento_selecionado == 1
    ) {
      AditumTransparent.setCredentials({
        merchantCredential: "58362674000116",
        merchantToken: "mk_gFcqMUOh6ka25pFAQrPL1w",
      });
    }
  },
  async mounted() {
    this.socket.on("RETORNO_PIX_ACADEMICO", (data) => {
      if (data == this.pix.txid) {
        this.pixPago = true;
        this.modalPixPago = true;
      }
    });
    if (
      this.pagamento_pedido.pedido.semestre_pagamento.banco_credito ==
        "PAYPAL" &&
      this.pagamento_pedido.pagamento_selecionado == 1
    ) {
      await this.inicializarPayPal();
    }
  },
  computed: {
    ...mapState({
      retorno_pagamento: (state) => state.retorno_pagamento,
      retorno_checar_pedido: (state) => state.retorno_checar_pedido,
      retornoManutencao: (state) => state.manutencao,
      pix: (state) => state.pix,
      descontoUsado: (state) => state.descontoUsado,
      // carteirinha: (state) => state.carteirinha,
    }),
  },
  methods: {
    ...mapActions([
      "salvar_checkout",
      "salvar_outros",
      "checar_pedido",
      "get_manutencao",
      "criar_pix",
      "criar_pix_cseis",
    ]),
    ...mapMutations([
      "set_snackbar",
      "set_show_slow",
      "set_manutencao",
      "set_pix",
      "set_refreshHeader",
      "set_infocheck",
    ]),
    async inicializarPayPal() {
      try {
        const clientToken = await this.$axios.get(
          "https://solident.com.br/node/paypal_client_token"
        );
        // eslint-disable-next-line no-undef
        braintree.dropin.create(
          {
            authorization: clientToken.data,
            container: "#dropin-container",
          },
          (err, instance) => {
            if (err) {
              console.error("Erro ao criar Drop-in:", err);
              return;
            }
            this.dropinInstance = instance;
          }
        );

        this.dropinInstance.requestPaymentMethod(async (err, payload) => {
          if (err) {
            console.error("Erro ao obter método de pagamento:", err);
            return;
          }

          try {
            const res = this.$axios.get(
              "https://solident.com.br/node/paypal_client_token",
              {
                paymentMethodNonce: payload.nonce,
                amount: parseFloat(
                  new Decimal(this.pagamento_pedido.valor_final).toFixed(2)
                ),
              }
            );

            const result = res.data;

            if (result.success) {
              alert("Pagamento aprovado! ID: " + result.transactionId);
            } else {
              alert("Pagamento recusado: " + result.message);
            }
          } catch (e) {
            console.error("Erro na requisição:", e);
            alert("Erro ao processar pagamento.");
          }
        });
      } catch (error) {
        console.error("Erro ao obter token:", error);
      }
    },

    mudarValorAPagar() {
      
      this.valor_a_pagar = this.pagamento_pedido.valor_final *
                    (1 +
                    this.pagamento_pedido.pedido.parcelas_pagamento_creditos[
                      this.cartao.parcelas - 1
                      ].acrescimo /
                        100);
   
    },

    // async handleFileUpload(event) {
    //   this.file = event.target.files[0];
    //   let formData = new FormData();

    //   formData.append("file", this.file);

    //   let res = await this.$axios.post(
    //     `/usuario/carteirinha?x=${encodeURIComponent(this.numeroPedido)}`,
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //       withCredentials: false,
    //     }
    //   );

    //   console.log(res);
    // },
    resetAditum() {
      this.$router.push({
        path: "/checkout/seus-dados/" + this.numeroPedido,
      });
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    nextPage() {
      this.$emit("nextPage", {
        pageIndex: 3,
        pagamento_pedido_prop: this.pagamento_pedido,
      });
      this.$emit("scrollToTop");
    },
    prevPage() {
      this.$emit("prevPage", {
        pageIndex: 3,
        pagamento_pedido_prop: this.pagamento_pedido,
      });
      this.$emit("scrollToTop");
    },
    pushInicio() {
      this.$router.push({
        name: "inicio",
      });
    },
    async finalizar() {
      if (
        this.bandeiraCartão.length == 0 &&
        this.pagamento_pedido.pagamento_selecionado == 1
      ) {
        this.set_snackbar({
          show: true,
          severity: "warn",
          summary: "Atenção!",
          detail:
            "Somente aceitamos cartões das seguintes bandeiras: VISA, MASTERCARD, ELO e AMEX.",
          life: 5200,
        });
      } else {
        this.loading = true;

        this.pagamento_pedido.dados_pagamento.tipo_pagamento =
          this.pagamento_pedido.pagamento_selecionado == 1
            ? "CREDITO"
            : this.pagamento_pedido.pagamento_selecionado == 4
            ? "OUTROS"
            : "BOLETO";
        if (
          this.pagamento_pedido.dados_pagamento.tipo_pagamento == "CREDITO" &&
          this.pagamento_pedido.pedido.reserva == 1
        ) {
          this.pagamento_pedido.dados_pagamento.tipo_pagamento = "RESERVA";
        }
        this.pagamento_pedido.dados_pagamento.cliente.cpf_cnpj = this.pagamento_pedido.dados_pagamento.cliente.cpf;
        this.pagamento_pedido.dados_pagamento.entrega = this.pagamento_pedido.entrega;
        this.pagamento_pedido.dados_pagamento.pedido = this.pagamento_pedido.numero_pedido;
        this.pagamento_pedido.dados_pagamento.frete = this.pagamento_pedido.frete;
        if (this.pagamento_pedido.temDesconto) {
          this.pagamento_pedido.dados_pagamento.desconto = this.pagamento_pedido
            .pedido.desconto_representante.porcentagem
            ? this.pagamento_pedido.pedido.valor_total -
              (this.pagamento_pedido.valor_final - this.pagamento_pedido.frete)
            : this.pagamento_pedido.pedido.desconto_representante
                .desconto_valor;
        } else {
          this.pagamento_pedido.dados_pagamento.desconto = 0;
        }
        this.pagamento_pedido.dados_pagamento.desconto = parseFloat(
          new Decimal(this.pagamento_pedido.dados_pagamento.desconto).toFixed(2)
        );
        if (this.pagamento_pedido.pagamento_selecionado == 2) {
          this.pagamento_pedido.dados_pagamento.total =
            this.pagamento_pedido.valor_pos_desconto -
            this.pagamento_pedido.valor_pos_desconto *
              (this.pagamento_pedido.pedido.semestre_pagamento.desconto_boleto /
                100) +
            this.pagamento_pedido.frete;
          this.pagamento_pedido.dados_pagamento.desconto_boleto = this.pagamento_pedido.pedido.semestre_pagamento.desconto_boleto;
        } else {
          this.pagamento_pedido.dados_pagamento.total =
            this.pagamento_pedido.valor_final *
            (1 +
              this.pagamento_pedido.pedido.parcelas_pagamento_creditos[this.cartao.parcelas - 1]
                .acrescimo /
                100);
        }

        this.pagamento_pedido.dados_pagamento.total = parseFloat(
          new Decimal(this.pagamento_pedido.dados_pagamento.total).toFixed(2)
        );
        this.pagamento_pedido.dados_pagamento.total_pedido = this.pagamento_pedido.pedido.valor_total;
        this.pagamento_pedido.dados_pagamento.vendedor = this.pagamento_pedido.pedido.vendedor;
        this.pagamento_pedido.dados_pagamento.session_id = this.pagamento_pedido.session_id;

        this.pagamento_pedido.dados_pagamento.acrescimo = this.pagamento_pedido.pedido.parcelas_pagamento_creditos[this.cartao.parcelas - 1].acrescimo

        let isso = this;
        setTimeout(function() {
          if (isso.loading) {
            isso.set_show_slow(true);
          }
        }, 60000);

        /**
         * COISA DA ADITUM TRANSPARENTE
         */

        if (
          this.pagamento_pedido.pedido.semestre_pagamento.banco_credito ==
            "SAFRA" &&
          this.pagamento_pedido.pagamento_selecionado == 1
        ) {
          AditumTransparent.getCardBrand({
            bin: this.pagamento_pedido.dados_pagamento.cartao.numero
              .replace(/\D/g, "")
              .substring(0, 6),
            success: async (body) => {
              let card = {
                number: this.pagamento_pedido.dados_pagamento.cartao.numero.replace(
                  /\D/g,
                  ""
                ),
                cvv: this.pagamento_pedido.dados_pagamento.cartao.cvv,
                brand: body.brand,
                holderName: this.pagamento_pedido.dados_pagamento.cartao.nome,
                holderDocument: this.pagamento_pedido.dados_pagamento.cliente.cpf_cnpj.replace(
                  /\D/g,
                  ""
                ),
                expirationMonth: parseInt(
                  this.pagamento_pedido.dados_pagamento.cartao.validade.substring(
                    0,
                    3
                  )
                ),
                expirationYear:
                  "20" +
                  parseInt(
                    this.pagamento_pedido.dados_pagamento.cartao.validade.substring(
                      3,
                      5
                    )
                  ),
              };

              this.pagamento_pedido.dados_pagamento.cartao.bandeira =
                card.brand;

              await this.salvar_checkout(this.pagamento_pedido.dados_pagamento);
              this.loading = false;
              this.set_show_slow(false);

              if (!this.retorno_pagamento.status) {
                this.modalErros = true;
                this.incrementContadorPagamento();
              } else {
                // apagar cookie local
                this.objToStore = this.$LS.get();
                delete this.objToStore.session.carrinho;
                delete this.objToStore.session.pedido;
                delete this.objToStore.shared[
                  "contadorPagamento" + this.objToStore.session.aluno.cpf
                ];
                this.$LS.set(this.objToStore);
                this.$router.push({
                  name: "checkoutSuccess",
                });
              }

              // AditumTransparent.createTemporaryCard({
              //   card,
              //   success: async (body) => {

              //     this.pagamento_pedido.dados_pagamento.cartao.temporaryToken =
              //       body.temporaryToken;

              //   },
              //   error: (body) => {
              //     this.loading = false;
              //     this.modalAditum401 = true;
              //     alert(body);
              //   },
              // });
            },
            error: (body) => {
              alert(body);
              console.log(body);
            },
          });

          /**
           * COISA DA ADITUM TRANSPARENTE
           */
        } else {
          if (this.pagamento_pedido.pagamento_selecionado == 4) {
            await this.salvar_outros(this.pagamento_pedido.dados_pagamento);
            this.loading = false;
            this.set_show_slow(false);

            // apagar cookie local
            this.objToStore = this.$LS.get();
            delete this.objToStore.session.carrinho;
            delete this.objToStore.session.pedido;
            this.$LS.set(this.objToStore);
            this.$router.push({
              name: "checkoutSuccess",
            });
          } else {
            await this.salvar_checkout(this.pagamento_pedido.dados_pagamento);

            this.loading = false;
            this.set_show_slow(false);
            if (!this.retorno_pagamento.status) {
              this.modalErros = true;
              this.incrementContadorPagamento();
            } else {
              // apagar cookie local
              this.objToStore = this.$LS.get();
              delete this.objToStore.session.carrinho;
              delete this.objToStore.session.pedido;
              delete this.objToStore.shared[
                "contadorPagamento" + this.objToStore.session.aluno.cpf
              ];
              this.$LS.set(this.objToStore);
              this.$router.push({
                name: "checkoutSuccess",
              });
            }
          }
        }
      }
    },
    incrementContadorPagamento() {
      let obj = this.$LS.get();
      if (obj.shared["contadorPagamento" + obj.session.aluno.cpf] == null) {
        obj.shared["contadorPagamento" + obj.session.aluno.cpf] = {
          tentativas: 0,
          tempo: null,
        };
      }
      obj.shared["contadorPagamento" + obj.session.aluno.cpf].tentativas++;
      if (
        obj.shared["contadorPagamento" + obj.session.aluno.cpf].tentativas > 2
      ) {
        obj.shared["contadorPagamento" + obj.session.aluno.cpf].tentativas = 0;
        obj.shared[
          "contadorPagamento" + obj.session.aluno.cpf
        ].tempo = new Date().getTime();
      }
      this.$LS.set(obj);
    },
    async getCep(cep, destino, camponumero) {
      if (cep.length == 9) {
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
            destino.logradouro = "";
            destino.bairro = "";
            destino.cidade = "";
            destino.uf = "";
          } else {
            this.set_snackbar({
              show: true,
              severity: "success",
              summary: "Successo!",
              detail: "CEP Válido!",
              life: 2500,
            });
            destino.logradouro = cepRetorno.data.logradouro;
            destino.bairro = cepRetorno.data.bairro;
            destino.cidade = cepRetorno.data.localidade;
            destino.uf = cepRetorno.data.uf;
            document.getElementById(camponumero).focus();
          }
        }
        this.loading = false;
      }
    },
    updateCardInfo(cliente) {
      this.dialogExplain = true;
      let selectedCliente = cliente == 1 ? this.cliente : this.segundo_cliente;
      let selectedTitular = cliente == 1 ? this.titular : this.segundo_titular;
      if (selectedTitular) {
        selectedCliente.nome = this.pagamento_pedido.pedido.aluno.nome;
        selectedCliente.sobrenome = this.pagamento_pedido.pedido.aluno.sobrenome;
        selectedCliente.email = this.pagamento_pedido.pedido.aluno.email.toLowerCase();
        selectedCliente.telefone = this.pagamento_pedido.pedido.aluno.celular;
        selectedCliente.cpf = this.pagamento_pedido.pedido.aluno.cpf;
        selectedCliente.cep = this.pagamento_pedido.pedido.aluno.cep;
        selectedCliente.logradouro = this.pagamento_pedido.pedido.aluno.endereco;
        selectedCliente.numero = this.pagamento_pedido.pedido.aluno.numero;
        selectedCliente.complemento = this.pagamento_pedido.pedido.aluno.complemento;
        selectedCliente.bairro = this.pagamento_pedido.pedido.aluno.bairro;
        selectedCliente.cidade = this.pagamento_pedido.pedido.aluno.cidade;
        selectedCliente.uf = this.pagamento_pedido.pedido.aluno.estado;
      } else {
        selectedCliente.nome = "";
        selectedCliente.sobrenome = "";
        selectedCliente.email = "";
        selectedCliente.telefone = "";
        selectedCliente.cpf = "";
        selectedCliente.cep = "";
        selectedCliente.logradouro = "";
        selectedCliente.numero = "";
        selectedCliente.complemento = "";
        selectedCliente.bairro = "";
        selectedCliente.cidade = "";
        selectedCliente.uf = "";
      }
    },
    validarBrand(nr) {
      this.bandeiraCartão = "";

      nr = nr.replace(/\D/g, "");

      var cards = {
        visa: /^4\d{12}(\d{3})?$/,
        amex: /^3[47][0-9]{5,}$/,
        elo: /^(40117[8-9]|431274|438935|451416|457393|45763[1-2]|506(699|7[0-6][0-9]|77[0-8])|509\d{3}|504175|627780|636297|636368|65003[1-3]|6500(3[5-9]|4[0-9]|5[0-1])|6504(0[5-9]|[1-3][0-9])|650(4[8-9][0-9]|5[0-2][0-9]|53[0-8])|6505(4[1-9]|[5-8][0-9]|9[0-8])|6507(0[0-9]|1[0-8])|65072[0-7]|6509(0[1-9]|1[0-9]|20)|6516(5[2-9]|[6-7][0-9])|6550([0-1][0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
        master: /^5[1-5][0-9]{14}|^(222[1-9]|22[3-9]\\d|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{12}$/,
      };

      this.bandeiraCartão = "";

      for (var flag in cards) {
        if (cards[flag].test(nr)) {
          this.bandeiraCartão = flag;
          this.pagamento_pedido.dados_pagamento.cartao.bandeira =
            flag.charAt(0).toUpperCase() + flag.slice(1);
          this.cartao.bandeira = flag.charAt(0).toUpperCase() + flag.slice(1);
        }
      }
      // se nao é nad só pode ser porra de mastercard
      if (this.bandeiraCartão.length == 0) {
        this.bandeiraCartão = "master";
        this.pagamento_pedido.dados_pagamento.cartao.bandeira = "Master";
        this.cartao.bandeira = "Master";
      }
    },
    validarCPF(cpf, primeiroCliente) {
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
          primeiroCliente
            ? (this.cliente.cpf = "")
            : (this.segundo_cliente.cpf = "");
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
          primeiroCliente
            ? (this.cliente.cpf = "")
            : (this.segundo_cliente.cpf = "");
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
          primeiroCliente
            ? (this.cliente.cpf = "")
            : (this.segundo_cliente.cpf = "");
          this.set_snackbar({
            show: true,
            severity: "warn",
            summary: "Aviso!",
            detail: "CPF invalido.",
            life: 2500,
          });
          return false;
        }
        return true;
      }
    },
    async callFinalizar() {
      this.loading = true;
      await this.get_manutencao();
      if (
        this.retornoManutencao.manutencao &&
        !this.retornoManutencao.acessoDental
      ) {
        this.set_manutencao({
          id: this.retornoManutencao.id,
          manutencao: this.retornoManutencao.manutencao,
          msg_manutencao: this.retornoManutencao.msg_manutencao,
          acessoDental: this.retornoManutencao.acessoDental,
          telaPagamento: true,
        });
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        return;
      }
      await this.checar_pedido({
        id_pedido: this.numeroPedido,
        dataPedido: {
          data: this.pagamento_pedido.pedido.data_pedido,
          hora: this.pagamento_pedido.pedido.hora_pedido,
        },
      });
      if (!this.retorno_checar_pedido.valido) {
        this.loading = false;
        this.set_snackbar({
          show: true,
          severity: "warn",
          summary: "Atenção!",
          detail: "Pedido Alterado, confirme as informações novamente.",
          life: 6500,
        });
        this.$parent.$parent.$parent.$parent.$parent.refresh++;
      } else if (this.retorno_checar_pedido.itensEmFalta) {
        this.handleItensEmFalta();
      } else if (this.retorno_checar_pedido.pedidoCanceladoSaldo) {
        this.handlePedidoCanceladoSaldo();
      } else {
        this.loading = false;
        let obj = this.$LS.get();
        let tempo = new Date().getTime();
        if (obj.shared["contadorPagamento" + obj.session.aluno.cpf] != null) {
          if (
            obj.shared["contadorPagamento" + obj.session.aluno.cpf].tempo !=
              null &&
            tempo <
              obj.shared["contadorPagamento" + obj.session.aluno.cpf].tempo +
                43200000
          ) {
            this.set_snackbar({
              show: true,
              severity: "warn",
              summary: "ATENÇÃO!",
              detail:
                "Numero maximo de tentativas de pagamento excedido, utilize outra forma de pagamento ou tente novamente em: " +
                this.msToTime(
                  obj.shared["contadorPagamento" + obj.session.aluno.cpf]
                    .tempo +
                    43200000 -
                    tempo
                ),
              life: 6500,
            });
            return;
          } else {
            obj.shared[
              "contadorPagamento" + obj.session.aluno.cpf
            ].tempo = null;
            this.$LS.set(obj);
          }
        }
        this.v$.$validate();
        this.v$.$touch();
        if (this.v$.$error) {
          let campoid = this.v$.$errors[0].$property + "-campo";
          let nome_campo =
            "o campo " +
            this.v$.$errors[0].$property
              .toUpperCase()
              .substring(this.v$.$errors[0].$property.indexOf("_") + 1);
          let razao = "";
          if (this.v$.$errors[0].$property == "endereco") {
            nome_campo = "o campo ENDEREÇO ";
          }
          if (this.v$.$errors[0].$property == "numero") {
            nome_campo = "o campo NÚMERO ";
          }
          if (this.v$.$errors[0].$propertyPath.includes("segundo_cliente")) {
            campoid = campoid + "-segundo_cliente";
          } else if (this.v$.$errors[0].$propertyPath.includes("cliente")) {
            campoid = campoid + "-cliente";
          } else if (
            this.v$.$errors[0].$propertyPath.includes("segundo_cartao")
          ) {
            campoid = campoid + "-segundo_cartao";
          } else if (this.v$.$errors[0].$propertyPath.includes("cartao")) {
            campoid = campoid + "-cartao";
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
            // case "email":
            //   nome_campo = "O e-mail inserido ";
            //   razao = "não é um e-mail válido.";
            //   break;
            case "noNumbers":
              razao = "não permite números";
              break;
            case "validDate":
              nome_campo = "";
              razao = "Data de validade do cartão Inválida.";
              break;
            default:
              nome_campo = "";
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
          this.pagamento_pedido.dados_pagamento.cartao = this.cartao;
          this.pagamento_pedido.dados_pagamento.titular = this.titular;
          this.pagamento_pedido.dados_pagamento.parentesco = this.parentesco;
          this.pagamento_pedido.dados_pagamento.cliente = this.cliente;

          this.pagamento_pedido.dados_pagamento.segundo_cartao = this.segundo_cartao;
          this.pagamento_pedido.dados_pagamento.segundo_titular = this.segundo_titular;
          this.pagamento_pedido.dados_pagamento.segundo_parentesco = this.segundo_parentesco;
          this.pagamento_pedido.dados_pagamento.segundo_cliente = this.segundo_cliente;

          if (
            this.pagamento_pedido.pagamento_selecionado == 2 ||
            this.pagamento_pedido.pagamento_selecionado == 4
          ) {
            this.pagamento_pedido.dados_pagamento.cliente.nome = this.pagamento_pedido.pedido.aluno.nome;
            this.pagamento_pedido.dados_pagamento.cliente.sobrenome = this.pagamento_pedido.pedido.aluno.sobrenome;
            this.pagamento_pedido.dados_pagamento.cliente.email = this.pagamento_pedido.pedido.aluno.email;
            this.pagamento_pedido.dados_pagamento.cliente.telefone = this.pagamento_pedido.pedido.aluno.celular;
            this.pagamento_pedido.dados_pagamento.cliente.cpf = this.pagamento_pedido.pedido.aluno.cpf;
            this.pagamento_pedido.dados_pagamento.cliente.cep = this.pagamento_pedido.pedido.aluno.cep;
            this.pagamento_pedido.dados_pagamento.cliente.logradouro = this.pagamento_pedido.pedido.aluno.endereco;
            this.pagamento_pedido.dados_pagamento.cliente.numero = this.pagamento_pedido.pedido.aluno.numero;
            this.pagamento_pedido.dados_pagamento.cliente.complemento = this.pagamento_pedido.pedido.aluno.complemento;
            this.pagamento_pedido.dados_pagamento.cliente.bairro = this.pagamento_pedido.pedido.aluno.bairro;
            this.pagamento_pedido.dados_pagamento.cliente.cidade = this.pagamento_pedido.pedido.aluno.cidade;
            this.pagamento_pedido.dados_pagamento.cliente.uf = this.pagamento_pedido.pedido.aluno.estado;
          }

          this.finalizar();
        }
      }
    },
    async gerarQRcode() {
      this.loading = true;
      await this.checar_pedido({
        id_pedido: this.numeroPedido,
        dataPedido: {
          data: this.pagamento_pedido.pedido.data_pedido,
          hora: this.pagamento_pedido.pedido.hora_pedido,
        },
      });

      if (!this.retorno_checar_pedido.valido) {
        this.loading = false;
        this.set_snackbar({
          show: true,
          severity: "warn",
          summary: "Atenção!",
          detail: "Pedido Alterado, confirme as informações novamente.",
          life: 5000,
        });
        this.$parent.$parent.$parent.$parent.$parent.refresh++;
      } else if (this.retorno_checar_pedido.itensEmFalta) {
        this.handleItensEmFalta();
      } else if (this.retorno_checar_pedido.pedidoCanceladoSaldo) {
        this.handlePedidoCanceladoSaldo();
      } else {
        await this.criar_pix({
          frete: this.pagamento_pedido.frete,
          descontoUsado: this.descontoUsado,
          descontoValor: this.pagamento_pedido.pedido.semestre_pagamento
            .desconto_pix,
          valor:
            this.pagamento_pedido.valor_pos_desconto -
            this.pagamento_pedido.valor_pos_desconto *
              (this.pagamento_pedido.pedido.semestre_pagamento.desconto_pix /
                100) +
            this.pagamento_pedido.frete,
          banco: this.pagamento_pedido.pedido.semestre_pagamento.banco_pix,
          id_pedido: this.numeroPedido,
          cpf: this.pagamento_pedido.pedido.aluno.cpf,
          nome:
            this.pagamento_pedido.pedido.aluno.nome.trim() +
            " " +
            this.pagamento_pedido.pedido.aluno.sobrenome.trim(),
        });

        if (this.pix) {
          if (this.pix.pixJaPago) {
            this.pixPago = true;
            this.modalPixPago = true;
          } else {
            this.set_snackbar({
              show: true,
              severity: "success",
              summary: "Sucesso!",
              detail: "QRcode gerado com sucesso!",
              life: 3000,
            });
            this.pixTimer = 300; //300;
            let interval = setInterval(() => {
              this.pixTimer--;
              if (this.pixTimer == 0) {
                clearInterval(interval);
                if (!this.pixPago) {
                  this.set_pix(null);
                  this.set_snackbar({
                    show: true,
                    severity: "warn",
                    summary: "Atenção!",
                    detail: "QRcode expirado!",
                    life: 3000,
                  });
                }
              }
            }, 1000);
            this.objToStore = this.$LS.get();
            this.objToStore.session.carrinho = {
              listas: [],
              totalCarrinho: 0.0,
              qtdItemsSelecionados: 0,
              faculdade: {},
              semestre: {},
            };
            delete this.objToStore.pedido;
            delete this.objToStore.faculdade;
            delete this.objToStore.semestre;
            this.$LS.set(this.objToStore);
            this.set_refreshHeader(true);
          }
        } else {
          this.set_snackbar({
            show: true,
            severity: "error",
            summary: "Erro!",
            detail: "Algo deu errado, tente novamente mais tarde.",
            life: 5000,
          });
        }
        this.loading = false;
      }
    },
    handlePedidoCanceladoSaldo() {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      this.set_infocheck({
        show: true,
        msg:
          "Pedido cancelado devido a falta de estoque, refaça seu pedido ou entre em contato conosco",
      });
      this.$router.push({ name: "inicio" });
    },
    handleItensEmFalta() {
      this.objToStore = this.$LS.get();
      this.objToStore.shared.itensEmFalta = this.retorno_checar_pedido.itensEmFalta;
      this.$LS.set(this.objToStore);
      this.$parent.$parent.$parent.$parent.$parent.refresh++;
    },
    copyPix() {
      let copyText = document.getElementById("pixInput");
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */

      navigator.clipboard.writeText(copyText.value);
      this.set_snackbar({
        show: true,
        severity: "success",
        summary: "Sucesso!",
        detail: "Código copiado com Sucesso!",
        life: 3000,
      });
    },
    getURL(img) {
      if (img != "") return require("../../assets/" + img + ".png");
      else return false;
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
    smoothScroll(target, isCenter = false) {
      setTimeout(function() {
        document.getElementById(target).scrollIntoView({
          behavior: "smooth",
          block: isCenter ? "center" : "start",
        });
      }, 100);
    },
  },
};
</script>

<style>
.p-button {
  padding: 0.3rem 0.7rem !important;
}
.p-selectbutton .p-button.p-highlight {
  font-weight: bold;
  background: #2bbacb !important;
  border-color: #27aebd !important;
  color: #ffffff !important;
}
.p-selectbutton .p-button.p-highlight:focus {
  background: #2bbacb !important;
  border-color: #27aebd !important;
  color: #ffffff !important;
  box-shadow: 0 0 0 0.2rem #5bc0cb73 !important;
}
</style>
<style src="@vueform/slider/themes/default.css"></style>
<style scoped>
@media (min-width: 760px) {
  .left-separator {
    border-left: 1px solid lightgrey;
  }
}
@media (max-width: 759px) {
  .left-separator {
    border-top: 1px solid lightgrey;
    margin-top: 15px;
    padding-top: 15px;
    min-height: 200px;
  }
}
.col6 {
  flex: 0 0 auto;
  width: 50%;
}
.col6ToNone {
  flex: 0 0 auto;
  width: 50%;
}
.imagem-boleto {
  height: 210px;
}
@media screen and (max-width: 991px) {
  .cartao-container {
    position: relative;
    width: 100% !important;
  }
  .col6 {
    flex: 0 0 auto;
    width: 100%;
  }
  .col6ToNone {
    display: none !important;
  }
}
.img-bandeira {
  position: absolute;
  height: 28px;
  max-width: 60px;
  bottom: 84px;
  right: 5px;
}
.img-cartao {
  width: 350px;
}
.cartao-container {
  position: relative;
  width: 350px;
}
.cartao-numero {
  transition: 0.4s all;
  color: white;
  left: 34px;
  position: absolute;
  bottom: 80px;
  font-size: 22px;
}
.cartao-nome {
  transition: 0.4s all;
  color: white;
  text-align: start;
  width: 300px;
  overflow: hidden;
  white-space: nowrap;
  left: 34px;
  position: absolute;
  bottom: 16px;
  font-size: 18px;
  text-overflow: ellipsis;
  text-transform: uppercase;
}
.cartao-validade {
  transition: 0.4s all;
  color: white;
  right: 148px;
  position: absolute;
  bottom: 41px;
  font-size: 11px;
}
.cartao-cvv {
  transition: 0.4s all;
  color: black;
  right: 10px;
  position: absolute;
  top: 82px;
  font-size: 16px;
}
.cartao-selected {
  color: black;
}

/* entire container, keeps perspective */
.flip-container {
  perspective: 1000px;
}
/* flip the pane */
.flipped .flipper {
  transform: rotateY(180deg);
}

.flip-container,
.front,
.back {
  width: 350px;
}
/* flip speed goes here */
.flipper {
  transition: 0.4s;
  transform-style: preserve-3d;

  position: relative;
}
/* hide back of pane during swap */
.front,
.back {
  backface-visibility: hidden;

  position: absolute;
  top: 0;
  left: 0;
}
/* front pane, placed above back */
.front {
  z-index: 2;
  /* for firefox 31 */
  transform: rotateY(0deg);
}
/* back, initially hidden pane */
.back {
  transform: rotateY(180deg);
}
@media screen and (max-width: 400px) {
  .imagem-boleto {
    height: 140px;
  }
  .btn {
    padding: 5px 3px;
    font-size: 13px;
  }
  .pagamento-label-mobile {
    display: none;
  }
  .slider-horizontal {
    margin: 0px auto;
    width: 80%;
  }
}
@media screen and (min-width: 401px) and (max-width: 600px) {
  .imagem-boleto {
    height: 170px;
  }
  .slider-horizontal {
    margin: 0px auto;
    width: 85%;
  }
}
</style>
