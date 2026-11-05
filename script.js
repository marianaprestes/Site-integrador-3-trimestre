/**
 * SOL + ÁGUA - Projeto Integrador CEP
 * Arquivo de Scripts (script.js)
 * Controla navegação, simuladores, acessibilidade e quiz interativo.
 */

// ==========================================
// 1. NAVEGAÇÃO E UI
// ==========================================

/**
 * Alterna entre as seções do site (Single Page Application)
 * @param {string} sectionId - O ID da seção a ser exibida
 */
function showSection(sectionId) {
    // Esconde todas as seções
    document.querySelectorAll('main section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // Mostra a seção alvo com animação
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Atualiza o estado ativo no menu de navegação
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(sectionId)) {
            link.classList.add('active');
        }
    });

    // Fecha o menu mobile se estiver aberto
    const navMenu = document.getElementById('mainNav');
    if (navMenu) navMenu.classList.remove('show');
    
    // Rola suavemente para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Alterna a visibilidade do menu em dispositivos móveis
 */
function toggleMenu() {
    const navMenu = document.getElementById('mainNav');
    if (navMenu) navMenu.classList.toggle('show');
}


// ==========================================
// 2. ACESSIBILIDADE
// ==========================================

/**
 * Abre ou fecha o painel flutuante de acessibilidade
 */
function toggleA11yPanel() {
    const panel = document.getElementById('a11yPanel');
    if (panel) panel.classList.toggle('open');
}

/**
 * Adiciona ou remove uma classe de acessibilidade no body
 * @param {string} className - Nome da classe (ex: 'large-font', 'high-contrast')
 */
function toggleClass(className) {
    document.body.classList.toggle(className);
    // Atualiza o visual do botão toggle (se existir)
    if (event && event.target) {
        event.target.classList.toggle('active');
    }
}

/**
 * Desativa as transições/animações do site para usuários com sensibilidade ao movimento
 */
function toggleAnimation() {
    if (document.body.style.getPropertyValue('--transition') === 'none') {
        document.body.style.setProperty('--transition', 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)');
    } else {
        document.body.style.setProperty('--transition', 'none');
    }
    if (event && event.target) {
        event.target.classList.toggle('active');
    }
}


// ==========================================
// 3. SIMULADORES E INTERATIVIDADE
// ==========================================

/**
 * Verifica a resposta da curiosidade interativa da página inicial
 * @param {boolean} isWrong - Se a resposta escolhida está errada
 */
function checkCuriosity(isWrong) {
    const resultDiv = document.getElementById('curiosity-result');
    if (!resultDiv) return;
    
    resultDiv.style.display = 'block';
    if (isWrong) {
        resultDiv.innerHTML = "❌ <strong>Incorreto.</strong> Aumentar a intensidade (mantendo a frequência) apenas aumenta a <em>quantidade</em> de fótons, não a energia individual de cada um.";
        resultDiv.style.borderLeftColor = "#ef4444";
    } else {
        resultDiv.innerHTML = "✅ <strong>Correto!</strong> A energia individual do fóton depende apenas da frequência (E = h·f). Mais intensidade significa mais fótons, mas cada um tem a mesma energia.";
        resultDiv.style.borderLeftColor = "#22c55e";
    }
}

/**
 * Simulador 1: Calcula a energia do fóton com base na frequência
 */
function updatePhotonEnergy() {
    const freqSlider = document.getElementById('freqSlider');
    if (!freqSlider) return;

    const freq = parseFloat(freqSlider.value);
    const freqDisplay = document.getElementById('freqValue');
    const energyResult = document.getElementById('energyResult');
    const evResult = document.getElementById('evResult');

    if (freqDisplay) freqDisplay.innerText = freq.toFixed(1);
    
    // Constante de Planck (J·s)
    const h = 6.626e-34;
    // Frequência em Hz (o slider representa x10¹⁴)
    const f = freq * 1e14;
    // Energia em Joules
    const energyJ = h * f;
    // Conversão para Elétron-volt (1 eV = 1.602e-19 J)
    const energyEv = energyJ / 1.602e-19;

    if (energyResult) energyResult.innerText = energyJ.toExponential(2);
    if (evResult) evResult.innerText = energyEv.toFixed(2);
}

/**
 * Simulador 2: Efeito Fotoelétrico
 */
