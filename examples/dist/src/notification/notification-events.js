"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationEvents = void 0;
class NotificationEvents {
    constructor(ws) {
        this.ws = ws;
    }
    onMessageHandler(e) {
        let frame = JSON.parse(e);
        if (this.onUserEvent) {
            this.onUserEvent(frame);
        }
    }
    async subscribeEvents(accessToken, onUserEvent, timeout = 30000) {
        this.onUserEvent = onUserEvent;
        return new Promise((resolve, reject) => {
            let authenticated;
            const waitTimeout = setTimeout(() => {
                this.ws.off("message", authenticated);
                reject("Authentication timed out");
            }, timeout);
            authenticated = (e) => {
                let frame = JSON.parse(e);
                if (frame.message == "Authenticated") {
                    clearTimeout(waitTimeout);
                    this.ws.off("message", authenticated);
                    this.ws.on("message", this.onMessageHandler.bind(this));
                    resolve(this.ws);
                }
                else if (frame.error) {
                    clearTimeout(waitTimeout);
                    this.ws.off("message", authenticated);
                    reject(frame.error);
                }
            };
            this.ws.on("message", authenticated);
            this.ws.send(JSON.stringify({
                action: "auth",
                accessToken,
            }));
        });
    }
}
exports.NotificationEvents = NotificationEvents;
