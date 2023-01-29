import dream from 'dreamjs';
import fs from 'fs'
import { ObjectId } from 'bson';
import Chance from 'chance';
var chance = new Chance();


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const continents = ['Europe', 'Asia', 'Africa', 'North America', 'South America', 'Australia']
const transports = ['bus', 'plane', 'train', 'ship', 'car'];
const countries= ['Germany', 'France','Spain', 'Serbia', 'Greece','China', 'Japan','Turkey', 'Thailand', 'Philippines','Egypt', 'Morocco',
                  'Tunisia', 'Botswana', 'Ethiopia','Brasil', 'Colombia','Argentina', 'Chile', 'Peru','Mexico', 'Canada','Cuba', 'Costa Rica',
                   'Belize','Fiji', 'New Zealand','Papua New Guinea', 'Tonga', 'Solomon Islands'];
const cities=['Sydney', 'Melbourne','Wagga Wagga', 'Port Moresby', 'Honiara','Medan', 'Brunei','Geelong',
                   'London','Venice', 'Manila', 'Bangkok','Douala','Tokyo', 'Kragujevac','Beijing', 'Ankara', 'Peking','Kyoto',
                    'Seoul','Pyongyang', 'Canberra-Queanbeyan', 'Kathmandu', 'Shanghai','Hangzhou','Osaka','Nagoya','Istanbul', 'Berlin', 
                    'Madrid', 'Paris', 'Hamburg','Belgrade', 'Novi Sad','Nis', 'Cologne', 'Barcelona', 'Munich','Burnie','Cairns','Rome', 
                    'Vienna','Mexico City', 'Toronto','Havana', 'Montreal', 'Puebla','Guadalajara', 'Juarez','Carrefour', 'Quebec City',
                     'Apodaca', 'Durango','Cairo', 'Lagos','Giza', 'Luanda', 'Addis Ababa','Casablanca', 'Abuja','Lusaka', 'Rabat', 'Tangler',
                      'Fez','Ecatepec de Morelos','Cape Town','Leon','Buenos Aires', 'Rio de Janeiro','Santiago', 'Sao Paulo', 'Bogota', 
                      'Lima', 'Cartagena','Quito', 'Salvador', 'Brasilia', 'Fortareza','Guayaquil','Colmar', 'Belo Horizonte'];
const rooms = ['1/1', '1/2', '1/3', '1/2 + 1', '1/3 + 1', '1/4']
const pictures = ["http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745699/upload/rxu6wkce7wjbaiblibwu.jpg", 
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745699/upload/xsopgacbnupacrfmigmi.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745699/upload/fgwke8usf2m1gli0ao29.jpg", 
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745699/upload/wrplmcpsvxotmdqquhxi.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745699/upload/pfh7qzivhse3udvv12lu.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745698/upload/rlth9jlxjym1dqhbyvyi.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745833/upload/xyx2hk9un3jpgneyiwju.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745834/upload/dfxzynzarx7aghza4b7m.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745834/upload/csf8mr7hezglj6imvako.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745834/upload/nimebz26xx2afykz14cm.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745835/upload/t6sfhaqnkxlj6h6ksyq1.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745836/upload/xxemxphpg4cfuestzudy.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745889/upload/js2ov7bhg5hpa1jxktow.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745889/upload/bkks1ecdrnb5zgdcgqxc.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745890/upload/vhrxngoh2phai2lhzoih.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745890/upload/kf9pmfi2odmpkb9bzamn.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745890/upload/oqzx5nnij4rtocstafdh.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745892/upload/cj87od5pmxvt6vxnqror.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745940/upload/ownbosvxu1mwstfww05u.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745941/upload/nwfr9arbhm9iqbkv1hfa.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745941/upload/t0lpcpjaeua0qggvftxp.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745941/upload/qvhqguudkqdwjohwbogk.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745942/upload/seooofvyg76aikhpizve.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745943/upload/hcgqwfy7ambyiquaj3ax.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745998/upload/ejkap8oczujqlpaserdq.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745998/upload/vekdogip1jaunwynbbzn.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745998/upload/f6hlmdfaxmgt3enhcy8u.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745998/upload/wsupvnmmzbzhfwwxbffh.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745998/upload/v2psqymiaeqslny0ulhj.jpg",
      "http://res.cloudinary.com/dnwggl9ra/image/upload/v1674745999/upload/numt28yju3uyzeve5zcv.jpg"];
