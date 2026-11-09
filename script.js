// --- EFEK AUDIO SYNTHESIZER SIHIR (Web Audio API Bawaan) ---
let audioCtx = null;
let isAudioActive = true;
let ambientOsc1 = null;
let ambientOsc2 = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        startAmbientSound();
    }
}

// Bunyi Efek Klik Wand Sihir
function playMagicClickSound() {
    if (!isAudioActive) return;
    initAudio();
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // Note D5
    osc.frequency.exponentialRampToValueAtTime(1174.66, audioCtx.currentTime + 0.15); // Note D6

    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
}

// Suara Ambient Kastil Tenang
function startAmbientSound() {
    if (!audioCtx || !isAudioActive) return;

    ambientOsc1 = audioCtx.createOscillator();
    ambientOsc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    ambientOsc1.type = 'triangle';
    ambientOsc2.type = 'sine';

    ambientOsc1.frequency.setValueAtTime(110, audioCtx.currentTime); // Low A
    ambientOsc2.frequency.setValueAtTime(164.81, audioCtx.currentTime); // Low E

    gain.gain.setValueAtTime(0.015, audioCtx.currentTime);

    ambientOsc1.connect(gain);
    ambientOsc2.connect(gain);
    gain.connect(audioCtx.destination);

    ambientOsc1.start();
    ambientOsc2.start();
}

function toggleAmbientSound() {
    isAudioActive = !isAudioActive;
    const icon = document.getElementById('sound-icon');
    const text = document.getElementById('sound-text');

    if (isAudioActive) {
        icon.innerText = "🔊";
        text.innerText = "Suara Kastil: Aktif";
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    } else {
        icon.innerText = "🔇";
        text.innerText = "Suara Kastil: Mute";
        if (audioCtx) {
            audioCtx.suspend();
        }
    }
}

// --- GENERATOR PARTIKEL BINTANG SIHIR ---
function createMagicStars() {
    const container = document.getElementById('stars-container');
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
        const star = document.createElement('div');
        star.className = 'star-particle';
        
        const size = Math.random() * 4 + 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 12 + 8}s`;
        star.style.animationDelay = `${Math.random() * 5}s`;

        container.appendChild(star);
    }
}

// --- NAVIGASI TOPIK ---
function openTopic(topicId) {
    playMagicClickSound();

    document.getElementById('main-menu').classList.add('hidden');
    const contentDisplay = document.getElementById('content-display');
    contentDisplay.classList.remove('hidden');

    const allTopics = document.querySelectorAll('.topic-content');
    allTopics.forEach(topic => topic.classList.add('hidden'));

    const selectedTopic = document.getElementById(topicId);
    if (selectedTopic) {
        selectedTopic.classList.remove('hidden');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeTopic() {
    playMagicClickSound();

    document.getElementById('content-display').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- LAB INTERAKTIF GENERATOR MANIFESTASI ---
function generateDescriptionSpell() {
    playMagicClickSound();
    const obj = document.getElementById('desc-object').value || "Objek Rahasia";
    const adj = document.getElementById('desc-adj').value || "berkilau indah";
    
    const output = document.getElementById('desc-output');
    output.innerHTML = `✨ <strong>Hasil Mantra Deskripsi:</strong><br>"Di sudut ruangan kastil yang tenang, tampaklah <em>${obj}</em>. Objek tersebut ${adj}, memancarkan aura magis yang membuat siapa pun yang memandangnya terpesona."`;
}

function generateStoryPlot() {
    playMagicClickSound();
    const theme = document.getElementById('story-theme').value;
    const output = document.getElementById('story-output');

    let plotText = "";
    if (theme === 'magic') {
        plotText = `📖 <strong>Struktur Plot Ekspedisi:</strong><br>
        • <strong>Orientasi:</strong> Dua murid sihir menemukan peta tua perpustakaan di malam hari.<br>
        • <strong>Komplikasi:</strong> Peta membimbing mereka ke pintu rahasia yang terkunci mantra kegelapan.<br>
        • <strong>Resolusi:</strong> Melalui kerja sama, mereka mengucapkan kata kunci kebaikan dan menemukan ruangan kitab terlarang.`;
    } else if (theme === 'mystery') {
        plotText = `📖 <strong>Struktur Plot Misteri:</strong><br>
        • <strong>Orientasi:</strong> Cermin besar di aula utama tiba-tiba memantulkan bayangan tanpa pemilik.<br>
        • <strong>Komplikasi:</strong> Bayangan tersebut mulai memanggil nama penyihir muda dari balik kaca.<br>
        • <strong>Resolusi:</strong> Terungkap bahwa cermin tersebut adalah portal komunikasi penyihir masa lalu.`;
    } else {
        plotText = `📖 <strong>Struktur Plot Persahabatan:</strong><br>
        • <strong>Orientasi:</strong> Dua kawan berlatih meracik ramuan terbang di taman kastil.<br>
        • <strong>Komplikasi:</strong> Salah satu dari mereka salah mencampur bahan hingga sapu sihir lepas kendali.<br>
        • <strong>Resolusi:</strong> Sahabatnya dengan sigap melontarkan mantra penangkap sehingga mereka selamat bersama.`;
    }

    output.innerHTML = plotText;
}

function generateExpoText() {
    playMagicClickSound();
    const thesis = document.getElementById('expo-thesis').value || "Topik Penting";
    const fact = document.getElementById('expo-fact').value || "Data Ilmiah";
    
    const output = document.getElementById('expo-output');
    output.innerHTML = `🔮 <strong>Teks Eksposisi Terbentuk:</strong><br>
    • <strong>Tesis:</strong> ${thesis}.<br>
    • <strong>Argumentasi (Fakta):</strong> Pembuktian hal ini terlihat dari data sahih: "${fact}".<br>
    • <strong>Penegasan Ulang:</strong> Oleh karena itu, fakta di atas memperkuat pentingnya gagasan tersebut bagi ilmu pengetahuan.`;
}

// --- KUIS INTERAKTIF ---
function checkQuiz(topic, optionIndex) {
    playMagicClickSound();
    let feedback = "";
    let isCorrect = false;

    if (topic === 'desc') {
        feedback = document.getElementById('quiz-desc-feedback');
        if (optionIndex === 1) isCorrect = true;
    } else if (topic === 'cerpen') {
        feedback = document.getElementById('quiz-cerpen-feedback');
        if (optionIndex === 1) isCorrect = true;
    } else if (topic === 'expo') {
        feedback = document.getElementById('quiz-expo-feedback');
        if (optionIndex === 0) isCorrect = true;
    }

    if (isCorrect) {
        feedback.style.color = "#4ade80";
        feedback.innerHTML = "✨ Jawaban Tepat! Mantra pengetahuanmu bekerja sempurna.";
    } else {
        feedback.style.color = "#f87171";
        feedback.innerHTML = "❌ Kurang Tepat. Pelajari kembali poin materi di atas!";
    }
}

// Inisialisasi saat dokumen siap
document.addEventListener('DOMContentLoaded', () => {
    createMagicStars();
});
