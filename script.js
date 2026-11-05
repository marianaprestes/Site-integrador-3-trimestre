/**
 * SOL + ÁGUA - Projeto Integrador CEP
 * Arquivo de Scripts (script.js)
 */

// ==========================================
// 1. NAVEGAÇÃO E UI
// ==========================================

function showSection(sectionId) {
    document.querySelectorAll('main section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(sectionId)) {
            link.classList.add('active');
        }
    });

    const navMenu = document.getElementById('mainNav');
    if (navMenu) navMenu.classList.remove('show');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMenu() {
    const navMenu = document.getElementById('mainNav');
    if (navMenu) navMenu.classList.toggle('show');
}

// ==========================================
// 2. ACESSIBILIDADE
// ==========================================

function toggleA11yPanel() {
    const panel = document.getElementById('a11yPanel');
    if (panel) panel.classList.toggle('open');
}

function toggleClass(className) {
    document.body.classList.toggle(className);
    if (event && event.target) {
        event.target.classList.toggle('active');
    }
}

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
// 3. CURIOSIDADE INTERATIVA
// ==========================================

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

// ==========================================
// 4. ESPECTRO ELETROMAGNÉTICO
// ==========================================

function showSpectrumInfo(region) {
    const infoDiv = document.getElementById('spectrum-info');
    if (!infoDiv) return;

    const data = {
        radio: {
            name: "Ondas de Rádio",
            freq: "3 kHz - 300 GHz",
            wavelength: "1 mm - 100 km",
            characteristics: "Baixa frequência, baixa energia",
            applications: "Rádio AM/FM, TV, comunicação por satélite"
        },
        micro: {
            name: "Micro-ondas",
            freq: "300 MHz - 300 GHz",
            wavelength: "1 mm - 1 m",
            characteristics: "Capaz de aquecer moléculas de água",
            applications: "Forno micro-ondas, Wi-Fi, radar, telefonia celular"
        },
        infrared: {
            name: "Infravermelho",
            freq: "300 GHz - 430 THz",
            wavelength: "700 nm - 1 mm",
            characteristics: "Radiação térmica, invisível ao olho humano",
            applications: "Controles remotos, visão noturna, aquecimento"
        },
        visible: {
            name: "Luz Visível",
            freq: "430 THz - 750 THz",
            wavelength: "400 nm - 700 nm",
            characteristics: "Única faixa visível ao olho humano",
            applications: "Visão humana, fotografia, fibras ópticas"
        },
        uv: {
            name: "Ultravioleta",
            freq: "750 THz - 30 PHz",
            wavelength: "10 nm - 400 nm",
            characteristics: "Alta energia, pode causar queimaduras",
            applications: "Esterilização, bronzeamento, detecção de fraudes"
        },
        xray: {
            name: "Raios X",
            freq: "30 PHz - 30 EHz",
            wavelength: "0.01 nm - 10 nm",
            characteristics: "Alta penetração em materiais",
            applications: "Radiografia médica, segurança aeroportuária"
        },
        gamma: {
            name: "Raios Gama",
            freq: "> 30 EHz",
            wavelength: "< 0.01 nm",
            characteristics: "Maior energia do espectro, altamente penetrante",
            applications: "Tratamento de câncer, esterilização de alimentos"
        }
    };

    const info = data[region];
    infoDiv.innerHTML = `
        <strong>${info.name}</strong><br>
        Frequência: ${info.freq}<br>
        Comprimento de onda: ${info.wavelength}<br>
        Características: ${info.characteristics}<br>
        Aplicações: ${info.applications}
    `;
}

// ==========================================
// 5. SIMULADOR: ENERGIA DOS FÓTONS
// ==========================================

function updatePhotonEnergy() {
    const freqSlider = document.getElementById('freqSlider');
    if (!freqSlider) return;

    const freq = parseFloat(freqSlider.value);
    const freqDisplay = document.getElementById('freqValue');
    const energyResult = document.getElementById('energyResult');
    const evResult = document.getElementById('evResult');

    if (freqDisplay) freqDisplay.innerText = freq.toFixed(1);
    
    const h = 6.626e-34;
    const f = freq * 1e14;
    const energyJ = h * f;
    const energyEv = energyJ / 1.602e-19;

    if (energyResult) energyResult.innerText = energyJ.toExponential(2);
    if (evResult) energyResult.innerText = energyEv.toFixed(2);
}

// ==========================================
// 6. SIMULADOR: EFEITO FOTOELÉTRICO
// ==========================================

