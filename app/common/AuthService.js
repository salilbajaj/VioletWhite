var buffer = require('buffer')
var AsyncStorage = require('react-native').AsyncStorage;
var _ = require('lodash');
const authKey = 'auth';
const userKey = 'user';
class AuthService {
    //var salil = 'test';
    getAuthInfo(cb) {
        AsyncStorage.multiGet([authKey, userKey], (err, val) => {
            if (err) {
                cb(err)
            }
            if(!val) {   
                return cb();
            }

            var zippedObj = _.zipObject(val);
            
            var authVal=val[0];
            var userVal=val[1]
            
            if (!authVal) {
                return cb();
            }
            var authInfo = {
                header: {
                    Authorization: 'Basic ' + authVal[1]
                },
                user: JSON.parse(userVal[1])
            }
        
            
            return cb(null, authInfo)
        })
    }
    logout(cb){
        AsyncStorage.multiRemove([
                    authKey,userKey
                ], (err) => {
                   //console.log(err)
                    if (err) {
                    //console.log(err)
                    }
                    return cb({success:true});
                })
    }
    
    login(creds, cb) {
        var b = new buffer.Buffer(creds.username + ':' + creds.password);
        var encodedLogin = b.toString('base64');
       
        fetch('https://www.qdesq.com/api/local/signinapp', {
               method:'POST',
               headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
               body:JSON.stringify({
                email:creds.username,
                password:creds.password
               })    
            })
            .then((response) => {
                // console.log(response);
                if (response.status >= 200 && response.status < 300) {
                    return response
                }
                throw {
                    badCredentials: response.status == 401,
                    unknownError: response.status != 401
                }
            })
            .then((response) => {
                // console.log(response);
                return response.json();
            })
            .then((result) => {
                // console.log(result);
                if(result.status==true){
                AsyncStorage.multiSet([
                    [authKey, encodedLogin],
                    [userKey, JSON.stringify(result.user)]
                ], (err) => {
                    if (err) {
                        throw err
                    }
                    return cb({success:true });
                })
            }
            else if(result.status==false){
                return cb(message:result.message)
            }

            })
            .catch((err) => {
                // console.log(err)
                return cb(err)
            });
            
    }
}

// function AuthService(){
//   // console.log('hey');
// }

module.exports = new AuthService();
