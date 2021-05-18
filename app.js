const fs = require('fs');

let biciJson = fs.readFileSync('bicicletas.json');

let bicis = JSON.parse(biciJson.toString());

let carrera = {
    bicicletas: bicis,
    bicisPorTanda: 7,
    bicicletasHabilitadas: function() {
        return this.bicicletas.filter(bici => !bici.doppingPositivo);
    },
    listarBicicletas: function(bicis) {
        console.log("----- Lista de Bicicletas -----");
        bicis.forEach(bici => {
            console.log("Id: " + bici.id + ", " +
                "rodado: " + bici.rodado + ", " +
                "peso en Kg: " + bici.pesoEnKg + ", " +
                "estado: " + (bici.doppingPositivo ? "descalificado" : "habilitado"))
        })
        console.log("----- ------------------- -----\n");
    },
    buscarPorId: function(id) {
        return this.bicicletas.find(bici => bici.id === id)
    },
    buscarPorRodado: function(rodado) {
        return this.bicicletasHabilitadas().filter(bici => bici.rodado <= rodado)
    },
    ordenarPorRodado: function() {
        return this.bicicletas.sort((bici1, bici2) => bici1.rodado - bici2.rodado)
    },
    generarTanda: function(rodado, pesoEnKg) {
        return this.buscarPorRodado(rodado).filter(bici =>
            bici.pesoEnKg <= pesoEnKg).slice(0, this.bicisPorTanda)
    },
    calcularPodio: function() {
        const podio = this.generarTanda(100, 10).sort((bici1, bici2) => bici2.puntaje - bici1.puntaje)
            .slice(0, 3);
        console.log("El ganador es: " + podio[0].ciclista + ", con un puntaje de: " + podio[0].puntaje +
                    "\nEl segundo puesto es para: " + podio[1].ciclista + ", con un puntaje de: " + podio[1].puntaje +
                    "\nEl tercer puesto es para: " + podio[2].ciclista + ", con un puntaje de: " + podio[2].puntaje);
    }
}


console.log(bicis);
carrera.listarBicicletas(carrera.bicicletas);
carrera.listarBicicletas([carrera.buscarPorId(5)]);

carrera.listarBicicletas(carrera.buscarPorRodado(65));
carrera.listarBicicletas(carrera.ordenarPorRodado());
carrera.listarBicicletas(carrera.generarTanda(100, 10));

carrera.calcularPodio();