// dist/config/index.js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

exports.manifest = {
    id: "org.brasilrd.addon",
    version: "1.0.0",
    name: "Brasil RD",
    description: "Addon focado em conteúdo dublado/legendado PT-BR.",
    resources: ["stream"],
    types: ["movie", "series"],
    idPrefixes: ["tt"],
    catalogs: [],
    config: [
        // 1. Habilitar modo p2p puro opcional na UI
        {
            key: "p2p_only",
            title: "Habilitar Modo P2P Puro (Desativar Debrid)",
            type: "checkbox",
            default: false,
            required: false
        },
        {
            key: "debrid_token",
            title: "Token Real-Debrid",
            type: "text",
            required: false
        }
    ]
};
