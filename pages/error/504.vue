<script>
export default {
  head: {
    title: 'Server Gateway timeout',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'This page does not exist' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },
}
</script>
<template>
  <div class="container">
    <div class="w-screen h-screen flex justify-center items-center">
      <div class="flex flex-col">
        <h1 class="text-blue-600 text-[150px] self-center leading-[120px]">504</h1>
        <h2 class="text-blue-500 text-5xl self-center">Server gateway timeout</h2>
        <div class="p-5 text-lg text-blue-800">
          <p class="lead">The server has got a error. Try later.</p>
          <p class="lead">
            <nuxt-link to="/">Go back to the homepage</nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>