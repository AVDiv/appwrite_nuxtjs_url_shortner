<script>
export default {
  head: {
    title: 'Page not found',
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
        <h1 class="text-blue-600 text-[150px] self-center leading-[120px]">404</h1>
        <h2 class="text-blue-500 text-5xl self-center">Page not found</h2>
        <div class="p-5 text-lg text-blue-800">
          <p class="lead">The page you are looking for does not exist.</p>
          <p class="lead">
            <nuxt-link to="/">Go back to the homepage</nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
