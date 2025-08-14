# K6 壓力測試筆記

## 安裝 K6 (Windows)

1. 到 https://github.com/grafana/k6/releases
2. 下載 `k6-v0.xx.x-windows-amd64.zip`
3. 解壓縮，將 `k6.exe` 放到專案資料夾

## 我的測試檔案

### 資料夾結構
```
bench.bat       - 批次執行檔
bench.js        - K6 測試腳本  
k6.exe          - K6 執行檔
```

### bench.js 內容
```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 9000},   // 5秒衝到9000用戶
    { duration: '60s', target: 50000}, // 維持50000用戶1分鐘  
    { duration: '5s', target: 0 },     // 5秒降到0
  ],
};

export default function () {
  http.get('http://localhost:8089/api/OpdRegRoom?limit=10');
  sleep(1);
}
```

### 執行方式

**方法1: 直接執行**
```bash
k6 run bench.js
```

**方法2: 使用批次檔**
```bash
bench.bat
```

## 測試結果重點

- `http_req_duration`: API 回應時間
- `http_req_failed`: 失敗率 
- `http_reqs`: 總請求數/每秒請求數
- `vus`: 目前虛擬用戶數

## 注意事項

這是**極高強度壓測** (最高50000用戶)，執行前確保：
1. 在測試環境執行
2. 伺服器資源充足
3. 目標 API: `http://localhost:8089/api/OpdRegRoom?limit=10`