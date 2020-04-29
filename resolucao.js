/* Universidade Paulista - UNIP
 * Autor: Abner Pereira Siva
 * RA: N215AJ-8
 * Turma: CC6P13
*/

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

const contagio = (matriz, probabilidade) => { // retorna uma nova matriz com os elementos contaminados
    for (let x = 0; x < matriz.length; x++) {
        for (let y = 0; y < matriz.length; y++) {
            if (matriz[x][y] == "C"){ // verifica se a pessoa esta contaminada
                if ((y-1 >= 0 && y-1 <= (matriz.length - 1)) && (matriz[x][y-1] == "S")){ // verifica se tem alguem proximo e se essa pessoa é saudavel
                    if (aleatorio(0, 101) <= probabilidade){ // probabilidade de contaminar o proximo
                        matriz[x][y-1] = "C"
                    }
                }
    
                if((y+1 >= 0 && y+1 <= (matriz.length - 1)) && (matriz[x][y+1] == "S")){
                    if (aleatorio(0, 101) <= probabilidade){
                        matriz[x][y+1] = "C"
                    }
                }
    
                if((x-1 >= 0 && x-1 <= (matriz.length - 1)) && (matriz[x-1][y] == "S")){
                    if (aleatorio(0, 101) <= probabilidade){
                    matriz[x-1][y] = "C"
                    }
                }
    
                if((x+1 >= 0 && x+1 <= (matriz.length - 1)) && (matriz[x+1][y] == "S")){
                    if (aleatorio(0, 101) <= probabilidade){
                    matriz[x+1][y] = "C"
                    }
                }

                if((x-1 >= 0 && x-1 <= (matriz.length - 1)) && (matriz[x-1][y-1] == "S")){
                    if ((y-1 >= 0 && y-1 <= (matriz.length - 1)) && (matriz[x-1][y-1] == "S")){
                        if (aleatorio(0, 101) <= probabilidade){
                            matriz[x-1][y-1] = "C"
                        }
                    }
                }

                if((x-1 >= 0 && x-1 <= (matriz.length - 1)) && (matriz[x-1][y+1] == "S")){
                    if ((y+1 >= 0 && y+1 <= (matriz.length - 1)) && (matriz[x-1][y+1] == "S")){
                        if (aleatorio(0, 101) <= probabilidade){
                            matriz[x-1][y+1] = "C"
                        }
                    }
                }

                if((x+1 >= 0 && x+1 <= (matriz.length - 1)) && (matriz[x+1][y-1] == "S")){
                    if ((y-1 >= 0 && y-1 <= (matriz.length - 1)) && (matriz[x+1][y-1] == "S")){
                        if (aleatorio(0, 101) <= probabilidade){
                            matriz[x+1][y-1] = "C"
                        }
                    }
                }

                if((x+1 >= 0 && x+1 <= (matriz.length - 1)) && (matriz[x+1][y+1] == "S")){
                    if ((y+1 >= 0 && y+1 <= (matriz.length - 1)) && (matriz[x+1][y+1] == "S")){
                        if (aleatorio(0, 101) <= probabilidade){
                            matriz[x+1][y+1] = "C"
                        }
                    }
                }
            }
        }
    }
    return matriz
}

const analisarPopulacao = matriz => { // retorna um objeto com a contagem de elementos contaminados, saudaveis e vazios
    let contagem = {
        contaminados: 0,
        saudaveis: 0,
        vazios: 0
    }

    matriz.forEach((valorX) => {
        valorX.forEach((valorY) => {
            if (valorY.contaminado){
                contagem.contaminados++
            } else if(valorY.contaminado == false){
                contagem.saudaveis++
            } else {
                contagem.vazios++
            }
        })
    })
    return contagem
}

const movimentacao = matriz => { // retorna uma nova matriz após a movimentação dos elementos
    const qntMovimentos = aleatorio(1, matriz.length ** 2) // gera um numero aleatorio de movimentos a ser executados
    for (let i = 0; i <= qntMovimentos; i++){
        const movX = aleatorio(0, matriz.length)
        const movY = aleatorio(0, matriz.length)
        const novoMovX = movX + aleatorio(-1, 2)
        const novoMovY = movY + aleatorio(-1, 2)

        if ((novoMovX >= 0 && novoMovX < matriz.length) && (novoMovY >= 0 && novoMovY < matriz.length)){ // verifica se esta nos limites da matriz
            if (matriz[movX][movY].contanimado !== undefined){ //seleciona uma posição aleatoria não vazia na matriz
                if (matriz[novoMovX][novoMovY].contanimado == undefined){ // movimenta o elemento para uma vizinhança aleatoria vazia na matriz
                    matriz[novoMovX][novoMovY] = matriz[movX][movY]
                    matriz[movX][movY] = {}
                }
            }
        }
    }
    return matriz
}


const periodoRecuperacao = matriz => { // retorna uma nova matriz com os elementos curados
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz.length; j++) {
            if (matriz[i][j].contanimado !== undefined && matriz[i][j].contanimado == true) {
                matriz[i][j].contanimado = false
                break
            }
        }
    }
    return matriz
}

const iniciarSimulacao = (tamanhoArea, probabilidadeContagio, tempoCiclo) => { // inicia a simulação de contagio do vírus
    let ciclos = 0
    let populacao = popularArea(tamanhoArea)
    console.log("Iniciando simulação...")
    console.log(populacao)
    console.log("|----------------------------------|")

    const tempo = setInterval(() => {
        let contagemCasos = analisarPopulacao(populacao)
        if ((contagemCasos.saudaveis + contagemCasos.vazios) == (populacao.length ** 2)){
            clearInterval(tempo)
            console.log(populacao);
            console.log("Fim da simulação:", ciclos, "ciclos")
        } else {
            if (ciclos < 10) {
                populacao = contagio(populacao, probabilidadeContagio)
                populacao = movimentacao(populacao)
            } else {
                populacao = periodoRecuperacao(populacao)
                populacao = movimentacao(populacao)
            }
            ciclos++
            console.log(populacao)
            console.log("Ciclo: ", ciclos)
        }
    }, tempoCiclo * 1000)
}

iniciarSimulacao(2, 14, 2)