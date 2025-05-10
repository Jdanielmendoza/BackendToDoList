export default class Grafo {
  constructor(usuarios = []) {
    this.listasDeAdyacencia = usuarios.map((user) => {
      let nuevoVertice = {};
      nuevoVertice[user?.id] = [];
      return nuevoVertice;
    });
  }

  insertarVertice(idUsuario) {
    let nuevoVertice = {};
    nuevoVertice[idUsuario] = [];
    this.listasDeAdyacencia.push(nuevoVertice);
  }

  validarVertice(claveVertice) {
    // Buscar el objeto con la clave deseada
    let objetoEncontrado = this.listasDeAdyacencia.find(
      (objeto) => Object.keys(objeto)[0] == claveVertice.toString()
    );
    if (objetoEncontrado === undefined) {
      throw new Error("Vértice no existe o invalido");
    }
    // Devolver true si se encontró el objeto, false si no
    return objetoEncontrado !== undefined;
  }

  cantidadDeVertices() {
    return this.listasDeAdyacencia.length;
  }

  existeAdyacencia(claveDeVerticeOrigen, claveDeVerticeDestino) {
    this.validarVertice(claveDeVerticeOrigen);
    this.validarVertice(claveDeVerticeDestino);
    const listaDeAdyacentesDelOrigen = this.listasDeAdyacencia.find(
      (objeto) => Object.keys(objeto)[0] == claveDeVerticeOrigen.toString()
    )[claveDeVerticeOrigen];
    return listaDeAdyacentesDelOrigen.includes(claveDeVerticeDestino);
  }

  insertarArista(claveDeVerticeOrigen, claveDeVerticeDestino) {
    if (this.existeAdyacencia(claveDeVerticeOrigen, claveDeVerticeDestino)) {
      return ;
    }
    this.listasDeAdyacencia
      .find(
        (objeto) => Object.keys(objeto)[0] === claveDeVerticeOrigen.toString()
      )
      [claveDeVerticeOrigen].push(claveDeVerticeDestino);

    this.listasDeAdyacencia
      .find(
        (objeto) => Object.keys(objeto)[0] === claveDeVerticeDestino.toString()
      )
      [claveDeVerticeDestino].push(claveDeVerticeOrigen);
  }


  gradoDeVertice(claveDelVertice) {
    this.validarVertice(claveDelVertice);
    return this.listasDeAdyacencia.find(
      (objeto) => Object.keys(objeto)[0] === claveDelVertice.toString()
    )[claveDelVertice].length;
  }

  //--------------------------------------------------------------
  eliminarVertice(claveDelVerticeAEliminar) {
    this.validarVertice(claveDelVerticeAEliminar);
    const adyacentesAlVerticeAEliminar = this.adyacentesDeVertice(
      claveDelVerticeAEliminar
    );

    this.listasDeAdyacencia = this.listasDeAdyacencia.filter(
      (objeto) => Object.keys(objeto)[0] != claveDelVerticeAEliminar.toString()
    );

    adyacentesAlVerticeAEliminar.forEach((claveDelAdyacente) => {
      const indiceDelVerticeAEliminar = this.listasDeAdyacencia
        .find(
          (objeto) => Object.keys(objeto)[0] === claveDelAdyacente.toString()
        )
        [claveDelAdyacente].indexOf(claveDelVerticeAEliminar);

      this.listasDeAdyacencia
        .find(
          (objeto) => Object.keys(objeto)[0] === claveDelAdyacente.toString()
        )
        [claveDelAdyacente].splice(indiceDelVerticeAEliminar, 1);
    });
  }

  eliminarArista(posVerticeOrigen, posVerticeDestino) {
    if (!this.existeAdyacencia(posVerticeOrigen, posVerticeDestino)) {
      throw new Error("Arista no existe");
    }
    const listaDeAdyacentesDelVerticeOrigen =
      this.adyacentesDeVertice(posVerticeOrigen);
    const posVerticeParaDesenlazar1 =
      listaDeAdyacentesDelVerticeOrigen.indexOf(posVerticeDestino);
    listaDeAdyacentesDelVerticeOrigen.splice(posVerticeParaDesenlazar1, 1);

    if (posVerticeOrigen !== posVerticeDestino) {
      const listaDeAdyacentesDelVerticeDestino =
        this.adyacentesDeVertice(posVerticeDestino);
      const posVerticeParaDesenlazar2 =
        listaDeAdyacentesDelVerticeDestino.indexOf(posVerticeOrigen);
      listaDeAdyacentesDelVerticeDestino.splice(posVerticeParaDesenlazar2, 1);
    }
  }

  adyacentesDeVertice(claveDelVertice) {
    this.validarVertice(claveDelVertice);
    return this.listasDeAdyacencia.find(
      (objeto) => Object.keys(objeto) == claveDelVertice.toString()
    )[claveDelVertice];
  }

  /* cantidadDeAristas() {
      let cant = 0;
      for (let i = 0; i < this.listasDeAdyacencia.length; i++) {
        cant += this.gradoDeVertice(i);
      }
      cant /= 2;
      return cant;
    } */

  /* toString() {
    let result = [];
    this.listasDeAdyacencia.forEach((adyacente) => {
      result.push(JSON.stringify(adyacente));
    });
    return result;
  } */
  toString() {
    let result = "";

    this.listasDeAdyacencia.forEach((adyacente) => {
      const vertice = Object.keys(adyacente)[0];
      const adyacentes = adyacente[vertice];

      result += `${vertice} -> [${adyacentes.join(", ")}]\n`;
    });

    return result;
  }

  sugerenciaDeAmigos(vertice) {//1
    this.validarVertice(vertice);
    const adyacentes = this.adyacentesDeVertice(vertice);
    //[6 , 5]
    const sugerencias = [];

    adyacentes.forEach((amigo) => {
      const amigosDelAmigo = this.adyacentesDeVertice(amigo);

      if (amigosDelAmigo) {
        // Filtrar amigos del amigo que no sean amigos directos del vértice original
        const sugerenciasAmigo = amigosDelAmigo.filter(
          (sugerido) => !adyacentes.includes(sugerido) && sugerido !== vertice
        );

        sugerencias.push(...sugerenciasAmigo);
      }
    });

    // Eliminar duplicados en la lista de sugerencias
    const sugerenciasUnicas = Array.from(new Set(sugerencias));

    return sugerenciasUnicas;
  }
}

