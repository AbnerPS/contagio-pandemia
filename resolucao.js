const getRandom = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

const popularArea = tamanho => {
    let x = new Array
    const selecao = ["V", "C", "S"] //V = vazio, C = contaminado, S = saudavel
    for (let i = 0; i < tamanho; i++) {
        let y = new Array
        for (let j = 0; j < tamanho; j++) {
            y[j] = selecao[getRandom(0, 3)]
        }
        x.push(y)
    }
    return x
}

const contagio = (matriz, probabilidade) => {
    for (let x = 0; x < matriz.length; x++) {
        for (let y = 0; y < matriz.length; y++) {
            if (matriz[x][y] == "C"){ // verifica se a pessoa esta contaminada
                if ((y-1 >= 0 && y-1 <= (matriz.length - 1)) && (matriz[x][y-1] == "S")){ // verifica se tem alguem proximo e se essa pessoa é saudavel
                    if (getRandom(0, 101) <= probabilidade){ // probabilidade de contaminar o proximo
                        matriz[x][y-1] = "C"
                    }
                }
    
                if((y+1 >= 0 && y+1 <= (matriz.length - 1)) && (matriz[x][y+1] == "S")){
                    if (getRandom(0, 101) <= probabilidade){
                        matriz[x][y+1] = "C"
                    }
                }
    
                if((x-1 >= 0 && x-1 <= (matriz.length - 1)) && (matriz[x-1][y] == "S")){
                    if (getRandom(0, 101) <= probabilidade){
                    matriz[x-1][y] = "C"
                    }
                }
    
                if((x+1 >= 0 && x+1 <= (matriz.length - 1)) && (matriz[x+1][y] == "S")){
                    if (getRandom(0, 101) <= probabilidade){
                    matriz[x+1][y] = "C"
                    }
                }

                if((x-1 >= 0 && x-1 <= (matriz.length - 1)) && (matriz[x-1][y-1] == "S")){
                    if ((y-1 >= 0 && y-1 <= (matriz.length - 1)) && (matriz[x-1][y-1] == "S")){
                        if (getRandom(0, 101) <= probabilidade){
                            matriz[x-1][y-1] = "C"
                        }
                    }
                }

                if((x-1 >= 0 && x-1 <= (matriz.length - 1)) && (matriz[x-1][y+1] == "S")){
                    if ((y+1 >= 0 && y+1 <= (matriz.length - 1)) && (matriz[x-1][y+1] == "S")){
                        if (getRandom(0, 101) <= probabilidade){
                            matriz[x-1][y+1] = "C"
                        }
                    }
                }

                if((x+1 >= 0 && x+1 <= (matriz.length - 1)) && (matriz[x+1][y-1] == "S")){
                    if ((y-1 >= 0 && y-1 <= (matriz.length - 1)) && (matriz[x+1][y-1] == "S")){
                        if (getRandom(0, 101) <= probabilidade){
                            matriz[x+1][y-1] = "C"
                        }
                    }
                }

                if((x+1 >= 0 && x+1 <= (matriz.length - 1)) && (matriz[x+1][y+1] == "S")){
                    if ((y+1 >= 0 && y+1 <= (matriz.length - 1)) && (matriz[x+1][y+1] == "S")){
                        if (getRandom(0, 101) <= probabilidade){
                            matriz[x+1][y+1] = "C"
                        }
                    }
                }
            }
        }
    }
    return matriz
}

const analisarPopulacao = (matriz, contador) => {
    matriz.forEach((valor) => {
        valor.forEach((valor) => {
            if (valor == "C" || valor == "V"){
                contador++
            }
        })
    })
    return contador
}

const movimentacao = (matriz) => {
    matriz.forEach((valor, indice) => {
        valor.forEach((valor, indice) => {

        })
    })
}

const populacao = popularArea(6)

let ciclos = 0
let contarContaminados = 0
console.log("Inicio: ");
const tempo = setInterval(() => {
    console.log(populacao);
    if (analisarPopulacao(populacao, contarContaminados) == (populacao.length ** 2)){
        clearInterval(tempo)
        console.log(populacao);
        console.log("Ciclos: ", ciclos)
    }
    contagio(populacao, 20)
    ciclos++
}, 1000)

