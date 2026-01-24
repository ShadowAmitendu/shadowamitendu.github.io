/* =========================================================
1. GSAP LOADER SEQUENCE
========================================================= */

document.body.classList.add('overflow-hidden');

const loaderTimeline = gsap.timeline({
    onComplete: () => {
        document.body.classList.remove('overflow-hidden');
    }
});

window.addEventListener('load', () => {
    let counter = {value: 0};
    const percentEl = document.getElementById('loader-percentage');

    loaderTimeline
        .to(["#loader-text", "#loader-bar-container", "#loader-percentage"], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.1
        })
        .to("#loader-bar", {
            width: "100%",
            duration: 2,
            ease: "power2.inOut"
        }, "-=0.4")
        .to(counter, {
            value: 100,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => {
                percentEl.textContent = Math.round(counter.value) + "%";
            }
        }, "<")
        .to("#brand-span", {
            color: "#ffffff",
            duration: 0.3
        })
        .to(".shutter-white", {
            y: 0,
            duration: 0.6,
            ease: "power3.in"
        })
        .to(".shutter-blue", {
            y: 0,
            duration: 0.6,
            ease: "power3.in"
        }, "-=0.45")
        .to("#loader", {
            yPercent: -100,
            duration: 0.8,
            ease: "expo.inOut"
        }, "-=0.2");
});


/* =========================================================
2. MOBILE MENU
========================================================= */

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});


/* =========================================================
3. GITHUB PROJECT FETCH
========================================================= */

const username = "ShadowAmitendu";
const projectGrid = document.getElementById("project-grid");
const loading = document.getElementById("loading");

async function fetchRepos() {
    try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`);
        const repos = await res.json();

        loading.classList.add("hidden");
        projectGrid.classList.remove("hidden");

        repos.forEach(repo => {
            if (repo.fork || !repo.description) return;

            const card = document.createElement("div");
            card.className = "bg-white border-4 border-[#2c3e50] p-6 flex flex-col";

            card.innerHTML = `
                <div class="flex justify-between items-start mb-6">
                    <div class="bg-[#2c3e50] p-2 text-white">
                        <i data-lucide="folder" class="w-5 h-5"></i>
                    </div>
                    <span class="text-[10px] font-black uppercase bg-[#3498db] text-white px-2 py-1">
                        ${repo.language || "Dev"}
                    </span>
                </div>

                <h3 class="text-lg font-black uppercase mb-3 text-[#2c3e50] truncate">
                    ${repo.name.replace(/-/g, " ")}
                </h3>

                <p class="text-sm opacity-80 mb-8 leading-relaxed">
                    ${repo.description}
                </p>

                <a href="${repo.html_url}" target="_blank"
                   class="mt-auto inline-block bg-[#2c3e50] text-white px-4 py-2 text-[10px] font-black uppercase flat-border">
                    Source Code
                </a>
            `;

            projectGrid.appendChild(card);
        });

        lucide.createIcons();
    } catch {
        loading.innerHTML = "<p class='font-black uppercase text-red-500'>GitHub API Error</p>";
    }
}

fetchRepos();


/* =========================================================
4. ACADEMIC ROADMAP PROGRESS
========================================================= */

gsap.registerPlugin(ScrollTrigger);

function initAcademicRoadmap() {
    const start = new Date("2023-08-01").getTime();
    const end = new Date("2027-07-30").getTime();
    const now = Date.now();

    let progress = Math.floor(((now - start) / (end - start)) * 100);
    progress = Math.min(Math.max(progress, 0), 100);

    gsap.fromTo("#progress-fill",
        {width: "0%"},
        {
            width: progress + "%",
            duration: 2.5,
            ease: "expo.out",
            scrollTrigger: {
                trigger: "#roadmap",
                start: "top 80%"
            },
            onUpdate() {
                const w = Math.round(parseFloat(this.targets()[0].style.width));
                document.getElementById("progress-percent-large").textContent = w + "%";
                document.getElementById("progress-percent-bar").textContent = w + "%";
            }
        }
    );
}

window.addEventListener("load", () => {
    setTimeout(initAcademicRoadmap, 2200);
});


/* =========================================================
5. CUSTOM CURSOR (DESKTOP ONLY)
========================================================= */

const cursor = document.getElementById("custom-cursor");

if (cursor) {
    const xTo = gsap.quickTo(cursor, "x", {duration: 0.4, ease: "power3"});
    const yTo = gsap.quickTo(cursor, "y", {duration: 0.4, ease: "power3"});

    window.addEventListener("mousemove", e => {
        gsap.to(cursor, {opacity: 1, duration: 0.3});
        xTo(e.clientX);
        yTo(e.clientY);
    });

    document.querySelectorAll("a, button, .magnetic-btn").forEach(el => {
        el.addEventListener("mouseenter", () => {
            gsap.to(cursor, {scale: 2.5, backgroundColor: "#ffffff", duration: 0.25});
        });
        el.addEventListener("mouseleave", () => {
            gsap.to(cursor, {scale: 1, backgroundColor: "#3498db", duration: 0.25});
        });
    });
}


/* =========================================================
6. HIDDEN SECTION REVEAL (FIXED)
========================================================= */

gsap.from("#reveal-text", {
    y: 120,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out",
    scrollTrigger: {
        trigger: "#hidden-secret",
        start: "top 80%",
        end: "top 40%",
        scrub: 1
    }
});
