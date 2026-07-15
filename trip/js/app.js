let itinerary = [];
let currentIndex = 0;

const app = document.getElementById("app");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

async function loadData() {

    try {

        const response = await fetch("itinerary.json");
        const data = await response.json();

        itinerary = data.itinerary;

        renderDay(false);

    } catch (error) {

        app.innerHTML = `
            <div class="card">
                <div class="content">
                    <h2>שגיאה בטעינת הקובץ</h2>
                </div>
            </div>
        `;

        console.error(error);
    }
}

function buildHtml(item) {

    return `
        <div class="card">

            <img src="./img/${item.image}" alt="${item.title}">

            <div class="content">

                <div class="date">${item.date}</div>

                <div class="day">
                    ${item.day}
                </div>

                <div class="title">
                    ${item.title}
                </div>

                ${
                    item.desc && item.desc.length
                        ? `
                        <ul class="description">
                            ${item.desc
                                .map(text => `<li>${text}</li>`)
                                .join("")}
                        </ul>
                        `
                        : ""
                }

                ${
                    item.tags && item.tags.length
                        ? `
                        <div class="tags">
                            ${item.tags
                                .map(tag => `<span class="tag">${tag}</span>`)
                                .join("")}
                        </div>
                        `
                        : ""
                }

            </div>

        </div>
    `;
}

function renderDay(animated = true) {

    const item = itinerary[currentIndex];

    if (!animated) {
        app.innerHTML = buildHtml(item);
    } else {

        app.classList.add("slide-out");

        setTimeout(() => {

            app.innerHTML = buildHtml(item);

            app.classList.remove("slide-out");

            app.classList.add("slide-in");

            requestAnimationFrame(() => {
                app.classList.add("slide-in-active");
            });

            setTimeout(() => {

                app.classList.remove("slide-in");
                app.classList.remove("slide-in-active");

            }, 350);

        }, 300);
    }

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === itinerary.length - 1;
}

prevBtn.addEventListener("click", () => {

    if (currentIndex > 0) {

        currentIndex--;

        renderDay(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
});

nextBtn.addEventListener("click", () => {

    if (currentIndex < itinerary.length - 1) {

        currentIndex++;

        renderDay(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
});

document.addEventListener("keydown", e => {

    if (e.key === "ArrowLeft") {

        if (currentIndex < itinerary.length - 1) {
            currentIndex++;
            renderDay(true);
        }
    }

    if (e.key === "ArrowRight") {

        if (currentIndex > 0) {
            currentIndex--;
            renderDay(true);
        }
    }
});

let touchStartX = 0;

document.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", e => {

    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) < 50) return;

    if (diff > 0) {

        if (currentIndex < itinerary.length - 1) {

            currentIndex++;
            renderDay(true);
        }
    } else {

        if (currentIndex > 0) {

            currentIndex--;
            renderDay(true);
        }
    }
});
loadData();