function updatePhotoelectric() {
    const materialSelect = document.getElementById('materialSelect');
    const photonEvSlider = document.getElementById('photonEvSlider');
    const intensitySlider = document.getElementById('intensitySlider');
    const photonEvDisplay = document.getElementById('photonEvDisplay');
    const intensityDisplay = document.getElementById('intensityDisplay');
    const resultDiv = document.getElementById('photoelectricResult');

    if (!materialSelect || !photonEvSlider || !resultDiv) return;

    const workFunction = parseFloat(materialSelect.value);
    const photonEnergy = parseFloat(photonEvSlider.value);
    const intensity = parseInt(intensitySlider.value);
    
    if (photonEvDisplay) photonEvDisplay.innerText = photonEnergy.toFixed(1);
    if (intensityDisplay) intensityDisplay.innerText = intensity;

    if (photonEnergy < workFunction) {
        resultDiv.innerHTML = `
            <span style="color: #ef4444; font-size: 2rem;">⛔</span>
            <strong>Sem Emissão de Elétrons</strong>
            <p>A energia do fóton (${photonEnergy.toFixed(1)} eV) é menor que a função trabalho do material (${workFunction} eV).</p>
            <p style="font-size: 0.9rem; margin-top: 0.5rem;">Mesmo aumentando a intensidade, não haverá emissão.</p>
        `;
    } else {
        const kineticEnergy = photonEnergy - workFunction;
        const electronCount = Math.floor(intensity / 10);
        resultDiv.innerHTML = `
            <span style="color: #22c55e; font-size: 2rem;">⚡</span>
            <strong>Elétrons Emitidos!</strong>
            <p>Energia Cinética Máxima (E<sub>c</sub>): <strong>${kineticEnergy.toFixed(2)} eV</strong></p>
            <p>Quantidade de elétrons emitidos: <strong>~${electronCount}</strong> (proporcional à intensidade)</p>
            <p style="font-size: 0.9rem; margin-top: 0.5rem;">(E<sub>c</sub> = ${photonEnergy.toFixed(1)} - ${workFunction})</p>
        `;
    }
}

// ==========================================
// 7. SIMULADOR: FREQUÊNCIA DE CORTE
// ==========================================

function updateCutoffSimulator() {
    const materialSelect = document.getElementById('cutoffMaterial');
    const photonSlider = document.getElementById('cutoffPhotonSlider');
    const photonDisplay = document.getElementById('cutoffPhotonDisplay');
    const resultDiv = document.getElementById('cutoffResult');

    if (!materialSelect || !photonSlider || !resultDiv) return;

    const workFunction = parseFloat(materialSelect.value);
    const photonEnergy = parseFloat(photonSlider.value);
    
    if (photonDisplay) photonDisplay.innerText = photonEnergy.toFixed(1);

    // Calcular frequência de corte
    const h = 6.626e-34;
    const phi = workFunction * 1.602e-19; // Converter eV para Joules
    const cutoffFreq = phi / h;

    if (photonEnergy < workFunction) {
        resultDiv.innerHTML = `
            <span style="color: #ef4444;">⛔</span>
            <strong>Energia insuficiente!</strong>
            <p>Frequência de corte: ${cutoffFreq.toExponential(2)} Hz</p>
            <p>Energia do fóton (${photonEnergy.toFixed(1)} eV) < Função trabalho (${workFunction} eV)</p>
            <p>Nenhuma emissão de elétrons ocorrerá.</p>
        `;
    } else {
        const kineticEnergy = photonEnergy - workFunction;
        resultDiv.innerHTML = `
            <span style="color: #22c55e;">⚡</span>
            <strong>Emissão ocorrendo!</strong>
            <p>Frequência de corte: ${cutoffFreq.toExponential(2)} Hz</p>
            <p>Energia do fóton (${photonEnergy.toFixed(1)} eV) > Função trabalho (${workFunction} eV)</p>
            <p>Energia cinética dos elétrons: <strong>${kineticEnergy.toFixed(2)} eV</strong></p>
        `;
    }
}

// ==========================================
// 8. SIMULADOR: PAINEL SOLAR
// ==========================================

