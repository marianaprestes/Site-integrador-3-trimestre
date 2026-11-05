/**
 * SOL + ÁGUA - JavaScript
 * Animações, interatividade e simuladores
 */

// ============ MENU MOBILE ============
function toggleMenu() {
    document.getElementById('mainNav').classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('mainNav').classList.remove('show');
        });
    });
});

// ============ ACESSIBILIDADE ============
function toggleA11yPanel() {
    document.getElementById('a11yPanel').classList.toggle('open');
}

function toggleClass(className) {
    document.body.classList.toggle(className);
    if (event && event.target) event.target.classList.toggle('active');
}

function toggleAnimation() {
    document.body.classList.toggle('reduce-motion');
    if (event && event.target) event.target.classList.toggle('active');
}

// ============ SCROLL REVEAL ============
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// ============ CURIOSIDADE ============
function checkCuriosity(isWrong) {
    const resultDiv = document.getElementById('curiosity-result');
    if (!resultDiv) return;
    
    resultDiv.style.display = 'block';
    if (isWrong) {
        resultDiv.innerHTML = "❌ <strong>Quase!</strong> Aumentar a intensidade (mantendo a frequência) apenas aumenta a <em>quantidade</em> de fótons, não a energia individual de cada um.";
        resultDiv.style.borderLeftColor = "#ef4444";
    } else {
        resultDiv.innerHTML = "✅ <strong>Perfeito!</strong> A energia individual do fóton depende apenas da frequência (E = h·f). Mais intensidade = mais fótons, mas cada um com a mesma energia.";
        resultDiv.style.borderLeftColor = "#10b981";
    }
}

// ============ ESPECTRO ============
function showSpectrumInfo(region) {
    const infoDiv = document.getElementById('spectrum-info');
    if (!infoDiv) return;

    document.querySelectorAll('.spectrum-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const data = {
        radio: { name: "Ondas de Rádio", freq: "3 kHz - 300 GHz", wavelength: "1 mm - 100 km", characteristics: "Baixa frequência, baixa energia", applications: "Rádio AM/FM, TV, satélites" },
        micro: { name: "Micro-ondas", freq: "300 MHz - 300 GHz", wavelength: "1 mm - 1 m", characteristics: "Aquece moléculas de água", applications: "Forno, Wi-Fi, radar, celular" },
        infrared: { name: "Infravermelho", freq: "300 GHz - 430 THz", wavelength: "700 nm - 1 mm", characteristics: "Radiação térmica invisível", applications: "Controles remotos, visão noturna" },
        visible: { name: "Luz Visível", freq: "430 THz - 750 THz", wavelength: "400 nm - 700 nm", characteristics: "Única faixa visível ao olho humano", applications: "Visão, fotografia, fibras ópticas" },
        uv: { name: "Ultravioleta", freq: "750 THz - 30 PHz", wavelength: "10 nm - 400 nm", characteristics: "Alta energia, causa queimaduras", applications: "Esterilização, bronzeamento" },
        xray: { name: "Raios X", freq: "30 PHz - 30 EHz", wavelength: "0.01 nm - 10 nm", characteristics: "Alta penetração em materiais", applications: "Radiografia, segurança" },
        gamma: { name: "Raios Gama", freq: "> 30 EHz", wavelength: "< 0.01 nm", characteristics: "Maior energia do espectro", applications: "Tratamento de câncer" }
    };

    const info = data[region];
    infoDiv.innerHTML = `
        <div class="spectrum-name">${info.name}</div>
        <div class="spectrum-grid">
            <div><strong>Frequência:</strong> ${info.freq}</div>
            <div><strong>Comprimento:</strong> ${info.wavelength}</div>
            <div><strong>Características:</strong> ${info.characteristics}</div>
            <div><strong>Aplicações:</strong> ${info.applications}</div>
        </div>
    `;
}

