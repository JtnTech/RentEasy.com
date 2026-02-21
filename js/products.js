// Products data and generator

const PRODUCT_TEMPLATES = [
    {
        category: "tech",
        title: "Casio fx-991EX Classwiz",
        brand: "Electronics",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDh9LAZWePYBvQSqdvKxSnNvGA5T8WroNkouZUuHMwRt5g6s_iU8stegHrqfGDlyaIsT21TiOf8nzS814E2nG7quC-nnB6bb7RN4Z7JY_J9asRLelIdnVgoiXh5Xm1zl2Vda7e1AcGpn0cBMANhAFx-hD5IahXj0jhsr8ZCD5V_BuFj_j3ISAnoTtZUOGSttqLLmbOpXRh_EXCYfuSJWLozIfVN6ADQ11NylXgp0XheBIo3O_iRp99aSuXZtAQLiqiHdPKug5aOc2FG",
        retailPrice: 1250,
        rentPrice: 125,
        period: "mo"
    },
    {
        category: "books",
        title: "Engineering Mechanics",
        brand: "Books",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDD874RSPDjx49BENGPidxf_Orf8gQbKMUcYQyimyoKr9TdEH3BG6fGWpbS2SKrLd4DWcs9BNKkzNMPOY4MCwVTBscwineheGUNRbZP87jjWujhXrv9iJ8lHdsaHKZjmQ6htHZCisx9G-M0JQyYBSkw3yyyGY-XYpheAXC0vqd3Y_MH5n_z-OeNchFW5BTylD9Vok5x2BX5HkmwfsmB7RutVktG8zs6rUMKvwyb2c1XRKmztMif58oiun7D1zl1D0FRieLLcRkFgZGL",
        retailPrice: 850,
        rentPrice: 85,
        period: "mo"
    },
    {
        category: "wheels",
        title: "Hercules MTB Cycle 26T",
        brand: "Transport",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4qs0LLNecdR2JBU1_pI8oGaGB7sYLg1QCxN2mLTAs8Xz1JV6epSZ0my6qcn2ohrLDXjKGZoCrX-LKfXZE8tHO-vb_LG7nZnJv5A8zdU4YpYVoImG3q4zmfpeIDrBKG8-GBDs7jEaFLRw0nXOH87f5-AycZoy3ABlEhmtOW36eVwSQmemVM4lFSkpSeLQNkIDTEhWNbOHkr2lUCSmP5Ak_trB_voh6wMTWBvJOWlG8-7Pq4YBMGvgjSADqPFOb79SLzrelt70H5qSE",
        retailPrice: 5000,
        rentPrice: 600,
        period: "mo",
        badge: "12% RETAIL"
    },
    {
        category: "lab",
        title: "Cotton Lab Coat (Unisex, L)",
        brand: "Apparel",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzkTMuaW2tr4sSwy7jqnKD_hpF6x5AYBQPN3Blo8FQu2BYmUsipCA7NXvgDpYHQFiU4ufkIoPFkkrRU_psG3jNpZLHEqWMhjhSU1Xzf0XiHwQWelAp7xAjRPLVxBebyyJiqWmob9woK5CaQfm5ezqMlw3WRgFAMKpAvGP7_SBuaF7InGXHgXupqLZ7_XGUOJ5rOWEKn8juSwaEBuE0wk1Rn7mGRRYLZEghIvQqzcXKbuKIwjCXqaWS7cHOa6eCM3qPMK4bdcqx_t_Q",
        retailPrice: 450,
        rentPrice: 45,
        period: "mo"
    },
    {
        category: "drafting",
        title: "Mini Drafter & Tube combo",
        brand: "Architecture",
        icon: "architecture",
        retailPrice: 300,
        rentPrice: 30,
        period: "mo"
    }
];

// Generate 200 items logic
function generateProducts(count) {
    const products = [];
    for (let i = 0; i < count; i++) {
        const template = PRODUCT_TEMPLATES[i % PRODUCT_TEMPLATES.length];

        // Specific arrays for randomization
        const cycleTypes = [
            "Geared MTB 26T (Height 5'4\" - 5'8\")",
            "Urban Commuter 24T (Height 5'0\" - 5'4\")",
            "Premium Hybrid 27.5T (Height 5'6\" - 6'0\")",
            "Single Speed Standard 26T",
            "Sports BMX 20T (For Stunts)",
            "Fat Bike 26T (Wide Tyres)",
            "Ladies City Cycle 24T with Basket",
            "Road Bike 700c (Height 5'8\"+)"
        ];

        const bookTypes = [
            "Engineering Mechanics Vol ",
            "Advanced Calculus (Author: Smith) Vol ",
            "Data Structures in C++ (4th Ed) ",
            "Organic Chemistry by Morrison Boyd ",
            "Quantum Physics Basics ",
            "Microeconomics Principles "
        ];

        const techTypes = [
            "Casio fx-991EX Classwiz",
            "Texas Instruments BA II Plus",
            "Programmable Arduino UNO R3",
            "Raspberry Pi 4 Model B (4GB)",
            "Digital Multimeter Unit"
        ];

        let customTitle = template.title;
        let priceVariation = 0;

        if (template.category === "books") {
            const randomBook = bookTypes[Math.floor(Math.random() * bookTypes.length)];
            customTitle = randomBook + (Math.floor(Math.random() * 5) + 1);
        } else if (template.category === "wheels") {
            customTitle = cycleTypes[Math.floor(Math.random() * cycleTypes.length)];
        } else if (template.category === "tech") {
            customTitle = techTypes[Math.floor(Math.random() * techTypes.length)];
        } else if (i >= PRODUCT_TEMPLATES.length) {
            const titleSuffix = ` (Variant ${Math.floor(Math.random() * 5) + 1})`;
            customTitle = template.title + titleSuffix;
        }

        priceVariation = Math.floor(Math.random() * 20) - 10; // -10 to +10 price diff

        // Calculate Rent Price as strictly 2% - 5% of Retail
        let discountPercent = (Math.floor(Math.random() * 4) + 2) / 100; // 0.02 to 0.05
        let calculatedRetail = Math.max(50, template.retailPrice + (priceVariation * 10));
        let calculatedRent = Math.ceil(calculatedRetail * discountPercent);

        // Ensure rent price is somewhat realistic numbers (end in 9, 5, or 0)
        calculatedRent = Math.ceil(calculatedRent / 5) * 5;

        products.push({
            ...template,
            id: i + 1,
            title: customTitle,
            rentPrice: calculatedRent,
            retailPrice: calculatedRetail,
            period: "mo",
            badge: `${Math.round(discountPercent * 100)}% RETAIL`
        });
    }
    return products;
}