const accommodations = ['hotel', 'resort', 'apartment', 'bungalow', 'cabin', 'villa'];

  dream.customType('city', function() {
    var city = cities[Math.floor(Math.random()*cities.length)];
    return city; 
  })

  dream.customType('month', function() {
    var month = months[Math.floor(Math.random()*months.length)];
    return month; 
  })

  dream.customType('continent', function() {
    var continent = continents[Math.floor(Math.random()*continents.length)];
    return continent; 
  })

  dream.customType('country', function() {
    var country = countries[Math.floor(Math.random()*countries.length)];
    return country; 
  })

  dream.customType('price', function() {
    var min = 100;
    var max = 3000;
    var price = Math.floor(Math.random() * (max - min + 1)) + min;
    return price;
  })

  dream.customType('transportType', function() {
    var transport = transports[Math.floor(Math.random()*transports.length)];
    return transport;
  })

  // dream.customType('_id', function() {
  //   const id = new ObjectId();
  //   return id.toString();
  // })

  dream.customType('FiveWordsSentence', function (helper) {
    return helper.chance.sentence({words: 5});
  });

  // dream.customType('startDate', function() {
  //   const date = chance.date({year: 2023});
  //   return date;
  // })

  // dream.customType('endDate', function() {
  //   const date = chance.date({year: 2024});
  //   Date
  //   return date;
  // })

  dream.customType('roomType', function() {
    var room = rooms[Math.floor(Math.random()*rooms.length)];
    return room;
  })

  dream.customType('accommodation', function() {
    var accommodation = accommodations[Math.floor(Math.random()*accommodations.length)];
    return accommodation;
  })

  dream.customType('accomodationType', function() {
    const accs = ['1', '2', '3', '4', '5'];
    var acc = accs[Math.floor(Math.random()*accs.length)];
    return acc;
  })

  dream.customType('internet', function() {
    const internet = chance.bool();
    return internet;
  })

  dream.customType('tv', function() {
    const tv = chance.bool();
    return tv;
  })

  dream.customType('airConditioning', function() {
    const ac = chance.bool();
    return ac;
  })

  dream.customType('roomFridge', function() {
    const rf = chance.bool();
    return rf;
  })

  let rBroj = 0
  let trajanje = 0
  
  dream.customType('location', function() {
    rBroj = Array(Math.floor(Math.random() * (4 - 1 + 1)) + 1);
    //const locations = Array(Math.floor(Math.random() * (5 - 1 + 1)) + 1);
    let duzina = [...rBroj]
    for (var i=0; i<rBroj.length;i++) {
      duzina[i] = cities[Math.floor(Math.random()*cities.length)]
    }
    return duzina;
  })

  dream.customType('daysPerLocation', function() {
    trajanje = 0
    let duzina2 = [...rBroj];
    for (var i=0; i<rBroj.length;i++) {
      duzina2[i] = Math.floor(Math.random() * (4 - 1 + 1)) + 1
      trajanje += duzina2[i]
    }
    return duzina2;
  })

  dream.customType('imgPerLocation', function() {
    let duzina4 = [...rBroj]
    for (var i =0; i < rBroj.length; i++) {
      duzina4[i] = pictures[Math.floor(Math.random()*pictures.length)]
    }
    return duzina4
  })

  dream.customType('descPerDay', function(helper) {
    let duzina3 = [...rBroj];
    const peron = ['perona', 'aerodroma'];
    for (var i=0; i<trajanje; i++) {
      if (i === 0) {
        duzina3[i] = "Polazak sa " + peron[Math.floor(Math.random()*peron.length)] + " u " + chance.hour({twentyfour: true}) + ":" + chance.minute() + ". "
      }
      else {duzina3[i] = ""}
      let duzinaReci = Math.floor(Math.random() * (40 - 10 + 1)) + 10
      duzina3[i] += helper.chance.sentence({words: duzinaReci});
      const casovi = ['jutarnjim', 'prepodnevnim', 'popodnevnim', 'večernjim']
      if (i === trajanje-1) {
        duzina3[i] += " Dolazak u " + cities[Math.floor(Math.random()*cities.length)] + " u " + casovi[Math.floor(Math.random()*casovi.length)] + " časovima."
      }
      else {duzina3[i] += ""}
      
    }
    return duzina3;   
  })

  let rnd="";
  const startDate=new Date('2023-01-01T12:54:37.090Z');
  const endDate= new Date('2023-12-31T12:50:37.090Z');
  let start=new Date('2023-01-02T12:54:37.090Z');
  let random= 0;

  const generateRandom = string => {
      random= getRandomDate(startDate, endDate);
      rnd= random.toISOString();
      return rnd;
  }
  function getRandomDate(from, to) {
      let fromTime= from.getTime();
      let toTime= to.getTime();
      return new Date(fromTime+ Math.random()* (toTime-fromTime));
  }
  dream.customType('start', () => {
    generateRandom();
    start = rnd;
    return start;
  })
  dream.customType('end', function() {
    const newend=getRandomDate(random, endDate);
    rnd= newend.toISOString();
    const end = rnd;

    return end;
  })

  let rnd2="";
  const startDate2 = new Date('2022-01-01T12:54:37.090Z');
  const endDate2 = new Date('2022-12-31T12:50:37.090Z');
  let start2 = new Date('2022-01-02T12:54:37.090Z');
  let random2 = 0;

  const generateRandom2 = string => {
      random2 = getRandomDate2(startDate2, endDate2);
      rnd2 = random2.toISOString();
      return rnd2;
  }
  function getRandomDate2(from, to) {
      let fromTime= from.getTime();
      let toTime= to.getTime();
      return new Date(fromTime+ Math.random()* (toTime-fromTime));
  }
  dream.customType('start2', () => {
    generateRandom2();
    start2 = new Date(rnd2);
    return start2.getTime();
  })
  dream.customType('end2', function() {
    const newend=getRandomDate2(random2, endDate2);
    rnd2 = newend.toISOString();
    const end = new Date(rnd2);

    return end.getTime();
  })

  dream.customType('name', function() {
    var city = cities[Math.floor(Math.random()*cities.length)];
    var month = months[Math.floor(Math.random()*months.length)];
    var year = 2023
    var name = city + " " + month + " " + year
    return name
  })


  let fajl = ""
  // let fajl2 = ""
  
  // dream
  //   .schema({
  //     _id: '_id',
  //     name: 'name',
  //     price: 'price',
  //     description: 'FiveWordsSentence',
  //     transportType: 'transportType',
  //     continent: 'continent',
  //     country: 'country',
  //     startDate: 'start',
  //     endDate: 'end',
  //     location: 'location',
  //     daysPerLocation: 'daysPerLocation',
  //     imgPerLocation: 'imgPerLocation',
  //     descPerDay: 'descPerDay',
  //     roomType: 'roomType',
  //     accommodationType: 'accomodationType',
  //     internet: 'internet',
  //     tv: 'tv',
  //     airConditioning: 'airConditioning',
  //     roomFridge: 'roomFridge',
      
  //   })
  //   .generateRnd(50000)
  //   .output(function (err, result) {
  //     //console.log(typeof(result));
  //     //console.log(result)
  //     //const linija = toString(result[0]);
  //     fajl1 = JSON.stringify(result);
  //     //console.log(typeof(fajl));
  //     // fs.writeFile("test.json", fajl, function(err) {
  //     //   if (err) {
  //     //       console.log(err);
  //     //   }
  //     // });
  //   });

  dream
    .schema({
      name: 'name',
      price: 'price',
      description: 'FiveWordsSentence',
      transportType: 'transportType',
      accommodation: 'accommodation',
      continent: 'continent',
      country: 'country',
      startDate: 'start2',
      endDate: 'end2',
      location: 'location',
      daysPerLocation: 'daysPerLocation',
      imgPerLocation: 'imgPerLocation',
      descPerDay: 'descPerDay',
      roomType: 'roomType',
      accommodationType: 'accomodationType',
      internet: 'internet',
      tv: 'tv',
      airConditioning: 'airConditioning',
      roomFridge: 'roomFridge',
      
    })
    .generateRnd(10000)
    .output(function (err, result) {
      //console.log(typeof(result));
      //console.log(result)
      //const linija = toString(result[0]);
      fajl = JSON.stringify(result);
      //console.log(typeof(fajl));
      // fs.writeFile("test.json", fajl, function(err) {
      //   if (err) {
      //       console.log(err);
      //   }
      // });
    });

   
    fs.writeFile("neaktivni.json", fajl, function(err) {
        if (err) {
            console.log(err);
        }
    });