var MongoClient = require('mongodb').MongoClient;
var test = require('assert');
var request = require('request');


var MongoDB = "";
var collectionName = 'iftattt_ids';
var RegisteredId = -1;
var Condition = "unknown";
var Enable = true;




var UpdateDatabase = function(db, cb){
	var doc = {
		id: RegisteredId
	};
	
	var newValue = "invalid";
	if(Condition == "this"){
		newValue = {
			$set:{
				ifThis: Enable
			}
		};
	}
	else if(Condition == "andThis"){
		newValue = {
			$set:{
				andThis: Enable
			}
		};
	}

	var opts      = {
		upsert: true
	};

	if(newValue != "invalid"){
		db
			.collection(collectionName)
			.updateOne(doc, newValue, opts, function (err) {
				if(!err)
					cb();
			});
	}
}





var CallThat = function(urlThat, done){
	request(urlThat, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			done(null, body);
		 }
		 else{
			done(null, "http error: " + response.statusCode);
		 }
	})
}




var ProcessOperation = function(document, db, done){
	test.equal(RegisteredId, document.id);
	var ifThis = document.ifThis;
	var andThis = document.andThis;
	if(Condition == "this"){
		ifThis = Enable;
	}
	else if(Condition == "andThis"){
		andThis = Enable;
	}
	
	UpdateDatabase(db, function(){
		if(ifThis == true && andThis == true){
			return CallThat(document.urlThat, done);
		}
		else{
			return done(null, "This = " + ifThis + "  andThis = " + andThis);
		}
	});
}




var CheckParameters = function(ctx){
	var paramsOk = true;
	
	if(ctx.data.MONGO_URL)
		MongoDB = ctx.data.MONGO_URL;
	else
		paramsOk = false;
	
	if(ctx.data.id)
		RegisteredId = Number(ctx.data.id);
	else
		paramsOk = false;
	
	if(ctx.data.enable)
		Enable = (ctx.data.enable == 1) ? true : false;
	else
		Enable = true; // default value is true if enable is not defined
		
	if(ctx.data.condition){
		if(ctx.data.condition == "this")
			Condition = "this";
		else if(ctx.data.condition == "andThis")
			Condition = "andThis";
		else
			paramsOk = false;
	}
	else{
		paramsOk = false;
	}
	
	return paramsOk;
}




module.exports = function (ctx, done) {
	if(CheckParameters(ctx) == false){
		done(null, "Invalid parameters.");
	}
	
	MongoClient.connect(MongoDB, function (err, db) {
		if(err) return done(null, err);
		var query = {
			id : RegisteredId
		};
		db
			.collection(collectionName)
			.find(query)
			.toArray((err, docs) => {
				if(err) return done(null, 'db error');
				if(docs.length == 1){
					return ProcessOperation(docs[0], db, done);
				}
				if(docs.length == 0)
					return done(null, 'Unexisting id.');
				else
					return done(null, 'Duplicated id.' + docs[0].id);
			});
	});
	
}










