/**
 * Nexus 3D Toolkit - Main Application Controller
 */

class NexusApp {
    constructor() {
        this.currentCategory = 'all';
        this.searchQuery = '';
        this.favoritesOnly = false;
        this.favorites = this.loadFavorites();
        this.activeTool = null;

        this.initDOMElements();
        this.bindEvents();
        this.renderCategories();
        this.renderTools();
        this.checkUrlParams();
    }

    initDOMElements() {
        this.categoriesBar = document.getElementById('categories-bar');
        this.toolsGrid = document.getElementById('tools-grid');
        this.searchInput = document.getElementById('search-input');
        this.toolsCountEl = document.getElementById('tools-count');
        this.favFilterBtn = document.getElementById('btn-fav-filter');
        this.favCountBadge = document.getElementById('fav-count');

        // Modal elements
        this.modalOverlay = document.getElementById('tool-modal');
        this.modalTitle = document.getElementById('modal-tool-title');
        this.modalDesc = document.getElementById('modal-tool-desc');
        this.modalIcon = document.getElementById('modal-tool-icon');
        this.modalContainer = document.getElementById('modal-tool-container');
        this.modalCloseBtn = document.getElementById('modal-close-btn');
        this.modalFavBtn = document.getElementById('modal-fav-btn');
        this.modalShareBtn = document.getElementById('modal-share-btn');
    }

