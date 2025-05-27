document.addEventListener("DOMContentLoaded", () => {
  // === ЭЛЕМЕНТЫ НАВИГАЦИИ ===
  const homeBtn = document.getElementById("homeBtn");
  const catalogBtn = document.getElementById("catalogBtn");
  const aboutBtn = document.getElementById("aboutBtn");
  const reviewsBtn = document.getElementById("reviewsBtn");

  // === СЕКЦИИ ===
  const titlePage = document.getElementById("titlePage");
  const catalogBlock = document.getElementById("catalogBlock");
  const aboutSection = document.getElementById("about");
  const reviewsSection = document.getElementById("reviews");

  // === МОДАЛЬНОЕ ОКНО ДЛЯ ОТЗЫВОВ ===
  const leaveReviewBtn = document.getElementById("leaveReviewBtn");
  const reviewModal = document.getElementById("reviewModal");
  const closeModal = document.getElementById("closeModal");
  const reviewForm = document.getElementById("reviewForm");
  const reviewsList = document.querySelector(".reviews-list");

  // === СКРЫТИЕ ВСЕХ СЕКЦИЙ ===
  function hideAll() {
    titlePage.style.display = "none";
    catalogBlock.style.display = "none";
    aboutSection.style.display = "none";
    reviewsSection.style.display = "none";
  }

  // === ОБРАБОТКА НАВИГАЦИИ ===
  homeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    hideAll();
    titlePage.style.display = "flex";
  });

  catalogBtn.addEventListener("click", (e) => {
    e.preventDefault();
    hideAll();
    catalogBlock.style.display = "flex";
    initOptions();
    startAnimation();
  });

  aboutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    hideAll();
    aboutSection.style.display = "block";
  });

  reviewsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    hideAll();
    reviewsSection.style.display = "block";
    loadReviews(); // ВАЖНО: загружаем отзывы
  });

  // === АНИМАЦИЯ КАТАЛОГА ===
  function initOptions() {
    const optionsContainer = document.querySelector('.options');
    const options = document.querySelectorAll('.option');
    if (!optionsContainer) return;

    optionsContainer.style.setProperty('--total-options', options.length);

    optionsContainer.addEventListener('click', (event) => {
      const clickedOption = event.target.closest('.option');
      if (!clickedOption || clickedOption.classList.contains('active')) return;
      options.forEach(option => option.classList.remove('active'));
      clickedOption.classList.add('active');
    });
  }

  function startAnimation() {
    const options = document.querySelectorAll(".option");
    let current = 0;
    setInterval(() => {
      options.forEach(opt => opt.classList.remove("active"));
      options[current].classList.add("active");
      current = (current + 1) % options.length;
    }, 3000);
  }

  // === ИКОНКИ С ПОДСКАЗКАМИ ===
  document.querySelectorAll('.icon-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.icon-item.active-tooltip').forEach(el => {
        if (el !== item) el.classList.remove('active-tooltip');
      });
      item.classList.toggle('active-tooltip');
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.icon-item')) {
      document.querySelectorAll('.icon-item.active-tooltip').forEach(el => el.classList.remove('active-tooltip'));
    }
  });

 document.addEventListener("DOMContentLoaded", () => {
  const leaveReviewBtn = document.getElementById("leaveReviewBtn");
  const reviewModal = document.getElementById("reviewModal");
  const closeModal = document.getElementById("closeModal");
  const reviewForm = document.getElementById("reviewForm");

leaveReviewBtn.addEventListener("click", () => {
    reviewModal.style.display = "block";
  });

  closeModal.addEventListener("click", () => {
    reviewModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === reviewModal) {
      reviewModal.style.display = "none";
    }
  });

  reviewForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(reviewForm);

    fetch('save_review.php', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Отзыв сохранён!");
          reviewForm.reset();
          reviewModal.style.display = "none";
          loadReviews();
        } else {
          alert(data.message || "Ошибка при сохранении отзыва.");
        }
      })
      .catch(err => {
        console.error("Ошибка запроса:", err);
        alert("Не удалось отправить отзыв.");
      });
  });

  function loadReviews() {
    fetch('get_reviews.php')
      .then(res => res.json())
      .then(data => {
        reviewsList.innerHTML = "";

        if (!data.length) {
          reviewsList.innerHTML = "<p>Пока нет отзывов.</p>";
          return;
        }

        data.forEach(({ author, text, rating, date }) => {
          const div = document.createElement("div");
          div.classList.add("review");
          div.innerHTML = `
            <h3>${author}</h3>
            <p class="review-date">${new Date(date).toLocaleDateString('ru-RU')}</p>
            <p class="review-rating">${'⭐'.repeat(rating)}</p>
            <p class="review-text">${text}</p>
          `;
          reviewsList.appendChild(div);
        });
      })
      .catch(err => {
        console.error("Ошибка загрузки отзывов:", err);
        reviewsList.innerHTML = "<p>Не удалось загрузить отзывы.</p>";
      });
  }

  // Показываем нужный раздел при загрузке
  const urlParams = new URLSearchParams(window.location.search);
  const isRegistered = urlParams.get("registered");

  if (isRegistered === "1") {
    hideAll();
    catalogBlock.style.display = "flex";
    initOptions();
    startAnimation();
  } else {
    hideAll();
    titlePage.style.display = "flex";
  }
});
