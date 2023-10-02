// @flow
import _ from "lodash";
import { create } from "apisauce";
import {
  API_LOG,
  BASE_URL,
  API_TIMEOUT,
  ERROR_SOMETHING_WENT_WRONG,
  ERROR_NETWORK_NOT_AVAILABLE
} from "../config/WebService";
import DataHandler from "./DataHandler";
import { Actions } from "react-native-router-flux";
import { userSignOutSuccess } from "../actions/UserActions";
import util from "../util";

const api = create({
  baseURL: BASE_URL,
  timeout: API_TIMEOUT
});

const onForbidden = async () => {
  const newToken = await util.refreshAccessToken();
  if (newToken) {
    return newToken;
  }

  Actions.reset('login');
  return false;
};

const userBlocked = res => {
  DataHandler.getStore().dispatch(userSignOutSuccess());
  Actions.reset('login');
};

const apiLogs = (url, data, headers, response) => {
  if (true) {
    url && console.log("url", url);
    data && console.log("data", data);
    headers && console.log("headers", headers);
    response && console.log(response);
  }
};

class ApiSauce {
  async post(url, data, headers, baseUrl) {
    api.setBaseURL(baseUrl);
    const response = await api.post(url, data, {
      headers
    });
    if (true) {
      url && console.log("url", url);
      data && console.log("data", data);
      headers && console.log("headers", headers);
      response && console.log(response);
    }

    if (response.status === 401) {
      userBlocked(response);
      return true;
    }

    if (response.status === 403) {
      try {
        // Below function will store new CSRF token
        const newToken = await onForbidden();
        if (newToken) {
          headers.Authorization = `Bearer ${newToken}`;
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);
      }

      const responseNew = await api.post(url, data, {
        headers,
      });

      return this.manipulateResponse(responseNew);
    } else {
      return this.manipulateResponse(response);
    }
  }

  async get(url, data, headers, baseUrl) {
    api.setBaseURL(baseUrl);
    const response = await api.get(url, data, {
      headers
    });

    apiLogs(url, false, headers, response);

    if (response.status === 401) {
      userBlocked(response);
      return true;
    }

    if (response.status === 403) {
      try {
        // Below function will store new CSRF token
        const newToken = await onForbidden();

        if (newToken) {
          headers.Authorization = `Bearer ${newToken}`;
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);
      }

      const responseNew = await api.get(url, data, {
        headers,
      });

      return this.manipulateResponse(responseNew);
    } else {
      return this.manipulateResponse(response);
    }
  }

  async delete(url, data, headers, baseUrl) {
    api.setBaseURL(baseUrl);
    const response = await api.delete(url, data, {
      headers,
    });

    apiLogs(url, data, headers, response);

    if (response.status === 401) {
      userBlocked(response);
      return true;
    }

    if (response.status === 403) {
      try {
        // Below function will store new CSRF token
        const newToken = await onForbidden();

        if (newToken) {
          headers.Authorization = `Bearer ${newToken}`;
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);
      }

      const responseNew = await api.delete(url, data, {
        headers,
      });

      return this.manipulateResponse(responseNew);
    } else {
      return this.manipulateResponse(response);
    }
  }

  async put(url, data, headers, baseUrl) {
    api.setBaseURL(baseUrl);
    const response = await api.put(url, data, {
      headers
    });

    apiLogs(url, data, headers, response);

    if (response.status === 401) {
      userBlocked(response);
      return true;
    }

    if (response.status === 403) {
      try {
        // Below function will store new CSRF token
        const newToken = await onForbidden();

        if (newToken) {
          headers.Authorization = `Bearer ${newToken}`;
        } else {
          return false;
        }
      } catch (err) {
        console.log(err);
      }

      const responseNew = await api.put(url, data, {
        headers,
      });

      return this.manipulateResponse(responseNew);
    } else {
      return this.manipulateResponse(response);
    }
  }

  manipulateResponse(response) {
    return new Promise((resolve, reject) => {
      if (response.ok && response.data && !response.data.error) {
        resolve(response.data);
      } else {
        if (
          response.status === 401 &&
          response.data.message === "Unauthenticated"
        ) {
          // session expired, logout user forcefully
          // logoutUserHelper();
        }

        if (response.status === 500) {
          reject(ERROR_SOMETHING_WENT_WRONG);
        }

        if (response.problem === "NETWORK_ERROR") {
          reject(ERROR_NETWORK_NOT_AVAILABLE);
        }

        reject(response.data || ERROR_SOMETHING_WENT_WRONG);
      }
    });
  }
}

export default new ApiSauce();