function renderProductCard(product) {
    const imageHTML = product.image ?
        `<img class="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" data-alt="${product.title}" src="${product.image}" />` :
        `<span class="material-symbols-outlined text-[60px] group-hover:scale-110 transition-transform">${product.icon}</span>`;

    const badgeHTML = product.badge ?
        `<div class="absolute top-3 left-0 bg-primary/20 text-slate-900 border border-primary text-[10px] font-bold px-3 py-1 rounded-r-full shadow-sm">${product.badge}</div>` : '';

    return `
        <div data-category="${product.category}" class="product-card bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 flex flex-col transition-all duration-300 group hover:-translate-y-1">
            <div onclick="window.location.href='product.html'" class="relative aspect-[4/3] ${product.image ? 'bg-slate-100' : 'bg-slate-50 border-b border-slate-100 flex items-center justify-center text-slate-400'} overflow-hidden cursor-pointer group-hover:bg-slate-200 transition-colors">
                ${imageHTML}
                <button class="absolute top-2 right-2 material-symbols-outlined text-slate-300 hover:text-red-500 cursor-pointer active:scale-90 transition-transform bg-white/70 backdrop-blur-sm rounded-full p-1.5 shadow-sm" aria-label="Add to favorites">favorite</button>
                ${badgeHTML}
            </div>
            <div class="p-3 md:p-5 flex flex-col flex-1">
                <p class="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">${product.brand}</p>
                <h3 onclick="window.location.href='product.html'" class="text-sm md:text-base font-bold text-slate-800 line-clamp-1 cursor-pointer hover:text-primary transition-colors leading-tight">${product.title}</h3>
                <div class="text-[10px] text-slate-400 line-through mt-1">Retail: ₹${product.retailPrice.toLocaleString()}</div>
                <div class="mt-auto pt-1">
                    <div class="flex items-end gap-1.5 mb-3">
                        <span class="text-lg md:text-xl font-extrabold text-primary leading-none">₹${product.rentPrice}</span>
                        <span class="text-[10px] md:text-xs text-slate-500 font-semibold uppercase relative top-[-2px]">/${product.period}</span>
                    </div>
                    <button class="add-to-cart-btn w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 md:py-2.5 px-1 rounded-lg md:rounded-xl text-[10px] sm:text-xs md:text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1 md:gap-1.5 flex-nowrap whitespace-nowrap min-h-[36px]">
                        <span class="material-symbols-outlined text-[14px] sm:text-[16px] md:text-[18px]">add_shopping_cart</span> Add
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('product-grid');
    if (grid) {
        const ALL_PRODUCTS = generateProducts(200);
        grid.innerHTML = ALL_PRODUCTS.map(p => renderProductCard(p)).join('');

        // Re-attach event listeners for newly created cart buttons
        const newCartBtns = grid.querySelectorAll('.add-to-cart-btn');
        newCartBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // prevent card click

                let icon = btn.querySelector('.material-symbols-outlined');
                const originalText = icon ? icon.innerText : '';

                btn.classList.add('bg-primary', 'text-slate-900', 'scale-95');
                btn.classList.remove('bg-slate-900', 'text-white');
                if (icon) icon.innerText = 'check';

                if (window.showToast) {
                    window.showToast('Item added to cart!');
                }
                if (window.updateCartBadges) {
                    let current = parseInt(localStorage.getItem('cartCount')) || 2;
                    localStorage.setItem('cartCount', current + 1);
                    window.updateCartBadges();
                }

                setTimeout(() => {
                    btn.classList.remove('bg-primary', 'text-slate-900', 'scale-95');
                    btn.classList.add('bg-slate-900', 'text-white');
                    if (icon) icon.innerText = originalText;
                }, 1000);
            });
        });

        // Trigger the initial filter in case a category button is already selected
        if (window.filterProducts) {
            const activeMobileBtn = document.querySelector('.mobile-cat-btn .icon-circle.bg-slate-900');
            if (activeMobileBtn) {
                const cat = activeMobileBtn.parentElement.getAttribute('data-category');
                window.filterProducts(cat);
            } else {
                // Update counts for all at least
                if (window.updateCategoryCounts) window.updateCategoryCounts();
            }
        }
    }
});
