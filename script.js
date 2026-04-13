const questions = [
    {
        question: "¿Qué prefieres hacer en tu tiempo libre?",
        options: [
            { text: "Armar o reparar objetos/gadgets", category: "TECH" },
            { text: "Dibujar, escribir o tocar música", category: "ART" },
            { text: "Ayudar a personas o animales", category: "HEALTH" },
            { text: "Organizar eventos o liderar grupos", category: "SOCIAL" }
        ]
    },
    {
        question: "¿Cuál de estos temas te interesa más?",
        options: [
            { text: "Inteligencia Artificial y Robots", category: "TECH" },
            { text: "Diseño de interiores o moda", category: "ART" },
            { text: "Cómo funciona el cuerpo humano", category: "HEALTH" },
            { text: "Psicología o Leyes", category: "SOCIAL" }
        ]
    },
    {
        question: "Si tuvieras que resolver un problema...",
        options: [
            { text: "Busco una solución lógica y técnica", category: "TECH" },
            { text: "Uso mi imaginación para algo nuevo", category: "ART" },
            { text: "Pienso en el bienestar de los demás", category: "HEALTH" },
            { text: "Analizo datos y tomo una decisión estratégica", category: "SOCIAL" }
        ]
    },
    {
        question: "¿En qué ambiente te ves trabajando?",
        options: [
            { text: "En una oficina moderna o remoto", category: "TECH" },
            { text: "En un estudio creativo o teatro", category: "ART" },
            { text: "En un hospital o laboratorio", category: "HEALTH" },
            { text: "En una empresa o institución pública", category: "SOCIAL" }
        ]
    },
    {
        question: "¿Qué valoras más en un trabajo?",
        options: [
            { text: "La innovación constante", category: "TECH" },
            { text: "La libertad de expresión", category: "ART" },
            { text: "Salvar vidas o mejorar la salud", category: "HEALTH" },
            { text: "Influir en la sociedad o hacer negocios", category: "SOCIAL" }
        ]
    }
];

let currentQuestion = 0;
let scores = { TECH: 0, ART: 0, HEALTH: 0, SOCIAL: 0 };

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const progressBar = document.getElementById("progress-bar");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");

function loadQuestion() {
    const q = questions[currentQuestion];
    questionText.innerText = q.question;
    optionsContainer.innerHTML = "";
    
    // Actualizar barra de progreso
    const progress = (currentQuestion / questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.innerText = opt.text;
        btn.classList.add("btn", "btn-outline-secondary", "btn-option");
        btn.onclick = () => selectOption(opt.category);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(category) {
    scores[category]++;
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizContainer.classList.add("d-none");
    resultContainer.classList.remove("d-none");

    // Encontrar la categoría con más puntos
    const winner = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

    const descriptions = {
        TECH: "Ingeniería, Programación o Análisis de Datos.",
        ART: "Diseño Gráfico, Arquitectura o Artes Visuales.",
        HEALTH: "Medicina, Enfermería o Biotecnología.",
        SOCIAL: "Administración, Derecho o Comunicación Social."
    };

    resultText.innerText = winner;
    document.getElementById("result-description").innerText = `Basado en tus respuestas, podrías tener éxito en: ${descriptions[winner]}`;
}

// Iniciar el test
loadQuestion();