    bindEvents() {
        // Search input
        this.searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase().trim();
            this.renderTools();
        });

        // Keyboard shortcut Ctrl/Cmd + K
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.searchInput.focus();
            }
            if (e.key === 'Escape' && this.modalOverlay.classList.contains('active')) {
                this.closeModal();
            }
        });

        // Favorites filter button
        this.favFilterBtn.addEventListener('click', () => {
            this.favoritesOnly = !this.favoritesOnly;
            this.favFilterBtn.classList.toggle('active', this.favoritesOnly);
            this.renderTools();
        });

        // Modal close
        this.modalCloseBtn.addEventListener('click', () => this.closeModal());
        this.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.modalOverlay) this.closeModal();
        });

        // Modal favorite toggle
        this.modalFavBtn.addEventListener('click', () => {
            if (this.activeTool) {
                this.toggleFavorite(this.activeTool.id);
                this.updateModalFavIcon();
            }
        });

        // Modal share button
        this.modalShareBtn.addEventListener('click', () => {
            if (this.activeTool) {
                const url = `${window.location.origin}${window.location.pathname}?tool=${this.activeTool.id}`;
                navigator.clipboard.writeText(url).then(() => {
                    ToolsEngine.toast('Direct tool link copied to clipboard!');
                });
            }
        });
    }

    loadFavorites() {
        try {
            return JSON.parse(localStorage.getItem('nexus_favs') || '[]');
        } catch {
            return [];
        }
    }

    saveFavorites() {
        localStorage.setItem('nexus_favs', JSON.stringify(this.favorites));
        this.favCountBadge.textContent = this.favorites.length;
    }

    toggleFavorite(toolId, event) {
        if (event) event.stopPropagation();
        const idx = this.favorites.indexOf(toolId);
        if (idx === -1) {
            this.favorites.push(toolId);
            ToolsEngine.toast('Added to favorites!', 'fa-heart');
        } else {
            this.favorites.splice(idx, 1);
            ToolsEngine.toast('Removed from favorites', 'fa-heart-crack');
        }
        this.saveFavorites();
        this.renderTools();
    }

    renderCategories() {
        this.categoriesBar.innerHTML = '';
        Object.values(TOOL_CATEGORIES).forEach(cat => {
            const btn = document.createElement('button');
            btn.className = `category-tab ${this.currentCategory === cat.id ? 'active' : ''}`;
            btn.innerHTML = `<i class="${cat.icon}"></i> <span>${cat.name}</span> <span class="cat-count">${cat.count}</span>`;
            btn.addEventListener('click', () => {
                this.currentCategory = cat.id;
                document.querySelectorAll('.category-tab').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderTools();
            });
            this.categoriesBar.appendChild(btn);
        });
        this.favCountBadge.textContent = this.favorites.length;
    }

    getFilteredTools() {
        return TOOLS_DATABASE.filter(tool => {
            // Category filter
            if (this.currentCategory !== 'all' && tool.category !== this.currentCategory) {
                return false;
            }
            // Favorites filter
            if (this.favoritesOnly && !this.favorites.includes(tool.id)) {
                return false;
            }
            // Search query filter
            if (this.searchQuery) {
                const matchTitle = tool.title.toLowerCase().includes(this.searchQuery);
                const matchDesc = tool.description.toLowerCase().includes(this.searchQuery);
                const matchTags = tool.tags.some(t => t.toLowerCase().includes(this.searchQuery));
                return matchTitle || matchDesc || matchTags;
            }
            return true;
        });
    }

    renderTools() {
        const filtered = this.getFilteredTools();
        this.toolsCountEl.textContent = `Showing ${filtered.length} of ${TOOLS_DATABASE.length} Tools`;
        this.toolsGrid.innerHTML = '';

        if (filtered.length === 0) {
            this.toolsGrid.innerHTML = `
                <div class="no-tools-found">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <h3>No Tools Found</h3>
                    <p style="color:var(--text-muted); margin-top:6px;">Try adjusting your search terms or selecting another category.</p>
                </div>
            `;
            return;
        }

        filtered.forEach(tool => {
            const card = document.createElement('div');
            card.className = 'tool-card';
            card.dataset.toolId = tool.id;

            const isFav = this.favorites.includes(tool.id);
            card.innerHTML = `
                <div class="card-top">
                    <div class="tool-icon-box">
                        <i class="${tool.icon}"></i>
                    </div>
                    <button class="card-fav-btn ${isFav ? 'is-fav' : ''}" title="Favorite">
                        <i class="fa-${isFav ? 'solid' : 'regular'} fa-heart"></i>
                    </button>
                </div>
                <h3 class="tool-card-title">${tool.title}</h3>
                <p class="tool-card-desc">${tool.description}</p>
                <div class="card-bottom">
                    <span class="card-cat-badge">${tool.category}</span>
                    <span class="card-launch-label">Open Tool <i class="fa-solid fa-arrow-right"></i></span>
                </div>
            `;

            // Card click opens tool modal
            card.addEventListener('click', (e) => {
                if (e.target.closest('.card-fav-btn')) {
                    this.toggleFavorite(tool.id, e);
                } else {
                    this.openTool(tool);
                }
            });

            this.toolsGrid.appendChild(card);
        });

        // Initialize 3D Tilt on all cards
        if (typeof Vanilla3DTilt !== 'undefined') {
            Vanilla3DTilt.apply('.tool-card');
        }
    }

    openTool(tool) {
        this.activeTool = tool;
        this.modalTitle.textContent = tool.title;
        this.modalDesc.textContent = tool.description;
        this.modalIcon.innerHTML = `<i class="${tool.icon}"></i>`;
        this.updateModalFavIcon();

        // Render tool interface
        ToolsEngine.render(tool.id, this.modalContainer);

        // Update URL hash without reload
        const newUrl = `${window.location.pathname}?tool=${tool.id}`;
        window.history.pushState({ toolId: tool.id }, '', newUrl);

        this.modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        this.activeTool = null;
        window.history.pushState({}, '', window.location.pathname);
    }

    updateModalFavIcon() {
        if (!this.activeTool) return;
        const isFav = this.favorites.includes(this.activeTool.id);
        this.modalFavBtn.innerHTML = `<i class="fa-${isFav ? 'solid' : 'regular'} fa-heart" style="${isFav ? 'color:var(--accent-pink);' : ''}"></i>`;
    }

    checkUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const toolParam = params.get('tool');
        if (toolParam) {
            const tool = TOOLS_DATABASE.find(t => t.id === toolParam);
            if (tool) {
                setTimeout(() => this.openTool(tool), 200);
            }
        }
    }
}

// Launch app when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    window.nexusApp = new NexusApp();
});
