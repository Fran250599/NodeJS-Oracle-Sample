const oracledb = require("oracledb");

// hr schema password

var password = "system";

// checkConnection asycn function

async function checkConnection() {
  try {
    connection = await oracledb.getConnection({
      user: "system",

      password: password,

      connectString: "localhost:1521/xepdb1",
    });

    console.log("connected to database");

    /* result = await connection.execute(`
    CREATE TABLE EMPLOYEES(
        id int NOT NULL, 
        first_name VARCHAR(45) NOT NULL,
        last_name VARCHAR(45) NOT NULL,
        PRIMARY KEY(id)
        )`);*/

    var result = await connection.execute(`
        INSERT INTO EMPLOYEES (id, first_name, last_name) VALUES (
            505, 
            'Franciscooo123',
            'Arguedas'
            )`);

    connection.commit();

    result = await connection.execute(`SELECT * FROM EMPLOYEES`);
    console.log(result);

    //result = await connection.execute(`DROP TABLE EMPLOYEES`);
  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections

        await connection.close();

        console.log("close connection success");
      } catch (err) {
        console.error(err.message);
      }
    }
  }
}

checkConnection();
