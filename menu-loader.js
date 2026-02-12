class MenuLoader {
    constructor() {
        this.menuData = [];
        this.currentCategoryIndex = 0;
        this.categories = [];
        this.switchInterval = 60000; // Switch every 1 minute
        this.currentFeaturedIndex = 0; // For rotating featured items
    }

    async loadMenuData() {
        try {
            const response = await fetch('menu-webm.json');
            this.menuData = await response.json();
        } catch (error) {
            console.error('Error loading menu data:', error);
        }
    }

    setCategoriesForScreen(categoryNames) {
        this.categories = this.menuData.filter(category => 
            categoryNames.includes(category.category)
        );
        this.currentCategoryIndex = 0;
    }

    renderCategory(category) {
        const container = document.getElementById('menu-container');
        
        // Clear container first
        container.innerHTML = '';
        
        // Render based on category type
        if (category.category === 'Huvudrätter') {
            this.renderHuvudratter(category, container);
        } else if (category.category === 'Injera/Kisra') {
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'category-header';
            categoryHeader.innerHTML = `<h1>${category.category}</h1>`;
            container.appendChild(categoryHeader);
            this.renderInjera(category, container);
        } else if (category.category === 'Frukost') {
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'category-header';
            categoryHeader.innerHTML = `<h1>${category.category}</h1>`;
            container.appendChild(categoryHeader);
            this.renderFrukost(category, container);
        } else if (category.category === 'Extra') {
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'category-header';
            categoryHeader.innerHTML = `<h1>${category.category}</h1>`;
            container.appendChild(categoryHeader);
            this.renderExtra(category, container);
        } else {
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'category-header';
            categoryHeader.innerHTML = `<h1>${category.category}</h1>`;
            container.appendChild(categoryHeader);
            this.renderDefault(category, container);
        }
        
        // Add fade-in animation
        container.style.opacity = '0';
        setTimeout(() => {
            container.style.opacity = '1';
        }, 100);
    }

    renderHuvudratter(category, container) {
        // Load specific CSS for huvudrätter
        this.loadCSS('css/huvudratter.css');
        
        // Add body class for themed background
        document.body.className = 'huvudratter-theme';
        
        // Remove any existing indicators
        const existingIndicators = document.querySelector('.category-indicators');
        if (existingIndicators) {
            existingIndicators.remove();
        }
        
        // Create left-aligned category header
        const categoryHeaderLeft = document.createElement('div');
        categoryHeaderLeft.className = 'category-header-left';
        categoryHeaderLeft.innerHTML = `<h1>${category.category}</h1>`;
        
        // Create layout container
        const layoutContainer = document.createElement('div');
        layoutContainer.className = 'huvudratter-layout';
        
        // Rotate featured item each time
        const featuredItem = category.items[this.currentFeaturedIndex % category.items.length];
        const remainingItems = category.items.filter((_, index) => index !== (this.currentFeaturedIndex % category.items.length));
        
        // Create featured item
        const featuredCard = document.createElement('div');
        featuredCard.className = 'featured-item';
        featuredCard.innerHTML = `
            <div class="item-image">
                <img src="${featuredItem.image}" alt="${featuredItem.title}" onerror="this.style.display='none'">
            </div>
            <div class="item-content">
                <h3 class="item-title">
                    <span class="title-swedish">${featuredItem.title}</span>
                    <span class="title-arabic">${featuredItem.title_ar || ''}</span>
                </h3>
                <p class="item-description">${featuredItem.description}</p>
                <div class="item-price">${featuredItem.price}</div>
            </div>
        `;
        
        // Create secondary items container
        const secondaryContainer = document.createElement('div');
        secondaryContainer.className = 'secondary-items';
        
        remainingItems.forEach((item, index) => {
            const itemCard = document.createElement('div');
            itemCard.className = 'secondary-item';
            itemCard.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.title}" onerror="this.style.display='none'">
                </div>
                <div class="item-content">
                    <h3 class="item-title">
                        <span class="title-swedish">${item.title}</span>
                        <span class="title-arabic">${item.title_ar || ''}</span>
                    </h3>
                    <p class="item-description">${item.description}</p>
                    <div class="item-price">${item.price}</div>
                </div>
            `;
            itemCard.style.animationDelay = `${(index + 1) * 0.1}s`;
            secondaryContainer.appendChild(itemCard);
        });
        
        // Create info section
        const infoSection = document.createElement('div');
        infoSection.className = 'info-section';
        infoSection.innerHTML = `
            <span class="info-text">• Alla huvudrätter kan göras med ris eller bulgur • Sallad, soppa och te ingår alltid</span>
        `;
        
        layoutContainer.appendChild(categoryHeaderLeft);
        layoutContainer.appendChild(featuredCard);
        layoutContainer.appendChild(infoSection);
        layoutContainer.appendChild(secondaryContainer);
        container.appendChild(layoutContainer);

        // Trigger the animation
        setTimeout(() => {
            featuredCard.classList.add('animate');
        }, 100);
        
        // Increment featured index for next rotation
        this.currentFeaturedIndex++;
    }

    renderInjera(category, container) {
        // Load specific CSS for injera
        this.loadCSS('css/injera.css');
        
        // Apply body class for themed background
        document.body.className = 'huvudratter-theme';
        
        const itemsGrid = document.createElement('div');
        itemsGrid.className = 'injera-layout';
        
        category.items.forEach((item, index) => {
            const itemCard = document.createElement('div');
            itemCard.className = 'injera-item';
            itemCard.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.title}" onerror="this.style.display='none'">
                </div>
                <div class="item-content">
                    <h3 class="item-title">
                        <span class="title-swedish">${item.title}</span>
                        <span class="title-arabic">${item.title_ar || ''}</span>
                    </h3>
                    <p class="item-description">${item.description}</p>
                    <div class="item-price">${item.price}</div>
                </div>
            `;
            itemCard.style.animationDelay = `${index * 0.1}s`;
            itemsGrid.appendChild(itemCard);
        });
        
        container.appendChild(itemsGrid);
    }

    renderFrukost(category, container) {
        this.loadCSS('css/frukost.css');
        document.body.className = 'huvudratter-theme';

        const itemsGrid = document.createElement('div');
        itemsGrid.className = 'frukost-layout';

        category.items.forEach((item, index) => {
            const itemCard = document.createElement('div');
            itemCard.className = 'frukost-item';
            itemCard.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.title}" onerror="this.style.display='none'">
                </div>
                <div class="item-content">
                    <h3 class="item-title">
                        <span class="title-swedish">${item.title}</span>
                        <span class="title-arabic">${item.title_ar || ''}</span>
                    </h3>
                    <p class="item-description">${item.description}</p>
                    <div class="item-price">${item.price}</div>
                </div>
            `;
            itemCard.style.animationDelay = `${index * 0.1}s`;
            itemsGrid.appendChild(itemCard);
        });
        container.appendChild(itemsGrid);
    }

    renderExtra(category, container) {
        this.loadCSS('css/extra.css');
        document.body.className = 'huvudratter-theme';

        const itemsGrid = document.createElement('div');
        itemsGrid.className = 'extra-layout';

        category.items.forEach((item, index) => {
            const itemCard = document.createElement('div');
            itemCard.className = 'extra-item';
            itemCard.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.title}" onerror="this.style.display='none'">
                </div>
                <div class="item-content">
                    <h3 class="item-title">
                        <span class="title-swedish">${item.title}</span>
                        <span class="title-arabic">${item.title_ar || ''}</span>
                    </h3>
                    <p class="item-description">${item.description}</p>
                    <div class="item-price">${item.price}</div>
                </div>
            `;
            itemCard.style.animationDelay = `${index * 0.1}s`;
            itemsGrid.appendChild(itemCard);
        });
        container.appendChild(itemsGrid);
    }

    renderDefault(category, container) {
        // Apply body class for themed background
        document.body.className = 'huvudratter-theme';

        // Default grid layout for other categories
        const itemsGrid = document.createElement('div');
        itemsGrid.className = 'items-grid';
        
        category.items.forEach((item, index) => {
            const itemCard = document.createElement('div');
            itemCard.className = 'menu-item';
            itemCard.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.title}" onerror="this.style.display='none'">
                </div>
                <div class="item-content">
                    <h3 class="item-title">
                        <span class="title-swedish">${item.title}</span>
                        <span class="title-arabic">${item.title_ar || ''}</span>
                    </h3>
                    <p class="item-description">${item.description}</p>
                    <div class="item-price">${item.price}</div>
                </div>
            `;
            itemCard.style.animationDelay = `${index * 0.1}s`;
            itemsGrid.appendChild(itemCard);
        });
        
        container.appendChild(itemsGrid);
    }

    loadCSS(href) {
        // Check if CSS is already loaded
        if (document.querySelector(`link[href="${href}"]`)) return;
        
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }

    startCategoryRotation() {
        if (this.categories.length === 0) return;

        const container = document.getElementById('menu-container');

        const switchCategory = () => {
            // 1. Fade out
            container.style.opacity = '0';

            // 2. Wait for fade out, then re-render
            setTimeout(() => {
                this.currentCategoryIndex = (this.currentCategoryIndex + 1) % this.categories.length;
                this.renderCategory(this.categories[this.currentCategoryIndex]);

                // 3. Fade in
                container.style.opacity = '1';
            }, 500); // This should match the CSS transition time
        };

        // Initial render
        this.renderCategory(this.categories[this.currentCategoryIndex]);
        container.style.opacity = '1';

        document.addEventListener('keydown', (e) => {
            if (e.key === ' ') {
                switchCategory();
            }
        });

        // Set up automatic switching
        setInterval(switchCategory, this.switchInterval);
    }

    // Category indicators removed for cleaner design
    createCategoryIndicators() {
        // No longer creating indicators - removed for cleaner interface
        return;
    }
}

// Initialize menu loader
const menuLoader = new MenuLoader();