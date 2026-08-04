"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

exports.manifest = {
    id: "org.brasilrd.addon",
    version: "1.0.1",
    name: "Brasil RD",
    description: "Addon focado em conteúdo dublado/legendado PT-BR.",
    resources: ["stream"],
    types: ["movie", "series"],
    idPrefixes: ["tt"],
    catalogs: [],
    behaviorHints: {
        configurable: true
    },
    config: [
        {
            key: "p2p_only",
            title: "Habilitar Modo P2P Puro (Ignorar Debrid/Torbox)",
            type: "checkbox",
            default: "false",
            required: false
        },
        {
            key: "torbox_api_key",
            title: "TorBox API Key",
            type: "text",
            required: false // Correção: agora o Stremio permite instalar com isso em branco
        },
        {
            key: "debrid_token",
            title: "Real-Debrid Token (Opcional)",
            type: "text",
            required: false // Correção: mantido como false para não travar a UI
        }
    ]
};
