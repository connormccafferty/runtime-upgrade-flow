# Runtime Upgrade Flow

This example demonstrates how to leverage search params to download a newer runtime version then launch an existing app on that version.

1. Check if the current version is the latest stable version
2. If not then download the latest version via `fin.System.downloadRuntime`
3. Launch Probe app on the latest version and confirm it's succeeds
4. Send confirmation back to main application
5. set key in `localStorage` after confirmation
6. On next launch the app (simulate with the restart button) will check for the key and if it exists it will start up the relaunch app which will close down the current app and restart it on the new runtime

### How to use this:

-   Clone this repository: `git clone https://github.com/connormccafferty/runtime-upgrade-flow`
-   Install the dependencies: `cd runtime-upgrade-flow` & `npm install`
-   Start the assets server where the assets will be served: `npm run start:assets-server`
-   Start the express server where the various manifest's are hosted: `npm run start:server`
-   Start the live-server and launch the application on it's current version: `npm start`
