import WebSocket from "isomorphic-ws";

export class NotificationEvents {
  onUserEvent?: (event: any) => any;
  constructor(protected ws: WebSocket) {}

  protected onMessageHandler(e: string) {
    let frame = JSON.parse(e);
    if (this.onUserEvent) {
      this.onUserEvent(frame);
    }
  }

  public async subscribeEvents(
    accessToken: string,
    onUserEvent: (event: any) => any,
    timeout = 30000
  ): Promise<WebSocket> {
    this.onUserEvent = onUserEvent;
    return new Promise((resolve, reject) => {
      let authenticated: (data: string) => void;

      const waitTimeout = setTimeout(() => {
        this.ws.off("message", authenticated);
        reject("Authentication timed out");
      }, timeout);

      authenticated = (e: string) => {
        let frame = JSON.parse(e);

        if (frame.message == "Authenticated") {
          clearTimeout(waitTimeout);
          this.ws.off("message", authenticated);
          this.ws.on("message", this.onMessageHandler.bind(this));
          resolve(this.ws);
        } else if (frame.error) {
          clearTimeout(waitTimeout);
          this.ws.off("message", authenticated);
          reject(frame.error);
        }
      };
      this.ws.on("message", authenticated);

      this.ws.send(
        JSON.stringify({
          action: "auth",
          accessToken,
        })
      );
    });
  }
}
