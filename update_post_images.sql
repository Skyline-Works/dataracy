
-- Update images for specific posts based on title keywords

-- 1. Seoul Night Bus
UPDATE posts 
SET image_url = '/images/posts/seoul_night_bus.png' 
WHERE title LIKE '%서울의 밤%';

-- 2. Python Data Cleaning
UPDATE posts 
SET image_url = '/images/posts/data_cleaning_python.png' 
WHERE title LIKE '%청소%' OR title LIKE '%전처리%';

-- 3. Excel Automation
UPDATE posts 
SET image_url = '/images/posts/excel_automation.png' 
WHERE title LIKE '%엑셀%' OR title LIKE '%자동화%';

-- 4. Generic fallback for others if needed (optional)
-- UPDATE posts SET image_url = '/images/defaults/general_cover.png' WHERE image_url IS NULL;
