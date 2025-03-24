import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";

export class SocketServerManager {
  private static _instance: SocketServerManager;
  private _io: SocketServer | null = null;
  private _isInitialized: boolean = false;

  private constructor() {}

  public static getInstance(server?: HttpServer): SocketServerManager {
    if (!SocketServerManager._instance) {
      SocketServerManager._instance = new SocketServerManager();
    }

    return SocketServerManager._instance;
  }

  public getIo(): SocketServer {
    if (!this._io) {
      throw new Error("SocketServer is not initialized");
    }

    return this._io;
  }

  public init(server: HttpServer): void {
    if (this._isInitialized) {
      console.warn("SocketServer is already initialized");
      return;
    }

    this._io = new SocketServer(server);
    this._isInitialized = true;
    console.log("Socket server initialized");
  }
}
