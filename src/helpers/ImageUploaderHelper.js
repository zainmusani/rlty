import {BASE_URL} from '../config/WebService';
import util from '../util';

export const uploadImageToServer = async (file, setLoader) => {
  setLoader(true);
  if (!file || file.includes('picsum.')) return null;
  let URL = '';
  let fileUri = file.path;
  let fileType = file.mime;

  const fileExt = util.getFileExtension(fileUri);
  try {
    await fetch(`${BASE_URL}api/v1/aws/sign-url?folder=&ext=${fileExt}`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${util.getCurrentUserAccessToken()}`,
      }),
    })
      .then(response => response.json())
      .then(result => {
        URL = result.data;
      });
  } catch (error) {
    console.log('PIC Error', error);
  }

  const media = {uri: fileUri, type: fileType, name: 'imageFile.' + fileExt};

  await fetch(URL, {
    method: 'PUT',
    headers: {'Content-Type': 'multipart/form-data'},
    body: media,
    ACL: 'public-read',
  })
    .then(result => {})
    .catch(err => console.error('err', err));

  let imageUrl = URL[0].split('?')[0];

  return imageUrl;
};

export const multiMediaUploadToServer = async (
  file,
  setUploadImageUri,
  setLoader,
) => {
  if (!file?.length) {
    setUploadImageUri([]);
    return;
  }

  let fileExt = '';
  let typeOfUris = util.cloneDeepArray(file);

  setLoader(true);
  typeOfUris.forEach((res, idx) => {
    fileExt +=
      util.getFileExtension(res.path) +
      (idx < typeOfUris.length - 1 ? ',' : '');
  });

  let comingSignedUri = [];

  try {
    await fetch(`${BASE_URL}api/v1/aws/sign-url?folder=&ext=${fileExt}`, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Bearer ${util.getCurrentUserAccessToken()}`,
      }),
    })
      .then(response => response.json())
      .then(result => {
        comingSignedUri = result.data;
      });
  } catch (error) {}

  if (!util.isArrayEmpty(comingSignedUri)) {
    const uploadMedia = [];
    comingSignedUri.forEach((res, index) => {
      uploadMedia.push(uploadToS3BySigned(file, res, index));
    });

    let mediaUpload = file;

    await Promise.all(uploadMedia).then(uploadedImgs => {
      uploadMedia.map((_, index) => {
        mediaUpload[index]['path'] = uploadedImgs[index];

        if (index === comingSignedUri.length - 1) {
          setUploadImageUri(mediaUpload);
        }
      });
    });
    setLoader(false);
    return mediaUpload;
  }

  // setLoader(false);

  return 'mediaUpload';
};

async function uploadToS3BySigned(file, item, index) {
  let imageUrl = null;
  const fileExt = util.getFileExtension(file[index].path);

  const media = {
    uri: file[index].path,
    type: file[index].type,
    name: 'mediaFile.' + fileExt,
  };
  await fetch(item, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: media,
    ACL: 'public-read',
  })
    .then(result => {
      imageUrl = result.url.split('?')[0];
    })
    .catch(err => console.error('err', err));

  return imageUrl;
}
