/**
 * SOL + ÁGUA - JavaScript Completo
 * Turma 2°J - Colégio Estadual do Paraná
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

function toggleScreenReader() {
    document.body.classList.toggle('screen-reader-mode');
    if (event && event.target) event.target.classList.toggle('active');
    
    if (document.body.classList.contains('screen-reader-mode')) {
        speakText('Modo leitor de tela ativado. Navegue pelo site usando Tab.');
    }
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
    }
}

// ============ LIGHTBOX / ZOOM DE IMAGENS ============
document.addEventListener('DOMContentLoaded', () => {
    const zoomableImages = document.querySelectorAll('.zoomable');
    
    zoomableImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            const modal = document.getElementById('lightboxModal');
            const modalImg = document.getElementById('lightboxImg');
            const caption = document.getElementById('lightboxCaption');
            
            modal.classList.add('show');
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            caption.textContent = this.getAttribute('data-caption') || this.alt;
            
            // Audiodescrição automática se modo leitor ativo
            if (document.body.classList.contains('screen-reader-mode')) {
                speakText(this.getAttribute('data-caption') || this.alt);
            }
        });
    });
});

function closeLightbox() {
    document.getElementById('lightboxModal').classList.remove('show');
}

// Fechar com tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// ============ SCROLL REVEAL (FADE IN) ============
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
    
    // Cor equivalente
    let colorName = 'Infravermelho';
    if (freq >= 4.0 && freq < 4.8) colorName = 'Vermelho';
    else if (freq >= 4.8 && freq < 5.1) colorName = 'Laranja';
    else if (freq >= 5.1 && freq < 5.3) colorName = 'Amarelo';
    else if (freq >= 5.3 && freq < 5.9) colorName = 'Verde';
    else if (freq >= 5.9 && freq < 6.5) colorName = 'Azul';
    else if (freq >= 6.5 && freq < 7.0) colorName = 'Violeta';
    else if (freq >= 7.0) colorName = 'Ultravioleta';
    
    document.getElementById('colorResult').innerText = colorName;
    
    // Atualizar barra do espectro
    const barFill = document.getElementById('spectrumBarFill');
    if (barFill) {
        const percent = ((freq - 4) / 4) * 100;
        barFill.style.width = percent + '%';
    }
}

// ============ SIMULADOR: EFEITO FOTOELÉTRICO (VISUAL MELHORADO) ============
function updatePhotoelectric() {
    const workFunction = parseFloat(document.getElementById('materialSelect').value);
    const photonEnergy = parseFloat(document.getElementById('photonEvSlider').value);
    const intensity = parseInt(document.getElementById('intensitySlider').value);
    
    document.getElementById('photonEvDisplay').innerText = photonEnergy.toFixed(1);
    document.getElementById('intensityDisplay').innerText = intensity;

    const resultDiv = document.getElementById('photoelectricResult');
    const lightSource = document.getElementById('labLightSource');
    const electrons = document.querySelectorAll('.electron');
    
    // Ajustar intensidade visual da luz
    if (lightSource) {
        const glowIntensity = intensity / 100;
        lightSource.style.boxShadow = `0 0 ${40 + glowIntensity * 40}px rgba(251, 191, 36, ${0.4 + glowIntensity * 0.4})`;
    }
    
    if (photonEnergy < workFunction) {
        // Sem emissão - elétrons ficam parados
        electrons.forEach(e => {
            e.style.animation = 'none';
            e.style.background = '#3b82f6';
        });
        
        // RESPOSTA MAIS VISÍVEL E DESTACADA
        resultDiv.innerHTML = `
            <div class="photoelectric-result-highlight failure">
                <div style="font-size: 3.5rem; margin-bottom: 1rem;">⛔</div>
                <strong style="color: #ef4444; font-size: 1.6rem; display: block; margin-bottom: 1rem; font-weight: 800;">SEM EMISSÃO DE ELÉTRONS</strong>
                <div style="margin-top: 1rem; padding: 1.2rem; background: rgba(239, 68, 68, 0.15); border-radius: 12px; text-align: left; border: 2px solid rgba(239, 68, 68, 0.3);">
                    <p style="margin: 0.6rem 0; font-size: 1.1rem;"><strong>💡 Energia do fóton:</strong> ${photonEnergy.toFixed(1)} eV</p>
                    <p style="margin: 0.6rem 0; font-size: 1.1rem;"><strong>🧪 Função trabalho:</strong> ${workFunction} eV</p>
                    <p style="margin: 0.6rem 0; color: #ef4444; font-size: 1.1rem; font-weight: 700;"><strong>❌ Resultado:</strong> Energia insuficiente!</p>
                </div>
                <p style="margin-top: 1.2rem; font-size: 1rem; color: rgba(255,255,255,0.9); font-weight: 500;">⚠️ Mesmo aumentando a intensidade, não haverá emissão.</p>
            </div>
        `;
    } else {
        const kineticEnergy = photonEnergy - workFunction;
        const electronCount = Math.floor(intensity / 10);
        
        // Animação dos elétrons sendo emitidos
        electrons.forEach((e, i) => {
            if (i < electronCount) {
                e.style.animation = `electronEmit 1s infinite ${i * 0.2}s`;
                e.style.background = '#10b981';
            } else {
                e.style.animation = 'none';
                e.style.background = '#3b82f6';
            }
        });
        
        // RESPOSTA MAIS VISÍVEL E DESTACADA
        resultDiv.innerHTML = `
            <div class="photoelectric-result-highlight success">
                <div style="font-size: 3.5rem; margin-bottom: 1rem;">⚡</div>
                <strong style="color: #10b981; font-size: 1.6rem; display: block; margin-bottom: 1rem; font-weight: 800;">ELÉTRONS EMITIDOS COM SUCESSO!</strong>
                <div style="margin-top: 1rem; padding: 1.2rem; background: rgba(16, 185, 129, 0.15); border-radius: 12px; text-align: left; border: 2px solid rgba(16, 185, 129, 0.3);">
                    <div style="display: flex; justify-content: space-between; margin: 0.6rem 0; font-size: 1.1rem;"><span>⚡ Energia Cinética:</span><strong>${kineticEnergy.toFixed(2)} eV</strong></div>
                    <div style="display: flex; justify-content: space-between; margin: 0.6rem 0; font-size: 1.1rem;"><span>🔢 Elétrons emitidos:</span><strong>~${electronCount}</strong></div>
                    <div style="display: flex; justify-content: space-between; margin: 0.6rem 0; font-size: 1.1rem;"><span>📐 Fórmula:</span><strong style="font-family: 'Fraunces', serif;">E<sub>c</sub> = ${photonEnergy.toFixed(1)} - ${workFunction}</strong></div>
                </div>
                <div style="margin-top: 1.2rem; font-size: 1rem; color: rgba(255,255,255,0.9); font-weight: 500;">
                    <p>✅ Energia do fóton > Função trabalho</p>
                    <p>✅ Elétrons estão sendo liberados!</p>
                </div>
            </div>
        `;
    }
}

// Adicionar animação de elétrons emitidos via CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes electronEmit {
        0% { transform: translate(0, 0); opacity: 1; }
        50% { transform: translate(30px, -30px); opacity: 0.8; }
        100% { transform: translate(60px, -60px); opacity: 0; }
    }
    .photoelectric-result-highlight {
        text-align: center; 
        padding: 1.5rem; 
        border-radius: 16px;
        animation: fadeIn 0.5s ease-out;
    }
    .photoelectric-result-highlight.success {
        background: rgba(16, 185, 129, 0.1);
        border: 2px solid #10b981;
    }
    .photoelectric-result-highlight.failure {
        background: rgba(239, 68, 68, 0.1);
        border: 2px solid #ef4444;
    }
`;
document.head.appendChild(style);

// ============ SIMULADOR: FREQUÊNCIA DE CORTE (CORRIGIDO) ============
function updateCutoffSimulator() {
    const workFunction = parseFloat(document.getElementById('cutoffMaterial').value);
    const photonEnergy = parseFloat(document.getElementById('cutoffPhotonSlider').value);
    
    document.getElementById('cutoffPhotonDisplay').innerText = photonEnergy.toFixed(1);

    const h = 6.626e-34;
    const phi = workFunction * 1.602e-19;
    const cutoffFreq = phi / h;

    const resultDiv = document.getElementById('cutoffResult');
    const threshold = document.getElementById('cutoffThreshold');
    const level = document.getElementById('cutoffLevel');
    
    // Atualizar visual do medidor
    if (threshold && level) {
        const thresholdPercent = (workFunction / 7) * 100;
        const levelPercent = (photonEnergy / 7) * 100;
        threshold.style.left = thresholdPercent + '%';
        level.style.left = `calc(${levelPercent}% - 10px)`;
    }
    
    if (photonEnergy < workFunction) {
        resultDiv.innerHTML = `
            <div style="text-align: center; padding: 1rem;">
                <div style="font-size: 2.5rem; margin-bottom: 1rem;">⛔</div>
                <strong style="color: #ef4444; font-size: 1.2rem;">Energia insuficiente</strong>
                <div style="margin-top: 1rem; padding: 1rem; background: var(--bg-alt); border-radius: 8px; text-align: left;">
                    <div style="display: flex; justify-content: space-between; margin: 0.5rem 0;"><span>📏 Freq. de corte:</span><strong>${cutoffFreq.toExponential(2)} Hz</strong></div>
                    <div style="display: flex; justify-content: space-between; margin: 0.5rem 0;"><span>💡 Energia do fóton:</span><strong style="color: #ef4444;">${photonEnergy.toFixed(1)} eV</strong></div>
                    <div style="display: flex; justify-content: space-between; margin: 0.5rem 0;"><span>🧪 Função trabalho:</span><strong>${workFunction} eV</strong></div>
                </div>
                <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-muted);">❌ Nenhuma emissão ocorrerá.</p>
            </div>
        `;
    } else {
        const kineticEnergy = photonEnergy - workFunction;
        resultDiv.innerHTML = `
            <div style="text-align: center; padding: 1rem;">
                <div style="font-size: 2.5rem; margin-bottom: 1rem;">⚡</div>
                <strong style="color: #10b981; font-size: 1.2rem;">Emissão ocorrendo!</strong>
                <div style="margin-top: 1rem; padding: 1rem; background: var(--bg-alt); border-radius: 8px; text-align: left;">
                    <div style="display: flex; justify-content: space-between; margin: 0.5rem 0;"><span>📏 Freq. de corte:</span><strong>${cutoffFreq.toExponential(2)} Hz</strong></div>
                    <div style="display: flex; justify-content: space-between; margin: 0.5rem 0;"><span>💡 Energia do fóton:</span><strong style="color: #10b981;">${photonEnergy.toFixed(1)} eV</strong></div>
                    <div style="display: flex; justify-content: space-between; margin: 0.5rem 0;"><span>⚡ Energia cinética:</span><strong>${kineticEnergy.toFixed(2)} eV</strong></div>
                </div>
                <p style="margin-top: 1rem; font-size: 0.9rem; color: var(--text-muted);">✓ Energia suficiente para emissão!</p>
            </div>
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
        <div style="text-align: center; padding: 1rem;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">☀️</div>
            <strong style="font-size: 1.2rem;">Resultados do Painel</strong>
            <div style="margin-top: 1rem; padding: 1rem; background: var(--bg-alt); border-radius: 8px; text-align: left;">
                <div style="display: flex; justify-content: space-between; margin: 0.5rem 0;"><span>☀️ Potência Solar:</span><strong>${solarPower.toFixed(0)} W</strong></div>
                <div style="display: flex; justify-content: space-between; margin: 0.5rem 0;"><span>🌡️ Fator Temp.:</span><strong>${(tempFactor * 100).toFixed(1)}%</strong></div>
            </div>
            <div style="margin: 1rem 0; padding: 1rem; background: var(--accent-soft); border-radius: 8px;">
                <div style="display: flex; justify-content: space-between;"><span style="font-size: 1.1rem;"><strong>⚡ Potência Elétrica:</strong></span><strong style="font-size: 1.3rem; color: var(--accent);">${electricalPower.toFixed(1)} W</strong></div>
            </div>
            <div style="padding: 1rem; background: var(--bg-alt); border-radius: 8px; text-align: left;">
                <div style="display: flex; justify-content: space-between; margin: 0.5rem 0;"><span>🔋 Tensão:</span><strong>${voltage.toFixed(1)} V</strong></div>
                <div style="display: flex; justify-content: space-between; margin: 0.5rem 0;"><span>💧 Corrente:</span><strong>${current.toFixed(2)} A</strong></div>
            </div>
        </div>
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
        resultDiv.innerHTML = "<div style='color: #ef4444; text-align: center;'><div style='font-size: 2rem;'>⚠️</div><p>Temperatura desejada deve ser maior que a inicial.</p></div>";
        return;
    }

    const m = volume;
    const c = 4186;
    const deltaT = tFinal - tInit;
    const qJoules = m * c * deltaT;
    const qKwh = qJoules / 3600000;
    const lossFactor = hasCover ? 1.1 : 1.3;
    const qWithLoss = qKwh * lossFactor;

    let timeEstimate = "", costEstimate = "", icon = "";
    if (heatingType === 'thermal') {
        timeEstimate = "6-8 horas de sol direto";
        costEstimate = "Custo operacional muito baixo";
        icon = "☀️";
    } else if (heatingType === 'photovoltaic') {
        timeEstimate = "Depende da potência do sistema";
        costEstimate = `R$ ${(qWithLoss * 0.80).toFixed(2)}`;
        icon = "⚡";
    } else {
        timeEstimate = "4-6 horas";
        costEstimate = `R$ ${(qWithLoss * 0.80).toFixed(2)}`;
        icon = "🔥";
    }

    resultDiv.innerHTML = `
        <div style="text-align: center; padding: 1rem;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">${icon}</div>
            <strong style="font-size: 1.2rem;">Resultados do Cálculo</strong>
            <div style="margin-top: 1rem; padding: 1rem; background: var(--bg-alt); border-radius: 8px; text-align: left;">
                <div style="display: flex; justify-content: space-between; margin: 0.5rem 0;"><span>🌡️ Variação (ΔT):</span><strong>${deltaT} °C</strong></div>
                <div style="display: flex; justify-content: space-between; margin: 0.5rem 0;"><span>⚡ Energia Ideal:</span><strong>${qKwh.toFixed(1)} kWh</strong></div>
                <div style="display: flex; justify-content: space-between; margin: 0.5rem 0;"><span>📉 Com Perdas:</span><strong>${qWithLoss.toFixed(1)} kWh</strong></div>
            </div>
            <div style="margin-top: 1rem; padding: 1rem; background: rgba(16, 185, 129, 0.1); border-radius: 8px; text-align: left;">
                <div style="display: flex; justify-content: space-between; margin: 0.5rem 0;"><span><strong>⏱️ Tempo:</strong></span><strong>${timeEstimate}</strong></div>
                <div style="display: flex; justify-content: space-between; margin: 0.5rem 0;"><span>💰 Custo:</span><strong>${costEstimate}</strong></div>
            </div>
        </div>
    `;
}

// ============ SIMULADOR: AUTOMAÇÃO ============
function checkAutomation() {
    const temp = parseInt(document.getElementById('simTemp').innerText);
    const hasFlow = document.getElementById('simFlow').checked;
    const targetTemp = 28;
    const resultDiv = document.getElementById('automationResult');

    if (!hasFlow) {
        resultDiv.innerHTML = `
            <div style="text-align: center; padding: 1rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🚫</div>
                <strong style="color: #ef4444; font-size: 1.2rem;">ALERTA DE SEGURANÇA</strong>
                <p style="margin-top: 0.5rem;">Sem fluxo de água!</p>
                <p style="color: #ef4444; font-weight: 600;">Aquecimento BLOQUEADO</p>
            </div>
        `;
    } else if (temp < targetTemp) {
        resultDiv.innerHTML = `
            <div style="text-align: center; padding: 1rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
                <strong style="color: #10b981; font-size: 1.2rem;">SISTEMA ATIVO</strong>
                <div style="margin-top: 0.5rem; padding: 0.5rem; background: rgba(16, 185, 129, 0.1); border-radius: 8px;">
                    <p>Temp. atual: <strong>${temp}°C</strong></p>
                    <p>Temp. alvo: <strong>${targetTemp}°C</strong></p>
                    <p style="color: #10b981; font-weight: 600;">✓ Aquecimento LIGADO</p>
                </div>
            </div>
        `;
    } else {
        resultDiv.innerHTML = `
            <div style="text-align: center; padding: 1rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">⏸️</div>
                <strong style="color: var(--accent); font-size: 1.2rem;">EM ESPERA</strong>
                <div style="margin-top: 0.5rem; padding: 0.5rem; background: rgba(124, 58, 237, 0.1); border-radius: 8px;">
                    <p>Temp. atual: <strong>${temp}°C</strong></p>
                    <p>Temp. alvo: <strong>${targetTemp}°C</strong></p>
                    <p style="color: var(--accent); font-weight: 600;">✓ Temperatura ideal atingida</p>
                </div>
            </div>
        `;
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
        <div style="text-align: center; padding: 1rem;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">💰</div>
            <strong style="font-size: 1.2rem;">Estimativa de Economia</strong>
            <div style="margin-top: 1rem; padding: 1rem; background: var(--bg-alt); border-radius: 8px; text-align: left;">
                <div style="display: flex; justify-content: space-between; margin: 0.5rem 0;"><span>☀️ Energia Solar:</span><strong>${solarEnergy.toFixed(0)} kWh/mês</strong></div>
                <div style="display: flex; justify-content: space-between; margin: 0.5rem 0;"><span>💵 Economia Mensal:</span><strong>R$ ${monthlySavings.toFixed(2)}</strong></div>
            </div>
            <div style="margin-top: 1rem; padding: 1rem; background: rgba(16, 185, 129, 0.1); border-radius: 8px;">
                <div style="display: flex; justify-content: space-between;"><span style="font-size: 1.1rem;"><strong>💰 Economia Anual:</strong></span><strong style="font-size: 1.3rem; color: var(--success);">R$ ${annualSavings.toFixed(2)}</strong></div>
            </div>
        </div>
    `;
}

// ============ QUIZ - PERGUNTAS REVISADAS ============
const quizData = [
    { question: "O que é um fóton?", options: ["Uma partícula com carga negativa", "Um pacote de energia da radiação eletromagnética", "Uma molécula presente na luz solar", "Um tipo de semicondutor"], correct: 1, feedback: "O fóton é o quantum de energia da radiação eletromagnética." },
    { question: "O que determina a energia individual de um fóton?", options: ["Intensidade da luz", "Temperatura", "Frequência", "Massa"], correct: 2, feedback: "E = h·f — energia é proporcional à frequência." },
    { question: "O que é o efeito fotoelétrico?", options: ["Transformação de calor em luz", "Emissão de elétrons pela incidência de luz", "Transformação de eletricidade em química", "Aquecimento de metal pela água"], correct: 1, feedback: "Emissão de elétrons quando a luz atinge um material." },
    { question: "Qual material é usado em células fotovoltaicas?", options: ["Madeira", "Plástico", "Silício", "Borracha"], correct: 2, feedback: "O silício é o semicondutor mais usado." },
    { question: "Função do sensor de temperatura DS18B20?", options: ["Medir luminosidade", "Medir temperatura da água", "Produzir energia", "Armazenar eletricidade"], correct: 1, feedback: "Mede temperatura e envia ao microcontrolador." },
    { question: "Aumentar intensidade da luz (frequência constante) no efeito fotoelétrico?", options: ["Aumenta energia cinética", "Diminui frequência de corte", "Aumenta quantidade de elétrons emitidos", "Anula função trabalho"], correct: 2, feedback: "Mais fótons = mais elétrons emitidos." },
    { question: "Frequência abaixo da frequência de corte?", options: ["Elétrons emitidos devagar", "Sem emissão de elétrons", "Função trabalho aumenta", "Luz vira calor"], correct: 1, feedback: "Energia insuficiente para liberar elétrons." },
    { question: "Função do inversor em sistema fotovoltaico?", options: ["Aquecer água", "Converter corrente contínua em alternada", "Aumentar frequência", "Medir temperatura"], correct: 1, feedback: "Converte CC em CA para uso na rede." },
    { question: "Diferença entre energia térmica e fotovoltaica?", options: ["Térmica usa eletricidade", "Fotovoltaica aquece água", "Térmica aquece, fotovoltaica gera eletricidade", "São iguais"], correct: 2, feedback: "Térmica = calor, Fotovoltaica = eletricidade." },
    { question: "Função da junção p-n em célula fotovoltaica?", options: ["Armazenar água", "Separar portadores de carga", "Aumentar temperatura", "Impedir absorção"], correct: 1, feedback: "Cria campo elétrico que separa cargas." },
    { question: "Luz com maior frequência tem fótons com:", options: ["Mais energia", "Mesma energia", "Menos energia", "Frequência não influencia"], correct: 0, feedback: "Maior frequência = maior energia." },
    { question: "Piscina 22°C → 28°C. Qual a variação?", options: ["4°C", "5°C", "6°C", "10°C"], correct: 2, feedback: "ΔT = 28 - 22 = 6°C." },
    { question: "Sombra em painel fotovoltaico causa:", options: ["Diminuição da produção", "Dobro da produção", "Aumento da frequência", "Anulação da função trabalho"], correct: 0, feedback: "Sombra reduz radiação e produção." },
    { question: "Por que bomba de calor é eficiente?", options: ["Cria energia", "Transforma luz em calor", "Transfere calor do ambiente", "Não tem perdas"], correct: 2, feedback: "Transfere calor, não cria." },
    { question: "Sem fluxo de água no sistema de aquecimento?", options: ["Aumentar potência", "Manter ligado", "Bloquear e alertar", "Desligar sensores"], correct: 2, feedback: "Segurança: bloquear para evitar danos." }
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
    
    // Fade in inicial
    document.body.classList.add('fade-in');
});
