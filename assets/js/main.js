// 1. BASE DE DONNÉES UNIQUE (Timeline + Projets)
const siteData = {
    // Parcours
    'bepc': {
        titre: "Collège (BEPC)",
        sousTitre: "Mariame Camara, Diecké, Guinée",
        description: "Examen réussi avec brio. Major de promotion avec une moyenne située entre 16 et 18."
    },
    'lycee': {
        titre: "Lycée (BAC)",
        sousTitre: "Nom de ton Lycée, Ville",
        description: "Spécialisation en [Ta Filière]. Mention Très Bien obtenue."
    },
    // Projets (Rapports détaillés)
    'proj-1': {
        titre: "Audit de Performance",
        sousTitre: "Finance & Analyse",
        description: "<strong>Le Défi :</strong> Optimisation des flux financiers.<br><strong>Solution :</strong> Automatisation via Python.<br><strong>Résultat :</strong> Gain de temps de 20%."
    },
    'proj-2': {
        titre: "Refonte Écosystème",
        sousTitre: "Digital & Cloud",
        description: "Analyse complète de l'infrastructure et migration cloud sécurisée."
    }
};

// 2. FONCTION UNIQUE D'OUVERTURE
function openModal(id) {
    // On cherche d'abord la modale des projets (plus complète)
    let modal = document.getElementById('global-modal');
    let body = document.getElementById('modal-loader-content');

    // Si on clique sur la timeline, on peut utiliser la même ou l'autre
    if (!modal) {
        modal = document.getElementById('timeline-modal');
        body = document.getElementById('modal-body');
    }

    const data = siteData[id];

    if (data && modal && body) {
        body.innerHTML = `
            <div class="modal-report">
                <h2 style="color:var(--accent-color);">${data.titre}</h2>
                <h4 style="opacity:0.7; margin-bottom:20px;">${data.sousTitre}</h4>
                <div style="line-height:1.6;">${data.description}</div>
            </div>
        `;
        
        modal.style.display = "flex"; // ON FORCE LE FLEX POUR LE CENTRAGE
        document.body.style.overflow = "hidden";
        
        // Relancer les icônes si besoin
        if(window.lucide) lucide.createIcons();
    }
}

// 3. FONCTION DE FERMETURE UNIQUE
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(m => m.style.display = "none");
    document.body.style.overflow = "auto";
}

// Fermer au clic sur le fond sombre
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal();
    }
};



// Dans ton fichier main.js, complète l'objet contents :
const contents = {
    'exp-1': '...', 
    'edu-1': '...',
    'proj-1': '<h2>Audit de Performance</h2><p>Description détaillée du projet financier...</p><img src="assets/images/projet1.jpg" style="width:100%; border-radius:12px; margin-top:15px;">',
    'proj-2': '<h2>Refonte Écosystème</h2><p>Détails techniques de l\'infrastructure digitale...</p>'
};








// SYSTÈME DE FILTRAGE DU BLOG
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Changer l'état actif des boutons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 2. Filtrer les cartes
            const filterValue = btn.getAttribute('data-filter');

            blogCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                    card.classList.add('show');
                } else {
                    card.classList.add('hide');
                    card.classList.remove('show');
                }
            });
        });
    });
});




const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "all 0.6s ease-out";
    observer.observe(section);
});






function moveSlider(direction) {
    const grid = document.getElementById('projetsGrid');
    const scrollAmount = 380; // 350px (carte) + 30px (gap)
    
    grid.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}






function moveSlider(gridId, direction) {
    const grid = document.getElementById(gridId);
    // On calcule la largeur d'une carte dynamiquement
    const cardWidth = grid.querySelector(':scope > div, :scope > article').offsetWidth;
    const gap = 25; // Le gap défini dans ton CSS
    
    const scrollAmount = cardWidth + gap;
    
    grid.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}







const allPosts = [
    {
        id: 1,
        date: "12 Jan 2026",
        titre: "L'impact de l'IA sur l'analyse financière",
        resume: "Comment les nouveaux modèles de langage transforment la gestion...",
        categorie: "finance",
        lien: "articles/ia-finance.html"
    },
    {
        id: 2,
        date: "05 Jan 2026",
        titre: "Optimisation fiscale en 2026",
        resume: "Les nouvelles directives pour les entreprises technologiques.",
        categorie: "finance",
        lien: "articles/fiscalite.html"
    },
    {
        id: 3,
        date: "28 Dec 2025",
        titre: "Design Thinking en Gestion de Projet",
        resume: "Appliquer les méthodes créatives à la rigueur financière.",
        categorie: "design",
        lien: "articles/design-thinking.html"
    }
];









// Fonction pour afficher les articles (utilisée pour l'affichage initial et le filtrage)
function renderBlogPosts(categoryFilter = 'all') {
    const blogContainer = document.getElementById('blog-posts-container');
    if (!blogContainer) return;

    // 1. On filtre les données
    const filteredPosts = allPosts.filter(post => 
        categoryFilter === 'all' || post.categorie === categoryFilter
    );

    // 2. On génère le HTML
    blogContainer.innerHTML = filteredPosts.map(post => `
        <article class="blog-card" data-category="${post.categorie}">
            <div class="blog-card-content">
                <span class="blog-date">${post.date}</span>
                <h3>${post.titre}</h3>
                <p>${post.resume}</p>
                <a href="${post.lien}" class="read-more">Lire l'article <i data-lucide="arrow-right"></i></a>
            </div>
        </article>
    `).join('');

    // 3. On relance les icônes Lucide
    if(window.lucide) lucide.createIcons();
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
    
    // --- PARTIE ACCUEIL ---
    const previewContainer = document.getElementById('blog-preview-container');
    if (previewContainer) {
        const latestPosts = allPosts.slice(0, 2); 
        previewContainer.innerHTML = latestPosts.map(post => `
            <article class="blog-mini-card">
                <span class="blog-date">${post.date}</span>
                <h3>${post.titre}</h3>
                <p>${post.resume}</p>
                <a href="blog.html" class="read-more">Lire l'article</a>
            </article>
        `).join('');
    }

    // --- PARTIE PAGE BLOG (SYSTÈME DE FILTRE) ---
    const blogContainer = document.getElementById('blog-posts-container');
    if (blogContainer) {
        // Premier affichage (Tous les articles)
        renderBlogPosts('all');

        // Gestion des clics sur les boutons de filtre
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Changer l'apparence des boutons
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filtrer et ré-afficher
                const category = btn.getAttribute('data-filter');
                renderBlogPosts(category);
            });
        });
    }

});



// Gestion du Bouton du Mobile

const mobileBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Change l'icône entre Menu et X
        const icon = mobileBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });
}

// Ferme le menu quand on clique sur un lien
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileBtn.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
});
