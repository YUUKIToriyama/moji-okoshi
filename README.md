# moji-okoshi

Google Cloud Platform を使って音声ファイルの文字起こし

![okoshi](https://2.bp.blogspot.com/-3vqPMZKRqlA/WMfCTDrzOvI/AAAAAAABCmM/fWHRxPY35-0-PQus0AuK2RVSL0yz0W_wwCLcB/s800/sweets_senbei_agesen.png)

## Preparation

```bash
seq 1 149 | awk '{print "ffmpeg -i ../source.wma -ss " ($1 - 1) * 50 " -t 59 " $1 ".flac"}'
```