function updatePhotoelectric() {
    const materialSelect = document.getElementById('materialSelect');
    const photonEvSlider = document.getElementById('photonEvSlider');
    const photonEvDisplay = document.getElementById('photonEvDisplay');
    const resultDiv = document.getElementById('photoelectricResult');

    if (!materialSelect || !photonEvSlider || !resultDiv) return;

    const workFunction = parseFloat(materialSelect.value);
    const photonEnergy = parseFloat(photonEvSlider.value);
    
    if (photonEvDisplay) photonEvDisplay.innerText = photonEnergy.toFixed(1);

    if (photonEnergy < workFunction) {
        resultDiv.innerHTML = `
            <span style="color: #ef4444; font-size: 2rem;">⛔</span>
            <strong>Sem Emissão de Elétrons</strong>
            <p>A energia do fóton (${photonEnergy.toFixed(1)} eV) é menor que a função trabalho do material (${workFunction} eV).</p>
        `;
    } else {
        const kineticEnergy = photonEnergy - workFunction;
        resultDiv.innerHTML = `
            <span style="color: #22c55e; font-size: 2rem;">⚡</span>
            <strong>Elétrons Emitidos!</strong>
            <p>Energia Cinética Máxima (E<sub>c</sub>): <strong>${kineticEnergy.toFixed(2)} eV</strong></p>
            <p style="font-size: 0.9rem; margin-top: 0.5rem;">(E<sub>c</sub> = ${photonEnergy.toFixed(1)} - ${workFunction})</p>
        `;
    }
}

/**
 * Simulador 3: Cálculo de Aquecimento da Piscina
 */
function calculatePoolHeat() {
    const volumeInput = document.getElementById('poolVolume');
    const tempInitInput = document.getElementById('tempInit');
    const tempFinalInput = document.getElementById('tempFinal');
    const resultDiv = document.getElementById('poolResult');

    if (!volumeInput || !tempInitInput || !tempFinalInput || !resultDiv) return;

    const volume = parseFloat(volumeInput.value);
    const tInit = parseFloat(tempInitInput.value);
    const tFinal = parseFloat(tempFinalInput.value);
    
    if (tFinal <= tInit) {
        resultDiv.innerHTML = "<span style='color: #ef4444;'>⚠️ A temperatura desejada deve ser maior que a inicial.</span>";
        return;
    }

    // m (kg) = volume (L) * 1 kg/L (densidade da água)
    const m = volume;
    const c = 4186; // Calor específico da água em J/kg°C
    const deltaT = tFinal - tInit;
    
    const qJoules = m * c * deltaT;
    const qKwh = qJoules / 3600000; // 1 kWh = 3.600.000 J

    resultDiv.innerHTML = `
        <strong>Resultados Estimados:</strong>
        <hr style="border-color: var(--border); margin: 0.5rem 0;">
        <p>Variação de Temperatura (ΔT): <strong>${deltaT} °C</strong></p>
        <p>Energia Térmica (Q): <strong>${qJoules.toExponential(2)} J</strong></p>
        <p style="font-size: 1.3rem; color: var(--accent); margin-top: 0.5rem;">Equivalente a: <strong>${qKwh.toFixed(1)} kWh</strong></p>
        <p style="font-size: 0.8rem; margin-top: 1rem; color: #aaa;">*Valor ideal sem perdas térmicas (evaporação, convecção, etc.).</p>
    `;
}

/**
 * Simulador 4: Lógica de Automação (Robótica)
 */
function checkAutomation() {
    const tempDisplay = document.getElementById('simTemp');
    const flowCheckbox = document.getElementById('simFlow');
    const resultDiv = document.getElementById('automationResult');

    if (!tempDisplay || !flowCheckbox || !resultDiv) return;

    const temp = parseInt(tempDisplay.innerText);
    const hasFlow = flowCheckbox.checked;
    const targetTemp = 28; // Temperatura alvo definida no projeto

    if (!hasFlow) {
        resultDiv.innerHTML = `<span style="color: #ef4444;">🚫 ALERTA DE SEGURANÇA: Sem fluxo de água! Aquecimento BLOQUEADO para evitar danos ao equipamento.</span>`;
    } else if (temp < targetTemp) {
        resultDiv.innerHTML = `<span style="color: #22c55e;">✅ Sistema ATIVO: Temperatura abaixo do alvo (${targetTemp}°C). Bomba de aquecimento LIGADA.</span>`;
    } else {
        resultDiv.innerHTML = `<span style="color: var(--accent);">⏸️ Sistema EM ESPERA: Temperatura ideal atingida. Aquecimento DESLIGADO.</span>`;
    }
}


