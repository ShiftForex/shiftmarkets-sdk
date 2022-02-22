import { SdkService } from "../common/sdk.service";
import WebSocket from "isomorphic-ws";
import debugFactory from "debug";
import axios, { AxiosRequestConfig } from "axios";
import { Notification } from './interfaces';

const debug = debugFactory("ClientSDK:NotificationService");

export class NotificationServiceError extends Error {
  constructor(message?: string, public data?: object) {
    super(message);
  }
}

export async function notificationServiceRequest(request: AxiosRequestConfig) {
  try {
    debug("REQUEST", request);
    const response = (await axios(request)).data;
    debug("RESPONSE", response);
    return response;
  } catch (error) {
    debug("ERROR", JSON.stringify(error, undefined, ' '));
    const data = error.response?.data;
    const message = Array.isArray(data?.message)
      ? data.message.join(", ")
      : data?.message;
    throw new NotificationServiceError(message, data);
  }
}


export default interface Listener<T> {
  (data: T): void;
}

enum NotificationsEndpoints {
  GetNotifications = 'user/notifications',
  MarkNotificationsRead = 'user/notifications/read',
  RegisterPushToken = 'push/register-token',
  RemovePushToken = 'push/remove-token',
}

export class NotificationService {

  async getNotifications(): Promise<{ notifications: Notification[] }> {
    const response = await notificationServiceRequest({
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      },
      baseURL: this.config.notification_api_url,
      url: NotificationsEndpoints.GetNotifications,
      method: 'GET',
      data: null,
    });

    return response;
  }

  async markNotificationsRead(ids: Notification['id'][]): Promise<void> {
    const response = notificationServiceRequest({
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      },
      baseURL: this.config.notification_api_url,
      url: NotificationsEndpoints.MarkNotificationsRead,
      method: 'POST',
      data: {
        ids,
      },
    });

    return response;
  }

  async registerPushToken(token: string): Promise<null> {
    const response = notificationServiceRequest({
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      },
      baseURL: this.config.notification_api_url,
      url: NotificationsEndpoints.RegisterPushToken,
      method: 'POST',
      data: {
        token,
      }
    });

    return response;
  }

  async removePushToken(token: string): Promise<null> {
    const response = notificationServiceRequest({
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      },
      baseURL: this.config.notification_api_url,
      url: NotificationsEndpoints.RemovePushToken,
      method: 'POST',
      data: {
        token,
      }
    });

    return response;
  }

  notificationWebsocketFactory(timeout = 15000): Promise<WebSocket> {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(this.config.notification_ws_url);
      let rejectTimeout = setTimeout(() => {
        if (ws.readyState != ws.OPEN) {
          new Error(
            `Connection timeout ${this.config.notification_ws_url} ${timeout}ms`
          );
          ws.close();
        }
      }, timeout);
      ws.onopen = () => {
        clearTimeout(rejectTimeout);
        resolve(ws);
      };
      ws.onerror = (e) => {
        clearTimeout(rejectTimeout);
        reject(e);
      };

      if (typeof ws.on == "undefined" && typeof ws.off == "undefined") {
        // dirty workaround on web browser websocket
        let listeners: Listener<any>[] = [];
        ws.onmessage = (event: WebSocket.MessageEvent) => {
          listeners.forEach((listener) => listener(event.data));
        };
        Object.assign(ws, {
          on: (event: any, listener: Listener<any>) => {
            const index = listeners.indexOf(listener);
            if (index === -1) {
              listeners.push(listener);
            }
          },
          off: (event: any, listener: Listener<any>) => {
            const index = listeners.indexOf(listener);
            if (index !== -1) {
              listeners.splice(index, 1);
            }
          },
        });
      }
    });
  }
}

export interface NotificationService extends SdkService { }