// ============ SIMULADOR: FÓTONS ============
function updatePhotonEnergy() {
    const freq = parseFloat(document.getElementById('freqSlider').value);
    document.getElementById('freqValue').innerText = freq.toFixed(1);
    
    const h = 6.626e-34;
    const f = freq * 1e14;
    const energyJ = h * f;
    const energyEv = energyJ / 1.602e-19;

    document.getElementById('energyResult').innerText = energyJ.toExponential(2) + ' J';
    document.getElementById('evResult').innerText = energyEv.toFixed(2) + ' eV';
}

// ============ SIMULADOR: FOTOELÉTRICO ============
function updatePhotoelectric() {
    const workFunction = parseFloat(document.getElementById('materialSelect').value);
    const photonEnergy = parseFloat(document.getElementById('photonEvSlider').value);
    const intensity = parseInt(document.getElementById('intensitySlider').value);
    
    document.getElementById('photonEvDisplay').innerText = photonEnergy.toFixed(1);
    document.getElementById('intensityDisplay').innerText = intensity;

    const resultDiv = document.getElementById('photoelectricResult');
    
    if (photonEnergy < workFunction) {
        resultDiv.innerHTML = `
            <div style="color: #ef4444; font-size: 2rem; margin-bottom: 0.5rem;">⛔</div>
            <strong>Sem Emissão</strong>
            <p style="margin-top: 0.5rem;">Energia do fóton (${photonEnergy.toFixed(1)} eV) < Função trabalho (${workFunction} eV).</p>
            <p style="font-size: 0.85rem; color: #666;">Mesmo aumentando a intensidade, não haverá emissão.</p>
        `;
    } else {
        const kineticEnergy = photonEnergy - workFunction;
        const electronCount = Math.floor(intensity / 10);
        resultDiv.innerHTML = `
            <div style="color: #10b981; font-size: 2rem; margin-bottom: 0.5rem;">⚡</div>
            <strong>Elétrons Emitidos!</strong>
            <div class="result-row" style="margin-top: 1rem;"><span class="result-label">Energia Cinética</span><span class="result-value">${kineticEnergy.toFixed(2)} eV</span></div>
            <div class="result-row"><span class="result-label">Elétrons emitidos</span><span class="result-value">~${electronCount}</span></div>
            <p style="font-size: 0.85rem; color: #666; margin-top: 0.5rem;">E<sub>c</sub> = ${photonEnergy.toFixed(1)} - ${workFunction}</p>
        `;
    }
}

// ============ SIMULADOR: FREQUÊNCIA DE CORTE ============
function updateCutoffSimulator() {
    const workFunction = parseFloat(document.getElementById('cutoffMaterial').value);
    const photonEnergy = parseFloat(document.getElementById('cutoffPhotonSlider').value);
    
    document.getElementById('cutoffPhotonDisplay').innerText = photonEnergy.toFixed(1);

    const h = 6.626e-34;
    const phi = workFunction * 1.602e-19;
    const cutoffFreq = phi / h;

    const resultDiv = document.getElementById('cutoffResult');
    
    if (photonEnergy < workFunction) {
        resultDiv.innerHTML = `
            <div style="color: #ef4444; font-size: 1.5rem;">⛔ Energia insuficiente</div>
            <div class="result-row" style="margin-top: 1rem;"><span class="result-label">Freq. de corte</span><span class="result-value">${cutoffFreq.toExponential(2)} Hz</span></div>
            <p style="margin-top: 0.5rem; font-size: 0.9rem;">Nenhuma emissão ocorrerá.</p>
        `;
    } else {
        const kineticEnergy = photonEnergy - workFunction;
        resultDiv.innerHTML = `
            <div style="color: #10b981; font-size: 1.5rem;">⚡ Emissão ocorrendo!</div>
            <div class="result-row" style="margin-top: 1rem;"><span class="result-label">Freq. de corte</span><span class="result-value">${cutoffFreq.toExponential(2)} Hz</span></div>
            <div class="result-row"><span class="result-label">Energia cinética</span><span class="result-value">${kineticEnergy.toFixed(2)} eV</span></div>
        `;
    }
}

