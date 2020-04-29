const aleatorio = (min, max) => { // retorna um numero aleatório entre min e max
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

const popularArea = tamanho => { // retorna uma matriz populada de tamanho x
    let x = new Array
    const selecao = [{}, {
        contaminado: false,
        curado: false,
        morto: false,
        ciclos: 0
    }, {
        contaminado: true,
        curado: false,
        morto: false,
        ciclos: 0
    }] //V = vazio, C = contaminado, S = saudável
    for (let i = 0; i < tamanho; i++) {
        let y = new Array
        for (let j = 0; j < tamanho; j++) {
            y[j] = selecao[aleatorio(0, 3)]
        }
        x.push(y)
    }
    return x
}

const vazio = {}
const matriz = popularArea(2)

console.log(vazio.contador)