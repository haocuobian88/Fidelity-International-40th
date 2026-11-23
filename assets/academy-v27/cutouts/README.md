# 本機網頁去背素材

使用內建 image_gen，transparent_background=true。此資料夾包含五張具透明 alpha 的 PNG；保留照片及紙張內容，只去除外圍背景。來源：使用者提供之 PDF 內嵌素材與兩張來源圖。未部署。

所有提示共用前綴：Precision background extraction for existing website assets. Output real transparent alpha, never a checkerboard or white background.

## stamp.png

Remove only the solid beige exterior background OUTSIDE the postage stamp's scalloped/perforated paper edge. Preserve the entire cream paper stamp, navy illustration, lettering '40th' and 'Fuda Academy', texture, exact shape and layout. The perforated stamp PAPER is part of the object and must remain opaque.

## wax.png

Remove every tan paper/background area behind and outside the red wax seal, leaving ONLY the red wax seal itself. Preserve exact red wax silhouette, gold building, laurel, Chinese lettering 富達學院, English Fuda Academy, 40th Anniversary and all wax details. Keep original 585x586 canvas, original seal location and scale, and surrounding transparent padding. Do not crop, enlarge, redraw or retype the seal.

## schedule.png

Remove only the remaining beige exterior background OUTSIDE the leather-framed class schedule board and OUTSIDE the gold binder clip, including the rectangular beige patch behind the gold clip. Preserve the entire cream paper schedule, burgundy leather frame, clip, Chinese lettering and every time EXACTLY: 18:30–19:15, 19:15–19:30, 19:30–21:00, 21:00–21:15. Preserve all printed icons, notes and original 808x594 landscape layout. Do not erase the cream paper INSIDE the board.

## notes.png

Remove only the beige exterior background OUTSIDE the three overlapping paper notes and the burgundy hotel line illustration at lower right. Retain the squared notebook paper at left, yellow sticky note, pink torn note, their tape and all printed text, doodles and paper colors. The paper notes themselves must remain opaque. The hotel line drawing outside the notes should remain as burgundy strokes with transparency between strokes. Preserve exact original 798x400 landscape layout and all wording; do not crop, move or retype.

## campus.png

Remove only the tan exterior background OUTSIDE the perforated postage stamp paper silhouette. Keep the complete entire illustrated cream postage paper INSIDE the perforated border, all burgundy hotel/building line art, trees, sky, 40th Anniversary 1987–2027 badge, labels and text unchanged. Do not remove cream sky or paper within the stamp. Preserve full 1536x1024 landscape composition and stamp border; do not crop or recenter.

所有提示共用後綴：Make no other visual changes; preserve original aspect ratio and existing image identity.


封面建築局部修圖：cover-building.png，內建 imagegen，透明背景。移除左上角及右方樹枝，保留建築與下方景觀。

v29：內建 imagegen 局部調色；封面建築改為深酒紅色，保留透明背景及線條。To/From 未改動。

v30：建築淺色區域鏤空，以 alpha 保留深酒紅 #5c1424 墨線；生成式去底後以確定性 alpha 遮罩清除淺色殘留。可重現腳本 work/upgrade-pdf/hollow-building.cjs。

v39 oval-postmark.png：內建 imagegen 透明背景局部修圖，僅保留此刻・正好橢圓郵戳與框內文字，移除外圍相鄰郵戳碎片；PDF 移除該區膠帶圖層。

v42 footer-stamp.png：圖二郵票，內建 imagegen 移除郵票齒孔外圍底色、保留紙張內容，使用原 Footer 郵票矩陣保持位置與旋轉方向。

v43：課表第一節由「新生報到」改為「學員報到」，內建 imagegen 局部文字修改，保留其他設計與透明外圍。
