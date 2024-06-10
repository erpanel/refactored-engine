import fetch from 'node-fetch';

class miftah {
   baseUrl = 'https://api.miftahganzz.my.id/api/';
   apiKey = null;

   constructor(apiKey) {
      this.apiKey = apiKey || process.env.MIFTAH || global.apiMiftah;
   }
   
   bard = async (query) => {
      let json = await fetch(this.baseUrl + 'ai/gemini?q=' + query + '&apikey=' + this.apiKey);
      return await json.json();
   }

   instagram = async (url) => {
      let response = await fetch(this.baseUrl + 'download/instagram?url=' + encodeURIComponent(url) + '&apikey=' + this.apiKey);
      return await response.json();
   }

   facebook = async (url) => {
      let response = await fetch(this.baseUrl + 'download/facebook?url=' + encodeURIComponent(url) + '&apikey=' + this.apiKey);
      return await response.json();
   }

   soundcloud = async (url) => {
      let response = await fetch(this.baseUrl + 'download/soundcloud?url=' + encodeURIComponent(url) + '&apikey=' + this.apiKey);
      return await response.json();
   }

   spotify = async (url) => {
      let response = await fetch(this.baseUrl + 'download/spotify?url=' + encodeURIComponent(url) + '&apikey=' + this.apiKey);
      return await response.json();
   }

   twitter = async (url) => {
      let response = await fetch(this.baseUrl + 'download/twitter?url=' + encodeURIComponent(url) + '&apikey=' + this.apiKey);
      return await response.json();
   }

   githubUser = async (username) => {
      let response = await fetch(this.baseUrl + 'stalking/githubuser?username=' + username + '&apikey=' + this.apiKey);
      return await response.json();
   }

   instagramUser = async (username) => {
      let response = await fetch(this.baseUrl + 'stalking/instagram?username=' + username + '&apikey=' + this.apiKey);
      return await response.json();
   }

   gptPic = async (query) => {
      let response = await fetch(this.baseUrl + 'ai/gpt-pic?q=' + query + '&apikey=' + this.apiKey);
      return await response.json();
   }

   geminiImg = async (query, url) => {
      let response = await fetch(this.baseUrl + 'ai/gemini-img?q=' + encodeURIComponent(query) + '&url=' + encodeURIComponent(url) + '&apikey=' + this.apiKey);
      return await response.json();
   }

   bardImg = async (query, url) => {
      let response = await fetch(this.baseUrl + 'ai/bard-img?q=' + encodeURIComponent(query) + '&url=' + encodeURIComponent(url) + '&apikey=' + this.apiKey);
      return await response.json();
   }
}

export { miftah };
