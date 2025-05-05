// Variáveis globais
let estadoJogo = {
    pontos: 0,
    pontuacaoMaxima: 250,
    nivel: 1,
    sequenciaAcertos: 0,
    multiplicador: 1,
    temaEscolhido: null,
    dificuldadeEscolhida: 'aleatorio'
};

let exercicioAtual = null;
let opcaoSelecionada = null;

document.addEventListener('DOMContentLoaded', () => {
    // Banco de exercícios por tema e nível
    const exercicios = {
        adicao: {
            facil: [
                { problema: '2 + 2 = ?', respostaCorreta: '4', opcoes: ['4', '3', '5', '6'] },
                { problema: '3 + 1 = ?', respostaCorreta: '4', opcoes: ['4', '5', '3', '2'] },
                { problema: '5 + 3 = ?', respostaCorreta: '8', opcoes: ['8', '7', '9', '6'] }
            ],
            medio: [
                { problema: '12 + 15 = ?', respostaCorreta: '27', opcoes: ['27', '26', '28', '25'] },
                { problema: '24 + 18 = ?', respostaCorreta: '42', opcoes: ['42', '41', '43', '40'] }
            ],
            dificil: [
                { problema: '125 + 75 = ?', respostaCorreta: '200', opcoes: ['200', '190', '210', '195'] },
                { problema: '234 + 567 = ?', respostaCorreta: '801', opcoes: ['801', '791', '811', '781'] }
            ]
        },
        subtracao: {
            facil: [
                { problema: '5 - 2 = ?', respostaCorreta: '3', opcoes: ['3', '4', '2', '1'] },
                { problema: '8 - 3 = ?', respostaCorreta: '5', opcoes: ['5', '6', '4', '3'] }
            ],
            medio: [
                { problema: '25 - 12 = ?', respostaCorreta: '13', opcoes: ['13', '14', '12', '15'] },
                { problema: '45 - 28 = ?', respostaCorreta: '17', opcoes: ['17', '16', '18', '19'] }
            ],
            dificil: [
                { problema: '100 - 45 = ?', respostaCorreta: '55', opcoes: ['55', '54', '56', '53'] },
                { problema: '500 - 275 = ?', respostaCorreta: '225', opcoes: ['225', '215', '235', '245'] }
            ]
        },
        multiplicacao: {
            facil: [
                { problema: '2 × 3 = ?', respostaCorreta: '6', opcoes: ['6', '8', '4', '5'] },
                { problema: '4 × 2 = ?', respostaCorreta: '8', opcoes: ['8', '10', '6', '12'] }
            ],
            medio: [
                { problema: '6 × 7 = ?', respostaCorreta: '42', opcoes: ['42', '36', '49', '35'] },
                { problema: '8 × 9 = ?', respostaCorreta: '72', opcoes: ['72', '64', '81', '63'] }
            ],
            dificil: [
                { problema: '12 × 11 = ?', respostaCorreta: '132', opcoes: ['132', '121', '143', '122'] },
                { problema: '15 × 14 = ?', respostaCorreta: '210', opcoes: ['210', '200', '220', '195'] }
            ]
        },
        divisao: {
            facil: [
                { problema: '6 ÷ 2 = ?', respostaCorreta: '3', opcoes: ['3', '4', '2', '5'] },
                { problema: '8 ÷ 4 = ?', respostaCorreta: '2', opcoes: ['2', '3', '4', '1'] }
            ],
            medio: [
                { problema: '45 ÷ 9 = ?', respostaCorreta: '5', opcoes: ['5', '6', '4', '7'] },
                { problema: '72 ÷ 8 = ?', respostaCorreta: '9', opcoes: ['9', '8', '10', '7'] }
            ],
            dificil: [
                { problema: '144 ÷ 12 = ?', respostaCorreta: '12', opcoes: ['12', '14', '10', '16'] },
                { problema: '225 ÷ 15 = ?', respostaCorreta: '15', opcoes: ['15', '16', '14', '18'] }
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
                10 * estadoJogo.multiplicador,
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

            // Verifica pontuação máxima ou carrega próximo exercício
            if (estadoJogo.pontos >= estadoJogo.pontuacaoMaxima) {
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
            menuPrincipal.classList.add('hidden');
            telaExercicio.classList.remove('hidden');
            carregarNovoExercicio();
        });
    });

    // Event listener para voltar ao menu
    document.getElementById('voltar-menu').addEventListener('click', () => {
        telaExercicio.classList.add('hidden');
        menuPrincipal.classList.remove('hidden');
        estadoJogo.temaEscolhido = null;
    });

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
            dificuldadeEscolhida: 'aleatorio'
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