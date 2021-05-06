const googleapis = require("googleapis");
const fs = require("fs");

// Set credentials to account to test.
const credentials = {
  client_id:
    "732063052946-kqs6e67gsn8h6689826fdspg3bn57mvi.apps.googleusercontent.com",
  client_secret: "B1HFNHkV13WytDLbkGn3OsKu",
  refresh_token:
    "1//04A_v7bTTCd_ACgYIARAAGAQSNwF-L9IrLuZZz8_QSLoC1ZVgoNvj3XAG4JvG8r8ZCFlrx1jVEByphqpJe3PMkR4Q8e6vz3KEFj0"
};
// Path to a local video. Update for local content if running locally.
const videoPath = "boston1.mov";

// Create YouTube client and configure authorization.
console.log("Creating YouTube client");
const youtube = createYouTubeClient(credentials);

// Upload the video
console.log("Upload youtube video test.");
const videoMetadata = {
  snippet: {
    title: "System test video script - JasonTest1",
    description: "Test video upload - JasonTestDescrip1"
  },
  status: {
    privacyStatus: "private"
  }
};

const media = {
  body: fs.createReadStream(videoPath)
};

youtube.videos
  .insert({
    part: ["snippet", "status"],
    notifySubscribers: false,
    requestBody: videoMetadata,
    media: media
  })
  .then((response) =>
    console.log(
      "Successful Upload Response here: \n" +
        JSON.stringify(response.data, null, 4)
    )
  )
  .catch((err) =>
    //console.error("Error Response here: \n" + JSON.stringify(err, null, 4))
    console.log("Error Response here: \n" + JSON.stringify(err))
  );

// NOTE: Access token is not needed here. Google API client will create and manage the access token automatically.
// Reference: https://googleapis.dev/nodejs/googleapis/latest/youtube/index.html
function createYouTubeClient(credObj) {
  const oAuthClient = new googleapis.google.auth.OAuth2(
    credObj.clientId,
    credObj.clientSecret,
    ""
  );
  oAuthClient.setCredentials({
    refresh_token: credObj.refreshToken
  });
  return googleapis.google.youtube({
    auth: oAuthClient,
    version: "v3"
  });
}
