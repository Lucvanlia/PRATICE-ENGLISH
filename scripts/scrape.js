const fs = require('fs');
const path = require('path');

const units = [
  // Grammar Units
  { id: "grammar-1", title: "Hiện tại đơn & hiện tại tiếp diễn", url: "https://www.anhngumshoa.com/tin-tuc/unit-1-thi-hien-tai-don-va-thi-hien-tai-tiep-dien-34828.html" },
  { id: "grammar-2", title: "Thì hiện tại hoàn thành và hiện tại hoàn thành tiếp diễn", url: "https://www.anhngumshoa.com/tin-tuc/unit-2-thi-hien-tai-hoan-thanh-va-thi-hien-tai-hoan-thanh-tiep-dien-34829.html" },
  { id: "grammar-3", title: "Thì quá khứ đơn và quá khứ tiếp diễn", url: "https://www.anhngumshoa.com/tin-tuc/unit-3-thi-qua-khu-don-va-thi-qua-khu-tiep-dien-the-past-simple-and-the-past-continuous-34845.html" },
  { id: "grammar-4", title: "Thì quá khứ hoàn thành và quá khứ hoàn thành tiếp diễn", url: "https://www.anhngumshoa.com/tin-tuc/unit-4-thi-qua-khu-hoan-thanh-thi-qua-khu-hoan-thanh-tiep-dien-the-past-perfect-the-past-perfect-continuous-34846.html" },
  { id: "grammar-5", title: "Thì tương lai đơn và tương lai gần", url: "https://www.anhngumshoa.com/tin-tuc/unit-5-thi-tuong-lai-don-tuong-lai-gan-the-future-simple-the-near-future-34847.html" },
  { id: "grammar-6", title: "Thì tương lai tiếp diễn và tương lai hoàn thành", url: "https://www.anhngumshoa.com/tin-tuc/unit-6-thi-tuong-lai-tiep-dien-thi-tuong-lai-hoan-thanh-the-future-continuous-the-future-perfect-34848.html" },
  { id: "grammar-7", title: "Adj – adv vị trí, chức năng", url: "https://www.anhngumshoa.com/tin-tuc/unit-8-chuc-nang-vi-tri-cua-adj-tinh-tu-va-adv-trang-tu-34871.html" },
  { id: "grammar-8", title: "Adj – adv comparision", url: "https://www.anhngumshoa.com/tin-tuc/unit-9-dang-so-sanh-cua-tinh-tu-adj-va-trang-tu-adv-34874.html" },
  { id: "grammar-9", title: "Gerund – Infinitive", url: "https://www.anhngumshoa.com/tin-tuc/unit-10-gerund-danh-dong-tu-va-to-infinitive-dong-tu-nguyen-the-34875.html" },
  { id: "grammar-10", title: "Relative Clause – Mệnh đề quan hệ", url: "https://www.anhngumshoa.com/tin-tuc/unit-11-menh-de-quan-he-relative-clauses-cach-dung-va-bai-tap-34877.html" },
  { id: "grammar-11", title: "Bị động", url: "https://www.anhngumshoa.com/tin-tuc/unit-12-bi-dong-passive-voice-34835.html" },
  { id: "grammar-12", title: "Đại từ không xác định – Indefinite pronouns", url: "https://www.anhngumshoa.com/tin-tuc/unit-13-indefinite-pronouns-dai-tu-khong-xac-dinh-34849.html" },
  { id: "grammar-13", title: "Conjunctions", url: "https://www.anhngumshoa.com/tin-tuc/unit-7-bo-sung-them-kien-thuc-ve-lien-tu-conjunction-34931.html" },
  { id: "grammar-14", title: "Câu điều kiện – Conditional sentences", url: "https://www.anhngumshoa.com/tin-tuc/unit-8-mot-so-loai-cau-dieu-kien-34932.html" },
  // Listening Units
  { id: "listening-1", title: "Luyện nghe tranh vật Part 1", url: "https://www.anhngumshoa.com/tin-tuc/unit-1-ky-nang-luyen-nghe-tranh-vat-trong-part-1-picture-description-34851.html" },
  { id: "listening-2", title: "Luyện nghe tranh người Part 1", url: "https://www.anhngumshoa.com/tin-tuc/unit-2-ky-nang-nghe-tranh-ve-nguoi-trong-part-1-picture-description-34853.html" },
  { id: "listening-3", title: "Nghe câu hỏi Where Part 2", url: "https://www.anhngumshoa.com/tin-tuc/unit-3-ky-nang-nghe-cau-hoi-where-trong-part-2-question-response-34852.html" },
  { id: "listening-4", title: "Nghe câu hỏi When Part 2", url: "https://www.anhngumshoa.com/tin-tuc/unit-4-ky-nang-nghe-cau-hoi-when-trong-part-2-question-response-34854.html" },
  { id: "listening-5", title: "Nghe câu hỏi Who Part 2", url: "https://www.anhngumshoa.com/tin-tuc/unit-6-ky-nang-nghe-cau-hoi-who-trong-part-2-question-response-34856.html" },
  { id: "listening-6", title: "Nghe câu hỏi How Part 2", url: "https://www.anhngumshoa.com/tin-tuc/unit-7-ky-nang-nghe-cau-hoi-how-trong-part-2-question-response-34914.html" },
  { id: "listening-7", title: "Nghe câu hỏi Why Part 2", url: "https://www.anhngumshoa.com/tin-tuc/unit-8-ky-nang-nghe-cau-hoi-why-trong-part-2-question-response-34915.html" },
  { id: "listening-8", title: "Nghe câu hỏi Yes/No Part 2", url: "https://www.anhngumshoa.com/tin-tuc/unit-9-ky-nang-nghe-cau-hoi-yes-no-trong-part-2-question-response-listening-toeic-34916.html" },
  { id: "listening-9", title: "Nghe câu hỏi Lựa chọn Choice Part 2", url: "https://www.anhngumshoa.com/tin-tuc/unit-11-ky-nang-nghe-cau-hoi-lua-chon-choice-question-trong-part-2-question-response-34918.html" },
  { id: "listening-10", title: "Nghe câu hỏi Statement Part 2", url: "https://www.anhngumshoa.com/tin-tuc/unit-12-ky-nang-nghe-cau-hoi-statement-question-trong-part-2-question-response-34919.html" },
  { id: "listening-11", title: "Lưu ý nghe Part 3 Short Conversation", url: "https://www.anhngumshoa.com/tin-tuc/unit-13-mot-so-diem-can-luu-y-khi-luyen-nghe-toeic-part-3-short-conversation-34920.html" },
  { id: "listening-12", title: "Nghe Public Announcements Part 4", url: "https://www.anhngumshoa.com/tin-tuc/unit-15-meo-lam-bai-nghe-chu-de-public-announcements-thong-bao-ndash-short-talk-34965.html" },
  { id: "listening-13", title: "Nghe News Part 4", url: "https://www.anhngumshoa.com/tin-tuc/unit-17-meo-lam-bai-nghe-chu-de-news-ndash-short-talk-34967.html" },
  { id: "listening-14", title: "Nghe Work Announcements Part 4", url: "https://www.anhngumshoa.com/tin-tuc/unit-19-meo-lam-bai-nghe-chu-de-work-announcements-thong-bao-trong-cong-viec-ndash-part-4-short-talk-34969.html" },
  { id: "listening-15", title: "Nghe Reports Part 4", url: "https://www.anhngumshoa.com/tin-tuc/unit-20-meo-lam-bai-nghe-theo-chu-de-reports-bao-cao-ndash-part-4-short-talk-34971.html" }
];

