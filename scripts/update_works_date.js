
const fs = require('fs');
const path = require('path');

const worksPath = path.join(__dirname, '../data/works.json');
const publicPath = path.join(__dirname, '../public');

// Read works.json
const data = JSON.parse(fs.readFileSync(worksPath, 'utf8'));

console.log(`Processing ${data.works.length} items...`);

let updatedCount = 0;

data.works.forEach(work => {
    if (work.image) {
        try {
            // Construct absolute file path
            // work.image can be "/works/foo.png" or "https://..." (ignore urls)
            if (work.image.startsWith('/')) {
                const filePath = path.join(publicPath, work.image);

                if (fs.existsSync(filePath)) {
                    const stats = fs.statSync(filePath);
                    const mtime = stats.mtime; // Modified time

                    // Format YYYY-MM-DD
                    const year = mtime.getFullYear();
                    const month = String(mtime.getMonth() + 1).padStart(2, '0');
                    const day = String(mtime.getDate()).padStart(2, '0');
                    const formattedDate = `${year}-${month}-${day}`;

                    console.log(`[${work.title}] File found: ${formattedDate}`);

                    // Update JSON if different
                    if (work.date !== formattedDate) {
                        work.date = formattedDate;
                        work.year = year;
                        updatedCount++;
                    }
                } else {
                    console.warn(`[${work.title}] File not found at ${filePath}`);
                }
            }
        } catch (err) {
            console.error(`[${work.title}] Error processing:`, err);
        }
    }
});

if (updatedCount > 0) {
    fs.writeFileSync(worksPath, JSON.stringify(data, null, 4), 'utf8');
    console.log(`successfully updated ${updatedCount} items.`);
} else {
    console.log('No changes needed.');
}
