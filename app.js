var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var database = require('./database');
const methodOverride = require('method-override');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var klasemendataRouter = require('./routes/klasemen');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/klasemen', klasemendataRouter);

app.post("/tambah_peserta", function(request, response, next){

	var Grup = request.body.Grup;
	var Fullname = request.body.Fullname;

	var jumlah_peserta_query = `SELECT * FROM peserta_grup WHERE Grup="${Grup}"`;
	database.query(jumlah_peserta_query, function(error,jumlah_peserta) {
		
		if(error){
			throw error;
		}
		else 
		{
			if(jumlah_peserta.length > 3) {
				console.log(jumlah_peserta.length);
				response.redirect("/klasemen/add_peserta_grup?error=Penuh!");
				
			}
			else {
				var tambah_peserta_query = `INSERT INTO peserta_grup (Grup, Fullname) VALUES ("${Grup}", "${Fullname}")`;
				database.query(tambah_peserta_query, function(error, _){
					if(error)
					{
						throw error;
					}	
					else
					{
						response.redirect("/klasemen/add_peserta_grup?success=Berhasil!");
					}
				});
			}
		}
	})
});

app.post("/tambah_jadwal", function(request, response, next){

	var id = request.body.id;
	var fase = request.body.fase;
	var meja = request.body.meja;
	var jam = request.body.jam;
	var peserta1 = request.body.peserta1;
	var peserta2 = request.body.peserta2;

	var validasiRow = `SELECT * FROM jadwal_pertandingan WHERE peserta1="${peserta1}" AND peserta2="${peserta2}"`;
	database.query(validasiRow, function(error,validasi) {

		if(error){
			throw error;
		}
		else 
		{
			if(validasi.length > 0) {
				console.log(validasi.length);
				response.redirect(`/klasemen/atur_jadwal/${fase}?error=row${id}_Terjadwal!`);
			}
			else {
				var tambah_jadwal_query = `INSERT INTO jadwal_pertandingan (ID_Jadwal, Fase, Meja, Jam, Peserta1, Skor_Peserta1, Peserta2, Skor_Peserta2) VALUES (NULL, "${fase}", "${meja}", "${jam}", "${peserta1}", NULL, "${peserta2}", NULL);`;
				database.query(tambah_jadwal_query, function(error, _){
					if(error)
					{
						throw error;
					}	
					else
					{
						response.redirect(`/klasemen/atur_jadwal/${fase}?success=row${id}_Berhasil!`);
					}
				});
			}
		}
	})
});



	
// });

app.post('/delete_pesertaGrup', (req, res) => {
	//
	});

app.delete('/delete_pesertaGrup/:ID_PesertaGrup', function(request, response, next){

	var id = request.params.ID_PesertaGrup;
	console.log(id);

	var query = `DELETE FROM jadwal_pertandingan WHERE Peserta1 = ( SELECT Fullname FROM peserta_grup WHERE ID_PesertaGrup = ${id}) OR Peserta2 = ( SELECT Fullname FROM peserta_grup WHERE ID_PesertaGrup = ${id})`;
	console.log(query)

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			var query2 = `DELETE FROM peserta_grup WHERE ID_PesertaGrup = ${id}`;
			database.query(query2, function(error, data){
				if(error)
				{
					throw error;
				}
				else
				{
				response.redirect("/klasemen");
				}
			});
		}
	});
});

app.post('/delete_jadwal', (req, res) => {
	//
	});

app.delete('/delete_jadwal/:ID_Jadwal', function(request, response, next){

	var del = request.body.tabeljadwal
	var id = request.params.ID_Jadwal;

	var query = `DELETE FROM jadwal_pertandingan WHERE ID_Jadwal = ${id}`;
	console.log(query)

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}
		else
		{
			response.redirect(`/klasemen#${del}`);
		}

	});

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
