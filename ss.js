  <script>
    let songs = [];

    // ⚠️ 你需要解決 CORS 問題，這裡是用可成功存取的 JSON 路徑
    fetch('https://raw.githubusercontent.com/gregoryma1230/sheet-music-search/refs/heads/main/songs.json')
      .then(response => response.json())
      .then(data => {
        songs = data;
        // 預設不顯示任何結果
      })
      .catch(err => console.error("載入 JSON 失敗：", err));

    document.getElementById('searchInput').addEventListener('input', function () {
      const keyword = this.value.trim().toLowerCase();
      const resultBox = document.getElementById('results');
      resultBox.innerHTML = '';

      if (!keyword) return;

      const filtered = songs.filter(song =>
        (song.title && song.title.toLowerCase().includes(keyword)) ||
        (song.composer && song.composer.toLowerCase().includes(keyword)) ||
	(song.tags && song.tags.toLowerCase().includes(keyword)) ||
        (song.remarks && song.remarks.toLowerCase().includes(keyword))
      );

      if (filtered.length === 0) {
        resultBox.innerHTML = '<p>沒有找到符合的結果。</p>';
        return;
      }

      filtered.forEach(song => {
        const div = document.createElement('div');
        div.className = 'result';

        if (song.title) div.innerHTML += `<div class="field"><strong>歌名：</strong>${song.title}</div>`;
        if (song.composer) div.innerHTML += `<div class="field"><strong>作曲：</strong>${song.composer}</div>`;
        if (song.tags) div.innerHTML += `<div class="field"><strong>標籤：</strong>${song.tags}</div>`;
        if (song.url) div.innerHTML += `<div class="field"><strong>樂譜：</strong><a href="${song.url}" target="_blank">連結</a></div>`;
        if (song.remarks) div.innerHTML += `<div class="field"><strong>備註：</strong>${song.remarks}</div>`;

        resultBox.appendChild(div);
      });
    });
  </script>