function updateSolarPanel() {
    const intensity = parseFloat(document.getElementById('solarIntensity').value);
    const temp = parseFloat(document.getElementById('panelTemp').value);
    const area = parseFloat(document.getElementById('panelArea').value);
    const efficiency = parseFloat(document.getElementById('panelEff').value);
    
    const intensityDisplay = document.getElementById('solarIntensityDisplay');
    const tempDisplay = document.getElementById('panelTempDisplay');
    const areaDisplay = document.getElementById('panelAreaDisplay');
    const effDisplay = document.getElementById('panelEffDisplay');
    const resultDiv = document.getElementById('solarPanelResult');

    if (intensityDisplay) intensityDisplay.innerText = intensity;
    if (tempDisplay) tempDisplay.innerText = temp;
    if (areaDisplay) areaDisplay.innerText = area.toFixed(1);
    if (effDisplay) effDisplay.innerText = efficiency;

    // Cálculo simplificado
    const solarPower = intensity * area; // W
    const tempFactor = 1 - (temp - 25) * 0.004; // Perda de 0.4% por grau acima de 25°C
    const electricalPower = solarPower * (efficiency / 100) * tempFactor;
    const voltage = 30 + (intensity / 1000) * 10; // Estimativa simplificada
    const current = electricalPower / voltage;

    resultDiv.innerHTML = `
        <strong>Resultados Estimados:</strong>
        <hr style="border-color: var(--border); margin: 0.5rem 0;">
        <p>Potência Solar Recebida: <strong>${solarPower.toFixed(0)} W</strong></p>
        <p>Fator de Temperatura: <strong>${(tempFactor * 100).toFixed(1)}%</strong></p>
        <p style="font-size: 1.2rem; color: var(--accent); margin-top: 0.5rem;">Potência Elétrica: <strong>${electricalPower.toFixed(1)} W</strong></p>
        <p>Tensão estimada: ${voltage.toFixed(1)} V</p>
        <p>Corrente estimada: ${current.toFixed(2)} A</p>
        <p style="font-size: 0.85rem; margin-top: 0.5rem; color: #aaa;">*Simulação simplificada</p>
    `;
}

// ==========================================
// 9. SIMULADOR: AQUECIMENTO DA PISCINA
// ==========================================

function calculatePoolHeat() {
    const volume = parseFloat(document.getElementById('poolVolume').value);
    const tInit = parseFloat(document.getElementById('tempInit').value);
    const tFinal = parseFloat(document.getElementById('tempFinal').value);
    const tAmbient = parseFloat(document.getElementById('tempAmbient').value);
    const heatingType = document.getElementById('heatingType').value;
    const hasCover = document.getElementById('thermalCover').checked;
    const resultDiv = document.getElementById('poolResult');

    if (!resultDiv) return;

    if (tFinal <= tInit) {
        resultDiv.innerHTML = "<span style='color: #ef4444;'>⚠️ A temperatura desejada deve ser maior que a inicial.</span>";
        return;
    }

    const m = volume;
    const c = 4186;
    const deltaT = tFinal - tInit;
    
    const qJoules = m * c * deltaT;
    const qKwh = qJoules / 3600000;

    // Fator de perdas
    let lossFactor = 1.3; // 30% de perdas padrão
    if (hasCover) lossFactor = 1.1; // 10% com capa

    const qWithLoss = qKwh * lossFactor;

    let timeEstimate = "";
    let costEstimate = "";

    if (heatingType === 'thermal') {
        timeEstimate = "Aproximadamente 6-8 horas de sol direto";
        costEstimate = "Custo operacional muito baixo (apenas bomba de circulação)";
    } else if (heatingType === 'photovoltaic') {
        timeEstimate = "Depende da potência do sistema fotovoltaico";
        costEstimate = `Custo estimado: R$ ${(qWithLoss * 0.80).toFixed(2)} (tarifa média R$ 0,80/kWh)`;
    } else {
        timeEstimate = "Aproximadamente 4-6 horas";
        costEstimate = `Custo estimado: R$ ${(qWithLoss * 0.80).toFixed(2)} (tarifa média R$ 0,80/kWh)`;
    }

    resultDiv.innerHTML = `
        <strong>Resultados:</strong>
        <hr style="border-color: var(--border); margin: 0.5rem 0;">
        <p>Variação de Temperatura (ΔT): <strong>${deltaT} °C</strong></p>
        <p>Energia Ideal (Q): <strong>${qKwh.toFixed(1)} kWh</strong></p>
        <p>Energia com Perdas: <strong>${qWithLoss.toFixed(1)} kWh</strong></p>
        <p style="font-size: 1.2rem; color: var(--accent); margin-top: 0.5rem;">Tempo estimado: ${timeEstimate}</p>
        <p>${costEstimate}</p>
        <p style="font-size: 0.85rem; margin-top: 1rem; color: #aaa;">*Estimativa simplificada</p>
    `;
}