const outputDir = path.join(__dirname, '..', 'scratch', 'scraped_units');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function cleanHtmlToMarkdown(html) {
  const startTag = '<article class="font-inter relative overflow-visible">';
  const endTag = '</article>';
  
  const startIdx = html.indexOf(startTag);
  if (startIdx === -1) {
    return "";
  }
  
  const endIdx = html.indexOf(endTag, startIdx);
  if (endIdx === -1) {
    return "";
  }
  
  let articleHtml = html.substring(startIdx + startTag.length, endIdx);
  
  let md = articleHtml;
  
  md = md.replace(/<div class="post-share">[\s\S]*?<\/div>/gi, '');
  md = md.replace(/<script[\s\S]*?<\/script>/gi, '');
  md = md.replace(/<style[\s\S]*?<\/style>/gi, '');
  
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n\n');
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n\n');
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n\n');
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '#### $1\n\n');
  
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');
  md = md.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**');
  md = md.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**');
  
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');
  
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n');
  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, '$1\n\n');
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, '$1\n\n');
  
  md = md.replace(/<tr[^>]*>([\s\S]*?)<\/tr>/gi, '| $1 |\n');
  md = md.replace(/<td[^>]*>([\s\S]*?)<\/td>/gi, '$1 |');
  md = md.replace(/<th[^>]*>([\s\S]*?)<\/th>/gi, '**$1** |');
  
  md = md.replace(/<br[^>]*>/gi, '\n');
  
  md = md.replace(/<[^>]+>/g, '');
  
  md = md.replace(/&nbsp;/g, ' ')
         .replace(/&lt;/g, '<')
         .replace(/&gt;/g, '>')
         .replace(/&amp;/g, '&')
         .replace(/&quot;/g, '"')
         .replace(/&apos;/g, "'")
         .replace(/&#39;/g, "'");
         
  md = md.replace(/\n\s*\n\s*\n/g, '\n\n');
  return md.trim();
}

async function scrapeAll() {
  console.log(`Starting crawl of ${units.length} units...`);
  
  for (const unit of units) {
    console.log(`Fetching Unit ${unit.id}: ${unit.title}...`);
    try {
      const res = await fetch(unit.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      if (!res.ok) {
        throw new Error(`HTTP status ${res.status}`);
      }
      const html = await res.text();
      const markdown = cleanHtmlToMarkdown(html);
      
      const filePath = path.join(outputDir, `unit-${unit.id}.md`);
      fs.writeFileSync(filePath, markdown, 'utf8');
      console.log(`Saved Unit ${unit.id} to ${filePath} (${markdown.length} chars)`);
      
      // Delay between requests to avoid getting blocked
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      console.error(`Failed to scrape Unit ${unit.id}:`, err.message);
    }
  }
  
  console.log("All scraping jobs finished.");
}

scrapeAll();
