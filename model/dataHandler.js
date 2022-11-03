import { AppwriteApi } from '../model/appwrite/appwriteApi';
import crypto from 'crypto';

const appwrite = new AppwriteApi();
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
  // Check validity of URL
  valid_url(url) {
    const pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    if (url && url.match(pattern) !== null) {
      return true;
    }
  }
  // Checks for available short URL names
  async available_name(name) {
    try {
      if (this.valid_name(name)) {
        const search_res = await appwrite.listDocuments(name);
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
  async create_url(url, url_name, auto_generate) {
    let is_available = false;
    let is_valid = true;
    if (!auto_generate) {
      try {
        if (url && url_name) {
          is_valid = this.valid_name(url_name) && this.valid_url(url);
          if (!is_valid) return false;
          is_available = await this.available_name(url_name);
        } else {
          return false;
        }
      }
      catch (err) {
        console.log(err);
        return null;
      }
    } else {
      try {
        if (url && this.valid_url(url)) {
            let hash = await this.hash_url(url);
            is_available = await this.available_name(hash);
            url_name = hash;
            if (!is_available) {
              return url_name;
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
    try {
      if (is_available && is_valid) {
        await appwrite.createDocument(url, url_name);
        return url_name;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  // Clean URL to correct format
  clean_url(url) {
    if (url) {
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      } else {
        return 'https://' + url;
      }
    } else {
      return null;
    }
  }
  // Short URL details retrieval
  async url_details(name) {
    try {
      if (name) {
        const search_res = await appwrite.listDocuments(name);
        const data = search_res.documents[0];
        let url = data.url;
        if (search_res.total > 0) {
          url = this.clean_url(url);
          if(url!==null)return url;
          else return null;
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

  async hash_url(url) {
    const hash = await crypto.createHmac('sha1', url).digest('hex');
    return hash;
  }
}