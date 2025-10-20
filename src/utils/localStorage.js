import crypto from "../utils/crypto";
import store from "../store/index";
function localStorageExpires() {
  var toRemove = [], // Itens para serem removidos
    currentDate = new Date().getTime(); // Data atual em milissegundos

  for (var i = 0, j = localStorage.length; i < j; i++) {
    var key = localStorage.key(i),
      value = localStorage.getItem(key);
    if (value.length > 100) {
      value = crypto.decrypt(value, true);
    }
    

    // Checa a chave expires do item especifico se for mais antigo que a data atual ele salva no array
    if (Object.hasOwn(value, 'expires') && value.expires <= currentDate) {
      toRemove.push(key);
    }
  }

  // Remove itens que já passaram do tempo
  // Se remover no primeiro loop isto poderia afetar a ordem,
  // pois quando se remove um item geralmente o objeto ou array são reordenados
  for (var k = toRemove.length - 1; k >= 0; k--) {
    localStorage.removeItem(toRemove[k]);
  }
}

const LS = {
  set: function(obj) {
    obj.expires = new Date().getTime() + 60000 * 1440; // 1440 um dia, em minutos
    localStorage.setItem("cookie_local", crypto.encrypt(obj, true));
    //console.log('setando cookie local', obj);
    if (obj.session.aluno) {
      //console.log('setando cookie base', obj);
      store.dispatch("upsert_session", crypto.encrypt(obj.session, true));
    }
  },

  get: function() {
    localStorageExpires();
    if (localStorage.getItem("cookie_local") != null) {
      //console.log('pegando cookie local', crypto.decrypt(localStorage.getItem("cookie_local"), true));
      return crypto.decrypt(localStorage.getItem("cookie_local"), true);
    } else return { session: {}, shared: {} };
  },

  checkExpires: function() {
    localStorageExpires();
  },
};

export default LS;
