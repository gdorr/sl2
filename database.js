"use strict";

var la_localAuthorities = require('./la_localauthorities');
var la_landlords = require('./la_landlords');


function countStock() {
    la_landlords.map(function(l) {
        var total = 0;
        for (var i = 0; i < la_localAuthorities.length; i++) {

            var rp = l["RP Code"];
            var la = la_localAuthorities[i]["PRPregistration number"];
            if (l["RP Code"] === la_localAuthorities[i]["PRPregistration number"]) {
                total += parseInt(la_localAuthorities[i]["TotalHousingStock"]);
            }
        }
        l.TotalStock = total;
        if (l.UCLSEmail === "No email gathered") {
            l.noEmail = true;
        } else {
            l.noEmail = false;
        };
    });
}

function displayLandlord(landlordname) {
    var s = "";
    var x = landlordname;
    $("#landlorddetails").empty();
    la_landlords.map(function(x) {
        if (x.Landlord == landlordname) {
            s = s + '<div class="panel panel-default">';
            s = s + '<div class="panel-heading"><h3>Landlord details</h3>';
            s = s + '<div class="panel-body">';
            s = s + '<a href="https://www.google.co.uk/?q=' + x["Landlord"] + '">' + x["Landlord"] + '</a>';
            s = s + x["Reg Addr Line 1"] + "<br />" + x["Reg Addr Line 2"] + "<br />" + x["Reg Addr Line 3"] + "<br />" + x["Reg Addr Line 4"] + "<br />" + x["Reg Addr Line 5"] + "<br />" + x["Reg Addr Postcode"] + "<br />";
            s = s + "Phone: " + x["Reg Addr Phone"];
            s = s + "Designation: " + x["Designation"];
            s = s + "Reg date: " + x["Registration Date"];
            s = s + "Legal entity: " + x["Legal Entity"];
            s = s + "Country: " + x["Country"];
            s = s + "UCLSEmail: " + x["UCLSEmail"];
            s = s + "UCFSEmail: " + x["UCFSEmail"];
            s = s + "First contact email: " + x["1st Contact email"];
            s = s + "</div></div></div>";
            $("#landlorddetails").append(s);

        };
    });
}

function ii(pcode) {
    var landlords = [];
    for (var x = 0; x < la_postcodes.length; x++) {
        if (la_postcodes[x].Postcode === pcode) {
            for (var y = 0; y < la_localAuthorities.length; y++) {
                if (la_postcodes[x].LA === la_localAuthorities[y].LocalAuthority) {
                    for (var z = 0; z < la_landlords.length; z++) {
                        if (la_landlords[z]["RP Code"] === la_localAuthorities[y]["PRPregistration number"]) {
                            landlords.push(la_landlords[z]);
                        }
                    }
                }
            }
        }
    };

    populateLandlordTable(landlords);
}

function jj(constituency) {
    var landlords = [];
    for (var y = 0; y < la_localAuthorities.length; y++) {
        if (constituency === la_localAuthorities[y].LocalAuthority.toUpperCase()) {
            for (var z = 0; z < la_landlords.length; z++) {
                if (la_landlords[z]["RP Code"] === la_localAuthorities[y]["PRPregistration number"]) {
                    landlords.push(la_landlords[z]);
                }
            }
        }
    };

    populateLandlordTable(landlords);
}


function populateLAtable() {

    la_localAuthorities.sort(function(a, b) {
        return a.LocalAuthority.localeCompare(b.LocalAuthority);
    });

    $("#latable").empty();
    var s = '';

    s = Handlebars.compile('{{#each llas}} <tr><td>{{LocalAuthority}}</td></tr>{{/each}}');

    var p = s({ llas: la_localAuthorities });
    $("#latable").append(p);

};


function populateLandlordTable(lltab) {

    lltab.sort(function(a, b) {
        if (a.TotalStock < b.TotalStock)
            return 1;
        if (a.TotalStock > b.TotalStock)
            return -1;
        return 0;
    });

    $("#landlordlist").empty();
    var s = '';

    s = Handlebars.compile('{{#each llords}} {{#if noEmail}} <div class="panel panel-primary"> {{else}} <div class="panel panel-danger"> {{/if}}' +
        '<div class="panel-heading"> <h4 class="panel-title"><a data-toggle="collapse" data-parent="#landlordlist" href="#lllist{{ID}}">{{Landlord}} <span class="badge">{{TotalStock}}</span></a></h4>' +
        '</div> <div id="lllist{{ID}}" class="panel-collapse collapse"><div class="panel-body">' +
        '<form><formset id="fs{{ID}}"><legend for="fs{{ID}}">Contact details</legend>{{"Reg Addr Line 1"}}<br />{{"Reg Addr Line 2"}}<br />{{"Reg Addr Line 3"}}<br />{{"Reg Addr Line 4"}}<br />' +
        '{{"Reg Addr Line 5"}}<br />{{"Reg Addr Postcode"}}<br /></formset></form>' +
        '</div></div></div>{{/each}}');

    var p = s({ llords: lltab });
    $("#landlordlist").append(p);

};

function landlordmatch(llord) {
    var landlords = [];
    for (var i = 0; i < la_landlords.length; i++) {

        if (la_landlords[i].Landlord.toUpperCase().indexOf(llord) !== -1) {
            landlords.push(la_landlords[i]);
        };
    };
    populateLandlordTable(landlords);
}

function getDistrictCouncil(postcode) {

}

