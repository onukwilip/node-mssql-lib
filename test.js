const sql = require("mssql/msnodesqlv8");
const { connectDB, queryType } = require("./index");

const config = {
  server: "(local)\\SQLEXPRESS",
  connectionTimeout: 1000 * 60,
  requestTimeout: 1000 * 60,
  database: "GOChat_2_0",
  options: {
    trustServerCertificate: true,
    trustedConnection: true,
  },
};

const connect = async () => {
  const pool = await connectDB({
    connection: config,
    type: queryType.procedure,
    inputs: [
      { name: "UserID", value: "5f15cd52-75b4-4bfa-8797-0975756eccc1" },
      {
        name: "ChatRoomID",
        value: "CHATROOM_63a48935-ad2c-462e-bb0f-3a253c6bb124",
      },
    ],
    query: "GetChatRoom",
  });
  console.log("RESPONSE", pool.recordset);
};
connect();
