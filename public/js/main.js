// uncomment line below to register offline cache service worker
// navigator.serviceWorker.register('../serviceworker.js');

if (typeof fin !== "undefined") {
    init();
} else {
    document.querySelector("#of-version").innerText =
        "The fin API is not available - you are probably running in a browser.";
}

async function init() {
    // get current runtime version
    const ofVersion = document.querySelector("#of-version");
    const version = await fin.System.getVersion();
    ofVersion.textContent = version;

    // get latest stable runtime version
    const response = await fetch(
        "https://cdn.openfin.co/release/runtime/stable"
    );
    const latestVersion = await response.text();

    // check for upgrade success key
    let upgradeSuccess = JSON.parse(localStorage.getItem("upgrade-success"));
    if (upgradeSuccess) {
        localStorage.removeItem("upgrade-success");
        launchUpgradedVersion(latestVersion);
    }

    // listen for message that probe app launched successfully
    fin.InterApplicationBus.subscribe(
        { uuid: "*" },
        "upgrade-success",
        sub_msg => {
            localStorage.setItem(sub_msg, true);
            let keyConfirmationEle = document.createElement("p");
            keyConfirmationEle.textContent = "✅ upgrade-success key set";
            document.body.appendChild(keyConfirmationEle);
        }
    );

    if (version < latestVersion) {
        // download latest runtime
        fin.System.downloadRuntime({ version: latestVersion }, onProgress)
            .then(async () => {
                // if successful launch probe app on latest version
                console.log("Runtime download complete");
                await fin.Application.startFromManifest(
                    `http://localhost:9000/probe?version=${latestVersion}`
                );
            })
            .catch(err => {
                console.log(`Download Failed, we could retry: ${err.message}`);
                console.log(err);
            });
    }
}

async function launchUpgradedVersion(version) {
    fin.Application.startFromManifest(
        `http://localhost:9000/relaunch?version=${version}`
    ).then(async () => {
        await fin.Application.getCurrentSync().quit();
    });
}

function onProgress(progress) {
    console.log(
        `${Math.floor((progress.downloadedBytes / progress.totalBytes) * 100)}%`
    );
}
