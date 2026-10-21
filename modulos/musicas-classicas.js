// Composições originais em MIDI para o sequenciador pixelado compartilhado.
function criarPartiturasClassicas() {
    const comuns = {
        volumeRelativo: 1.45, instrumento: "triangle", instrumentoSecundario: "sine",
        volumeMelodia: 0.11, volumeContracanto: 0.035, volumeBaixo: 0.1,
        volumeHarmonia: 0.018, volumeBateria: 0.14, volumeAcordesRitmados: 0.035,
        sustentoHarmonia: 6, ordem: [0, 1, 0, 2, 0, 1, 3, 2]
    };
    const partituras = {
        101: {
            nomeInterno: "Pétalas ao Vento", intervaloDoPasso: 230,
            frases: [
                [74,0,78,81,83,0,81,78,76,0,74,76,78,0,0,0],
                [78,81,83,0,86,0,83,81,78,0,76,74,76,0,0,0],
                [71,0,74,78,81,0,78,74,76,78,76,0,74,0,0,0],
                [83,81,78,0,86,83,81,0,78,76,74,76,81,0,78,0]
            ],
            baixos: [[38,0,45,0,50,0,45,0],[43,0,50,0,55,0,50,0],[47,0,54,0,59,0,54,0],[45,0,52,0,57,0,52,0]],
            acordes: [[62,66,69],[59,62,67],[59,62,66],[61,64,69]],
            contracanto: [0,0,0,69,0,0,66,0,0,0,0,64,0,0,66,0],
            ritmoDosAcordes: [0,0,1,0,0,0,1,0], bateria: [1,0,3,0,4,0,3,0,1,0,3,3,4,0,3,0]
        },
        102: {
            nomeInterno: "Passos na Névoa", intervaloDoPasso: 310, volumeBateria: 0.1,
            frases: [
                [[76,2],0,0,74,75,0,71,0,[72,2],0,0,71,67,0,0,0],
                [[71,2],0,0,67,66,0,67,0,[69,3],0,0,0,66,0,0,0],
                [72,0,0,71,67,0,64,0,[66,2],0,0,67,63,0,0,0],
                [76,0,79,0,78,0,75,0,74,0,71,0,[75,2],0,0,0]
            ],
            baixos: [[40,0,0,0,47,0,0,0],[36,0,0,0,43,0,0,0],[33,0,0,0,40,0,0,0],[35,0,0,0,42,0,0,0]],
            acordes: [[52,55,59],[48,52,55],[45,48,52],[47,51,54]],
            contracanto: [0,0,59,0,0,0,0,0,0,0,54,0,0,0,0,0],
            ritmoDosAcordes: [0], bateria: [1,0,0,3,0,0,4,0,1,0,0,0,2,0,0,3]
        },
        103: {
            nomeInterno: "Maré de Pixels", intervaloDoPasso: 205,
            frases: [
                [72,0,76,79,0,81,79,0,76,0,74,76,0,79,0,0],
                [74,0,77,81,0,84,81,0,79,0,77,76,0,74,0,0],
                [76,79,0,84,0,83,79,0,77,0,76,74,72,0,0,0],
                [81,0,84,86,0,84,81,79,77,0,79,0,83,0,79,0]
            ],
            baixos: [[36,0,43,0,0,48,43,0],[41,0,48,0,0,53,48,0],[45,0,52,0,0,57,52,0],[43,0,50,0,0,55,50,0]],
            acordes: [[60,64,67],[60,65,69],[60,64,69],[59,62,67]],
            contracanto: [0,67,0,0,0,64,0,0,0,62,0,0,0,64,0,0],
            ritmoDosAcordes: [0,0,1,0,0,0,1,0], bateria: [[1,3],0,4,3,2,0,4,0,1,3,4,0,2,0,3,4]
        },
        104: {
            nomeInterno: "Ecos de Ametista", intervaloDoPasso: 185, instrumento: "square", volumeMelodia: 0.065,
            frases: [
                [81,76,84,76,88,0,84,81,79,74,83,74,86,0,83,79],
                [77,72,81,72,84,0,81,77,76,71,79,71,83,0,79,76],
                [84,0,88,86,84,81,0,76,79,0,83,81,79,76,0,74],
                [89,88,84,0,86,84,81,0,83,81,79,76,80,0,83,0]
            ],
            baixos: [[45,0,52,0,45,0,57,0],[41,0,48,0,41,0,53,0],[43,0,50,0,43,0,55,0],[40,0,47,0,40,0,52,0]],
            acordes: [[57,60,64],[53,57,60],[55,59,62],[56,59,64]],
            contracanto: [0,0,64,0,0,0,60,0,0,0,62,0,0,0,59,0],
            ritmoDosAcordes: [0,0,0,1,0,0,0,1], bateria: [1,3,0,3,2,3,0,3,1,3,1,0,2,3,0,3]
        },
        105: {
            nomeInterno: "Caravana Dourada", intervaloDoPasso: 215, instrumento: "square", volumeMelodia: 0.07,
            frases: [
                [69,70,73,0,76,0,73,70,69,0,67,65,64,0,0,0],
                [65,0,69,70,73,70,69,0,67,0,65,64,65,0,0,0],
                [76,0,77,76,73,0,70,73,74,0,73,70,69,0,0,0],
                [81,0,77,76,73,70,69,0,67,65,64,65,68,0,71,0]
            ],
            baixos: [[45,0,45,52,0,45,52,0],[41,0,41,48,0,41,48,0],[46,0,46,53,0,46,53,0],[40,0,40,47,0,40,47,0]],
            acordes: [[57,61,64],[53,57,60],[58,62,65],[56,59,64]],
            contracanto: [0,0,0,64,0,0,0,61,0,0,0,58,0,0,64,0],
            ritmoDosAcordes: [1,0,0,1,0,0,1,0], bateria: [1,0,4,3,2,4,0,3,1,4,0,3,2,0,4,4]
        }
    };
    // Estes mapas não reutilizam frases de outros cenários. Cada motivo abaixo é
    // uma melodia nova, escrita para a paisagem que acompanha.
    const trilhasExclusivas = {
        106: ['Aurora de Cristal', 205, 'sine', [69,72,76,81,79,76,72,74], [33,40,45,52], [[57,60,64],[59,64,67],[60,64,69],[57,62,66]], [1,0,0,3,0,4,0,3]],
        107: ['Luzes da Turfa', 285, 'triangle', [62,65,67,70,67,65,60,62], [31,38,43,46], [[50,53,57],[53,57,60],[48,52,55],[50,55,58]], [1,0,3,0,0,4,0,3]],
        108: ['Ecos do Cânion', 195, 'square', [64,69,71,76,74,71,69,66], [28,35,40,42], [[52,56,59],[57,60,64],[59,62,66],[54,57,61]], [1,3,0,4,3,0,2,0]],
        109: ['Esporos ao Luar', 220, 'sine', [71,74,79,76,74,81,79,76], [35,42,47,40], [[59,62,67],[62,67,71],[55,59,64],[60,64,69]], [1,0,4,0,3,0,4,2]],
        110: ['Maré Elétrica', 190, 'square', [67,71,74,72,76,79,76,72], [36,43,48,41], [[55,59,62],[57,60,64],[60,64,67],[53,57,60]], [1,4,0,3,1,0,4,3]],
        111: ['Ponte das Nuvens', 175, 'triangle', [76,81,79,83,86,83,79,81], [40,47,52,45], [[64,67,71],[62,67,69],[67,71,74],[61,64,69]], [1,0,3,4,0,3,1,0]],
        112: ['Folhas de Jade', 245, 'sine', [66,69,73,74,78,74,73,69], [34,41,46,39], [[54,57,61],[57,61,64],[61,64,69],[55,59,62]], [1,0,0,4,3,0,1,3]],
        113: ['Brilho de Sal', 225, 'triangle', [74,77,81,79,77,84,81,77], [38,45,50,43], [[62,65,69],[60,65,67],[65,69,72],[59,62,67]], [1,3,0,1,4,0,3,2]],
        114: ['Vigília Lunar', 300, 'sine', [59,62,66,69,66,64,62,57], [28,35,38,33], [[47,50,54],[50,54,57],[54,57,62],[45,49,52]], [1,0,0,3,0,4,0,0]],
        115: ['Vento das Alturas', 180, 'square', [72,76,79,84,81,79,76,81], [37,44,49,42], [[60,64,67],[64,67,72],[62,65,69],[57,60,65]], [1,4,3,0,1,3,4,0]],
        116: ['Sinos do Templo', 235, 'triangle', [70,74,77,82,77,74,79,75], [32,39,44,37], [[58,62,65],[62,65,70],[55,58,63],[60,63,67]], [1,0,4,0,1,3,0,4]],
        117: ['Espelho do Poente', 210, 'sine', [68,73,76,80,78,76,73,75], [36,43,48,41], [[56,61,64],[61,64,68],[59,63,66],[54,58,63]], [1,3,4,0,3,1,0,4]]
    };
    const criarFrase = (motivo, deslocamento, inverter) => motivo.map((nota, indice) => {
        if (nota === 0) return 0;
        const passo = inverter ? motivo[motivo.length - 1 - indice] : nota;
        return passo + deslocamento;
    });
    for (const [numero, [nomeInterno, intervaloDoPasso, instrumento, motivo, notasDoBaixo, acordes, bateria]] of Object.entries(trilhasExclusivas)) {
        const resposta = criarFrase(motivo, 3, true);
        partituras[numero] = {
            nomeInterno, intervaloDoPasso, instrumento,
            frases: [
                [...motivo, 0, ...criarFrase(motivo, 5, false).slice(0, 7)],
                [...resposta, 0, ...criarFrase(motivo, -2, false).slice(0, 7)],
                [...criarFrase(motivo, 7, false), 0, ...resposta.slice(0, 7)],
                [...criarFrase(motivo, 2, true), 0, ...criarFrase(motivo, 5, true).slice(0, 7)]
            ],
            baixos: notasDoBaixo.map(nota => [nota,0,nota+7,0,nota+12,0,nota+7,0]),
            acordes,
            contracanto: [0,motivo[2]-12,0,0,motivo[4]-12,0,motivo[6]-12,0,0,motivo[1]-12,0,0,motivo[5]-12,0,0,0],
            ritmoDosAcordes: [0,0,1,0,0,1,0,0], bateria,
            ordem: [0,1,2,3,0,2,1,3]
        };
    }
    return Object.freeze(Object.fromEntries(Object.entries(partituras).map(([numero, partitura]) =>
        [numero, Object.freeze({ ...comuns, ...partitura })])));
}
