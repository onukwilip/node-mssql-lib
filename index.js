const sql = require("mssql/msnodesqlv8");

const queryType = {
  query: "QUERY",
  procedure: "PROCEDURE",
};

class configType {
  constructor() {
    this.connection = {};
    this.type = "";
    this.inputs = [
      {
        name: "",
        value: "",
      },
    ];
    this.outputs = [
      {
        name: "",
        value: "",
      },
    ];
    this.query = "";
  }
}

class ResponseType {
  recordsets = [];
  recordset = [];
  output = {};
  rowsAffected = [];
  returnValue = 0;
}

const connectDB = async (/**@type configType */ config) => {
  const pool = await sql.connect(config.connection);
  let /**@type ResponseType */ response;
  const request = new sql.Request(pool);
  if (Array.isArray(config.inputs)) {
    for (const input of config.inputs) {
      request.input(input.name, input.value);
    }
  }

  if (Array.isArray(config.outputs)) {
    for (const output of config.outputs) {
      request.output(output.name, output.value);
    }
  }

  if (config.type === "QUERY") {
    response = await request.query(config.query);
  } else if (config.type === "PROCEDURE") {
    response = await request.execute(config.query);
  } else {
    throw new Error(
      "config.type must not be either set to 'QUERY' or 'PROCEDURE'"
    );
  }

  return response;
};

module.exports = {
  connectDB,
  queryType,
};