// ==========================================
// 4. QUIZ INTERATIVO
// ==========================================

const quizData = [
    {
        question: "O que determina a energia individual de um fóton?",
        options: ["A intensidade da luz", "A frequência da radiação", "A velocidade da luz", "A temperatura do ambiente"],
        correct: 1,
        feedback: "Correto! Pela equação E = h·f, a energia é diretamente proporcional à frequência."
    },
    {
        question: "No efeito fotoelétrico, o que acontece se a frequência da luz estiver abaixo da frequência de corte?",
        options: ["Os elétrons são emitidos lentamente", "Nenhum elétron é emitido, não importa a intensidade", "O material esquenta e derrete", "A função trabalho diminui"],
        correct: 1,
        feedback: "Exato! Se a energia do fóton (h·f) for menor que a função trabalho (φ), a emissão é impossível."
    },
    {
        question: "Qual é a principal função do inversor em um sistema fotovoltaico?",
        options: ["Aquecer a água diretamente", "Armazenar energia em baterias", "Converter corrente contínua (CC) em alternada (CA)", "Medir a temperatura do painel"],
        correct: 2,
        feedback: "Isso mesmo! A maioria das redes elétricas e aparelhos residenciais opera em corrente alternada."
    },
    {
        question: "Por que a capa térmica é importante para piscinas aquecidas?",
        options: ["Ela aquece a água ativamente", "Ela reduz drasticamente as perdas de calor por evaporação", "Ela gera eletricidade", "Ela filtra a água"],
        correct: 1,
        feedback: "Correto! A evaporação é a maior causa de perda de calor em piscinas, e a capa age como um isolante."
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const q = quizData[currentQuestion];
    const questionText = document.getElementById('questionText');
    const optionsDiv = document.getElementById('optionsContainer');
    const feedbackText = document.getElementById('feedbackText');
    const nextBtn = document.getElementById('nextBtn');

    if (!questionText || !optionsDiv) return;

    questionText.innerText = `Pergunta ${currentQuestion + 1}: ${q.question}`;
    optionsDiv.innerHTML = '';
    if (feedbackText) feedbackText.innerText = '';
    if (nextBtn) nextBtn.style.display = 'none';

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index, btn);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, btnElement) {
    const q = quizData[currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    const feedbackText = document.getElementById('feedbackText');
    const nextBtn = document.getElementById('nextBtn');
    
    // Desabilita todos os botões para evitar múltiplos cliques
    options.forEach(opt => opt.disabled = true);

    if (selectedIndex === q.correct) {
        btnElement.classList.add('correct');
        if (feedbackText) feedbackText.innerHTML = `<span style="color: #22c55e;">✅ ${q.feedback}</span>`;
        score++;
    } else {
        btnElement.classList.add('incorrect');
        if (options[q.correct]) options[q.correct].classList.add('correct');
        if (feedbackText) feedbackText.innerHTML = `<span style="color: #ef4444;">❌ Incorreto. ${q.feedback}</span>`;
    }
    
    if (nextBtn) nextBtn.style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        const quizContainer = document.getElementById('quizContainer');
        const quizResult = document.getElementById('quizResult');
        const finalScore = document.getElementById('finalScore');

        if (quizContainer) quizContainer.style.display = 'none';
        if (quizResult) quizResult.style.display = 'block';
        if (finalScore) finalScore.innerText = `${score} de ${quizData.length}`;
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    const quizContainer = document.getElementById('quizContainer');
    const quizResult = document.getElementById('quizResult');
    
    if (quizContainer) quizContainer.style.display = 'block';
    if (quizResult) quizResult.style.display = 'none';
    
    loadQuestion();
}


// ==========================================
// 5. INICIALIZAÇÃO
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa os simuladores com os valores padrão dos sliders
    updatePhotonEnergy();
    updatePhotoelectric();
    checkAutomation();
    loadQuestion();

    // Inicialização do Widget VLibras (Acessibilidade em Libras)
    if (typeof window.VLibras !== 'undefined') {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
    }
});