// ============ SIMULADOR: PAINEL SOLAR ============
function updateSolarPanel() {
    const intensity = parseFloat(document.getElementById('solarIntensity').value);
    const temp = parseFloat(document.getElementById('panelTemp').value);
    const area = parseFloat(document.getElementById('panelArea').value);
    const efficiency = parseFloat(document.getElementById('panelEff').value);
    
    document.getElementById('solarIntensityDisplay').innerText = intensity;
    document.getElementById('panelTempDisplay').innerText = temp;
    document.getElementById('panelAreaDisplay').innerText = area.toFixed(1);
    document.getElementById('panelEffDisplay').innerText = efficiency;

    const solarPower = intensity * area;
    const tempFactor = 1 - (temp - 25) * 0.004;
    const electricalPower = solarPower * (efficiency / 100) * tempFactor;
    const voltage = 30 + (intensity / 1000) * 10;
    const current = electricalPower / voltage;

    document.getElementById('solarPanelResult').innerHTML = `
        <div class="result-row"><span class="result-label">Potência Solar</span><span class="result-value">${solarPower.toFixed(0)} W</span></div>
        <div class="result-row"><span class="result-label">Fator Temp.</span><span class="result-value">${(tempFactor * 100).toFixed(1)}%</span></div>
        <div class="result-row"><span class="result-label"><strong>Potência Elétrica</strong></span><span class="result-value"><strong>${electricalPower.toFixed(1)} W</strong></span></div>
        <div class="result-row"><span class="result-label">Tensão</span><span class="result-value">${voltage.toFixed(1)} V</span></div>
        <div class="result-row"><span class="result-label">Corrente</span><span class="result-value">${current.toFixed(2)} A</span></div>
    `;
}

// ============ SIMULADOR: PISCINA ============
function calculatePoolHeat() {
    const volume = parseFloat(document.getElementById('poolVolume').value);
    const tInit = parseFloat(document.getElementById('tempInit').value);
    const tFinal = parseFloat(document.getElementById('tempFinal').value);
    const heatingType = document.getElementById('heatingType').value;
    const hasCover = document.getElementById('thermalCover').checked;
    const resultDiv = document.getElementById('poolResult');

    if (tFinal <= tInit) {
        resultDiv.innerHTML = "<div style='color: #ef4444;'>⚠️ Temperatura desejada deve ser maior que a inicial.</div>";
        return;
    }

    const m = volume;
    const c = 4186;
    const deltaT = tFinal - tInit;
    const qJoules = m * c * deltaT;
    const qKwh = qJoules / 3600000;
    const lossFactor = hasCover ? 1.1 : 1.3;
    const qWithLoss = qKwh * lossFactor;

    let timeEstimate = "", costEstimate = "";
    if (heatingType === 'thermal') {
        timeEstimate = "6-8 horas de sol direto";
        costEstimate = "Custo operacional muito baixo";
    } else if (heatingType === 'photovoltaic') {
        timeEstimate = "Depende da potência do sistema";
        costEstimate = `R$ ${(qWithLoss * 0.80).toFixed(2)}`;
    } else {
        timeEstimate = "4-6 horas";
        costEstimate = `R$ ${(qWithLoss * 0.80).toFixed(2)}`;
    }

    resultDiv.innerHTML = `
        <div class="result-row"><span class="result-label">ΔT</span><span class="result-value">${deltaT} °C</span></div>
        <div class="result-row"><span class="result-label">Energia Ideal</span><span class="result-value">${qKwh.toFixed(1)} kWh</span></div>
        <div class="result-row"><span class="result-label">Com Perdas</span><span class="result-value">${qWithLoss.toFixed(1)} kWh</span></div>
        <div class="result-row"><span class="result-label"><strong>Tempo</strong></span><span class="result-value"><strong>${timeEstimate}</strong></span></div>
        <div class="result-row"><span class="result-label">Custo estimado</span><span class="result-value">${costEstimate}</span></div>
    `;
}

