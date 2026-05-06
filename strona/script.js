// Initialize Lucide Icons
        lucide.createIcons();

        // Fade-in animation on scroll
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Quiz Logic
        const quizData = [
            {
                question: "\"Twoje konto zostało zamrożone. Kliknij [TUTAJ], aby odblokować środki w ciągu 5 minut.\"",
                options: [
                    { text: "Klikam szybko, by nie stracić pieniędzy", correct: false },
                    { text: "Dzwonię na oficjalną infolinię banku", correct: true }
                ],
                feedback: "To klasyczna manipulacja <strong>strachem i presją czasu</strong>! Żaden bank nie wymusza tak gwałtownych ruchów przez linki."
            },
            {
                question: "\"Jako jedyny w swojej grupie znajomych jeszcze nie używasz tej aplikacji. Czy chcesz być tym zacofanym?\"",
                options: [
                    { text: "Kupuję, by nie odstawać", correct: false },
                    { text: "Ignoruję presję", correct: true }
                ],
                feedback: "To manipulacja przez <strong>dowód społeczny i presję większości</strong>. Twoja wartość nie zależy od posiadanych gadżetów."
            },
            {
                question: "\"Nasz nowy lek ma 90% skuteczności w walce z bólem!\"",
                options: [
                    { text: "Brzmi świetnie, kupuję!", correct: false },
                    { text: "Pytam: a co z pozostałymi 10%?", correct: true }
                ],
                feedback: "To efekt <strong>framingu (obramowania)</strong>. Skupienie na 90% sukcesu maskuje 10% ryzyka lub braku działania."
            },
            {
                question: "Aktor w białym fartuchu w reklamie mówi: \"Jako ekspert polecam ten syrop na każdą dolegliwość.\"",
                options: [
                    { text: "Ufam mu, wygląda na lekarza", correct: false },
                    { text: "Sprawdzam, czy to prawdziwy lekarz", correct: true }
                ],
                feedback: "To wykorzystanie <strong>autorytetu</strong>. Atrybuty (fartuch, stetoskop) mają uśpić Twoją czujność."
            },
            {
                question: "\"Możesz wybrać subskrypcję Premium (rekomendowana) lub Standard. Większość osób wybiera Premium.\"",
                options: [
                    { text: "Biorę Premium, skoro polecają", correct: false },
                    { text: "Wybieram to, co faktycznie potrzebuję", correct: true }
                ],
                feedback: "To <strong>sugestia wyboru</strong>. Manipulator 'popycha' Cię ku droższej opcji, oznaczając ją jako domyślną."
            },
            {
                question: "\"To skandaliczne zachowanie polityków niszczy naszą godność! Musimy ich powstrzymać!\"",
                options: [
                    { text: "Zgadzam się, trzeba działać!", correct: false },
                    { text: "Zastanawiam się: jakie są fakty?", correct: true }
                ],
                feedback: "To <strong>emocjonalne sformułowanie</strong>. Słowa takie jak 'skandal' czy 'godność' mają wywołać gniew zamiast analizy."
            }
        ];

        let currentQuestion = 0;
        let score = 0;

        function renderQuestion() {
            const container = document.getElementById('quiz-container');
            const data = quizData[currentQuestion];

            container.innerHTML = `
                <div style="font-weight: 700; color: var(--primary); margin-bottom: 16px; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em;">
                    Pytanie ${currentQuestion + 1} z ${quizData.length}
                </div>
                <div class="test-question">${data.question}</div>
                <div class="test-options">
                    ${data.options.map((opt, i) => `
                        <button class="option-btn" onclick="checkAnswer(${i})">${opt.text}</button>
                    `).join('')}
                </div>
                <div id="feedback" class="test-feedback"></div>
            `;

            document.getElementById('next-q').style.display = 'none';
        }

        function checkAnswer(optionIndex) {
            const data = quizData[currentQuestion];
            const feedbackEl = document.getElementById('feedback');
            const isCorrect = data.options[optionIndex].correct;

            if (isCorrect) score++;

            feedbackEl.innerHTML = data.feedback;
            feedbackEl.className = `test-feedback ${isCorrect ? 'feedback-good' : 'feedback-bad'}`;
            feedbackEl.style.display = 'block';

            // Disable buttons
            document.querySelectorAll('.option-btn').forEach(btn => btn.style.pointerEvents = 'none');

            document.getElementById('next-q').style.display = 'inline-flex';
        }

        function handleNext() {
            currentQuestion++;
            if (currentQuestion < quizData.length) {
                renderQuestion();
            } else {
                showResults();
            }
        }

        function showResults() {
            document.getElementById('quiz-container').style.display = 'none';
            document.getElementById('next-q').style.display = 'none';
            const resultBox = document.getElementById('quiz-result');
            resultBox.style.display = 'block';

            document.getElementById('score-val').innerText = score;
            const scoreText = document.getElementById('score-text');

            if (score === quizData.length) scoreText.innerText = "Doskonale! Jesteś odporny na manipulację.";
            else if (score >= quizData.length / 2) scoreText.innerText = "Całkiem nieźle, ale zachowaj czujność.";
            else scoreText.innerText = "Warto poczytać więcej o technikach manipulacji.";
        }

        function resetQuiz() {
            currentQuestion = 0;
            score = 0;
            document.getElementById('quiz-container').style.display = 'block';
            document.getElementById('quiz-result').style.display = 'none';
            renderQuestion();
        }

        // Initial render
        renderQuestion();

        // Slider Logic
        let currentSlide = 0;
        const track = document.querySelector('.slider-track');
        const dots = document.querySelectorAll('.dot');
        let slideInterval;

        function updateSlider(index) {
            currentSlide = index;
            track.style.transform = `translateX(-${index * 100}%)`;

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            // Re-initialize icons just in case (though not strictly necessary for slider content unless changed dynamically)
            // lucide.createIcons();
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % dots.length;
            updateSlider(currentSlide);
            resetAutoSlide();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + dots.length) % dots.length;
            updateSlider(currentSlide);
            resetAutoSlide();
        }

        function autoSlide() {
            currentSlide = (currentSlide + 1) % dots.length;
            updateSlider(currentSlide);
        }

        function resetAutoSlide() {
            clearInterval(slideInterval);
            slideInterval = setInterval(autoSlide, 8000);
        }

        // Add onclick to dots that resets interval
        dots.forEach((dot, i) => {
            dot.onclick = () => {
                updateSlider(i);
                resetAutoSlide();
            };
        });

        // Initialize auto-slide
        slideInterval = setInterval(autoSlide, 8000);

        // Ensure Lucide icons are initialized properly on load
        document.addEventListener('DOMContentLoaded', () => {
            lucide.createIcons();
        });