const oracledb = require("oracledb");

// hr schema password

var password = "system";
var connection;
// checkConnection asycn function

async function checkConnection() {
  try {
    connection = await oracledb.getConnection({
      user: "system",

      password: password,

      connectString: "localhost:1521",
    });

    console.log("connected to database");

    /******************************************************* */

    //Reference: https://www.w3schools.com/sql/
    //Play with these three methods (Implemented below, you can make changes)

    //Uncomment them and see the outputs by opening a terminal where this files are located and put the command:
    // node dbConnection.js

    //Will create a table
    // createTable();

    //Will insert data into the table
    //insertIntoTable();

    //Will show the data inside the table
    // selectAll();

    //Will delete the table
    //dropTable();

    /******************************************************* */

    //Will submit an persistently save every change made
    connection.commit();
  } catch (err) {
    //Connection error
    console.error(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections with the DB

        await connection.close();

        console.log("close connection success");
      } catch (err) {
        console.error(err.message);
      }
    }
  }
}

async function createTable() {
  try {
    let result = await connection.execute(`
    CREATE TABLE  employees(
        id int NOT NULL, 
        first_name VARCHAR(45) NOT NULL,
        last_name VARCHAR(45) NOT NULL,
        PRIMARY KEY(id)
        )`);
    console.log("Tabla creada correctamente.");
  } catch (err) {
    //ORA-00955: este nombre ya lo está utilizando otro objeto existente
    //Will appear if the table already exists
    console.error(err.message);
  }
}

async function insertIntoTable() {
  try {
    let result = await connection.execute(`
        INSERT INTO EMPLOYEES (id, first_name, last_name) VALUES (
            505, 
            'Francisco',
            'Arguedas'
            )`);
    //Will save the changes

    console.log("Datos añadidos a la tabla correctamente.");
  } catch (err) {
    //ORA-00001: restricción única (SYSTEM.SYS_C008586) violada
    //Will appear if the ID of the inserted data is already in the table (PRIMARY KEY)
    console.error(err.message);
  }
}

async function selectAll() {
  try {
    result = await connection.execute(`SELECT * FROM EMPLOYEES`);
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
}

async function dropTable() {
  try {
    result = await connection.execute(`DROP TABLE EMPLOYEES`);
    console.log("Tabla eliminada correctamente.");
  } catch (err) {
    console.error("La tabla no existe.");
  }
}

checkConnection();