/* 
const usuarios = [
  { id: 1, nombre: "Alice" },
  { id: 2, nombre: "Bob" },
  { id: 3, nombre: "Charlie" },
  { id: 4, nombre: "David" },
  { id: 5, nombre: "Eva" },
  { id: 6, nombre: "Frank" },
  { id: 7, nombre: "Grace" },
  { id: 8, nombre: "Hank" },
  { id: 9, nombre: "Ivy" },
  { id: 10, nombre: "Jack" },
  { id: 11, nombre: "Kate" },
  { id: 12, nombre: "Liam" },
  { id: 13, nombre: "Mia" },
  { id: 14, nombre: "Nathan" },
  { id: 15, nombre: "Olivia" },
  { id: 16, nombre: "Paul" },
  { id: 17, nombre: "Quinn" },
  { id: 18, nombre: "Ryan" },
  { id: 19, nombre: "Sara" },
  { id: 20, nombre: "Tom" },
];

const grafo = new Grafo(usuarios);

grafo.insertarArista(1, 3);
grafo.insertarArista(1, 5);
grafo.insertarArista(1, 7);
grafo.insertarArista(2, 4);
grafo.insertarArista(2, 6);
grafo.insertarArista(2, 8);
grafo.insertarArista(3, 9);
grafo.insertarArista(3, 11);
grafo.insertarArista(4, 10);
grafo.insertarArista(4, 12);
grafo.insertarArista(5, 13);
grafo.insertarArista(5, 15);
grafo.insertarArista(6, 14);
grafo.insertarArista(6, 16);
grafo.insertarArista(7, 17);
grafo.insertarArista(7, 19);
grafo.insertarArista(8, 18);
grafo.insertarArista(8, 20);

console.log("Sugerencia de amigos para el usuario 1:");
console.log(grafo.sugerenciaDeAmigos(1));

console.log("Representación gráfica del grafo:");
console.log(grafo.toString()); */


