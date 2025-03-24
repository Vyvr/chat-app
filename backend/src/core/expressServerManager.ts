import { Application, Express } from "express";
import { createServer, Server } from "http";
import express from "express";

export class ExpressServerManager {
  private static _instance: ExpressServerManager;
  private _app: Application | null = null;
  private _server: Server | null = null;
  private _port: number | string | undefined = undefined;
  private _isInitialized: boolean = false;

  private constructor() {
    this._app = express();
    this._server = createServer(this._app);
  }

  public static getInstance() {
    if (!ExpressServerManager._instance) {
      ExpressServerManager._instance = new ExpressServerManager();
    }

    return ExpressServerManager._instance;
  }

  public getApp(): Application {
    if (!this._app) {
      this._app = express();
      return this._app;
    }

    return this._app;
  }

  public getServer(): Server {
    if (!this._server) {
      this._server = createServer(this.getApp());
      return this._server;
    }

    return this._server;
  }

  public getPort(): number | string | undefined {
    if (!this._port) {
      console.warn("Port is not set");
      return this._port;
    }

    return this._port;
  }

  public isInitialized(): boolean {
    return this._isInitialized;
  }

  public init(
    port: number | string | undefined,
    middleware: express.RequestHandler[]
  ): void {
    if (this._isInitialized) {
      console.warn("Server is already initialized");
      return;
    }

    if (!this._app) {
      this._app = express();
    }

    if (!this._server) {
      this._server = createServer(this._app);
    }

    this._port = port;

    middleware.forEach((mw) => {
      console.log(`Added middleware: ${mw.name}`);
      this._app?.use(mw);
    });

    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));

    this._isInitialized = true;
  }

  public start(): Promise<void> {
    if (!this.isInitialized) {
      return Promise.reject(
        new Error("Server must be initialized before starting")
      );
    }

    return new Promise((resolve) => {
      this._server?.listen(this._port, () => {
        console.log(`Express server initialized successfully`);
        console.log(`Server running on port ${this._port}`);
        resolve();
      });
    });
  }
}
