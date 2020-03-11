import Model from "@/model";
import config from "@/model/config";
class Register extends Model {
  getverifyCode(options = {}) {
    options.url = "user/register/setemailcode";
    return this.post(options);
  }

  getRegister(options = {}) {
    options.headers = config.formData;
    options.url = "user/register/register";
    return this.post(options);
  }

  getMap(options = {}) {
    options.baseURL = "http://pdh5.onccc.com/#/";
    return this.get(options);
  }

  getScreet(options = {}) {
    options.baseURL = process.env.VUE_APP_API;
    options.url = "v1/auth/dictionary";
    return this.get(options);
  }
}

export default new Register();
