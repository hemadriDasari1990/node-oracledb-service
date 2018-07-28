let path = require('path');
process.env['PATH'] = path.join(__dirname, '/instantclient') + ';' + process.env['PATH'];
let oracledb = require('oracledb');

let connection = oracledb.getConnection(
  {
    user          : config.dbConfig.user,
    password      : config.dbConfig.password,
    connectString : `${config.dbConfig.host}/${config.dbConfig.db}`
  }, (err, connection) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log('Connection was successful!');
    return connection;
  });

function doRelease(connection) {
  connection.close(
    function(err) {
      if (err)
        console.error(err.message);
    });
}

module.exports = {
  connection: connection,
  doRelease: doRelease
}