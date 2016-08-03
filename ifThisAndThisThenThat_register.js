var MongoClient = require('mongodb').MongoClient;

var MongoDB = "";
var collectionName = 'iftattt_ids';

var CreateNewEntry = function(entryId, thatValue, done) {
	if(thatValue == null){
		done(null, 'urlThat not valid');
	}
	var doc = {
		id : entryId,
		ifThis : false,
		andThis : false,
		urlThat : thatValue,
	};
	
	MongoClient.connect(MongoDB, function (err, db) {
		if(err) return done(null, err);
		db
			.collection(collectionName)
			.insertOne(doc, null, function (err, result){
				if(err) return done(null, err);
				var myDoneString = 	'Operation result: ' + result.insertedCount +
									' ops: ' + result.ops +
									' insertedId:' + result.insertedId +
									' result: ' + result.result;
				return done(null, myDoneString);
			});
	});
	
	return done(null, 'Successful register. Your iftattt id:' + entryId + ' Your THAT url:' + thatValue);
}


module.exports = function (ctx, done) {
	MongoDB = ctx.data.MONGO_URL;
	MongoClient.connect(MongoDB, function (err, db) {
		if(err) return done(null, err);
		db
			.collection(collectionName)
			.find()
			.toArray((err, ids) => {
				if(err) return done(null, 'db error');
				
				var availableId = 0;
				var myVar = ids.pop();
				if(myVar){
					if(myVar.id){
						availableId = myVar.id;
					}
				}
				return CreateNewEntry(availableId + 1, ctx.data.urlThat, done);
			});
	});
}




