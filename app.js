var ladata = require('./la_localauthorities');
var lldata = require('./la_landlords');

var path = require('path');
var express = require('express');
var app = express();
var pg = require('pg');

app.set('view engine', 'pug')

app.get('/', function(req, res) {
    res.render('index', { title: req.query['xx'], message: 'Hello there!' })
})

app.get('/pcode', function(req, res) {
    console.log("xx: " + req.query['xx']);
    res.render('pcode', { title: req.query['xx'], message: 'Hello there!' })
})


var dir = path.join(__dirname, 'public');
app.use(express.static(dir));


app.listen(process.env.PORT || 5000, function() {
    console.log('Example app listening on port ' + process.env.PORT);
});

/*
pg.defaults.ssl = true;
connstr = "pg://gdo:nacyec83@localhost:5432/soclords";
pg.connect(process.env.DATABASE_URL || connstr, function(err, client) {
    if (err) throw err;
    console.log('Connected to postgres! Getting schemas...');

    client.query("drop table landlords;");
    client.query("create table landlords (PKID serial primary key, ID bigint, LANDLORD varchar(80), RP_CODE varchar(20), REGADDR1 varchar(80), REGADDR2 varchar(80), REGADDR3 varchar(80), " +
        "REGADDR4 varchar(80), REGADDR5 varchar(80), REGPOSTCODE varchar(20), REGPHONE varchar(20), DESIGNATION varchar(80), REGDATE varchar(20), " +
        "LEGALENTITY varchar(80), COUNTRY varchar(30), UCLSEMAIL varchar(80), UCFSEMAIL varchar(80), FIRSTCONTACTEMAIL varchar(80))");

    //client.query("drop table localauthorities;");
    client.query("create table localauthorities (PKID serial primary key, ID bigint, TA VARCHAR(20), " +
        "POSSPRPNAME VARCHAr(80), REGPRPNAME  VARCHAr(80), REGPRPNUM VARCHAr(20), LOCALAUTHORITY VARCHAR(80),TOTALSTOCK BIGINT);");

    ladata.map(function(x) {

        var s = "INSERT INTO localauthorities (ID, TA, POSSPRPNAME, REGPRPNAME, REGPRPNUM, LOCALAUTHORITY, TOTALSTOCK) VALUES ($1,$2,$3,$4,$5,$6,$7); "

        client.query(s, [x.ID, x.TA, x.PossiblePRPName, x.RegisterPRPName, x["PRPregistration number"], x.LocalAuthority, x.TotalHousingStock]);

    });

    console.log("Done LA");

    lldata.map(function(x) {

        var s = "INSERT INTO landlords (ID, LANDLORD, RP_CODE, REGADDR1, REGADDR2 , REGADDR3, REGADDR4, REGADDR5, REGPOSTCODE, REGPHONE, " +
            "DESIGNATION, REGDATE, LEGALENTITY, COUNTRY, UCLSEMAIL, UCFSEMAIL, FIRSTCONTACTEMAIL) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17); "

        client.query(s, [x["ID"], x["Landlord"], x["RP Code"], x["Reg Addr Line 1"], x["Reg Addr Line 2"],
            x["Reg Addr Line 3"], x["Reg Addr Line 4"], x["Reg Addr Line 5"], x["Reg Addr Postcode"],
            x["Reg Addr Phone"], x["Designation"], x["Registration Date"], x["Legal Entity"],
            x["Country"], x["UCLSEmail"], x["UCFSEmail"], x["1st Contact email"]
        ]);

    });

    console.log("Done Landlords");

    client
        .query('SELECT * from landlords;')
        .on('row', function(row) {
            console.log(JSON.stringify(row));
        })
});;*/
/*
create table landlords (PKID serial primary key, ID bigint, LANDLORD varchar(40), RP_CODE varchar(10), REGADDR1 varchar(80), REGADDR2 varchar(80), REGADDR3 varchar(80), 
REGADDR4 varchar(80), REGADDR5 varchar(80), REGPOSTCODE varchar(10), REGPHONE varchar(15), DESIGNATION varchar(15), REGDATE varchar(10), 
LEGALENTITY varchar(80), COUNTRY varchar(15), UCLSEMAIL varchar(30), UCFSEMAIL varchar(30), FIRSTCONTACTEMAIL varchar(30));

create table localauthorities (PKID serial primary key, ID bigint, TA VARCHAR(10), 
"POSSPRPNAME VARCHAT(80), REGPRPNAME  VARCHAT(80), REGPRPNUM VARCHAT(10), LOCALAUTHORITY VARCHAR(80),TOTALSTOCK, BIGINT);

LANDLORD varchar(40), RP_CODE varchar(10), REGADDR1 varchar(80), REGADDR2 varchar(80), 
REGADDR3 varchar(80), REGADDR4 varchar(80), REGADDR5 varchar(80), REGPOSTCODE varchar(10), REGPHONE varchar(15), DESIGNATION varchar(15), REGDATE varchar(10), 
LEGALENTITY varchar(80), COUNTRY varchar(15), UCLSEMAIL varchar(30), UCFSEMAIL varchar(30), FIRSTCONTACTEMAIL varchar(30));

*/