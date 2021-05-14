const fs = require('fs');

let biciJson = fs.readFileSync('bicicletas.json');

let bicis = JSON.parse(biciJson.toString());

let carrera = {
    bicicletas: bicis,
    bicisPorTanda: 7,
    bicicletasHabilitadas: function() {
        return this.bicicletas.filter(e => !e.doppingPositivo);
    },
    listarBicicletas: function(lista) {
        console.log("\n----- Lista de Bicicletas -----");
        lista.forEach((cv, i) => {
            console.log("Id: " + cv.id + ", " +
                "rodado: " + cv.rodado + ", " +
                "peso en Kg: " + cv.pesoEnKg + ", " +
                "estado: " + (cv.doppingPositivo ? "descalificado" : "habilitado"))
            console.log("----- ------------------- -----");
        })
        console.log("----- ------------------- -----");
    },
    buscarPorId: function(id) {
        return this.bicicletas.find(bici => bici.id === id)
    },
    buscarPorRodado: function(rodado) {
        return this.bicicletasHabilitadas().filter(bici => bici.rodado <= rodado)
    },
    ordenarPorRodado: function() {
        return this.bicicletas.sort((a, b) => a.rodado - b.rodado)
    },
    generarTanda: function(rodado, pesoEnKg) {
        return this.bicicletasHabilitadas().filter(bici =>
            bici.rodado <= rodado &&
            bici.pesoEnKg <= pesoEnKg).slice(0, this.bicisPorTanda)
    },
    calcularPodio: function(tanda) {
        tanda = tanda ? tanda : this.generarTanda(100, 10);

        tanda.sort((a, b) => b.puntaje - a.puntaje)
            .slice(0, 3)
            .forEach((el, i) => {
                console.log("El " + (i == 0 ? "ganador " : i == 1 ? "segundo puesto " : "tercer puesto") +
                    "es" + (i > 0 ? " para: " : ": ") + el.ciclista + ", con un puntaje de: " + el.puntaje);
            })
    }
}


console.log(bicis);
carrera.listarBicicletas(carrera.bicicletas);
carrera.listarBicicletas([carrera.buscarPorId(5)]);

carrera.listarBicicletas(carrera.buscarPorRodado(65));
carrera.listarBicicletas(carrera.ordenarPorRodado());
carrera.listarBicicletas(carrera.generarTanda(100, 10));

carrera.calcularPodio(carrera.generarTanda(100, 10));