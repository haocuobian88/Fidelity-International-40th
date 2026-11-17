# 此刻，正好｜富達四十週年晚宴

純 HTML / CSS / JavaScript 網站，不需安裝套件。所有網址皆為相對路徑，可直接放在 GitHub Pages 專案子目錄。

## 預覽

在本目錄執行 `python3 -m http.server 8080`，開啟 http://localhost:8080。

## GitHub Pages

將此目錄內容放到 `Fidelity-International-40th` repository 根目錄。Settings → Pages → Deploy from a branch → main → / (root)。

## 修改內容

- `index.html`：活動文字、日期、流程、圖片。
- `style.css`：酒紅色系、版面、信封動畫及手機樣式。
- `script.js`：開函與音樂控制。配樂只在使用者點擊後播放。
- 飯店交通圖：以 `<img src="assets/hotel-map.jpg" alt="飯店交通圖">` 替換 `.map-placeholder`。
- 圖片取自提供的企劃 PDF，為概念示意。Logo 為提供圖片上方紅色品牌款，保持原色及比例。
- 配樂為使用者提供的 Lovely Day MP3；未附歌詞。
- 18:00 與 19:00 為企劃已確認時段；其餘時段與票選規則已標註待確認。

## 檔案

`assets/lovely-day.mp3` 為網站配樂。未包含來源影片、完整企劃 PDF 或本機路徑。

## 互動與動態

開函時播放配樂並飄落 40 片彩紙；頁尾「為相聚喝采」可重播彩紙。流程、標題與相片進入畫面時依序出場。遵循裝置的減少動態效果設定，停用彩紙與位移動畫。
