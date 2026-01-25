/**
 * DataLoader
 * Fetches data from a Google Sheet published as CSV (or local CSV)
 * and renders it to the DOM.
 */

// CONFIGURATION: Replace this with your Google Sheet "Publish to Web" CSV link
const DATA_URL = 'https://docs.google.com/spreadsheets/d/1v81usaClR5WT6ZX9ylKcDzTe4kO6YLFcrTyerrJOnb8/export?format=csv';

class DataLoader {
    constructor() {
        this.mediaContainer = document.querySelector('#media-container');
        this.blogContainer = document.querySelector('#blog-container');
    }

    async init() {
        try {
            const data = await this.fetchData();
            this.render(data);
            this.animate();
        } catch (error) {
            console.error('Failed to load content:', error);
        }
    }

    async fetchData() {
        const response = await fetch(DATA_URL);
        const text = await response.text();
        return this.parseCSV(text);
    }

    parseCSV(csvText) {
        console.log('Raw CSV Length:', csvText.length);
        const lines = csvText.split('\n');
        console.log('Total Lines:', lines.length);

        // Define fixed keys based on the user-provided column order:
        // icon, title, description, url, category, name, part, date
        const KEYS = ['icon', 'title', 'description', 'url', 'category', 'name', 'part', 'date'];

        const parsedData = lines.slice(1)
            .filter(line => line.trim() !== '')
            .map((line, idx) => {
                const values = this.parseLine(line);
                const entry = {};
                KEYS.forEach((key, index) => {
                    entry[key] = values[index]?.trim() || '';
                });
                if (idx === 0) console.log('First Parsed Item:', entry); // Debug first item
                return entry;
            });

        console.log('Parsed Data Count:', parsedData.length);
        return parsedData;
    }

    // Handles CSV parsing with quotes
    parseLine(line) {
        const values = [];
        let currentValue = '';
        let insideQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (char === '"') {
                insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
                values.push(currentValue);
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
        values.push(currentValue);
        return values.map(v => v.replace(/^"|"$/g, '').trim()); // Remove surrounding quotes
    }

    render(data) {
        // Clear containers (optional, if we want to remove skeletons)
        if (this.mediaContainer) this.mediaContainer.innerHTML = '';
        if (this.blogContainer) this.blogContainer.innerHTML = '';

        data.forEach((item, index) => {
            const card = this.createCard(item, index);

            if (item.category === 'media' && this.mediaContainer) {
                this.mediaContainer.appendChild(card);
            } else if (item.category === 'blog' && this.blogContainer) {
                this.blogContainer.appendChild(card);
            }
        });
    }

    createCard(item, index) {
        const a = document.createElement('a');
        a.href = item.url;
        a.target = '_blank';
        a.className = `card scroll-reveal delay-${(index % 3) + 1}`;

        // Add Meta Tags (Part, Name)
        let metaHtml = '';
        if (item.part || item.name || item.date) {
            metaHtml = '<div class="card-meta">';
            if (item.part) metaHtml += `<span class="meta-tag">${item.part}</span>`;
            if (item.name) metaHtml += `<span class="meta-tag">${item.name}</span>`;
            if (item.date) metaHtml += `<span class="meta-tag meta-date">${item.date}</span>`;
            metaHtml += '</div>';
        }

        a.innerHTML = `
            <div class="card-icon">${item.icon}</div>
            <div class="card-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                ${metaHtml}
                <span class="link-arrow">보러가기 -></span>
            </div>
        `;
        return a;
    }

    animate() {
        // Re-trigger scroll observer since we added new elements
        if (window.initScrollObserver) {
            window.initScrollObserver();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DataLoader().init();
});
