// Function for teaser image responsive behavior
function initTeaserFeature() {
    const paperRows = document.querySelectorAll('table tbody tr');
    
    paperRows.forEach(row => {
        const firstCell = row.querySelector('td:first-child');
        const secondCell = row.querySelector('td:nth-child(2)');
        
        if (firstCell && secondCell && firstCell.querySelector('img') && secondCell.querySelector('papertitle')) {
            firstCell.classList.add('teaser-cell');
            firstCell.querySelector('img').classList.add('teaser-image');
            
            if (!secondCell.querySelector('.teaser-link')) {
                const teaserLink = document.createElement('a');
                teaserLink.href = '#';
                teaserLink.className = 'teaser-link';
                teaserLink.style.display = 'none';
                teaserLink.style.marginLeft = '10px';
                teaserLink.textContent = '[Teaser]';
                
                const papertitle = secondCell.querySelector('papertitle');
                papertitle.parentNode.insertBefore(teaserLink, papertitle.nextSibling);
            }
        }
    });

    function adjustTeasers() {
        const teaserCells = document.querySelectorAll('.teaser-cell');
        
        teaserCells.forEach(teaserCell => {
            const row = teaserCell.parentElement;
            const contentCell = row.querySelector('td:nth-child(2)');
            const teaserLink = contentCell.querySelector('.teaser-link');
            
            if (window.innerWidth < 640) {
                teaserCell.style.display = 'none';
                teaserLink.style.display = 'inline';
            } else {
                teaserCell.style.display = '';
                teaserLink.style.display = 'none';
                
                const mobileTeaser = contentCell.querySelector('.mobile-teaser');
                if (mobileTeaser) {
                    mobileTeaser.remove();
                }
            }
        });
    }

    // Handle teaser link clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('teaser-link')) {
            e.preventDefault();
            
            const contentCell = e.target.closest('td');
            const row = contentCell.parentElement;
            const teaserCell = row.querySelector('.teaser-cell');
            
            let mobileTeaser = contentCell.querySelector('.mobile-teaser');
            
            if (mobileTeaser) {
                mobileTeaser.remove();
            } else {
                mobileTeaser = document.createElement('div');
                mobileTeaser.className = 'mobile-teaser';
                mobileTeaser.style.width = '100%';
                mobileTeaser.style.textAlign = 'center';
                mobileTeaser.style.margin = '10px 0';
                
                const newImage = document.createElement('img');
                newImage.src = teaserCell.querySelector('img').src;
                newImage.style.maxWidth = '100%';
                newImage.style.height = 'auto';
                
                mobileTeaser.appendChild(newImage);
                
                const firstBr = contentCell.querySelector('br');
                firstBr.parentNode.insertBefore(mobileTeaser, firstBr.nextSibling);
            }
        }
    });

    // Initial adjustment
    adjustTeasers();

    // Adjust on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(adjustTeasers, 100);
    });
}

// Function for abstract toggle feature
function initAbstractFeature() {
    // Hide all abstracts initially, show tl;dr
    document.querySelectorAll('abs').forEach(abstract => {
        abstract.style.display = 'none';
    });
    document.querySelectorAll('p').forEach(p => {
        if (p.textContent.trim().startsWith('tl;dr:')) {
            p.style.display = 'block'; // Show tl;dr by default
        }
    });

    // Handle abstract toggle
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href="#"]') && e.target.textContent === '[Abs]') {
            e.preventDefault(); // Prevent opening new page
            const contentCell = e.target.closest('td');
            const abstract = contentCell.querySelector('abs');
            const tldr = Array.from(contentCell.querySelectorAll('p')).find(p => 
                p.textContent.trim().startsWith('tl;dr:')
            );
            
            if (abstract && tldr) {
                // Toggle between abstract and tl;dr
                if (abstract.style.display === 'none') {
                    // Show abstract, hide tl;dr
                    abstract.style.display = 'block';
                    tldr.style.display = 'none';
                } else {
                    // Hide abstract, show tl;dr
                    abstract.style.display = 'none';
                    tldr.style.display = 'block';
                }
            }
        }
    });
}


// Keep cells aligned at top
document.addEventListener('DOMContentLoaded', function() {
    // Add vertical-align: top to the cells containing teaser and info
    document.querySelectorAll('table tbody tr td').forEach(cell => {
        if (cell.querySelector('img[src*="teaser"]') || cell.querySelector('papertitle')) {
            cell.style.verticalAlign = 'top';
        }
    });
    
    initTeaserFeature();
    initAbstractFeature();
});

// // Initialize both features when the DOM is loaded
// document.addEventListener('DOMContentLoaded', function() {
//     initTeaserFeature();
//     initAbstractFeature();
// });