import { Socket } from "socket.io";
import { config } from "dotenv";
import { ExpressServerManager } from "./core/expressServerManager";
import helmet from "helmet";
import cors from "cors";
import { SocketServerManager } from "./core/socketServerManager";
import authRouter from "./endpoints/authEndpoints";

config();

async function initializeEnvironment() {
  const expressServer = ExpressServerManager.getInstance();

  expressServer.init(process.env.PORT, [helmet(), cors()]);

  const app = expressServer.getApp();
  const server = expressServer.getServer();

  const socketServer = SocketServerManager.getInstance(server);
  socketServer.init(server);

  const io = socketServer.getIo();

  // const prisma = new PrismaClient();

  app.use("/api/auth", authRouter);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  io.on("connection", (socket: Socket) => {
    socket.emit("heloł", "world :)");
    socket.on("message", (msg: string) => {
      socket.emit("hello", "world");
    });
    console.log(`user connected on socket ${socket}`);
  });

  await expressServer.start();
}

initializeEnvironment().catch((error) => {
  console.error(`something went wrong during initialization: ${error}`);
  process.exit(1);
});
