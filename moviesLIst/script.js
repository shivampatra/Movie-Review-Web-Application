       // Global variables
        let allMovies = [];
        let filteredMovies = [];

        // Sample data as fallback if JSON file is not found
        const fallbackData = [
            {
                "title": "18+ Barurot (2025) VMAX UNRATED Hollywood Full Movie HDRip (1080p / 720p / 480p)",
                "url": "https://themoviesflix.qa/18-barurot-2025-vmax-unrated-hollywood-full-movie-hdrip-1080p-720p-480p-esubs/"
            },
            {
                "title": "The Toxic Avenger (2025) TELESYNC English Full Movie HDTC (1080p / 720p / 480p)",
                "url": "https://themoviesflix.qa/the-toxic-avenger-2025-telesync-english-full-movie-hdtc-1080p-720p-480p-esubs/"
            },
            {
                "title": "Nobody 2 (2025) English ORG Full Movie HDRip (1080p / 720p / 480p)",
                "url": "https://themoviesflix.qa/nobody-2-2025-english-org-full-movie-hdrip-1080p-720p-480p-esubs/"
            },
            {
                "title": "Superman (2025) English Full Movie HDTC",
                "url": "https://themoviesflix.qa/superman-2025-english-full-movie-hdtc-1080p-720p-480p-esubs/"
            },
            {
                "title": "M3GAN 2.0 (2025) English ORG Full Movie HDRip",
                "url": "https://themoviesflix.qa/m3gan-2-0-2025-english-org-full-movie-hdrip-1080p-720p-480p-esubs/"
            }
        ];

        // Load movies from external JSON file or use fallback data
        async function loadMovies() {
            const loadingIndicator = document.getElementById('loadingIndicator');
            const errorMessage = document.getElementById('errorMessage');
            const moviesContainer = document.getElementById('moviesContainer');

            // Show loading
            loadingIndicator.style.display = 'block';
            errorMessage.style.display = 'none';
            moviesContainer.style.display = 'none';

            try {
                const response = await fetch('movies.json');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                allMovies = await response.json();
                console.log('Movies loaded from JSON file:', allMovies.length);
                
            } catch (error) {
                console.warn('Could not load movies.json, using fallback data:', error.message);
                allMovies = fallbackData;
                
                // Show a non-intrusive message
                showToast('Using demo data - add movies.json for full collection');
            }

            // Process the loaded data
            if (!Array.isArray(allMovies)) {
                throw new Error('Invalid data format');
            }

            filteredMovies = [...allMovies];
            
            // Update UI
            updateStats();
            renderMovies(filteredMovies);
            
            // Hide loading and show content
            loadingIndicator.style.display = 'none';
            moviesContainer.style.display = 'grid';
        }

        // Extract movie information from title
        function extractMovieInfo(title) {
            if (!title) return { isAdult: false, year: null, quality: null, type: 'Movie' };
            
            const info = {
                isAdult: title.startsWith('18+'),
                year: null,
                quality: null,
                type: 'Movie'
            };

            // Extract year
            const yearMatch = title.match(/\((\d{4})\)/);
            if (yearMatch) {
                info.year = yearMatch[1];
            }

            // Extract quality
            const qualityMatches = title.match(/(HDRip|HDTC|BluRay|CAM|HDCAM|TELESYNC)/i);
            if (qualityMatches) {
                info.quality = qualityMatches[1].toUpperCase();
            }

            // Check if it's a series
            if (title.includes('Series') || title.includes('S01E')) {
                info.type = 'Series';
            }

            return info;
        }

        // Clean movie title for display
        function cleanMovieTitle(title) {
            if (!title) return 'Untitled Movie';
            
            return title
                .replace(/18\+\s*/, '')
                .replace(/\(\d{4}\).*$/, '')
                .replace(/VMAX|UNRATED|Hollywood|Full Movie|HDRip|HDTC|BluRay|CAM|HDCAM|TELESYNC|ORG|English/gi, '')
                .replace(/\s+/g, ' ')
                .trim() || 'Untitled Movie';
        }

        // Create movie card HTML
        function createMovieCard(movie) {
            if (!movie || !movie.title || !movie.url) {
                return '';
            }

            const info = extractMovieInfo(movie.title);
            const cleanTitle = cleanMovieTitle(movie.title);

            return `
                <div class="movie-card" onclick="openMovie('${movie.url}')">
                    <h3 class="movie-title">${cleanTitle}</h3>
                    <div class="movie-meta">
                        ${info.isAdult ? '<span class="meta-badge adult-badge">18+</span>' : ''}
                        ${info.year ? `<span class="meta-badge year-badge">${info.year}</span>` : ''}
                        ${info.quality ? `<span class="meta-badge quality-badge">${info.quality}</span>` : ''}
                        <span class="meta-badge type-badge">${info.type}</span>
                    </div>
                    <div class="movie-actions">
                        <a href="${movie.url}" class="btn-primary" target="_blank" onclick="event.stopPropagation()">
                            🎬 Watch Now
                        </a>
                        <button class="btn-secondary" onclick="event.stopPropagation(); copyToClipboard('${movie.url}')">
                            📋 Copy Link
                        </button>
                    </div>
                </div>
            `;
        }

        // Open movie in new tab
        function openMovie(url) {
            if (url) {
                window.open(url, '_blank');
            }
        }

        // Render movies
        function renderMovies(movies) {
            const container = document.getElementById('moviesContainer');
            const noResults = document.getElementById('noResults');
            
            if (!movies || movies.length === 0) {
                container.style.display = 'none';
                noResults.style.display = 'block';
                return;
            }

            container.style.display = 'grid';
            noResults.style.display = 'none';
            
            const validMovies = movies.filter(movie => movie && movie.title && movie.url);
            container.innerHTML = validMovies.map(movie => createMovieCard(movie)).join('');
        }

        // Update statistics with animation
        function updateStats() {
            const totalMovies = allMovies.length;
            const newMovies = allMovies.filter(movie => movie.title && movie.title.includes('2025')).length;
            
            animateCounter('totalMovies', totalMovies);
            animateCounter('filteredMovies', filteredMovies.length);
            animateCounter('newMovies', newMovies);
        }

        // Animate counter
        function animateCounter(elementId, target) {
            const element = document.getElementById(elementId);
            if (!element) return;
            
            const duration = 1000;
            const start = parseInt(element.textContent) || 0;
            const increment = (target - start) / (duration / 16);
            let current = start;

            const timer = setInterval(() => {
                current += increment;
                if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(Math.max(0, current));
            }, 16);
        }

        // Filter movies
        function filterMovies() {
            const searchTerm = (document.getElementById('searchInput').value || '').toLowerCase();
            const qualityFilter = document.getElementById('qualityFilter').value;
            const yearFilter = document.getElementById('yearFilter').value;

            filteredMovies = allMovies.filter(movie => {
                if (!movie || !movie.title) return false;
                
                const title = movie.title.toLowerCase();
                const matchesSearch = !searchTerm || title.includes(searchTerm);
                const matchesQuality = !qualityFilter || title.includes(qualityFilter.toLowerCase());
                
                let matchesYear = !yearFilter;
                if (yearFilter === 'Other') {
                    matchesYear = !title.includes('2025') && !title.includes('2024') && !title.includes('2023');
                } else if (yearFilter) {
                    matchesYear = title.includes(yearFilter);
                }

                return matchesSearch && matchesQuality && matchesYear;
            });

            renderMovies(filteredMovies);
            updateStats();
        }

        // Copy to clipboard with better error handling
        async function copyToClipboard(text) {
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(text);
                } else {
                    // Fallback method
                    const textArea = document.createElement('textarea');
                    textArea.value = text;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-999999px';
                    textArea.style.top = '-999999px';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    document.execCommand('copy');
                    textArea.remove();
                }
                showToast('Link copied to clipboard! 📋');
            } catch (error) {
                console.error('Failed to copy to clipboard:', error);
                showToast('Failed to copy link');
            }
        }

        // Show toast notification
        function showToast(message) {
            // Remove existing toasts
            const existingToasts = document.querySelectorAll('.toast');
            existingToasts.forEach(toast => toast.remove());

            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message;
            document.body.appendChild(toast);

            // Show toast
            setTimeout(() => toast.classList.add('show'), 100);

            // Hide and remove toast
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            }, 3000);
        }

        // Create floating particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            if (!particlesContainer) return;
            
            const particleCount = 30; // Reduced for better performance

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                const size = Math.random() * 4 + 2;
                const left = Math.random() * 100;
                const animationDuration = Math.random() * 20 + 10;
                const delay = Math.random() * 20;

                particle.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${left}%;
                    animation-duration: ${animationDuration}s;
                    animation-delay: ${delay}s;
                `;

                particlesContainer.appendChild(particle);
            }
        }

        // Event listeners
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM loaded, initializing...');
            
            // Load movies when page loads
            loadMovies();
            
            // Create floating particles
            createParticles();
            
            // Search functionality
            const searchInput = document.getElementById('searchInput');
            const searchBtn = document.getElementById('searchBtn');
            const qualityFilter = document.getElementById('qualityFilter');
            const yearFilter = document.getElementById('yearFilter');

            if (searchInput) {
                searchInput.addEventListener('input', filterMovies);
                searchInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        filterMovies();
                    }
                });
            }

            if (searchBtn) {
                searchBtn.addEventListener('click', filterMovies);
            }

            if (qualityFilter) {
                qualityFilter.addEventListener('change', filterMovies);
            }

            if (yearFilter) {
                yearFilter.addEventListener('change', filterMovies);
            }

            console.log('Event listeners attached successfully');
        });

        // Handle errors gracefully
        window.addEventListener('error', function(e) {
            console.error('JavaScript Error:', e.error);
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', function(e) {
            console.error('Unhandled Promise Rejection:', e.reason);
        });