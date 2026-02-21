document.addEventListener('DOMContentLoaded', () => {
    // ---- Password Visibility Toggle ----
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');

    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const container = button.parentElement;
            let input = container.querySelector('input[type="password"], input[type="text"]');

            if (!input && container.parentElement) {
                input = container.parentElement.querySelector('input[type="password"], input[type="text"]');
            }

            if (input) {
                const icon = button.querySelector('.material-symbols-outlined') || button;
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.textContent = 'visibility_off';
                } else {
                    input.type = 'password';
                    icon.textContent = 'visibility';
                }
            }
        });
    });

    // ---- Cart Functionality Simulation ----
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartBadges = document.querySelectorAll('.cart-badge');

    let cartCount = parseInt(localStorage.getItem('cartCount')) || 2;
    updateCartBadges();

    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            cartCount++;
            localStorage.setItem('cartCount', cartCount);
            updateCartBadges();

            // Show toast notification
            showToast('Item added to cart!');

            // Optional: Button animation
            const originalText = btn.innerHTML;
            btn.innerHTML = `<span class="material-symbols-outlined text-sm">check</span> Added`;
            btn.classList.add('bg-slate-800', 'text-white');
            btn.classList.remove('bg-slate-900', 'bg-primary', 'text-slate-900');

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('bg-slate-800', 'text-white');
                // Re-add original classes depending on button style (primary or slate)
                if (btn.classList.contains('bg-primary')) {
                    btn.classList.add('bg-primary', 'text-slate-900');
                } else {
                    btn.classList.add('bg-slate-900', 'text-white');
                }
            }, 2000);
        });
    });

    function updateCartBadges() {
        cartBadges.forEach(badge => {
            badge.textContent = cartCount;
            badge.classList.add('scale-150');
            setTimeout(() => badge.classList.remove('scale-150'), 200);
        });
    }

    // ---- Toast Notification System ----
    function showToast(message) {
        const existingToast = document.getElementById('toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-[100] transform transition-all duration-300 translate-y-10 opacity-0';
        toast.innerHTML = `
            <span class="material-symbols-outlined text-primary">check_circle</span>
            <span class="text-sm font-semibold">${message}</span>
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.remove('translate-y-10', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');
        }, 10);

        setTimeout(() => {
            toast.classList.remove('translate-y-0', 'opacity-100');
            toast.classList.add('translate-y-10', 'opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ---- Test/Bypass Login Button ----
    const testLoginBtn = document.getElementById('test-login-btn');
    if (testLoginBtn) {
        testLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const form = testLoginBtn.closest('form');
            if (form) form.submit();
        });
    }

    // ---- Category Filtering (Dashboard) ----
    const categoryBtns = document.querySelectorAll('.category-filter-btn');
    const mobileCategoryBtns = document.querySelectorAll('.mobile-cat-btn');
    const productCards = document.querySelectorAll('.product-card');
    const activeTitle = document.getElementById('active-category-title');
    const searchInput = document.getElementById('search-input');
    const emptyState = document.getElementById('empty-state');
    const paginationControl = document.getElementById('pagination-control');

    // Function to filter products based on category string
    function filterProducts(category) {
        let visibleCount = 0;

        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            // If category matches, or 'all' is selected
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'flex'; // Card uses flex layout
                // Add a small fade-in animation
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.3s ease-in';
                    card.style.opacity = '1';
                }, 10);
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Update empty state
        if (visibleCount === 0) {
            if (emptyState) emptyState.classList.remove('hidden');
            if (paginationControl) paginationControl.classList.add('hidden');
        } else {
            if (emptyState) emptyState.classList.add('hidden');
            if (paginationControl) paginationControl.classList.remove('hidden');
        }

        // Update Text / Titles based on category
        const titles = {
            'all': 'All Student Essentials',
            'books': 'College Textbooks',
            'tech': 'Electronics & Gadgets',
            'lab': 'Lab Equipment & Gear',
            'wheels': 'Cycles & Transport',
            'drafting': 'Architecture & Drafting'
        };

        if (activeTitle && titles[category]) {
            activeTitle.textContent = titles[category];
        }

        updateActiveButtonState(category);
    }

    // Helper to style active buttons on Desktop and Mobile
    function updateActiveButtonState(activeCategory) {
        // Desktop
        categoryBtns.forEach(btn => {
            const cat = btn.getAttribute('data-category');
            if (cat === activeCategory) {
                btn.classList.add('bg-primary/20', 'text-primary');
                btn.classList.remove('hover:bg-slate-50', 'text-slate-600');
            } else {
                btn.classList.remove('bg-primary/20', 'text-primary');
                btn.classList.add('hover:bg-slate-50', 'text-slate-600');
            }
        });

        // Mobile
        mobileCategoryBtns.forEach(btn => {
            const cat = btn.getAttribute('data-category');
            const iconCircle = btn.querySelector('.icon-circle');
            const textSpan = btn.querySelector('span:not(.material-symbols-outlined)');

            if (cat === activeCategory) {
                // Active State (Dark circle)
                iconCircle.classList.remove('bg-white', 'border-slate-200', 'text-slate-600');
                iconCircle.classList.add('bg-slate-900', 'border-slate-900', 'text-white', 'ring-2', 'ring-offset-2', 'ring-primary');
                textSpan.classList.remove('font-medium', 'text-slate-600');
                textSpan.classList.add('font-bold', 'text-slate-900');
            } else {
                // Inactive State
                iconCircle.classList.remove('bg-slate-900', 'border-slate-900', 'text-white', 'ring-2', 'ring-offset-2', 'ring-primary');
                iconCircle.classList.add('bg-white', 'border-slate-200', 'text-slate-600');
                textSpan.classList.remove('font-bold', 'text-slate-900');
                textSpan.classList.add('font-medium', 'text-slate-600');
            }
        });
    }

    // Add click listeners to Desktop Category filters
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            if (searchInput) searchInput.value = ''; // clear search
            const mobileSearch = document.getElementById('mobile-search-input');
            if (mobileSearch) mobileSearch.value = '';
            filterProducts(category);
        });
    });

    // Add click listeners to Mobile Category filters
    mobileCategoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            if (searchInput) searchInput.value = ''; // clear search
            const mobileSearch = document.getElementById('mobile-search-input');
            if (mobileSearch) mobileSearch.value = '';
            filterProducts(category);
        });
    });

    // Simple textual Search filter (Bonus functionality)
    const searchInputs = [searchInput, document.getElementById('mobile-search-input')];

    searchInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();

                // Keep both inputs in sync
                searchInputs.forEach(i => {
                    if (i && i !== input) i.value = e.target.value;
                });

                // Reset active categories visually if typing
                if (searchTerm.length > 0) {
                    updateActiveButtonState('none');
                    if (activeTitle) activeTitle.textContent = `Search results for "${searchTerm}"`;
                } else {
                    filterProducts('all'); // Revert back if empty
                    return;
                }

                let visibleCount = 0;
                productCards.forEach(card => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const categoryText = card.querySelector('p').textContent.toLowerCase();

                    if (title.includes(searchTerm) || categoryText.includes(searchTerm)) {
                        card.style.display = 'flex';
                        visibleCount++;
                    } else {
                        card.style.display = 'none';
                    }
                });

                if (emptyState) {
                    if (visibleCount === 0) emptyState.classList.remove('hidden');
                    else emptyState.classList.add('hidden');
                }
            });
        }
    });

    // Connect Desktop "APPLY FILTERS" Button to logic
    const applyFiltersBtn = document.getElementById('apply-filters-btn');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Just simulate a load effect, as real-time filters are already applying via category changes above
            applyFiltersBtn.innerHTML = `<span class="material-symbols-outlined absolute animate-spin">refresh</span> <span class="opacity-0">APPLY FILTERS</span>`;
            setTimeout(() => {
                applyFiltersBtn.innerHTML = `APPLY FILTERS`;
                if (window.showToast) window.showToast('Filters strongly applied!');
            }, 600);
        });
    }

    // ==== Checkout Page Interaction ====
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const upiInputDiv = document.getElementById('upi-input-div'); // Requires ID creation in html

    if (paymentRadios.length > 0) {
        paymentRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const isUPI = e.target.closest('label').innerHTML.includes('UPI');
                if (upiInputDiv) {
                    if (isUPI) upiInputDiv.style.display = 'block';
                    else upiInputDiv.style.display = 'none';
                }
            });
        });
    }

    // Handle "View All" empty links gracefully
    document.querySelectorAll('a[href="#"], a[href=""]').forEach(link => {
        link.addEventListener('click', (e) => {
            const hasRealAction = link.classList.contains('add-to-cart-btn') || link.classList.contains('toggle-password');
            if (!hasRealAction) {
                e.preventDefault();
                console.log('Action triggered on empty link');
            }
        });
    });
});
