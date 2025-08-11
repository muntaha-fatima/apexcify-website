document.addEventListener('DOMContentLoaded', () => {
    // Section visibility animation
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);  // Ek dafa visible ho gaya toh unobserve karo
            }
        });
    }, { threshold: 0.2 });
    sections.forEach(section => observer.observe(section));

  const form = document.getElementById('contact-form');

  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Page reload roke

    // Aap yahan AJAX se backend ya API call kar sakte hain agar chahiye

    alert('Thank you for contacting us! We will get back to you soon.');
    form.reset();
  });
    // Portfolio carousel setup
    const carousel = document.getElementById('portfolio-carousel');
    const items = document.querySelectorAll('.portfolio-item');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 0;

    // Determine number of items visible per view based on screen width
    function getItemsPerView() {
        if (window.innerWidth >= 768) return 3;  // Medium and above: 3 items
        if (window.innerWidth >= 640) return 2;  // Small screens: 2 items
        return 1;                                // Extra small screens: 1 item
    }

  function updateCarousel() {
    const totalItems = items.length;
    const itemsPerView = getItemsPerView();
    const maxIndex = totalItems - itemsPerView;

    // Clamp currentIndex within bounds
    if (currentIndex > maxIndex) currentIndex = maxIndex < 0 ? 0 : maxIndex; // maxIndex kabhi negative ho sakta hai agar items kam hain
    if (currentIndex < 0) currentIndex = 0;

    // Calculate translateX in percentage
    const offsetPercent = currentIndex * (100 / itemsPerView);
    carousel.style.transform = `translateX(-${offsetPercent}%)`;

    // Optional: Debugging logs
    console.log({ currentIndex, maxIndex, itemsPerView, totalItems, offsetPercent });
}


    if(prevBtn && nextBtn && carousel && items.length > 0){
        prevBtn.addEventListener('click', () => {
            currentIndex--;
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex++;
            updateCarousel();
        });

        // Adjust carousel on window resize
        window.addEventListener('resize', () => {
            // Reset index to 0 so no hidden overflow on resize
            currentIndex = 0;
            updateCarousel();
        });

        // Initialize on page load
        updateCarousel();
    }
});

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxLink = document.getElementById('lightbox-link');
    const closeLightbox = document.getElementById('close-lightbox');

    if(lightbox && lightboxImg && lightboxTitle && lightboxDesc && lightboxLink && closeLightbox){
        document.querySelectorAll('[data-lightbox]').forEach(item => {
            item.addEventListener('click', () => {
                const [title, desc, link] = item.dataset.lightbox.split('|');
                lightboxImg.src = item.src;
                lightboxTitle.textContent = title;
                lightboxDesc.textContent = desc;
                lightboxLink.href = link;
                lightbox.classList.remove('hidden');
            });
        });

        closeLightbox.addEventListener('click', () => {
            lightbox.classList.add('hidden');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.add('hidden');
            }
        });
    }
