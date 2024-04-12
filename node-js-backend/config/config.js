
let CONFIG = {};

CONFIG.app =  'ringcentral';
CONFIG.port =  '8080';

CONFIG.enable_https = true;

CONFIG.db_dialect =  'mysql';
CONFIG.db_host =  'localhost';
CONFIG.db_port =  '3306';
CONFIG.db_name =  'phone_service';
CONFIG.db_user =  'elunev';
CONFIG.db_password = 'elunev51';

CONFIG.jwt_encryption =  'secret';
CONFIG.jwt_expiration =  '10000';

module.exports = CONFIG;
