import { AppwriteApi } from '../model/appwrite/appwriteApi';
import crypto from 'crypto';
// import { argon2d, argon2i } from 'argon2';

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
          is_valid = this.valid_name(url_name);
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
        if (url) {
            console.log(url);
            let hash = await this.hash_url(url);
            console.log(hash);
            is_available = await this.available_name(hash);
            console.log(is_available);
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
      console.log(is_available, is_valid);
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

  async hash_url(url) {
    const hash = await crypto.createHash('sha1', url).digest('hex');
    return hash;
  }
}