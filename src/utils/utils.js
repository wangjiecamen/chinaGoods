const $ = window.rootVueInstance;

export default {
  phoneValidator: function(rule, value, callback) {
    if (!value) {
      return callback(new Error($.$t("logon.placeholderContact")));
    }
    if (!/^1[3456789][0-9]{9}$/.test(value)) {
      return callback(new Error($.$t("logon.contactFormat")));
    }
    return callback();
  },
  emailValidator: function(rule, value, callback) {
    if (!value) {
      return callback(new Error($.$t("logon.placeholderContact")));
    }
    if (!/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(value)) {
      return callback(new Error($.$t("logon.contactFormat")));
    }
    return callback();
  }
};