// ==========================================
// 10. SIMULADOR: AUTOMAÇÃO
// ==========================================

function checkAutomation() {
    const tempDisplay = document.getElementById('simTemp');
    const flowCheckbox = document.getElementById('simFlow');
    const resultDiv = document.getElementById('automationResult');

    if (!tempDisplay || !flowCheckbox || !resultDiv) return;

    const temp = parseInt(tempDisplay.innerText);
    const hasFlow = flowCheckbox.checked;
    const targetTemp = 28;

    if (!hasFlow) {
        resultDiv.innerHTML = `<span style="color: #ef4444;">🚫 ALERTA DE SEGURANÇA: Sem fluxo de água! Aquecimento BLOQUEADO para evitar danos ao equipamento.</span>`;
    } else if (temp < targetTemp) {
        resultDiv.innerHTML = `<span style="color: #22c55e;">✅ Sistema ATIVO: Temperatura (${temp}°C) abaixo do alvo (${targetTemp}°C). Bomba de aquecimento LIGADA.</span>`;
    } else {
        resultDiv.innerHTML = `<span style="color: var(--accent);">⏸️ Sistema EM ESPERA: Temperatura ideal atingida (${temp}°C). Aquecimento DESLIGADO.</span>`;
    }
}

// ==========================================
// 11. CALCULADORA DE ECONOMIA
// ==========================================

function calculateSavings() {
    const consumption = parseFloat(document.getElementById('monthlyConsumption').value);
    const tariff = parseFloat(document.getElementById('energyTariff').value);
    const percentage = parseFloat(document.getElementById('solarPercentage').value);
    const resultDiv = document.getElementById('savingsResult');

    if (!resultDiv) return;

    const solarEnergy = consumption * (percentage / 100);
    const monthlySavings = solarEnergy * tariff;
    const annualSavings = monthlySavings * 12;

    resultDiv.innerHTML = `
        <strong>Estimativa de Economia:</strong>
        <hr style="border-color: var(--border); margin: 0.5rem 0;">
        <p>Energia Solar Mensal: <strong>${solarEnergy.toFixed(0)} kWh</strong></p>
        <p>Economia Mensal: <strong>R$ ${monthlySavings.toFixed(2)}</strong></p>
        <p style="font-size: 1.3rem; color: var(--accent); margin-top: 0.5rem;">Economia Anual: <strong>R$ ${annualSavings.toFixed(2)}</strong></p>
        <p style="font-size: 0.85rem; margin-top: 1rem; color: #aaa;">*Estimativa simplificada. Não considera custos de instalação.</p>
    `;
}

// ==========================================
// 12. GLOSSÁRIO
// ==========================================

