document.addEventListener('DOMContentLoaded', function () {
    const sidebarContainer = document.getElementById('sidebar-placeholder');

    if (sidebarContainer) {
        fetch('components/sidebar.html')
            .then(response => response.text())
            .then(data => {
                sidebarContainer.innerHTML = data;
                initializeSidebar();
            });
    }
});

function initializeSidebar() {
    const currentPage = window.location.pathname.split("/").pop().split(".")[0] || "dashboard";
    const sidebarLinks = document.querySelectorAll('.nav-link, .submenu-link');
    const menuToggles = document.querySelectorAll('.menu-toggle');

    // 1. Set Active Link
    sidebarLinks.forEach(link => {
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
            // If it's in a submenu, expand the parent
            const parentItem = link.closest('.nav-item');
            if (parentItem) parentItem.classList.add('expanded');
        }
    });

    // 2. Handle Submenu Toggles
    menuToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const navItem = toggle.closest('.nav-item');
            navItem.classList.toggle('expanded');
        });
    });

    // 3. Mobile Sidebar Toggle & Overlay
    const sidebarToggleBtn = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (sidebarToggleBtn) {
        sidebarToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent immediate close
            if (window.innerWidth <= 768) {
                sidebar.classList.toggle('show');
                if (sidebarOverlay) sidebarOverlay.classList.toggle('show');
            } else {
                sidebar.classList.toggle('collapsed');
                if (mainContent) mainContent.classList.toggle('expanded');
            }
        });
    }

    // Close sidebar when clicking overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('show');
            sidebarOverlay.classList.remove('show');
        });
    }

    // Handle Resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            if (sidebar) sidebar.classList.remove('show');
            if (sidebarOverlay) sidebarOverlay.classList.remove('show');
        }
    });

    // Close on link click (mobile)
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                if (sidebar) sidebar.classList.remove('show');
                if (sidebarOverlay) sidebarOverlay.classList.remove('show');
            }
        });
    });
}