function findName(jsoncache) {
    for (let i in jsoncache.areas) {
        if (jsoncache.areas[i].type === 'WMC') {
            return jsoncache.areas[i].name;
        };
    };
    return "";
}

function yy() {

    //var jsoncache= {};//{"wgs84_lat": 53.74319770106918, "coordsyst": "G", "shortcuts": {"WMC": 65899, "ward": {"county": 16196, "district": 5505}, "council": {"county": 2230, "district": 2370}}, "wgs84_lon": -2.3872016532048446, "postcode": "BB5 3AE", "easting": 374561, "areas": {"900000": {"parent_area": null, "generation_high": 19, "all_names": {}, "id": 900000, "codes": {}, "name": "House of Commons", "country": "", "type_name": "UK Parliament", "generation_low": 1, "country_name": "-", "type": "WMP"}, "5505": {"parent_area": 2370, "generation_high": 30, "all_names": {}, "id": 5505, "codes": {"ons": "30UGGB", "gss": "E05005213", "unit_id": "4650"}, "name": "Immanuel", "country": "E", "type_name": "District council ward", "generation_low": 1, "country_name": "England", "type": "DIW"}, "2370": {"parent_area": null, "generation_high": 30, "all_names": {}, "id": 2370, "codes": {"ons": "30UG", "gss": "E07000120", "unit_id": "4627", "local-authority-eng": "HYN"}, "name": "Hyndburn Borough Council", "country": "E", "type_name": "District council", "generation_low": 1, "country_name": "England", "type": "DIS"}, "16196": {"parent_area": 2230, "generation_high": 30, "all_names": {}, "id": 16196, "codes": {"unit_id": "4630"}, "name": "Accrington West", "country": "E", "type_name": "County council electoral division", "generation_low": 3, "country_name": "England", "type": "CED"}, "125575": {"parent_area": null, "generation_high": 30, "all_names": {}, "id": 125575, "codes": {"ons": "E01025056"}, "name": "Hyndburn 009B", "country": "E", "type_name": "2001 Lower Layer Super Output Area (Generalised)", "generation_low": 13, "country_name": "England", "type": "OLG"}, "65899": {"parent_area": null, "generation_high": 30, "all_names": {}, "id": 65899, "codes": {"gss": "E14000758", "unit_id": "24781"}, "name": "Hyndburn", "country": "E", "type_name": "UK Parliament constituency", "generation_low": 13, "country_name": "England", "type": "WMC"}, "148781": {"parent_area": null, "generation_high": 30, "all_names": {}, "id": 148781, "codes": {"nhse": "01A"}, "name": "East Lancashire", "country": "E", "type_name": "Clinical Commissioning Group", "generation_low": 29, "country_name": "England", "type": "CCG"}, "900001": {"parent_area": null, "generation_high": 30, "all_names": {}, "id": 900001, "codes": {}, "name": "European Parliament", "country": "", "type_name": "European Parliament", "generation_low": 1, "country_name": "-", "type": "EUP"}, "46293": {"parent_area": null, "generation_high": 30, "all_names": {}, "id": 46293, "codes": {"ons": "E02005220"}, "name": "Hyndburn 009", "country": "E", "type_name": "2001 Middle Layer Super Output Area (Generalised)", "generation_low": 13, "country_name": "England", "type": "OMG"}, "2230": {"parent_area": null, "generation_high": 30, "all_names": {}, "id": 2230, "codes": {"ons": "30", "gss": "E10000017", "unit_id": "5156", "local-authority-eng": "LAN"}, "name": "Lancashire County Council", "country": "E", "type_name": "County council", "generation_low": 1, "country_name": "England", "type": "CTY"}, "39099": {"parent_area": null, "generation_high": 30, "all_names": {}, "id": 39099, "codes": {"ons": "E02005220"}, "name": "Hyndburn 009", "country": "E", "type_name": "2001 Middle Layer Super Output Area (Full)", "generation_low": 13, "country_name": "England", "type": "OMF"}, "91197": {"parent_area": null, "generation_high": 30, "all_names": {}, "id": 91197, "codes": {"ons": "E01025056"}, "name": "Hyndburn 009B", "country": "E", "type_name": "2001 Lower Layer Super Output Area (Full)", "generation_low": 13, "country_name": "England", "type": "OLF"}, "11807": {"parent_area": null, "generation_high": 30, "all_names": {}, "id": 11807, "codes": {"ons": "02", "gss": "E15000002", "unit_id": "41431"}, "name": "North West", "country": "E", "type_name": "European region", "generation_low": 1, "country_name": "England", "type": "EUR"}}, "northing": 427494};

    var pcode = $("#dataentry").val();
    $.getJSON("https://mapit.mysociety.org//postcode/" + pcode, "", function(data, status, xhr) {
        console.log(data);
        let x = findName(data);
        jj(x.toUpperCase());
    });

    return false;

    /*var x=$("#searchpostcode").attr("checked");
     if ($("#searchpostcode")[0].checked) {
     
     var pcode = $("#dataentry").val();
     ii(pcode.toUpperCase());
     $("#typerow").innerText = "Local authority";
     } else {
     var t = $("#dataentry").val();
     landlordmatch(t.toUpperCase());
     $("#typerow").innerText = "Landlord search";
     }*/

}

function pp() {

    countStock();
    populateLAtable();

    $("body").click(function(event) {

        if (event.target.className == "landlord_item") {
            displayLandlord(event.target.innerText);
        }

    });
}