// ============ SIMULADOR: AUTOMAÇÃO ============
function checkAutomation() {
    const temp = parseInt(document.getElementById('simTemp').innerText);
    const hasFlow = document.getElementById('simFlow').checked;
    const targetTemp = 28;
    const resultDiv = document.getElementById('automationResult');

    if (!hasFlow) {
        resultDiv.innerHTML = `<div style="color: #ef4444;"><strong>🚫 ALERTA</strong><br>Sem fluxo! Aquecimento BLOQUEADO.</div>`;
    } else if (temp < targetTemp) {
        resultDiv.innerHTML = `<div style="color: #10b981;"><strong>✅ ATIVO</strong><br>Temp. ${temp}°C < ${targetTemp}°C. Aquecimento LIGADO.</div>`;
    } else {
        resultDiv.innerHTML = `<div style="color: #7c3aed;"><strong>⏸️ EM ESPERA</strong><br>Temp. ideal atingida (${temp}°C). Aquecimento DESLIGADO.</div>`;
    }
}

// ============ CALCULADORA DE ECONOMIA ============
function calculateSavings() {
    const consumption = parseFloat(document.getElementById('monthlyConsumption').value);
    const tariff = parseFloat(document.getElementById('energyTariff').value);
    const percentage = parseFloat(document.getElementById('solarPercentage').value);

    const solarEnergy = consumption * (percentage / 100);
    const monthlySavings = solarEnergy * tariff;
    const annualSavings = monthlySavings * 12;

    document.getElementById('savingsResult').innerHTML = `
        <div class="result-row"><span class="result-label">Energia Solar</span><span class="result-value">${solarEnergy.toFixed(0)} kWh/mês</span></div>
        <div class="result-row"><span class="result-label">Economia Mensal</span><span class="result-value">R$ ${monthlySavings.toFixed(2)}</span></div>
        <div class="result-row"><span class="result-label"><strong>Economia Anual</strong></span><span class="result-value"><strong>R$ ${annualSavings.toFixed(2)}</strong></span></div>
    `;
}

// ============ GLOSSÁRIO ============
function searchGlossary() {
    const searchTerm = document.getElementById('glossarySearch').value.toLowerCase();
    document.querySelectorAll('.glossary-item').forEach(item => {
        item.style.display = item.textContent.toLowerCase().includes(searchTerm) ? 'block' : 'none';
    });
}

