<script>
import packdata from '../package.json'
import ToggleButton from '../components/Buttons/ToggleButton.vue';
import Nuxtjs from '../components/Icons/Nuxtjs.vue';
import NuxtjsW from '~/components/Icons/NuxtjsW.vue';
import Appwrite from '../components/Icons/Appwrite.vue';
import AppwriteW from '~/components/Icons/AppwriteW.vue';
import Heart from '../components/Icons/Heart.vue';
import Tick from '../components/Icons/Tick.vue';
import Clipboard from '../components/Icons/Clipboard.vue';

export default {
  head: {
    title: 'DEURL',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'My custom description' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },
  data() {
    return {
      url: '',
      url_name: "",
      url_name_valid: null,
      url_status: false,
      nameState: true,
      url_prefix: `http://${packdata.config.nuxt.host}:${packdata.config.nuxt.port}/`,
      check_status: null,
      check_status_content: "Check",
      create_status: null,
      create_status_content: "Shorten",
      copy_icon: true,
      iconSize: 25,
      form_lock: false,
      short_link: "",
      short_link_status: false,
      nuxtjs_referral: "https://nuxtjs.org/",
      appwrite_referral: "https://appwrite.io/",
      avdiv_github_refferal: "https://github.com/AVDiv",
    }
  },
  methods: {
    check_url(event) {
      const pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      const url = event.target.value;
      if (url.match(pattern)) {
        this.url_status = true;
      } else {
        this.url_status = false;
      }
    },
    check_validity(event) {
      const pattern = /^\b[a-z0-9-_]{0,40}$/g;
      if (this.url_name) {
        if (this.url_name.match(pattern) !== null) this.url_name_valid = true;
        else this.url_name_valid = false;
      }
      else this.url_name_valid = null;
      this.check_status_function(event);
    },
    async check_name(event) {
      this.check_status = '.';
      this.check_status_content = '👀 Checking...'
      let response = await this.$axios.get(`/available_name?name=${this.url_name}`);
      if (response.status === 200) {
        if (response.data.is_available) {
          this.check_status_content = "✓ Available"
          this.check_status = true;
        } else {
          this.check_status_content = "!! Not Available";
          this.check_status = false;
        }
      } else {
        this.check_status_content = "⚠️ Unexpected error";
        this.check_status = false;
      }
    },
    check_status_function(event) {
      if (this.check_status !== null) {
        this.check_status = null;
        this.check_status_content = "Check"
      }
    },
    async create_url(event) {
      this.create_status = '.';
      this.create_status_content = '👀 Creating...'
      let response;
      try {
        response = await this.$axios.post('/create_url', {
            name: this.url_name,
            auto_generate: this.nameState ,
            url: this.url,
          });
        console.log(response.data);
      } catch (error) {
        console.log(error);
        this.create_status_content = "⚠️ Unexpected error";
        this.create_status = false;
      }
      if (response.status === 200) {
        if(response.data.created) {
          this.create_status_content = "✓ Created"
          this.url_name = response.data.created;
          this.create_status = true;
          this.form_lock = true;
          this.display_short_link(event);
        } else {
          this.create_status_content = "! Failed to create";
          this.create_status = false;
        }
      } else {
        this.create_status_content = "⚠️ Server error";
        this.create_status = false;
      }
    },
    display_short_link(event) {
      this.short_link = `${this.url_prefix}${this.url_name}`;
      this.short_link_status = true;
    },
    copy_icon_swap(event){
      this.copy_icon = false;
      setTimeout(() => {
        this.copy_icon = true;
      }, 2000);
    },
    async copy_short_link(event) {
      try {
        await this.$copyText(this.short_link);
        this.copy_icon_swap(event);
      } catch (e) {
        console.error(e);
      }
    },

  },
  components: {
    ToggleButton,
    Nuxtjs, Appwrite, NuxtjsW, AppwriteW, 
    Heart, Tick, Clipboard,
  }
}
</script>
<template>
  <div>
    <!-- Logo -->
    <div class="w-full h-[15vh] flex justify-center">
      <img class="m-auto" src="/images/logos/logo.png" width="300" height="150" alt="Logo" />
    </div>
    <!-- URL shortener form -->
    <div class="flex justify-center items-center h-[85vh]">
      <div class="w-[800px] h-[60%] flex flex-col">
        <div>
          <label for="url" class="input-label top-3.5 left-16">URL</label>
          <input name="url" type="text" class="w-full h-[60px] border-2 rounded-full outline-slate-400 px-5"
            placeholder="www.pasteyoururl.here" title="Insert the URL you need to shorten" @input="check_url"
            style="clip-path: polygon(0px 0px, calc(0% + 4rem) 0px, calc(0% + 4rem) 3px, calc(0% + 4rem + 45px) 3px, calc(0% + 4rem + 45px) 0px, 100% 0%, 100% 100%, 0% 100%);"
            v-model="url" :disabled="form_lock" required />
        </div>
        <div>
          <label for="name" class="input-label top-3.5 left-[calc(100%-15rem)]">Link name</label>
          <div class="w-full h-[60px] flex justify-center">
            <input name="name" type="text"
              class="w-[30%] h-full border-2 rounded-l-full outline-slate-400 px-5 text-slate-500" :value='url_prefix'
              disabled />
            <input name="name" type="text"
              :class="['w-[49%]', 'h-full', 'border-2', 'rounded-r-full', 'disabled:cursor-not-allowed', 'px-5', url_name_valid?'outline-green-500':url_name_valid===false?'outline-red-600':'outline-slate-400']"
              style="clip-path: polygon(0px 0px, calc(100% - 10rem) 0px, calc(100% - 10rem) 3px, calc(100% - 10rem + 102px) 3px, calc(100% - 10rem + 102px) 0px, 100% 0%, 100% 100%, 0% 100%);"
              @input="check_validity" v-model="url_name" :disabled="nameState || form_lock"
              title="Customize the way you need the URL to shorten" required />
          </div>
          <div class="mt-5 flex justify-evenly items-center">
            <ToggleButton placeholder="Generate a name automatically" :state="nameState"
              @update:state="nameState=(!nameState)" :disabled="form_lock"/>
            <button
              :class="['button group h-full w-48 flex justify-center items-center', check_status===null?'':check_status==='.'?'loading':check_status?'valid':'invalid']"
              title="Check the availability of the Short link name" @click="check_name"
              :disabled="((check_status===null && !nameState && url_name_valid)?false:true)||form_lock">
              <label for="check" class="cursor-pointer group-disabled:cursor-not-allowed">{{ check_status_content
                }}</label>
            </button>
          </div>
        </div>
        <div class="flex justify-center mt-5">
          <button name="submit" title="Create the short URL 🥳🎉"
            :class="['button w-1/2 group', create_status===null?'':create_status==='.'?'loading':create_status?'valid':'invalid']"
            :disabled="!(url_status && (nameState || check_status))||form_lock" @click="create_url">
            <label for="submit" class="cursor-pointer group-disabled:cursor-not-allowed">{{ create_status_content}}</label>
          </button>
        </div>
        <div :class="['h-full w-full flex justify-center items-center', short_link_status?'visible': 'hidden']">
          <div class="w-[70%] h-14 bg-green-100 text-green-500 border-b-4 border-green-300 rounded-md flex flex-row">
            <div class="h-full w-full flex justify-center items-center overflow-x-scroll">
              <p>{{ short_link }}</p>
            </div>
            <div class="h-full w-14 border-l-2 border-inherit ">
              <button class="h-full w-full cursor-pointer flex justify-center items-center" @click="copy_short_link">
                  <span v-if="copy_icon">
                    <Clipboard :size="iconSize"/>
                  </span>
                  <span v-else>
                    <Tick :size="iconSize"/>
                  </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="fixed bottom-0 flex justify-center items-center w-full h-8 bg-blue-600">
      <div class="text-white">
        <p class="flex flex-row">
          This site is only for Demo purposes. This site was created with &nbsp;
          <a :href="nuxtjs_referral" target="_blank">
            <NuxtjsW :size="iconSize" />&nbsp;NuxtJs
          </a>
          &nbsp;&plus;&nbsp;
          <a :href="appwrite_referral" target="_blank">
            <AppwriteW :size="iconSize" />&nbsp;Appwrite
          </a>
          &nbsp;&plus;&nbsp;
          <Heart :size="iconSize" />
          <b>&nbsp; by &nbsp;<a :href="avdiv_github_refferal" target="_blank">AVDiv</a></b>
        </p>
      </div>
    </footer>
  </div>
</template>
