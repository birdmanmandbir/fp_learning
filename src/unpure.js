// 不纯的
var signUp = function(Db, Email, attrs) {
    return function() {
        var user = saveUser(Db, attrs);
        welcomeUser(Email, user);
    }
  };
  
  var saveUser = function(Db, attrs) {
      var user = Db.save(attrs);
  };
  
  var welcomeUser = function(Email, user) {
      Email(user, ...);
  };