/* // Ejemplo de uso
const usuarios = [
  { id: "c3947e36-07e2-4b0e-a673-11ae95b36a54", nombre: "Alice" },
  { id: "0d0f9329-9934-4b72-91b1-ef5d3e13338b", nombre: "Bob" },
  { id: "fbd3fbb1-d5b4-4e32-8a6e-f4ccf7962fb2", nombre: "Charlie" },
  { id: "3f47f0d7-d34e-4f7a-8f6e-8a4715d2a36e", nombre: "David" },
  { id: "e25fe490-53e5-4c9e-9351-30e87cf64721", nombre: "Eva" },
  { id: "85a4dd9b-c93a-439c-bc57-bf0e98d2014b", nombre: "Frank" },
  { id: "fa548f21-5d7a-4b45-a9d7-bb20ad38aef4", nombre: "Grace" },
  { id: "e5b03ab1-bec5-4c69-a0de-eb3f53016cd4", nombre: "Hank" },
  { id: "81f7bb7a-8483-482d-9422-16981d0e2145", nombre: "Ivy" },
  { id: "e551ee7a-696f-4d68-8a18-98c03fb7851d", nombre: "Jack" },
  { id: "dd9c7a45-55a9-43c2-8cc7-04e4c8c45882", nombre: "Kate" },
  { id: "4a8b4d8b-6fbf-4aa3-a90d-3f1d19eac661", nombre: "Liam" },
  { id: "b9fe5295-87f1-467f-b23b-43d0bde790c9", nombre: "Mia" },
  { id: "eda3a788-963b-42d8-8a7a-3b94ff06d9e2", nombre: "Nathan" },
  { id: "96c9f9ac-2f5d-465a-8bbf-5d76bc72ce0e", nombre: "Olivia" },
  { id: "72ff460b-3d99-450d-a5f0-e639440ec98e", nombre: "Paul" },
  { id: "5a4db6d7-22f0-4d7c-9ebc-05f8e1ab9f45", nombre: "Quinn" },
  { id: "a4bbf4fc-3848-4283-aa87-8e23d845f6d2", nombre: "Ryan" },
  { id: "5cde95e8-ece3-4482-84cd-4053de3b54b1", nombre: "Sara" },
  { id: "90c5c602-8978-4fd4-ae23-1ce8b9a31f5d", nombre: "Tom" },
];

const grafo = new Grafo(usuarios);

grafo.insertarArista("c3947e36-07e2-4b0e-a673-11ae95b36a54", "0d0f9329-9934-4b72-91b1-ef5d3e13338b");
grafo.insertarArista("c3947e36-07e2-4b0e-a673-11ae95b36a54", "fbd3fbb1-d5b4-4e32-8a6e-f4ccf7962fb2");
grafo.insertarArista("0d0f9329-9934-4b72-91b1-ef5d3e13338b", "e25fe490-53e5-4c9e-9351-30e87cf64721");
grafo.insertarArista("0d0f9329-9934-4b72-91b1-ef5d3e13338b", "81f7bb7a-8483-482d-9422-16981d0e2145");
grafo.insertarArista("fbd3fbb1-d5b4-4e32-8a6e-f4ccf7962fb2", "e551ee7a-696f-4d68-8a18-98c03fb7851d");
grafo.insertarArista("3f47f0d7-d34e-4f7a-8f6e-8a4715d2a36e", "85a4dd9b-c93a-439c-bc57-bf0e98d2014b");
grafo.insertarArista("e25fe490-53e5-4c9e-9351-30e87cf64721", "81f7bb7a-8483-482d-9422-16981d0e2145");
grafo.insertarArista("81f7bb7a-8483-482d-9422-16981d0e2145", "e551ee7a-696f-4d68-8a18-98c03fb7851d");
grafo.insertarArista("e551ee7a-696f-4d68-8a18-98c03fb7851d", "b9fe5295-87f1-467f-b23b-43d0bde790c9");
grafo.insertarArista("b9fe5295-87f1-467f-b23b-43d0bde790c9", "eda3a788-963b-42d8-8a7a-3b94ff06d9e2");

console.log("Sugerencia de amigos para el usuario 1:");
console.log(grafo.sugerenciaDeAmigos("c3947e36-07e2-4b0e-a673-11ae95b36a54"));
 */
