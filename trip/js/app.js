
let itinerary = [];
let currentIndex = 0;

const app = document.getElementById("app");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

async function loadData() {

    try {

        const response = await fetch("./itinerary.json");

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        itinerary = data.itinerary;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const futureIndex = itinerary.findIndex(item => {

            const [day, month, year] = item.date.split("/");

            const itemDate = new Date(
                Number(year),
                Number(month) - 1,
                Number(day)
            );

            return itemDate >= today;
        });

        currentIndex =
            futureIndex >= 0
                ? futureIndex
                : itinerary.length - 1;

        renderDay(false);

    } catch (error) {

        console.error(error);

        app.innerHTML = `
            <div class="card">
                <div class="content">
                    <h2>Failed loading itinerary.json</h2>
                </div>
            </div>
        `;
    }
}

function buildHtml(item) {

    const desc = item.desc || [];
    const tags = item.tags || [];

    return `
        <div class="card">

            }" alt="${item.title}">

            <div class="content">

                <div class="date">${item.date}</div>

                <div class="day">${item.day}</div>

                <h2 class="title">${item.title}</h2>

                ${
                    desc.length
                        ? `
                        <ul class="description">
                            ${desc.map(d => `<li>${d}</li>`).join("")}
                        </ul>
                        `
                        : ""
                }

                ${
                    tags.length
                        ? `
                        <div class="tags">
                            ${tags.map(t => `<span class="tag">${t}</span>`).join("")}
                        </div>
                        `
                        : ""
                }

            </div>

        </div>
    `;
}

function renderDay(animated = true, direction = "next") {

    const item = itinerary[currentIndex];

    if (!animated) {

        app.innerHTML = buildHtml(item);
        updateButtons();
        return;
    }

    app.className = direction === "next"
        ? "slide-out-up"
        : "slide-out-down";

    setTimeout(() => {

        app.innerHTML = buildHtml(item);

        app.className = direction === "next"
            ? "slide-in-bottom"
            : "slide-in-top";

        requestAnimationFrame(() => {
            app.classList.add("slide-active");
        });

    }, 350);

    updateButtons();
}

function updateButtons() {

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === itinerary.length - 1;
}

nextBtn.addEventListener("click", () => {

    if (currentIndex >= itinerary.length - 1) return;

    currentIndex++;
    renderDay(true, "next");
});

prevBtn.addEventListener("click", () => {

    if (currentIndex <= 0) return;

    currentIndex--;
    renderDay(true, "prev");
});

document.addEventListener("keydown", e => {

    if (e.key === "ArrowUp") {

        if (currentIndex < itinerary.length - 1) {

            currentIndex++;
            renderDay(true, "next");
        }
    }

    if (e.key === "ArrowDown") {

        if (currentIndex > 0) {

            currentIndex--;
            renderDay(true, "prev");
        }
    }
});

let touchStartY = 0;

document.addEventListener("touchstart", e => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener("touchend", e => {

    const touchEndY = e.changedTouches[0].screenY;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) < 50) return;

    if (diff > 0) {

        if (currentIndex < itinerary.length - 1) {

            currentIndex++;
            renderDay(true, "next");
        }

    } else {

        if (currentIndex > 0) {

            currentIndex--;
            renderDay(true, "prev");
        }
    }
});

loadData();
