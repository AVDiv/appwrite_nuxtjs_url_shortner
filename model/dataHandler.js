import { AppwriteApi } from '../appwrite/appwriteApi';

export class DataHandler {
  // Checks validity of URL name
  valid_name(name) {
    const pattern = /^\b[a-z0-9-_]*$/g;
    if (name && name.match(pattern) !== null) {
      return true;
    } else {
      return false;
    }
  }
  // Checks for available short URL names
  async available_name(name) {
    try {
      if (this.valid_name(name)) {
        const search_res = await appwrite.listDocuments(url_name);
        const is_available = search_res.total < 1;
        if (is_available) return true;
        else return false;
      }
      else {
        return false;
      }
    }
    catch (err) {
      console.log(err);
      return null;
    }
  }
  // Creates new short URL
  async create_url(url, url_name) {
    try {
      if (url && url_name) {
        const is_valid = this.valid_name(url_name);
        if (!is_valid) return false;
        const is_available = await this.available_name(url_name);
        if (is_available && is_valid) {
          await appwrite.createDocument(url, url_name);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    catch (err) {
      console.log(err);
      return null;
    }
  }
  // Short URL details retrieval
  async url_details(name) {
    try {
      if (url_name) {
        const search_res = await appwrite.listDocuments(url_name);
        const data = search_res.documents[0];
        const url = data.url;
        if (search_res.total > 0) {
          return url;
        } else {
          return false;
        }
      }
      else {
        return false;
      }
    }
    catch (err) {
      console.log(err);
      return null;
    }
  }
}