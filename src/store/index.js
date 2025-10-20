import { createStore } from "vuex";
import "es6-promise/auto";
import axios from "../plugins/axios";
import crypto from "../utils/crypto";
import local from "../utils/localStorage";

//PRODUÇÃO
const org_id = "k8vif92e";

//HOMOLOGAÇÃO
//const org_id = '1snn5n9w';

export default createStore({
  state: {
    manutencao: { manutencao: true },
    ipBlocked: false,
    ip: "",
    org_id: org_id,
    show_slow: false,
    disable_btn_concluir: false,
    tourVaiContinuar: false,
    faculdades: [],
    semestres: { graduacao: [], especializacao: [] },
    faculdade: { nome_exibicao_faculdade: "" },
    semestre: { descri_semestre: "" },
    aluno: {},
    scrollTo: "",
    avisos: [],
    avisoGeral: [],
    ip_liberado: false,
    brindes: [],
    listas: [],
    representantes: [],
    kits: [],
    kit_item: [],
    pedidos: [],
    pedido: {},
    item_controlar_saldo: [],
    id_pedido: "",
    pagamento_pedido_base: {
      pedido: { semestre_pagamento: { credito: true, boleto: true } },
      kitFormasPagamento: null,
    },
    pagamento_pedido: {},
    itensPedidoCheckout: 0,
    forma_de_pagamento: null,
    fidelidade: {},
    resgate: null,
    snackbar: {
      show: false,
      color: "",
      msg: "",
    },
    infocheck: {
      show: false,
      msg: "",
    },
    cpfRepetido: false,
    error: false,
    redirect: false,
    resetListas: false,
    emailSenha: { sent: false, aluno: { show: false, nome: "", email: "" } },
    hasListaTeste: false,
    sessionExpired: false,
    trocarSenha: {},
    offline: false,
    refreshHeader: false,
    listaParaSerRemovida: {},
    doAvancarFromHeader: false,
    retorno_pagamento: { razao: "" },
    retorno_outros: { outros: false },
    lastCheckoutid: null,
    estrangeiro: {},
    editarPedido: null,
    retorno_checar_pedido: false,
    descontoUsado: false,
    pix: null,
    carteirinha: {
      status: false,
    },
    iugu: null,
    pedido_sucesso_iugu: {},
  },

  mutations: {
    set_manutencao(state, value) {
      state.manutencao = { ...value };
    },
    set_disable_btn_concluir(state, value) {
      state.disable_btn_concluir = value;
    },
    set_show_slow(state, value) {
      state.show_slow = value;
    },
    set_retorno_pagamento(state, value) {
      state.retorno_pagamento = { ...value };
    },
    set_retorno_outros(state, value) {
      state.retorno_outros = { ...value };
    },
    set_faculdades(state, value) {
      state.faculdades = value;
    },
    set_semestres(state, value) {
      state.semestres = value;
    },
    set_faculdade(state, value) {
      state.faculdade = { ...value };
    },
    set_semestre(state, value) {
      state.semestre = { ...value };
    },
    set_aluno(state, value) {
      state.aluno = { ...value };
    },
    set_scrollTo(state, value) {
      state.scrollTo = value;
    },
    set_avisos(state, value) {
      state.avisos = value;
    },
    set_avisoGeral(state, value) {
      state.avisoGeral = value;
    },
    set_listas(state, value) {
      state.listas = value;
    },
    set_kits(state, value) {
      state.kits = value;
    },
    set_kit_item(state, value) {
      state.kit_item = value;
    },
    set_brindes(state, value) {
      state.brindes = value;
    },
    set_pedidos(state, value) {
      state.pedidos = value;
    },
    set_item_controlar_saldo(state, value) {
      state.item_controlar_saldo = value;
    },
    set_snackbar(state, value) {
      state.snackbar = { ...value };
    },
    set_error(state, value) {
      state.error = value;
    },
    set_redirect(state, value) {
      state.redirect = value;
    },
    set_resetListas(state, value) {
      state.resetListas = value;
    },
    set_infocheck(state, value) {
      state.infocheck = { ...value };
    },
    set_pedido(state, value) {
      state.pedido = { ...value };
    },
    set_id_pedido(state, value) {
      state.id_pedido = value;
    },
    set_pagamento_pedido_base(state, value) {
      state.pagamento_pedido_base = { ...value };
    },
    set_pagamento_pedido(state, value) {
      state.pagamento_pedido = { ...value };
    },
    set_itensPedidoCheckout(state, value) {
      state.itensPedidoCheckout = value;
    },
    set_forma_de_pagamento(state, value) {
      state.forma_de_pagamento = value;
    },
    set_emailSenha(state, value) {
      state.emailSenha = { ...value };
    },
    set_tourVaiContinuar(state, value) {
      state.tourVaiContinuar = value;
    },
    set_offline(state, value) {
      state.offline = value;
    },
    set_representantes(state, value) {
      state.representantes = value;
    },
    set_fidelidade(state, value) {
      state.fidelidade = { ...value };
    },
    set_resgate(state, value) {
      state.resgate = value;
    },
    set_sessionExpired(state, value) {
      state.sessionExpired = value;
    },
    set_ip_liberado(state, value) {
      state.ip_liberado = value;
    },
    set_hasListaTeste(state, value) {
      state.hasListaTeste = value;
    },
    set_trocarSenha(state, value) {
      state.trocarSenha = { ...value };
    },
    set_refreshHeader(state, value) {
      state.refreshHeader = value;
    },
    set_listaParaSerRemovida(state, value) {
      state.listaParaSerRemovida = { ...value };
    },
    set_doAvancarFromHeader(state, value) {
      state.doAvancarFromHeader = value;
    },
    set_ip(state, value) {
      state.ip = value;
    },
    set_cpfRepetido(state, value) {
      state.cpfRepetido = value;
    },
    set_lastCheckoutid(state, value) {
      state.lastCheckoutid = value;
    },
    set_ipBlocked(state, value) {
      state.ipBlocked = value;
    },
    set_estrangeiro(state, value) {
      state.estrangeiro = { ...value };
    },
    set_editarPedido(state, value) {
      state.editarPedido = value == null ? null : { ...value };
    },
    set_retorno_checar_pedido(state, value) {
      state.retorno_checar_pedido = value;
    },
    set_descontoUsado(state, value) {
      state.descontoUsado = value;
    },
    set_pix(state, value) {
      state.pix = value ? value : null;
    },
    set_carteirinha(state, value) {
      state.carteirinha = value;
    },
    set_iugu(state, value) {
      state.iugu = value;
    },
    set_pedido_sucesso_iugu: (state, value) => {
      state.pedido_sucesso_iugu = value;
    },
  },

  actions: {
    internet_listener(context) {
      /* eslint-disable no-unused-vars */
      window.addEventListener("offline", function(e) {
        context.commit("set_offline", true);
      });
      window.addEventListener("online", function(e) {
        context.commit("set_offline", false);
      });
      /* eslint-enable no-unused-vars */
    },

    async get_manutencao(context) {
      try {
        let retorno = await axios.get("/manutencao");
        retorno = crypto.decrypt(retorno.data, true);
        let ip_liberado = await axios.get("/ip_liberado");
        ip_liberado = crypto.decrypt(ip_liberado.data, true);
        try {
          let store = local.get();
          if (Object.hasOwn(store, "userIp")) {
            if (ip_liberado.ip == store.userIp.data) {
              retorno.acessoDental = true;
            }
          } else {
            let userIp = await axios.get("https://api.ipify.org", {
              withCredentials: false,
            });
            // console.log("retorno get_userIp: ", userIp.data, userIp.data);

            store.userIp = userIp;
            local.set(store);
            if (ip_liberado.ip == userIp.data) {
              retorno.acessoDental = true;
            }
          }
        } catch (error) {
          console.log("error", error);
          context.commit("set_manutencao", retorno);
        }

        context.commit("set_manutencao", retorno);
      } catch (error) {
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Erro interno",
          detail: "Algo deu errado, tente novamente mais tarde",
          life: null,
        });
      }
    },

    async get_ip(context) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.get("https://api.ipify.org/?format=json", {
            withCredentials: false,
          });
          context.commit("set_ip", retorno.data.ip);
        } else {
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        // console.log(error);
        context.commit("set_ipBlocked", true);
      }
    },

    //GETS
    async get_login(context, payload) {
      try {
        if (navigator.onLine) {
          context.commit("set_disable_btn_concluir", true);
          let retorno = await axios.post("/login", {
            data: crypto.encrypt(payload, true),
          });
          //retorno = crypto.decrypt(retorno.data, true)
          //console.log("retorno get_login: ", retorno);

          if (retorno.data.success) {
            context.commit("set_snackbar", {
              show: true,
              severity: "success",
              summary: "Login Bem-sucedido",
              detail: "Você está logado.",
              life: 3500,
            });
          }
          context.commit("set_refreshHeader", true);
          context.commit("set_aluno", retorno.data);
          context.commit("set_disable_btn_concluir", false);
        } else {
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        context.commit("set_disable_btn_concluir", false);
        // console.log(error);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },
    async get_usuario(context) {
      try {
        if (navigator.onLine) {
          context.commit("set_disable_btn_concluir", true);
          let retorno = await axios.get("/usuario");
          retorno = crypto.decrypt(retorno.data, true);
          // console.log("retorno get_usuario: ", retorno);
          context.commit("set_refreshHeader", true);
          context.commit("set_aluno", retorno);
          context.commit("set_disable_btn_concluir", false);
        } else {
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        context.commit("set_disable_btn_concluir", false);
        // console.log(error);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },
    async get_logout(context) {
      try {
        await axios.get("/logout");
        context.commit("set_error", false);
        context.commit("set_snackbar", {
          show: true,
          severity: "info",
          summary: "Logout bem-sucedido",
          detail: "Você foi deslogado.",
          life: 3500,
        });
      } catch (error) {
        context.commit("set_error", true);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },
    async get_pedidos(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.get("/pedidos", {
            params: {
              data: crypto.encrypt(payload, true),
            },
          });
          retorno = crypto.decrypt(retorno.data, true);
          // console.log("retorno get_pedidos: ", retorno);

          context.commit("set_error", false);
          context.commit("set_pedidos", retorno);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        if (error.response.status == 401) {
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Tempo de sessão excedido",
            detail: "Sua sessão foi finalizada, por favor, refaça o login.",
            life: 6000,
          });
          context.commit("set_sessionExpired", true);
        } else {
          // console.log(error);
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "error",
            summary: "Servidor fora do ar",
            detail:
              "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
            life: null,
          });
        }
      }
    },
    async get_pedido(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.get("/pagamentoPedido", {
            params: {
              data: crypto.encrypt(payload, true),
            },
          });
          retorno = crypto.decrypt(retorno.data, true);
          // console.log("retorno get_pedido:", retorno);

          context.commit("set_error", false);
          context.commit("set_pagamento_pedido_base", retorno);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        console.log(error);
        if (error.response.status == 401) {
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Tempo de sessão excedido",
            detail: "Sua sessão foi finalizada, por favor, refaça o login.",
            life: 6000,
          });
          context.commit("set_sessionExpired", true);
        } else {
          // console.log(error);
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "error",
            summary: "Servidor fora do ar",
            detail:
              "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
            life: null,
          });
        }
      }
    },
    async get_pedido_itens(context, payload) {
      try {
        context.commit("set_itensPedidoCheckout", 0);
        let retorno = await axios.get("/pagamentoPedidoItens", {
          params: {
            data: crypto.encrypt(payload, true),
          },
        });
        retorno = crypto.decrypt(retorno.data, true);
        // console.log("retorno get_pedido_itens:", retorno);
        context.commit("set_itensPedidoCheckout", retorno);
      } catch (error) {
        console.log(error);
      }
    },
    async get_faculdades(context) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.get("/faculdades");

          retorno = crypto.decrypt(retorno.data, true);
          // console.log("retorno get_faculdades: ", retorno);

          context.commit("set_error", false);
          context.commit("set_faculdades", retorno);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        // console.log(error);
        context.commit("set_error", true);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },
    async get_fidelidade(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.get("/fidelidade", {
            params: {
              data: crypto.encrypt(payload, true),
            },
          });
          retorno = crypto.decrypt(retorno.data, true);
          // console.log("retorno get_fidelidade: ", retorno);

          context.commit("set_error", false);
          context.commit("set_fidelidade", retorno);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        if (error.response.status == 401) {
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Tempo de sessão excedido",
            detail: "Sua sessão foi finalizada, por favor, refaça o login.",
            life: 6000,
          });
          context.commit("set_sessionExpired", true);
        } else {
          // console.log(error);
          context.commit("set_snackbar", {
            show: true,
            severity: "error",
            summary: "Servidor fora do ar",
            detail:
              "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
            life: null,
          });
        }
        context.commit("set_error", true);
      }
    },
    async get_resgate(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.get("/resgate", {
            params: {
              data: crypto.encrypt(payload, true),
            },
          });
          retorno = crypto.decrypt(retorno.data, true);
          // console.log("retorno get_resgate: ", retorno);

          context.commit("set_error", false);
          context.commit("set_resgate", retorno);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        if (error.response.status == 401) {
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Tempo de sessão excedido",
            detail: "Sua sessão foi finalizada, por favor, refaça o login.",
            life: 6000,
          });
          context.commit("set_sessionExpired", true);
        } else {
          // console.log(error);
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "error",
            summary: "Servidor fora do ar",
            detail:
              "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
            life: null,
          });
        }
      }
    },
    async get_semestres(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.get("/semestres", {
            params: {
              data: crypto.encrypt(payload, true),
            },
          });
          retorno = crypto.decrypt(retorno.data, true);
          // console.log("retorno get_semestres: ", retorno);

          context.commit("set_error", false);
          context.commit("set_semestres", retorno);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        // console.log(error);
        context.commit("set_error", true);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },
    async get_semestres_com_kits(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.post("/semestrekits", {
            data: crypto.encrypt(payload, true),
          });

          retorno = crypto.decrypt(retorno.data, true);
          // console.log("retorno get_semestres_com_kits: ", retorno);

          context.commit("set_error", false);
          context.commit("set_semestres", retorno);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        // console.log(error);
        context.commit("set_error", true);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },
    async get_avisos(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.get("/avisos", {
            params: {
              data: crypto.encrypt(
                {
                  id_semestre_aviso: payload.id_semestre,
                  id_faculdade_aviso: payload.id_faculdade,
                },
                true
              ),
            },
          });
          retorno = crypto.decrypt(retorno.data, true);
          // console.log("retorno get_avisos: ", retorno);

          context.commit("set_error", false);
          context.commit("set_avisos", retorno);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        // console.log(error);
        context.commit("set_error", true);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },
    async get_avisoGeral(context) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.get("/avisoGeral");
          retorno = crypto.decrypt(retorno.data, true);
          // console.log("retorno get_avisoGeral: ", retorno);

          context.commit("set_error", false);
          context.commit("set_avisoGeral", retorno);

          // retorno = await axios.get("/hashtudo");
          // console.log('oporra', retorno);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        // console.log(error);
        context.commit("set_error", true);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },
    async get_ip_liberado(context) {
      try {
        if (navigator.onLine) {
          let ip_liberado = await axios.get("/ip_liberado");
          ip_liberado = crypto.decrypt(ip_liberado.data, true);
          // console.log("retorno get_ip_liberado: ", ip_liberado);

          try {
            let userIp = await axios.get("https://api.ipify.org", {
              withCredentials: false,
            });
            // console.log("retorno get_userIp: ", userIp.data);
            // console.log('ip liberado?', ip_liberado.ip == userIp.data);
            context.commit("set_ip_liberado", ip_liberado.ip == userIp.data);
          } catch (error) {
            context.commit("set_ip_liberado", false);
          }
        } else {
          context.commit("set_ip_liberado", false);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        // console.log(error);
        context.commit("set_error", true);
        context.commit("set_ip_liberado", false);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },
    async get_listas(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.post("/listas", {
            data: crypto.encrypt(
              {
                id_semestre_lista: payload.id_semestre,
              },
              true
            ),
          });
          retorno = crypto.decrypt(retorno.data, true);
          // console.log("retorno get_listas: ", retorno);

          context.commit("set_error", false);
          if (retorno.valid) {
            if (retorno.listas.length < 1) {
              context.commit("set_redirect", true);
              context.commit("set_snackbar", {
                show: true,
                severity: "warn",
                summary: "Aviso!",
                detail:
                  "Nenhuma lista disponível neste semestre no momento, tente novamente mais tarde",
                life: 6000,
              });
            }
            context.commit("set_listas", retorno.listas);
            context.commit("set_semestre", retorno.semestre);
            context.commit("set_faculdade", retorno.faculdade);
            context.commit("set_brindes", retorno.brindes);
            context.commit("set_hasListaTeste", retorno.hasListaTeste);
            context.commit(
              "set_item_controlar_saldo",
              retorno.item_controlar_saldo
            );
          } else {
            if (!retorno.semestre) {
              context.commit("set_snackbar", {
                show: true,
                severity: "warn",
                summary: "Aviso!",
                detail:
                  "Semestre não disponível no momento, tente novamente mais tarde.",
                life: 6000,
              });
            } else {
              context.commit("set_snackbar", {
                show: true,
                severity: "warn",
                summary: "Aviso!",
                detail:
                  "Faculdade não disponível no momento, tente novamente mais tarde.",
                life: 6000,
              });
            }
            context.commit("set_redirect", true);
          }
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        // console.log(error);
        context.commit("set_error", true);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },
    async get_kit_item(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.get("/Kit_item", {
            params: { data: crypto.encrypt(payload, true) },
          });
          retorno = crypto.decrypt(retorno.data, true);
          // console.log("retorno get_kit_item: ", retorno);

          context.commit("set_error", true);
          context.commit("set_kit_item", retorno);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        // console.log(error);
        context.commit("set_error", true);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },
    async get_representantes(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.get("/representantes", {
            params: {
              data: crypto.encrypt(
                {
                  id_semestre: payload.id_semestre,
                  id_faculdade: payload.id_faculdade,
                  cod_periodo: payload.cod_periodo,
                },
                true
              ),
            },
          });
          retorno = crypto.decrypt(retorno.data, true);
          // console.log("retorno get_representantes: ", retorno);

          context.commit("set_error", false);
          context.commit("set_representantes", retorno);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        // console.log(error);
        context.commit("set_error", true);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },
    async get_trocarSenha(context, payload) {
      try {
        if (navigator.onLine) {
          // console.log(payload);

          let retorno = await axios.get("/usuario/trocarSenha", {
            //payload ja está encriptado
            params: { data: payload },
          });
          retorno = crypto.decrypt(retorno.data, true);
          // console.log("retorno get_trocarSenha: ", retorno);

          context.commit("set_error", false);
          context.commit("set_trocarSenha", retorno);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        // console.log(error);
        context.commit("set_error", true);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },
    //CRIAR
    async criar_pix(context, payload) {
      let retorno = await axios.post("/criarPix", {
        data: crypto.encrypt(payload, true),
      });
      //retorno.data.banco = 'BB'
      context.commit("set_pix", retorno.data);
    },
    // falta testar FALTA TESTAR OPORRA VE SE TA TUDOI UPDATE LA NO SERVIDOR PAGAMENTO E GG TESTAR
    async criar_pix_cseis(context, payload) {
      let retorno = await axios.post("https://solident.com.br/node/pix_cseis", {
        data: crypto.encrypt(payload, true),
      });
      retorno.data.banco = 'C6'
      context.commit("set_pix", retorno.data);
    },
    //SALVAR
    async salvar_endereco_entrega(context, payload) {
      try {
        if (navigator.onLine) {
          await axios.post("/usuario/salvarEnderecoEntrega", {
            data: crypto.encrypt(payload, true),
          });
          context.commit("set_error", false);
          context.commit("set_snackbar", {
            show: true,
            severity: "success",
            summary: "Sucesso!",
            detail: "Informações salvas com sucesso!",
            life: 3000,
          });
        }
      } catch (error) {
        if (error.response.status == 401) {
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Tempo de sessão excedido",
            detail: "Sua sessão foi finalizada, por favor, refaça o login.",
            life: 6000,
          });
          context.commit("set_sessionExpired", true);
        } else {
          // console.log(error);
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "error",
            summary: "Servidor fora do ar",
            detail:
              "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
            life: null,
          });
        }
      }
    },
    async salvar_resgate(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.post("/resgate", {
            data: crypto.encrypt(payload, true),
          });
          retorno = crypto.decrypt(retorno.data, true);
          // console.log("retorno salvar_resgate: ", retorno);

          context.commit("set_resgate", retorno);
          context.commit("set_error", false);
          if (!retorno.pontos) {
            context.commit("set_snackbar", {
              show: true,
              severity: "info",
              summary: "Pontos insuficientes!",
              detail:
                "Você não tem pontos suficientes para este item, caso isto seja um erro, tente novamente mais tarde",
              life: 6000,
            });
          } else {
            context.commit("set_snackbar", {
              show: true,
              severity: "success",
              summary: "Prêmio resgatado com  Sucesso!",
              detail: "Seu prêmio foi resgatado, imprima seu comprovante!",
              life: 6000,
            });
          }
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        if (error.response.status == 401) {
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Tempo de sessão excedido",
            detail: "Sua sessão foi finalizada, por favor, refaça o login.",
            life: 6000,
          });
          context.commit("set_sessionExpired", true);
        } else {
          // console.log(error);
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "error",
            summary: "Servidor fora do ar",
            detail:
              "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
            life: null,
          });
        }
      }
    },
    async salvar_pedido(context, payload) {
      try {
        if (navigator.onLine) {
          context.commit("set_disable_btn_concluir", true);
          let retorno = await axios.post("/pedido", {
            data: crypto.encrypt(payload, true),
          });
          retorno = crypto.decrypt(retorno.data, true);
          // console.log("retorno salvar_pedido: ", retorno);

          context.commit("set_error", false);
          context.commit("set_id_pedido", retorno.id_pedido);
          context.commit("set_estrangeiro", retorno.estrangeiro);
          context.commit("set_disable_btn_concluir", false);
        } else {
          context.commit("set_disable_btn_concluir", false);
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        // console.log(error);
        context.commit("set_error", true);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },
    async salvar_outros(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.post("/pedidoOutros", {
            data: crypto.encrypt(payload, true),
          });
          retorno = crypto.decrypt(retorno.data, true);
          context.commit("set_error", false);
          context.commit("set_retorno_outros", retorno);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        // console.log(error);
        context.commit("set_error", true);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },
    async salvar_checkout(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.post(
            process.env.VUE_APP_URL_SERVIDOR_PAGAMENTO + "/checkout-academico",
            {
              data: crypto.encrypt(payload, true),
            }
          );
          retorno = crypto.decrypt(retorno.data, true);
          //console.log("retorno salvar_checkout: ", retorno);

          context.commit("set_error", false);
          context.commit("set_retorno_pagamento", retorno);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        // console.log(error);
        // TRATAR ERRORS BANCO
        context.commit("set_error", true);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },
    //UPDATES
    async update_pedido_desconto_representante(context, payload) {
      try {
        await axios.put("/PedidoTemDesconto", {
          data: crypto.encrypt(payload, true),
        });
      } catch (error) {
        context.commit("set_error", true);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },
    async update_aluno(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.put("/usuario", {
            data: crypto.encrypt(payload, true),
          });
          retorno = crypto.decrypt(retorno.data, true);
          // console.log("retorno update_aluno: ", retorno);
          if (retorno) {
            context.commit("set_snackbar", {
              show: true,
              severity: "success",
              summary: "Sucesso!",
              detail: "Informações salvas com sucesso!",
              life: 3000,
            });
          } else {
            context.commit("set_snackbar", {
              show: true,
              severity: "error",
              summary: "Atenção!",
              detail: "Algo deu errado! Suas informações não foram salvas.",
              life: 3000,
            });
          }
          context.commit("set_error", false);
          context.commit("set_aluno", retorno);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente.",
            life: null,
          });
        }
      } catch (error) {
        if (error.response.status == 401) {
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Tempo de sessão excedido",
            detail: "Sua sessão foi finalizada, por favor, refaça o login.",
            life: 6000,
          });
          context.commit("set_sessionExpired", true);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "error",
            summary: "Servidor fora do ar",
            detail:
              "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
            life: null,
          });
        }
      }
    },
    async update_email(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.put("/usuario/email", {
            data: crypto.encrypt(payload, true),
          });
          //retorno = crypto.decrypt(retorno.data, true);
          // console.log("retorno update_email: ", retorno);
          if (retorno) {
            context.commit("set_snackbar", {
              show: true,
              severity: "success",
              summary: "Sucesso!",
              detail: "Informações salvas com sucesso!",
              life: 3000,
            });
          } else {
            context.commit("set_snackbar", {
              show: true,
              severity: "error",
              summary: "Atenção!",
              detail: "Algo deu errado! Suas informações não foram salvas.",
              life: 3000,
            });
          }
          context.commit("set_error", false);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente.",
            life: null,
          });
        }
      } catch (error) {
        if (error.response.status == 401) {
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Tempo de sessão excedido",
            detail: "Sua sessão foi finalizada, por favor, refaça o login.",
            life: 6000,
          });
          context.commit("set_sessionExpired", true);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "error",
            summary: "Servidor fora do ar",
            detail:
              "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
            life: null,
          });
        }
      }
    },
    async update_senha(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.put("/usuario/senha", {
            data: crypto.encrypt(
              {
                cpf: payload.cpf,
                senhaNova: payload.senhaNova,
                senhaAtual: payload.senhaAtual,
              },
              true
            ),
          });

          if (retorno.data) {
            context.commit("set_snackbar", {
              show: true,
              severity: "success",
              summary: "Sucesso!",
              detail: "Senha atualizada com sucesso!",
              life: 4500,
            });
          } else {
            context.commit("set_snackbar", {
              show: true,
              severity: "warn",
              summary: "Aviso!",
              detail: "Senha atual incorreta!",
              life: 4500,
            });
          }
          context.commit("set_aluno", { senhaTrocada: retorno.data });
        } else {
          context.commit("set_error", true);
          context.commit("set_aluno", { senhaTrocada: false });
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        if (error.response.status == 401) {
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Tempo de sessão excedido",
            detail: "Sua sessão foi finalizada, por favor, refaça o login.",
            life: 6000,
          });
          context.commit("set_sessionExpired", true);
        } else {
          // console.log(error);
          context.commit("set_aluno", { senhaTrocada: false });
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "error",
            summary: "Servidor fora do ar",
            detail:
              "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
            life: null,
          });
        }
      }
    },
    async update_trocarSenha(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.put("/usuario/trocarSenha", {
            data: crypto.encrypt(
              {
                cpf: payload.cpf,
                senhaNova: payload.senhaNova,
              },
              true
            ),
          });

          if (retorno.data) {
            context.commit("set_snackbar", {
              show: true,
              severity: "success",
              summary: "Sucesso!",
              detail: "Senha atualizada com sucesso!",
              life: 4500,
            });
          } else {
            context.commit("set_snackbar", {
              show: true,
              severity: "warn",
              summary: "Aviso!",
              detail: "Senha atual incorreta!",
              life: 4500,
            });
          }
          context.commit("set_aluno", { senhaTrocada: retorno.data });
        } else {
          context.commit("set_error", true);
          context.commit("set_aluno", { senhaTrocada: false });
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        if (error.response.status == 401) {
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Tempo de sessão excedido",
            detail: "Sua sessão foi finalizada, por favor, refaça o login.",
            life: 6000,
          });
          context.commit("set_sessionExpired", true);
        } else {
          // console.log(error);
          context.commit("set_aluno", { senhaTrocada: false });
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "error",
            summary: "Servidor fora do ar",
            detail:
              "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
            life: null,
          });
        }
      }
    },
    async update_desconto_representante(context, payload) {
      try {
        await axios.put("/descontoUsado", {
          data: crypto.encrypt(payload, true),
        });
      } catch (error) {
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Erro interno",
          detail: "algo deu errado.",
          life: null,
        });
      }
    },
    async update_listas_vendidas(context, payload) {
      try {
        await axios.put("/listasVendidas", {
          data: crypto.encrypt(payload, true),
        });
      } catch (error) {
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Erro interno",
          detail: "algo deu errado.",
          life: null,
        });
      }
    },
    upsert_session(context, payload) {
      try {
        axios.post("/usuario/session", {
          data: payload,
        });
      } catch (error) {
        // console.log(error);
      }
    },
    //CHECKS
    async checar_cpf(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.get("/checarCPF", {
            params: { data: crypto.encrypt(payload, true) },
          });
          retorno = crypto.decrypt(retorno.data, true);

          context.commit("set_cpfRepetido", retorno);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        // console.log(error);
        context.commit("set_error", true);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },
    async checar_Info(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.post("/checarInfo", {
            data: crypto.encrypt(
              {
                id_semestre_lista: payload.id_semestre,
                carrinho: payload.carrinho,
              },
              true
            ),
          });
          retorno = crypto.decrypt(retorno.data, true);
          // console.log("retorno checar_info: ", retorno);
          if (!retorno.valid) {
            if (retorno.semestre) {
              context.commit("set_resetListas", true);
              context.commit("set_infocheck", {
                show: true,
                msg: "Semestre indisponivel, por favor refaça seu pedido",
              });
              context.commit("set_redirect", true);
            } else if (retorno.faculdade) {
              context.commit("set_resetListas", true);
              context.commit("set_infocheck", {
                show: true,
                msg: "Faculdade indisponivel, por favor refaça seu pedido",
              });
              context.commit("set_redirect", true);
            } else if (retorno.listas) {
              context.commit("set_resetListas", true);
              context.commit("set_infocheck", {
                show: true,
                msg:
                  "Listas alteradas ou indisponiveis, por favor refaça seu pedido",
              });
              context.commit("set_redirect", true);
            } else if (retorno.valorMinimo && !payload.paginaListas) {
              context.commit("set_infocheck", {
                show: true,
                msg:
                  "Ocorreu um erro inesperado, entre em contato conosco e informe o seguinte código: VALOR_LISTA_404",
              });
              context.commit("set_redirect", true);
            }
          }
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        // console.log(error);
        context.commit("set_error", true);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },
    async checar_pedido(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.post("/checarPedido", {
            data: crypto.encrypt(
              {
                id_pedido: payload.id_pedido,
                dataPedido: payload.dataPedido,
              },
              true
            ),
          });
          retorno = crypto.decrypt(retorno.data, true);
          context.commit("set_retorno_checar_pedido", retorno);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        context.commit("set_error", true);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },
    //EMAILS
    async email_pos_venda(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.post("/usuario/posVenda", {
            data: crypto.encrypt(payload, true),
          });
          //ToDo
          retorno = crypto.decrypt(retorno.data, true);
          // console.log("retorno email_pos_venda: ", retorno);

          if (retorno.accepted.length > 0) {
            context.commit("set_error", false);
            context.commit("set_snackbar", {
              show: true,
              severity: "success",
              summary: "Sucesso!",
              detail: "Enviado com sucesso.",
              life: 3000,
            });
          } else {
            context.commit("set_error", true);
            context.commit("set_snackbar", {
              show: true,
              severity: "error",
              summary: "Falha no envio!",
              detail:
                "algo deu errado o seu email não pode ser enviado, tente novamente mais tarde.",
              life: null,
            });
          }
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "error",
            summary: "Falha no envio. Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        if (error.response.status == 401) {
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Tempo de sessão excedido",
            detail: "Sua sessão foi finalizada, por favor, refaça o login.",
            life: 6000,
          });
          context.commit("set_sessionExpired", true);
        } else {
          // console.log(error);
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "error",
            summary: "Falha no envio.",
            detail: "Erro interno, tente novamente mais tarde",
            life: null,
          });
        }
      }
    },
    async email_senha(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.post("/usuario/recuperaSenha", {
            data: crypto.encrypt(payload, true),
          });
          retorno = crypto.decrypt(retorno.data, true);
          // console.log("retorno email_senha: ", retorno);

          if (retorno.sem_cadastro) {
            context.commit("set_snackbar", {
              show: true,
              severity: "error",
              summary: "CPF NÃO POSSUI CADASTRO",
              detail:
                "CPF informado não possui cadastro, por favor cadastre-se para continuar sua compra.",
              life: null,
            });
          } else {
            if (retorno.emailSent) {
              context.commit("set_error", false);
              context.commit("set_emailSenha", {
                sent: true,
                aluno: {
                  nome: retorno.aluno.nome,
                  email: retorno.aluno.email,
                  show: true,
                },
              });
              // context.commit('set_snackbar', { show: true, severity: 'success', summary: "Sucesso!", detail: "Email de recuperação de senha enviado com sucesso.", life: 3000 })
            } else {
              context.commit("set_error", true);
              context.commit("set_snackbar", {
                show: true,
                severity: "error",
                summary: "Falha no envio!",
                detail:
                  "algo deu errado o seu email não pode ser enviado, tente novamente mais tarde.",
                life: null,
              });
            }
          }
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "error",
            summary: "Falha no envio. Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        if (error.response.status == 401) {
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Tempo de sessão excedido",
            detail: "Sua sessão foi finalizada, por favor, refaça o login.",
            life: 6000,
          });
          context.commit("set_sessionExpired", true);
        } else {
          // console.log(error);
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "error",
            summary: "Falha no envio.",
            detail: "Erro interno, tente novamente mais tarde",
            life: null,
          });
        }
      }
    },
    async email_trocar_senha(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.post("/usuario/recuperaSenha", {
            data: crypto.encrypt(payload, true),
          });
          retorno = crypto.decrypt(retorno.data, true);
          // console.log("retorno email_senha: ", retorno);

          if (retorno.emailSent) {
            context.commit("set_error", false);
            context.commit("set_emailSenha", {
              sent: true,
              aluno: {
                nome: retorno.aluno.nome,
                email: retorno.aluno.email,
                show: true,
              },
            });
            context.commit("set_snackbar", {
              show: true,
              severity: "success",
              summary: "Sucesso!",
              detail: "Email de recuperação de senha enviado com sucesso.",
              life: 3000,
            });
          } else {
            context.commit("set_error", true);
            context.commit("set_snackbar", {
              show: true,
              severity: "error",
              summary: "Falha no envio!",
              detail:
                "algo deu errado o seu email não pode ser enviado, tente novamente mais tarde.",
              life: null,
            });
          }
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "error",
            summary: "Falha no envio. Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        if (error.response.status == 401) {
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Tempo de sessão excedido",
            detail: "Sua sessão foi finalizada, por favor, refaça o login.",
            life: 6000,
          });
          context.commit("set_sessionExpired", true);
        } else {
          // console.log(error);
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "error",
            summary: "Falha no envio.",
            detail: "Erro interno, tente novamente mais tarde",
            life: null,
          });
        }
      }
    },
    async email_fidelidade_contato(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.post("/fidelidadeContato", {
            data: crypto.encrypt(payload, true),
          });

          retorno = crypto.decrypt(retorno.data, true);
          // console.log("retorno email_fidelidade_contato: ", retorno);

          if (retorno.accepted.length > 0) {
            context.commit("set_error", false);
            context.commit("set_snackbar", {
              show: true,
              severity: "success",
              summary: "Sucesso!",
              detail: "Enviado com sucesso.",
              life: 3000,
            });
          } else {
            context.commit("set_error", true);
            context.commit("set_snackbar", {
              show: true,
              severity: "error",
              summary: "Falha no envio!",
              detail:
                "algo deu errado o seu email não pode ser enviado, tente novamente mais tarde.",
              life: null,
            });
          }
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "error",
            summary: "Falha no envio. Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        if (error.response.status == 401) {
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Tempo de sessão excedido",
            detail: "Sua sessão foi finalizada, por favor, refaça o login.",
            life: 6000,
          });
          context.commit("set_sessionExpired", true);
        } else {
          // console.log(error);
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "error",
            summary: "Servidor fora do ar",
            detail:
              "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
            life: null,
          });
        }
      }
    },
    async email_pagamento_sucesso(context, payload) {
      try {
        await axios.post("/pagamentoSucesso", {
          data: crypto.encrypt(payload, true),
        });
      } catch (error) {
        console.log(error);
      }
    },
    async get_carteirinha(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.get("/carteirinha", {
            params: { data: payload },
          });
          retorno = retorno.data;

          context.commit("set_carteirinha", retorno);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        // console.log(error);
        context.commit("set_error", true);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },

    async cancelarTeste(context) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.post(
            "https://solident.com.br/node/cancelarIugu"
          );
          retorno = retorno.data;
          console.log("RETORNO", retorno);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        // console.log(error);
        context.commit("set_error", true);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },

    async get_iugu(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.post("https://solident.com.br/node/pagbank", {
            data: crypto.encrypt(payload, true),
          });
          retorno = retorno.data;

          context.commit("set_iugu", retorno);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        // console.log(error);
        context.commit("set_error", true);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },
    async get_pedido_sucesso_iugu(context, payload) {
      try {
        if (navigator.onLine) {
          let retorno = await axios.get("/pedido", {
            params: {
              data: crypto.encrypt(payload, true),
            },
          });
          retorno = crypto.decrypt(retorno.data, true);

          context.commit("set_pedido_sucesso_iugu", retorno);
        } else {
          context.commit("set_error", true);
          context.commit("set_snackbar", {
            show: true,
            severity: "warn",
            summary: "Sem conexão com a internet",
            detail:
              "Não conseguimos acesso a internet, verifique sua conexão e tente novamente",
            life: null,
          });
        }
      } catch (error) {
        // console.log(error);
        context.commit("set_error", true);
        context.commit("set_snackbar", {
          show: true,
          severity: "error",
          summary: "Servidor fora do ar",
          detail:
            "Parece que nosso servidor está fora do ar, tente novamente mais tarde.",
          life: null,
        });
      }
    },
  },
});
