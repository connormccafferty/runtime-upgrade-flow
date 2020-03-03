const express = require("express");

const app = express();
const PORT = 9000;

app.get("/manifest", (req, res) => {
    const { version } = req.query;
    res.status(200).json({
        startup_app: {
            name: "OpenfinPOC",
            url: "http://localhost:8888/index.html",
            uuid: "OpenfinPOC",
            applicationIcon: "http://localhost:8888/favicon.ico",
            autoShow: true,
            saveWindowState: true
        },
        runtime: {
            arguments: "",
            version: version
        },
        appAssets: [
            {
                src: "http://localhost:8888/Basic.zip",
                alias: "hyperblotter-chart",
                target: "HyperblotterChart.exe",
                version: "1.0.0"
            },
            {
                src: "http://localhost:8888/Advanced.zip",
                alias: "hyperblotter-chart2",
                target: "HyperblotterChart.exe",
                version: "1.0.0"
            }
        ],
        shortcut: {}
    });
});

app.get("/probe", (req, res) => {
    const { version } = req.query;
    res.status(200).json({
        startup_app: {
            name: "probe",
            url: "http://localhost:5555/probe.html",
            uuid: "probe",
            autoShow: false
        },
        runtime: {
            arguments: "",
            version: version
        },
        shortcut: {}
    });
});

app.get("/relaunch", (req, res) => {
    const { version } = req.query;
    res.status(200).json({
        startup_app: {
            name: "relaunch",
            url: "http://localhost:5555/relaunch.html",
            uuid: "relaunch",
            autoShow: false
        },
        runtime: {
            arguments: "",
            version: version
        },
        shortcut: {}
    });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
