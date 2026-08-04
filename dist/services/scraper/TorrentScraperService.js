// dist/services/scraper/TorrentScraperService.js
"use strict";
const axios = require("axios");

class TorrentScraperService {
    constructor(config) {
        this.config = config || {};
        this.hdrEndpoint = process.env.HDR_ENDPOINT || "https://hdr-torrents.com/api/v1/search";
    }

    async getStreams(imdbId) {
        let torrents = [];

        try {
            const hdrResults = await this.scrapeHdrSource(imdbId);
            torrents.push(...hdrResults);
        } catch (error) {
            console.error(`Falha ao buscar HDR para ${imdbId}:`, error.message);
        }

        return this.formatStreams(torrents);
    }

    async scrapeHdrSource(imdbId) {
        const response = await axios.get(this.hdrEndpoint, {
            params: { q: imdbId },
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
                "Accept": "application/json"
            },
            timeout: 8000
        });

        if (!response.data || !response.data.results) {
            return [];
        }

        return response.data.results.map(t => ({
            title: t.title,
            infoHash: t.info_hash || t.hash,
            seeders: parseInt(t.seeders, 10) || 0,
            size: t.size || 0
        }));
    }

    formatStreams(torrents) {
        const sortedTorrents = torrents.sort((a, b) => b.seeders - a.seeders);

        if (this.config.p2p_only) {
            return sortedTorrents.map(t => ({
                name: "Brasil RD [P2P]",
                title: `${t.title}\n👥 ${t.seeders} | 💾 ${this.formatBytes(t.size)}`,
                infoHash: t.infoHash
            }));
        }

        return sortedTorrents.map(t => {
            const debridUrl = this.config.debrid_token 
                ? `https://debrid-resolver.local/resolve?hash=${t.infoHash}&token=${this.config.debrid_token}`
                : `https://debrid-resolver.local/${t.infoHash}`;

            return {
                name: "Brasil RD [Debrid]",
                title: `${t.title}\n⚙️ Cached | 👥 ${t.seeders} | 💾 ${this.formatBytes(t.size)}`,
                url: debridUrl
            };
        });
    }

    formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }
}

exports.TorrentScraperService = TorrentScraperService;