function searchGlossary() {
    const searchTerm = document.getElementById('glossarySearch').value.toLowerCase();
    const items = document.querySelectorAll('.glossary-item');

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// ==========================================
// 13. QUIZ
// ==========================================

const quizData = [
    {
        question: "O que é um fóton?",
        options: ["Uma partícula com carga elétrica negativa", "Um pacote de energia associado à radiação eletromagnética", "Uma molécula presente na luz solar", "Um tipo de semicondutor"],
        correct: 1,
        feedback: "Correto! O fóton é o quantum de energia da radiação eletromagnética."
    },
    {
        question: "Qual grandeza determina a energia individual de um fóton?",
        options: ["Intensidade", "Temperatura", "Frequência", "Massa"],
        correct: 2,
        feedback: "Correto! Pela equação E = h·f, a energia é diretamente proporcional à frequência."
    },
    {
        question: "O que é o efeito fotoelétrico?",
        options: ["A transformação de calor em luz", "A emissão de elétrons de um material após a incidência de luz", "A transformação de eletricidade em energia química", "O aquecimento de um metal pela água"],
        correct: 1,
        feedback: "Exato! O efeito fotoelétrico é a emissão de elétrons quando a luz atinge um material."
    },
    {
        question: "Qual material é amplamente utilizado na fabricação de células fotovoltaicas?",
        options: ["Madeira", "Plástico", "Silício", "Borracha"],
        correct: 2,
        feedback: "Correto! O silício é o semicondutor mais utilizado em células solares."
    },
    {
        question: "Qual é a função de um sensor de temperatura?",
        options: ["Medir a luminosidade", "Identificar a temperatura de um ambiente ou objeto", "Produzir energia elétrica", "Armazenar eletricidade"],
        correct: 1,
        feedback: "Isso mesmo! O sensor de temperatura mede a temperatura e envia dados ao microcontrolador."
    },
    {
        question: "Se aumentarmos a intensidade da luz, mantendo sua frequência constante, o que acontece no efeito fotoelétrico?",
        options: ["A energia cinética máxima dos elétrons necessariamente aumenta", "A frequência de corte diminui", "A quantidade de elétrons emitidos pode aumentar", "A função trabalho desaparece"],
        correct: 2,
        feedback: "Correto! Mais intensidade significa mais fótons, logo mais elétrons podem ser emitidos, mas a energia cinética máxima não muda."
    },
    {
        question: "O que acontece quando a frequência da luz está abaixo da frequência de corte de um material?",
        options: ["Os elétrons são emitidos com baixa velocidade", "A emissão de elétrons não acontece", "A função trabalho aumenta automaticamente", "O material transforma a luz em calor obrigatoriamente"],
        correct: 1,
        feedback: "Exato! Se a energia do fóton for menor que a função trabalho, não há emissão."
    },
    {
        question: "Qual é a principal função do inversor em um sistema fotovoltaico?",
        options: ["Aquecer a água", "Transformar corrente contínua em corrente alternada", "Aumentar a frequência dos fótons", "Medir a temperatura dos painéis"],
        correct: 1,
        feedback: "Correto! O inversor converte CC (dos painéis) em CA (usada na rede e aparelhos)."
    },
    {
        question: "Qual é a principal diferença entre energia solar térmica e fotovoltaica?",
        options: ["A energia térmica utiliza apenas eletricidade", "A energia fotovoltaica produz calor diretamente na água", "A energia térmica aproveita a radiação para aquecer, enquanto a fotovoltaica a converte em eletricidade", "Não existe diferença entre elas"],
        correct: 2,
        feedback: "Isso mesmo! Térmica aquece diretamente, fotovoltaica produz eletricidade."
    },
    {
        question: "Qual é a função da junção p-n em uma célula fotovoltaica?",
        options: ["Armazenar água", "Auxiliar na separação dos portadores de carga", "Aumentar a temperatura do painel", "Impedir a absorção de fótons"],
        correct: 1,
        feedback: "Correto! A junção p-n cria um campo elétrico que separa elétrons e lacunas."
    },
    {
        question: "Uma luz possui frequência maior do que outra. O que podemos afirmar sobre seus fótons?",
        options: ["Os fótons da luz de maior frequência possuem mais energia", "Os fótons possuem necessariamente a mesma energia", "Os fótons da luz de maior frequência possuem menos energia", "A frequência não influencia a energia"],
        correct: 0,
        feedback: "Exato! Maior frequência = maior energia (E = h·f)."
    },
    {
        question: "Uma piscina possui temperatura de 22 °C, mas a temperatura desejada é 28 °C. Qual é a variação de temperatura necessária?",
        options: ["4 °C", "5 °C", "6 °C", "10 °C"],
        correct: 2,
        feedback: "Correto! ΔT = 28 - 22 = 6°C."
    },
    {
        question: "Se um painel fotovoltaico receber sombra em parte de sua superfície, o que poderá acontecer?",
        options: ["A produção elétrica poderá diminuir", "A produção sempre dobrará", "A frequência dos fótons aumentará", "A função trabalho do silício desaparecerá"],
        correct: 0,
        feedback: "Isso mesmo! O sombreamento reduz a radiação recebida e diminui a produção."
    },
    {
        question: "Por que uma bomba de calor pode fornecer mais energia térmica à piscina do que a energia elétrica que consome?",
        options: ["Porque cria energia", "Porque transforma toda a luz em calor", "Porque utiliza eletricidade para transferir calor do ambiente para a água", "Porque não possui perdas"],
        correct: 2,
        feedback: "Correto! A bomba de calor transfere calor, não o cria, por isso é mais eficiente."
    },
    {
        question: "Qual é a atitude mais segura quando um sensor identifica ausência de circulação de água em um sistema de aquecimento?",
        options: ["Aumentar a potência do aquecedor", "Manter o aquecimento ligado", "Bloquear o aquecimento e emitir um alerta", "Desligar todos os sensores"],
        correct: 2,
        feedback: "Exato! Sem fluxo, o aquecimento deve ser bloqueado para evitar superaquecimento e danos."
    },
    {
        question: "Qual cientista apresentou, em 1905, a explicação quântica do efeito fotoelétrico?",
        options: ["Isaac Newton", "Albert Einstein",
