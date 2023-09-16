import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getStorage } from "firebase/storage";
import diacritic from "diacritic";

export const uploadImage = async (fileOrEvent: any, locate: any) => {
  try {
    let selectImage;
    if (fileOrEvent.target && fileOrEvent.target.files) {
      selectImage = fileOrEvent.target.files[0];
    } else {
      selectImage = fileOrEvent;
    }

    const filetypes = ["image/jpeg", "image/jpg", "image/png"];

    if (filetypes.includes(selectImage.type)) {
      const storage = getStorage();
      let storageRef = ref(storage, `${locate}/${selectImage.name}`);

      const snapshot = await uploadBytes(storageRef, selectImage);
      console.log("Uploaded a blob or file!");

      const url = await getDownloadURL(snapshot.ref);
      return url;
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};

export const convertToCodeFormat = (text: string) => {
  const textWithoutDiacritics = diacritic.clean(text);
  return textWithoutDiacritics.replace(/\s+/g, "-").toLowerCase();
};

export default class UploadAdapter {
  loader: any;
  locate: any;

  constructor(loader: any, locate: any) {
    this.loader = loader;
    this.locate = locate;
  }

  upload() {
    return this.loader.file.then((file: any) => {
      return uploadImage(file, this.locate).then((url: any) => {
        return {
          default: url,
        };
      });
    });
  }

  abort() {
    // Hàm này để hủy tải lên nếu cần (không cần thiết trong trường hợp của bạn).
  }
}
