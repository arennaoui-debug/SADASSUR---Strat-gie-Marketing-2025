document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialisation des icônes Lucide
    // (Vérifie si lucide est bien chargé)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        console.warn('Lucide icons library not found. Make sure the script is included.');
    }

    // 2. Gestion du système d'onglets (Tabs)
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-tab-target');

            // Mettre à jour les boutons
            tabButtons.forEach(btn => {
                btn.setAttribute('aria-selected', 'false');
                // Classes pour l'état inactif (Tailwind-like)
                btn.classList.remove('bg-primary', 'text-white', 'shadow-lg');
                btn.classList.add('text-gray-600', 'hover:bg-gray-100');
            });

            // Mettre à jour le bouton actif
            button.setAttribute('aria-selected', 'true');
            button.classList.add('bg-primary', 'text-white', 'shadow-lg');
            button.classList.remove('text-gray-600', 'hover:bg-gray-100');

            // Mettre à jour le contenu (panes)
            tabPanes.forEach(pane => {
                if (pane.getAttribute('data-tab-content') === targetId) {
                    pane.classList.remove('hidden');
                    pane.classList.add('active');
                } else {
                    pane.classList.add('hidden');
                    pane.classList.remove('active');
                }
            });
        });
    });
    
    // Activation de l'onglet initial (le premier)
    if (tabButtons.length > 0) {
        // Applique l'état 'active' au premier bouton
        tabButtons[0].click(); 
    }


    // 3. Gestion des accordéons
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.closest('.accordion-item');
            
            // Toggle la classe 'active' sur l'élément parent
            accordionItem.classList.toggle('active');
        });
    });

    // 4. Animation d'apparition au défilement (Fade-in)
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    // Vérifie si l'API IntersectionObserver est supportée
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null, // Par rapport au viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% de l'élément doit être visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // L'élément est visible
                    entry.target.classList.add('is-visible');
                    // Optionnel : arrêter d'observer une fois l'animation jouée
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observer chaque section
        fadeInSections.forEach(section => {
            observer.observe(section);
        });

    } else {
        // Fallback pour les vieux navigateurs (affiche tout directement)
        fadeInSections.forEach(section => {
            section.classList.add('is-visible');
        });
    }
});
