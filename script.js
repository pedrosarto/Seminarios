// Variáveis globais
let estadoJogo = {
    pontos: 0,
    pontuacaoMaxima: 250,
    nivel: 1,
    sequenciaAcertos: 0,
    multiplicador: 1,
    temaEscolhido: null,
    dificuldadeEscolhida: 'aleatorio',
    exerciciosCompletados: 0,
    totalExercicios: 5
};

let exercicioAtual = null;
let opcaoSelecionada = null;

document.addEventListener('DOMContentLoaded', () => {
    // Banco de exercícios por tema e nível
    const exercicios = {
        adicao: {
            facil: [
                { problema: '2 + 2 = ?', respostaCorreta: '4', opcoes: ['4', '3', '8', '6'] },
                { problema: '3 + 1 = ?', respostaCorreta: '4', opcoes: ['4', '5', '3', '2'] },
                { problema: '5 + 3 = ?', respostaCorreta: '8', opcoes: ['8', '7', '9', '6'] },
                { problema: '5 + 5 = ?', respostaCorreta: '10', opcoes: ['8', '10', '9', '6'] },
                { problema: '3 + 3 = ?', respostaCorreta: '6', opcoes: ['8', '7', '9', '6'] },
                { problema: '4 + 4 = ?', respostaCorreta: '8', opcoes: ['8', '7', '9', '6'] },
                { problema: '6 + 2 = ?', respostaCorreta: '8', opcoes: ['8', '7', '9', '6'] },
                { problema: '7 + 1 = ?', respostaCorreta: '8', opcoes: ['8', '7', '9', '6'] },
                { problema: '2 + 6 = ?', respostaCorreta: '8', opcoes: ['8', '7', '9', '6'] },
                { problema: '1 + 7 = ?', respostaCorreta: '8', opcoes: ['8', '7', '9', '6'] }
            ],
            medio: [
                { problema: '12 + 15 = ?', respostaCorreta: '27', opcoes: ['27', '26', '28', '25'] },
                { problema: '15 + 27 = ?', respostaCorreta: '42', opcoes: ['42', '41', '43', '40'] },
                { problema: '24 + 38 = ?', respostaCorreta: '62', opcoes: ['42', '71', '62', '40'] },
                { problema: '24 + 24 = ?', respostaCorreta: '48', opcoes: ['32', '21', '53', '48'] },
                { problema: '15 + 15 = ?', respostaCorreta: '30', opcoes: ['27', '30', '33', '40'] },
                { problema: '18 + 22 = ?', respostaCorreta: '40', opcoes: ['40', '38', '42', '36'] },
                { problema: '25 + 35 = ?', respostaCorreta: '60', opcoes: ['60', '58', '62', '56'] },
                { problema: '33 + 17 = ?', respostaCorreta: '50', opcoes: ['50', '48', '52', '46'] },
                { problema: '28 + 32 = ?', respostaCorreta: '60', opcoes: ['60', '58', '62', '56'] },
                { problema: '19 + 31 = ?', respostaCorreta: '50', opcoes: ['50', '48', '52', '46'] }
            ],
            dificil: [
                { problema: '125 + 75 = ?', respostaCorreta: '200', opcoes: ['200', '190', '210', '195'] },
                { problema: '234 + 567 = ?', respostaCorreta: '801', opcoes: ['801', '791', '811', '781'] },
                { problema: '174 + 83 = ?', respostaCorreta: '257', opcoes: ['257', '247', '267', '237'] },
                { problema: '456 + 789 = ?', respostaCorreta: '1245', opcoes: ['1245', '1235', '1255', '1225'] },
                { problema: '678 + 432 = ?', respostaCorreta: '1110', opcoes: ['1110', '1100', '1120', '1090'] },
                { problema: '345 + 678 = ?', respostaCorreta: '1023', opcoes: ['1023', '1013', '1033', '1003'] },
                { problema: '567 + 789 = ?', respostaCorreta: '1356', opcoes: ['1356', '1346', '1366', '1336'] },
                { problema: '890 + 123 = ?', respostaCorreta: '1013', opcoes: ['1013', '1003', '1023', '993'] },
                { problema: '456 + 567 = ?', respostaCorreta: '1023', opcoes: ['1023', '1013', '1033', '1003'] },
                { problema: '789 + 234 = ?', respostaCorreta: '1023', opcoes: ['1023', '1013', '1033', '1003'] }
            ]
        },
        subtracao: {
            facil: [
                { problema: '5 - 2 = ?', respostaCorreta: '3', opcoes: ['3', '4', '2', '1'] },
                { problema: '8 - 3 = ?', respostaCorreta: '5', opcoes: ['5', '6', '4', '3'] },
                { problema: '7 - 4 = ?', respostaCorreta: '3', opcoes: ['3', '4', '2', '5'] },
                { problema: '9 - 5 = ?', respostaCorreta: '4', opcoes: ['4', '5', '3', '6'] },
                { problema: '6 - 2 = ?', respostaCorreta: '4', opcoes: ['4', '3', '5', '2'] },
                { problema: '10 - 4 = ?', respostaCorreta: '6', opcoes: ['6', '5', '7', '4'] },
                { problema: '8 - 4 = ?', respostaCorreta: '4', opcoes: ['4', '3', '5', '2'] },
                { problema: '7 - 3 = ?', respostaCorreta: '4', opcoes: ['4', '3', '5', '2'] },
                { problema: '9 - 6 = ?', respostaCorreta: '3', opcoes: ['3', '4', '2', '5'] },
                { problema: '5 - 1 = ?', respostaCorreta: '4', opcoes: ['4', '3', '5', '2'] }
            ],
            medio: [
                { problema: '25 - 12 = ?', respostaCorreta: '13', opcoes: ['13', '14', '12', '15'] },
                { problema: '45 - 28 = ?', respostaCorreta: '17', opcoes: ['17', '16', '18', '19'] },
                { problema: '38 - 15 = ?', respostaCorreta: '23', opcoes: ['23', '24', '22', '25'] },
                { problema: '52 - 29 = ?', respostaCorreta: '23', opcoes: ['23', '24', '22', '25'] },
                { problema: '47 - 19 = ?', respostaCorreta: '28', opcoes: ['28', '27', '29', '26'] },
                { problema: '63 - 27 = ?', respostaCorreta: '36', opcoes: ['36', '35', '37', '34'] },
                { problema: '72 - 38 = ?', respostaCorreta: '34', opcoes: ['34', '33', '35', '32'] },
                { problema: '85 - 49 = ?', respostaCorreta: '36', opcoes: ['36', '35', '37', '34'] },
                { problema: '91 - 37 = ?', respostaCorreta: '54', opcoes: ['54', '53', '55', '52'] },
                { problema: '76 - 28 = ?', respostaCorreta: '48', opcoes: ['48', '47', '49', '46'] }
            ],
            dificil: [
                { problema: '100 - 45 = ?', respostaCorreta: '55', opcoes: ['55', '54', '56', '53'] },
                { problema: '500 - 275 = ?', respostaCorreta: '225', opcoes: ['225', '215', '235', '245'] },
                { problema: '1000 - 487 = ?', respostaCorreta: '513', opcoes: ['513', '523', '503', '533'] },
                { problema: '750 - 328 = ?', respostaCorreta: '422', opcoes: ['422', '432', '412', '442'] },
                { problema: '900 - 567 = ?', respostaCorreta: '333', opcoes: ['333', '343', '323', '353'] },
                { problema: '1200 - 678 = ?', respostaCorreta: '522', opcoes: ['522', '512', '532', '502'] },
                { problema: '1500 - 789 = ?', respostaCorreta: '711', opcoes: ['711', '701', '721', '691'] },
                { problema: '2000 - 1234 = ?', respostaCorreta: '766', opcoes: ['766', '756', '776', '746'] },
                { problema: '1800 - 945 = ?', respostaCorreta: '855', opcoes: ['855', '845', '865', '835'] },
                { problema: '2500 - 1678 = ?', respostaCorreta: '822', opcoes: ['822', '812', '832', '802'] }
            ]
        },
        multiplicacao: {
            facil: [
                { problema: '2 x 3 = ?', respostaCorreta: '6', opcoes: ['6', '8', '4', '5'] },
                { problema: '4 x 2 = ?', respostaCorreta: '8', opcoes: ['8', '10', '6', '12'] },
                { problema: '3 x 4 = ?', respostaCorreta: '12', opcoes: ['12', '14', '10', '16'] },
                { problema: '5 x 2 = ?', respostaCorreta: '10', opcoes: ['10', '12', '8', '14'] },
                { problema: '3 x 3 = ?', respostaCorreta: '9', opcoes: ['9', '11', '7', '13'] },
                { problema: '2 x 5 = ?', respostaCorreta: '10', opcoes: ['10', '12', '8', '14'] },
                { problema: '4 x 3 = ?', respostaCorreta: '12', opcoes: ['12', '14', '10', '16'] },
                { problema: '2 x 4 = ?', respostaCorreta: '8', opcoes: ['8', '10', '6', '12'] },
                { problema: '3 x 5 = ?', respostaCorreta: '15', opcoes: ['15', '17', '13', '19'] },
                { problema: '4 x 4 = ?', respostaCorreta: '16', opcoes: ['16', '18', '14', '20'] }
            ],
            medio: [
                { problema: '6 x 7 = ?', respostaCorreta: '42', opcoes: ['42', '36', '49', '35'] },
                { problema: '8 x 9 = ?', respostaCorreta: '72', opcoes: ['72', '64', '81', '63'] },
                { problema: '7 x 8 = ?', respostaCorreta: '56', opcoes: ['56', '58', '54', '60'] },
                { problema: '9 x 6 = ?', respostaCorreta: '54', opcoes: ['54', '56', '52', '58'] },
                { problema: '8 x 7 = ?', respostaCorreta: '56', opcoes: ['56', '58', '54', '60'] },
                { problema: '6 x 9 = ?', respostaCorreta: '54', opcoes: ['54', '56', '52', '58'] },
                { problema: '7 x 7 = ?', respostaCorreta: '49', opcoes: ['49', '51', '47', '53'] },
                { problema: '8 x 8 = ?', respostaCorreta: '64', opcoes: ['64', '66', '62', '68'] },
                { problema: '9 x 7 = ?', respostaCorreta: '63', opcoes: ['63', '65', '61', '67'] },
                { problema: '7 x 9 = ?', respostaCorreta: '63', opcoes: ['63', '65', '61', '67'] }
            ],
            dificil: [
                { problema: '12 x 11 = ?', respostaCorreta: '132', opcoes: ['132', '121', '143', '122'] },
                { problema: '15 x 14 = ?', respostaCorreta: '210', opcoes: ['210', '200', '220', '195'] },
                { problema: '13 x 12 = ?', respostaCorreta: '156', opcoes: ['156', '146', '166', '136'] },
                { problema: '16 x 15 = ?', respostaCorreta: '240', opcoes: ['240', '230', '250', '220'] },
                { problema: '14 x 13 = ?', respostaCorreta: '182', opcoes: ['182', '172', '192', '162'] },
                { problema: '17 x 16 = ?', respostaCorreta: '272', opcoes: ['272', '262', '282', '252'] },
                { problema: '18 x 17 = ?', respostaCorreta: '306', opcoes: ['306', '296', '316', '286'] },
                { problema: '19 x 18 = ?', respostaCorreta: '342', opcoes: ['342', '332', '352', '322'] },
                { problema: '20 x 19 = ?', respostaCorreta: '380', opcoes: ['380', '370', '390', '360'] },
                { problema: '21 x 20 = ?', respostaCorreta: '420', opcoes: ['420', '410', '430', '400'] }
            ]
        },
        divisao: {
            facil: [
                { problema: '6 ÷ 2 = ?', respostaCorreta: '3', opcoes: ['3', '4', '2', '5'] },
                { problema: '8 ÷ 4 = ?', respostaCorreta: '2', opcoes: ['2', '3', '4', '1'] },
                { problema: '9 ÷ 3 = ?', respostaCorreta: '3', opcoes: ['3', '4', '2', '5'] },
                { problema: '10 ÷ 2 = ?', respostaCorreta: '5', opcoes: ['5', '6', '4', '7'] },
                { problema: '12 ÷ 4 = ?', respostaCorreta: '3', opcoes: ['3', '4', '2', '5'] },
                { problema: '15 ÷ 3 = ?', respostaCorreta: '5', opcoes: ['5', '6', '4', '7'] },
                { problema: '16 ÷ 4 = ?', respostaCorreta: '4', opcoes: ['4', '5', '3', '6'] },
                { problema: '18 ÷ 6 = ?', respostaCorreta: '3', opcoes: ['3', '4', '2', '5'] },
                { problema: '20 ÷ 5 = ?', respostaCorreta: '4', opcoes: ['4', '5', '3', '6'] },
                { problema: '24 ÷ 6 = ?', respostaCorreta: '4', opcoes: ['4', '5', '3', '6'] }
            ],
            medio: [
                { problema: '45 ÷ 9 = ?', respostaCorreta: '5', opcoes: ['5', '6', '4', '7'] },
                { problema: '72 ÷ 8 = ?', respostaCorreta: '9', opcoes: ['9', '8', '10', '7'] },
                { problema: '56 ÷ 7 = ?', respostaCorreta: '8', opcoes: ['8', '9', '7', '10'] },
                { problema: '63 ÷ 9 = ?', respostaCorreta: '7', opcoes: ['7', '8', '6', '9'] },
                { problema: '48 ÷ 6 = ?', respostaCorreta: '8', opcoes: ['8', '9', '7', '10'] },
                { problema: '54 ÷ 9 = ?', respostaCorreta: '6', opcoes: ['6', '7', '5', '8'] },
                { problema: '64 ÷ 8 = ?', respostaCorreta: '8', opcoes: ['8', '9', '7', '10'] },
                { problema: '81 ÷ 9 = ?', respostaCorreta: '9', opcoes: ['9', '8', '10', '7'] },
                { problema: '49 ÷ 7 = ?', respostaCorreta: '7', opcoes: ['7', '8', '6', '9'] },
                { problema: '36 ÷ 6 = ?', respostaCorreta: '6', opcoes: ['6', '7', '5', '8'] }
            ],
            dificil: [
                { problema: '144 ÷ 12 = ?', respostaCorreta: '12', opcoes: ['12', '14', '10', '16'] },
                { problema: '225 ÷ 15 = ?', respostaCorreta: '15', opcoes: ['15', '16', '14', '18'] },
                { problema: '196 ÷ 14 = ?', respostaCorreta: '14', opcoes: ['14', '15', '13', '16'] },
                { problema: '256 ÷ 16 = ?', respostaCorreta: '16', opcoes: ['16', '17', '15', '18'] },
                { problema: '289 ÷ 17 = ?', respostaCorreta: '17', opcoes: ['17', '18', '16', '19'] },
                { problema: '324 ÷ 18 = ?', respostaCorreta: '18', opcoes: ['18', '19', '17', '20'] },
                { problema: '361 ÷ 19 = ?', respostaCorreta: '19', opcoes: ['19', '20', '18', '21'] },
                { problema: '400 ÷ 20 = ?', respostaCorreta: '20', opcoes: ['20', '21', '19', '22'] },
                { problema: '441 ÷ 21 = ?', respostaCorreta: '21', opcoes: ['21', '22', '20', '23'] },
                { problema: '484 ÷ 22 = ?', respostaCorreta: '22', opcoes: ['22', '23', '21', '24'] }
            ]
        }
    };

    // Elementos do DOM
    const problema = document.getElementById('problema');
    const botoesOpcao = document.querySelectorAll('.opcao-btn');
    const confirmarBtn = document.getElementById('confirmar');
    const mensagemFeedback = document.getElementById('mensagem-feedback');
    const menuPrincipal = document.getElementById('menu-principal');
    const telaExercicio = document.getElementById('exercicio');
    const menuDificuldade = document.getElementById('menu-dificuldade');

    // Função para embaralhar array
    function embaralharArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Função para carregar novo exercício
    function carregarNovoExercicio() {
        if (!estadoJogo.temaEscolhido) return;

        // Determina a dificuldade
        const dificuldades = ['facil', 'medio', 'dificil'];
        const dificuldadeAtual = estadoJogo.dificuldadeEscolhida === 'aleatorio' 
            ? dificuldades[Math.floor(Math.random() * dificuldades.length)]
            : estadoJogo.dificuldadeEscolhida;

        // Seleciona exercício aleatório
        const exerciciosTema = exercicios[estadoJogo.temaEscolhido][dificuldadeAtual];
        const novoExercicio = exerciciosTema[Math.floor(Math.random() * exerciciosTema.length)];
        exercicioAtual = novoExercicio;

        // Atualiza o problema
        problema.textContent = exercicioAtual.problema;

        // Embaralha e atualiza as opções
        const opcoesEmbaralhadas = embaralharArray([...exercicioAtual.opcoes]);
        botoesOpcao.forEach((btn, index) => {
            btn.textContent = opcoesEmbaralhadas[index];
            btn.classList.remove('selecionada', 'correto', 'incorreto');
            btn.disabled = false;
        });

        // Reseta estados
        opcaoSelecionada = null;
        confirmarBtn.disabled = true;
        mensagemFeedback.textContent = '';
        mensagemFeedback.className = 'mensagem-feedback';
    }

    // Função para selecionar opção
    window.selecionarOpcao = function(botao) {
        botoesOpcao.forEach(btn => btn.classList.remove('selecionada'));
        botao.classList.add('selecionada');
        opcaoSelecionada = botao.textContent;
        confirmarBtn.disabled = false;
    }

    // Função para mostrar menu de dificuldade
    function mostrarMenuDificuldade() {
        menuPrincipal.classList.add('hidden');
        menuDificuldade.classList.remove('hidden');
    }

    // Função para iniciar jogo com dificuldade escolhida
    function iniciarJogoComDificuldade(dificuldade) {
        estadoJogo.dificuldadeEscolhida = dificuldade;
        estadoJogo.exerciciosCompletados = 0;
        menuDificuldade.classList.add('hidden');
        telaExercicio.classList.remove('hidden');
        carregarNovoExercicio();
    }

    // Event listeners para os botões de operação
    document.querySelectorAll('.operacao-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const operacao = btn.getAttribute('data-operacao');
            estadoJogo.temaEscolhido = operacao;
            document.getElementById('operacao-titulo').textContent = {
                adicao: 'Adição',
                subtracao: 'Subtração',
                multiplicacao: 'Multiplicação',
                divisao: 'Divisão'
            }[operacao];
            mostrarMenuDificuldade();
        });
    });

    // Event listeners para os botões de dificuldade
    document.querySelectorAll('.dificuldade-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const dificuldade = btn.getAttribute('data-dificuldade');
            iniciarJogoComDificuldade(dificuldade);
        });
    });

    // Event listener para voltar ao menu
    document.getElementById('voltar-menu').addEventListener('click', () => {
        telaExercicio.classList.add('hidden');
        menuPrincipal.classList.remove('hidden');
        estadoJogo.temaEscolhido = null;
        estadoJogo.dificuldadeEscolhida = 'aleatorio';
        estadoJogo.exerciciosCompletados = 0;
        esconderPlacar();
    });

    // Event listener para voltar do menu de dificuldade
    document.getElementById('voltar-dificuldade').addEventListener('click', () => {
        menuDificuldade.classList.add('hidden');
        menuPrincipal.classList.remove('hidden');
        estadoJogo.temaEscolhido = null;
    });

    // Função para verificar resposta
    window.verificarResposta = function() {
        if (!opcaoSelecionada) return;

        const botaoSelecionado = document.querySelector('.opcao-btn.selecionada');
        const acertou = opcaoSelecionada === exercicioAtual.respostaCorreta;

        // Desabilita todos os botões
        botoesOpcao.forEach(btn => btn.disabled = true);
        confirmarBtn.disabled = true;

        if (acertou) {
            // Atualiza pontuação
            estadoJogo.sequenciaAcertos++;
            const pontosGanhos = Math.min(
                25 * estadoJogo.multiplicador,
                estadoJogo.pontuacaoMaxima - estadoJogo.pontos
            );
            estadoJogo.pontos = Math.min(estadoJogo.pontos + pontosGanhos, estadoJogo.pontuacaoMaxima);

            if (estadoJogo.sequenciaAcertos % 3 === 0) {
                estadoJogo.multiplicador++;
            }

            // Feedback visual
            botaoSelecionado.classList.add('correto');
            mensagemFeedback.textContent = `Parabéns! +${pontosGanhos} pontos`;
            mensagemFeedback.className = 'mensagem-feedback sucesso';

            // Atualiza placar
            atualizarPlacar();

            // Incrementa exercícios completados
            estadoJogo.exerciciosCompletados++;

            // Verifica se completou todos os exercícios
            if (estadoJogo.exerciciosCompletados >= estadoJogo.totalExercicios) {
                setTimeout(() => {
                    alert('Parabéns! Você completou todos os exercícios deste nível!');
                    telaExercicio.classList.add('hidden');
                    menuPrincipal.classList.remove('hidden');
                    estadoJogo.temaEscolhido = null;
                    estadoJogo.dificuldadeEscolhida = 'aleatorio';
                    estadoJogo.exerciciosCompletados = 0;
                }, 500);
            } else if (estadoJogo.pontos >= estadoJogo.pontuacaoMaxima) {
                setTimeout(() => {
                    alert('Parabéns! Você atingiu a pontuação máxima!');
                    reiniciarJogo();
                }, 500);
            } else {
                // Carrega próximo exercício após 1 segundo
                setTimeout(carregarNovoExercicio, 1000);
            }
        } else {
            // Reseta multiplicador e sequência
            estadoJogo.sequenciaAcertos = 0;
            estadoJogo.multiplicador = 1;
            estadoJogo.pontos = Math.max(0, estadoJogo.pontos - 10);

            // Feedback visual
            botaoSelecionado.classList.add('incorreto');
            mensagemFeedback.textContent = 'Ops! Você perdeu 10 pontos';
            mensagemFeedback.className = 'mensagem-feedback erro';

            // Atualiza placar
            atualizarPlacar();

            // Permite nova tentativa após 1.5 segundos
            setTimeout(() => {
                botoesOpcao.forEach(btn => {
                    btn.disabled = false;
                    btn.classList.remove('incorreto');
                });
                confirmarBtn.disabled = true;
                opcaoSelecionada = null;
                mensagemFeedback.textContent = '';
            }, 1500);
        }
    }

    // Função para atualizar placar
    function atualizarPlacar() {
        document.getElementById('pontos').textContent = `${estadoJogo.pontos}/${estadoJogo.pontuacaoMaxima}`;
        document.getElementById('nivel').textContent = estadoJogo.nivel;
        document.getElementById('sequencia').textContent = estadoJogo.sequenciaAcertos;
    }

    // Função para reiniciar jogo
    function reiniciarJogo() {
        estadoJogo = {
            pontos: 0,
            pontuacaoMaxima: 250,
            nivel: 1,
            sequenciaAcertos: 0,
            multiplicador: 1,
            temaEscolhido: null,
            dificuldadeEscolhida: 'aleatorio',
            exerciciosCompletados: 0,
            totalExercicios: 5
        };
        atualizarPlacar();
        setTimeout(() => {
            telaExercicio.classList.add('hidden');
            menuPrincipal.classList.remove('hidden');
        }, 1500);
    }

    // Inicialização
    atualizarPlacar();
}); 
