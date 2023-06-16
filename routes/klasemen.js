var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){
	var pesertaQuery = "SELECT * FROM peserta_grup ORDER BY Grup ASC";
  	var jadwalQuery = "SELECT * FROM jadwal_pertandingan ORDER BY Fase DESC";

	database.query(pesertaQuery, function(error, data) {
		if (error) {
		  return console.log('error: ' + error.message);
		}
		database.query(jadwalQuery, function(error, dataJadwal) {
		  if (error) {
			return console.log('error: ' + error.message);
		  }
		  response.render('klasemen', {
			title:'Node.js MySQL CRUD Application', 
			action:'list',
			pesertagrup_data: data,
			jadwal_data: dataJadwal
		  });
		});
	  });
});


router.get("/add_peserta_grup", function(request, response, next){
	var selectPeserta = 'SELECT p.Fullname AS Fullname FROM peserta p LEFT JOIN peserta_grup g ON p.Fullname=g.Fullname WHERE g.Fullname IS NULL'
	database.query(selectPeserta,
		function(error, data){
			response.render("klasemen", {title:'Insert Data into MySQL', action:'add', fullname_data : data, errorMessage : request.query.error, successMessage : request.query.success});
		});
});

router.get("/atur_jadwal", function(request, response, next){
	
	var pesertaGrup = 'SELECT * FROM peserta_grup ORDER BY Grup ASC, Fullname'
	database.query(pesertaGrup,
		function(error, data){
			response.render("klasemen", {title:'Insert Data into MySQL', action:'aturJadwal', pesertagrup_data : data, errorMessage : request.query.error, successMessage : request.query.success});
		});
});

router.get("/atur_jadwal/GrupA", function(request, response, next){
	
	var pesertaGrup = 'SELECT * FROM peserta_grup ORDER BY Grup ASC, Fullname'
	database.query(pesertaGrup,
		function(error, data){
			response.render("klasemen", {title:'Insert Data into MySQL', action:'aturJadwalGrupA', pesertagrup_data : data, errorMessage : request.query.error, successMessage : request.query.success});
		});

});

router.get("/atur_jadwal/GrupB", function(request, response, next){
	
	var pesertaGrup = 'SELECT * FROM peserta_grup ORDER BY Grup ASC, Fullname'
	database.query(pesertaGrup,
		function(error, data){
			response.render("klasemen", {title:'Insert Data into MySQL', action:'aturJadwalGrupB', pesertagrup_data : data, errorMessage : request.query.error, successMessage : request.query.success});
		});

});

router.get("/atur_jadwal/GrupC", function(request, response, next){
	
	var pesertaGrup = 'SELECT * FROM peserta_grup ORDER BY Grup ASC, Fullname'
	database.query(pesertaGrup,
		function(error, data){
			response.render("klasemen", {title:'Insert Data into MySQL', action:'aturJadwalGrupC', pesertagrup_data : data, errorMessage : request.query.error, successMessage : request.query.success});
		});

});

router.get("/atur_jadwal/GrupD", function(request, response, next){
	
	var pesertaGrup = 'SELECT * FROM peserta_grup ORDER BY Grup ASC, Fullname'
	database.query(pesertaGrup,
		function(error, data){
			response.render("klasemen", {title:'Insert Data into MySQL', action:'aturJadwalGrupD', pesertagrup_data : data, errorMessage : request.query.error, successMessage : request.query.success});
		});

});

router.get("/atur_jadwal/Playoff", function(request, response, next){
	
	var pesertaGrup = 'SELECT * FROM peserta_grup ORDER BY Grup ASC, Fullname'
	database.query(pesertaGrup,
		function(error, data){
			response.render("klasemen", {title:'Insert Data into MySQL', action:'aturJadwalPlayoff', pesertagrup_data : data, errorMessage : request.query.error, successMessage : request.query.success});
		});

});


module.exports = router;