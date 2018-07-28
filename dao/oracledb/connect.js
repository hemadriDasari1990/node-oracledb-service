let path = require('path');
process.env['PATH'] = path.join(__dirname, '/instantclient') + ';' + process.env['PATH'];
let oracledb = require('oracledb');

let connection = oracledb.getConnection(
  {
    user          : config.user,
    password      : config.password,
    connectString : `${config.host}/${config.db}`
  },
  function(err, connection) {
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