// ============ QUIZ ============
const quizData = [
    { question: "O que é um fóton?", options: ["Partícula com carga negativa", "Pacote de energia da radiação eletromagnética", "Molécula da luz solar", "Tipo de semicondutor"], correct: 1, feedback: "O fóton é o quantum de energia da radiação." },
    { question: "O que determina a energia de um fóton?", options: ["Intensidade", "Temperatura", "Frequência", "Massa"], correct: 2, feedback: "E = h·f — energia proporcional à frequência." },
    { question: "O que é o efeito fotoelétrico?", options: ["Calor em luz", "Emissão de elétrons pela luz", "Eletricidade em química", "Aquecimento de metal"], correct: 1, feedback: "Emissão de elétrons quando a luz atinge um material." },
    { question: "Material usado em células fotovoltaicas?", options: ["Madeira", "Plástico", "Silício", "Borracha"], correct: 2, feedback: "O silício é o semicondutor mais usado." },
    { question: "Função do sensor de temperatura?", options: ["Medir luminosidade", "Identificar temperatura", "Produzir energia", "Armazenar eletricidade"], correct: 1, feedback: "Mede temperatura e envia ao microcontrolador." },
    { question: "Aumentar intensidade da luz (frequência constante) no efeito fotoelétrico?", options: ["Aumenta energia cinética", "Diminui freq. de corte", "Aumenta quantidade de elétrons", "Anula função trabalho"], correct: 2, feedback: "Mais fótons = mais elétrons emitidos." },
    { question: "Frequência abaixo da frequência de corte?", options: ["Elétrons emitidos devagar", "Sem emissão", "Função trabalho aumenta", "Luz vira calor"], correct: 1, feedback: "Energia insuficiente para liberar elétrons." },
    { question: "Função do inversor?", options: ["Aquecer água", "Converter CC em CA", "Aumentar frequência", "Medir temperatura"], correct: 1, feedback: "Converte corrente contínua em alternada." },
    { question: "Diferença entre térmica e fotovoltaica?", options: ["Térmica usa eletricidade", "Fotovoltaica aquece água", "Térmica aquece, fotovoltaica gera eletricidade", "Iguais"], correct: 2, feedback: "Térmica = calor, Fotovoltaica = eletricidade." },
    { question: "Função da junção p-n?", options: ["Armazenar água", "Separar portadores de carga", "Aumentar temperatura", "Impedir absorção"], correct: 1, feedback: "Cria campo elétrico que separa cargas." },
    { question: "Luz com maior frequência tem fótons com?", options: ["Mais energia", "Mesma energia", "Menos energia", "Frequência não importa"], correct: 0, feedback: "Maior frequência = maior energia." },
    { question: "Piscina 22°C → 28°C. Variação?", options: ["4°C", "5°C", "6°C", "10°C"], correct: 2, feedback: "ΔT = 28 - 22 = 6°C." },
    { question: "Sombra no painel fotovoltaico?", options: ["Produção diminui", "Produção dobra", "Frequência aumenta", "Função trabalho some"], correct: 0, feedback: "Sombra reduz radiação e produção." },
    { question: "Por que bomba de calor é eficiente?", options: ["Cria energia", "Transforma luz em calor", "Transfere calor do ambiente", "Sem perdas"], correct: 2, feedback: "Transfere calor, não cria." },
    { question: "Sem fluxo de água no sistema?", options: ["Aumentar potência", "Manter ligado", "Bloquear e alertar", "Desligar sensores"], correct: 2, feedback: "Segurança: bloquear para evitar danos." }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const q = quizData[currentQuestion];
    document.getElementById('questionText').innerText = q.question;
    document.getElementById('currentQ').innerText = currentQuestion + 1;
    document.getElementById('totalQ').innerText = quizData.length;
    document.getElementById('progressFill').style.width = ((currentQuestion / quizData.length) * 100) + '%';
    
    const optionsDiv = document.getElementById('optionsContainer');
    optionsDiv.innerHTML = '';
    document.getElementById('feedbackText').innerText = '';
    document.getElementById('feedbackText').style.background = 'transparent';
    document.getElementById('nextBtn').style.display = 'none';

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
    
    options.forEach(opt => opt.disabled = true);

    if (selectedIndex === q.correct) {
        btnElement.classList.add('correct');
        document.getElementById('feedbackText').innerHTML = `✅ ${q.feedback}`;
        document.getElementById('feedbackText').style.background = 'rgba(16, 185, 129, 0.2)';
        score++;
    } else {
        btnElement.classList.add('incorrect');
        if (options[q.correct]) options[q.correct].classList.add('correct');
        document.getElementById('feedbackText').innerHTML = `❌ ${q.feedback}`;
        document.getElementById('feedbackText').style.background = 'rgba(239, 68, 68, 0.2)';
    }
    
    document.getElementById('nextBtn').style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        document.getElementById('quizContainer').style.display = 'none';
        document.getElementById('quizResult').style.display = 'block';
        document.getElementById('finalScore').innerText = `${score} de ${quizData.length}`;
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('quizResult').style.display = 'none';
    loadQuestion();
}

// ============ INICIALIZAÇÃO ============
document.addEventListener('DOMContentLoaded', () => {
    updatePhotonEnergy();
    updatePhotoelectric();
    updateCutoffSimulator();
    updateSolarPanel();
    checkAutomation();
    loadQuestion();
});
