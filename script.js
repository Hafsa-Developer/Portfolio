// NavbarController class
class NavbarController {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.menu = document.querySelector('.menu');
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener('scroll', () => this.handleScroll());
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.handleLinkClick());
        });
        this.menuToggle.addEventListener('click', () => this.toggleMenu());
    }

    handleScroll() {
        if (window.scrollY > 0) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    handleLinkClick() {
        if (window.innerWidth <= 768) {
            this.menu.classList.remove('show');
        }
    }

    toggleMenu() {
        this.menu.classList.toggle('show');
    }
}

// TypingEffect class
class TypingEffect {
    constructor() {
        this.typedText = document.getElementById('typing-text'); // Correct ID
        this.words = ['Web Developer', 'Frontend Developer'];
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.typingDelay = 100;
        this.erasingDelay = 50;
        this.newWordDelay = 2000;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentWord = this.words[this.wordIndex];
        if (this.isDeleting) {
            this.typedText.textContent = currentWord.substring(0, this.charIndex - 1);
            this.charIndex--;
            if (this.charIndex === 0) {
                this.isDeleting = false;
                this.wordIndex = (this.wordIndex + 1) % this.words.length;
                setTimeout(() => this.type(), 500);
            } else {
                setTimeout(() => this.type(), this.erasingDelay);
            }
        } else {
            this.typedText.textContent = currentWord.substring(0, this.charIndex + 1);
            this.charIndex++;
            if (this.charIndex === currentWord.length) {
                this.isDeleting = true;
                setTimeout(() => this.type(), this.newWordDelay);
            } else {
                setTimeout(() => this.type(), this.typingDelay);
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TypingEffect();
});

// FormController class
const sanitizeInput = (input) => input.replace(/<[^>]*>/g, ''); 
class FormController {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.messageInput = document.getElementById('message');
        this.errorMessage = document.getElementById('error-message');
        this.successMessage = document.getElementById('success-message');
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        const name = this.nameInput.value.trim();
        const email = this.emailInput.value.trim();
        const message = this.messageInput.value.trim();

        if (!name || !email || !message) {
            this.displayError('All fields are required.');
        } else if (!this.isValidEmail(email)) {
            this.displayError('Please enter a valid email address.');
        } else {
            this.displaySuccess('Message sent successfully!');
            this.form.reset();
        }
    }

    displayError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.style.display = 'block';
        this.successMessage.style.display = 'none';
    }

    displaySuccess(message) {
        this.successMessage.textContent = message;
        this.successMessage.style.display = 'block';
        this.errorMessage.style.display = 'none';
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// ProjectsController class
class ProjectsController {
    constructor() {
        this.exploreIcons = document.querySelectorAll('.explore-icon');
        this.modal = document.getElementById('projectModal');
        this.modalImage = document.getElementById('modalProjectImage');
        this.modalTitle = document.getElementById('modalProjectTitle');
        this.modalDescription = document.getElementById('modalProjectDescription');
        this.liveDemoLink = document.getElementById('liveDemoLink');
        this.liveDemoLink.rel = 'noopener noreferrer';
        this.closeBtn = document.getElementById('closeModal');

        this.projectData = [
            {
                image: '/Images/Code_editor_preview.png',
                title: 'Code Editor',
                description: 'Online IDE with multiple language support',
                link: 'https://github.com/Hafsa-Developer/Online-Code-Editor'
            },
            {
                image: '/Images/Amazon_clone-preview.png',
                title: 'Amazon Clone',
                description: 'Amazon Homepage Clone built with HTML and CSS',
                link: 'https://github.com/Hafsa-Developer/Amazon-Clone-'
            },
            {
                image: '/Images/To_do_list_app_preview.png',
                title: 'Task Manager',
                description: 'Productivity app with task management features',
                link: 'https://github.com/Hafsa-Developer/Task-Management-App'
            }
        ];

        this.init();
    }

    init() {
        this.exploreIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                const projectId = e.currentTarget.getAttribute('data-project') - 1;
                const project = this.projectData[projectId];

                this.modalImage.src = project.image;
                this.modalTitle.textContent = project.title;
                this.modalDescription.textContent = project.description;
                this.liveDemoLink.href = project.link;

                this.modal.style.display = 'block';
            });
        });

        this.closeBtn.addEventListener('click', () => {
            this.modal.style.display = 'none';
        });
    }
}


new ProjectsController();


// ResumeController class
class ResumeController {
    constructor() {
        this.resumeButton = document.getElementById('download-resume');
        this.resumeLink = 'resume.pdf'; 
        this.init();
    }

    init() {
        this.resumeButton.addEventListener('click', () => this.downloadResume());
    }

    downloadResume() {
        const link = document.createElement('a');
        link.href = this.resumeLink;
        link.download = 'resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// ScrollToTopController class (missing part completed)
class ScrollToTopController {
    constructor() {
        this.scrollToTopBtn = document.getElementById('scrollToTop');
        this.aboutSection = document.getElementById('about');
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener('scroll', () => this.toggleScrollToTopButton());
        if (this.scrollToTopBtn) {
            this.scrollToTopBtn.addEventListener('click', () => this.scrollToTop());
        }
    }

    toggleScrollToTopButton() {
        if (window.scrollY > this.aboutSection.offsetTop / 2) {
            this.scrollToTopBtn.style.display = 'block';
        } else {
            this.scrollToTopBtn.style.display = 'none';
        }
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Initialize all controllers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NavbarController();
    new FormController();
    new ProjectsController();
    new ResumeController();
    new ScrollToTopController();
});
