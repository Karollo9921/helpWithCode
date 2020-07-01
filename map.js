const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'tournaments.json'
);

class Tournament {
    constructor(discipline, type, description) {
        this.id = Date.now();
        this.discipline = discipline;
        this.type = type;
        this.description = description;
        this.date = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[0] + ' '
                    + new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[1].slice(0,8);
        this.lastEdit = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[0] + ' '
                    + new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[1].slice(0,8);
    }

    saveToJSON() {
        fs.readFile(p, (err, fileContent) => {
            let tournaments = [];
            if (!err) {
                tournaments = JSON.parse(fileContent);  
            }    
            tournaments.push(this);
            fs.writeFile(p, JSON.stringify(tournaments), (err) => {
                if (err) {
                    console.log(err); 
                }                    
            });
        });
    }

    static editTour(id, discipline, type, description) {
        fs.readFile(p, (err, fileContent) => {
            let tournaments = [];
            if (!err) {
                tournaments = JSON.parse(fileContent);  
            }
            let newTournaments = tournaments.map((tour) => {
                if (tour.id == id) {
                    return {
                        id: tour.id,
                        discipline: discipline,
                        type: type,
                        description: description,
                        date: tour.date,
                        lastEdit: new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[0] + ' '
                                + new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[1].slice(0,8)
                    }
                } else {
                    return tour
                }
            })
            fs.writeFile(p, JSON.stringify(newTournaments), (err) => {
                if (err) {
                    console.log(err); 
                }                    
            });
        })
    }

    static displayFromJSON(cb) {
        fs.readFile(p, (err, fileContent) => {
            if (!err) {
                cb(JSON.parse(fileContent));
            } else {
                cb([]);
            }
            
        })
    }
};


const tour1 = new Tournament('poker', 'rr', 'des 1');
const tour2 = new Tournament('chess', 'tt', 'des 2');

// console.log(tour1);

// tour1.saveToJSON()
// tour2.saveToJSON()


Tournament.editTour('1593595909353', 'yoyoyo', 'ww', 'des 3');


Tournament.displayFromJSON((tournaments) => {
    tournaments.map((tour) => {console.log(tour);
    })
});







// async function letsGo() { 
//     Tournament.editTour('1593595909353', 'yoyoyo', 'ww', 'des 3');

//     Tournament.displayFromJSON((tournaments) => {
//         tournaments.map((tour) => {console.log(tour);
//         })
//     });
// }

// letsGo()

// new Promise((resolve, reject) => {
//     Tournament.editTour('1593595909353', 'cycki', 'ww', 'des 3');
// }).then(Tournament.displayFromJSON((tournaments) => {
//     tournaments.map((tour) => {console.log(tour);
//     })
// }))


// fs.readFile(p, (err, fileContent) => {
//     let tournaments = [];
//     if (!err) {
//         tournaments = JSON.parse(fileContent); 
//     }
//     let newTournaments = tournaments.map((tour) => {
//         if (tour.id == id) {
//             return {
//                 id: tour.id,
//                 discipline: discipline,
//                 type: type,
//                 description: description,
//                 date: tour.date,
//                 lastEdit: new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[0] + ' '
//                         + new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('T')[1].slice(0,8)
//             }
//         } else {
//             return tour
//         }
//     })
//     console.log(newTournaments);
// })


