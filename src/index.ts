import Server from "./server";

const server = Server;

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT : ${PORT}`);
});
