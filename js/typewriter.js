/**
 * Modern Typewriter Effect Component
 * Replaces jQuery text rotator with smooth character-by-character typing
 * Includes accessibility, responsive design, and performance optimizations
 */
class ModernTypewriter {
  constructor(element, options = {}) {
    this.element = element;
    this.words = this.parseWords(element.dataset.words || '');
    this.currentIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.isRunning = false;
    this.animationId = null;
    this.resizeHandler = null;
    
    // Default options
    this.options = {
      typingSpeed: 100,
      deletingSpeed: 50,
      pauseDuration: 2000,
      cursorChar: '|',
      cursorBlinkSpeed: 500,
      responsiveBreakpoint: 768,
      maxWordLength: 20,
      ...options
    };
    
    // Get DOM elements
    this.textElement = element.querySelector('.typewriter-text');
    this.cursorElement = element.querySelector('.typewriter-cursor');
    
    if (!this.textElement || !this.cursorElement) {
      console.warn('Typewriter: Required elements not found');
      return;
    }
    
    this.init();
  }
  
  init() {
    this.setupAccessibility();
    this.calculateContainerHeight();
    this.setupResponsive();
    
    // Delay start to prevent layout shifts during page load
    setTimeout(() => this.start(), 300);
  }
  
  parseWords(dataString) {
    if (!dataString) return [];
    return dataString.split(',').map(word => word.trim()).filter(word => word.length > 0);
  }
  
  setupAccessibility() {
    // Add accessibility attributes
    this.element.setAttribute('aria-live', 'polite');
    this.element.setAttribute('aria-label', 'Rotating professional titles');
    
    // Create hidden text for screen readers
    const srText = document.createElement('div');
    srText.className = 'sr-only';
    srText.textContent = `Professional titles: ${this.words.join(', ')}`;
    srText.setAttribute('aria-hidden', 'true');
    this.element.appendChild(srText);
    
    // Hide cursor from screen readers
    this.cursorElement.setAttribute('aria-hidden', 'true');
  }
  
  calculateContainerHeight() {
    // Use fixed height to prevent any layout shifts
    this.element.style.minHeight = '1.5em';
    this.element.style.maxHeight = '1.5em';
    this.element.style.height = '1.5em';
  }
  
  setupResponsive() {
    // Handle window resize with debouncing
    this.resizeHandler = this.debounce(() => {
      this.handleResponsive();
    }, 250);
    
    window.addEventListener('resize', this.resizeHandler);
    
    // Initial responsive setup
    this.handleResponsive();
  }
  
  handleResponsive() {
    const isMobile = window.innerWidth < this.options.responsiveBreakpoint;
    
    if (isMobile) {
      this.truncateLongWords();
      this.adjustTimingForMobile();
    } else {
      this.restoreOriginalWords();
      this.adjustTimingForDesktop();
    }
    
    // Recalculate height for new words
    this.calculateContainerHeight();
  }
  
  truncateLongWords() {
    if (!this.originalWords) {
      this.originalWords = [...this.words];
    }
    
    this.words = this.words.map(word => 
      word.length > this.options.maxWordLength 
        ? word.substring(0, this.options.maxWordLength) + '...'
        : word
    );
  }
  
  restoreOriginalWords() {
    if (this.originalWords) {
      this.words = [...this.originalWords];
    }
  }
  
  adjustTimingForMobile() {
    this.options.typingSpeed = 80;  // Faster on mobile
    this.options.deletingSpeed = 40;
    this.options.pauseDuration = 1500;
  }
  
  adjustTimingForDesktop() {
    this.options.typingSpeed = 100;
    this.options.deletingSpeed = 50;
    this.options.pauseDuration = 2000;
  }
  
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.element.classList.add('typewriter-active');
    this.animate();
  }
  
  stop() {
    this.isRunning = false;
    this.element.classList.remove('typewriter-active');
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
  
  animate() {
    if (!this.isRunning) return;
    
    const currentWord = this.words[this.currentIndex];
    
    if (this.isDeleting) {
      // Deleting characters
      this.textElement.textContent = currentWord.substring(0, this.charIndex - 1);
      this.charIndex--;
      
      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.currentIndex = (this.currentIndex + 1) % this.words.length;
        setTimeout(() => this.animate(), 300); // Brief pause before typing next word
      } else {
        setTimeout(() => this.animate(), this.options.deletingSpeed);
      }
    } else {
      // Typing characters
      this.textElement.textContent = currentWord.substring(0, this.charIndex + 1);
      this.charIndex++;
      
      if (this.charIndex === currentWord.length) {
        this.isDeleting = true;
        setTimeout(() => this.animate(), this.options.pauseDuration);
      } else {
        // Variable typing speed for natural effect
        const speed = this.calculateTypingSpeed(currentWord, this.charIndex);
        setTimeout(() => this.animate(), speed);
      }
    }
    
    // Use requestAnimationFrame for smooth animation
    this.animationId = requestAnimationFrame(() => {});
  }
  
  calculateTypingSpeed(word, charIndex) {
    // Natural typing speed variation
    const baseSpeed = this.options.typingSpeed;
    
    // Slightly slower for first and last characters
    if (charIndex === 0 || charIndex === word.length - 1) {
      return baseSpeed * 1.2;
    }
    
    // Slightly slower after punctuation
    const prevChar = word[charIndex - 1];
    if (prevChar && /[.,!?;:]/.test(prevChar)) {
      return baseSpeed * 1.5;
    }
    
    return baseSpeed;
  }
  
  destroy() {
    this.stop();
    
    // Remove event listeners
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    
    // Clean up DOM elements
    const srText = this.element.querySelector('.sr-only');
    if (srText) {
      this.element.removeChild(srText);
    }
    
    // Remove classes
    this.element.classList.remove('typewriter-active', 'typewriter-initialized');
  }
  
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Accessibility styles for screen readers
const srStyles = `
.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

.typewriter-container {
  display: inline-block;
  position: relative;
  min-height: 1.2em;
}

.typewriter-text {
  display: inline-block;
  white-space: nowrap;
}

.typewriter-cursor {
  display: inline-block;
  animation: typewriter-cursor-blink 1s infinite;
  font-weight: normal;
  color: inherit;
  margin-left: 2px;
}

@keyframes typewriter-cursor-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .typewriter-cursor {
    animation: none;
    opacity: 1;
  }
  
  .typewriter-text {
    transition: none;
  }
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .typewriter-text {
    white-space: normal;
    line-height: 1.4;
    word-break: break-word;
  }
  
  .typewriter-cursor {
    animation-duration: 1.5s; /* Slower blink on mobile */
  }
}
`;

// Inject accessibility styles
const styleSheet = document.createElement('style');
styleSheet.textContent = srStyles;
document.head.appendChild(styleSheet);

// Initialize all typewriter elements when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const typewriterElements = document.querySelectorAll('.typewriter-container[data-words]');
  
  typewriterElements.forEach(element => {
    if (!element.classList.contains('typewriter-initialized')) {
      new ModernTypewriter(element);
      element.classList.add('typewriter-initialized');
    }
  });
});

// Export for global access
window.ModernTypewriter = ModernTypewriter;