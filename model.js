const { request, response } = require("express");
const { google } = require("googleapis");
const fs = require("fs");
const CLIENT_ID =
  "863163186288-tsoklg06f0sf2gclv8cdms0ir40mi403.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04NzTrfd7lHJBCgYIARAAGAQSNwF-L9Ir5ezt4WfGeJuazvo6_S8SolFXtsvl9lIIrvvnTm7aL6Zkv-7pgf0o98m2Jzix7sAZot8";

const oauthClient = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauthClient.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauthClient,
});

const download = async (req = request, res = response) => {
  let images = [];
  const response = await drive.files.list({
    q: "mimeType='image/jpeg'",
    fields: "nextPageToken, files(name, id, webContentLink)",
    spaces: "drive",
    pageSize: 5,
  });

  response.data.files.map(async (item) => {
    images.push(item.webContentLink);
  });

  return res.status(200).json({ images });
};

module.exports = { download };
